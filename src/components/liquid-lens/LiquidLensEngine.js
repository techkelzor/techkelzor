import * as THREE from 'three';
import gsap from 'gsap';

// Vertex Shader for Fullscreen Quad
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Fragment Shader for Physical Liquid Lens / Water Droplet Magnification
const fragmentShader = `
  precision highp float;

  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec2 uVelocity;
  uniform float uRadius;
  uniform float uStrength;
  uniform float uMagnification;
  uniform float uAberration;
  uniform float uRipple;
  uniform float uTime;
  uniform float uHideAtRest;

  varying vec2 vUv;

  void main() {
    // If element mode and at rest (strength = 0 and ripple = 0), render transparent so native DOM shows
    if (uHideAtRest > 0.5 && uStrength < 0.002 && uRipple < 0.002) {
      gl_FragColor = vec4(0.0);
      return;
    }

    // Aspect ratio correction so the droplet is a natural circle
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 aspectVec = vec2(aspect, 1.0);
    
    // Normalized distance from current UV to mouse in aspect-corrected space
    vec2 delta = (vUv - uMouse) * aspectVec;
    float dist = length(delta);
    
    // Normalized radius
    float radius = uRadius / max(uResolution.y, 1.0);
    float r = dist / max(radius, 0.0001);
    
    // Smooth profile of a convex water droplet
    float dome = 0.0;
    if (r < 1.0) {
      dome = sqrt(max(0.0, 1.0 - r * r));
    }
    
    // Smooth boundary falloff to blend seamlessly with surrounding content
    float boundary = smoothstep(1.0, 0.0, r);
    float effectiveLens = dome * boundary * uStrength;
    
    // Magnification displacement
    vec2 toMouse = vUv - uMouse;
    vec2 magOffset = - toMouse * (uMagnification - 1.0) * effectiveLens;
    
    // Water droplet meniscus edge curvature
    float edgeFactor = smoothstep(0.4, 0.92, r) * (1.0 - smoothstep(0.92, 1.02, r));
    vec2 edgeDir = dist > 0.0001 ? (delta / dist) / aspectVec : vec2(0.0);
    vec2 meniscusOffset = edgeDir * edgeFactor * 0.012 * uStrength;
    
    // Hydrodynamic teardrop elongation based on velocity
    vec2 velOffset = - uVelocity * effectiveLens * 0.04;
    
    // Dynamic exit / movement ripple waves
    float rippleWave = sin(dist * 55.0 - uTime * 14.0) * exp(-dist * 12.0) * uRipple;
    vec2 rippleOffset = edgeDir * rippleWave * 0.015;
    
    // Combine total UV displacement
    vec2 distortedUv = vUv + magOffset + meniscusOffset + velOffset + rippleOffset;
    distortedUv = clamp(distortedUv, 0.0, 1.0);
    
    // Subtle chromatic dispersion at the edge of the lens
    float chromaticAmount = uAberration * edgeFactor * uStrength;
    
    vec4 color;
    if (chromaticAmount > 0.0001) {
      vec2 rUv = clamp(distortedUv + edgeDir * chromaticAmount, 0.0, 1.0);
      vec2 bUv = clamp(distortedUv - edgeDir * chromaticAmount, 0.0, 1.0);
      
      float rCol = texture2D(uTexture, rUv).r;
      float gCol = texture2D(uTexture, distortedUv).g;
      float bCol = texture2D(uTexture, bUv).b;
      float aCol = texture2D(uTexture, distortedUv).a;
      
      color = vec4(rCol, gCol, bCol, aCol);
    } else {
      color = texture2D(uTexture, distortedUv);
    }
    
    // Subtle specular light sheen on the top-left edge of the droplet
    if (r < 1.0 && uStrength > 0.05) {
      vec2 lightDir = normalize(vec2(-0.6, 0.6));
      float lightDot = max(0.0, dot(edgeDir * aspectVec, lightDir));
      float sheen = pow(lightDot, 5.0) * edgeFactor * 0.12 * uStrength;
      color.rgb += vec3(sheen);
    }

    gl_FragColor = color;
  }
`;

export class LiquidLensEngine {
  constructor({
    canvas,
    radius = 90,
    strength = 0.12,
    magnification = 1.12,
    chromaticAberration = 0.0035,
    lerpFactor = 0.14,
    hideAtRest = false,
    onRender,
  }) {
    this.canvas = canvas;
    this.radius = radius;
    this.strength = strength;
    this.magnification = magnification;
    this.chromaticAberration = chromaticAberration;
    this.lerpFactor = lerpFactor;
    this.hideAtRest = hideAtRest;
    this.onRender = onRender;

    this.isHovered = false;
    this.isDestroyed = false;
    this.targetMouse = { x: 0.5, y: 0.5 };
    this.currentMouse = { x: 0.5, y: 0.5 };
    this.prevMouse = { x: 0.5, y: 0.5 };
    this.velocity = { x: 0, y: 0 };
    this.time = 0;
    this.exitTween = null;
    this.rippleTween = null;

    this.state = {
      strength: 0,
      radius: this.radius,
      ripple: 0,
    };

    this.initWebGL();
    this.bindEvents();
    this.startLoop();
  }

  initWebGL() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(dpr);

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const placeholderCanvas = document.createElement('canvas');
    placeholderCanvas.width = 16;
    placeholderCanvas.height = 16;
    this.texture = new THREE.CanvasTexture(placeholderCanvas);
    this.texture.generateMipmaps = false;
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;

    this.uniforms = {
      uTexture: { value: this.texture },
      uResolution: { value: new THREE.Vector2(100, 100) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uVelocity: { value: new THREE.Vector2(0, 0) },
      uRadius: { value: this.radius },
      uStrength: { value: 0 },
      uMagnification: { value: this.magnification },
      uAberration: { value: this.chromaticAberration },
      uRipple: { value: 0 },
      uTime: { value: 0 },
      uHideAtRest: { value: this.hideAtRest ? 1.0 : 0.0 },
    };

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: this.uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });

    this.geometry = new THREE.PlaneGeometry(2, 2);
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);

    this.resize();
  }

  setTexture(textureSource) {
    if (this.isDestroyed) return;

    if (textureSource instanceof THREE.Texture) {
      this.texture = textureSource;
    } else if (textureSource instanceof HTMLImageElement || textureSource instanceof HTMLCanvasElement) {
      if (this.texture && this.texture.image) {
        this.texture.image = textureSource;
        this.texture.needsUpdate = true;
      } else {
        this.texture = new THREE.CanvasTexture(textureSource);
        this.texture.generateMipmaps = false;
        this.texture.minFilter = THREE.LinearFilter;
        this.texture.magFilter = THREE.LinearFilter;
      }
    }

    if (this.uniforms) {
      this.uniforms.uTexture.value = this.texture;
    }
  }

  resize() {
    if (!this.canvas || this.isDestroyed) return;
    const rect = this.canvas.parentElement ? this.canvas.parentElement.getBoundingClientRect() : this.canvas.getBoundingClientRect();
    const width = Math.max(rect.width, 10);
    const height = Math.max(rect.height, 10);

    this.renderer.setSize(width, height, false);
    if (this.uniforms) {
      this.uniforms.uResolution.value.set(width, height);
    }
  }

  onPointerEnter(x, y) {
    this.isHovered = true;
    this.targetMouse.x = x;
    this.targetMouse.y = y;
    this.currentMouse.x = x;
    this.currentMouse.y = y;
    this.prevMouse.x = x;
    this.prevMouse.y = y;

    if (this.exitTween) this.exitTween.kill();
    if (this.rippleTween) this.rippleTween.kill();

    gsap.to(this.state, {
      strength: 1.0,
      radius: this.radius,
      duration: 0.38,
      ease: 'power2.out',
    });

    this.state.ripple = 0.4;
    gsap.to(this.state, {
      ripple: 0,
      duration: 0.45,
      ease: 'power2.out',
    });
  }

  onPointerMove(x, y) {
    this.isHovered = true;
    this.targetMouse.x = x;
    this.targetMouse.y = y;
  }

  onPointerLeave() {
    this.isHovered = false;

    if (this.exitTween) this.exitTween.kill();
    if (this.rippleTween) this.rippleTween.kill();

    gsap.to(this.state, {
      radius: this.radius * 0.4,
      duration: 0.5,
      ease: 'back.in(1.2)',
    });

    this.exitTween = gsap.to(this.state, {
      strength: 0,
      duration: 0.55,
      ease: 'power2.inOut',
      onComplete: () => {
        this.state.radius = this.radius;
      },
    });

    this.state.ripple = 1.0;
    this.rippleTween = gsap.to(this.state, {
      ripple: 0,
      duration: 0.65,
      ease: 'elastic.out(1.2, 0.4)',
    });
  }

  bindEvents() {
    this.handleResize = () => this.resize();
    window.addEventListener('resize', this.handleResize);
  }

  startLoop() {
    const loop = (timeMs) => {
      if (this.isDestroyed) return;

      this.time = timeMs * 0.001;

      const ease = this.lerpFactor;
      this.currentMouse.x += (this.targetMouse.x - this.currentMouse.x) * ease;
      this.currentMouse.y += (this.targetMouse.y - this.currentMouse.y) * ease;

      const vx = (this.currentMouse.x - this.prevMouse.x);
      const vy = (this.currentMouse.y - this.prevMouse.y);
      this.velocity.x += (vx - this.velocity.x) * 0.2;
      this.velocity.y += (vy - this.velocity.y) * 0.2;

      this.prevMouse.x = this.currentMouse.x;
      this.prevMouse.y = this.currentMouse.y;

      if (this.uniforms) {
        this.uniforms.uMouse.value.set(this.currentMouse.x, 1.0 - this.currentMouse.y);
        this.uniforms.uVelocity.value.set(this.velocity.x, -this.velocity.y);
        this.uniforms.uStrength.value = this.state.strength;
        this.uniforms.uRadius.value = this.state.radius;
        this.uniforms.uRipple.value = this.state.ripple;
        this.uniforms.uTime.value = this.time;
      }

      if (this.onRender) {
        this.onRender();
      }

      this.renderer.render(this.scene, this.camera);
      this.rafId = requestAnimationFrame(loop);
    };

    this.rafId = requestAnimationFrame(loop);
  }

  destroy() {
    this.isDestroyed = true;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.exitTween) this.exitTween.kill();
    if (this.rippleTween) this.rippleTween.kill();
    window.removeEventListener('resize', this.handleResize);

    if (this.geometry) this.geometry.dispose();
    if (this.material) this.material.dispose();
    if (this.texture) this.texture.dispose();
    if (this.renderer) this.renderer.dispose();
  }
}

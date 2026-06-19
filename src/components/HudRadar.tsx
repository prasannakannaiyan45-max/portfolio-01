import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const HudRadar: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 2.8;

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0); // transparent background
    container.appendChild(renderer.domElement);

    // --- Custom Shader Material for Holographic Face ---
    const getThemeColor = () => {
      const cssVal = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
        .trim();
      if (!cssVal) return new THREE.Color('#93032E');
      if (cssVal.startsWith('#')) return new THREE.Color(cssVal);
      return new THREE.Color('#93032E');
    };

    const initialColor = getThemeColor();

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: initialColor },
        uTime: { value: 0 },
        uScanY: { value: 0 },
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec3 vNormal;
        void main() {
          vPosition = position;
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        uniform float uScanY;
        varying vec3 vPosition;
        varying vec3 vNormal;

        void main() {
          vec3 baseColor = uColor;
          
          // Fresnel silhouette glow (edges facing away from camera)
          float fresnel = pow(1.0 - abs(vNormal.z), 2.5);
          
          // Scanning line effect (sweeps vertically)
          float scanDist = abs(vPosition.y - uScanY);
          float scanHighlight = exp(-scanDist * scanDist / 0.015);
          
          // Add highlight color to the scanline & edges (white/pink tint for high fidelity)
          vec3 highlightColor = uColor * 1.6 + vec3(0.5, 0.1, 0.2);
          vec3 finalColor = mix(baseColor, highlightColor, scanHighlight + fresnel * 0.3);
          
          // Breathe pulse effect
          float pulse = 0.85 + 0.15 * sin(uTime * 1.8);
          
          // Combine base, edge glow, and scanline opacities
          float baseOpacity = 0.25 + 0.35 * fresnel;
          float finalOpacity = mix(baseOpacity, 0.85, scanHighlight) * pulse;
          
          gl_FragColor = vec4(finalColor, finalOpacity);
        }
      `,
      transparent: true,
      wireframe: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    // --- Procedural Fallback Face Geometry Helper ---
    const createProceduralFace = () => {
      const geometry = new THREE.PlaneGeometry(1.4, 1.9, 50, 60);
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;

      const expG = (val: number, center: number, width: number) => {
        return Math.exp(-Math.pow((val - center) / width, 2));
      };

      for (let i = 0; i < posAttr.count; i++) {
        const u = posAttr.getX(i); // horizontal coordinate (-0.7 to 0.7)
        const v = posAttr.getY(i); // vertical coordinate (-0.95 to 0.95)

        // 1. Curved cylinder base (wrap around Y axis)
        const theta = u * (Math.PI / 1.7); // wrap angle
        const R = 0.6; // face cylinder radius
        let bx = Math.sin(theta) * R;
        let bz = Math.cos(theta) * R - R; // flat at center, curves back
        let by = v;

        // 2. Jaw Tapering (make it narrow at the bottom)
        let jawWidth = 1.0;
        if (v < 0.15) {
          const factor = (0.15 - v) / 1.1;
          jawWidth = 1.0 - 0.45 * Math.pow(factor, 1.1);
        }
        bx *= jawWidth;
        bz *= jawWidth;

        // 3. Temple indentations
        let temple = 1.0;
        if (v > 0.1 && v < 0.6) {
          const dist = Math.abs(u);
          if (dist > 0.2) {
            temple = 1.0 - 0.12 * expG(dist, 0.45, 0.12) * expG(v, 0.35, 0.2);
          }
        }
        bx *= temple;

        // 4. Facial feature displacements in Z
        const noseBridge = 0.28 * expG(u, 0, 0.07) * expG(v, 0.12, 0.22);
        const noseTip = 0.22 * expG(u, 0, 0.06) * expG(v, -0.06, 0.08);
        const nostrils = 0.05 * expG(u - 0.1, 0, 0.04) * expG(v, -0.08, 0.05) +
                         0.05 * expG(u + 0.1, 0, 0.04) * expG(v, -0.08, 0.05);
        const noseZ = noseBridge + noseTip + nostrils;

        const eyeSocketZ = -0.12 * (expG(u - 0.18, 0, 0.07) + expG(u + 0.18, 0, 0.07)) * expG(v - 0.2, 0, 0.06);
        const browZ = 0.05 * expG(v - 0.28, 0, 0.05) * expG(u, 0, 0.3);
        const cheekZ = 0.07 * (expG(u - 0.28, 0, 0.12) + expG(u + 0.28, 0, 0.12)) * expG(v + 0.05, 0, 0.14);

        // Refined realistic lips (closed mouth)
        // Upper lip: smooth Gaussian peak centered slightly above the midpoint
        const refinedUpperLip = 0.03 * expG(u, 0, 0.07) * expG(v + 0.26, 0, 0.03);
        // Lower lip: smooth Gaussian bump below the upper lip
        const refinedLowerLip = 0.03 * expG(u, 0, 0.07) * expG(v + 0.36, 0, 0.03);
        // Base lip volume (overall thickness)
        const lipsBase = 0.038 * expG(u, 0, 0.18) * expG(v + 0.32, 0, 0.06);
        // Keep subtle philtrum and mental crease for anatomical detail
        const philtrum = -0.012 * expG(u, 0, 0.035) * expG(v + 0.18, 0, 0.08);
        const mentalCrease = -0.015 * expG(u, 0, 0.14) * expG(v + 0.46, 0, 0.04);
        // Combine components into final mouth displacement (closed lips)
        const mouthZ = lipsBase + refinedUpperLip + refinedLowerLip + philtrum + mentalCrease;

        const chinZ = 0.07 * expG(u, 0, 0.12) * expG(v + 0.58, 0, 0.08);

        const finalZ = bz + noseZ + eyeSocketZ + browZ + cheekZ + mouthZ + chinZ;

        posAttr.setXYZ(i, bx, by, finalZ);
      }

      geometry.computeVertexNormals();
      return geometry;
    };

    // --- Mesh Loader & Management ---
    let headMesh: THREE.Object3D | null = null;
    let proceduralMesh: THREE.Mesh | null = null;

    // A. Add procedural face mask immediately as placeholder/fallback
    const fallbackGeom = createProceduralFace();
    proceduralMesh = new THREE.Mesh(fallbackGeom, shaderMaterial);
    scene.add(proceduralMesh);
    headMesh = proceduralMesh;

    // B. Load realistic human face scan in the background
    const loader = new GLTFLoader();
    loader.load(
      'https://cdn.jsdelivr.net/gh/mrdoob/three.js@dev/examples/models/gltf/LeePerrySmith/LeePerrySmith.glb',
      (gltf) => {
        // Swap materials on loaded meshes
        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = shaderMaterial;
          }
        });

        // Center and scale the loaded face model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        gltf.scene.position.x -= center.x;
        // The model includes neck/shoulders, offset slightly upwards to focus on face
        gltf.scene.position.y -= center.y - 0.25; 
        gltf.scene.position.z -= center.z;

        const maxDim = Math.max(size.x, size.y, size.z);
        gltf.scene.scale.setScalar(1.65 / maxDim);

        // Remove placeholder mesh
        if (proceduralMesh) {
          scene.remove(proceduralMesh);
          proceduralMesh.geometry.dispose();
          proceduralMesh = null;
        }

        // Add 3D human head scan to the scene
        scene.add(gltf.scene);
        headMesh = gltf.scene;
      },
      undefined,
      (err) => {
        console.warn('Network offline or failed to load 3D head GLTF; using procedural head mask.', err);
      }
    );

    // --- Animation Loop ---
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const time = clock.getElapsedTime();

      // Slow 3-5 degrees rotation left and right (approx 0.08 radians is 4.5 degrees)
      if (headMesh) {
        headMesh.rotation.y = Math.sin(time * 0.3) * 0.08;
        headMesh.rotation.x = Math.sin(time * 0.15) * 0.02; // subtle vertical nodding
      }

      // Update shader uniforms
      shaderMaterial.uniforms.uTime.value = time;
      
      // Sweep vertical scan line position between -1.3 and 1.3
      shaderMaterial.uniforms.uScanY.value = Math.sin(time * 0.8) * 1.25;

      // Keep colors updated in case CSS variables theme changes dynamically
      shaderMaterial.uniforms.uColor.value.copy(getThemeColor());

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // --- Resize handler ---
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // --- Clean Up ---
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (proceduralMesh) {
        proceduralMesh.geometry.dispose();
      }
      if (headMesh) {
        scene.remove(headMesh);
        headMesh.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
          }
        });
      }
      shaderMaterial.dispose();
      renderer.dispose();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      }}
    />
  );
};

export default HudRadar;

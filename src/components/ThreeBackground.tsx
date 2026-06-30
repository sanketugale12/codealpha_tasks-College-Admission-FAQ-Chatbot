import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. Create Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    // Dark deep navy blue background
    scene.background = new THREE.Color(0x050b18);
    // Add fog for a depth/misty spatial effect
    scene.fog = new THREE.FogExp2(0x050b18, 0.015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Add Lighting (Dual directional lighting: gold and royal blue)
    const ambientLight = new THREE.AmbientLight(0x0d2149, 1.2);
    scene.add(ambientLight);

    // Golden key light
    const goldLight = new THREE.DirectionalLight(0xffd700, 2.5);
    goldLight.position.set(10, 15, 10);
    scene.add(goldLight);

    // Deep sapphire fill light
    const sapphireLight = new THREE.DirectionalLight(0x1e40af, 2.0);
    sapphireLight.position.set(-10, -10, 5);
    scene.add(sapphireLight);

    // Subtle white glow light
    const pointLight = new THREE.PointLight(0xffffff, 1.5, 50);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // 3. Create Starfield / Particles (Gold and silver points)
    const particleCount = 250;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorGold = new THREE.Color(0xffd700);
    const colorWhite = new THREE.Color(0xffffff);
    const colorCyan = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      // Spread stars around a big sphere
      const radius = 30 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Randomize color among gold, white, and sky-blue
      let mixColor = colorWhite;
      const r = Math.random();
      if (r < 0.35) mixColor = colorGold;
      else if (r < 0.6) mixColor = colorCyan;

      colors[i * 3] = mixColor.r;
      colors[i * 3 + 1] = mixColor.g;
      colors[i * 3 + 2] = mixColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom star texture using Canvas to avoid external assets
    const createStarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 16;
      canvas.height = 16;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(255, 240, 150, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      map: createStarTexture(),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const starField = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(starField);

    // 4. Create Floating Low-Poly Geometric Shapes (Platonic solids representing academy)
    const shapes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.IcosahedronGeometry(2, 0), // Academics
      new THREE.DodecahedronGeometry(1.8, 0), // Knowledge
      new THREE.OctahedronGeometry(1.5, 0), // Structure
      new THREE.TetrahedronGeometry(1.6, 0), // Focus
      new THREE.TorusGeometry(1.2, 0.4, 8, 16) // Unity
    ];

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Burnished gold
      roughness: 0.15,
      metalness: 0.9,
      flatShading: true,
    });

    const navyMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a, // Academic deep blue
      roughness: 0.2,
      metalness: 0.8,
      flatShading: true,
    });

    // Spawn 10 shapes scattered in 3D space
    for (let i = 0; i < 12; i++) {
      const geom = geometries[i % geometries.length];
      const mat = i % 2 === 0 ? goldMaterial : navyMaterial;
      const mesh = new THREE.Mesh(geom, mat);

      // Random position
      mesh.position.set(
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 20 - 10 // push some back
      );

      // Random scale
      const s = 0.6 + Math.random() * 0.9;
      mesh.scale.set(s, s, s);

      // Store speed attributes for rotation & float speed
      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.012,
        rotSpeedY: (Math.random() - 0.5) * 0.012,
        floatSpeed: 0.001 + Math.random() * 0.0015,
        floatOffset: Math.random() * Math.PI * 2,
        baseY: mesh.position.y
      };

      scene.add(mesh);
      shapes.push(mesh);
    }

    // 5. Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Rotate starfield extremely slowly
      starField.rotation.y = elapsedTime * 0.015;
      starField.rotation.x = elapsedTime * 0.005;

      // Rotate and float the geometric shapes
      shapes.forEach(mesh => {
        mesh.rotation.x += mesh.userData.rotSpeedX;
        mesh.rotation.y += mesh.userData.rotSpeedY;

        // Float up and down gently
        const offset = mesh.userData.floatOffset;
        const speed = mesh.userData.floatSpeed;
        mesh.position.y = mesh.userData.baseY + Math.sin(elapsedTime * 0.8 + offset) * 1.5;
      });

      // Slowly swing the camera in an elliptical path to create a breathing 3D scene
      camera.position.x = Math.sin(elapsedTime * 0.1) * 3;
      camera.position.y = Math.cos(elapsedTime * 0.15) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // 6. Handle Resizing dynamically using ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    });

    resizeObserver.observe(container);

    // 7. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      
      // Dispose materials & geometries
      particleGeometry.dispose();
      particleMaterial.dispose();
      
      geometries.forEach(g => g.dispose());
      goldMaterial.dispose();
      navyMaterial.dispose();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      id="three-3d-scene" 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full -z-20 overflow-hidden select-none pointer-events-none"
    />
  );
}

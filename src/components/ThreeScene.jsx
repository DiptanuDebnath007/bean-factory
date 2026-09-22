import React, { useRef, useMemo, memo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import CoffeeBean3D from "./CoffeeBean3D";

// Detect device capabilities at module load
const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 768;
const IS_LOW_END = typeof navigator !== "undefined" && (navigator.hardwareConcurrency || 4) <= 2;
// On low-end mobile, skip WebGL entirely
const SKIP_WEBGL = IS_MOBILE && IS_LOW_END;
const PARTICLE_COUNT = IS_MOBILE ? 60 : 180;
const MAX_DPR = IS_MOBILE ? 1 : 1.5;

function FloatingParticles({ count = 180, progress = 0 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const goldColor = new THREE.Color("#D4A574");
    const creamColor = new THREE.Color("#F5E6D3");
    const amberColor = new THREE.Color("#E8C89E");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      const pick = Math.random();
      const c = pick < 0.5 ? goldColor : pick < 0.8 ? creamColor : amberColor;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.035;
    pointsRef.current.rotation.x += delta * 0.018;
    const targetY = (progress - 0.5) * 4;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function SceneContent({ progress = 0 }) {
  const beanGroupRef = useRef();

  useFrame((state) => {
    if (beanGroupRef.current) {
      const t = state.clock.getElapsedTime();
      beanGroupRef.current.position.y = Math.sin(t * 0.8) * 0.18;
      beanGroupRef.current.rotation.z = Math.cos(t * 0.5) * 0.04;
    }
  });

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[5, 8, 5]} intensity={1.1} color="#FFF5E6" />
      <pointLight position={[-4, 2, 2]} intensity={1.2} color="#D4A574" distance={10} />
      <pointLight position={[4, -3, 1]} intensity={0.7} color="#B8895A" distance={8} />

      <FloatingParticles count={PARTICLE_COUNT} progress={progress} />

      <group ref={beanGroupRef}>
        <CoffeeBean3D position={[-4.5, 2.2, -3]} scale={0.4} rotationSpeed={0.4} />
        <CoffeeBean3D position={[4.2, -1.8, -2]} scale={0.5} rotationSpeed={0.3} />
        {!IS_MOBILE && <CoffeeBean3D position={[-3.2, -3.2, -4]} scale={0.35} rotationSpeed={0.5} />}
        {!IS_MOBILE && <CoffeeBean3D position={[5.0, 3.0, -5]} scale={0.3} rotationSpeed={0.25} />}
      </group>
    </>
  );
}

const ThreeScene = memo(function ThreeScene({ scrollProgress = 0 }) {
  // On very low-end mobile devices, skip WebGL to conserve battery & avoid jank
  if (SKIP_WEBGL) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
        transform: "translateZ(0)"
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, MAX_DPR]}
        gl={{
          alpha: true,
          powerPreference: IS_MOBILE ? "low-power" : "high-performance",
          antialias: false,
          depth: true,
          stencil: false
        }}
        style={{ pointerEvents: "none" }}
      >
        <SceneContent progress={scrollProgress} />
      </Canvas>
    </div>
  );
});

export default ThreeScene;

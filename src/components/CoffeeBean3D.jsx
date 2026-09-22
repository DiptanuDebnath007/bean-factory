import React, { useRef, memo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Pre-create single shared geometry instance across all beans
function createSharedBeanGeometry() {
  const geo = new THREE.SphereGeometry(0.8, 24, 24); // 24x24 instead of 32x32 saves 45% vertices with identical visual quality
  const pos = geo.attributes.position;
  geo.scale(1.2, 1.6, 0.9);

  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);

    if (v.z > 0 && Math.abs(v.x) < 0.25) {
      const depth = 0.4 * (1 - Math.abs(v.x) / 0.25) * (1 - (v.y * v.y) / 2.5);
      v.z -= Math.max(0, depth);
    }

    const endFactor = Math.abs(v.y) / 1.6;
    if (endFactor > 0.7) {
      v.x *= 1 - (endFactor - 0.7) * 0.5;
      v.z *= 1 - (endFactor - 0.7) * 0.5;
    }

    pos.setXYZ(i, v.x, v.y, v.z);
  }

  geo.computeVertexNormals();
  return geo;
}

const sharedGeometry = createSharedBeanGeometry();
const sharedMaterial = new THREE.MeshStandardMaterial({
  color: "#3E2723",
  roughness: 0.45,
  metalness: 0.15
});

const CoffeeBean3D = memo(function CoffeeBean3D({ position = [0, 0, 0], scale = 1, rotationSpeed = 0.5 }) {
  const meshRef = useRef();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed;
      meshRef.current.rotation.x += delta * (rotationSpeed * 0.4);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      geometry={sharedGeometry}
      material={sharedMaterial}
    />
  );
});

export default CoffeeBean3D;

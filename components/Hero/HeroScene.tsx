"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import * as THREE from "three";
import { Lighting } from "./Lighting";
import dynamic from "next/dynamic";

const WorkstationModel = dynamic(
  () => import("./WorkstationModel").then((mod) => mod.WorkstationModel),
  { ssr: false }
);

// Custom hook to detect if prefers-reduced-motion is active
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mediaQuery.matches);
    
    const listener = (event: MediaQueryListEvent) => setReduced(event.matches);
    mediaQuery.addEventListener("change", listener);
    
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);
  
  return reduced;
};

// CameraController component to handle mouse parallax and idle floating
const CameraController = ({ prefersReducedMotion }: { prefersReducedMotion: boolean }) => {
  useFrame((state) => {
    // 1. Compute bounding box of all visible meshes to center and frame automatically
    const box = new THREE.Box3();
    let hasMeshes = false;
    state.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.visible) {
        box.expandByObject(child);
        hasMeshes = true;
      }
    });

    if (!hasMeshes) return;

    const center = new THREE.Vector3();
    box.getCenter(center);
    const size = new THREE.Vector3();
    box.getSize(size);

    // 2. Identify monitor center as look-at target (fallback to box center)
    const target = center.clone();
    let mainMonitor: THREE.Object3D | undefined;
    state.scene.traverse((child) => {
      const nameLower = child.name.toLowerCase();
      if (nameLower.includes("cylinder") && nameLower.includes("screen")) {
        mainMonitor = child;
      }
    });

    if (mainMonitor) {
      mainMonitor.getWorldPosition(target);
      target.y += 0.05; // Offset slightly to look at monitor center
      target.x += 0.16; // Shift target slightly right to position the larger model nicely in the right column
    }

    // 3. Compute camera distance to fit bounds nicely in viewport using corner projection
    const corners = [
      new THREE.Vector3(box.min.x, box.min.y, box.min.z),
      new THREE.Vector3(box.min.x, box.min.y, box.max.z),
      new THREE.Vector3(box.min.x, box.max.y, box.min.z),
      new THREE.Vector3(box.min.x, box.max.y, box.max.z),
      new THREE.Vector3(box.max.x, box.min.y, box.min.z),
      new THREE.Vector3(box.max.x, box.min.y, box.max.z),
      new THREE.Vector3(box.max.x, box.max.y, box.min.z),
      new THREE.Vector3(box.max.x, box.max.y, box.max.z),
    ];

    // Direction vector for 3/4 front-right view (looking left-down-back)
    // Front is +X, Right is -Z. Camera is at front-right, so X_dir > 0, Z_dir < 0.
    const dir = new THREE.Vector3(1.1, 0.45, -1.95).normalize();

    const forward = dir.clone().normalize();
    const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), forward).normalize();
    const up = new THREE.Vector3().crossVectors(forward, right).normalize();

    let maxHalfHeight = 0;
    let maxHalfWidth = 0;

    corners.forEach((corner) => {
      const relVec = corner.clone().sub(target);
      const distUp = Math.abs(relVec.dot(up));
      const distRight = Math.abs(relVec.dot(right));
      if (relVec.dot(forward) < 0) {
        // Corner is behind the plane, which is expected
      }
      if (distUp > maxHalfHeight) maxHalfHeight = distUp;
      if (distRight > maxHalfWidth) maxHalfWidth = distRight;
    });

    if (!(state.camera instanceof THREE.PerspectiveCamera)) return;

    const fov = state.camera.fov * (Math.PI / 180);
    const aspect = state.camera.aspect || (state.size.width / state.size.height) || 1;
    
    const fitHeightDistance = maxHalfHeight / Math.tan(fov / 2);
    const fitWidthDistance = maxHalfWidth / (Math.tan(fov / 2) * aspect);
    let cameraDistance = Math.max(fitHeightDistance, fitWidthDistance);
    
    // Fine-tune scale margin to make the model larger and more visible
    cameraDistance *= 0.58;

    const basePos = target.clone().add(dir.multiplyScalar(cameraDistance));

    if (prefersReducedMotion) {
      state.camera.position.copy(basePos);
      state.camera.lookAt(target);
      return;
    }

    const time = state.clock.getElapsedTime();
    const pointer = state.pointer; // mouse positions mapped from -1 to 1

    // Idle float and Parallax movements
    const floatPeriod = 20;
    const idleX = Math.sin(time * ((Math.PI * 2) / floatPeriod)) * 0.1;
    const idleY = Math.cos(time * ((Math.PI * 2) / floatPeriod)) * 0.08;

    const targetX = basePos.x + idleX + pointer.x * 0.15;
    const targetY = basePos.y + idleY + pointer.y * 0.12;
    const targetZ = basePos.z;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);

    state.camera.lookAt(target);
  });

  return null;
};

export const HeroScene = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="w-full h-[650px] relative select-none cursor-default">
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [2.8, 1.6, 6.5],
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <WorkstationModel />
          <CameraController prefersReducedMotion={prefersReducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
};

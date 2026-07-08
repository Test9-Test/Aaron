"use client";

import { useGLTF, ContactShadows, Environment } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { basePath } from "@/lib/basePath";

// Preload the workstation model
useGLTF.preload(`${basePath}/models/workstation.glb`);

export const WorkstationModel = () => {
  // Load model
  const { scene } = useGLTF(`${basePath}/models/workstation.glb`);

  // Keep history for packets per second chart in cybersecurity dashboard
  const packetHistory = useRef<number[]>(new Array(40).fill(25));

  const [canvases, setCanvases] = useState<{ main: HTMLCanvasElement; vert: HTMLCanvasElement } | null>(null);

  useEffect(() => {
    const main = document.createElement("canvas");
    main.width = 1024;
    main.height = 512;

    const vert = document.createElement("canvas");
    vert.width = 512;
    vert.height = 1024;

    setCanvases({ main, vert });
  }, []);

  // Wrap canvases in Three.js textures
  const mainTexture = useMemo(() => {
    if (!canvases) return null;
    const tex = new THREE.CanvasTexture(canvases.main);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [canvases]);

  const vertTexture = useMemo(() => {
    if (!canvases) return null;
    const tex = new THREE.CanvasTexture(canvases.vert);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(6.0, 1.0);
    tex.offset.set(-5.0, 0.0);
    return tex;
  }, [canvases]);

  // Cybersecurity Dashboard Drawing Code
  const drawMainDashboard = (canvas: HTMLCanvasElement, time: number) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Background
    ctx.fillStyle = "#04020a";
    ctx.fillRect(0, 0, w, h);

    // Grid pattern
    ctx.strokeStyle = "rgba(112, 66, 248, 0.08)";
    ctx.lineWidth = 1;
    const gridSize = 20;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Border
    ctx.strokeStyle = "rgba(112, 66, 248, 0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(15, 15, w - 30, h - 30);

    // Neon Title Header
    ctx.fillStyle = "#b49bff";
    ctx.font = "bold 20px monospace";
    ctx.fillText("CYBERSECURITY MONITOR // SECURE_PORTFOLIO_OS", 35, 45);

    // Pulsating LED green indicator
    const pulse = Math.sin(time * 5.0) > 0;
    ctx.fillStyle = pulse ? "#22c55e" : "#166534";
    ctx.beginPath();
    ctx.arc(w - 60, 36, 8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px monospace";
    ctx.fillText("SYS_OK", w - 120, 41);

    // Header divider line
    ctx.strokeStyle = "rgba(112, 66, 248, 0.3)";
    ctx.beginPath();
    ctx.moveTo(15, 60);
    ctx.lineTo(w - 15, 60);
    ctx.stroke();

    // Widget 1: System Performance (CPU / RAM Dials)
    const w1X = 40;
    const w1Y = 80;
    const w1W = 280;
    const w1H = 210;

    ctx.strokeStyle = "rgba(112, 66, 248, 0.2)";
    ctx.strokeRect(w1X, w1Y, w1W, w1H);
    ctx.fillStyle = "rgba(112, 66, 248, 0.05)";
    ctx.fillRect(w1X, w1Y, w1W, w1H);

    ctx.fillStyle = "#22d3ee";
    ctx.font = "bold 13px monospace";
    ctx.fillText("RESOURCE STATUS", w1X + 15, w1Y + 25);

    // CPU Dial
    const cpuVal = 28 + Math.sin(time * 2.0) * 8 + Math.random() * 2;
    const dialR = 40;
    const cpuCX = w1X + 75;
    const cpuCY = w1Y + 110;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(cpuCX, cpuCY, dialR, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = "#a855f7"; // Purple
    ctx.beginPath();
    ctx.arc(cpuCX, cpuCY, dialR, -Math.PI/2, -Math.PI/2 + (cpuVal/100)*Math.PI*2);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px monospace";
    ctx.textAlign = "center";
    ctx.fillText(`${Math.round(cpuVal)}%`, cpuCX, cpuCY + 5);
    ctx.font = "9px monospace";
    ctx.fillText("CPU", cpuCX, cpuCY + 20);

    // RAM Dial
    const ramVal = 52 + Math.cos(time * 0.4) * 1.5;
    const ramCX = w1X + 205;
    const ramCY = w1Y + 110;

    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath(); ctx.arc(ramCX, ramCY, dialR, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = "#22d3ee"; // Cyan
    ctx.beginPath();
    ctx.arc(ramCX, ramCY, dialR, -Math.PI/2, -Math.PI/2 + (ramVal/100)*Math.PI*2);
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px monospace";
    ctx.fillText(`${Math.round(ramVal)}%`, ramCX, ramCY + 5);
    ctx.font = "9px monospace";
    ctx.fillText("MEM", ramCX, ramCY + 20);
    ctx.textAlign = "left"; // Reset alignment

    // Widget 2: Threat Detection Radar
    const w2X = 350;
    const w2Y = 80;
    const w2W = 310;
    const w2H = 210;

    ctx.strokeStyle = "rgba(112, 66, 248, 0.2)";
    ctx.strokeRect(w2X, w2Y, w2W, w2H);
    ctx.fillStyle = "rgba(112, 66, 248, 0.05)";
    ctx.fillRect(w2X, w2Y, w2W, w2H);

    ctx.fillStyle = "#22d3ee";
    ctx.font = "bold 13px monospace";
    ctx.fillText("THREAT DETECTION SCANNER", w2X + 15, w2Y + 25);

    const radCX = w2X + 155;
    const radCY = w2Y + 115;
    const radR = 60;

    // Draw Radar rings
    ctx.strokeStyle = "rgba(34, 197, 94, 0.2)";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(radCX, radCY, radR, 0, Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.arc(radCX, radCY, radR * 0.6, 0, Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.arc(radCX, radCY, radR * 0.3, 0, Math.PI*2); ctx.stroke();
    
    // Crosshairs
    ctx.beginPath(); ctx.moveTo(radCX - radR, radCY); ctx.lineTo(radCX + radR, radCY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(radCX, radCY - radR); ctx.lineTo(radCX, radCY + radR); ctx.stroke();

    // Radar Sweep
    const radAngle = (time * 1.8) % (Math.PI * 2);
    ctx.strokeStyle = "rgba(34, 197, 94, 0.7)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(radCX, radCY);
    ctx.lineTo(radCX + Math.cos(radAngle) * radR, radCY + Math.sin(radAngle) * radR);
    ctx.stroke();

    ctx.fillStyle = "rgba(34, 197, 94, 0.04)";
    ctx.beginPath();
    ctx.moveTo(radCX, radCY);
    ctx.arc(radCX, radCY, radR, radAngle - 0.4, radAngle);
    ctx.closePath();
    ctx.fill();

    // Blinking threats
    const isThreatVisible = Math.sin(time * 4.0) > 0.1;
    ctx.fillStyle = isThreatVisible ? "rgba(239, 68, 68, 0.9)" : "rgba(239, 68, 68, 0.2)";
    ctx.beginPath(); ctx.arc(radCX + 20, radCY - 25, 4, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(radCX - 30, radCY + 15, 3, 0, Math.PI*2); ctx.fill();

    ctx.fillStyle = "#ef4444";
    ctx.font = "9px monospace";
    ctx.fillText("FIREWALL SECURITY: MONITORING", w2X + 15, w2Y + 200);

    // Widget 3: Live network traffic line chart (Packets/Sec)
    const w3X = 690;
    const w3Y = 80;
    const w3W = 290;
    const w3H = 210;

    ctx.strokeStyle = "rgba(112, 66, 248, 0.2)";
    ctx.strokeRect(w3X, w3Y, w3W, w3H);
    ctx.fillStyle = "rgba(112, 66, 248, 0.05)";
    ctx.fillRect(w3X, w3Y, w3W, w3H);

    ctx.fillStyle = "#22d3ee";
    ctx.font = "bold 13px monospace";
    ctx.fillText("NETWORK TRAFFIC (PKTS/SEC)", w3X + 15, w3Y + 25);

    // Append new packet count
    if (Math.random() < 0.4) {
      packetHistory.current.shift();
      const prevVal = packetHistory.current[packetHistory.current.length - 1];
      const delta = (Math.random() - 0.5) * 8;
      const nextVal = Math.min(Math.max(prevVal + delta, 10), 90);
      packetHistory.current.push(nextVal);
    }

    // Draw line chart
    ctx.strokeStyle = "#22c55e";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    const gW = w3W - 40;
    const gH = 110;
    const sX = w3X + 20;
    const sY = w3Y + 160;

    packetHistory.current.forEach((val, idx) => {
      const px = sX + (idx / (packetHistory.current.length - 1)) * gW;
      const py = sY - (val / 100) * gH;
      if (idx === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.stroke();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px monospace";
    const curPkt = Math.round(packetHistory.current[packetHistory.current.length - 1] * 7 + 280);
    ctx.fillText(`RATE: ${curPkt} PKTS/S`, w3X + 15, w3Y + 195);

    // Widget 4: Firewall Logs (Bottom Screen)
    const logX = 40;
    const logY = 310;
    const logW = w - 80;
    const logH = 165;

    ctx.strokeStyle = "rgba(112, 66, 248, 0.2)";
    ctx.strokeRect(logX, logY, logW, logH);
    ctx.fillStyle = "rgba(7, 4, 18, 0.85)";
    ctx.fillRect(logX, logY, logW, logH);

    ctx.fillStyle = "#a855f7";
    ctx.font = "bold 13px monospace";
    ctx.fillText("FIREWALL SYSTEM BLOCK LOGS", logX + 15, logY + 22);

    const logs = [
      `[SEC] BLOCKED PORT SCAN on TCP 23 from IP: 198.51.100.${Math.floor(time) % 255}`,
      `[SEC] IP VERIFIED: Local DHCP routing validated for client_08`,
      `[SEC] THREAT MITIGATED: Intrusion prevention system updated core protocols`,
      `[SEC] DETECTED anomalous activity on subnet 10.0.0.12 - traffic rerouted`,
      `[SEC] FIREWALL SHIELD status: ACTIVE // 100% integrity secured`
    ];

    ctx.fillStyle = "#38bdf8";
    ctx.font = "11px monospace";
    logs.forEach((log, index) => {
      ctx.fillText(log, logX + 15, logY + 48 + index * 22);
    });
  };

  // Vertical Monitor (Tech Skills Terminal) Drawing Code
  const drawVertTerminal = (canvas: HTMLCanvasElement, time: number) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Background
    ctx.fillStyle = "#020108";
    ctx.fillRect(0, 0, w, h);

    // Faint grid
    ctx.strokeStyle = "rgba(34, 197, 94, 0.04)";
    ctx.lineWidth = 1;
    const gridSz = 16;
    for (let x = 0; x < w; x += gridSz) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSz) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Border
    ctx.strokeStyle = "rgba(34, 197, 94, 0.3)";
    ctx.lineWidth = 2;
    ctx.strokeRect(15, 15, w - 30, h - 30);

    // Terminal title
    ctx.fillStyle = "#22c55e"; // Bright green
    ctx.font = "bold 15px monospace";
    ctx.fillText("HACKSTONE CYBER CORE v1.9", 30, 45);
    ctx.font = "11px monospace";
    ctx.fillText("STATUS: ATTACHED_SECURE_TUNNEL", 30, 65);

    ctx.beginPath();
    ctx.moveTo(15, 80);
    ctx.lineTo(w - 15, 80);
    ctx.stroke();

    // Skills List Header
    ctx.fillStyle = "#86efac";
    ctx.font = "bold 16px monospace";
    ctx.fillText("> SECURITY SPECIALIZATION:", 30, 115);

    const skills = [
      "HackStone",
      "Cyber Security",
      "Networking",
      "Cloud",
      "AI"
    ];

    // Draw skills with a terminal typing cursor simulation
    skills.forEach((skill, idx) => {
      const activeIdx = Math.floor(time * 0.7) % skills.length;
      const isActive = idx === activeIdx;
      const cursor = (isActive && Math.sin(time * 8.0) > 0) ? "_" : "";

      ctx.fillStyle = isActive ? "#ffffff" : "rgba(34, 197, 94, 0.85)";
      ctx.font = "bold 19px monospace";
      ctx.fillText(`[+] ${skill}${cursor}`, 40, 160 + idx * 45);
    });

    ctx.strokeStyle = "rgba(34, 197, 94, 0.3)";
    ctx.beginPath();
    ctx.moveTo(15, 435);
    ctx.lineTo(w - 15, 435);
    ctx.stroke();

    // Raw hex/binary stream log (bottom half)
    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 15px monospace";
    ctx.fillText("> TUNNEL PACKETS RX/TX", 30, 465);

    ctx.font = "11px monospace";
    const rows = 16;
    const startY = 495;

    for (let i = 0; i < rows; i++) {
      const seed = Math.floor(time * 2.5) + i;
      const binary = Array.from({ length: 26 }, (_, bIdx) => {
        // pseudo-random binary based on math formula
        return Math.sin(seed * 0.5 + bIdx) > 0 ? "1" : "0";
      }).join("");

      // Gradient fade out
      const opacity = (i / rows) * 0.7 + 0.3;
      ctx.fillStyle = `rgba(34, 197, 94, ${opacity})`;
      ctx.fillText(`STREAM_0x${(i * 8).toString(16).toUpperCase()}: ${binary}`, 35, startY + i * 27);
    }

    // Dynamic system alert box at base
    ctx.fillStyle = "rgba(34, 197, 94, 0.08)";
    ctx.fillRect(30, 935, w - 60, 50);
    ctx.strokeStyle = "rgba(34, 197, 94, 0.35)";
    ctx.strokeRect(30, 935, w - 60, 50);

    ctx.fillStyle = "#22c55e";
    ctx.font = "bold 13px monospace";
    ctx.fillText("INTEGRITY ROUTING GUARD: ACTIVE", 50, 965);
  };

  // Override model materials inside useMemo to avoid cloning on every render
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    const toRemove: THREE.Object3D[] = [];

    // Ensure all workstation nodes and meshes are visible and set shadows
    clone.traverse((node) => {
      node.visible = true;
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
      // Collect camera or light nodes embedded in the GLB to remove
      if (node instanceof THREE.Camera || node instanceof THREE.Light) {
        toRemove.push(node);
      }
    });

    // Remove the cameras and lights
    toRemove.forEach((obj) => {
      if (obj.parent) {
        obj.parent.remove(obj);
      }
    });

    return clone;
  }, [scene]);

  // Keep references to components we want to animate in useFrame loop
  const fanTextureRef = useRef<THREE.Texture | null>(null);
  const caseFanMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const frontFansMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const keyboardMatRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    // Print every node in the model hierarchy as requested for debugging
    clonedScene.traverse((node) => {
      console.log(node.name, node.type, node.visible);
    });

    // Compute and log the 3D model bounding box to calculate standard scale and offset
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    console.log("WORKSTATION MODEL BOUNDS: size=" + JSON.stringify({x: size.x, y: size.y, z: size.z}) + " center=" + JSON.stringify({x: center.x, y: center.y, z: center.z}));

    // Scale PC Case down slightly (4% reduction)
    const pcCase = clonedScene.getObjectByName("Plane_Plane001");
    if (pcCase) {
      pcCase.scale.set(0.96, 0.96, 0.96);
    }

    // Find the original main monitor screen material from the scene object
    const mainScreenMesh = scene.getObjectByName("Cylinder_screen002_0") as THREE.Mesh | undefined;
    const screenMaterial = mainScreenMesh && !Array.isArray(mainScreenMesh.material) ? mainScreenMesh.material : null;

    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const nameLower = child.name.toLowerCase();

        // Improve reflections on PC glass panel
        const isPCGlass = nameLower.includes("plane_plane") && nameLower.includes("019");
        if (isPCGlass) {
          const mat = child.material as THREE.MeshStandardMaterial;
          mat.roughness = 0.05;
          mat.metalness = 0.95;
          mat.transparent = true;
          mat.opacity = 0.25;
          mat.envMapIntensity = 2.5;
        }

        // Improve reflections on desk surface
        const isDeskSurface = nameLower.includes("desk_material001");
        if (isDeskSurface) {
          const mat = child.material as THREE.MeshStandardMaterial;
          mat.roughness = 0.12;
          mat.metalness = 0.15;
          mat.envMapIntensity = 1.8;
        }

        // Improve reflections on monitor bezels
        const isMonitorBezel = (nameLower.includes("plane006") && nameLower.includes("010")) ||
                               (nameLower.includes("cylinder") && nameLower.includes("plastic002"));
        if (isMonitorBezel) {
          const mat = child.material as THREE.MeshStandardMaterial;
          mat.roughness = 0.25;
          mat.metalness = 0.5;
          mat.envMapIntensity = 1.8;
        }

        // Override Main Monitor screen texture on client mount (robust name match)
        const isMainMonitorScreen = nameLower.includes("cylinder") && nameLower.includes("screen");
        if (isMainMonitorScreen && mainTexture) {
          if (screenMaterial) {
            const mainMat = screenMaterial.clone() as THREE.MeshStandardMaterial;
            mainMat.map = mainTexture;
            mainMat.emissiveMap = mainTexture;
            mainMat.emissive = new THREE.Color(0xffffff);
            mainMat.emissiveIntensity = 2.5; // Powered on emissive curved monitor
            mainMat.side = THREE.DoubleSide;
            child.material = mainMat;
          } else {
            child.material = new THREE.MeshStandardMaterial({
              map: mainTexture,
              emissiveMap: mainTexture,
              emissive: new THREE.Color(0xffffff),
              emissiveIntensity: 2.5,
              roughness: 0.1,
              metalness: 0.1,
              side: THREE.DoubleSide,
            });
          }
        }
        
        // Override Vertical Monitor screen texture on client mount (robust name match)
        const isVertMonitorScreen = nameLower.includes("plane006") && nameLower.includes("009");
        if (isVertMonitorScreen && vertTexture) {
          if (screenMaterial) {
            const vertMat = screenMaterial.clone() as THREE.MeshStandardMaterial;
            vertMat.map = vertTexture;
            vertMat.emissiveMap = vertTexture;
            vertMat.emissive = new THREE.Color(0xffffff);
            vertMat.emissiveIntensity = 3.5; // Slightly increased emissive intensity
            vertMat.side = THREE.DoubleSide;
            child.material = vertMat;
          } else {
            child.material = new THREE.MeshStandardMaterial({
              map: vertTexture,
              emissiveMap: vertTexture,
              emissive: new THREE.Color(0xffffff),
              emissiveIntensity: 3.5,
              roughness: 0.1,
              metalness: 0.1,
              side: THREE.DoubleSide,
            });
          }
        }

        // Find case fan texture and material (robust name match)
        const isCaseFan = nameLower.includes("plane_plane") && nameLower.includes("018");
        if (isCaseFan) {
          caseFanMatRef.current = child.material as THREE.MeshStandardMaterial;
          if (caseFanMatRef.current?.map) {
            fanTextureRef.current = caseFanMatRef.current.map;
            // Setup texture properties for clean rotation around center
            fanTextureRef.current.wrapS = THREE.RepeatWrapping;
            fanTextureRef.current.wrapT = THREE.RepeatWrapping;
            fanTextureRef.current.center.set(0.5, 0.5);
          }
        }
        
        // Find front fans material (robust name match)
        const isFrontFans = nameLower.includes("plane_plane") && nameLower.includes("020");
        if (isFrontFans) {
          frontFansMatRef.current = child.material as THREE.MeshStandardMaterial;
        }

        // Find keyboard material (robust name match)
        const isKeyboard = nameLower.includes("plane") && nameLower.includes("material") && nameLower.includes("003");
        if (isKeyboard) {
          keyboardMatRef.current = child.material as THREE.MeshStandardMaterial;
        }
      }
    });
  }, [clonedScene, mainTexture, vertTexture, scene]);

  // Throttle canvas painting to ~15 FPS to optimize laptop performance
  const lastDrawTimeRef = useRef(0);

  // useFrame updates textures, rotates fans, and cycles RGB color values
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Draw dashboards at ~15 FPS
    if (time - lastDrawTimeRef.current > 0.066) {
      lastDrawTimeRef.current = time;
      if (canvases) {
        drawMainDashboard(canvases.main, time);
        if (mainTexture) mainTexture.needsUpdate = true;
        drawVertTerminal(canvases.vert, time);
        if (vertTexture) vertTexture.needsUpdate = true;
      }
    }

    // 2. Animate PC case fan blades (slowly rotate texture)
    if (fanTextureRef.current) {
      fanTextureRef.current.rotation += 0.04;
    }

    // 3. Cycle RGB colors through Purple, Blue, and White
    const rgbColors = [
      new THREE.Color("#a855f7"), // Purple
      new THREE.Color("#0ea5e9"), // Cyan/Blue
      new THREE.Color("#ffffff"), // White
    ];

    const cycleTime = 5.0; // 5 seconds per color cycle
    const currentIdx = Math.floor(time / cycleTime) % rgbColors.length;
    const nextIdx = (currentIdx + 1) % rgbColors.length;
    const progress = (time % cycleTime) / cycleTime;
    
    // Smooth cosine interpolation
    const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;

    const rgbColor = new THREE.Color().lerpColors(
      rgbColors[currentIdx],
      rgbColors[nextIdx],
      easeProgress
    );

    // Apply RGB color and glowing emissive to PC fan lights
    if (caseFanMatRef.current) {
      caseFanMatRef.current.emissive = rgbColor;
      caseFanMatRef.current.emissiveIntensity = 2.0;
      caseFanMatRef.current.toneMapped = false;
    }

    if (frontFansMatRef.current) {
      frontFansMatRef.current.emissive = rgbColor;
      frontFansMatRef.current.emissiveIntensity = 2.0;
      frontFansMatRef.current.toneMapped = false;
    }

    // Apply slow breathing glow and RGB color to Keyboard
    if (keyboardMatRef.current) {
      const breathingGlow = Math.sin(time * 2.2) * 0.25 + 0.75; // oscillates between 0.5 and 1.0
      keyboardMatRef.current.emissive = rgbColor;
      keyboardMatRef.current.emissiveIntensity = breathingGlow * 1.4;
      keyboardMatRef.current.toneMapped = false;
    }
  });

  // Dispose resources when component is unmounted to prevent memory leaks
  useEffect(() => {
    return () => {
      if (mainTexture) mainTexture.dispose();
      if (vertTexture) vertTexture.dispose();
      clonedScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => mat.dispose());
          } else if (child.material) {
            child.material.dispose();
          }
        }
      });
    };
  }, [clonedScene, mainTexture, vertTexture]);

  // Position, scale, and center the model
  return (
    <group
      position={[0, -1.7, 0]}
      scale={0.60}
      rotation={[0, 0, 0]}
    >
      <primitive object={clonedScene} />

      {/* Soft contact shadows under desk, chair, and PC */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.5}
        scale={12}
        blur={2.0}
        far={1.5}
      />

      {/* Environment preset to provide realistic PBR reflections */}
      <Environment preset="city" />

      {/* Faint purple edge light specifically for the chair */}
      <pointLight
        position={[3.2, 1.5, -0.4]}
        intensity={2.5}
        distance={3.0}
        color="#a855f7"
      />

      {/* White Monitor Glow (placed just in front of the monitors, in model coordinates) */}
      <pointLight
        position={[0.32, 4.08, 4.0]}
        intensity={3.2} // Slightly increased monitor glow
        distance={8.0}
        color="#ffffff"
      />

      {/* PC RGB Highlight Glow (placed inside/near the PC case, in model coordinates) */}
      <pointLight
        position={[0.0, 3.6, -2.4]}
        intensity={1.8}
        distance={5.0}
        color="#a855f7"
      />
    </group>
  );
};

"use client";

import React, { useEffect, useRef } from "react";

interface Node {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  type: "server" | "client" | "router" | "firewall";
  radius: number;
  pulseRadius: number;
  pulseActive: boolean;
}

interface Connection {
  from: Node;
  to: Node;
  packetPos: number; // 0 to 1 along the path
  packetSpeed: number;
}

export const AnimatedNetworkGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Generate network nodes
    const nodeTypes: Array<Node["type"]> = ["server", "client", "router", "firewall"];
    const nodes: Node[] = [];
    const nodeCount = 24;

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      nodes.push({
        id: i,
        x,
        y,
        targetX: x,
        targetY: y,
        type: nodeTypes[Math.floor(Math.random() * nodeTypes.length)],
        radius: 4 + Math.random() * 3,
        pulseRadius: 0,
        pulseActive: Math.random() > 0.5,
      });
    }

    // Connect close nodes
    const connections: Connection[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Link threshold
        if (dist < 220) {
          connections.push({
            from: nodes[i],
            to: nodes[j],
            packetPos: Math.random(),
            packetSpeed: 0.002 + Math.random() * 0.003,
          });
        }
      }
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Connections (links)
      connections.forEach((conn) => {
        const dx = conn.from.x - conn.to.x;
        const dy = conn.from.y - conn.to.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const alpha = Math.max(0, 1 - dist / 220) * 0.25;

        ctx.strokeStyle = `rgba(147, 51, 234, ${alpha})`; // Purple lines
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(conn.from.x, conn.from.y);
        ctx.lineTo(conn.to.x, conn.to.y);
        ctx.stroke();

        // 2. Draw Packet Flow along connection
        conn.packetPos += conn.packetSpeed;
        if (conn.packetPos > 1) {
          conn.packetPos = 0;
          conn.packetSpeed = 0.002 + Math.random() * 0.003;
        }

        const px = conn.from.x + (conn.to.x - conn.from.x) * conn.packetPos;
        const py = conn.from.y + (conn.to.y - conn.from.y) * conn.packetPos;

        ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 2.5})`; // Cyan packets
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Nodes and Pulses
      nodes.forEach((node) => {
        // Soft drift motion
        if (Math.random() < 0.01) {
          node.targetX = node.x + (Math.random() - 0.5) * 15;
          node.targetY = node.y + (Math.random() - 0.5) * 15;
        }

        // Clamp drift inside boundaries
        node.targetX = Math.max(20, Math.min(width - 20, node.targetX));
        node.targetY = Math.max(20, Math.min(height - 20, node.targetY));

        node.x += (node.targetX - node.x) * 0.02;
        node.y += (node.targetY - node.y) * 0.02;

        // Draw active radar pulses
        if (node.pulseActive) {
          node.pulseRadius += 0.45;
          if (node.pulseRadius > 35) {
            node.pulseRadius = 0;
            node.pulseActive = Math.random() > 0.3; // Decide whether to repeat
          }

          const pulseAlpha = (1 - node.pulseRadius / 35) * 0.3;
          ctx.strokeStyle = node.type === "firewall"
            ? `rgba(239, 68, 68, ${pulseAlpha})` // Red for firewall
            : `rgba(6, 182, 212, ${pulseAlpha})`; // Cyan for others

          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.pulseRadius, 0, Math.PI * 2);
          ctx.stroke();
        } else if (Math.random() < 0.005) {
          node.pulseActive = true;
          node.pulseRadius = 0;
        }

        // Draw node center point
        let color = "rgba(168, 85, 247, 0.6)"; // Purple base
        if (node.type === "server") color = "rgba(6, 182, 212, 0.7)"; // Cyan server
        if (node.type === "firewall") color = "rgba(239, 68, 68, 0.7)"; // Red firewall
        if (node.type === "router") color = "rgba(234, 179, 8, 0.7)"; // Yellow router

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();

        // Node core light
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-[-15] opacity-40 bg-transparent"
    />
  );
};

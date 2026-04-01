"use client";

import { useEffect, useRef } from "react";

export default function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const size = 256;
    canvas.width = size;
    canvas.height = size;

    function generateNoise() {
      const imageData = ctx!.createImageData(size, size);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 12; // ~4.7% opacity
      }
      ctx!.putImageData(imageData, 0, 0);
    }

    let frame = 0;
    function loop() {
      frame++;
      if (frame % 4 === 0) {
        generateNoise();
      }
      animationId = requestAnimationFrame(loop);
    }

    generateNoise();
    loop();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.04]"
      style={{
        imageRendering: "pixelated",
        width: "100%",
        height: "100%",
      }}
      aria-hidden="true"
    />
  );
}

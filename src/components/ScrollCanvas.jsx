import React, { useRef, useEffect, useState, useCallback, memo } from "react";
import { TOTAL_FRAMES } from "../hooks/useScrollAnimation";

const ScrollCanvas = memo(function ScrollCanvas({ currentFrame, onProgress, onInitialLoad }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef(new Array(TOTAL_FRAMES + 1));
  const loadedCountRef = useRef(0);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const currentFrameRef = useRef(currentFrame);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  currentFrameRef.current = currentFrame;

  // Format frame number: 1 -> "001", 42 -> "042", 300 -> "300"
  const getFrameUrl = useCallback((index) => {
    const padded = String(index).padStart(3, "0");
    return `/frames/ezgif-frame-${padded}.png`;
  }, []);

  // Optimized progressive preloader with asynchronous decode
  useEffect(() => {
    let isCancelled = false;
    const images = imagesRef.current;

    // Load single image with off-thread decode
    const loadImage = (index) => {
      if (images[index] || isCancelled) return Promise.resolve(images[index]);

      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFrameUrl(index);

        img.onload = () => {
          if (isCancelled) return resolve(null);
          // Asynchronously decode image so main thread doesn't stutter on drawImage
          if ("decode" in img) {
            img.decode()
              .catch(() => {})
              .finally(() => {
                if (isCancelled) return resolve(null);
                images[index] = img;
                loadedCountRef.current++;
                if (onProgress) {
                  const pct = Math.min(100, Math.round((loadedCountRef.current / TOTAL_FRAMES) * 100));
                  onProgress(pct);
                }
                resolve(img);
              });
          } else {
            images[index] = img;
            loadedCountRef.current++;
            if (onProgress) {
              const pct = Math.min(100, Math.round((loadedCountRef.current / TOTAL_FRAMES) * 100));
              onProgress(pct);
            }
            resolve(img);
          }
        };

        img.onerror = () => {
          loadedCountRef.current++;
          resolve(null);
        };
      });
    };

    // Phase 1: Load First Frame with high priority
    loadImage(1).then((img) => {
      if (isCancelled || !img) return;
      setFirstFrameReady(true);
      if (onInitialLoad) onInitialLoad();
      drawFrame(1);

      // Phase 2: Rapid Stride Keyframes (every 5th frame across the entire 300 frames)
      // Guarantees that within seconds, any scroll position has an instant adjacent frame
      const keyframes = [];
      for (let i = 5; i <= TOTAL_FRAMES; i += 5) {
        keyframes.push(i);
      }

      let keyIdx = 0;
      const loadKeyframes = () => {
        if (isCancelled || keyIdx >= keyframes.length) {
          loadRemainingFrames();
          return;
        }

        const batch = keyframes.slice(keyIdx, keyIdx + 6);
        keyIdx += 6;
        Promise.all(batch.map(loadImage)).then(() => {
          if (!isCancelled) {
            // Draw immediately if current frame got loaded
            drawFrame(currentFrameRef.current);
            setTimeout(loadKeyframes, 10);
          }
        });
      };

      // Phase 3: Progressive background hydration of all intermediate frames
      const loadRemainingFrames = () => {
        if (isCancelled) return;
        const missing = [];
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
          if (!images[i]) missing.push(i);
        }

        let mIdx = 0;
        const loadMissingBatch = () => {
          if (isCancelled || mIdx >= missing.length) return;
          const batch = missing.slice(mIdx, mIdx + 6);
          mIdx += 6;
          Promise.all(batch.map(loadImage)).then(() => {
            if (!isCancelled && mIdx < missing.length) {
              setTimeout(loadMissingBatch, 15);
            }
          });
        };
        loadMissingBatch();
      };

      loadKeyframes();
    });

    return () => {
      isCancelled = true;
    };
  }, [getFrameUrl, onProgress, onInitialLoad]);

  // Fast Cover draw with precomputed layout
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    // Find closest loaded frame if target is still downloading
    let img = imagesRef.current[frameIndex];
    if (!img || !img.complete) {
      for (let offset = 1; offset <= 25; offset++) {
        const prev = imagesRef.current[Math.max(1, frameIndex - offset)];
        if (prev && prev.complete) { img = prev; break; }
        const next = imagesRef.current[Math.min(TOTAL_FRAMES, frameIndex + offset)];
        if (next && next.complete) { img = next; break; }
      }
    }

    if (!img || !img.naturalWidth) return;

    const { width, height, dpr } = sizeRef.current;
    if (width === 0 || height === 0) return;

    // High performance cover calculation
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const imgRatio = imgW / imgH;
    const screenRatio = width / height;

    let renderW, renderH, offsetX, offsetY;

    if (screenRatio > imgRatio) {
      renderW = width * dpr;
      renderH = (width / imgRatio) * dpr;
      offsetX = 0;
      offsetY = ((height * dpr) - renderH) * 0.5;
    } else {
      renderH = height * dpr;
      renderW = (height * imgRatio) * dpr;
      offsetX = ((width * dpr) - renderW) * 0.5;
      offsetY = 0;
    }

    // Direct GPU canvas blit
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "medium";
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
  }, []);

  // Update canvas on frame change
  useEffect(() => {
    drawFrame(currentFrame);
  }, [currentFrame, drawFrame]);

  // Handle window resize with cached metrics
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.75); // Cap DPR at 1.75 for 60-120fps performance
      const w = window.innerWidth;
      const h = window.innerHeight;

      sizeRef.current = { width: w, height: h, dpr };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [drawFrame]);

  return (
    <canvas
      ref={canvasRef}
      id="scrollCanvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        pointerEvents: "none",
        background: "#0a0a0a",
        display: "block",
        transform: "translateZ(0)",
        willChange: "contents"
      }}
    />
  );
});

export default ScrollCanvas;

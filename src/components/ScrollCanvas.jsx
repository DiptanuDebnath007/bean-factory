import React, { useRef, useEffect, useState, useCallback, memo } from "react";
import { TOTAL_FRAMES } from "../hooks/useScrollAnimation";

// Detect device capability once at module load
const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 768;
const BATCH_SIZE = IS_MOBILE ? 4 : 6;
const getMobileResizeWidth = () =>
  IS_MOBILE ? Math.round(window.innerWidth * 0.65 * (window.devicePixelRatio || 1)) : null;

const ScrollCanvas = memo(function ScrollCanvas({ currentFrame, onProgress, onInitialLoad }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef(new Array(TOTAL_FRAMES + 1));
  const loadedCountRef = useRef(0);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });
  const currentFrameRef = useRef(currentFrame);
  const [firstFrameReady, setFirstFrameReady] = useState(false);

  currentFrameRef.current = currentFrame;

  const getFrameUrl = useCallback((index) => {
    const padded = String(index).padStart(3, "0");
    return `/frames/ezgif-frame-${padded}.png`;
  }, []);

  const loadImage = useCallback(
    (index) => {
      const images = imagesRef.current;
      if (images[index]) return Promise.resolve(images[index]);

      return fetch(getFrameUrl(index))
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.blob();
        })
        .then((blob) => {
          if (typeof createImageBitmap === "function") {
            const resizeWidth = getMobileResizeWidth();
            if (resizeWidth) {
              return createImageBitmap(blob, { resizeWidth, resizeQuality: "medium" });
            }
            return createImageBitmap(blob);
          }
          return new Promise((resolve) => {
            const url = URL.createObjectURL(blob);
            const img = new Image();
            img.src = url;
            img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
            img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
          });
        })
        .then((bitmap) => {
          if (!bitmap) return null;
          images[index] = bitmap;
          loadedCountRef.current++;
          if (onProgress) {
            const pct = Math.min(100, Math.round((loadedCountRef.current / TOTAL_FRAMES) * 100));
            onProgress(pct);
          }
          return bitmap;
        })
        .catch(() => {
          loadedCountRef.current++;
          return null;
        });
    },
    [getFrameUrl, onProgress]
  );

  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    let img = imagesRef.current[frameIndex];
    if (!img) {
      for (let offset = 1; offset <= 25; offset++) {
        const prev = imagesRef.current[Math.max(1, frameIndex - offset)];
        if (prev) { img = prev; break; }
        const next = imagesRef.current[Math.min(TOTAL_FRAMES, frameIndex + offset)];
        if (next) { img = next; break; }
      }
    }
    if (!img) return;

    const { width, height, dpr } = sizeRef.current;
    if (width === 0 || height === 0) return;

    const imgW = img.naturalWidth ?? img.width;
    const imgH = img.naturalHeight ?? img.height;
    if (!imgW || !imgH) return;

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

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = IS_MOBILE ? "low" : "medium";
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
  }, []);

  useEffect(() => {
    let isCancelled = false;
    const loadFrameSafe = (index) => isCancelled ? Promise.resolve(null) : loadImage(index);

    loadFrameSafe(1).then((img) => {
      if (isCancelled || !img) return;
      setFirstFrameReady(true);
      if (onInitialLoad) onInitialLoad();
      drawFrame(1);

      const keyframes = [];
      for (let i = 5; i <= TOTAL_FRAMES; i += 5) keyframes.push(i);

      let keyIdx = 0;
      const loadKeyframes = () => {
        if (isCancelled || keyIdx >= keyframes.length) { loadRemainingFrames(); return; }
        const batch = keyframes.slice(keyIdx, keyIdx + BATCH_SIZE);
        keyIdx += BATCH_SIZE;
        Promise.all(batch.map(loadFrameSafe)).then(() => {
          if (!isCancelled) {
            drawFrame(currentFrameRef.current);
            setTimeout(loadKeyframes, IS_MOBILE ? 20 : 10);
          }
        });
      };

      const loadRemainingFrames = () => {
        if (isCancelled) return;
        const images = imagesRef.current;
        const missing = [];
        for (let i = 1; i <= TOTAL_FRAMES; i++) { if (!images[i]) missing.push(i); }
        let mIdx = 0;
        const loadMissingBatch = () => {
          if (isCancelled || mIdx >= missing.length) return;
          const batch = missing.slice(mIdx, mIdx + BATCH_SIZE);
          mIdx += BATCH_SIZE;
          Promise.all(batch.map(loadFrameSafe)).then(() => {
            if (!isCancelled && mIdx < missing.length) {
              setTimeout(loadMissingBatch, IS_MOBILE ? 30 : 15);
            }
          });
        };
        loadMissingBatch();
      };

      loadKeyframes();
    });

    return () => { isCancelled = true; };
  }, [loadImage, onInitialLoad, drawFrame]);

  useEffect(() => { drawFrame(currentFrame); }, [currentFrame, drawFrame]);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, IS_MOBILE ? 1 : 1.5);
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

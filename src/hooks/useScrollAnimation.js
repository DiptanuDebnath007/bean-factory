import { useState, useEffect, useRef, useCallback } from "react";

export const TOTAL_FRAMES = 300;

export const SECTIONS = [
  { id: "hero", name: "Welcome", startFrame: 1, endFrame: 60 },
  { id: "about", name: "Our Story", startFrame: 61, endFrame: 120 },
  { id: "menu", name: "Menu", startFrame: 121, endFrame: 180 },
  { id: "gallery", name: "Ambience", startFrame: 181, endFrame: 240 },
  { id: "contact", name: "Visit Us", startFrame: 241, endFrame: 300 }
];

export function useScrollAnimation() {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  const targetFrameRef = useRef(1);
  const currentFrameRef = useRef(1);
  const lastDispatchedFrameRef = useRef(1);
  const lastDispatchedProgressRef = useRef(0);
  const activeSectionRef = useRef("hero");
  const isAnimatingRef = useRef(false);
  const animFrameIdRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const rawProgress = window.scrollY / scrollHeight;
      const progress = Math.min(Math.max(rawProgress, 0), 1);

      // Throttled progress state update (only when changed by >= 0.2%)
      if (Math.abs(progress - lastDispatchedProgressRef.current) > 0.002) {
        lastDispatchedProgressRef.current = progress;
        setScrollProgress(progress);
      }

      // Map progress to target frame [1 .. TOTAL_FRAMES]
      const frame = Math.min(Math.max(Math.round(progress * (TOTAL_FRAMES - 1)) + 1, 1), TOTAL_FRAMES);
      targetFrameRef.current = frame;

      // Section boundary detection (only dispatch state if section actually changed)
      for (let i = 0; i < SECTIONS.length; i++) {
        const s = SECTIONS[i];
        if (frame >= s.startFrame && frame <= s.endFrame) {
          if (activeSectionRef.current !== s.id) {
            activeSectionRef.current = s.id;
            setActiveSection(s.id);
          }
          break;
        }
      }

      // Start RAF loop if not already running
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        animFrameIdRef.current = requestAnimationFrame(updateLoop);
      }
    };

    const updateLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      const absDiff = Math.abs(diff);

      if (absDiff > 0.04) {
        // Dynamic damping: faster catchup on large scrolls, silky smooth on slow crawls
        const factor = absDiff > 15 ? 0.35 : 0.28;
        currentFrameRef.current += diff * factor;
        const rounded = Math.round(currentFrameRef.current);

        if (rounded !== lastDispatchedFrameRef.current) {
          lastDispatchedFrameRef.current = rounded;
          setCurrentFrame(rounded);
        }

        animFrameIdRef.current = requestAnimationFrame(updateLoop);
      } else {
        // Snapped to target frame
        currentFrameRef.current = targetFrameRef.current;
        if (targetFrameRef.current !== lastDispatchedFrameRef.current) {
          lastDispatchedFrameRef.current = targetFrameRef.current;
          setCurrentFrame(targetFrameRef.current);
        }
        isAnimatingRef.current = false;
        animFrameIdRef.current = null;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
        animFrameIdRef.current = null;
      }
      isAnimatingRef.current = false;
    };
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const sectionIndex = SECTIONS.findIndex((s) => s.id === sectionId);
    if (sectionIndex === -1) return;

    const targetSection = SECTIONS[sectionIndex];
    const targetFrame = targetSection.startFrame + 5;
    const progress = (targetFrame - 1) / (TOTAL_FRAMES - 1);
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetY = progress * scrollHeight;

    window.scrollTo({
      top: targetY,
      behavior: "smooth"
    });
  }, []);

  return {
    currentFrame,
    scrollProgress,
    activeSection,
    scrollToSection,
    totalFrames: TOTAL_FRAMES
  };
}

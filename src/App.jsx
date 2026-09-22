import React, { useState, useCallback } from "react";
import { useScrollAnimation } from "./hooks/useScrollAnimation";
import ScrollCanvas from "./components/ScrollCanvas";
import ThreeScene from "./components/ThreeScene";
import Navbar from "./components/Navbar";
import HeroOverlay from "./components/HeroOverlay";
import AboutSection from "./components/AboutSection";
import MenuSection from "./components/MenuSection";
import GallerySection from "./components/GallerySection";
import ContactSection from "./components/ContactSection";
import LoadingScreen from "./components/LoadingScreen";
import "./App.css";

export default function App() {
  const { currentFrame, scrollProgress, activeSection, scrollToSection } = useScrollAnimation();
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleCanvasProgress = useCallback((pct) => {
    setLoadProgress(pct);
    if (pct >= 35) {
      setTimeout(() => setIsLoaded(true), 500);
    }
  }, []);

  const handleInitialLoad = useCallback(() => {
    // Immediate readiness when first frame is loaded
    setLoadProgress((prev) => Math.max(prev, 25));
    // Auto-unlock after 2 seconds so user never waits unnecessarily
    setTimeout(() => {
      setIsLoaded(true);
    }, 2200);
  }, []);

  return (
    <div className="app-container" style={{ position: "relative", minHeight: "100vh", background: "#0a0a0a" }}>
      {/* Loading Screen */}
      <LoadingScreen
        progress={loadProgress}
        isLoaded={isLoaded}
        onEnter={() => setIsLoaded(true)}
      />

      {/* Background Frame Sequence Canvas */}
      <ScrollCanvas
        currentFrame={currentFrame}
        onProgress={handleCanvasProgress}
        onInitialLoad={handleInitialLoad}
      />

      {/* 3D WebGL Particle & Coffee Bean Layer */}
      <ThreeScene scrollProgress={scrollProgress} />

      {/* Top Glassmorphic Navigation */}
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Section Overlays */}
      <main className="content-container">
        <HeroOverlay isVisible={activeSection === "hero"} onNavigate={scrollToSection} />
        <AboutSection isVisible={activeSection === "about"} />
        <MenuSection isVisible={activeSection === "menu"} onNavigate={scrollToSection} />
        <GallerySection isVisible={activeSection === "gallery"} />
        <ContactSection isVisible={activeSection === "contact"} />
      </main>

      {/* Fixed HUD Telemetry Footer — hidden on mobile */}
      <aside
        className="hud-telemetry"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "24px",
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontFamily: "'Inter', monospace",
          fontSize: "0.75rem",
          fontWeight: 600,
          color: "#EAE4DA",
          background: "rgba(10, 8, 6, 0.88)",
          padding: "7px 16px",
          borderRadius: "999px",
          border: "1px solid rgba(212, 165, 116, 0.3)",
          backdropFilter: "blur(16px)",
          pointerEvents: "none"
        }}
      >
        <span style={{ color: "#D4A574", fontWeight: 700 }}>FRAME {String(currentFrame).padStart(3, "0")} / 300</span>
        <span>•</span>
        <span>{Math.round(scrollProgress * 100)}% DIVE</span>
        <span>•</span>
        <span style={{ textTransform: "uppercase" }}>{activeSection}</span>
      </aside>
      <style>{`.hud-telemetry { display: flex; } @media (max-width: 768px) { .hud-telemetry { display: none !important; } }`}</style>

      {/* Scroll Height Spacer — creates the scroll journey for 300 frames */}
      <div
        className="scroll-spacer"
        style={{
          height: "550vh",
          position: "relative",
          pointerEvents: "none",
          visibility: "hidden"
        }}
      />
    </div>
  );
}

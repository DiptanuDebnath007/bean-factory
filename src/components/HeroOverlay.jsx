import React, { useState, useEffect, memo } from "react";

const HeroOverlay = memo(function HeroOverlay({ isVisible, onNavigate }) {
  const [isMobile, setIsMobile] = React.useState(typeof window !== "undefined" && window.innerWidth < 640);
  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section
      className={`section-overlay hero-overlay ${isVisible ? "active" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: isMobile ? "80px 20px 20px" : "0 24px",
        overflowY: "auto",
        pointerEvents: isVisible ? "auto" : "none",
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? "visible" : "hidden",
        transform: isVisible ? "translateY(0) scale(1) translateZ(0)" : "translateY(24px) scale(0.98) translateZ(0)",
        transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s",
        willChange: "opacity, transform"
      }}
    >
      {/* Decorative Badge */}
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 16px",
          borderRadius: "999px",
          background: "rgba(212, 165, 116, 0.1)",
          border: "1px solid rgba(212, 165, 116, 0.3)",
          color: "#D4A574",
          fontSize: "0.8rem",
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontFamily: "'Inter', sans-serif",
          marginBottom: "20px",
          backdropFilter: "blur(10px)"
        }}
      >
        <span>✦</span>
        <span>A Cinematic Family Experience</span>
        <span>✦</span>
      </div>

      {/* Main Title */}
      <h1
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(3rem, 8vw, 6.5rem)",
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: "4px",
          textTransform: "uppercase",
          margin: "0 0 16px 0",
          background: "linear-gradient(180deg, #FFFFFF 0%, #F5E6D3 45%, #D4A574 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "0 10px 40px rgba(0,0,0,0.8)"
        }}
      >
        Bean Fact'ry
      </h1>

      {/* Tagline */}
      <p
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "clamp(1.25rem, 3vw, 2rem)",
          fontStyle: "italic",
          color: "#FFFFFF",
          maxWidth: "680px",
          margin: "0 0 36px 0",
          lineHeight: 1.4,
          textShadow: "0 2px 25px rgba(0,0,0,0.95)"
        }}
      >
        Where every bean tells a story, and every cup brings family together.
      </p>

      {/* CTAs */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", flexDirection: isMobile ? "column" : "row", width: isMobile ? "100%" : "auto" }}>
        <button
          onClick={() => onNavigate("menu")}
          style={{
            background: "linear-gradient(135deg, #D4A574 0%, #B8895A 100%)",
            color: "#0a0a0a",
            fontWeight: 700,
            fontSize: "0.95rem",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            border: "none",
            borderRadius: "999px",
            padding: "16px 36px",
            cursor: "pointer",
            boxShadow: "0 4px 25px rgba(212, 165, 116, 0.4)",
            transition: "all 0.3s ease",
            fontFamily: "'Inter', sans-serif"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
            e.currentTarget.style.boxShadow = "0 6px 32px rgba(212, 165, 116, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 25px rgba(212, 165, 116, 0.4)";
          }}
        >
          Explore Our Menu
        </button>

        <button
          onClick={() => onNavigate("about")}
          style={{
            background: "rgba(255, 255, 255, 0.08)",
            color: "#FFFFFF",
            fontWeight: 600,
            fontSize: "0.95rem",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            border: "1px solid rgba(212, 165, 116, 0.4)",
            borderRadius: "999px",
            padding: "16px 36px",
            cursor: "pointer",
            backdropFilter: "blur(12px)",
            transition: "all 0.3s ease",
            fontFamily: "'Inter', sans-serif"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.16)";
            e.currentTarget.style.borderColor = "rgba(212, 165, 116, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
            e.currentTarget.style.borderColor = "rgba(212, 165, 116, 0.4)";
          }}
        >
          Discover Our Story
        </button>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          color: "#EAE4DA",
          fontSize: "0.78rem",
          fontWeight: 600,
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontFamily: "'Inter', sans-serif"
        }}
      >
        <span>Scroll Down to Enter</span>
        <span
          style={{
            animation: "bounce 2s infinite",
            color: "#D4A574",
            fontSize: "1.2rem"
          }}
        >
          ↓
        </span>
      </div>
    </section>
  );
});

export default HeroOverlay;

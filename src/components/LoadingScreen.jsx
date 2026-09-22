import React from "react";

export default function LoadingScreen({ progress, isLoaded, onEnter }) {
  if (isLoaded) return null;

  return (
    <div className="loading-screen" style={{
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "#0a0a0a",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "#F5F5F5",
      transition: "opacity 0.8s ease, visibility 0.8s ease",
      opacity: isLoaded ? 0 : 1,
      pointerEvents: isLoaded ? "none" : "auto",
      padding: "20px"
    }}>
      {/* Background ambient glow */}
      <div style={{
        position: "absolute",
        width: "500px",
        height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(212,165,116,0.12) 0%, transparent 70%)",
        filter: "blur(40px)",
        pointerEvents: "none"
      }} />

      {/* Brand mark */}
      <div style={{
        width: "64px",
        height: "64px",
        borderRadius: "50%",
        border: "1px solid rgba(212,165,116,0.3)",
        background: "rgba(212,165,116,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "28px",
        color: "#D4A574",
        marginBottom: "24px",
        boxShadow: "0 0 30px rgba(212,165,116,0.2)"
      }}>
        ☕
      </div>

      <h1 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "clamp(2rem, 5vw, 3.5rem)",
        letterSpacing: "4px",
        textTransform: "uppercase",
        background: "linear-gradient(135deg, #FFF 0%, #E8C89E 50%, #D4A574 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        margin: "0 0 8px 0",
        fontWeight: 800,
        textAlign: "center"
      }}>
        Bean Fact'ry
      </h1>

      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "0.85rem",
        letterSpacing: "3px",
        textTransform: "uppercase",
        color: "#D4C7B8",
        fontWeight: 600,
        marginBottom: "36px"
      }}>
        A Family Coffee House & Bar
      </p>

      {/* Progress Bar */}
      <div style={{
        width: "min(320px, 80vw)",
        height: "3px",
        background: "rgba(255, 255, 255, 0.12)",
        borderRadius: "4px",
        overflow: "hidden",
        position: "relative",
        marginBottom: "16px"
      }}>
        <div style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #B8895A, #E8C89E, #D4A574)",
          borderRadius: "4px",
          transition: "width 0.2s ease-out",
          boxShadow: "0 0 12px rgba(212, 165, 116, 0.6)"
        }} />
      </div>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        width: "min(320px, 80vw)",
        fontSize: "0.82rem",
        fontFamily: "'Inter', monospace",
        color: "#CBC2B6",
        fontWeight: 500
      }}>
        <span>Brewing visuals</span>
        <span style={{ color: "#F8D59E", fontWeight: 700 }}>{Math.round(progress)}%</span>
      </div>

      {progress >= 15 && (
        <button
          onClick={onEnter}
          style={{
            marginTop: "24px",
            background: "linear-gradient(135deg, #D4A574 0%, #B8895A 100%)",
            color: "#0a0a0a",
            border: "none",
            borderRadius: "999px",
            padding: "10px 26px",
            fontSize: "0.82rem",
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            cursor: "pointer",
            boxShadow: "0 4px 18px rgba(212, 165, 116, 0.4)",
            transition: "all 0.3s ease",
            fontFamily: "'Inter', sans-serif"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Enter Cafe ☕
        </button>
      )}
    </div>
  );
}

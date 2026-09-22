import React, { memo } from "react";

const STATS = [
  { value: "14+", label: "Single-Origin Roasts" },
  { value: "48h", label: "Slow Cold Drip" },
  { value: "100%", label: "Organic & Fair Trade" },
  { value: "4.9★", label: "Customer Love" }
];

const AboutSection = memo(function AboutSection({ isVisible }) {
  return (
    <section
      className={`section-overlay about-overlay ${isVisible ? "active" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "70px 16px 20px",
        overflowY: "auto",
        pointerEvents: isVisible ? "auto" : "none",
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? "visible" : "hidden",
        transform: isVisible ? "translateY(0) translateZ(0)" : "translateY(30px) translateZ(0)",
        transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s",
        willChange: "opacity, transform"
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "32px",
          alignItems: "center"
        }}
      >
        {/* Left Card: Story Narrative */}
        <div
          style={{
            background: "rgba(12, 9, 7, 0.92)",
            border: "1px solid rgba(212, 165, 116, 0.28)",
            borderRadius: "24px",
            padding: "40px",
            backdropFilter: "blur(24px)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.7)"
          }}
        >
          <div
            style={{
              color: "#D4A574",
              textTransform: "uppercase",
              letterSpacing: "3px",
              fontSize: "0.8rem",
              fontWeight: 700,
              marginBottom: "12px",
              fontFamily: "'Inter', sans-serif"
            }}
          >
            ✦ From Space to Street ✦
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              color: "#FFFFFF",
              margin: "0 0 20px 0",
              lineHeight: 1.15
            }}
          >
            Crafted with Passion. Served with Heart.
          </h2>

          <p
            style={{
              color: "#EAE4DA",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              lineHeight: 1.7,
              marginBottom: "20px"
            }}
          >
            Born from a deep love for exceptional coffee and warm community gatherings, 
            <strong style={{ color: "#FFFFFF" }}> Bean Fact'ry</strong> is more than just a café — it’s our family’s second home. 
            We journey to high-altitude estates across Colombia, Ethiopia, and Sumatra to source 
            micro-lots of the world’s finest beans.
          </p>

          <p
            style={{
              color: "#E2D9CE",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.92rem",
              lineHeight: 1.65,
              margin: 0
            }}
          >
            Each roast is small-batch profiled in-house to unlock delicate tasting notes of cocoa, 
            toasted almond, and wild berries — perfectly paired with our signature mocktails and artisan desserts.
          </p>
        </div>

        {/* Right Cards: Pillars & Live Stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Stats Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px"
            }}
          >
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                style={{
                  background: "rgba(12, 9, 7, 0.88)",
                  border: "1px solid rgba(212, 165, 116, 0.22)",
                  borderRadius: "18px",
                  padding: "24px 20px",
                  backdropFilter: "blur(20px)",
                  textAlign: "center"
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2.4rem",
                    fontWeight: 800,
                    color: "#D4A574",
                    marginBottom: "4px"
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "#D4C7B8",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif"
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Feature highlight bar */}
          <div
            style={{
              background: "rgba(12, 9, 7, 0.88)",
              border: "1px solid rgba(212, 165, 116, 0.35)",
              borderRadius: "18px",
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              backdropFilter: "blur(20px)"
            }}
          >
            <span style={{ fontSize: "2rem" }}>🌱</span>
            <div>
              <h4 style={{ margin: "0 0 4px 0", color: "#FFFFFF", fontSize: "1.05rem", fontWeight: 700 }}>
                Zero Waste Roasting Guarantee
              </h4>
              <p style={{ margin: 0, color: "#E0D7CC", fontSize: "0.88rem", lineHeight: 1.5 }}>
                All coffee grounds are composted and supplied to local urban family gardens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;

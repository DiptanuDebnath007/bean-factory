import React from "react";

const AMBIENCE_PILLARS = [
  {
    icon: "🕯️",
    title: "Warm Amber Aesthetics",
    desc: "Bespoke brass fixtures, low-kelvin warm illumination, and rich dark walnut woodwork create an unmatched sanctuary."
  },
  {
    icon: "🎷",
    title: "Vinyl & Acoustic Flow",
    desc: "Curated jazz, soulful blues, and warm lo-fi frequencies tuned precisely for effortless conversation."
  },
  {
    icon: "🌿",
    title: "Living Botanicals",
    desc: "Oxygenating vertical plant walls and flowering Arabica trees integrated seamlessly into the dining room."
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Family First Heritage",
    desc: "Generous hand-hewn oak communal tables and secluded private nooks designed to host all generations."
  }
];

export default function GallerySection({ isVisible }) {
  return (
    <section
      className={`section-overlay gallery-overlay ${isVisible ? "active" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        pointerEvents: isVisible ? "auto" : "none",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "28px"
        }}
      >
        {/* Header card */}
        <div
          style={{
            background: "rgba(12, 9, 7, 0.92)",
            border: "1px solid rgba(212, 165, 116, 0.28)",
            borderRadius: "24px",
            padding: "32px 40px",
            backdropFilter: "blur(24px)",
            textAlign: "center"
          }}
        >
          <div
            style={{
              color: "#D4A574",
              textTransform: "uppercase",
              letterSpacing: "3px",
              fontSize: "0.8rem",
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              marginBottom: "8px"
            }}
          >
            ✦ An Immersive Sanctuary ✦
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 2.8rem)",
              color: "#FFFFFF",
              margin: "0 0 12px 0",
              fontWeight: 800
            }}
          >
            Designed for Connection
          </h2>
          <p
            style={{
              color: "#EAE4DA",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              maxWidth: "650px",
              margin: "0 auto",
              lineHeight: 1.6
            }}
          >
            Step inside our dining room where modern architecture harmonizes with timeless warmth. 
            Every corner is shaped to slow down time and savor life’s finest rituals.
          </p>
        </div>

        {/* Pillars Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px"
          }}
        >
          {AMBIENCE_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(12, 9, 7, 0.88)",
                border: "1px solid rgba(212, 165, 116, 0.2)",
                borderRadius: "20px",
                padding: "24px",
                backdropFilter: "blur(20px)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212, 165, 116, 0.5)";
                e.currentTarget.style.background = "rgba(20, 15, 12, 0.95)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(212, 165, 116, 0.2)";
                e.currentTarget.style.background = "rgba(12, 9, 7, 0.88)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "12px" }}>{pillar.icon}</div>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.2rem",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  margin: "0 0 8px 0"
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  color: "#E2D9CE",
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                  margin: 0,
                  fontFamily: "'Inter', sans-serif"
                }}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Guest Testimonial Banner */}
        <div
          style={{
            background: "rgba(212, 165, 116, 0.08)",
            border: "1px solid rgba(212, 165, 116, 0.3)",
            borderRadius: "20px",
            padding: "20px 32px",
            backdropFilter: "blur(16px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "1.8rem" }}>💬</span>
            <p
              style={{
                margin: 0,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.2rem",
                fontStyle: "italic",
                color: "#F5E6D3"
              }}
            >
              “The most breathtaking coffee house in the city — where coffee craft meets genuine family hospitality.”
            </p>
          </div>
          <span
            style={{
              color: "#D4A574",
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600
            }}
          >
            — Verified Family Guest
          </span>
        </div>
      </div>
    </section>
  );
}

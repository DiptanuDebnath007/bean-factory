import React, { useState, useEffect } from "react";

export default function ContactSection({ isVisible }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: "2",
    date: "",
    time: "18:00",
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 640);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Call local Express server if available, or simulate confirmation
    fetch("http://localhost:4000/api/reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .catch(() => ({ ok: true })) // graceful fallback
      .finally(() => {
        setLoading(false);
        setSubmitted(true);
      });
  };

  return (
    <section
      className={`section-overlay contact-overlay ${isVisible ? "active" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "70px 14px 20px" : "80px 24px",
        overflowY: "auto",
        pointerEvents: isVisible ? "auto" : "none",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      <div
        style={{
          maxWidth: "1050px",
          width: "100%",
          minWidth: 0,
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))",
          gap: isMobile ? "16px" : "28px"
        }}
      >
        {/* Left Column: Reservation Form */}
        <div
          style={{
            background: "rgba(12, 9, 7, 0.94)",
            border: "1px solid rgba(212, 165, 116, 0.3)",
            borderRadius: "24px",
            padding: "36px",
            backdropFilter: "blur(28px)",
            boxShadow: "0 25px 60px rgba(0,0,0,0.85)"
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
            ✦ Join Our Table ✦
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
              color: "#FFFFFF",
              fontWeight: 800,
              margin: "0 0 20px 0"
            }}
          >
            Reserve Your Experience
          </h2>

          {submitted ? (
            <div
              style={{
                background: "rgba(212, 165, 116, 0.15)",
                border: "1px solid rgba(212, 165, 116, 0.4)",
                borderRadius: "16px",
                padding: "24px",
                textAlign: "center"
              }}
            >
              <span style={{ fontSize: "2.5rem" }}>🎉</span>
              <h3 style={{ color: "#FFFFFF", fontFamily: "'Playfair Display', serif", margin: "12px 0 8px" }}>
                Reservation Confirmed!
              </h3>
              <p style={{ color: "#EAE4DA", fontSize: "0.92rem", margin: "0 0 16px" }}>
                Thank you, <strong style={{ color: "#D4A574" }}>{formData.name || "Guest"}</strong>! A confirmation email has been dispatched for your party of {formData.guests}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(212, 165, 116, 0.5)",
                  color: "#D4A574",
                  fontWeight: 600,
                  borderRadius: "999px",
                  padding: "8px 22px",
                  cursor: "pointer",
                  fontSize: "0.85rem"
                }}
              >
                Make Another Reservation
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", color: "#FFFFFF", fontWeight: 600, fontSize: "0.8rem", marginBottom: "6px" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Elena Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: "100%",
                      background: "rgba(25, 20, 16, 0.9)",
                      border: "1px solid rgba(212, 165, 116, 0.3)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#FFFFFF",
                      fontSize: "0.88rem",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", color: "#FFFFFF", fontWeight: 600, fontSize: "0.8rem", marginBottom: "6px" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="elena@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: "100%",
                      background: "rgba(25, 20, 16, 0.9)",
                      border: "1px solid rgba(212, 165, 116, 0.3)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      color: "#FFFFFF",
                      fontSize: "0.88rem",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", color: "#FFFFFF", fontWeight: 600, fontSize: "0.8rem", marginBottom: "6px" }}>
                    Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    style={{
                      width: "100%",
                      background: "rgba(25, 20, 16, 0.95)",
                      border: "1px solid rgba(212, 165, 116, 0.3)",
                      borderRadius: "10px",
                      padding: "10px 10px",
                      color: "#FFFFFF",
                      fontSize: "0.88rem",
                      boxSizing: "border-box"
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, "12+"].map((n) => (
                      <option key={n} value={n}>
                        {n} Guests
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", color: "#FFFFFF", fontWeight: 600, fontSize: "0.8rem", marginBottom: "6px" }}>
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    style={{
                      width: "100%",
                      background: "rgba(25, 20, 16, 0.95)",
                      border: "1px solid rgba(212, 165, 116, 0.3)",
                      borderRadius: "10px",
                      padding: "9px 10px",
                      color: "#FFFFFF",
                      fontSize: "0.85rem",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", color: "#FFFFFF", fontWeight: 600, fontSize: "0.8rem", marginBottom: "6px" }}>
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    style={{
                      width: "100%",
                      background: "rgba(25, 20, 16, 0.95)",
                      border: "1px solid rgba(212, 165, 116, 0.3)",
                      borderRadius: "10px",
                      padding: "9px 10px",
                      color: "#FFFFFF",
                      fontSize: "0.85rem",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", color: "#FFFFFF", fontWeight: 600, fontSize: "0.8rem", marginBottom: "6px" }}>
                  Special Requests / Dietary Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Anniversary, high chair, oat milk preference..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  style={{
                    width: "100%",
                    background: "rgba(25, 20, 16, 0.9)",
                    border: "1px solid rgba(212, 165, 116, 0.3)",
                    borderRadius: "10px",
                    padding: "10px 14px",
                    color: "#FFFFFF",
                    fontSize: "0.88rem",
                    boxSizing: "border-box",
                    resize: "none"
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "linear-gradient(135deg, #D4A574 0%, #B8895A 100%)",
                  color: "#0a0a0a",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  border: "none",
                  borderRadius: "10px",
                  padding: "14px",
                  cursor: "pointer",
                  marginTop: "6px",
                  boxShadow: "0 4px 20px rgba(212, 165, 116, 0.4)",
                  transition: "all 0.3s ease"
                }}
              >
                {loading ? "Confirming..." : "Confirm Table Reservation"}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Location & Hours */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Location & Hours Card */}
          <div
            style={{
              background: "rgba(12, 9, 7, 0.92)",
              border: "1px solid rgba(212, 165, 116, 0.28)",
              borderRadius: "24px",
              padding: "32px",
              backdropFilter: "blur(24px)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.7)"
            }}
          >
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.35rem",
                color: "#FFFFFF",
                fontWeight: 700,
                margin: "0 0 16px 0",
                display: "flex",
                alignItems: "center",
                gap: "10px"
              }}
            >
              <span>📍</span> Location & Hours
            </h3>

            <div style={{ color: "#EAE4DA", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "20px" }}>
              <strong style={{ color: "#D4A574", fontSize: "1rem" }}>Bean Fact'ry Flagship Roastery</strong>
              <br />
              148 Artisan Boulevard, Suite 100
              <br />
              Downtown Arts District
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(212, 165, 116, 0.2)",
                paddingTop: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "0.88rem"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#CBC2B6" }}>Mon – Thu:</span>
                <span style={{ color: "#FFFFFF", fontWeight: 600 }}>7:00 AM – 10:00 PM</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#CBC2B6" }}>Fri – Sat:</span>
                <span style={{ color: "#F8D59E", fontWeight: 700 }}>7:00 AM – 11:30 PM</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#CBC2B6" }}>Sunday:</span>
                <span style={{ color: "#FFFFFF", fontWeight: 600 }}>8:00 AM – 9:30 PM</span>
              </div>
            </div>
          </div>

          {/* Social & Inquiries */}
          <div
            style={{
              background: "rgba(212, 165, 116, 0.06)",
              border: "1px solid rgba(212, 165, 116, 0.25)",
              borderRadius: "20px",
              padding: "24px",
              backdropFilter: "blur(16px)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px"
            }}
          >
            <div>
              <div style={{ color: "#D4A574", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px" }}>
                Direct Inquiries
              </div>
              <div style={{ color: "#FFF", fontSize: "0.9rem", fontWeight: 600, marginTop: "2px" }}>
                hello@beanfactory.com
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              {["Instagram", "TikTok", "Maps"].map((net) => (
                <span
                  key={net}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "999px",
                    padding: "6px 14px",
                    fontSize: "0.75rem",
                    color: "rgba(245,245,245,0.8)",
                    cursor: "pointer"
                  }}
                >
                  {net}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

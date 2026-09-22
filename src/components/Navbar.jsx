import React, { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "hero", label: "Welcome" },
  { id: "about", label: "Our Story" },
  { id: "menu", label: "Menu" },
  { id: "gallery", label: "Ambience" },
  { id: "contact", label: "Visit & Reserve" }
];

export default function Navbar({ activeSection, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: scrolled ? "12px 32px" : "24px 40px",
        transition: "all 0.4s ease",
        background: scrolled
          ? "rgba(10, 10, 10, 0.75)"
          : "linear-gradient(180deg, rgba(10,10,10,0.85) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212, 165, 116, 0.15)" : "1px solid transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      {/* Brand logo */}
      <div
        onClick={() => onNavigate("hero")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          cursor: "pointer"
        }}
      >
        <span
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "1px solid rgba(212, 165, 116, 0.4)",
            background: "rgba(212, 165, 116, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            color: "#D4A574",
            boxShadow: "0 0 15px rgba(212,165,116,0.2)"
          }}
        >
          ☕
        </span>
        <div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              fontSize: "1.2rem",
              letterSpacing: "2px",
              color: "#F5F5F5",
              textTransform: "uppercase"
            }}
          >
            Bean Fact'ry
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "2px",
              color: "#D4A574",
              textTransform: "uppercase",
              marginTop: "-2px"
            }}
          >
            Family Coffee House
          </div>
        </div>
      </div>

      {/* Desktop navigation pills */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(255, 255, 255, 0.03)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "999px",
          padding: "4px 8px",
          backdropFilter: "blur(12px)"
        }}
        className="desktop-nav"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              style={{
                background: isActive ? "rgba(212, 165, 116, 0.18)" : "transparent",
                color: isActive ? "#F8D59E" : "#FFFFFF",
                border: isActive ? "1px solid rgba(212, 165, 116, 0.45)" : "1px solid transparent",
                borderRadius: "999px",
                padding: "8px 18px",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "'Inter', sans-serif"
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* CTA Button */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button
          onClick={() => onNavigate("contact")}
          style={{
            background: "linear-gradient(135deg, #D4A574 0%, #B8895A 100%)",
            color: "#0a0a0a",
            fontWeight: 700,
            fontSize: "0.85rem",
            letterSpacing: "1px",
            textTransform: "uppercase",
            border: "none",
            borderRadius: "999px",
            padding: "10px 24px",
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(212, 165, 116, 0.35)",
            transition: "all 0.3s ease",
            fontFamily: "'Inter', sans-serif"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
            e.currentTarget.style.boxShadow = "0 0 28px rgba(212, 165, 116, 0.55)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(212, 165, 116, 0.35)";
          }}
        >
          Reserve Table
        </button>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-toggle"
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#fff",
            borderRadius: "8px",
            padding: "8px 12px",
            fontSize: "1.2rem",
            cursor: "pointer"
          }}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(10, 10, 10, 0.95)",
            backdropFilter: "blur(20px)",
            padding: "20px",
            borderBottom: "1px solid rgba(212, 165, 116, 0.2)",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              style={{
                background: activeSection === item.id ? "rgba(212,165,116,0.15)" : "transparent",
                color: activeSection === item.id ? "#D4A574" : "#F5F5F5",
                border: "none",
                borderRadius: "8px",
                padding: "12px 16px",
                fontSize: "1rem",
                textAlign: "left",
                cursor: "pointer"
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

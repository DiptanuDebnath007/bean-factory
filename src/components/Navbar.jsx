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
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (id) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: scrolled ? "12px 24px" : "20px 32px",
          transition: "all 0.4s ease",
          background: scrolled
            ? "rgba(10, 10, 10, 0.88)"
            : "linear-gradient(180deg, rgba(10,10,10,0.85) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(212, 165, 116, 0.15)" : "1px solid transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {/* Brand logo */}
        <div
          onClick={() => handleNav("hero")}
          style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", minWidth: 0 }}
        >
          <span
            style={{
              width: "34px",
              height: "34px",
              flexShrink: 0,
              borderRadius: "50%",
              border: "1px solid rgba(212, 165, 116, 0.4)",
              background: "rgba(212, 165, 116, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "17px",
              color: "#D4A574"
            }}
          >
            ☕
          </span>
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 800,
                fontSize: "1.1rem",
                letterSpacing: "2px",
                color: "#F5F5F5",
                textTransform: "uppercase",
                whiteSpace: "nowrap"
              }}
            >
              Bean Fact'ry
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "2px",
                color: "#D4A574",
                textTransform: "uppercase",
                marginTop: "-2px",
                whiteSpace: "nowrap"
              }}
            >
              Family Coffee House
            </div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px"
          }}
          className="desktop-nav"
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              style={{
                background: activeSection === item.id
                  ? "rgba(212, 165, 116, 0.15)"
                  : "transparent",
                border: activeSection === item.id
                  ? "1px solid rgba(212, 165, 116, 0.35)"
                  : "1px solid transparent",
                color: activeSection === item.id ? "#D4A574" : "#EAE4DA",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                borderRadius: "999px",
                padding: "8px 16px",
                cursor: "pointer",
                transition: "all 0.25s ease",
                whiteSpace: "nowrap"
              }}
              onMouseEnter={(e) => {
                if (activeSection !== item.id) {
                  e.currentTarget.style.color = "#D4A574";
                  e.currentTarget.style.background = "rgba(212, 165, 116, 0.08)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== item.id) {
                  e.currentTarget.style.color = "#EAE4DA";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          className="mobile-menu-btn"
          style={{
            background: "rgba(212, 165, 116, 0.08)",
            border: "1px solid rgba(212, 165, 116, 0.25)",
            borderRadius: "8px",
            padding: "10px 12px",
            cursor: "pointer",
            display: "none",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "44px",
            minHeight: "44px"
          }}
        >
          <span
            style={{
              width: "20px",
              height: "2px",
              background: "#D4A574",
              borderRadius: "2px",
              display: "block",
              transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              transition: "transform 0.25s ease"
            }}
          />
          <span
            style={{
              width: "20px",
              height: "2px",
              background: "#D4A574",
              borderRadius: "2px",
              display: "block",
              opacity: mobileMenuOpen ? 0 : 1,
              transition: "opacity 0.25s ease"
            }}
          />
          <span
            style={{
              width: "20px",
              height: "2px",
              background: "#D4A574",
              borderRadius: "2px",
              display: "block",
              transform: mobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              transition: "transform 0.25s ease"
            }}
          />
        </button>
      </header>

      {/* Mobile dropdown menu */}
      <div
        className="mobile-menu-panel"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 49,
          background: "rgba(10, 8, 6, 0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(212, 165, 116, 0.2)",
          padding: mobileMenuOpen ? "88px 24px 28px" : "0 24px 0",
          maxHeight: mobileMenuOpen ? "100vh" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.4s ease",
          display: "none"
        }}
      >
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              style={{
                background: activeSection === item.id
                  ? "rgba(212, 165, 116, 0.12)"
                  : "transparent",
                border: "none",
                borderLeft: activeSection === item.id
                  ? "3px solid #D4A574"
                  : "3px solid transparent",
                color: activeSection === item.id ? "#D4A574" : "#EAE4DA",
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                borderRadius: "0 10px 10px 0",
                padding: "14px 20px",
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
                transition: "all 0.2s ease",
                minHeight: "48px"
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Backdrop for mobile menu */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 48,
            background: "rgba(0,0,0,0.5)"
          }}
        />
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-menu-panel { display: block !important; }
        }
      `}</style>
    </>
  );
}

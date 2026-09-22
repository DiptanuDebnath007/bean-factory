import React, { useState, memo } from "react";

const MENU_DATA = {
  leftSections: [
    {
      id: "coffee",
      title: "Specialty Coffee Roasts",
      icon: "☕",
      badge: "In-House Micro-Lot",
      items: [
        {
          name: "Smoked Vanilla Spanish Latte",
          price: "$6.80",
          tag: "Bestseller",
          desc: "Double ristretto over velvety condensed milk with Madagascar bourbon vanilla bean and applewood smoke infusion."
        },
        {
          name: "Geisha Single-Origin Pour Over",
          price: "$8.50",
          tag: "Limited Reserve",
          desc: "High-altitude Boquete Panama Geisha. Delicate jasmine florals, bergamot citrus, and a lingering honey peach finish."
        },
        {
          name: "Nitro Cascara Cold Brew",
          price: "$5.90",
          tag: "48h Slow Drip",
          desc: "Infused with pure nitrogen for a stout-like creamy head, slow-extracted from organic dried coffee cherry husks."
        },
        {
          name: "Velvet Hazelnut Cortado",
          price: "$5.40",
          tag: "Barista Pick",
          desc: "Equal parts espresso and steamed microfoam milk infused with stone-ground roasted Piedmont hazelnuts."
        }
      ]
    },
    {
      id: "mocktails",
      title: "Craft Botanical Mocktails",
      icon: "🍸",
      badge: "Zero-Proof Spirits",
      items: [
        {
          name: "Golden Amber Spritz",
          price: "$7.50",
          tag: "House Signature",
          desc: "Non-alcoholic Italian bitter orange, cold-pressed blood orange, sparkling botanical soda, and fresh garden thyme."
        },
        {
          name: "Smoked Rosemary & Blackberry Mule",
          price: "$7.20",
          tag: "Smoked Live",
          desc: "Muddled wild mountain blackberries, spicy ginger beer, clarified lime juice, served with a flaming rosemary sprig."
        },
        {
          name: "Yuzu Blossom Fizz",
          price: "$6.90",
          tag: "Refreshing",
          desc: "Wild Japanese yuzu extract, organic elderflower cordial, sparkling mineral water, crowned with 24k edible gold leaf."
        },
        {
          name: "Cascara Hibiscus Tonic",
          price: "$6.40",
          tag: "Artisan Brew",
          desc: "Sun-dried coffee cascara steeped with Egyptian hibiscus petals, finished with crisp Mediterranean tonic."
        }
      ]
    }
  ],
  rightSections: [
    {
      id: "boba",
      title: "Artisan Boba & Kyoto Teas",
      icon: "🧋",
      badge: "Slow-Cooked Tapioca",
      items: [
        {
          name: "Torched Brown Sugar Tiger Boba",
          price: "$6.50",
          tag: "Fresh Tapioca",
          desc: "Slow-simmered Okinawa brown sugar pearls, creamy organic oat milk, crowned with caramelized torched custard crème."
        },
        {
          name: "Ceremonial Matcha Cloud Boba",
          price: "$7.00",
          tag: "Uji First Harvest",
          desc: "First-harvest ceremonial matcha from Uji, Kyoto layered over house-made sea salt cheese foam and chewy pearls."
        },
        {
          name: "Roasted Charcoal Oolong Milk Tea",
          price: "$6.20",
          tag: "Charcoal Roasted",
          desc: "Deep-roasted high-mountain Taiwan oolong with organic dairy-free oat creamer and brown sugar pearls."
        },
        {
          name: "White Peach Jasmine Cloud",
          price: "$6.80",
          tag: "Floral Infusion",
          desc: "Cold-brewed silver needle jasmine tea topped with whipped peach cream foam and organic golden boba."
        }
      ]
    },
    {
      id: "desserts",
      title: "Pâtisserie & Warm Desserts",
      icon: "🍰",
      badge: "Baked Fresh Daily",
      items: [
        {
          name: "Pistachio Molten Basque Cheesecake",
          price: "$8.90",
          tag: "Chef's Special",
          desc: "Deeply caramelized burnt exterior with an oozing warm Bronte Sicilian pistachio praline center."
        },
        {
          name: "Espresso Bean Tiramisu Tart",
          price: "$7.80",
          tag: "House Favorite",
          desc: "Crispy dark cocoa sable tart filled with mascarpone mousse, drenched in our house single-origin espresso."
        },
        {
          name: "Warm Salted Caramel Cinnamon Roll",
          price: "$5.50",
          tag: "Oven Warm",
          desc: "Fluffy brioche dough rolled with Ceylon cinnamon, drowned in warm salted bourbon butterscotch glaze."
        },
        {
          name: "Toasted Almond Frangipane Brioche",
          price: "$6.20",
          tag: "French Classic",
          desc: "Golden laminated brioche pastry layered with almond cream, toasted sliced almonds, and vanilla dust."
        }
      ]
    }
  ]
};

const MenuSection = memo(function MenuSection({ isVisible }) {
  const [viewMode, setViewMode] = useState("all"); // "all" | "left" | "right"

  const showLeft = viewMode === "all" || viewMode === "left";
  const showRight = viewMode === "all" || viewMode === "right";

  return (
    <section
      className={`section-overlay menu-overlay ${isVisible ? "active" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "70px 12px 20px",
        overflowY: "auto",
        pointerEvents: isVisible ? "auto" : "none",
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? "visible" : "hidden",
        transform: isVisible ? "translateY(0) scale(1) translateZ(0)" : "translateY(28px) scale(0.98) translateZ(0)",
        transition: "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.5s",
        willChange: "opacity, transform"
      }}
    >
      <div className="menu-grand-board">
        {/* Animated vertical thin lines flanking the left and right outer sides */}
        <div className="menu-outer-line left">
          <div className="menu-beam-pulse" />
          {/* Animated decorative horizontal ticks */}
          <div className="menu-side-tick" style={{ top: "15%", left: "-14px", width: "14px" }} />
          <div className="menu-side-tick" style={{ top: "45%", left: "-20px", width: "20px", animationDelay: "1s" }} />
          <div className="menu-side-tick" style={{ top: "75%", left: "-14px", width: "14px", animationDelay: "2s" }} />
        </div>

        <div className="menu-outer-line right">
          <div className="menu-beam-pulse" />
          {/* Animated decorative horizontal ticks */}
          <div className="menu-side-tick" style={{ top: "15%", right: "-14px", width: "14px" }} />
          <div className="menu-side-tick" style={{ top: "45%", right: "-20px", width: "20px", animationDelay: "1.5s" }} />
          <div className="menu-side-tick" style={{ top: "75%", right: "-14px", width: "14px", animationDelay: "0.5s" }} />
        </div>

        {/* Menu Header with clear high-contrast titles */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div
            style={{
              color: "#D4A574",
              textTransform: "uppercase",
              letterSpacing: "3px",
              fontSize: "0.82rem",
              fontWeight: 700,
              fontFamily: "'Inter', sans-serif",
              marginBottom: "6px"
            }}
          >
            ✦ Artisanal Food & Drink Collection ✦
          </div>

          <h2
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.1rem, 4.2vw, 3rem)",
              color: "#FFFFFF",
              margin: "0 0 10px 0",
              fontWeight: 800,
              textShadow: "0 4px 20px rgba(0,0,0,0.8)"
            }}
          >
            Curated Menu & Dining Selections
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.95rem",
              color: "#EAE4DA",
              maxWidth: "680px",
              margin: "0 auto",
              lineHeight: 1.5
            }}
          >
            Explore our culinary offerings across both sides of the menu — crafted with ethically sourced single-origin coffee, botanical elixirs, and fresh daily pâtisserie.
          </p>

          {/* Quick-filter toggle buttons with active indicators */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "20px"
            }}
          >
            <button
              className={`menu-tab-btn ${viewMode === "all" ? "active" : ""}`}
              onClick={() => setViewMode("all")}
            >
              <span>✦</span>
              <span>All Food Types (Both Sides)</span>
            </button>

            <button
              className={`menu-tab-btn ${viewMode === "left" ? "active" : ""}`}
              onClick={() => setViewMode("left")}
            >
              <span>☕</span>
              <span>Left Side: Coffee & Mocktails</span>
            </button>

            <button
              className={`menu-tab-btn ${viewMode === "right" ? "active" : ""}`}
              onClick={() => setViewMode("right")}
            >
              <span>🧋</span>
              <span>Right Side: Boba & Desserts</span>
            </button>
          </div>
        </div>

        {/* Dual-Sided Menu Content */}
        <div
          className="menu-dual-spread"
          style={{
            gridTemplateColumns:
              viewMode === "all"
                ? "1fr 1px 1fr"
                : "1fr"
          }}
        >
          {/* ================= LEFT SIDE SECTIONS ================= */}
          {showLeft && (
            <div className="menu-side-col left-side">
              {/* Section Tag Indicator */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "4px 0",
                  marginBottom: "-12px"
                }}
              >
                <div style={{ width: "24px", height: "1px", background: "#D4A574" }} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#D4A574",
                    letterSpacing: "2px",
                    textTransform: "uppercase"
                  }}
                >
                  Side I • Brews & Botanicals
                </span>
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #D4A574, transparent)" }} />
              </div>

              {MENU_DATA.leftSections.map((section) => (
                <div key={section.id} className="food-type-block">
                  {/* Food Type Header with animated thin lines */}
                  <div className="food-type-header">
                    <div className="header-thin-line" />
                    <h3 className="food-type-title">
                      <span>{section.icon}</span>
                      <span>{section.title}</span>
                    </h3>
                    <div className="header-thin-line right-line" />
                  </div>

                  {/* Section items */}
                  <div className="menu-items-list">
                    {section.items.map((item, idx) => (
                      <div key={idx} className="menu-dish-item">
                        <div className="dish-top-row">
                          <h4 className="dish-name">{item.name}</h4>
                          <span className="dish-price">{item.price}</span>
                        </div>

                        <p className="dish-description">{item.desc}</p>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span className="dish-tag">
                            <span>✦</span>
                            <span>{item.tag}</span>
                          </span>

                          <span
                            style={{
                              fontSize: "0.75rem",
                              color: "#D4A574",
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 500
                            }}
                          >
                            Craft Prepared
                          </span>
                        </div>

                        {/* Interactive animated thin underline on hover */}
                        <div className="dish-animated-line" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ================= CENTER DIVIDER LINE WITH GLOW EMBLEM ================= */}
          {viewMode === "all" && (
            <div className="menu-center-divider">
              <div className="menu-center-emblem">☕</div>
            </div>
          )}

          {/* ================= RIGHT SIDE SECTIONS ================= */}
          {showRight && (
            <div className="menu-side-col right-side">
              {/* Section Tag Indicator */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "4px 0",
                  marginBottom: "-12px"
                }}
              >
                <div style={{ width: "24px", height: "1px", background: "#D4A574" }} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#D4A574",
                    letterSpacing: "2px",
                    textTransform: "uppercase"
                  }}
                >
                  Side II • Artisan Teas & Pâtisserie
                </span>
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, #D4A574, transparent)" }} />
              </div>

              {MENU_DATA.rightSections.map((section) => (
                <div key={section.id} className="food-type-block">
                  {/* Food Type Header with animated thin lines */}
                  <div className="food-type-header">
                    <div className="header-thin-line" />
                    <h3 className="food-type-title">
                      <span>{section.icon}</span>
                      <span>{section.title}</span>
                    </h3>
                    <div className="header-thin-line right-line" />
                  </div>

                  {/* Section items */}
                  <div className="menu-items-list">
                    {section.items.map((item, idx) => (
                      <div key={idx} className="menu-dish-item">
                        <div className="dish-top-row">
                          <h4 className="dish-name">{item.name}</h4>
                          <span className="dish-price">{item.price}</span>
                        </div>

                        <p className="dish-description">{item.desc}</p>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span className="dish-tag">
                            <span>✦</span>
                            <span>{item.tag}</span>
                          </span>

                          <span
                            style={{
                              fontSize: "0.75rem",
                              color: "#D4A574",
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 500
                            }}
                          >
                            Made In-House
                          </span>
                        </div>

                        {/* Interactive animated thin underline on hover */}
                        <div className="dish-animated-line" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Note with high visibility */}
        <div
          style={{
            marginTop: "28px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(212, 165, 116, 0.2)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.85rem",
            color: "#CBC2B6"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#D4A574" }}>✦</span>
            <span>All dairy alternatives (Oat, Almond, Soy) available at no extra charge.</span>
          </div>

          <div style={{ display: "flex", gap: "16px", color: "#EAE4DA" }}>
            <span>🌱 100% Organic</span>
            <span>✨ Fair Trade Certified</span>
            <span>🍯 Locally Sourced Honey</span>
          </div>
        </div>
      </div>
    </section>
  );
});

export default MenuSection;

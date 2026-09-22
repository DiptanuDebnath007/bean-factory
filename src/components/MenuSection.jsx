import React, { useState, useMemo, memo } from "react";

const MENU_DATA = [
  {
    id: "coffee",
    title: "Specialty Coffee Roasts",
    shortTitle: "Coffee",
    icon: "☕",
    badge: "In-House Micro-Lot",
    side: "Side I • Brews & Botanicals",
    desc: "Ethically sourced single-origin Arabica micro-lots, roasted in small batches to preserve terroir and delicate aromatics.",
    items: [
      {
        id: "c1",
        name: "Smoked Vanilla Spanish Latte",
        price: "$6.80",
        tag: "Bestseller",
        badge: "Signature",
        origin: "Colombia Huila & Bourbon Vanilla",
        dietary: ["Organic", "Oat Option"],
        desc: "Double ristretto over velvety condensed milk with Madagascar bourbon vanilla bean and applewood smoke infusion."
      },
      {
        id: "c2",
        name: "Geisha Single-Origin Pour Over",
        price: "$8.50",
        tag: "Limited Reserve",
        badge: "Rare Lot #44",
        origin: "Boquete, Panama (1,850m)",
        dietary: ["Single-Origin", "Vegan"],
        desc: "High-altitude Boquete Panama Geisha. Delicate jasmine florals, bergamot citrus, and a lingering honey peach finish."
      },
      {
        id: "c3",
        name: "Nitro Cascara Cold Brew",
        price: "$5.90",
        tag: "48h Slow Drip",
        badge: "Zero Sugar",
        origin: "Costa Rica Tarrazú",
        dietary: ["Antioxidant-Rich", "Vegan"],
        desc: "Infused with pure nitrogen for a stout-like creamy head, slow-extracted from organic dried coffee cherry husks."
      },
      {
        id: "c4",
        name: "Velvet Hazelnut Cortado",
        price: "$5.40",
        tag: "Barista Pick",
        badge: "Rich & Balanced",
        origin: "Ethiopian Yirgacheffe",
        dietary: ["Nut Artisan", "Dairy Alt"],
        desc: "Equal parts espresso and steamed microfoam milk infused with stone-ground roasted Piedmont hazelnuts."
      }
    ]
  },
  {
    id: "mocktails",
    title: "Craft Botanical Mocktails",
    shortTitle: "Mocktails",
    icon: "🍸",
    badge: "Zero-Proof Spirits",
    side: "Side I • Brews & Botanicals",
    desc: "Sophisticated zero-proof elixirs formulated with distilled botanicals, cold-pressed citrus, and smoking herbs.",
    items: [
      {
        id: "m1",
        name: "Golden Amber Spritz",
        price: "$7.50",
        tag: "House Signature",
        badge: "Zero Alcohol",
        origin: "Italian Botanicals & Thyme",
        dietary: ["Refined Sugar Free", "Vegan"],
        desc: "Non-alcoholic Italian bitter orange, cold-pressed blood orange, sparkling botanical soda, and fresh garden thyme."
      },
      {
        id: "m2",
        name: "Smoked Rosemary & Blackberry Mule",
        price: "$7.20",
        tag: "Smoked Live",
        badge: "Smoky & Bold",
        origin: "Pacific Northwest Wild Berry",
        dietary: ["Hand-Crushed", "Gluten Free"],
        desc: "Muddled wild mountain blackberries, spicy ginger beer, clarified lime juice, served with a flaming rosemary sprig."
      },
      {
        id: "m3",
        name: "Yuzu Blossom Fizz",
        price: "$6.90",
        tag: "Refreshing",
        badge: "24k Gold Leaf",
        origin: "Shikoku Yuzu & Elderflower",
        dietary: ["Low Calorie", "Vegan"],
        desc: "Wild Japanese yuzu extract, organic elderflower cordial, sparkling mineral water, crowned with 24k edible gold leaf."
      },
      {
        id: "m4",
        name: "Cascara Hibiscus Tonic",
        price: "$6.40",
        tag: "Artisan Brew",
        badge: "Herbal Elixir",
        origin: "Aswan Hibiscus & Cascara",
        dietary: ["Caffeine Light", "Fair Trade"],
        desc: "Sun-dried coffee cascara steeped with Egyptian hibiscus petals, finished with crisp Mediterranean tonic."
      }
    ]
  },
  {
    id: "boba",
    title: "Artisan Boba & Kyoto Teas",
    shortTitle: "Boba & Teas",
    icon: "🧋",
    badge: "Slow-Cooked Tapioca",
    side: "Side II • Artisan Teas & Pâtisserie",
    desc: "Artisanal boba cooked fresh every three hours in Okinawa kokuto sugar, paired with ceremonial-grade imported Japanese teas.",
    items: [
      {
        id: "b1",
        name: "Torched Brown Sugar Tiger Boba",
        price: "$6.50",
        tag: "Fresh Tapioca",
        badge: "Crème Brûlée Top",
        origin: "Okinawa Kokuto Sugar",
        dietary: ["Oat Milk Base", "Organic"],
        desc: "Slow-simmered Okinawa brown sugar pearls, creamy organic oat milk, crowned with caramelized torched custard crème."
      },
      {
        id: "b2",
        name: "Ceremonial Matcha Cloud Boba",
        price: "$7.00",
        tag: "Uji First Harvest",
        badge: "Stone-Ground",
        origin: "Uji, Kyoto Prefecture",
        dietary: ["Superfood", "Artisan"],
        desc: "First-harvest ceremonial matcha from Uji, Kyoto layered over house-made sea salt cheese foam and chewy pearls."
      },
      {
        id: "b3",
        name: "Roasted Charcoal Oolong Milk Tea",
        price: "$6.20",
        tag: "Charcoal Roasted",
        badge: "Deep Smoky Notes",
        origin: "Alishan Mountain, Taiwan",
        dietary: ["Dairy-Free Oat", "Low Sweetness"],
        desc: "Deep-roasted high-mountain Taiwan oolong with organic dairy-free oat creamer and brown sugar pearls."
      },
      {
        id: "b4",
        name: "White Peach Jasmine Cloud",
        price: "$6.80",
        tag: "Floral Infusion",
        badge: "Cold-Brewed 18h",
        origin: "Fujian Silver Needle Jasmine",
        dietary: ["Delicate Floral", "Vegan"],
        desc: "Cold-brewed silver needle jasmine tea topped with whipped peach cream foam and organic golden boba."
      }
    ]
  },
  {
    id: "desserts",
    title: "Pâtisserie & Warm Desserts",
    shortTitle: "Pâtisserie",
    icon: "🍰",
    badge: "Baked Fresh Daily",
    side: "Side II • Artisan Teas & Pâtisserie",
    desc: "Flaky viennoiserie, molten center cheesecakes, and artisanal tarts baked from scratch twice daily by our master pastry chefs.",
    items: [
      {
        id: "d1",
        name: "Pistachio Molten Basque Cheesecake",
        price: "$8.90",
        tag: "Chef's Special",
        badge: "Warm Molten Core",
        origin: "Bronte Sicilian Pistachio",
        dietary: ["Nut Artisan", "Vegetarian"],
        desc: "Deeply caramelized burnt exterior with an oozing warm Bronte Sicilian pistachio praline center."
      },
      {
        id: "d2",
        name: "Espresso Bean Tiramisu Tart",
        price: "$7.80",
        tag: "House Favorite",
        badge: "Single-Origin Drenched",
        origin: "Lombardy Mascarpone",
        dietary: ["Valrhona Cocoa", "Handcrafted"],
        desc: "Crispy dark cocoa sable tart filled with mascarpone mousse, drenched in our house single-origin espresso."
      },
      {
        id: "d3",
        name: "Warm Salted Caramel Cinnamon Roll",
        price: "$5.50",
        tag: "Oven Warm",
        badge: "Bourbon Glaze",
        origin: "Ceylon True Cinnamon",
        dietary: ["Brioche Dough", "Warm Served"],
        desc: "Fluffy brioche dough rolled with Ceylon cinnamon, drowned in warm salted bourbon butterscotch glaze."
      },
      {
        id: "d4",
        name: "Toasted Almond Frangipane Brioche",
        price: "$6.20",
        tag: "French Classic",
        badge: "Twice Baked",
        origin: "Normandy Butter & Almonds",
        dietary: ["Laminated Pastry", "Vegetarian"],
        desc: "Golden laminated brioche pastry layered with almond cream, toasted sliced almonds, and vanilla dust."
      }
    ]
  }
];

const DIETARY_FILTERS = [
  { id: "all", label: "All Items" },
  { id: "Bestseller", label: "★ Bestsellers" },
  { id: "Organic", label: "🌱 Organic" },
  { id: "Vegan", label: "🍃 Vegan / Oat" },
  { id: "Gluten Free", label: "🌾 Gluten-Free" }
];

const MenuSection = memo(function MenuSection({ isVisible, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState("all"); // "all" | "coffee" | "mocktails" | "boba" | "desserts"
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDietary, setActiveDietary] = useState("all");

  // Filtered menu data based on activeCategory, searchQuery, activeDietary
  const filteredData = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return MENU_DATA.map((cat) => {
      // If a category tab is selected, filter out other categories
      if (activeCategory !== "all" && cat.id !== activeCategory) {
        return { ...cat, items: [] };
      }

      const matchingItems = cat.items.filter((item) => {
        // Search query match
        if (query) {
          const matchName = item.name.toLowerCase().includes(query);
          const matchDesc = item.desc.toLowerCase().includes(query);
          const matchOrigin = item.origin.toLowerCase().includes(query);
          const matchTag = item.tag.toLowerCase().includes(query);
          if (!matchName && !matchDesc && !matchOrigin && !matchTag) return false;
        }

        // Dietary filter match
        if (activeDietary !== "all") {
          if (activeDietary === "Bestseller") {
            if (item.tag !== "Bestseller" && item.tag !== "House Signature" && item.tag !== "House Favorite") {
              return false;
            }
          } else if (activeDietary === "Organic") {
            const hasOrganic = item.dietary.some((d) => d.toLowerCase().includes("organic"));
            if (!hasOrganic) return false;
          } else if (activeDietary === "Vegan") {
            const hasVegan = item.dietary.some((d) => d.toLowerCase().includes("vegan") || d.toLowerCase().includes("oat"));
            if (!hasVegan) return false;
          } else if (activeDietary === "Gluten Free") {
            const hasGF = item.dietary.some((d) => d.toLowerCase().includes("gluten free"));
            if (!hasGF) return false;
          }
        }

        return true;
      });

      return { ...cat, items: matchingItems };
    }).filter((cat) => cat.items.length > 0);
  }, [activeCategory, searchQuery, activeDietary]);

  const totalFilteredCount = filteredData.reduce((acc, cat) => acc + cat.items.length, 0);

  // Split into left and right sides for dual view
  const leftCats = filteredData.filter((c) => c.id === "coffee" || c.id === "mocktails");
  const rightCats = filteredData.filter((c) => c.id === "boba" || c.id === "desserts");

  const isSingleCategoryMode = activeCategory !== "all" && filteredData.length === 1;

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
        justifyContent: "center",
        padding: "76px 16px 20px",
        overflow: "hidden",
        pointerEvents: isVisible ? "auto" : "none",
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? "visible" : "hidden",
        transform: isVisible ? "translateY(0) scale(1) translateZ(0)" : "translateY(24px) scale(0.985) translateZ(0)",
        transition: "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.45s",
        willChange: "opacity, transform"
      }}
    >
      <div className="menu-grand-board">
        {/* Animated laser lines flanking the outer edges (desktop) */}
        <div className="menu-outer-line left" aria-hidden="true">
          <div className="menu-beam-pulse" />
          <div className="menu-side-tick" style={{ top: "20%", left: "-12px", width: "12px" }} />
          <div className="menu-side-tick" style={{ top: "50%", left: "-18px", width: "18px", animationDelay: "1s" }} />
          <div className="menu-side-tick" style={{ top: "80%", left: "-12px", width: "12px", animationDelay: "2s" }} />
        </div>

        <div className="menu-outer-line right" aria-hidden="true">
          <div className="menu-beam-pulse" />
          <div className="menu-side-tick" style={{ top: "20%", right: "-12px", width: "12px" }} />
          <div className="menu-side-tick" style={{ top: "50%", right: "-18px", width: "18px", animationDelay: "1.5s" }} />
          <div className="menu-side-tick" style={{ top: "80%", right: "-12px", width: "12px", animationDelay: "0.5s" }} />
        </div>

        {/* Compact, Luxury Header */}
        <header className="menu-header-block">
          <div className="menu-eyebrow">
            ✦ Artisanal Food & Drink Collection ✦
          </div>

          <h2 className="menu-headline">
            Curated Menu & Dining Selections
          </h2>

          <p className="menu-subhead">
            Crafted with ethically sourced single-origin micro-lots, botanical zero-proof elixirs, and scratch-baked French pâtisserie.
          </p>

          {/* Search Bar & Dietary Filter Row */}
          <div className="menu-controls-row">
            <div className="menu-search-wrapper">
              <span className="menu-search-icon" aria-hidden="true">🔍</span>
              <input
                type="text"
                className="menu-search-input"
                placeholder="Search coffee, mocktails, boba, desserts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search menu items"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="menu-search-clear"
                  onClick={() => setSearchQuery("")}
                  title="Clear search"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dietary quick filter chips */}
            <div className="menu-dietary-chips">
              {DIETARY_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`menu-dietary-chip ${activeDietary === f.id ? "active" : ""}`}
                  onClick={() => setActiveDietary(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Category Switcher Tabs */}
          <div className="menu-tabs-scroll-container">
            <button
              type="button"
              className={`menu-tab-btn ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              <span>✦</span>
              <span>All Offerings</span>
              <span className="menu-tab-count">16</span>
            </button>

            {MENU_DATA.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`menu-tab-btn ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.icon}</span>
                <span>{cat.title}</span>
                <span className="menu-tab-count">4</span>
              </button>
            ))}
          </div>
        </header>

        {/* Empty State */}
        {totalFilteredCount === 0 && (
          <div className="menu-empty-state">
            <span style={{ fontSize: "2.5rem" }}>☕</span>
            <h3 style={{ color: "#FFFFFF", fontFamily: "'Playfair Display', serif", margin: "12px 0 6px 0" }}>
              No artisanal creations found
            </h3>
            <p style={{ color: "#CBC2B6", fontSize: "0.9rem", margin: "0 0 16px 0" }}>
              No items matched "{searchQuery}". Try a different keyword or reset filters.
            </p>
            <button
              type="button"
              className="menu-tab-btn active"
              onClick={() => {
                setSearchQuery("");
                setActiveDietary("all");
                setActiveCategory("all");
              }}
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Single Category View (2-Column Grid on Desktop, fits without scrolling!) */}
        {isSingleCategoryMode && (
          <div className="menu-single-category-wrap">
            <div className="menu-category-banner">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "1.8rem" }}>{filteredData[0].icon}</span>
                <div>
                  <h3 className="menu-category-banner-title">{filteredData[0].title}</h3>
                  <div className="menu-category-banner-side">{filteredData[0].side} • {filteredData[0].badge}</div>
                </div>
              </div>
              <p className="menu-category-banner-desc">{filteredData[0].desc}</p>
            </div>

            <div className="menu-single-category-grid">
              {filteredData[0].items.map((item) => (
                <div key={item.id} className="menu-dish-item card-styled">
                  <div className="dish-top-row">
                    <h4 className="dish-name">{item.name}</h4>
                    <span className="dish-price">{item.price}</span>
                  </div>

                  <div className="dish-origin-row">
                    <span className="dish-origin-pin">📍</span>
                    <span>{item.origin}</span>
                  </div>

                  <p className="dish-description">{item.desc}</p>

                  <div className="dish-bottom-row">
                    <div className="dish-tags-list">
                      <span className="dish-tag">
                        <span>✦</span>
                        <span>{item.tag}</span>
                      </span>
                      {item.dietary.map((d, dIdx) => (
                        <span key={dIdx} className="dish-dietary-pill">{d}</span>
                      ))}
                    </div>
                    <span className="dish-craft-badge">{item.badge}</span>
                  </div>

                  <div className="dish-animated-line" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Dual-Spread Menu View */}
        {!isSingleCategoryMode && totalFilteredCount > 0 && (
          <div className="menu-dual-spread dual-layout">
            {/* ================= LEFT SIDE SECTIONS ================= */}
            <div className="menu-side-col left-side">
              {leftCats.length > 0 && (
                <div className="menu-side-tag-indicator">
                  <div className="side-tag-accent" />
                  <span className="side-tag-text">Side I • Brews & Botanicals</span>
                  <div className="side-tag-line" />
                </div>
              )}

              {leftCats.map((section) => (
                <div key={section.id} className="food-type-block">
                  <div className="food-type-header">
                    <div className="header-thin-line" />
                    <h3 className="food-type-title">
                      <span>{section.icon}</span>
                      <span>{section.title}</span>
                    </h3>
                    <div className="header-thin-line right-line" />
                  </div>

                  <div className="menu-items-list">
                    {section.items.map((item) => (
                      <div key={item.id} className="menu-dish-item">
                        <div className="dish-top-row">
                          <h4 className="dish-name">{item.name}</h4>
                          <span className="dish-price">{item.price}</span>
                        </div>

                        <div className="dish-origin-row">
                          <span className="dish-origin-pin">📍</span>
                          <span>{item.origin}</span>
                        </div>

                        <p className="dish-description">{item.desc}</p>

                        <div className="dish-bottom-row">
                          <div className="dish-tags-list">
                            <span className="dish-tag">
                              <span>✦</span>
                              <span>{item.tag}</span>
                            </span>
                            {item.dietary.map((d, dIdx) => (
                              <span key={dIdx} className="dish-dietary-pill">{d}</span>
                            ))}
                          </div>
                          <span className="dish-craft-badge">{item.badge}</span>
                        </div>

                        <div className="dish-animated-line" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* ================= CENTER DIVIDER LINE WITH GLOW EMBLEM ================= */}
            <div className="menu-center-divider" aria-hidden="true">
              <div className="menu-center-emblem">☕</div>
            </div>

            {/* ================= RIGHT SIDE SECTIONS ================= */}
            <div className="menu-side-col right-side">
              {rightCats.length > 0 && (
                <div className="menu-side-tag-indicator">
                  <div className="side-tag-accent" />
                  <span className="side-tag-text">Side II • Artisan Teas & Pâtisserie</span>
                  <div className="side-tag-line" />
                </div>
              )}

              {rightCats.map((section) => (
                <div key={section.id} className="food-type-block">
                  <div className="food-type-header">
                    <div className="header-thin-line" />
                    <h3 className="food-type-title">
                      <span>{section.icon}</span>
                      <span>{section.title}</span>
                    </h3>
                    <div className="header-thin-line right-line" />
                  </div>

                  <div className="menu-items-list">
                    {section.items.map((item) => (
                      <div key={item.id} className="menu-dish-item">
                        <div className="dish-top-row">
                          <h4 className="dish-name">{item.name}</h4>
                          <span className="dish-price">{item.price}</span>
                        </div>

                        <div className="dish-origin-row">
                          <span className="dish-origin-pin">📍</span>
                          <span>{item.origin}</span>
                        </div>

                        <p className="dish-description">{item.desc}</p>

                        <div className="dish-bottom-row">
                          <div className="dish-tags-list">
                            <span className="dish-tag">
                              <span>✦</span>
                              <span>{item.tag}</span>
                            </span>
                            {item.dietary.map((d, dIdx) => (
                              <span key={dIdx} className="dish-dietary-pill">{d}</span>
                            ))}
                          </div>
                          <span className="dish-craft-badge">{item.badge}</span>
                        </div>

                        <div className="dish-animated-line" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Note with quick reserve CTA */}
        <footer className="menu-board-footer">
          <div className="menu-footer-left">
            <span style={{ color: "#D4A574" }}>✦</span>
            <span>All dairy alternatives (Oat, Almond, Soy) available at no extra surcharge.</span>
          </div>

          <div className="menu-footer-badges">
            <span>🌱 100% Organic</span>
            <span>✨ Fair Trade Certified</span>
            <span>🍯 Locally Sourced Honey</span>
            {onNavigate && (
              <button
                type="button"
                className="menu-footer-cta"
                onClick={() => onNavigate("contact")}
              >
                Reserve a Table →
              </button>
            )}
          </div>
        </footer>
      </div>
    </section>
  );
});

export default MenuSection;

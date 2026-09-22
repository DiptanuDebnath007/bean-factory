import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Serve scroll frames directly
const scrollAssetsPath = path.join(__dirname, "..", "scroll assets");
app.use("/frames", express.static(scrollAssetsPath, { maxAge: "1y" }));

// Reservation API endpoint
app.post("/api/reserve", (req, res) => {
  const { name, email, guests, date, time, notes } = req.body;
  const bookingId = `BF-${Math.floor(100000 + Math.random() * 900000)}`;

  console.log(`[RESERVATION] New booking ${bookingId} for ${name} (${guests} guests on ${date} at ${time})`);

  res.json({
    success: true,
    bookingId,
    message: `Table for ${guests} confirmed for ${name} on ${date} at ${time}.`,
    details: { name, email, guests, date, time, notes }
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", service: "Bean Fact'ry API", timestamp: new Date() });
});

// Serve production static build
const distPath = path.join(__dirname, "..", "dist");
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`☕ Bean Fact'ry Server running at http://localhost:${PORT}`);
});

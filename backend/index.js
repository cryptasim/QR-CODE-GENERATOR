import express from "express";
import cors from "cors";
import qr from "qr-image";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post("/generate", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const qrCode = qr.imageSync(url, { type: "png" });
    const qrBase64 = Buffer.from(qrCode).toString("base64");
    res.json({ qrCode: `data:image/png;base64,${qrBase64}` });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate QR code" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

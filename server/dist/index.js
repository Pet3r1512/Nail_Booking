import express from "express";
const app = express();
const PORT = process.env.PORT || 5050;
app.use(express.json());
app.get("/", async (req, res) => {
  res.status(500).json({ message: "Done" });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

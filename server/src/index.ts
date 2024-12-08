import express from "express";
import dotenv from "dotenv";
import CustomerRouter from "./routes/customer";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json()); // Middleware to parse JSON request bodies

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running!" });
});

// Add the customer routes
app.use("/api/customers", CustomerRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

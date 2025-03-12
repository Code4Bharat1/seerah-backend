import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
import express from "express";
import cors from "cors";
import emailRoutes from "./routes/email.js";
const app = express();
const PORT = process.env.PORT || 5000;
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

app.use(cors());
app.use(express.json());
app.use("/api/email", emailRoutes);

app.get("/", (req, res) => {
  res.send("Seerah Backend API is Running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

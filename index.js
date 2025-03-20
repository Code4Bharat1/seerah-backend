import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors from "cors";
import emailRoutes from "./src/routes/email.js";
import contactRoutes from "./src/routes/contact.js";
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = express();
const PORT = process.env.PORT || 5034;
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

app.use(cors());
app.use(express.json());
app.use("/api/email", emailRoutes);
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("Seerah Backend API is Running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

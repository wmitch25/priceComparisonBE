import express from "express";
import cors from "cors";
import searchRoutes from "./routes/searchRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", searchRoutes);

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

export default app;

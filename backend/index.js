import express from "express";
import cors from "cors";
import { ConnectDB } from "./db.js";
import ExpenseRoutes from "./Routes/ExpenseRoute.js";

const PORT = 8000;

const app = express();
app.use(express.json());
ConnectDB();
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/", ExpenseRoutes);

// app.post("/overview", (req, res) => {
//   const { date, expense } = req.body;
//   console.log("Received:", date, expense);
//   res.status(200).json({ message: "Data received successfully" });
// });

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});

import cors from "cors";
import helmet from "helmet";
import express from "express";
import { ConnectDB } from "./db.js";
import cookieParser from "cookie-parser";
import UserRoutes from "./Routes/UserRoutes.js";
import { userToken } from "./middleware/token.js";
import IncomeRoutes from "./Routes/IncomeRoute.js";
import ExpenseRoutes from "./Routes/ExpenseRoute.js";
import InvestmentRoutes from "./Routes/InvestmentRoute.js";
import { logoutUser } from "./controller/UserController.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const PORT = 8000;

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
ConnectDB();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/", UserRoutes);
app.use("/", userToken, IncomeRoutes);
app.use("/", userToken, InvestmentRoutes);
app.use("/", userToken, ExpenseRoutes);

app.get("/auth/userCheck", userToken, (req, res) => {
  res.json({ authenticated: true, user: req.user });
});
app.post("/logout", logoutUser);

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}`);
});

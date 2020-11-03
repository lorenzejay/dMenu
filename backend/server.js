import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import { notFound, errorHandler } from "./middlewares/errorMiddlewares.js";
import userRoute from "./routes/ownerRoute.js";

dotenv.config();
connectDB();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is being loaded here");
});

// app.get("/api/menu", (req, res) => {
//   res.json(menuItems);
// });

app.use("/api/users", userRoute);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Port is running on port ${port} on ${process.env.NODE_ENVIRONMENT} mode`);
});

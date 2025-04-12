import express, { Application } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import recipeRoutes from "./routes/recipeRoutes";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/recipes", recipeRoutes);

app.use(errorHandler);

export default app;

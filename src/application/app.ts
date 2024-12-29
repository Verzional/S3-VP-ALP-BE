import express from "express";
import { api } from "../routes/API";
import { errorMiddleware } from "../middleware/ErrorMiddleware";

const app = express();
app.use(express.json());
app.use(api);
app.use(errorMiddleware);

export default app;

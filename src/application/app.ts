import express from "express";
import path from "path";
import { api } from "../routes/API";
import { errorMiddleware } from "../middleware/ErrorMiddleware";

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
app.use(api);
app.use(errorMiddleware);

export default app;
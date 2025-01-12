import express from "express";
import path from "path";
import { api } from "../routes/api";
import { errorMiddleware } from "../middleware/errorMiddleware";

const app = express();

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));
app.use(api);
app.use(errorMiddleware);

export default app;
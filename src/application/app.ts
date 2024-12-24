import express from "express"
import { api } from "../routes/api"
import { errorMiddleware } from "../middleware/errorMiddleware"

const app = express()
app.use(express.json())
app.use(api)
app.use(errorMiddleware)

export default app
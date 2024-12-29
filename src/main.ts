import app from "./application/App"
import { logger } from "./application/Logging"

app.listen(3000, () => {
    logger.info("Listening on http://localhost:3000")
})
import app from "./application/App";
import { logger } from "./application/Logging";

const PORT = 3000;

app.listen(PORT, () => {
  logger.info(`Listening on http://localhost:${PORT}`);
});

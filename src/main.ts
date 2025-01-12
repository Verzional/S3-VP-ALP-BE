import app from "./application/app";
import { logger } from "./application/logging";

const PORT = 3000;

app.listen(PORT, () => {
  logger.info(`Listening on http://localhost:${PORT}`);
});

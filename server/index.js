import "dotenv/config";
import express from "express";
import db from "../config/dbConnect.js";
import notFoundHandler from "../middlewares/notFoundHandler.js";
import errorHandler from "../middlewares/errorHandler.js";
import routes from "../routes/index.js";

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => console.log("Conectado ao banco de dados!"));

const port = process.env.PORT || 3000;
const app = express();

routes(app);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

export default app;

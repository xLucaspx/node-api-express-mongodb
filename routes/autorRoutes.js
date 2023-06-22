import express from "express";
import AutorController from "../controllers/AutorController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router
  .get("/autores", AutorController.getAutores, paginate)
  .get("/autores/:id", AutorController.getAutorById)
  .post("/autores", AutorController.addAutor)
  .put("/autores/:id", AutorController.updateAutor)
  .delete("/autores/:id", AutorController.deleteAutor);

export default router;

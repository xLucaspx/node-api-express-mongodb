import express from "express";
import LivroController from "../controllers/LivroController.js";
import paginate from "../middlewares/paginate.js";

const router = express.Router();

router
  .get("/livros", LivroController.getLivros, paginate)
  .get("/livros/busca", LivroController.getLivrosByFilter, paginate)
  .get("/livros/:id", LivroController.getLivroById)
  .post("/livros", LivroController.addLivro)
  .put("/livros/:id", LivroController.updateLivro)
  .delete("/livros/:id", LivroController.deleteLivro);

export default router;

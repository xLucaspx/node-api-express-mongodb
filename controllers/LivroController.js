import NotFoundError from "../errors/NotFoundError.js";
import { autores, livros } from "../models/index.js";

class LivroController {
  static getLivros = async (req, res, next) => {
    try {
      // sem await pois isso está sendo tratado no middleware de paginação
      req.result = livros.find();
      next();
    } catch (error) {
      next(error);
    }
  };

  static getLivroById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await livros.findById(id).populate("autor", "nome").exec();

      if (result !== null) res.status(200).send(result);
      else
        next(
          new NotFoundError(
            `O ID ${id} não corresponde a nenhum livro no banco de dados!`
          )
        );
    } catch (error) {
      next(error);
    }
  };

  static getLivrosByFilter = async (req, res, next) => {
    try {
      const query = await handleQuery(req.query);

      if (query === null) res.status(200).send([]);
      else {
        req.result = livros.find(query).populate("autor");
        next();
      }
    } catch (error) {
      next(error);
    }
  };

  static addLivro = async (req, res, next) => {
    try {
      const livro = new livros(req.body);
      const result = await livro.save();

      res.status(201).send(result.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static updateLivro = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await livros.findByIdAndUpdate(id, { $set: req.body });

      if (result !== null)
        res
          .status(200)
          .send({ message: `Livro ${id} atualizado com sucesso!` });
      else
        next(
          new NotFoundError(
            `Não foi possível editar o livro: O ID ${id} não foi encontrado!`
          )
        );
    } catch (error) {
      next(error);
    }
  };

  static deleteLivro = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await livros.findByIdAndDelete(id);

      if (result !== null)
        res.status(200).send({ message: `Livro ${id} excluído com sucesso!` });
      else
        next(
          new NotFoundError(
            `Não foi possível excluir o livro: O ID ${id} não foi encontrado!`
          )
        );
    } catch (error) {
      next(error);
    }
  };
}

async function handleQuery(params) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params;
  let query = {};

  if (editora) query.editora = editora;
  if (titulo) query.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) query.paginas = {};
  if (minPaginas) query.paginas.$gte = minPaginas;
  if (maxPaginas) query.paginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });
    if (autor !== null) query.autor = autor._id;
    else query = null;
  }

  return query;
}

export default LivroController;

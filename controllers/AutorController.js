import NotFoundError from "../errors/NotFoundError.js";
import { autores } from "../models/index.js";

class AutorController {
  static getAutores = async (req, res, next) => {
    try {
      req.result = autores.find();
      next();
    } catch (error) {
      next(error);
    }
  };

  static getAutorById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await autores.findById(id);

      if (result !== null) res.status(200).send(result);
      else
        next(
          new NotFoundError(
            `O ID ${id} não corresponde a nenhum autor no banco de dados!`
          )
        );
    } catch (error) {
      next(error);
    }
  };

  static addAutor = async (req, res, next) => {
    try {
      const autor = new autores(req.body);
      const result = await autor.save();

      res.status(201).send(result.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static updateAutor = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await autores.findByIdAndUpdate(id, { $set: req.body });

      if (result !== null)
        res
          .status(200)
          .send({ message: `Autor ${id} atualizado com sucesso!` });
      else
        next(
          new NotFoundError(
            `Não foi possível editar o autor: O ID ${id} não foi encontrado!`
          )
        );
    } catch (error) {
      next(error);
    }
  };

  static deleteAutor = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await autores.findByIdAndDelete(id);

      if (result !== null)
        res.status(200).send({ message: `Autor ${id} excluído com sucesso!` });
      else
        next(
          new NotFoundError(
            `Não foi possível excluir o autor: O ID ${id} não foi encontrado!`
          )
        );
    } catch (error) {
      next(error);
    }
  };
}

export default AutorController;

import BadRequestError from "../errors/BadRequestError.js";

async function paginate(req, res, next) {
  try {
    let { limit = 5, page = 1, sort = "_id:-1" } = req.query;
    let [sortField, order] = sort.split(":");

    limit = parseInt(limit);
    page = parseInt(page);
    order = parseInt(order);

    if (limit > 0 && page > 0) {
      const result = await req.result
        .find()
        .sort({ [sortField]: order })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

      res.status(200).json(result);
    } else {
      next(
        new BadRequestError(
          "Erro ao realizar busca:\nPor favor, verifique os parâmetros da busca e tente novamente"
        )
      );
    }
  } catch (error) {
    next(error);
  }
}

export default paginate;

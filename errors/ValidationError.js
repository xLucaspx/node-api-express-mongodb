import BadRequestError from "./BadRequestError.js";

class ValidationError extends BadRequestError {
  constructor(error) {
    const messages = Object.values(error.errors)
      .map((e) => e.message)
      .join(";\n");

    super(`Os seguintes erros foram encontrados: \n${messages}`);
  }
}

export default ValidationError;

import BaseError from "./BaseError.js";

class NotFoundError extends BaseError {
  constructor(message = "Página não encontrada.") {
    super(404, message);
  }
}

export default NotFoundError;

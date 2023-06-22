import BaseError from "./BaseError.js";

class BadRequestError extends BaseError {
  constructor(message = "Um ou mais dados fornecidos estão incorretos") {
    super(400, message);
  }
}

export default BadRequestError;

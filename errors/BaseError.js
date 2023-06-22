class BaseError extends Error {
  constructor(status = 500, message = "Erro interno do servidor.") {
    super();
    this.status = status;
    this.message = message;
  }

  sendResponse(res) {
    res.status(this.status).send({
      status: this.status,
      message: this.message,
    });
  }
}

export default BaseError;

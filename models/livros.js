import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: {
    type: String,
    required: [true, "O título do livro é obrigatório!"],
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    require: [true, "O(a) autor(a) é obrigatório!"],
  },
  editora: {
    type: String,
    required: [true, "A editora é obrigatória!"],
    enum: {
      values: ["L&PM", "Zahar", "Intrínseca"],
      message: "O valor {VALUE} não é válido para editora!",
    },
  },
  paginas: {
    type: Number,
    validate: {
      validator: (value) => {
        return value >= 10 && value <= 5000;
      },
      message:
        "O número de páginas deve estar entre 10 e 5000! Valor inserido: {VALUE}.",
    },
  },
});

const livros = mongoose.model("livros", livroSchema);

export default livros;

import mongoose from "mongoose";

mongoose.connect(process.env.DB_CONNECTION);

const db = mongoose.connection;

export default db;

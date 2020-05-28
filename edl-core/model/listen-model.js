const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listenSchema = new Schema({
  shortId: String,
  username: String,
  password: String,
  cronId: String,
  tokenEd: String,
  eleleId: Number,
  agenda: Array,
  creation_date: String,
  num: Number,
  updated: Number,
});

const Listens = mongoose.model("listen", listenSchema);

module.exports = Listens;

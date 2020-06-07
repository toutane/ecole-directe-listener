const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listenSchema = new Schema({
  shortId: String,
  interval: String,
  fetchOn: Array,
  username: String,
  password: String,
  cronIds: Array,
  tokenEd: String,
  expoPushToken: String,
  eleveId: Number,
  agenda: Array,
  messages: Array,
  notes: Array,
  creation_date: String,
  lastUpdate_date: String,
  num: Number,
  updated: Number,
});

const Listens = mongoose.model("listen", listenSchema);

module.exports = Listens;

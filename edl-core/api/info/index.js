const mongoose = require("mongoose");

const keys = require("../../.config/keys");

const Listens = require("../../model/listen-model");

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("connected to mongodb");
});

module.exports = (req, res) => {
  getListenData(req.query, res);
};

async function getListenData(query, res) {
  await Listens.find({ eleveId: query.eleleId }).then((data) => {
    res.send(data[0]);
  });
}

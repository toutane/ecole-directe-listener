const fetch = require("node-fetch");
const mongoose = require("mongoose");
const keys = require("../../.config/keys");

const Listens = require("../../model/listen-model");

import { token } from "../../.config/APItoken";

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("connected to mongodb");
});

module.exports = (req, res) => {
  deleteCronJob(req.query, res);
};

async function deleteCronJob(query, res) {
  let cron = `https://www.easycron.com/rest`;
  // res.send(JSON.parse(query.ids));
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
  asyncForEach(JSON.parse(query.ids), async (id) => {
    await fetch(`${cron}/delete?token=${token}&id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/edn",
      },
    });
  }).then(() => deleteListen(query, res));
}

function deleteListen(query, res) {
  Listens.findOneAndDelete({ cronIds: JSON.parse(query.ids) }, (err) => {
    err
      ? res.send({
          status: "error",
          error: `There was an error`,
          code: 404,
        })
      : res.send({ status: "success", message: "Succeed deletions" });
  });
}

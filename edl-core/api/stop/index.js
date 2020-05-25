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

  let response = await fetch(`${cron}/delete?token=${token}&id=${query.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/edn",
    },
  });
  let result = await response.json();
  deleteListen(query, res, result);
}

function deleteListen(query, res, result) {
  Listens.findOneAndDelete({ cronId: query.id }, (err) => {
    err
      ? res.send({
          status: "error",
          error: `There was an error`,
        })
      : res.send(result);
  });
}

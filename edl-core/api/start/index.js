const fetch = require("node-fetch");
const mongoose = require("mongoose");
const shortid = require("shortid-36");

const keys = require("../../.config/keys");
import { token } from "../../.config/APItoken";

const Listens = require("../../model/listen-model");

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("connected to mongodb");
});

module.exports = (req, res) => {
  addCronJob(req.query, res);
};

async function addCronJob(query, res) {
  let shortId = shortid.generate();

  let params = { shortId: shortId, eleveId: query.eleveId };
  let cron = `https://www.easycron.com/rest`;
  let interval = `*/10 * * * *`;
  let url = `https://edl-core.toutane.now.sh/api/agenda?params=${JSON.stringify(
    params
  )}`;
  // let url = `http://192.168.86.183:3000/api/agenda?params=${JSON.stringify(
  //   params
  // )}`;

  let response = await fetch(
    `${cron}/add?token=${token}&cron_job_name=cron_of_${query.eleveId}&cron_expression=${interval}&url=${url}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/edn",
      },
    }
  );
  let result = await response.json();
  result.status === "success"
    ? newListen(query, result.cron_job_id, shortId, res)
    : res.send(result);
}

function newListen(query, cronId, shortId, res) {
  const listen = {
    shortId: shortId,
    username: query.username,
    password: query.password,
    cronId: cronId,
    tokenEd: query.token,
    eleleId: query.eleveId,
    agenda: [],
    creation_date: Date.now(),
    num: 0,
    updated: 0,
  };
  new Listens(listen).save((err, newListen) => {
    err
      ? res.send({
          status: "error",
          error: { message: `There was an error` },
        })
      : res.send({
          status: "success",
          cron_job_id: cronId,
        });
  });
}

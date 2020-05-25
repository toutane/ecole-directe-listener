const fetch = require("node-fetch");
const mongoose = require("mongoose");
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
  let cron = `https://www.easycron.com/rest`;
  let interval = `* * * * *`;
  // TOKEN IS TOO LONG
  let url = `https://edl-core.toutane.now.sh/api/notif?eleveId=${query.eleveId}`;
  // let url = `https://edl-core.toutane.now.sh/api/agenda?eleveId=${query.eleveId}`;
  // let url = `http://192.168.86.183:3000/api/agenda?eleveId=${query.eleveId}&ed_token=${query.token}`;

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
  newListen(query, result.cron_job_id, res);
  // res.send(result);
}

function newListen(query, cronId, res) {
  const listen = {
    cronId: cronId,
    tokenEd: query.token,
    eleleId: query.eleveId,
    items: [],
    num: 0,
  };
  new Listens(listen).save((err, newListen) => {
    err
      ? res.send({
          status: "error",
          error: `There was an error`,
        })
      : res.send({
          status: "success",
          cron_job_id: cronId,
        });
  });
}

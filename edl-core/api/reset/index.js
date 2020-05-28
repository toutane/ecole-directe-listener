const fetch = require("node-fetch");
const mongoose = require("mongoose");

const keys = require("../../.config/keys");
import { token } from "../../.config/APItoken";

const Listens = require("../../model/listen-model");

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("connected to mongodb");
});

module.exports = (req, res) => {
  resetCronJob(req.query, res);
};

async function resetCronJob(query, res) {
  let params = { shortId: query.shortId, eleveId: query.eleveId };
  let cron = `https://www.easycron.com/rest`;
  let interval = `*/10 * * * *`;
  let url = `https://edl-core.toutane.now.sh/api/agenda?params=${JSON.stringify(
    params
  )}`;

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
    ? (await Listens.updateOne(
        { shortId: query.shortId },
        { cronId: result.cron_job_id, updated: query.updated + 1 }
      ),
      deleteOlderCronJob(query, res, result.cron_job_id))
    : res.send(result);
}

async function deleteOlderCronJob(query, res, newCronId) {
  let cron = `https://www.easycron.com/rest`;

  let response = await fetch(
    `${cron}/delete?token=${token}&id=${query.cronId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/edn",
      },
    }
  );
  let result = await response.json();
  result.status === "success"
    ? res.send(
        `Successfully reset and remove cron job. New conID: ${newCronId}`
      )
    : res.send(result);
}

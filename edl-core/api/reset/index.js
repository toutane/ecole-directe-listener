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
  // res.send({ code: 200, messages: "recieve from reset api" });
};

async function resetCronJob(query, res) {
  let params = { shortId: query.shortId, eleveId: query.eleveId };
  let cron_job_ids = [];

  let cron = `https://www.easycron.com/rest`;

  let agenda = `https://edl-core.toutane.now.sh/api/agenda?params=${JSON.stringify(
    params
  )}`;

  let messages = `https://edl-core.toutane.now.sh/api/messages?params=${JSON.stringify(
    params
  )}`;

  let notes = `https://edl-core.toutane.now.sh/api/notes?params=${JSON.stringify(
    params
  )}`;

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
  asyncForEach(JSON.parse(query.fetchOn), async (type) => {
    await fetch(
      `${cron}/add?token=${token}&cron_job_name=cron_of_${
        query.eleveId
      }&cron_expression=${query.interval}&url=${
        type === "agenda" ? agenda : type === "messages" ? messages : notes
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/edn",
        },
      }
    )
      .then((response) => response.json())
      .then((result) =>
        result.status === "success"
          ? cron_job_ids.push(result.cron_job_id)
          : res.send("result")
      );
  }).then(async () => {
    await Listens.updateOne(
      { shortId: query.shortId },
      {
        cronIds: cron_job_ids,
        num: 7,
        updated: query.updated + 1,
        lastUpdate_date: new Date(),
      }
    ),
      deleteOlderCronJob(query, res);
  });
}

async function deleteOlderCronJob(query, res) {
  let cron = `https://www.easycron.com/rest`;

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
  asyncForEach(JSON.parse(query.cronIds), async (id) => {
    await fetch(`${cron}/delete?token=${token}&id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/edn",
      },
    });
  }).then((result) => res.send(result));
}

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
          : res.send(result)
      );
  }).then(() =>
    cron_job_ids.length === JSON.parse(query.fetchOn).length
      ? newListen(query, cron_job_ids, shortId, res)
      : res.send("there was an error (start listening)")
  );
}

function newListen(query, cron_job_ids, shortId, res) {
  const listen = {
    shortId: shortId,
    interval: query.interval,
    fetchOn: query.fetchOn,
    username: query.username,
    password: query.password,
    cronIds: cron_job_ids,
    tokenEd: query.token,
    expoPushToken: query.expoPushToken,
    eleveId: query.eleveId,
    agenda: [],
    messages: [],
    notes: [],
    creation_date: new Date(),
    lastUpdate_date: new Date(),
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
          cron_job_ids: newListen.cronIds,
        });
  });
}

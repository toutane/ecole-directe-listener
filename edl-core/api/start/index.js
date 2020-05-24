const fetch = require("node-fetch");

import { token } from "../../.config/APItoken";

module.exports = (req, res) => {
  addCronJob(req.query, res);
};

async function addCronJob(query, res) {
  let cron = `https://www.easycron.com/rest`;
  let interval = `* * * * *`;
  let url = `https://exp.host/--/api/v2/push/send`;
  let http_method = `POST`;
  let http_headers = {
    Accept: "application/json",
    "Accept-encoding": "gzip, deflate",
    "Content-Type": "application/json",
  };
  let posts = {
    to: query.expoPushToken,
    sound: "default",
    title: `⚡️EDL-Listener`,
    body: `EleveId: ${query.eleveId}`,
    _displayInForeground: true,
  };

  let response = await fetch(
    `${cron}/add?token=${token}&cron_job_name=cron_of_${
      query.eleveId
    }&cron_expression=${interval}&url=${"https://swapi.dev/api/people/1/"}&http_method=${"GET"}`,
    // `${cron}/add?token=${token}&cron_job_name=cron_of_${query.eleveId}&cron_expression=${interval}&url=${url}&http_method=${http_method}&http_headers=${http_headers}&posts=${posts}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/edn",
      },
    }
  );
  let result = await response.json();
  res.send(result);
}

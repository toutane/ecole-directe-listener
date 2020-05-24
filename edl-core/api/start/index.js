const fetch = require("node-fetch");

import { token } from "../../.config/APItoken";

module.exports = (req, res) => {
  addCronJob(req.query, res);
};

async function addCronJob(query, res) {
  let cron = `https://www.easycron.com/rest`;
  let interval = `* * * * *`;
  let url = `https://edl-core.toutane.now.sh/api/notif?eleveId=${query.eleveId}`;
  // let url = `http://192.168.86.183:3000/api/sendNotif/`;

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
  res.send(result);
}

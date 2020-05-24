const fetch = require("node-fetch");

import { token } from "../../.config/APItoken";

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
  res.send(result);
}

const mongoose = require("mongoose");
const fetch = require("node-fetch");

const keys = require("../../.config/keys");
const Listens = require("../../model/listen-model");

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("connected to mongodb");
});

module.exports = (req, res) => {
  getListen(req.query, res);
  // fetchAgenda(req.query, res);
};

async function getListen(query, res) {
  let params = JSON.parse(query.params);
  // sendNotification(params, params.shortId, res);
  let response = await Listens.find({ shortId: params.shortId });
  let result = await response.json();
  sendNotification(params, result.cronId, res);
  // fetchAgenda(query, result.tokenEd, res);
}

async function fetchAgenda(query, tokenEd, res) {
  let url = "https://api.ecoledirecte.com";
  let data = `data={ "token": "${tokenEd}" }`;

  let response = await fetch(
    `${url}/v3/Eleves/${query.eleveId}/cahierdetexte.awp?verbe=get&`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/edn",
      },
      body: data,
    }
  );
  let result = await response.json();
  // res.send(result);
  result.code === 200 && (await items.push(Object.keys(result.data).length));
  items.length !== 0 && sendNotification(query, items.length, res);
  items[items.length - 1] !== Object.keys(result.data).length, items.shift();
}

async function sendNotification(query, value, res) {
  // let url = `https://edl-core.toutane.now.sh`;
  let url = `http://192.168.86.183:3000`;
  let response = await fetch(
    `${url}/api/notif?eleveId=${query.eleveId}&body=${value}`,
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

const mongoose = require("mongoose");
const fetch = require("node-fetch");

const keys = require("../../.config/keys");
const Listens = require("../../model/listen-model");

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("connected to mongodb");
});

module.exports = (req, res) => {
  getListen(req.query, res);
};

// Get current listening item from mongo
async function getListen(query, res) {
  let params = JSON.parse(query.params);
  Listens.find({ shortId: params.shortId }).then((data) => {
    login(data[0].username, data[0].password, data[0], res);
  });
}

// Login to ED (issue with token validation)
async function login(username, password, item, res) {
  let url = "https://api.ecoledirecte.com";
  let data = `data={ "identifiant": "${username}", "motdepasse": "${password}"}`;
  let response = await fetch(`${url}/v3/login.awp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/edn",
    },
    body: data,
  });
  let result = await response.json();
  fetchChanges(result.token, item, res);
}

async function fetchChanges(token, item, res) {
  let url = "https://api.ecoledirecte.com";
  let data = `data= { "token": "${token}" }`;

  let new_agenda = [];

  await fetch(`${url}/v3/Eleves/${item.eleveId}/cahierdetexte.awp?verbe=get&`, {
    method: "POST",
    headers: {
      "Content-Type": "application/edn",
    },
    body: data,
  })
    .then((notes) => notes.json())
    .then((result) =>
      Object.keys(result.data)
        .map((key) =>
          result.data[key].map((obj) => Object.assign(obj, { date: key }))
        )
        .map((e) => e.forEach((element) => new_agenda.push(element)))
    );

  item.agenda.length === 0
    ? Listens.updateOne(
        { shortId: item.shortId },
        {
          agenda: new_agenda,
          num: 1,
        }
      ).then(() => res.send({ code: 200, message: `First agenda GET` }))
    : item.num >= 7
    ? resetCronJob(item, res)
    : compareAgenda(new_agenda, item, res);
}

async function compareAgenda(new_agenda, item, res) {
  yesterday = formatDate(Date.now());
  let old_agenda = item.agenda.filter((obj) => obj.date !== yesterday);

  old_agenda.length !== item.agenda.length
    ? (await Listens.updateOne(
        { shortId: item.shortId },
        { agenda: new_agenda, num: item.num + 1 }
      ),
      res.send({ code: 200, message: "Successfully agenda date update" }))
    : old_agenda.length !== new_agenda.length
    ? sendNotification(
        item,
        `You have new work to do! (fetch number:${item.num + 1})`,
        res
      )
    : (await Listens.updateOne(
        { shortId: item.shortId },
        { agenda: new_agenda, num: item.num + 1 }
      ),
      res.send({ code: 200, message: "Successfully update agenda" }));
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + (d.getDate() - 1),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

async function sendNotification(item, value, res) {
  let url = `https://edl-core.toutane.now.sh`;
  let response = await fetch(
    `${url}/api/notif?eleveId=${item.eleveId}&body=${value}&expoPushToken=${item.expoPushToken}`,
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

async function resetCronJob(item, res) {
  let url = `https://edl-core.toutane.now.sh`;
  // let url = `http://localhost:3000`;

  await fetch(
    `${url}/api/reset?eleveId=${item.eleveId}&shortId=${item.shortId}&updated=${
      item.updated
    }&cronIds=${JSON.stringify(item.cronIds)}&interval=${
      item.interval
    }&fetchOn=${item.fetchOn}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/edn",
      },
    }
  ).then((result) => res.send(result));
}

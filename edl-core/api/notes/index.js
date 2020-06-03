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

// fetch function
async function fetchChanges(token, item, res) {
  let url = "https://api.ecoledirecte.com";
  let data = `data= { "token": "${token}" }`;

  let new_notes = [];

  await fetch(`${url}/v3/eleves/${item.eleveId}/notes.awp?verbe=get&`, {
    method: "POST",
    headers: {
      "Content-Type": "application/edn",
    },
    body: data,
  })
    .then((notes) => notes.json())
    .then((result) =>
      result.data.notes.forEach((element) => new_notes.push(element))
    );

  item.notes.length === 0
    ? Listens.updateOne(
        { shortId: item.shortId },
        {
          notes: new_notes,
          num: 1,
        }
      ).then(() => res.send({ code: 200, message: `First notes GET` }))
    : compareNotes(new_notes, item, res);

  // res.send("not first fetch for notes");
}

async function compareNotes(new_notes, item, res) {
  item.notes.length !== new_notes.length
    ? (await Listens.updateOne(
        { shortId: item.shortId },
        { notes: new_notes, num: item.num + 1 }
      ),
      sendNotification(
        item,
        `You have a new note, en ${
          item.notes[item.notes.length - 1].libelleMatiere
        }: ${item.notes[item.notes.length - 1].valeur}/${
          item.notes[item.notes.length - 1].noteSur
        } (fetch number:${item.num + 1})`,
        res
      ))
    : (await Listens.updateOne(
        { shortId: item.shortId },
        { notes: new_notes, num: item.num + 1 }
      ),
      res.send({ code: 200, message: "No new note" }));
}

async function sendNotification(item, value, res) {
  let url = `https://edl-core.toutane.now.sh`;
  let response = await fetch(
    `${url}/api/notif?eleveId=${item.eleveId}&body=${value}`,
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

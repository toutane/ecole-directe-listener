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

  let first_notes = [];

  await fetch(`${url}/v3/eleves/${item.eleveId}/notes.awp?verbe=get&`, {
    method: "POST",
    headers: {
      "Content-Type": "application/edn",
    },
    body: data,
  })
    .then((notes) => notes.json())
    .then((result) =>
      result.data.notes.forEach((element) => first_notes.push(element))
    );

  item.notes.length === 0
    ? Listens.updateOne(
        { shortId: item.shortId },
        {
          notes: first_notes,
          num: 1,
        }
      ).then(() => res.send({ code: 200, message: `First notes GET` }))
    : res.send("not first fetch for notes");
}

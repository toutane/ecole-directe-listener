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

  let new_messages = [];

  await fetch(
    `${url}/v3/eleves/${item.eleveId}/messages.awp?verbe=getall&typeRecuperation=received&orderBy=date&order=desc&page=0&itemsPerPage=20&onlyRead=&query=&idClasseur=0`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/edn",
      },
      body: data,
    }
  )
    .then((messages) => messages.json())
    .then((result) =>
      result.data.messages.received.forEach((element) =>
        new_messages.push(element)
      )
    );

  item.messages.length === 0
    ? Listens.updateOne(
        { shortId: item.shortId },
        {
          messages: new_messages,
          num: 1,
        }
      ).then(() => res.send({ code: 200, message: `First messages GET` }))
    : compareMessages(new_messages, item, res);

  // res.send("not first fetch for messages");
}

async function compareMessages(new_messages, item, res) {
  item.messages.length !== new_messages.length
    ? (await Listens.updateOne(
        { shortId: item.shortId },
        { messages: new_messages, num: item.num + 1 }
      ),
      sendNotification(
        item,
        `You have a new message! (fetch number:${item.num + 1})`,
        res
      ))
    : (await Listens.updateOne(
        { shortId: item.shortId },
        { messages: new_messages, num: item.num + 1 }
      ),
      res.send({ code: 200, message: "No new message" }));
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

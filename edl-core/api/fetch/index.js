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

  let first_agenda = [];
  let first_messages = [];
  let first_notes = [];

  await fetch(`${url}/v3/Eleves/${item.eleveId}/cahierdetexte.awp?verbe=get&`, {
    method: "POST",
    headers: {
      "Content-Type": "application/edn",
    },
    body: data,
  })
    .then((agenda) => agenda.json())
    .then((result) =>
      Object.keys(result.data)
        .map((key) =>
          result.data[key].map((obj) => Object.assign(obj, { date: key }))
        )
        .map((e) => e.forEach((element) => first_agenda.push(element)))
    );

  // await fetch(
  //   `${url}/v3/eleves/${item.eleveId}/messages.awp?verbe=getall&typeRecuperation=received&orderBy=date&order=desc&page=0&itemsPerPage=20&onlyRead=&query=&idClasseur=0`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/edn",
  //     },
  //     body: data,
  //   }
  // )
  //   .then((messages) => messages.json())
  //   .then((result) =>
  //     result.data.messages.received.forEach((element) =>
  //       first_messages.push(element)
  //     )
  //   );

  // await fetch(`${url}/v3/eleves/${item.eleveId}/notes.awp?verbe=get&`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/edn",
  //   },
  //   body: data,
  // })
  //   .then((notes) => notes.json())
  //   .then((result) =>
  //     result.data.notes.forEach((element) => first_notes.push(element))
  //   );

  Listens.num === 0
    ? Listens.updateOne(
        { shortId: item.shortId },
        {
          agenda: first_agenda,
          notes: first_notes,
          messages: first_messages,
          num: 1,
        }
      ).then(() => res.send({ code: 200, message: `First agenda GET` }))
    : res.send("not first fetch");
}

// async function fetchAgenda(user, item) {
//   let url = "https://api.ecoledirecte.com";
//   let data = `data= { "token": "${tokenEd}" }`;

//   let response = await fetch(
//     `${url}/v3/Eleves/${item.eleveId}/cahierdetexte.awp?verbe=get&`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/edn",
//       },
//       body: data,
//     }
//   );
//   let result = await response.json();

//   let new_agenda = [];

//   Object.keys(result.data)
//     .map((key) =>
//       result.data[key].map((obj) => Object.assign(obj, { date: key }))
//     )
//     .map((e) => e.forEach((element) => new_agenda.push(element)));

//   listen.num == 0
//     ? (await Listens.updateOne(
//         { shortId: query.shortId },
//         { agenda: new_agenda, num: listen.num + 1 }
//       ),
//       res.send({ code: 200, message: "First fetch..." }))
//     : new Date().getMinutes() - new Date(listen.lastUpdate_date).getMinutes() >=
//       45
//     ? resetCronJob(listen)
//     : handle_compare(new_agenda, listen, query, res);
// }

// async function handle_compare(new_agenda, listen, query, res) {
//   yesterday = formatDate(Date.now());
//   let old_agenda = listen.agenda.filter((obj) => obj.date !== yesterday);

//   old_agenda.length !== listen.agenda.length
//     ? (await Listens.updateOne(
//         { shortId: query.shortId },
//         { agenda: new_agenda, num: listen.num + 1 }
//       ),
//       res.send({ code: 200, message: "Successfully agenda date update" }))
//     : old_agenda.length !== new_agenda.length
//     ? sendNotification(
//         listen,
//         `You have new work to do! (fetch number:${listen.num + 1})`,
//         res
//       )
//     : (await Listens.updateOne(
//         { shortId: query.shortId },
//         { agenda: new_agenda, num: listen.num + 1 }
//       ),
//       res.send({ code: 200, message: "Successfully update agenda" }));
// }

// function formatDate(date) {
//   var d = new Date(date),
//     month = "" + (d.getMonth() + 1),
//     day = "" + (d.getDate() - 1),
//     year = d.getFullYear();

//   if (month.length < 2) month = "0" + month;
//   if (day.length < 2) day = "0" + day;

//   return [year, month, day].join("-");
// }

// async function sendNotification(listen, value, res) {
//   let url = `https://edl-core.toutane.now.sh`;
//   let response = await fetch(
//     `${url}/api/notif?eleveId=${listen.eleveId}&body=${value}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/edn",
//       },
//     }
//   );
//   let result = await response.json();
//   res.send(result);
// }

// async function resetCronJob(listen) {
//   let url = `https://edl-core.toutane.now.sh`;
//   let response = await fetch(
//     `${url}/api/reset?eleveId=${listen.eleveId}&shortId=${listen.shortId}&updated=${listen.updated}&cronId=${listen.cronId}`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/edn",
//       },
//     }
//   );
//   let result = await response.json();
//   res.send(result);
// }

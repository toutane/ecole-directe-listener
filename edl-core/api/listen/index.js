const fetch = require("node-fetch");
const ora = require("ora");

module.exports = (req, res) => {
  listen(req, res).then(() => res.send({ value: req.query.order }));
};

const url = "https://api.ecoledirecte.com";

// const repeat = () =>
//   setInterval(() => {
//     num++;
//     sendExpoNotification(num);
//   }, query.interval);

async function listen(req, res) {
  let query = req.query;
  let num = 0;
  // setInterval(() => {
  //   num++;
  //   sendExpoNotification(num);
  // }, query.interval);

  // let num = 0;
  // let items = [];

  // const repeat = setInterval(() => {
  //   num++;
  //   sendExpoNotification(num);
  //   // console.log(`fetch number: ${num}`);
  //   // fetchData(query.token, query.eleveId, items, num);
  // }, query.interval);

  // res.send({ message: query.order });
}

// async function fetchTimer(minutes, token, eleveId) {
//   let num = 0;
//   let items = [];
//   let interval = 1 * 60 * 1000;
//   // let interval = minutes * 20 * 1000;
//   setInterval(() => {
//     num++;
//     fetchData(token, eleveId, items, num);
//   }, interval);
// }

const fetchData = (token, eleveId, items, num) => {
  getAgenda(token, eleveId, items, num);
  // getNotes(token, eleveId, items);
};

// // async function getNotes(token, eleveId) {}

// async function getAgenda(token, eleveId, items, num) {
//   let data = `data={ "token": "${token}" }`;
//   // let fetchingSpinner = await ora("Fetching agenda").start();
//   // fetchingSpinner.color = "green";
//   let response = await fetch(
//     `${url}/v3/Eleves/${eleveId}/cahierdetexte.awp?verbe=get&`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/edn",
//       },
//       body: data,
//     }
//   );
//   let result = await response.json();
//   result.code === 200
//     ? // fetchingSpinner.succeed(`Success`),
//       await items.push(Object.keys(result.data).length)
//     : //  fetchingSpinner.fail(`Failed`)
//       null;
//   items.length !== 0
//     ? items[items.length - 1] !== Object.keys(result.data).length
//       ? sendExpoNotification("You have a new work !")
//       : sendExpoNotification("You don't have any new work...")
//     : null;
//   items.shift();
// }

async function sendExpoNotification(num) {
  const message = {
    to: "ExponentPushToken[QgIEbWKYkGW_aMuVKv6EhS]",
    sound: "default",
    title: `⚡️EDL-Listener`,
    body: `Fetch number: ${num}`,
    _displayInForeground: true,
  };
  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  return response;
}

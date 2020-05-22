const fetch = require("node-fetch");
const ora = require("ora");

module.exports = (req, res) => {
  // const { name } = req.body;
  // res.send(
  //   `This response would create a new team called ${name}, using a POST request.`
  // );
  // res.send(req.query.username);
  auth(req, res);
};

const url = "https://api.ecoledirecte.com";

async function auth(req, res) {
  await login(req.query, res).then((authenticated) =>
    authenticated ? res.json(`Succeed to connect`) : res.json(`Fail to connect`)
  );
}

async function login(user, res) {
  let data = `data={ "identifiant": "${user.username}", "motdepasse": "${user.password}" }`;
  let authSpinner = await ora("Trying to connect").start();
  let response = await fetch(`${url}/v3/login.awp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/edn",
    },
    body: data,
  });

  let result = await response.json();
  let interval = 1;
  result.code === 200
    ? (authSpinner.succeed(
        `Successfully authenticated, eleveId: ${
          result.data.accounts[0].id
        }, token: ${result.token.slice(0, 10)}... `
      ),
      fetchTimer(interval, result.token, result.data.accounts[0].id))
    : authSpinner.fail(`Failed to authenticate, error code: ${result.code}`);
  return result.code === 200;
}

async function fetchTimer(minutes, token, eleveId) {
  let num = 0;
  let items = [];
  // let interval = 1 * 60 * 1000;
  let interval = minutes * 20 * 1000;
  setInterval(() => {
    num++;
    fetchData(token, eleveId, items, num);
  }, interval);
}

const fetchData = (token, eleveId, items, num) => {
  getAgenda(token, eleveId, items, num);
  // getNotes(token, eleveId, items);
};

// async function getNotes(token, eleveId) {}

async function getAgenda(token, eleveId, items, num) {
  let data = `data={ "token": "${token}" }`;
  // let fetchingSpinner = await ora("Fetching agenda").start();
  // fetchingSpinner.color = "green";
  let response = await fetch(
    `${url}/v3/Eleves/${eleveId}/cahierdetexte.awp?verbe=get&`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/edn",
      },
      body: data,
    }
  );
  let result = await response.json();
  result.code === 200
    ? // fetchingSpinner.succeed(`Success`),
      await items.push(Object.keys(result.data).length)
    : //  fetchingSpinner.fail(`Failed`)
      null;
  items.length !== 0
    ? items[items.length - 1] !== Object.keys(result.data).length
      ? sendExpoNotification("You have a new work !")
      : sendExpoNotification("You don't have any new work...")
    : null;
  items.shift();
}

async function sendExpoNotification(body) {
  const message = {
    to: "ExponentPushToken[QgIEbWKYkGW_aMuVKv6EhS]",
    sound: "default",
    title: `⚡️EDL-Listener`,
    body: body,
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
  let result = response.json();
  console.log(result);
}

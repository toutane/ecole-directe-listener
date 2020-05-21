const express = require("express");
const fetch = require("node-fetch");
const ora = require("ora");

const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
  res.send("⚡️Ecole Directe Real Time Notifications Server");
});

app.listen(PORT, () => {
  // console.log(`Server running at: http://localhost:${PORT}/`);
});

const url = "https://api.ecoledirecte.com";

app.get("/login/:username/:password/:interval", (req, res) => {
  auth(req, res);
});

async function auth(req, res) {
  await login(req.params).then((authenticated) =>
    authenticated ? res.send(`Succeed to connect`) : res.send(`Fail to connect`)
  );
}

async function login(req) {
  let data = `data={ "identifiant": "${req.username}", "motdepasse": "${req.password}" }`;

  let authSpinner = await ora("Trying to connect").start();
  let response = await fetch(`${url}/v3/login.awp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/edn",
    },
    body: data,
  });

  let result = await response.json();

  result.code === 200
    ? (authSpinner.succeed(
        `Successfully authenticated, eleveId: ${
          result.data.accounts[0].id
        }, token: ${result.token.slice(0, 10)}... `
      ),
      fetchTimer(req.interval, result.token, result.data.accounts[0].id))
    : authSpinner.fail(`Failed to authenticate, error code: ${result.code}`);
  return result.code === 200;
}

async function fetchTimer(minutes, token, eleveId) {
  let num = 0;
  let items = [];
  // let interval = 1 * 60 * 1000;
  let interval = minutes * 1000;
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

  let fetchingSpinner = await ora("Fetching agenda").start();
  fetchingSpinner.color = "green";
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
    ? (fetchingSpinner.succeed(`Success`),
      await items.push(Object.keys(result.data).length))
    : fetchingSpinner.fail(`Failed`);
  items.length !== 0
    ? items[items.length - 1] !== Object.keys(result.data).length
      ? console.log(
          `New item ( ${items.length} item(s), fetch number: ${num} )`
        )
      : console.log(
          `No new item ( ${items.length} item(s), fetch number: ${num} )`
        )
    : null;
  items.shift();
}

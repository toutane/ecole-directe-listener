const express = require("express");
const prompts = require("prompts");
const fetch = require("node-fetch");

const app = express();

const PORT = 8080;

app.get("/", (req, res) => {
  res.send("⚡️Ecole Directe Real Time Notifications Server");
});

app.listen(PORT, () => {
  // console.log(`Server running at: http://localhost:${PORT}/`);
});

const url = "https://api.ecoledirecte.com";

const auth_prompts = [
  {
    type: "text",
    name: "username",
    message: "Username:",
  },
  {
    type: "password",
    name: "password",
    message: "Password:",
  },
];

app.get("/login", (req, res) => {
  auth(res);
});

async function auth(res) {
  const response = await prompts(auth_prompts);
  await login(response).then((result) =>
    result[0]
      ? (res.send(`Token: ${JSON.stringify(result[1])}`),
        console.log(
          `Successfully authenticated ! Token: ${result[1].slice(0, 10)}...`
        ),
        fetchTimer(result[1], result[2]))
      : (res.send("Sorry, error when try to log..."),
        console.error("Error when try to log..."))
  );
}

async function login(user) {
  let data = `data={ "identifiant": "${user.username}", "motdepasse": "${user.password}" }`;
  let response = await fetch(`${url}/v3/login.awp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/edn",
    },
    body: data,
  });
  let result = await response.json();
  let token = result.token;
  let eleveId = result.data.accounts[0].id;
  let authenticated = token !== "";
  return authenticated && [authenticated, token, eleveId];
}

const fetchTime_prompts = [
  {
    type: "number",
    name: "minutes",
    message: "Fetch every how many minutes:",
    // validate: (value) => (value < 5 ? `Are you crazy mate ?!` : true),
  },
  {
    type: "confirm",
    name: "proccess",
    message: "Do you want to proccess?",
    initial: true,
  },
];
// Do fetch at every interval:
async function fetchTimer(token, eleveId) {
  const response = await prompts(fetchTime_prompts);
  let interval = response.minutes * 60 * 1000;
  setInterval(function () {
    fetchData(token, eleveId);
  }, interval);
}

const fetchData = (token, eleveId) => {
  getNotes(token, eleveId);
};

async function getNotes(token, eleveId) {
  console.log(
    `Trying to get notes of eleve: ${eleveId} with token: ${token.slice(
      0,
      10
    )}...`
  );
}

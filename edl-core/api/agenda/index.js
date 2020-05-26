const mongoose = require("mongoose");
const fetch = require("node-fetch");

const keys = require("../../.config/keys");
const Listens = require("../../model/listen-model");

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log("connected to mongodb");
});

module.exports = (req, res) => {
  getListen(req.query, res);
  // fetchAgenda(JSON.parse(req.query.params), "ddd", res);
};

async function getListen(query, res) {
  let params = JSON.parse(query.params);
  Listens.find({ shortId: params.shortId }).then((data) => {
    // fetchAgenda(params, data[0].tokenEd, res);
    login(params, data[0].username, data[0].password, res);
  });
  // let result = await response.json();
  // res.send(result.cronId);
  // sendNotification(params, params.eleveId, res);
  // sendNotification(params, result.cronId, res);
  // fetchAgenda(params, params.shortId, res);
}

async function login(params, username, password, res) {
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
  fetchAgenda(params, result.token, res);
}
async function fetchAgenda(query, tokenEd, res) {
  let url = "https://api.ecoledirecte.com";
  let data = `data= { "token": "${tokenEd}" }`;
  // let data = `data={ "token": "5a334a35576b74754e7a4a3554554530533256794d6b4a305531426e5744644b623364774b7a4247557a4a505a544e70565464494b325253574752554e46677a63554a514b32684d4e6a4645533278700d0a644856584e6e706e5157704f56454e794e556731554442436348414e436a4d784d6d7855616a566b5a4531595558525861485661526c705a576d6c74566b7849576e5a76566b35786557646a5a445a590d0a4d546c73596d4a565a5746536156686a59576c475a54565352324e365557526c64566857556c467851335a51555449724e6e5a43656a4a32445170784b326c334c306461656c525157433831517a5a560d0a5445785a6432784554325a4a5354423156486c5452555246656c5272626a646f61566879536e526a4e57524e556b6479556b6876534778434e55787862464d32516c5177544577784e55644a4e6d64500d0a5247354d6477304b56486c524f58527255453573597a6434556d4e3163317031547a4a56574738786456633253334e6e643156354c325a50656d74705454424a52484252526b784562584e44523355330d0a4f445131646a424552557878566c46564c7a453461697469566c704d526b7830576e414e436b4a6b4c33637a596b644e5a46524c64334e6c5448566b656a46594b31687252456878534456544c326c4d0d0a525441355a305a6e4e3274615130644b556d5a4b566e5a48656c6842626a4e6152454e52614774494d7a6844553056474e30357a5455784e516e5a434f47316144516f7a5247524e5958645a5a4642570d0a55327778546b6449614859794e793978616e4d76636b5256626e4646596e704b5a6c6c3254465a6c6432357959324e486447466e52336c545333465853324a4e5a456432566b4e725a475a47513039470d0a53306449545551304b7a64456267304b55324a4e51565a6a566a4e6c57475654596d56475957354c636e6c31626a6b7a5344524a62693935516c5a58616c6f3365566c34625855325a57744464304a550d0a5a586732516b39494e6a4e78516e6f356245645a4e55526f6433564b4e57314a646d354b4e5568495158454e436d6c304c316c495230783453487059567a4a54636e566d5a47527764464579595552790d0a626d5a5755337075524442536145314a566d737259575a544d6c525861335677633256725256647764555a7a6245307653304e5656574e705745353254697453566d39585157303044517074524568310d0a6545564d4d6c6b305356453257556468556b4e565131425662304e58576b464b54314e6e5656704f4d6d704453305a76654455305a55704d4d336c7351337075626a4a744d454a4c4f454e516130686d0d0a596d5a794e586835654670565630464451544e6c5367304b635568474d7a567653316c6c63476c31576c4253636a466b56474577535856774e6a4a31516d3968526d74694d79394565546c6f553252320d0a655578696346707656334e52616a6851646b39434d6d4e354c79745752476c6e4d326376656c704655304a75644556556557494e436e677a546b5533565546546232524461306f355955457a575568760d0a5655684d536e5243516b78495131527865555a33616e6f314e45787656304a61516a52614d3264314e6d513361474a576558643361565572596b5a785747314a5a546c795248646862454a6c4d5452740d0a4451705a656d4a3559576434566d4e46625841726230644e4f56644d5132746e537a5a706348704451323152555546455a486c5a556b457862566c4f65554a68656d35575a32646e636e70774f44567a0d0a5a303144536a4e5a62326461526d777a5548646a4e445232616e4a585377304b623046315377" }`;

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
  sendNotification(
    query,
    result.code === 200 ? JSON.stringify(result.data) : result.message,
    res
  );
  // res.send(result);
  // result.code === 200 && (await items.push(Object.keys(result.data).length));
  // items.length !== 0 && sendNotification(query, items.length, res);
  // items[items.length - 1] !== Object.keys(result.data).length, items.shift();
}

async function sendNotification(query, value, res) {
  let url = `https://edl-core.toutane.now.sh`;
  // let url = `http://192.168.86.183:3000`;
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

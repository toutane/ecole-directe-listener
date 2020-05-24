const fetch = require("node-fetch");

module.exports = (req, res) => {
  sendClientNotification(req.query, res);
};

async function sendClientNotification(query, res) {
  const message = {
    to: "ExponentPushToken[QgIEbWKYkGW_aMuVKv6EhS]",
    sound: "default",
    title: `⚡️EDL-Listener`,
    body: `Send notif to: ${query.eleveId}`,
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
  res.send(response);
}

const fetch = require("node-fetch");

module.exports = (req, res) => {
  addCronJob(req.query, res);
};

// startListening = (query, response) => {
//   console.log(`Starting to listen eleve: ${query.eleveId}`);
//   response.send({ status: "good" });
// };

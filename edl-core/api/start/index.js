module.exports = (req, res) => {
  startListening(req.query).then(() => res.send({ status: "good" }));
};

startListening = (query) => {
  return console.log(`Starting to listen eleve: ${query.eleveId}`);
};

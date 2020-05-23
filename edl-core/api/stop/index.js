module.exports = (req, res) => {
  stopListening(req.query).then(() => res.send({ status: "good" }));
};

stopListening = (query) => {
  return console.log(`Stoping to listen eleve: ${query.eleveId}`);
};

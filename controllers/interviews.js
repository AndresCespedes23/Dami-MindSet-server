const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/interviews.json'));

const create = (req,res) => {
  let id = null;
  do {
      id = `${Math.round(Math.random()*10000)}`;
  } while (data.find(interview => interview.id === id));
  const interview = {
      id: id,
      idCandidate: req.query.idCandidate,
      idClient: req.query.idClient,
      idPosition: req.query.idPosition,
      date: req.query.date,
      time: req.query.time,
      status: req.query.status
  }
  data.push(interview);
  return res.status(201).send(`Interview succesfully created! ${JSON.stringify(interview)}`);
}

const update = (req,res) => {
  const index = data.findIndex(interview => req.params.id === interview.id);
  if(index === -1){
      return res.status(400).json({"Msg": "Could not find interview with specified ID"});
  }
  for(property in req.query){
      data[index][property] = req.query[property];
  }
  return res.status(201).send(`Interview succesfully updated! ${JSON.stringify(data[index])}`);
}

const remove = (req, res) => {
  const index = data.findIndex(interview => req.params.id === interview.id);
  if(index === -1){
      return res.status(400).json({"Msg" :"Could not find interview with specified ID"});
  }
  const cancelledInterview = data.splice(index,1);
  return res.status(200).send(`Interview cancelled! ${JSON.stringify(cancelledInterview)}`);
}

const getAll = (req, res) => {
  return res.status(200).json(data);
}

const getById = (req, res) => {
  const index = data.findIndex(interview => req.params.id === interview.id);
  if(index === -1) {
      return res.status(400).json({"Msg" : "Could not find interview with specified ID"});
  }
  return res.status(200).json(data[index]);
}

module.exports = {
  create: create,
  update: update,
  remove: remove,
  getAll: getAll,
  getById: getById
}
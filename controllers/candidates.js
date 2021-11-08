const fs = require('fs');
let candidates = JSON.parse(fs.readFileSync('./data/candidates.json'));

// MS-03: create candidates

const create = (req, res) => {
  const newCandidate = {
    id: (profiles.length + 1).toString(),
    name: req.query.name,
    email: req.query.email,
    gender: req.query.gender,
    address: req.query.address,
    phoneNumber: req.query.phoneNumber,
    dni: req.query.dni,
    dateOfBirth: req.query.dateOfBirth,
    zipCode: req.query.zipCode,
    city: req.query.city,
    state: req.query.state,
    country: req.query.country,
    timeRange: req.query.timeRange,
    status: req.query.status,
    username: req.query.username,
    password: req.query.password
}
  candidates.push(newCandidate);
  res.json(candidates);
};

// MS-05: remove candidates

const remove = (req, res) => {
  const candidate = candidates.find(candidate => candidate.id === req.params.id);
  if (candidate) {
    const candidatesFilter = candidates.filter(candidate => candidate.id !== req.params.id);
    candidates = candidatesFilter;
    res.json(candidates);
  } else {
    res.send('User not removed');
  }
};

// MS-06: list candidates

const getAll = (req, res) => res.json(candidates);

const getById = (req, res) => {
  const candidate = candidates.find(candidate => candidate.id === req.params.id);
  if (candidate) {
    res.json(candidate);
  } else {
    res.send('User not found');
  }
};

const getByName = (req, res) => {
  const candidate = candidates.find(candidate => candidate.name === req.params.name);
  if (candidate) {
    res.json(candidate);
  } else {
    res.send('User not found');
  }
};

module.exports = {
  create: create,
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  remove: remove
}
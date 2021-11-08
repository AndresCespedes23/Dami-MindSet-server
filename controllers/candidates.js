const fs = require('fs');
let candidates = JSON.parse(fs.readFileSync('./data/candidates.json'));

// MS-03: create candidates

const create = (req, res) => {
    const newCandidate = {
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

// MS-04: update candidates

const update = (req, res) => {
  const candidate = candidates.find(candidate => candidate.id === req.params.id);
  const index = candidates.findIndex(candidate => candidate.id === req.params.id);
  if (candidate) {
      candidate.name = req.query.name ? req.query.name : candidate.name,
      candidate.email = req.query.email ? req.query.email : candidate.email,
      candidate.gender = req.query.gender ? req.query.gender : candidate.gender,
      candidate.address = req.query.address ? req.query.address : candidate.address,
      candidate.phoneNumber = req.query.phoneNumber ? req.query.phoneNumber : candidate.phoneNumber,
      candidate.dni = req.query.dni ? req.query.dni : candidate.dni,
      candidate.dateOfBirth  = req.query.dateOfBirth ? req.query.dateOfBirth : candidate.dateOfBirth,
      candidate.city = req.query.city ? req.query.city : candidate.city,
      candidate.state = req.query.state ? req.query.state : candidate.state,
      candidate.country = req.query.country ? req.query.country : candidate.country,
      candidate.timeRange = req.query.timeRange ? req.query.timeRange : candidate.timeRange,
      candidate.status = req.query.status ? req.query.status : candidate.status,
      candidate.username = req.query.username ? req.query.username : candidate.username,
      candidate.password = req.query.password ? req.query.password : candidate.password
    candidates[index] = candidate;
    res.json(candidate);
  } else {
    res.send('User not updated');
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
    update: update,
    getAll: getAll,
    getById: getById,
    getByName: getByName
}
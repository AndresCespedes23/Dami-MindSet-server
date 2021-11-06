const fs = require('fs');
const candidates = JSON.parse(fs.readFileSync('./data/candidates.json'));

// MS-04: update candidates

const update = (req, res) => {
    const candidate = candidates.find(candidate => candidate.id === req.params.id);
    const index = candidates.indexOf(candidate);
    if (candidate) {
      req.query.id !== null ? candidates[index].id = req.query.id : candidates[index].id;
      req.query.name !== null ? candidates[index].name = req.query.name : candidates[index].name;
      req.query.email !== null ? candidates[index].email = req.query.email: candidates[index].email;
      // candidates[index] = {
      //     id: req.query.id,
      //     name: req.query.name,
      //     email: req.query.email,
      //     gender: req.query.gender,
      //     address: req.query.address,
      //     phoneNumber: req.query.phoneNumber,
      //     dni: req.query.dni,
      //     dateOfBirth: req.query.dateOfBirth,
      //     zipCode: req.query.zipCode,
      //     city: req.query.city,
      //     state: req.query.state,
      //     country: req.query.country,
      //     timeRange: req.query.timeRange,
      //     status: req.query.status,
      //     profiles: req.query.profiles,
      //     username: req.query.username,
      //     password: req.query.password
      // }
      res.json(candidates);
    } else {
      res.send('User not updated');
    }
  };

  module.exports = {
    update: update
  }
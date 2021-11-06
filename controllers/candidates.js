const fs = require('fs');
const candidates = JSON.parse(fs.readFileSync('./data/candidates.json'));

// MS-03: create candidates

const create = (req, res) => {
    const newCandidate = {
        id: req.query.id,
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
        profiles: req.query.profiles,
        username: req.query.username,
        password: req.query.password
    }
    candidates.push(newCandidate);
    res.json(candidates);
};

module.exports = {
    create: create
}
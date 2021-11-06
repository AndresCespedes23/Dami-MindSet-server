//MS-15 - PROFILES - Create Profile
const fs = require('fs');
const profiles = JSON.parse(fs.readFileSync('./data/profiles.json'));
// Get Profiles
const getAll = (req, res) => {
    res.json(profiles);
};
// Create Profile
const create = (req, res) => {
    const newProfile = {
        id: req.query.id,
        name: req.query.name,
        description: req.query.description
    }
    profiles.push(newProfile);
    res.json(profiles);
};
module.exports = {
    getAll: getAll,
    create: create,
  };
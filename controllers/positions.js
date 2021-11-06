const fs = require('fs');
const positions = JSON.parse(fs.readFileSync('./data/positions.json'));

const getAll = (req, res) => {
    res.json(positions);
};

const getById = (req, res) => {
    const filteredPosition = positions.find(element => element.id === req.params.id);
    if (!filteredPosition){
        res.send(400, {"Msg": "Position with that ID does not exist"});
    }
    res.json(filteredPosition);
};

const getByName = (req, res) => {
    const filteredPosition = positions.find(element => element.name === req.params.name);
    if (!filteredPosition){
        res.send(400, {"Msg":"Position with that NAME does not exist"});
    }
    res.json(filteredPosition);
};

const create = (req, res) => {
    //check if all the parameters were sent
    if (!req.query.id 
        || !req.query.idClient 
        || !req.query.idProfiles 
        || !req.query.name 
        || !req.query.description 
        || !req.query.status 
        || !req.query.address 
        || !req.query.city 
        || !req.query.postalCode){
        res.send(400, {"Msg": "Some parameters are missing"});
    }
    // change the type of idProfiles from string to array of strings
    const idProfilesArray = req.query.idProfiles.split(",");
    const newPosition = {
        id: req.query.id,
        idClient: req.query.idClient,
        idProfiles: idProfilesArray,
        name: req.query.name,
        description: req.query.description,
        status: req.query.status === 'true',
        address: req.query.address,
        city: req.query.city,
        postalCode: req.query.postalCode
    }
    positions.push(newPosition);
    res.send(200, {positions});
};

const update = (req, res) => {
    // your code here
};

const remove = (req, res) => {
    // your code here
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  create: create,
  update: update,
  remove: remove
};
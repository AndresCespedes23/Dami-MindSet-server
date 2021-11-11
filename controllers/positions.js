const fs = require('fs');
const positions = JSON.parse(fs.readFileSync('./data/positions.json'));

const getAll = (req, res) => {
  res.json(positions);
};

const getById = (req, res) => {
  const filteredPosition = positions.find(element => element.id === req.params.id);
  if (!filteredPosition){
    return res.send(400, {"Msg": "Position with that ID does not exist"});
  }
  res.json(filteredPosition);
};

const getByName = (req, res) => {
  const filteredPosition = positions.find(element => element.name === req.params.name);
  if (!filteredPosition){
    return res.send(400, {"Msg":"Position with that NAME does not exist"});
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
    return res.send(400, {"Msg": "Some parameters are missing"});
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
  const filteredPosition = positions.find(element => element.id === req.params.id);
  const indexPosition = positions.findIndex(element => element.id === req.params.id);
  if (!filteredPosition){
    return res.send(400, {"Msg": "Position with that ID does not exist"});
  }
  const updatedPosition = req.query;
  filteredPosition.idClient = updatedPosition.idClient ? updatedPosition.idClient : filteredPosition.idClient;
  filteredPosition.idProfiles = updatedPosition.idProfiles? updatedPosition.idProfiles.split(","): filteredPosition.idProfiles;
  filteredPosition.name = updatedPosition.name ? updatedPosition.name : filteredPosition.name;
  filteredPosition.description = updatedPosition.description ? updatedPosition.description : filteredPosition.description;
  filteredPosition.status = updatedPosition.status ? updatedPosition.status === 'true' : filteredPosition.status;
  filteredPosition.address = updatedPosition.address ? updatedPosition.address : filteredPosition.address;
  filteredPosition.city = updatedPosition.city ? updatedPosition.city : filteredPosition.city;
  filteredPosition.postalCode = updatedPosition.postalCode ? updatedPosition.postalCode : filteredPosition.postalCode;
  // update changes in position
  positions[indexPosition] = filteredPosition;
  res.send(200, {filteredPosition});
};

const remove = (req, res) => {
  const indexPosition = positions.findIndex(element => element.id === req.params.id);
  if (indexPosition === -1){
    return res.send(400, {"Msg": "Position with that ID does not exist"});
  }
  const removedPosition = positions.splice(indexPosition, 1);
  res.send(200, {removedPosition, positions});
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  create: create,
  update: update,
  remove: remove
};
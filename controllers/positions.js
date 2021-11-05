// const Clients = require ('clients.js');
// const Profiles = require ('profiles.js');
const positions = require('../data/positions.json');
// const clients = require('../data/clients.json');
// const profiles = require('../data/profiles.json')


// MS26-POSITIONS - List Positions
const getAll = (req, res) => {
    res.json(positions);
};

const getById = (req, res) => {
    let  filteredPosition = positions.list.find(element => element.id === parseInt(req.params.id));
    
    if (!filteredPosition){
        res.send(400,{"Msg": "Position with that ID does not exist"});
    }
    res.json(filteredPosition);
};

const getByName = (req, res) => {
    let  filteredPosition = positions.list.find(element => element.name == req.params.name);
    
    if (!filteredPosition){
        res.send(400,{"Msg":"Position with that NAME does not exist"})
    }
    res.json(filteredPosition);
};

const add = (req, res) => {
    // your code here
};

const edit = (req, res) => {
    // your code here
};

const remove = (req, res) => {
    // your code here
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  add: add,
  edit: edit,
  remove: remove
};
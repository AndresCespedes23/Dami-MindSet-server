const fs = require('fs');
const positions = JSON.parse(fs.readFileSync('./data/positions.json'));


// MS26-POSITIONS - List Positions

const getAll = (req, res) => {
    res.json(positions);
};

const getById = (req, res) => {
    let filteredPosition = positions.find(element => element.id === req.params.id);
    if (!filteredPosition){
        res.send(400, {"Msg": "Position with that ID does not exist"});
    }
    res.json(filteredPosition);
};

const getByName = (req, res) => {
    let filteredPosition = positions.find(element => element.name === req.params.name);
    if (!filteredPosition){
        res.send(400, {"Msg":"Position with that NAME does not exist"});
    }
    res.json(filteredPosition);
};

const create = (req, res) => {
    // your code here
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
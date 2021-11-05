const positions = require('../data/positions.json');
const clients = require('../data/clients.json');
const profiles = require('../data/profiles.json')



// MS26-POSITIONS - List Positions
let  filteredPosition;

const getAll = (req, res) => {
    for (let i=0; i<positions.list.length;i++){
        let obj = positions.list[i]
        positions.list[i]=addNames(obj)
    }
    res.json(positions);
};

const getById = (req, res) => {
    filteredPosition = positions.list.find(element => element.id == req.params.id);
    if (!filteredPosition){
        res.send(400,{"Msg": "Position with that ID does not exist"});
    }
    let resultQuery = addNames(filteredPosition);
    res.json(resultQuery);
};

const getByName = (req, res) => {
    filteredPosition = positions.list.find(element => element.name == req.params.name);
    
    if (!filteredPosition){
        res.send(400,{"Msg":"Position with that NAME does not exist"})
    }
    let resultQuery = addNames(filteredPosition);
    res.json(resultQuery);
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




function addNames(obj){
    // add nameClient 
    let clientName = clients.list.find(client => client.id == obj.idClient).name;    
    obj.nameClient = clientName;
    // add nameProfiles 
    let profilesNames = [];
    for (let i=0; i< obj.idProfiles.length ; i++){
        profilesNames[i] = profiles.list.find(profile => profile.id == obj.idProfiles[i]).name;
    }
    obj.nameProfiles = profilesNames;

    return obj;
}







module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  add: add,
  edit: edit,
  remove: remove
};
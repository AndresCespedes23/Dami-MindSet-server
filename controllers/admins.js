const fs = require('fs');
const admins = JSON.parse(fs.readFileSync('./data/admins.json'));

const getAll = (req, res) => {
  res.json(admins);
};

const getById = (req, res) => {
  const admin = admins.find(admin => admin.id === req.params.id);
  if (admin) {
    res.json(admin);
  } else {
    res.send('User not found');
  }
};

const getByName = (req, res) => {
  const admin = admins.find(admin => admin.name === req.params.name);
  if (admin) {
    res.json(admin);
  } else {
    res.send('User not found');
  }
};

const update = (req, res) => {
  // update function
}

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  update: update
};
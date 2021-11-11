const fs = require('fs');
const admins = JSON.parse(fs.readFileSync('./data/admins.json'));

const getAll = (req, res) => {
  return res.status(200).json(admins)
  };

  const getById = (req, res) => {
    const admin = admins.find(admin => admin.id === req.params.id);
    if (admin) return res.status(200).json(admin);
    return res.status(404).send("Admin not found");
    }

const getByName = (req, res) => {
  const admin = admins.find(admin => admin.name === req.params.name);

  if (admin) {
    res.json(admin);
  } else {
    res.status(400).send('Admin not found');
  }
};

const update = (req, res) => {
  const found = admins.some(admin => admin.id === req.params.id);

  if (found) {
    const updateAdmin = req.query;
    admins.forEach(admin => {
      if (admin.id === req.params.id) {
        admin.name = updateAdmin.name ? updateAdmin.name : admin.name;
        admin.email = updateAdmin.email ? updateAdmin.email : admin.email;
        admin.username = updateAdmin.username ? updateAdmin.username : admin.username;
        admin.password = updateAdmin.password ? updateAdmin.password : admin.password;

        res.json(admin);
      }
    });
  } else {
    res.status(400).send('Admin not found');
  }
};

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  update: update
};
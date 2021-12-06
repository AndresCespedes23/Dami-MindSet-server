const dotenv = require("dotenv");
const Admins = require("../models/admins");
const admins = require("../../data/admins");
const Clients = require("../models/clients");
const clients = require("../../data/clients");
const connectDB = require("./configDB");

dotenv.config();
connectDB();

const importProducts = async () => {
  try {
    await Admins.deleteMany();

    await Clients.deleteMany();

    await Admins.insertMany(admins);

    await Clients.insertMany(clients);

    console.log("Data Imported");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const deleteProducts = async () => {
  try {
    await Admins.deleteMany();
    await Clients.deleteMany();

    console.log("Data destroyed");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
switch (process.argv[2]) {
  case "-d": {
    deleteProducts();
    break;
  }
  default: {
    importProducts();
  }
}

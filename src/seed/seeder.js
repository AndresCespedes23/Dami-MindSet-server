const dotenv = require("dotenv");
const Admins = require("../models/admins");
const admins = require("../../data/admins");
const Clients = require("../models/clients");
const clients = require("../../data/clients");
const Candidates = require("../models/candidates");
const candidates = require("../../data/candidates");
const Psychologists = require("../models/psychologists");
const psychologists = require("../../data/psychologists");
const Profiles = require("../models/profiles");
const profiles = require("../../data/profiles");
const Sessions = require("../models/sessions");
const sessions = require("../../data/sessions");
const Positions = require("../models/positions");
const positions = require("../../data/positions");
const Interviews = require("../models/interviews");
const interviews = require("../../data/interviews");
const Applications = require("../models/applications");
const applications = require("../../data/applications");

const connectDB = require("./configDB");

dotenv.config();
connectDB();

const importProducts = async () => {
  try {
    await Admins.deleteMany();

    await Clients.deleteMany();

    await Profiles.deleteMany();

    await Psychologists.deleteMany();

    await Candidates.deleteMany();

    await Sessions.deleteMany();

    await Positions.deleteMany();

    await Interviews.deleteMany();

    await Applications.deleteMany();

    await Admins.insertMany(admins);

    await Clients.insertMany(clients);

    await Profiles.insertMany(profiles);

    await Psychologists.insertMany(psychologists);

    await Candidates.insertMany(candidates);

    await Sessions.insertMany(sessions);

    await Positions.insertMany(positions);

    await Interviews.insertMany(interviews);

    await Applications.insertMany(applications);

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
    await Profiles.deleteMany();
    await Psychologists.deleteMany();
    await Candidates.deleteMany();
    await Sessions.deleteMany();
    await Positions.deleteMany();
    await Interviews.deleteMany();
    await Applications.deleteMany();

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

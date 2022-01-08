const Admins = require("../models/admins");
const Applications = require("../models/applications");
const Candidates = require("../models/candidates");
const Clients = require("../models/clients");
const Interviews = require("../models/interviews");
const Positions = require("../models/positions");
const Profiles = require("../models/profiles");
const Psychologists = require("../models/psychologists");
const Sessions = require("../models/sessions");

const getQuantity = async (req, res) => {
  try {
    const [
      admins,
      applications,
      candidates,
      clients,
      interviews,
      positions,
      profiles,
      psychologists,
      sessions,
    ] = await Promise.all([
      Admins.count({ isDeleted: false }),
      Applications.count({ isDeleted: false }),
      Candidates.count({ isDeleted: false }),
      Clients.count({ isDeleted: false }),
      Interviews.count({ isDeleted: false }),
      Positions.count({ isDeleted: false }),
      Profiles.count({ isDeleted: false }),
      Psychologists.count({ isDeleted: false }),
      Sessions.count({ isDeleted: false }),
    ]);
    res.json({
      data: {
        admins,
        applications,
        candidates,
        clients,
        interviews,
        positions,
        profiles,
        psychologists,
        sessions,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: `Error: ${error}` });
  }
};

module.exports = {
  getQuantity,
};

const fs = require('fs');
const profiles = JSON.parse(fs.readFileSync('./data/profiles.json'));

// Get Profiles
const getAll = (req, res) => {
    res.json(profiles);
};

// Create Profile
const create = (req, res) => {
    const newProfile = {
        id: (profiles.length + 1).toString(),
        name: req.query.name,
        description: req.query.description
    };
    profiles.push(newProfile);
    res.json(profiles);
};

// Update Profile
const update = (req, res) => {
    const profile = profiles.find(profile => profile.id === req.params.id);
    const selectedProfile = profiles.findIndex(profile => profile.id === req.params.id);
    if (profile) {
        const updateProfile = req.query;
        profile.name = updateProfile.name ? updateProfile.name : profile.name;
        profile.description = updateProfile.description ? updateProfile.description : profile.description;
        profiles[selectedProfile] = profile;
        res.json({msg: 'Profile updated', profile});
    } else {
        res.status(400).json({msg: `No profile with the id: ${req.params.id}`});
    }
};

// Remove Profile
const remove = (req, res) => {
    const profile = profiles.find(profile => profile.id === req.params.id);
    const selectedProfile = profiles.findIndex(profile => profile.id === req.params.id);
    if (profile) {
      profiles.splice(selectedProfile, 1);
      res.json(profiles);
    } else {
      res.send('Error: user not removed or not found');
    }
};

// Module Exports 
module.exports = {
    getAll: getAll,
    create: create,
    update: update,
    remove: remove
};
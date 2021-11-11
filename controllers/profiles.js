const fs = require('fs');
const profiles = JSON.parse(fs.readFileSync('./data/profiles.json'));

// Get Profiles
const getAll = (req, res) => {
	res.json(profiles);
};

// Create Profile
const create = (req, res) => {
	if (!req.query.id	|| !req.query.name || !req.query.description) {
		return res.status(400).send("Some parameters are missing")
	}
	const newProfile = {
		id: (profiles.length + 1).toString(),
		name: req.query.name,
		description: req.query.description
	};
	return res.status(201).json(newProfile)
};

// Update Profile
const update = (req, res) => {
	const profile = profiles.find(profile => profile.id === req.params.id);
	const selectedProfile = profiles.findIndex(profile => profile.id === req.params.id);
	if (profile) {
		const updateProfile = req.query;
		profile.name = updateProfile.name || profile.name;
		profile.description = updateProfile.description || profile.description;
		profiles[selectedProfile] = profile;
		return res.status(200).json(selectedProfile);
	}
	return res.status(404).send("Error: profile does not exist");
};

// Remove Profile
const remove = (req, res) => {
	const profile = profiles.find(profile => profile.id === req.params.id);
	const selectedProfile = profiles.findIndex(profile => profile.id === req.params.id);
	if (profile) {
		profiles.splice(selectedProfile, 1);
		return res.status(200).send("Profile removed");
	}
	return res.status(404).send("Error: profile does not exist, nothing removed");
};

// Module Exports
module.exports = {
	getAll: getAll,
	create: create,
	update: update,
	remove: remove
};
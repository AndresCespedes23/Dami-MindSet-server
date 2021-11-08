const fs = require('fs');
let candidates = JSON.parse(fs.readFileSync('./data/candidates.json'));

// MS-03: create candidates
const create = (req, res) => {
    const index = candidates[candidates.length -1].id;
    const newIndex = parseInt(index) + 1;
    const newCandidate = {
        id: newIndex.toString(),
        name: req.query.name,
        email: req.query.email,
        gender: req.query.gender,
        address: req.query.address,
        phoneNumber: req.query.phoneNumber,
        dni: req.query.dni,
        dateOfBirth: req.query.dateOfBirth,
        zipCode: req.query.zipCode,
        city: req.query.city,
        state: req.query.state,
        country: req.query.country,
        timeRange: req.query.timeRange,
        status: req.query.status,
        username: req.query.username,
        password: req.query.password,
        institution: req.query.institution,
        startDate: req.query.startDate,
        finishDate: req.query.finishDate,
        level: req.query.level,
        inProgress: req.query.inProgress,
        title: req.query.title,
        company: req.query.company,
        role: req.query.role,
        workStartDate: req.query.workStartDate,
        workFinishDate: req.query.workFinishDate,
        currently: req.query.currently,
        workDescription: req.query.workDescription,
        accomplishments: req.query.accomplishments,
        description: req.query.description,
        nationality: req.query.nationality,
        maritalStatus: req.query.maritalStatus,
        driversLicense: req.query.driversLicense,
    }
    candidates.push(newCandidate);
    res.json(candidates);
};

// MS-04: update candidates
const update = (req, res) => {
    const candidate = candidates.find(candidate => candidate.id === req.params.id);
    const index = candidates.findIndex(candidate => candidate.id === req.params.id);
    if (candidate) {
        candidate.name = req.query.name ? req.query.name : candidate.name,
        candidate.email = req.query.email ? req.query.email : candidate.email,
        candidate.gender = req.query.gender ? req.query.gender : candidate.gender,
        candidate.address = req.query.address ? req.query.address : candidate.address,
        candidate.phoneNumber = req.query.phoneNumber ? req.query.phoneNumber : candidate.phoneNumber,
        candidate.dni = req.query.dni ? req.query.dni : candidate.dni,
        candidate.dateOfBirth  = req.query.dateOfBirth ? req.query.dateOfBirth : candidate.dateOfBirth,
        candidate.city = req.query.city ? req.query.city : candidate.city,
        candidate.state = req.query.state ? req.query.state : candidate.state,
        candidate.country = req.query.country ? req.query.country : candidate.country,
        candidate.timeRange = req.query.timeRange ? req.query.timeRange : candidate.timeRange,
        candidate.status = req.query.status ? req.query.status : candidate.status,
        candidate.username = req.query.username ? req.query.username : candidate.username,
        candidate.password = req.query.password ? req.query.password : candidate.password,
        candidate.institution = req.query.institution ? req.query.institution : candidate.institution,
        candidate.startDate = req.query.startDate ? req.query.startDate : candidate.startDate,
        candidate.finishDate = req.query.finishDate ? req.query.finishDate : candidate.finishDate,
        candidate.level = req.query.level ? req.query.level : candidate.level,
        candidate.inProgress = req.query.inProgress ? req.query.inProgress : candidate.inProgress,
        candidate.title = req.query.title ? req.query.title : candidate.title,
        candidate.company = req.query.company ? req.query.company : candidate.company,
        candidate.role = req.query.role ? req.query.role : candidate.role,
        candidate.workStartDate = req.query.workStartDate ? req.query.workStartDate : candidate.workStartDate,
        candidate.workFinishDate = req.query.workFinishDate ? req.query.workFinishDate : candidate.workFinishDate,
        candidate.currently = req.query.currently ? req.query.currently : candidate.currently,
        candidate.workDescription = req.query.workDescription ? req.query.workDescription : candidate.workDescription,
        candidate.accomplishments = req.query.accomplishments ? req.query.accomplishments : candidate.accomplishments,
        candidate.description = req.query.description ? req.query.description : candidate.description,
        candidate.nationality = req.query.nationality ? req.query.nationality : candidate.nationality,
        candidate.maritalStatus = req.query.maritalStatus ? req.query.maritalStatus : candidate.maritalStatus,
        candidate.driversLicense = req.query.driversLicense ? req.query.driversLicense : candidate.driversLicense
        candidates[index] = candidate;
        res.json(candidate);
      }
    res.send('User not updated');
};

// MS-05: remove candidates
const remove = (req, res) => {
    const candidate = candidates.find(candidate => candidate.id === req.params.id);
    if (candidate) {
        const candidatesFilter = candidates.filter(candidate => candidate.id !== req.params.id);
        candidates = candidatesFilter;
        res.json(candidates);
    }
    res.send('User not removed');
};

// MS-06: list candidates
const getAll = (req, res) => res.json(candidates);
const getById = (req, res) => {
    const candidate = candidates.find(candidate => candidate.id === req.params.id);
    if (candidate) {
        res.json(candidate);
    }
    res.send('User not found');
};
const getByName = (req, res) => {
    const candidate = candidates.find(candidate => candidate.name === req.params.name);
    if (candidate) {
        res.json(candidate);
    }
    res.send('User not found');
};

module.exports = {
    create: create,
    update: update,
    remove: remove,
    getAll: getAll,
    getById: getById,
    getByName: getByName,
}
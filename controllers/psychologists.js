const fs = require('fs')
const psychologists = JSON.parse(fs.readFileSync('./data/psychologists.json'));

//MS 07 Create Psychologists

const create = (req, res) => {
    const newPsychologist = {
        id: (psychologists.length + 1).toString(),
        name: req.query.name,
        email: req.query.email,
        userName: req.query.userName,
        passWord: req.query.passWord,
        phoneNumber: req.query.phoneNumber,
        enrollmentNumber: req.query.enrollmentNumber,
        status: req.query.status,
        timeRange: req.query.timeRange,
        toTimeRange: req.query.toTimeRange,
        dayRange: req.query.dayRange,
    }
    psychologists.push(newPsychologist);
    res.json(psychologists);
};

// MS 10 Lists Psychologists

const getAll = (req, res) => {
    res.json(psychologists)
}


module.exports = {
    create: create,
    getAll: getAll,
}
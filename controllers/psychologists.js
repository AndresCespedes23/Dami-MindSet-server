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


// MS 09 Remove Psychologists

const remove = (req, res) => {
    const psychologist = psychologists.find(psychologist => psychologist.id === req.params.id);
    if(psychologist) {
        const psychFilter = psychologists.filter(psychologist => psychologist.id !== req.params.id);
        psychologists = psychFilter;
        res.json(psychologists);
    } else {
        res.send('Psychologists not removed');
    }
};


// MS 10 Lists Psychologists

const getAll = (req, res) => {
    res.json(psychologists)
}
const getById = (req, res) => {
    const psychologist = psychologists.find(psychologist => psychologist.id === req.params.id);

    if(psychologist) {
        res.json(psychologist);
    } else {
        res.status(400).send('Psychologist not Found');
    }
};
const getByName = (req, res) => {
    const psychologist = psychologists.find(psychologist => psychologist.name === req.param.name);

    if(psychologist) {
        res.json(psychologist);
    } else {
        res.status(400).send('Psychologist not found');
    }
};


module.exports = {
    create: create,
    getAll: getAll,
    getById: getById,
    getByName: getByName,
    remove: remove,
};

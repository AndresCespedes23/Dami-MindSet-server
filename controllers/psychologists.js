const fs = require('fs')
const psychologists = JSON.parse(fs.readFileSync('./data/psychologists.json'));

const create = (req, res) => {
  if (!req.query.id
    || !req.query.name
    || !req.query.email
    || !req.query.userName
    || !req.query.password
    || !req.query.phoneNumber
    || !req.query.enrollmentNumber
    || !req.query.status
    || !req.query.timeRange
    || !req.query.toTimeRange
    || !req.query.dayRange) {
      return res.status(400).json({ "Msg": "Some parameters are missing" });
  }
  const newPsychologist = {
    id: (psychologists.length + 1).toString(),
    name: req.query.name,
    email: req.query.email,
    userName: req.query.userName,
    password: req.query.password,
    phoneNumber: req.query.phoneNumber,
    enrollmentNumber: req.query.enrollmentNumber,
    status: req.query.status === 'true',
    timeRange: req.query.timeRange,
    toTimeRange: req.query.toTimeRange,
    dayRange: req.query.dayRange,
  }
  psychologists.push(newPsychologist);
  res.status(201).json(newPsychologist);
};

const update = (req, res) => {
  const psychologist = psychologists.find(psychologist => psychologist.id === req.params.id);
  const index = psychologists.findIndex(psychologist => psychologist.id === req.params.id);
  if (psychologist) {
    psychologist.name = req.query.name ? req.query.name : psychologist.name,
    psychologist.email = req.query.email ? req.query.email : psychologist.email,
    psychologist.userName = req.query.userName ? req.query.userName : psychologist.userName,
    psychologist.password = req.query.password ? req.query.password : psychologist.password,
    psychologist.phoneNumber = req.query.phoneNumber ? req.query.phoneNumber : psychologist.phoneNumber,
    psychologist.enrollmentNumber = req.query.enrollmentNumber ? req.query.enrollmentNumber : psychologist.enrollmentNumber,
    psychologists[index] = psychologist;
    return res.status(201).json(psychologists[index]);
  }
  res.status(404).json({ "Msg": "Psychologist with that ID does not exist" });
};

const remove = (req, res) => {
  const psychologist = psychologists.find(psychologist => psychologist.id === req.params.id);
  if (psychologist) {
    const psychFilter = psychologists.filter(psychologist => psychologist.id !== req.params.id);
    psychologists = psychFilter;
    return res.status(200).json(psychologist);
  }
  res.status(404).json({ "Msg": "Psychologist with that ID does not exist" });
};

const getAll = (req, res) => {
  res.status(200).json(psychologists);
}

const getById = (req, res) => {
  const psychologist = psychologists.find(psychologist => psychologist.id === req.params.id);
  if (psychologist) {
    return res.status(200).json(psychologist);
  }
  res.status(404).send({ "Msg": "Psychologist not Found" });
};

const getByName = (req, res) => {
  const psychologist = psychologists.find(psychologist => psychologist.name === req.param.name);
  if (psychologist) {
    return res.status(200).json(psychologist);
  }
  res.status(404).send({ "Msg": "Psychologist not Found" });
};

module.exports = {
  create,
  update,
  getAll,
  getById,
  getByName,
  remove
};
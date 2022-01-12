const moment = require("moment");
const Sessions = require("../models/sessions");
const Psychologists = require("../models/psychologists");

moment().format();

const getAll = (req, res) => {
  Sessions.find({ isDeleted: false })
    .populate("idPsychologist", "name")
    .populate("idCandidate", "name")
    .then((data) => res.json({ data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getById = (req, res) => {
  const { id } = req.params;
  Sessions.findOne({ $and: [{ _id: id }, { isDeleted: false }] })
    .populate("idPsychologist")
    .populate("idCandidate")
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Session not found by ID: ${id}` });
      return res.json({ data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const create = (req, res) => {
  const newSession = {
    idPsychologist: req.body.idPsychologist,
    idCandidate: req.body.idCandidate,
    date: req.body.date,
    time: req.body.time,
    status: req.body.status,
    result: req.body.result || [],
  };
  Sessions.create(newSession)
    .then((data) => res.json({ msg: "Session added", data }))
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const update = (req, res) => {
  const { id } = req.params;
  const updatedSession = {
    idPsychologist: req.body.idPsychologist,
    idCandidate: req.body.idCandidate,
    date: req.body.date,
    time: req.body.time,
    status: req.body.status,
    result: req.body.result,
  };
  Sessions.findByIdAndUpdate(id, updatedSession, { new: true })
    .populate("idPsychologist")
    .populate("idCandidate")
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Session not found by ID: ${id}` });
      return res.json({ msg: "Session updated", data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const remove = (req, res) => {
  const { id } = req.params;
  Sessions.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    .populate("idPsychologist")
    .populate("idCandidate")
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Session not found by ID: ${id}` });
      return res.json({ msg: "Session deleted", data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const activate = (req, res) => {
  const { id } = req.params;
  Sessions.findByIdAndUpdate(id, { isDeleted: false }, { new: true })
    .populate("idPsychologist")
    .populate("idCandidate")
    .then((data) => {
      if (!data) return res.status(404).json({ msg: `Session not found by ID: ${id}` });
      return res.json({ msg: "Session activated", data });
    })
    .catch((err) => res.status(500).json({ msg: `Error: ${err}` }));
};

const getAvailable = async (req, res) => {
  try {
    const { id } = req.params;
    const psychologistSessions = await Sessions.find({
      $and: [{ idPsychologist: id }, { isDeleted: false }],
    });
    const psychologist = await Psychologists.findById(id);
    // 1- Crear calendario del psychologist (15 días todas las horas)
    const fullCalendar = [];
    for (let i = 0; i < 15; i++) {
      let hour = 6;
      for (let j = 0; j < 15; j++) {
        const date = moment().startOf("day").hour(hour).add(i, "day");
        fullCalendar.push(date);
        hour++;
      }
    }
    // 2- Elimino las fechas que no machean con sus horarios.
    const psychologistCalendar = [];
    fullCalendar.forEach((element) => {
      psychologist.availability.forEach((item) => {
        let x = 0;
        switch (item.day) {
          case "monday":
            x = 1;
            break;
          case "tuesday":
            x = 2;
            break;
          case "wednesday":
            x = 3;
            break;
          case "thursday":
            x = 4;
            break;
          case "friday":
            x = 5;
            break;
          default:
            break;
        }
        if (element.isoWeekday() === x && element.hour() === parseInt(item.time, 10)) {
          psychologistCalendar.push(element);
        }
      });
    });
    // 3- filtrar por las sessiones que ya tiene
    const sessionCalendar = [];
    psychologistSessions.forEach((element) => {
      const date = moment(`${element.date} ${element.time}`);
      if (moment().isBefore(date)) {
        sessionCalendar.push(date);
      }
    });
    if (sessionCalendar.length > 0) {
      for (let i = 0; i < sessionCalendar.length; i++) {
        for (let j = 0; j < psychologistCalendar.length; j++) {
          if (moment(sessionCalendar[i]).isSame(moment(psychologistCalendar[j]))) {
            psychologistCalendar.splice(j, 1);
          }
        }
      }
    }
    // 4- quitar las menores a ahora
    const availableCalendar = psychologistCalendar.filter((item) => moment(item).isAfter(moment()));
    const substractDate = availableCalendar.map((date) => moment(date).subtract(3, "h"));
    res.json({ data: substractDate });
  } catch (error) {
    res.status(500).json({ msg: `Error: ${error}` });
  }
};
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  activate,
  getAvailable,
};

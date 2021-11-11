const fs = require('fs');
const sessions = JSON.parse(fs.readFileSync('./data/sessions.json'));

const create = (req, res) => {
    const newSession = {
        id: req.query.id,
        idPsychologist: req.query.idPsychologist,
        idCandidate: req.query.idCandidate,
        dateTime: req.query.dateTime,
        status: req.query.status,
        result: req.query.result
    }
    sessions.push(newSession);
    res.json(sessions);
};

const update = (req, res) => {
    const session = sessions.find(session => session.id === req.params.id);
    const selectedSession = sessions.findIndex(session => session.id === req.params.id);
    if(session) {
        const updateSession = req.query;
        session.idPsychologist = updateSession.idPsychologist ? updateSession.idPsychologist : session.idPsychologist;
        session.idCandidate = updateSession.idCandidate ? updateSession.idCandidate : session.idCandidate;
        session.dateTime = updateSession.dateTime ? updateSession.dateTime : session.dateTime;
        session.status = updateSession.status ? updateSession.status : session.status;
        session.result = updateSession.result ? updateSession.result : session.result;
        sessions[selectedSession] = session;
        res.json({ msg: 'Session updated', session});
    }
    return res.status(400).json({ msg: `No session with the id: ${req.params.id}`});
};

const getAll = (req, res) => {
    res.json(sessions);
};

const getById = (req, res) => {
    const session = sessions.find(session => session.id === req.params.id);
    if (session) return res.json(session);
    return res.send({ msg: `No session with id: ${req.params.id}`});
};

const getByIdPsychologist = (req, res) => {
    const session = sessions.filter(session => session.idPsychologist === req.params.idPsychologist);
    if (session) return res.json(session);
    return res.send({ msg: `No psychologist with id: ${req.params.idPsychologist}`});
};

module.exports = {
    create: create,
    update: update,
    getAll: getAll,
    getById: getById,
    getByIdPsychologist: getByIdPsychologist
};
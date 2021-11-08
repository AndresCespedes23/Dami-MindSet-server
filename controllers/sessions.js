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
    } else {
        res.status(400).json({ msg: `No session with the id: ${req.params.id}`});
    }
};

const remove = (req, res) => {
    const session = sessions.find(session => session.id === req.params.id);
    if(session) {
        sessions.splice(session, 1);
        res.json({ msg: `Session id: ${req.params.id} removed`, session});
    } else {
        res.status(400).json({ msg: `No session with the id: ${req.params.id}`});
    }
}

module.exports = {
    create: create,
    update: update
};
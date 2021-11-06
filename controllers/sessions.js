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
    if(session) {
        const updateSession = {
            id: req.query.id,
            idPsychologist: req.query.idPsychologist,
            idCandidate: req.query.idCandidate,
            dateTime: req.query.dateTime,
            status: req.query.status,
            result: req.query.result
        } if(updateSession.id) {
            return res.status(400).json({ msg: `Can't change id`});
        }
        session.idPsychologist = updateSession.idPsychologist ? updateSession.idPsychologist : session.idPsychologist;
        session.idCandidate = updateSession.idCandidate ? updateSession.idCandidate : session.idCandidate;
        session.dateTime = updateSession.dateTime ? updateSession.dateTime : session.dateTime;
        session.status = updateSession.status ? updateSession.status : session.status;
        session.result = updateSession.result ? updateSession.result : session.result;
        res.json({ msg: 'Session updated', session});
    } else {
        res.status(400).json({ msg: `No session with the id: ${req.params.id}`});
    }
};

module.exports = {
    create: create
};
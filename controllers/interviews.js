const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./data/interviews.json'));

const create = (req,res) => {
    const interview = {
        id: `${Math.round(Math.random()*10000)}`,
        idCandidate: req.query.idCandidate,
        idClient: req.query.idClient,
        idPosition: req.query.idPosition,
        date: req.query.date,
        time: req.query.time,
        status: req.query.status
    }
    data.push(interview);
    res.send(`Interview succesfully created! ${JSON.stringify(interview)}`);
}

const update = (req,res) => {
    const index = data.findIndex(interview => {
        return parseInt(req.params.id) == interview.id;
    });
    if(index === -1) res.send('Could not find interview with specified ID');
    for(property in req.query) {
        data[index][property] = req.query[property];
    }
    res.send(`Interview succesfully updated! ${JSON.stringify(data[index])}`);
}

module.exports = {
    create: create,
    update: update
}
const fs = require('fs');

const create = (params) => {
    const data = JSON.parse(fs.readFileSync('./data/interviews.json'));
    let interview = {
        id: params.id,
        idCandidate: params.idCandidate,
        idClient: params.idClient,
        idPosition: params.idPosition,
        date: params.date,
        time: params.time,
        status: params.status
    }
    data.push(interview);
    fs.writeFile('./data/interviews.json', JSON.stringify(data), err => {
        if(err) {
            console.log(err);
        }
        return;
    });
    return interview;
}

const update = (params) => {
    const data = JSON.parse(fs.readFileSync('./data/interviews.json'));
    const index = data.findIndex(function(interview) {
        return parseInt(params.id) == interview.id;
    })
    if(index === -1) return 'Could not find interview with specified ID'
    for(property in params) {
        data[index][property] = params[property];
    }
    fs.writeFile('./data/interviews.json', JSON.stringify(data), err => {
        if(err) {
            console.log(err);
        }
        return;
    });
    return `Interview succesfully updated! ${JSON.stringify(data[index])}`;
}

module.exports = {
    create: create,
    update: update
}
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

module.exports = {
    create: create,
}
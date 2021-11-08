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


//MS 08 update psychologists

const update = (req, res) =>{
    const psychologist = psychologists.find(psychologist => psychologist.id === req.params.id);
    const index = psychologists.indexOf(psychologist);
    if(psychologist) {
        req.query.id ? psychologists[index].id = req.query.id : candidates[index].id;
        req.query.name ? psychologists[index].name = req.query.name : candidates[index].name;
        req.query.email ? psychologists[index].email = req.query.email : candidates[index].email;
        req.query.username ? psychologists[index].username = req.query.username : candidates[index].username;
        req.query.enrollmentNumber ? psychologists[index].enrollmentNumber = req.query.enrollmentNumber : candidates[index].enrollmentNumber;
        res.json(psychologists);
    } else {
        res.send('User Not Updated');
    }
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

module.exports = {
    create: create,
    update: update,
    remove: remove,
}

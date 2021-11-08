const fs = require('fs')
const psychologists = JSON.parse(fs.readFileSync('./data/psychologists.json'));

//MS 08 update psychologists

const update = (req, res) =>{
    const psychologist = psychologists.find(psychologist => psychologist.id === req.params.id);
    const index = psychologists.indexOf(psychologist);
    if(psychologist){
        req.query.id ? psychologists[index].id = req.query.id : candidates[index].id;
        req.query.name ? psychologists[index].name = req.query.name : candidates[index].name;
        req.query.email ? psychologists[index].email = req.query.email : candidates[index].email;
        req.query.username ? psychologists[index].username = req.query.username : candidates[index].username;
        req.query.enrollmentNumber ? psychologists[index].enrollmentNumber = req.query.enrollmentNumber : candidates[index].enrollmentNumber;
        res.json(psychologists)
    }else{
        res.send('User Not Updated')
    }
};

module.exports = {
    update: update
}

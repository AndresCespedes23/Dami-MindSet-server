const fs = require('fs');
let candidates = JSON.parse(fs.readFileSync('./data/candidates.json'));

// MS-05: remove candidates

const remove = (req, res) => {
  const candidate = candidates.find(candidate => candidate.id === req.params.id);
  if (candidate) {
    const candidatesFilter = candidates.filter(candidate => candidate.id !== req.params.id);
    candidates = candidatesFilter;
    res.json(candidates);
  } else {
    res.send('User not removed');
  }
};
  
module.exports = {
  remove: remove
}
const fs = require('fs');
const candidates = JSON.parse(fs.readFileSync('./data/candidates.json'));

// MS-05: remove candidates

const remove = (req, res) => {
    const candidate = candidates.find(candidate => candidate.id === req.params.id);
    if (candidate) {
      candidates.splice(candidate, 1);
      res.json(candidates);
    } else {
      res.send('User not removed');
    }
  };
  
  module.exports = {
      remove: remove
  }
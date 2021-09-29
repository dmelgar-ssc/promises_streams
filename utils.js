const { Readable } = require('stream');

const scorecards = [
  {"domain": "securityscorecard.com", "previous_score": 100, "current_score": 90 }, // score = -10
  {"domain": "example.com", "previous_score": 40, "current_score": 50 }, // score = 10
  {"domain": "newspaper.com", "previous_score": 20, "current_score": 100 }, // score = 80
  {"domain": "mailserver.com", "previous_score": 70, "current_score": 65 }, // score = 5
  {"domain": "google.com", "previous_score": 70, "current_score": 50 }, // score = - 20
  {"domain": "hotmail.com", "previous_score": 70, "current_score": 55 }, // score = -15
];

class DataStreamError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DataStreamError';
  }
}

const dataStreamGenerator = (error) => function* () {
 for (let i=0; i < scorecards.length; i++) {
    //check if we want to throw an error
    if (error && i === 2) {
      throw new DataStreamError('there was an error when trying to read from data source.');
    }
    yield scorecards[i];
  }
};

module.exports = {
  dataReader: (error) => Readable.from(dataStreamGenerator(error)())
}
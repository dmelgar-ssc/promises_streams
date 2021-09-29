const _ = require('lodash');
const R = require('ramda');

const { dataReader } = require('./utils');


/**
 * Exercise 1 - Fix this function
 * This function return the grade_drop of a scorecard
 * How we calculate the grade_drop is really easy
 * every scorecard obj has the following structure
 * {
 *   "domain": "scorecard.com",
 *   "previous_socre": 80,
 *   "current_score": 70
 * }
 * 
 * Score Variation meassure how mutch the score 
 * has changed for agiven scorecard.
 * 
 * If score_variation is positive it means that the
 * scorecard has improved the security level.
 * 
 * score_variation = current_score - previous_score
 */
const getScoreVariation = (scorecard) => {
  // PUT YOUR CODE HERE, UPDATE RETURN IF NEEDED
  return 0;
};

/**
 * Exercise 2 - fix this function
 * This function sort a list of scorecards by "score_variation"
 */
const sortByScoreVariation = (sortOrder, scorecards) => {
  
  if (!['desc', 'asc'].includes(sortOrder)) {
    throw new Error('Invalid sort order');
  }

  const sortDescending = R.sortWith([R.descend(R.prop('score_variation'))]);
  const sortAscending = R.sortWith([R.ascend(R.prop('score_variation'))]);

  // SHOULD RETURN sortAscending when sortOrder === 'asc'
  return sortOrder === 'asc'
    ? sortDescending(scorecards)
    : sortAscending(scorecards);
}


/**
 * Exercise 3 - implement this function
 * Implement the following function using the stream and return a sorted('asc' or 'desc') list
 * of scorecards by "score_variation".
 *
 * @return [
 *   { "domain": "securityscorecard.com", "previous_score": 100, "current_score": 90, "score_variant": -10 }
 * ]
 */
const fetchScorecards = (sortOrder) => new Promise((resolve, reject) => {
  // we use a dataStream to read the scorecards from the database
  // implement handlers for events from data stream reader('data', 'error', 'end')
  // as en example we left how to handle the event 'data'.

  const scorecards = [];
  const dataStreamReader = dataReader();

  dataStreamReader.on('data', (scorecard) => {
    // each chunk of data is an scorecard with the following properties
    // { "domain": "securityscorecard.com", "previous_score": 100, "current_score": 90 }
    console.log('Chunk', scorecard)
  });

  // RESOLVE TO SORTED SCORECARDS BY "score_variation"
  resolve(sortByScorecard(sortOrder, scorecards));
});

const printDowngradedScorecards = async () => {
  
  // print sorted scorecards by grade_drop
  const scorecards = await fetchScorecards();

  // PUT CODE HERE TO LOG the scorecards

};

printDowngradedScorecards();

module.exports = {
  sortByScoreVariation,
  fetchScorecards,
  getScoreVariation,
};
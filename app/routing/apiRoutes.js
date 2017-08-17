var path = require("path");
var characters = require('../data/characters');
var users = require('../data/users');

// separate out the act of looking for matches in an array so it can be used for both characters and users
function findMatch(array, inputArray) {
  // iterate through array, building a new array of numeric values representing the user's difference from that character  
  var arrayOfDiffs = array.map(function(char) {
    var individualDiff = 0;
    for (var i = 0; i < char.answers.length; i++) {
      // Math.abs converts difference to positive (or 0)
      individualDiff += Math.abs(char.answers[i] - inputArray[i]);
    }
    return individualDiff;
  });
  // From "arrayOfDiffs", the output of the .map function, find the element with the minimum value
  // (the closest match to the user). Then get its index, then select the character object from array
  // "array" with the same index.
  return array[arrayOfDiffs.indexOf(Math.min(...arrayOfDiffs))]
}


module.exports = function(app){

  app.get('/api/characters', function(req, res){
    res.json(characters);
  });

  app.post('/api/characters', function(req, res){
    // initialize a container object for the two-part response
    var resObj = {};
    
    // check req.body.answers, which holds the array of user answers, against characters and users
    var surveyScores = req.body.answers;

    resObj.character = findMatch(characters, surveyScores);
    resObj.user = findMatch(users, surveyScores);

    // save user's new response to "users" array
    users.push(req.body);
    // send two-object response
    console.log("resObj:", resObj);
    res.json(resObj);
  });
}
var api = require('./textapi.js');

var dict = require('./trump.js');

function tagger(text, callback) {
    api.sentiment({ "text": text }, function(error, response) {
      if (error === null) {
        var feeling = response.polarity;
        var words = dict[feeling];
        var next = words[Math.floor((Math.random() * words.length))];
        if (Math.random() > 0.5) {
            text = text + " " + next.toUpperCase() + "!";
        }
        callback(text, response.polarity);
      }
    });
}

module.exports = tagger;

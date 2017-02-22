var api = require('./textapi.js');

var replace = ["organization", "person", "location"];

var dict = require('./trump.js');

function nicknamer(text, feeling, callback) {
    api.entities({
        text: text
    }, function(error, response) {
        if (error === null) {
            var items = replace.reduce(function(r, i) {
                return r.concat(response.entities[i] || []);
            }, []);
            for (var i = 0; i < items.length; i++) {
                if (Math.random() > 0.75) {
                    var words = dict[feeling];
                    var next = words[Math.floor((Math.random() * words.length))];
                    text = text.replace(items[i], next + " " + items[i]);
                }
            }
            var keywords = (response.entities.keyword || []).filter(function(x) {
                return items.indexOf(x) < 0;
            });
            callback(text, keywords);
        }
    });
}

module.exports = nicknamer;

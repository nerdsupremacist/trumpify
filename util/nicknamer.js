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
            var offset = -0.4;
            for (var i = 0; i < items.length; i++) {
                if (Math.random() >= 0.5 + offset) {
                    offset += 0.3;
                    var words = dict[feeling];
                    var next = words[Math.floor((Math.random() * words.length))];
                    if (next) {
                        text = text.replace(items[i], next + " " + items[i]);
                    }
                }
            }
            var keywords = (response.entities.keyword || []).filter(function(x) {
                return items.reduce(function(r, i) {
                    return r && i.indexOf(x) <= -1;
                }, true) && x.toUpperCase() !== x;
            });
            callback(text, keywords);
        }
    });
}

module.exports = nicknamer;

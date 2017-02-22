var request = require('request');

var dict = require('./trump.js');
var words = ["positive", "negative", "other"].reduce(function(r, i) {
    return r.concat(dict[i] || []);
}, []);

function synonymsIn(object) {
    return Object.keys(object).reduce(function(r, i) {
        var w = ["syn", "sim", "rel"].reduce(function(r, j) {
            return r.concat(object[i][j] || []);
        }, []);
        return r.concat(w);
    }, []).filter(function(x) {
        return words.reduce(function(r, i) {
            return r || x.toLowerCase().indexOf(i.toLowerCase()) > -1;
        }, false);
    });
}

function getSynonyms(text, keywords, callback) {
    var count = 0;
    var handleItem = function(item) {
        request("http://words.bighugelabs.com/api/2/7fbcc93ba897594bf9390b15bbf4fa89/" + item + "/json", function(err, response, body) {
            if (response.statusCode == 200) {
                var info = JSON.parse(body);
                var others = synonymsIn(info).concat([item]);
                var next = others[Math.floor((Math.random() * others.length))];
                if (Math.random() > 0.3) {
                    text = text.replace(item, next);
                }
            }
            count += 1;
            if (count == keywords.length) {
                callback(text);
            }
        });
    };
    if (keywords.length > 0) {
        for (var i = 0; i < keywords.length; i++) {
            handleItem(keywords[i]);
        }
    } else {
        callback(text);
    }
}

module.exports = getSynonyms;

var request = require('request');

var ignore = ["similar term", "related term"];

var dict = require('./trump.js');
var words = ["positive", "negative", "other"].reduce(function(r, i) {
    return r.concat(dict[i] || []);
}, []);

function synonymsIn(object) {
    return object.reduce(function(r, i) {
        var items = i.list.synonyms.split("|").filter(function(x) {
            return x.indexOf("(antonym)") < 0;
        }).map(function(x) {
            return ignore.reduce(function (r, i) {
                return r.replace(" (" + i + ")", "");
            }, x);
        });
        return r.concat(items);
    }, []).filter(function(x) {
        return words.reduce(function(r, i) {
            return r || x.toLowerCase().indexOf(i.toLowerCase()) > -1;
        }, false);
    });
}

function getSynonyms(text, keywords, callback) {
    var count = 0;
    var handleItem = function(item) {
        request("http://thesaurus.altervista.org/thesaurus/v1?language=en_US&output=json&key=4K5aSIJqqOsgMmT3xxje&word=" + item, function(err, response, body) {
            if (response.statusCode == 200) {
                var info = JSON.parse(body);
                var others = synonymsIn(info.response).concat([item]);
                var next = others[Math.floor((Math.random() * others.length))];
                if (next && Math.random() > 0.3) {
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

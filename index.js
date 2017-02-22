var tagger = require('./util/tag.js');
var nicknamer = require('./util/nicknamer.js');
var words = require('./util/synonyms.js');



function trumpify(text, callback) {
    tagger(text, function(text, sentiment) {
        nicknamer(text, sentiment, function(text, keywords) {
            words(text, keywords, callback);
        });
    });
}

window.trumpify = function(text, callback) {
    trumpify(text, callback);
};

module.exports = trumpify;

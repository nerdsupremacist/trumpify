var tagger = require('./tag.js');
var nicknamer = require('./nicknamer.js');
var words = require('./synonyms.js');

function process(text, callback) {
    tagger(text, function(text, sentiment) {
        nicknamer(text, sentiment, function(text, keywords) {
            words(text, keywords, callback);
        });
    });
}
module.exports = process;

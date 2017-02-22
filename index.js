var tagger = require('./util/tag.js');
var nicknamer = require('./util/nicknamer.js');
var words = require('./util/synonyms.js');

function process(text, callback) {
    tagger(text, function(text, sentiment) {
        nicknamer(text, sentiment, function(text, keywords) {
            words(text, keywords, callback);
        });
    });
}
module.exports = process;

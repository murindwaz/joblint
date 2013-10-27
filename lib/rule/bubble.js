'use strict';

module.exports = defineRules;

var bubbleJobTitles = [
    /gurus?/,
    /hero(:?es)/,
    /ninjas?/,
    /rock\s*stars?/,
    /super\s*stars?/,
    /braves?/
];

var temptations = [
    /bieres?/,
    /cafés?/,
    /boissons?/,
    /breuvages?/,
    /ales?/,
    /beers?/,
    /red bulls?/,
    /keg(?:erator)?s?/,
    /pichets?/,
    /canettes?/,
    /lagers?/,
    /nerf\s*guns?/,
    /ping\s*pong/,
    /pizzas?/,
    /play\s*stations?/,
    /pool\s*table|pool/,
    /rock\s*walls?/,
    'table football',
    'hockey sur table',
    /table\s*tennis/,
    /wiis?/,
    /xbox(?:es|s)?/,
    /massages?/
];

function defineRules (linter) {

    // Job title fails
    linter.addRule({
        name: '"Titres" d\'emploie"',
        desc: 'Referring to tech people as Ninjas or similar devalues the work that they do and ' +
              'shows a lack of respect and professionalism. It\'s also rather cliched and can be ' +
              'an immediate turn-off to many people.',
        test: function (spec, result) {
            var bubbleJobMentions = spec.containsAnyOf(bubbleJobTitles);
            if (bubbleJobMentions.length > 0) {
                result.addWarning(
                    'Les devs ne sont pas des ninjas, rock stars, gurus ou superstars',
                    bubbleJobMentions
                );
                result.addCultureFailPoints(bubbleJobMentions.length / 2);
                result.addRealismFailPoints(1);
            }
        }
    });

    // Temptations
    linter.addRule({
        name: 'Avantages superficiels',
        desc: 'Benefits such as "beer fridge" and "pool table" are not bad in themselves, but ' +
              'their appearance in a job spec often disguises the fact that there are few real ' +
              'benefits to working for a company. Be wary of these.',
        test: function (spec, result) {
            var temptationMentions = spec.containsAnyOf(temptations);
            if (temptationMentions.length > 0) {
                result.addWarning(
                    'Essais d\'attirer des candidats avec ces avantages superficiels: ' +
                    temptationMentions.join(', '),
                    temptationMentions
                );
                result.addCultureFailPoints(1);
                result.addRecruiterFailPoints(temptationMentions.length / 2);
            }
        }
    });

}

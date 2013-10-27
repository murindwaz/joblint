'use strict';

module.exports = defineRules;

var broWords = [
    /bros?/,
    /geeks?/,
    /brogramm(?:er|ers|ing)/,
    'crank',
    'crush',
    /dude(?:bro)?s?/,
    /mecs?/,
    /hard[\s\-]*core/,
    'skillz'
];

function defineRules (linter) {

    // Bro terminology
    linter.addRule({
        name: 'Terminologie "Bro"',
        desc: 'Bro culture terminology can really reduce the number of people likely to show ' +
              'interest, both male and female. It discriminates against anyone who doesn\'t fit ' +
              'into a single gender-specific archetype.',
        test: function (spec, result) {
            var broMentions = spec.containsAnyOf(broWords);
            var amount = (broMentions.length > 2 ? 'Beaucoup de' : 'Un peu de');
            if (broMentions.length > 0) {
                result.addWarning(
                    amount + ' termoninologie "bro" est utilisée',
                    broMentions
                );
                result.addCultureFailPoints(broMentions.length);
            }
        }
    });

}

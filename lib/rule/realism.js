'use strict';

module.exports = defineRules;

var visionaryWords = [
    /ciels? bleus?/,
    /illumin[\w]*/,
    /incit[\w]*/,
    /paradigmes?/,
    /synergies?/,
    /rêves?/,
    /visions?/
];

function defineRules (linter) {

    // Visionary terminology
    linter.addRule({
        name: 'Terminologie de visionnaire',
        desc: 'Terms like "blue sky" and "enlightened" often indicate that a non technical ' +
              'person (perhaps a CEO or stakeholder) has been involved in writing the spec. Be ' +
              'down-to-earth, and explain things in plain English.',
        test: function (spec, result) {
            var visionaryMentions = spec.containsAnyOf(visionaryWords);
            var amount = (visionaryMentions.length > 2 ? 'Beaucoup de' : 'Un peu de');
            if (visionaryMentions.length > 0) {
                result.addWarning(
                    amount + ' terminologie "visonnaire" est utilisés',
                    visionaryMentions
                );
                result.addCultureFailPoints(visionaryMentions.length / 2);
                result.addRealismFailPoints(visionaryMentions.length / 2);
            }
        }
    });

}

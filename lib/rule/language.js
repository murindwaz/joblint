'use strict';

module.exports = defineRules;

var swears = [
    /fuck(?:er|ing)?/,
    /shit/,
    /chier/,
    /con/,
    /couille/,
    /culs?/,
    /putes?/,
    /niques?/,
    /foutre/,
    /encule/,
    /merde/,
    /plotes?/,
    /criss/,
    /[oe]sti/,
    /baise/,
    /bitch/,
    /bite/,
    /bordel/,
    /putains?/,
    /calis/,
    /chiant/,
    /pisse/,
    /chiasse/,
    /siboire/,
    /putain/
];

function defineRules (linter) {

    // Swears
    linter.addRule({
        name: 'Vulgarités',
        desc: 'While swearing in the workplace can be OK, you shouldn\'t be using profanity in a ' +
              'job spec – it\'s unprofessional.',
        test: function (spec, result) {
            var swearMentions = spec.containsAnyOf(swears);
            if (swearMentions.length > 0) {
                result.addWarning(
                    'Jurer dans une offre d\'emploi n\'est pas très professionel',
                    swearMentions
                );
                result.addRecruiterFailPoints(swearMentions.length);
            }
        }
    });

}

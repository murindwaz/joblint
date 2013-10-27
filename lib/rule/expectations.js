'use strict';

module.exports = defineRules;

var competitivePhrases = [
    /rivalise[\w]*/,
    /dispute[\w]*/,
    /ouvert[\w]*/,
    /sociab[\w]*/,
    'concurrence',
    'concours',
    /défis?/,
    /competition[\w]*/,
    /épreuves?/,
    'salaire\s*compétitif',
    'fine pointe',
    /avant\s*gard?/,
    /échecs?/,
    'revers',
    'dévaite',
    'succès',
    /échou[\w]*/,
    /fore\s*front/,
    /super\s*stars?/,
    /meilleurs?/,
    /leaders?/,
    /importants?/,
    /supérieurs?/,
    /gagnants?/,
    /champions?/,
    /jeunes?/,
    /dynamiques?/,
    /préfér[\w]*/,
    /avantages?/,
    /previleg[\w]*/,
    'vainceur'
];

var expectationPhrases = [
    /concili[\w]*/,
    'démarrage rapide',
    'délais',
    /limites?/,
    /perform[\w]*/,
    /deadlines?/
];

function defineRules (linter) {

    // Competitive environment
    linter.addRule({
        name: 'Environnment compétitif',
        desc: 'Competition can be healthy, but for a lot of people a heavily competitive ' +
              'environment can be a strain. You could also potentially be excluding people who ' +
              'have more important outside-of-work commitments, such as a family.',
        test: function (spec, result) {
            var competitionMentions = spec.containsAnyOf(competitivePhrases);
            if (competitionMentions.length > 0) {
                result.addNotice(
                    'Cet emploi semble compétitif et basé sur la performance',
                    competitionMentions
                );
                result.addRealismFailPoints(competitionMentions.length / 2);
                result.addRecruiterFailPoints(competitionMentions.length / 2);
            }
        }
    });

    // Unrealistic expectations
    linter.addRule({
        name: 'Attentes envers les nouveaux',
        desc: 'Terms like "hit the ground running" and others can indicate that the person ' +
              'writing a job spec is unaware of the time and effort involved in preparing a new ' +
              'starter for work.',
        test: function (spec, result) {
            var expectationMentions = spec.containsAnyOf(expectationPhrases);
            if (expectationMentions.length > 0) {
                result.addNotice(
                    'Cet emploie semble avoir de trop grandes attentes evers les nouveaux employés',
                    expectationMentions
                );
                result.addRealismFailPoints(expectationMentions.length);
            }
        }
    });

}

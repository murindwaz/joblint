'use strict';

module.exports = defineRules;

var genderWords = [
    /garcons?/,
    /filles?/,
    /barbies?/,
    /gars/,
    /meufs?/,
    /poulettes?/,
    /gonzes?/,
    /mecs?/,
    /hommes?/,
    /femmes?/,
    /demoiselles?/,
    /matronnes?/,
    /ménagères?/,
    /gentlem[ae]n/,
    /gentils?\s*hommes?/,
    /grands?\s*pères?/,
    /grands?\s*papas?/,
    /mammies?/,
    /grands?\s*mères?/,
    /grands?\s*mamans?/,
    /papies?/,
    /maries?/,
    /dames?/,
    /pères?/,
    /mères?/,
    /papas?/,
    /mamans?/,
    /males?/,
    /femelles?/,
    /frères?/,
    /soeur(es)?/,
    /fillettes?/,
    /masculins?/,
    /féminins?/,
    /époux/,
    /épouses?/
];

var femaleGenderedPronouns = [
    /elles?/
];
var maleGenderedPronouns = [
    /ils?/,
    'eux',
    'lui'
];

var beardyWords = [
    /barbes?/,
    /barbus?/,
    /barbiches?/,
    /poils?/,
    /moustaches?/,
    /sourcils?/,
    /grisonnants?/,
    /duvets?/
];

var sexualizedWords = [
    /sex[\w]*/,
    /séduisants?/,
    /mignons?/,
    /attirante?/,
    /attrayante?/,
    /charmante?/,
    /ravissante?/,
    /graci(eux|euse)/,
    /agréables?/,
    /charmeuses?/,
    /fifes?/,
    /pédés?/,
    /enchanteresses?/
];

function defineRules (linter) {

    // Gender mentions
    linter.addRule({
        name: 'Mention de genres',
        desc: 'Mentioning gender in a job spec not only limits the number of people likely to ' +
              'be interested, but can also have legal implications – it is often discriminatory. ' +
              'Check your use of gender-specific terms.',
        test: function (spec, result) {
            var genderMentions = spec.containsAnyOf(genderWords);
            if (genderMentions.length > 0) {
                result.addError(
                    'Le genre est mentionné',
                    genderMentions
                );
                result.addCultureFailPoints(genderMentions.length / 2);
            }
        }
    });

    // Gendered pronouns
    linter.addRule({
        name: 'Pronoms de genre',
        desc: 'Inbalanced use of "him/his/her" or "he/she" could indicate that you\'re ' +
              'discriminating against a certain gender. Revise your use of these words to be ' +
              'sure, or replace them with "them" or "they".',
        test: function (spec, result) {
            var femaleMentions = spec.containsAnyOf(femaleGenderedPronouns);
            var maleMentions = spec.containsAnyOf(maleGenderedPronouns);
            var allMentions = femaleMentions.concat(maleMentions);
            if (femaleMentions.length !== maleMentions.length) {
                result.addWarning(
                    'Utilisation des pronoms: ' + allMentions.join(', '),
                    allMentions
                );
            }
        }
    });

    // Facial hair mentions
    linter.addRule({
        name: 'Mention de pilosité faciale',
        desc: 'The use of "grizzled" or "bearded" indicates that you\'re only looking for ' +
              'male developers.',
        test: function (spec, result) {
            var beardyMentions = spec.containsAnyOf(beardyWords);
            if (beardyMentions.length > 0) {
                result.addError(
                    'Mention de pilosité faciale',
                    beardyMentions
                );
                result.addCultureFailPoints(beardyMentions.length);
            }
        }
    });

    // Sexualized terms
    linter.addRule({
        name: 'Termes sexualisés',
        desc: 'Terms like "sexy code" are often used if the person writing a spec doesn\'t know ' +
              'what they are talking about or can\'t articulate what good code is. It can also ' +
              'be an indicator of bro culture.',
        test: function (spec, result) {
            var sexualizedMentions = spec.containsAnyOf(sexualizedWords);
            if (sexualizedMentions.length > 0) {
                result.addWarning(
                    'Cet offre contient des termes sexualisés: ' +
                    sexualizedMentions.join(', '),
                    sexualizedMentions
                );
                result.addCultureFailPoints(sexualizedMentions.length / 2);
            }
        }
    });

}

/* Return the number of total permutations of the provided string that don't have repeated consecutive letters. Assume that duplicate characters are each unique.

For example, aab should return 2 because it has 6 total permutations (aab, aab, aba, aba, baa, baa), but only 2 of them (aba and aba) don't have the same letter (in this case a) repeating. */

/**
 * params: [string], [s]
 * return: [Array]
 * Tales a string as input and returns a list of strings containing all the possible permutations of `s`
 */
function permutations_1(s) {

    var res = []
    var perms = [''];
    var newPermutations = [];
    var allPermutations = [];

    // get permutations for s[0:s.length - 1]
    if (s.length > 1) {
        perms = permutations(s.slice(0, s.length - 1));
    }

    // add s[length] to those
   for (var i = 0; i < s.length; i++) {

        for (var j = 0; j < perms.length; j++) {

            var permutation = perms[j].slice(0, i) + s[s.length - 1] + perms[j].slice(i);

            newPermutations.push(permutation);
        }

        allPermutations = allPermutations.concat(newPermutations);
        newPermutations = [];
    }

    return allPermutations;
}

console.log(permutations_1('abcd'));

// other solution

function nPlus1 (s, sPerms, c) {

    var nPlus1Perms = [],
        perm;

    for (var i = 0; i <= s.length; i++) {

        for (var j = 0; j < sPerms.length; j++) {

            perm = sPerms[j].slice(0,i) + c + sPerms[j].slice(i);
            nPlus1Perms.push(perm);
        }
    }

    return nPlus1Perms;
}

function permutations (s) {

    if (s.length === 1 || s.length === 0) {
        return [s];
    }

    if (s.length > 2) {
        var perms = permutations(s.slice(0,s.length - 1));
    } else {
        return nPlus1(s[0], [s[0]], s[1]);
    }

    return nPlus1(s.slice(0, s.length - 1), perms, s[s.length - 1]);
}

console.log(permutations('abc'));

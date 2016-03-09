/* Return the number of total permutations of the provided string that don't have repeated consecutive letters. Assume that duplicate characters are each unique.

For example, aab should return 2 because it has 6 total permutations (aab, aab, aba, aba, baa, baa), but only 2 of them (aba and aba) don't have the same letter (in this case a) repeating. */

/**
 * params: [string], [s]
 * return: [Array]
 * Tales a string as input and returns a list of strings containing all the possible permutations of `s`
 */
function permutations(s) {

    var res = []
    var perms = [''];
    // get permutations for s[0:s.length - 1]
    if (s.length > 1) {
        perms = permutations(s.slice(0, s.length - 1));
    }

    // add s[length] to those
    for (var i = 0; i < perms.length; i++) {

        res.push(perms[i] + s[s.length]);
    }

    return res;
}

console.log(permutations('abc'));
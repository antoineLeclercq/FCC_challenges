/* Return the number of total permutations of the provided string that don't have repeated consecutive letters. Assume that duplicate characters are each unique.

For example, aab should return 2 because it has 6 total permutations (aab, aab, aba, aba, baa, baa), but only 2 of them (aba and aba) don't have the same letter (in this case a) repeating. */

/**
 * params: [string], [s]
 * return: [Array]
 * Tales a string as input and returns a list of strings containing all the possible permutations of `s`
 */

function permutations (s) {
    
    var allPermutations = [],
        perms = [''],
        perm;
    
    // if string is more than 1 char, recursively call permutations until s is only one char
    if (s.length > 1) {
        var perms = permutations_2(s.slice(0, s.length - 1));
    }
    
    // having `perms` equal to the permutations of the `s` associated with the previous function call
    // for each position in `s`, loop through all permutations
    // and add the additional char in `s` that was not in the previous function call to each permutation for each position in s
    for (var i = 0; i < s.length; i++) {
        
        for (var j = 0; j < perms.length; j++) {
            
            perm = perms[j].slice(0,i) + s[s.length - 1] + perms[j].slice(i);
            allPermutations.push(perm);
        }
    }
    
    return allPermutations;
}

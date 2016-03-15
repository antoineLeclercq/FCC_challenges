/* Return the number of total permutations of the provided string that don't have repeated consecutive letters. Assume that duplicate characters are each unique.

For example, aab should return 2 because it has 6 total permutations (aab, aab, aba, aba, baa, baa), but only 2 of them (aba and aba) don't have the same letter (in this case a) repeating. */

// check if each permutation in `permutations` has 2 repeated chars and return unique permutations
function uniquePermutations(permutations) {
    
    var checker,
        uniquePermutations = [];
    
    for (var i = 0; i < permutations.length; i ++) {
        
        var perm = permutations[i];
        checker = true;
        
        for (var j = 0; j < perm.length; j++) {

            if (perm[j] === perm[j + 1]) {
                checker = false;
                break;
            }
        }
        
        if (checker) {
            uniquePermutations.push(perm);
        }
    }
    
    return uniquePermutations;
}

function permutations(s) {
    
    var allPermutations = [],
    perms = [''],
    perm;

    // if string is more than 1 char, recursively call permutations until s is only one char
    if (s.length > 1) {
        perms = permutations(s.slice(0, s.length - 1));
    }

    // having `perms` equal to the permutations of the `s` associated with the previous function call
    // for each position in `s`, loop through all permutations
    // and add the additional char in `s` that was not in the previous function call
    // to each permutation for each position in s
    for (var i = 0; i < s.length; i++) {

        for (var j = 0; j < perms.length; j++) {

            perm = perms[j].slice(0,i) + s[s.length - 1] + perms[j].slice(i);
            allPermutations.push(perm);
        }
    }

    return allPermutations;
}

function permAlone(s) {
    
    var perms = permutations(s),
        uniquePerms;
    
    uniquePerms = uniquePermutations(perms);

    return uniquePerms.length;
}

permAlone('abaflefc');
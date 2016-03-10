/* Return the number of total permutations of the provided string that don't have repeated consecutive letters. Assume that duplicate characters are each unique.

For example, aab should return 2 because it has 6 total permutations (aab, aab, aba, aba, baa, baa), but only 2 of them (aba and aba) don't have the same letter (in this case a) repeating. */

function permAlone(s) {
    
    var sLength = s.length;
    
    var permutations = function (s) {
    
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
                
                // if `perm` is the same length as initial string passed in @permAlone
                // check if `perm` has 2 repeated chars, if not push perm to `allPermutations
                if (perm.length === sLength) {

                    var checker = true;

                    for (var k = 0; k < perm.length; k++) {

                        if (perm[k] === perm[k + 1]) {
                            checker = false;
                            break;
                        }
                    }

                    if (checker) {
                        allPermutations.push(perm);
                    }
                } 
                else {
                    allPermutations.push(perm);
                }
            }
        }

        return allPermutations;
    };

    return permutations(s).length;
}
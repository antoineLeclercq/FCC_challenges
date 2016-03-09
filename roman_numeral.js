/* Convert the given number into a roman numeral.*/

var romanSpec = {
  1000: 'M',
  900: 'CM',
  500: 'D',
  400: 'CD',
  100: 'C',
  90: 'XC',
  50: 'L',
  40: 'XL',
  10: 'X',
  9: 'IX',
  5: 'V',
  4: 'IV',
  1: 'I'
};

// store keys and sort them in descending order for @buildRoman()
var romanSpecKeys = Object.keys(romanSpec).sort(function (a,b) {
  return b-a;
});

/**
 * @param {int} num
 * @return {array}
 * returns an array with num decomposition
 */
function getNumDecomposition(num){
  var arr = [];
  for(var i = 0; i < romanSpecKeys.length; i++){
    arr.push(Math.floor(num / romanSpecKeys[i]));
    num = num % romanSpecKeys[i];
  }
  return arr;
}

/**
 * @param {array} numDetailed
 * @return {string}
 * returns a roman number based on numDecomposition
 */
function buildRoman(numDecomposed){
  var result = '';
  for(var i = 0; i < romanSpecKeys.length; i++){
    result += romanSpec[romanSpecKeys[i]].repeat(numDecomposed[i]);
  }
  return result;
}


function intoRoman(num){

  var numDecomposed = getNumDecomposition(num);
  var numRoman = buildRoman(numDecomposed);

  return numRoman;
}

intoRoman(1099);
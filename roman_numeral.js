/* Convert the given number into a roman numeral.*/

/**
 * @param {int} num
 * @return {array}
 * depending on the spec, returns an array with num details
 */
function getNumDetails(num){
  var n = num;
  var arr = [];
  var spec = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  for(var i = 0; i < spec.length; i++){
    arr.push(parseInt(n / spec[i]));
    n = n % spec[i];
  }
  return arr;
}

/**
 * @param {string, int} romanLetter,numberOfTimes
 * @return {string}
 * returns a string containing `romanLetter` concatenated a `numberOfTimes`
 */
function concatRoman(romanLetter, numberOfTimes){
  var result = '';
  for(var i = 1; i <= numberOfTimes; i++){
    result += romanLetter;
  }
  return result;
}

/**
 * @param {array} numDetailed
 * @return {string}
 * returns a roman number based on `romanSpec` and `spec` from @getNumDetails
 */
function buildRoman(numDetailed){
  var romanSpec = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
  var result = '';
  for(var i = 0; i < numDetailed.length; i++){
    result += concatRoman(romanSpec[i], numDetailed[i]);
  }
  return result;
}


function convert(num){
  
  var num_details = getNumDetails(num);
  var num_roman = buildRoman(num_details);
  
  return num_roman;
}

convert(1099);

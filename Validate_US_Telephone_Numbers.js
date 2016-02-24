/*Return true if the passed string is a valid US phone number

The user may fill out the form field any way they choose as long as it is a valid US number. The following are examples of valid formats for US numbers (refer to the tests below for other variants):

555-555-5555

(555)555-5555

(555) 555-5555

555 555 5555

5555555555

1 555 555 5555*/


function telephoneCheck(str) {
  var numbersOnly;

  // check for any character that is not an int|parentheses|dash|space, also check for double dashes or double space
  if (/[^\d\-\)\( ]/gi.test(str) ||
      (isNaN(parseInt(str[0])) && str[0] !== '(')) {
    return false;
  }

  // remove any non int char
  numbersOnly = str.replace(/[\-\)\( ]/g,'');
  // check phone number length
  if (numbersOnly.length !== 11 && numbersOnly.length !== 10) {
    return false;
  }

  // if phone number contains country code
  if (numbersOnly.length === 11) {
    // if country code is 1 and correct patterns (`1 (5`|`1(5`|`1 5`|`1 (5`) is not respected
    if (str.search(/1 \(\d|1 \d|1\(\d|1\d/) !== 0) {
      return  false;
    // if a correct pattern is respected, remove country code and space if present
    } else {
      if (str.search(/1 /) === 0) {
        str = str.slice(2);
      } else {
        str = str.slice(1);
      }
    }
  }

  // check if number follows any of the correct patterns and return accordingly
  return str.search(/\d\d\d\d\d\d\d\d\d\d(?![\(\)\- )])/) === 0 ||
    str.search(/\d\d\d\-\d\d\d\-\d\d\d\d(?![\(\)\- )])/) === 0 ||
    str.search(/\(\d\d\d\)\d\d\d\-\d\d\d\d(?![\(\)\- )])/) === 0 ||
    str.search(/\(\d\d\d\) \d\d\d\-\d\d\d\d(?![\(\)\- )])/) === 0 ||
    str.search(/\d\d\d \d\d\d\ \d\d\d\d(?![\(\)\- )])/) === 0;

}



telephoneCheck("1 -(555)555-5555");
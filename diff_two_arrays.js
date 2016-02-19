/* Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both.
In other words, return the symmetric difference of the two arrays.*/

// depending on type of array elements sort array and get single elements
function sortAndGetSingleElements(arr){
  var singleElements = [];

  if(typeof singleTypeArr[0] === 'number') {
    arr.sort(function(a,b) {
      return a - b;
    });
  } else {
    arr.sort();
  }

  arr.forEach(function(element,index) {
    if(element !== singleTypeArr[index - 1] && element !== singleTypeArr[index + 1]) {
      singleElements.push(element);
    }
  });

  return singleElements;
}

function diff(arr1, arr2) {
  var diffArr,
      concatArr = arr1.concat(arr2),
      stringArr = [],
      numArr = [];

  concatArr.forEach(function(element, index) {
    var elementType = typeof element;
    if(elementType === 'string' ||
       elementType === 'boolean' ||
       element === null || elementType === 'undefined') {
      stringArr.push(element);
    } else if(elementType === 'number') {
      numArr.push(element);
    }
  });

  diffArr = sortAndGetSingleElements(stringArr).concat(sortAndGetSingleElements(numArr));

  return diffArr;
}

diff([1, "calf", 3, "piglet"], [1, "calf", 3, 4]);


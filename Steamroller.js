/*Flatten a nested array. You must account for varying levels of nesting.*/

/* @param: type[array, array], name[arr, flatArr]
 * @return: none
 * recursively loops through each element of arr and pushes every non array element to flatArr
**/
function flattenArr(arr, flatArr) {
  arr.forEach(function(element) {
    if (Array.isArray(element)) {
      flattenArr(element, flatArr);
    } else {
      flatArr.push(element);
    }
  });
}

function steamroller(arr) {
  var flatArr = [];

  flattenArr(arr,flatArr);

  return flatArr;
}

steamroller([1, [], {}, [3, [[4,3],5], 6]]);

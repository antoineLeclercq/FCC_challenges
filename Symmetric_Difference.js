/*Create a function that takes two or more arrays and returns an array of the symmetric difference (△ or ⊕) of the provided arrays.

Given two sets (for example set A = {1, 2, 3} and set B = {2, 3, 4}), the mathematical term "symmetric difference" of two sets is the set of elements which are in either of the two sets, but not in both (A △ B = C = {1, 4}). For every additional symmetric difference you take (say on a set D = {2, 3}), you should get the set with elements which are in either of the two the sets but not both (C △ D = {1, 4} △ {2, 3} = {1, 2, 3, 4}).*/


/* @param: type[int, array, array], name{startIndex, sourceArr: sorted array, destinationArr}
 * @return: none
 * loops through `sourceArr` starting at `startIndex` and pushes all elements to `destinationArr`  unless it is a duplicate
**/
function pushRemainingElements(startIndex, sourceArr, destinationArr) {
  for (var i = startIndex; i < sourceArr.length; i++) {
    if (sourceArr[i] !== sourceArr[i - 1]) {
      destinationArr.push(sourceArr[i]);
    }
  }
}

/* @param: type[array, array], name{allArrays: array of arrays, diffArr}
 * @return: none
 * recursively takes the first two arrays of `allArrays` and pushes the difference to `diffArr` then removes the two first arrays of allArrays and pushes diffArr at the front of allArrays until allArrays until contains diffArr
**/
function getDifference(allArrays, diffArr) {
  var arr1 = allArrays[0], arr2 = allArrays[1], arr1Index, arr2Index;

  // sorts two first arrays of allArrays in order to loop through them in order
  arr1.sort();
  arr2.sort();

  // compare each element of each array and increase arr1Index or arr2Index adequately
  for (arr1Index = 0, arr2Index= 0; arr1Index < arr1.length && arr2Index < arr2.length; ) {
    // if element of arr1 === element of arr2 then increase both index
    if (arr1[arr1Index] === arr2[arr2Index]) {
      arr1Index++;
      arr2Index++;
    // if element of arr1 is less than element of arr2 then push arr1 element to diffArr except if it is a duplicate
    } else if (arr1[arr1Index].toString() < arr2[arr2Index].toString()) {
      if (arr1[arr1Index] !== arr1[arr1Index - 1]) {
        diffArr.push(arr1[arr1Index]);
      }
      arr1Index++;
    // if element of arr2 is less than element of arr1 then push arr2 element to diffArr except if it is a duplicate
    } else {
      if (arr2[arr2Index] !== arr2[arr2Index - 1]) {
        diffArr.push(arr2[arr2Index]);
      }
      arr2Index++;
    }
  }

  //push remaining elements of arr1 to diffArr starting at arr1Index current value
  pushRemainingElements(arr1Index, arr1, diffArr);
  //remove arr1 from allArrays
  allArrays.shift();

  //push remaining elements of arr2 to diffArr starting at arr2Index current value
  pushRemainingElements(arr2Index, arr2, diffArr);
  //remove arr2 from allArrays
  allArrays.shift();

  // adds diffArr at the front of allArrays
  allArrays.unshift(diffArr);

  // if allArrays contains more elements than diffArr, return a recursive call to the function
  if (allArrays.length > 1) {
    diffArr = [];
    return getDifference(allArrays, diffArr);
  }

  return diffArr;
}

function sym() {
  var diffArr = [], argsArr = [];

  // push each argument of sym() to argsArr in order to use Array.prototype methods on argsArr
  for (var i = 0; i < arguments.length; i++) {
    argsArr.push(arguments[i]);
  }

  // if argsArr contains more than one array call getDifference
  if (argsArr.length > 1) {
    return getDifference(argsArr, diffArr);
  }

  return argsArr[0];
}

sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5]);

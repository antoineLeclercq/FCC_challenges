/* Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both.
In other words, return the symmetric difference of the two arrays.*/

function pushRemainingElements(startIndex, sourceArr, destinationArr) {
  for (var i = startIndex; i < sourceArr.length; i++){
    destinationArr.push(sourceArr[i]);
  }
}

function diff(arr1, arr2) {
  var diffArr = [];
  var i, j;

  arr1.sort();
  arr2.sort();

  for (i = 0, j= 0; i < arr1.length && j < arr2.length; ) {
    if (arr1[i] === arr2[j]) {
      i++;
      j++;
    } else if (arr1[i].toString() < arr2[j].toString()) {
      diffArr.push(arr1[i]);
      i++;
    } else {
      diffArr.push(arr2[j]);
      j++;
    }
  }

  pushRemainingElements(i, arr1, diffArr);
  pushRemainingElements(j, arr2, diffArr);

  return diffArr;
}

diff([1, 3, "calf", "piglet"], [1, 3, 4, "calf", "dino"]);


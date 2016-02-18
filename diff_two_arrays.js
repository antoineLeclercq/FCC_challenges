/* Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both. 
In other words, return the symmetric difference of the two arrays./*

/**
 * @param {int|string, array} val, arr
 * @return {boolean}
 * returns true if `val` is not in `arr`, otherwise returns false
 */
function filterLoop(val, arr){
  for(var i = 0; i < arr.length; i++){
      if(val === arr[i]){
        return false;
      }
   }
   return true;
}

function diff(arr1, arr2) {
  var newArr = [];
  
  var arr1_filtered = arr1.filter(function(val){
     return filterLoop(val, arr2);
  });
  
  var arr2_filtered = arr2.filter(function(val){
     return filterLoop(val, arr1);
  });
  
  newArr = arr1_filtered.concat(arr2_filtered);
  
  return newArr;
}

diff([1, 2, 5, 8, 9], [1, 2, 3, 4, 5]);

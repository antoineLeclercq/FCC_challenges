/* 
Make a function that looks through an array of objects (first argument) and returns an array of all objects that have 
matching property and value pairs (second argument). Each property and value pair of the source object has to be present
in the object from the collection if it is to be included in the returned array.

For example, if the first argument is 
[{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], 
and the second argument is { last: "Capulet" }, then you must return the third object from the array (the first argument), 
because it contains the property and it's value, that was passed on as the second argument.
/*

function where(collection, source) {
  
  var arr = [];
  var sourceKeys = Object.keys(source);
  // delcaration out of for loop to save memory
  var check;
  
  // for each object in collection
  for(var i = 0; i < collection.length ; i++){
    // for each key in source object
    for(var j = 0; j < sourceKeys.length; j++){
      // if collection object has source key and corresponding value
      if(collection[i].hasOwnProperty(sourceKeys[j]) &&
         collection[i][sourceKeys[j]] === source[sourceKeys[j]]){
        check = true;
      } else {
        check = false;
        break;
      }
    }
    if(check){
      arr.push(collection[i]);
    }
  }
  
  return arr;
}

where([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });

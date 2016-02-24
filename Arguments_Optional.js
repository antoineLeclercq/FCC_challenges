/*Create a function that sums two arguments together. If only one argument is provided, then return a function that expects one argument and returns the sum.

For example, add(2, 3) should return 5, and add(2) should return a function.

Calling this returned function with a single argument will then return the sum:

var sumTwoAnd = add(2);

sumTwoAnd(3) returns 5.

If either argument isn't a valid number, return undefined.*/


function add() {
  var args = arguments, result;

  // if more than 2 arguments, return undefined
  if (args.length > 2) {
    return undefined;
  }

  // check if all arguments are integers
  for(var index in args){
    var element = args[index];
    if (!Number.isInteger(element)) {
      return undefined;
    }
  }

  // if only one argument, return an anonymous function adding the argument passed to add and the argument passed to the anonymous function
  if (args.length === 1) {
    return function() {
      var argsReturn = arguments;
      if (argsReturn.length === 1 && Number.isInteger(argsReturn[0])) {
        return args[0] + argsReturn[0];
      }
    };
  }

  result = args[0] + args[1];

  return result;
}

add(2)(3);

/* Fill in the object constructor with the methods specified in the tests.

Those methods are getFirstName(), getLastName(), getFullName(), setFirstName(first),
setLastName(last), and setFullName(firstAndLast).

All functions that take an argument have an arity of 1, and the argument will be a string.

These methods must be the only available means for interacting with the object.*/

var Person = function(firstAndLast) {
    
    var fullName = firstAndLast,
        fullNameArr = fullName.split(' '),
        firstName = fullNameArr[0],
        lastName = fullNameArr[1];
  
    this.getFirstName = function () {
        return firstName;
    };

    this.getLastName = function () {
        return lastName;
    };

    this.getFullName = function () {
        return fullName;
    };

    this.setFirstName = function (newFirstName) {
      
        firstName = newFirstName;
        fullName = firstName + ' ' + lastName;
    };

    this.setLastName = function (newLastName) {
      
        lastName = newLastName;
        fullName = firstName + ' ' + lastName;
    };

    this.setFullName = function (newFullName) {
      
        fullName = newFullName;
        fullNameArr = fullName.split(' ');
        firstName = fullNameArr[0];
        lastName = fullNameArr[1];
    };
};

var bob = new Person('Bob Ross');
bob.getFirstName();

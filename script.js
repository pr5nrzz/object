/* Example1
var strPrimitive = "I am a primitive string";
console.log(typeof strPrimitive); // "string"
console.log(strPrimitive instanceof String); // false

var strObject = new String("I am a string object");
console.log(typeof strObject); // "object"
console.log(strObject instanceof String); // true

// inspect the object subtype
console.log(Object.prototype.toString.call(strObject)); // [object String]
*/

/* Example2 
// var strPrimitive = "I am a primitive string";
// console.log(strPrimitive.length); // wrapper object
// console.log(strPrimitive.charAt(3)); // Wrapper object

var date = new Date();
*/

/* Example3
var obj = {
    a: 2
};

// To access the value at location a in obj, either of the below can be used.
// They both are accessing the same location
console.log(obj.a); // Property access
console.log(obj["a"]); // Key access

var wantA = true;
var myObject = {
    a: 2
};

var idx;

if (wantA) {
    idx = "a";
}

console.log(myObject[idx]); // myObject["a"];
*/

/* Example4
var myObject = {};

myObject[true] = "foo";
myObject[3] = "bar";
myObject[myObject] = 'baz';

console.log(myObject["true"]);
console.log(myObject["3"]);
console.log(myObject["[object Object]"]);

// Computed Property Names
var prefix = "foo";

var myObject = {
    [prefix + "bar"]: "Hello",
    [prefix + "baz"]: "World"
}

console.log(myObject["foobar"]);
console.log(myObject["foobaz"]);
*/

/* Example5
var myArray = ["foo", 42, "bar"];

console.log(myArray.length);
console.log(myArray[0]);
console.log(myArray[2]);

myArray.baz = "baz";
console.log(myArray.length);
console.log(myArray.baz);

myArray["3"] = "baz";
console.log(myArray.length);
console.log(myArray[3]);
console.log(myArray["3"]);
*/



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

/* Example6 
function anotherFunction() { } // 333
// anotherFunction -> [function() {}] 

var anotherObject = { // 111
    c: true
};
// anotherObject -> [{ c: true }]

var anotherArray = []; // 222
// another Array -> [[]]

var myObject = { // 444
    a: 2,               // copy of value 2
    b: anotherObject,	// reference, not a copy! (111)
    c: anotherArray,	// another reference! (222)
    d: anotherFunction  // 333
};

anotherArray.push(anotherObject, myObject);

// Solution1
var sample = { a: 2 };
var newObj = JSON.parse(JSON.stringify(sample));
// var newObj = JSON.parse(JSON.stringify(myObject));

//Solution2
var example = {};
Object.hasOwn(example, "prop"); // false - 'prop' has not been defined

example.prop = "exists";
Object.hasOwn(example, "prop"); // true - 'prop' has been defined

example.prop = null;
Object.hasOwn(example, "prop"); // true - own property exists with value of null

example.prop = undefined;
Object.hasOwn(example, "prop"); // true - own property exists with value of undefined

var example = {};
example.prop = "exists";

// `hasOwn` will only return true for direct properties:
Object.hasOwn(example, "prop"); // true
Object.hasOwn(example, "toString"); // false
Object.hasOwn(example, "hasOwnProperty"); // false

// The `in` operator will return true for direct or inherited properties:
"prop" in example; // true
"toString" in example; // true
"hasOwnProperty" in example; // true

var newObj = Object.assign({}, myObject); // Object.assign() copies property values.

newObj.a;						// 2
newObj.b === anotherObject;		// true
newObj.c === anotherArray;		// true
newObj.d === anotherFunction;	// true

var obj1 = {
    a: 0,
    b: {
        c: 0
    }
};
var obj2 = Object.assign({}, obj1);
console.log(obj2); // { a: 0, b: { c: 0 } }

obj1.a = 1;
console.log(obj1); // { a: 1, b: { c: 0 } }
console.log(obj2); // { a: 0, b: { c: 0 } }

obj2.a = 2;
console.log(obj1); // { a: 1, b: { c: 0 } }
console.log(obj2); // { a: 2, b: { c: 0 } }

obj2.b.c = 3;
console.log(obj1); // { a: 1, b: { c: 3 } }
console.log(obj2); // { a: 2, b: { c: 3 } }

var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };

var obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1); // { a: 1, b: 2, c: 3 }, target object itself is changed.
console.log(o2); // { b: 2 }
*/

/* Example7
// Part1
var myObject = {
    a: 2
};

console.log(Object.getOwnPropertyDescriptor(myObject, "a"));
// {
//     configurable: true
//     enumerable: true
//     value: 2
//     writable: true
// }

// Part2
var myObject = {};

Object.defineProperty(myObject, "a", {
    value: 2,
    writable: true,
    configurable: true,
    enumerable: true
});

console.log(myObject.a); // 2

// Part3
var myObject = {};

Object.defineProperty(myObject, "a", {
    value: 2,
    writable: false, // not writable!
    configurable: true,
    enumerable: true
});

myObject.a = 3; // modification of the value silently failed

console.log(myObject.a); // 2

// In strict mode it throws error
"use strict";

var myObject = {};

Object.defineProperty(myObject, "a", {
    value: 2,
    writable: false, // not writable!
    configurable: true,
    enumerable: true
});

myObject.a = 3; // TypeError: "a" is read-only

// Part4
var myObject = {
    a: 2
};

myObject.a = 3;
console.log(myObject.a);					// 3

Object.defineProperty(myObject, "a", {
    value: 4,
    writable: true,
    configurable: false,	// not configurable!
    enumerable: true
});

myObject.a;					// 4
myObject.a = 5;
console.log(myObject.a);					// 5

Object.defineProperty(myObject, "a", {
    value: 6,
    writable: true,
    configurable: true,
    enumerable: true
}); // TypeError: can't redefine non-configurable property "a"


// Note: There’s a nuanced exception to be aware of: even if the property is already configurable:false, writable can always be changed from true to false without error, but not back to true if already false.
Object.defineProperty(myObject, "a", {
    value: 6,
    writable: false,
    configurable: false,
    enumerable: true
});

Object.defineProperty(myObject, "a", {
    value: 6,
    writable: true,
    configurable: false,
    enumerable: true
}); // can't redefine non-configurable property "a"

// Another thing configurable:false prevents the ability to use the delete operator to remove an existing property.
// delete is just an object property removal operation – nothing more.
// If an object property is the last remaining reference to some object/function, and you delete it, that removes the reference and now that unreferenced object/function can be garbage collected. 
// But, it is not proper to think of delete as a tool to free up allocated memory as it does in other languages (like C/C++). 
var myObject = {
    a: 2
};

console.log(myObject.a);				// 2
delete myObject.a;
console.log(myObject.a);				// undefined

Object.defineProperty(myObject, "a", {
    value: 2,
    writable: true,
    configurable: false,
    enumerable: true
});

console.log(myObject.a);				// 2
delete myObject.a;
console.log(myObject.a);				// 2
*/

/* Example8
var myObject = {};

Object.defineProperty(myObject, "FAVORITE_NUMBER", {
    value: 42,
    writable: false,
    configurable: false
});
*/

/* Example9
var myObject = {
    a: 2
};

Object.preventExtensions( myObject );

myObject.b = 3;
myObject.b; // undefined

// Note: In non-strict mode, the creation of b fails silently. In strict mode, it throws a TypeError.
*/

/* Example10
var myObject = {
    a: 2 
};

console.log(myObject.a); // 2

console.log(myObject.b); // undefined
*/

/* Example11
// Part1
var myObject = {
    // define a getter for 'a'
    get a() {
        return 2;
    }
};

Object.defineProperty(
    myObject, // target
    "b", // property name
    { // desscriptor
        // define a getter for 'b'
        get: function() {
            return this.a * 2;
        },
        enumerable: true // make sure 'b' shows up as an object property
    }
);

console.log(myObject.a); // 2
console.log(myObject.b); // 4
// Note: Since we only defined a getter for a, if we try to set the value of a later, 
// the set operation won’t throw an error but will just silently throw the assignment away. 
// Even if there was a valid setter, our custom getter is hard-coded to return only 2, so the set operation would be moot.

var myObject = {
    // define a getter for 'a'
    get a() {
        return this._a_;
    },
    // define a setter for 'a'
    set a(val) {
        this._a_ = val * 2;
    }
};

myObject.a = 2;

console.log(myObject.a);

// Part2
var myObject = {
    a: 2
};

console.log("a" in myObject); // true
console.log("b" in myObject); // false

console.log(myObject.hasOwnProperty("a")); // true
console.log(myObject.hasOwnProperty("b")); // false

var newObj = Object.create(null);
console.log(newObj);
// console.log(newObj.hasOwnProperty("a"));
console.log(Object.prototype.hasOwnProperty.call(newObj, "a"));

var arr = [2, 4, 6];
console.log(4 in arr);
*/

/* Example12
var myObject = {};

Object.defineProperty(
    myObject,
    "a",
    // make 'a' enumerable as normal
    { enumerable: true, value: 2 }
);

Object.defineProperty(
    myObject,
    "b",
    // make 'b' NON-enumerable
    { enumerable: false, value: 4 }
);

console.log(myObject.b); // 4
console.log("b" in myObject); // true
console.log(myObject.hasOwnProperty("b")); // true

for (var k in myObject) { // 'b' doesn’t show up in a for..in loop 
    console.log(k, myObject[k]); // a 2
}

// Another way that enumerable and non-enumerable properties can be distinguished:
var myObject = {};

Object.defineProperty(
    myObject,
    "a",
    // make 'a' enumerable as normal
    { enumerable: true, value: 2 }
);

Object.defineProperty(
    myObject,
    "b",
    // make 'b' NON-enumerable
    { enumerable: false, value: 4 }
);

// propertyIsEnumerable(..) tests whether the given property name exists directly on the object and is also enumerable:true
console.log(myObject.propertyIsEnumerable("a")); // true
console.log(myObject.propertyIsEnumerable("b")); // false

// Object.keys(..) returns an array of all enumerable properties, 
// whereas Object.getOwnPropertyNames(..) returns an array of all properties, enumerable or not.
console.log(Object.keys(myObject)); // ["a"]
console.log(Object.getOwnPropertyNames(myObject)); // ["a", "b"]
*/

/* Example13
// Part1
var myArray = [1, 2, 3];

for (var i = 0; i < myArray.length; i++) {
	console.log( myArray[i] );
}
// 1 2 3

var values = myArray.forEach(function cb(el) {
    return el * 2;
});

// Part2
var myArray = [ 1, 2, 3 ];

for (var v of myArray) {
	console.log( v );
}
// 1
// 2
// 3

var myArray = [ 1, 2, 3 ];
var it = myArray[Symbol.iterator]();

console.log(it.next()); // { value: 1, done: false }
console.log(it.next()); // { value: 2, done: false }
console.log(it.next()); // { value: 3, done: false }
console.log(it.next()); // { value: undefined, done: true }
// Note: We get at the @@iterator internal property of an object using an ES6 Symbol: Symbol.iterator.
// @@iterator is not the iterator object itself, but a function that returns the iterator object – a subtle but important detail!

// Define @@iterator in object
var myObject = {
    a: 2, 
    b: 4
};

Object.defineProperty(
    myObject,
    Symbol.iterator,
    {
        enumerable: false,
        writable: false,
        configurable: true,
        value: function() { // @@iterator
            var o = this;
            var idx = 0;
            var ks = Object.keys(o); // ['a', 'b']
            
            return { // it
                next: function() {
                    return {
                        value: o[ks[idx++]],
                        done: (idx > ks.length)
                    }
                }
            }
        }
    }
);

var it = myObject[Symbol.iterator]();

console.log(it.next());
console.log(it.next());
console.log(it.next());

for (var v of myObject) {
	console.log( v );
}
*/
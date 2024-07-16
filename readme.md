-> object comes in two forms: the declarative (literal) form and the constructed form.
    var myObj = { // Object literal
        key: value
    };

    var myObject = new Object(); // Object constructor
    myObject.key = value;

-> The literal form and the contructor form results in exactly same sort of object. The only difference is you can add one or more key/pairs to the literal declaration, whereas in the constructed form, you must add properties one by one.

-> Bult-in JavaScript objects:
    1. String
    2. Number
    3. Boolean
    4. BigInt
    5. Symbol
    6. Object
    7. Array
    8. Function
    9. Date
    10. RegEx
    11. Error

-> In JS, these are just built-in functions. Each of these built-in functions can be used as a contructor (invoking function using the new operator), resulting in newly constructed object of the sub-type in question. See Example1.

-> In Example1, the primitive value "I am a primitive string" is not an object. It is a primitive literal and immutable value. To perform operations on it, such as checking it's length, accessing it's individual characters content, etc, a String object is required. 

-> Luckily, JS automatically coerces "string" primitive to String object whenever necessary. See Example2. 

-> null and undefined have no wrapper form, only their primitive values. Date values can only be created by their contructed object form as they have no literal form.

-> In JS, Object containers consists of property names, which acts as pointers (technically references) to the location where values are stored. See Example3. 

-> In objects. property names are always strings. If any other value other than string (primitive) is isused, it will be first converted to string. See Example4. 

-> Arrays assumes numeric indexing, which means values are stored in locations, usally referred to as indices at non-negative integers. Arrays are objects, so even though each index is a positive integer, you can also add properties to the array. See Example5.

Duplicating Objects:
--------------------
Q. What is the difference between shallow copy and deep copy?
A. -> In Example6, a shallow copy would end up with 'a' on the new object as a copy of the value 2, but b, c, and d properties as just references to the same places as the references in the original object.
-> A deep copy would duplicate not only 'myObject', but 'anotherObject' and 'anotherArray'.
-> But then we have issues that 'anotherArray' has references to 'anotherObject' and 'myObject' in it, so those should also be duplicated rather than reference-preserved. Now we have an infinite circular duplication problem because of the circular reference.

Q. How to fix the above issue?
A. -> One subset solution is that objects which are JSON-safe (that is, can be serialized to a JSON string and then re-parsed to an object with the same structure and values) can easily be duplicated with. See Solution1.
-> At the same time, a shallow copy is fairly understandable and has far less issues, so ES6 has now defined Object.assign(..) for this task. Object.assign(..) takes a target object as its first parameter, and one or more source objects as its subsequent parameters. It iterates over all the enumerable, owned keys (immediately present) on the source object(s) and copies them (via = assignment only) to target. It also, helpfully, returns target. See Solution2.

Property Descriptors (Data Descriptors):
----------------------------------------
-> Prior to ES5, the JavaScript language gave no direct way for your code to inspect or draw any distinction between the characteristics of properties, such as whether the property was read-only or not. But as of ES5, all properties are described in terms of a property descriptor. See Example7 (Part1).
-> We can use Object.defineProperty(..) to add a new property, or modify an existing one (if it’s configurable!), with the desired characteristics. See Example7 (Part2).
-> The ability for you to change the value of a property is controlled by writable. See Example7 (Part3).
-> As long as a property is currently configurable, we can modify its descriptor definition, using the same defineProperty(..) utility. See Example7 (Part4).
-> Enumerable characteristic controls if a property will show up in certain object-property enumerations, such as the for..in loop. Set to 'false' to keep it from showing up in such enumerations, even though it’s still completely accessible. Set to 'true' to keep it present.
Note: All normal user-defined properties are defaulted to enumerable, as this is most commonly what you want. But if you have a special property you want to hide from enumeration, set it to enumerable:false.

Immutability:
-------------
-> It is sometimes desired to make properties or objects that cannot be changed (either by accident or intentionally). ES5 adds support for handling that in a variety of different nuanced ways.
-> It’s important to note that all of these approaches create shallow immutability. That is, they affect only the object and its direct property characteristics. If an object has a reference to another object (array, object, function, etc), the contents of that object are not affected, and remain mutable.
    myImmutableObject.foo; // [1,2,3]
    myImmutableObject.foo.push( 4 );
    myImmutableObject.foo; // [1,2,3,4]
-> We assume in this snippet that myImmutableObject is already created and protected as immutable. But, to also protect the contents of myImmutableObject.foo (which is its own object – array), you would also need to make foo immutable, using one or more of the following functionalities:

    Object Constant:
    ----------------
    -> By combining writable:false and configurable:false, you can essentially create a constant (cannot be changed, redefined or deleted) as an object property. See Example8.

    Prevent Extensions:
    -------------------
    -> If you want to prevent an object from having new properties added to it, but otherwise leave the rest of the object’s properties alone, call Object.preventExtensions(..). See Example9.

    Seal:
    -----
    -> Object.seal(..) creates a “sealed” object, which means it takes an existing object and essentially calls Object.preventExtensions(..) on it, but also marks all its existing properties as configurable:false.
    -> So, not only can you not add any more properties, but you also cannot reconfigure or delete any existing properties (though you can still modify their values).

    Freeze:
    -------
    -> Object.freeze(..) creates a frozen object, which means it takes an existing object and essentially calls Object.seal(..) on it, but it also marks all “data accessor” properties as writable:false, so that their values cannot be changed.
    -> This approach is the highest level of immutability that you can attain for an object itself, as it prevents any changes to the object or to any of its direct properties (though, as mentioned above, the contents of any referenced other objects are unaffected).
    -> You could “deep freeze” an object by calling Object.freeze(..) on the object, and then recursively iterating over all objects it references (which would have been unaffected thus far), and calling Object.freeze(..) on them as well. Be careful, though, as that could affect other (shared) objects you’re not intending to affect.

[[Get]]:
--------
-> In Example10, the myObject.a is a property access, but it doesn’t just look in myObject for a property of the name a, as it might seem.
-> According to the spec, the code above actually performs a [[Get]] operation (kinda like a function call: [[Get]]()) on the myObject. The default built-in [[Get]] operation for an object first inspects the object for a property of the requested name, and if it finds it, it will return the value accordingly.
-> However, the [[Get]] algorithm defines other important behavior if it does not find a property of the requested name, it traverses up the [[Prototype]] chain.
-> But one important result of this [[Get]] operation is that if it cannot through any means come up with a value for the requested property, it instead returns the value undefined.

[[Put]]:
--------
-> When invoking [[Put]], how it behaves differs based on a number of factors, including (most impactfully) whether the property is already present on the object or not.
-> If the property is present, the [[Put]] algorithm will roughly check:
    1. Is the property an accessor descriptor (see “Getters & Setters” section below)? If so, call the setter, if any.
    2. Is the property a data descriptor with writable of false? If so, silently fail in non-strict mode, or throw TypeError in strict mode.
    3. Otherwise, set the value to the existing property as normal.
Note: If the property is not yet present on the object in question, the [[Put]] operation is even more nuanced and complex.

Getters & Setters:
------------------
-> The default [[Put]] and [[Get]] operations for objects completely control how values are set to existing or new properties, or retrieved from existing properties, respectively.
-> ES5 introduced a way to override part of these default operations, not on an object level but a per-property level, through the use of getters and setters.
-> Getters are properties which actually call a hidden function to retrieve a value. 
-> Setters are properties which actually call a hidden function to set a value.
-> When you define a property to have either a getter or a setter or both, its definition becomes an “accessor descriptor” (as opposed to a “data descriptor”).
-> For accessor-descriptors, the value and writable characteristics of the descriptor are moot and ignored, and instead JS considers the set and get characteristics of the property (as well as configurable and enumerable).
-> In Example11 Part1, either through object-literal syntax with get a() { .. } or through explicit definition with defineProperty(..), in both cases we created a property on the object that actually doesn’t hold a value, but whose access automatically results in a hidden function call to the getter function, with whatever value it returns being the result of the property access.
-> In Example11 Part2:
    -> The 'in' operator will check to see if the property is in the object, or if it exists at any higher level of the [[Prototype]] chain object traversal.
    -> By contrast, hasOwnProperty(..) checks to see if only myObject has the property or not, and will not consult the [[Prototype]] chain.
    -> hasOwnProperty(..) is accessible for all normal objects via delegation to Object.prototype. But it’s possible to create an object that does not link to Object.prototype (via Object.create(null)). In this case, a method call like myObject.hasOwnProperty(..) would fail.
    -> In that scenario, a more robust way of performing such a check is Object.prototype.hasOwnProperty.call(myObject,"a"), which borrows the base hasOwnProperty(..) method and uses explicit 'this' binding to apply it against our myObject.
    Note: The 'in' operator has the appearance that it will check for the existence of a value inside a container, but it actually checks for the existence of a property name. This difference is important to note with respect to arrays, as the temptation to try a check like 4 in [2, 4, 6] is strong, but this will not behave as expected.

Enumeration:
------------
-> See Example 12.

Iteration:
----------
-> The for..in loop iterates over the list of enumerable properties on an object (including its [[Prototype]] chain). But what if you instead want to iterate over the values?
-> In Example13, Part1, This isn’t iterating over the values, though, but iterating over the indices, where you then use the index to reference the value, as myArray[i].
-> ES5 also added several iteration helpers for arrays, including forEach(..), every(..), and some(..). Each of these helpers accepts a function callback to apply to each element in the array, differing only in how they respectively respond to a return value from the callback.
-> forEach(..) will iterate over all values in the array, and ignores any callback return values. every(..) keeps going until the end or the callback returns a false (or “falsy”) value, whereas some(..) keeps going until the end or the callback returns a true (or “truthy”) value.
-> These special return values inside every(..) and some(..) act somewhat like a break statement inside a normal for loop, in that they stop the iteration early before it reaches the end.
-> If you iterate on an object with a for..in loop, you’re also only getting at the values indirectly, because it’s actually iterating only over the enumerable properties of the object, leaving you to access the properties manually to get the values.
Note: As contrasted with iterating over an array’s indices in a numerically ordered way (for loop or other iterators), the order of iteration over an object’s properties is not guaranteed and may vary between different JS engines. Do not rely on any observed ordering for anything that requires consistency among environments, as any observed agreement is unreliable.
->  ES6 adds a for..of loop syntax for iterating over arrays (and objects, if the object defines its own custom iterator). See Example 13, Part2. 
    -> The for..of loop asks for an iterator object (from a default internal function known as @@iterator in spec-speak) of the thing to be iterated, and the loop then iterates over the successive return values from calling that iterator object’s next() method, once for each loop iteration.
    -> Arrays have a built-in @@iterator, so for..of works easily on them, as shown.
    -> While arrays do automatically iterate in for..of loops, regular objects do not have a built-in @@iterator.
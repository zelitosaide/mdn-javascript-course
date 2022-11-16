label01: {
  const test = {
    prop: 42,
    func: function () {
      return this.prop;
    }
  };
  console.log(test.func());
  // expected output: 42
}

// Global context

/**
 * In the global execution context (outside of any 
 * function), "this" refers to the global object whether 
 * in strict mode or not. 
 */

label02: {
  // In web browsers, the window object is also the global object:
  // console.log(this === window);   // true

  try {
    a = 37;
    console.log(window.a);    // 37

    this.b = "MDN";
    console.log(window.b);    // "MDN"
    console.log(b);           // "MDN"
  } catch (error) {
    console.log(error);
  }

  /**
   * Note: You can always easily get the global object 
   * using the global globalThis property, regardless of 
   * the current context in which your code is running. 
   */
}

// Function context

/**
 * Inside a function, the value of "this" depends on how 
 * the function is called. 
 */

label03: {
  /**
   * Since the following code is not in "strict mode", and 
   * because the value of "this" is not set by the "call", 
   * "this" will default to the "global object", which is 
   * "window" in a browser. 
   */
  function f1() {
    return this;
  }

  // In a browser:
  try {
    console.log(f1() === window);   // true
  } catch (error) {
    console.log(error);
  }

  // In Node:
  console.log(f1() === globalThis);   // true
}

label04: {
  /**
   * In "strict mode", however, if the value of "this" is 
   * not set when entering an execution context, it 
   * remains as "undefined", as shown in the following 
   * example: 
   */
  f2 = function () {
    "use strict";   // see strict mode
    return this;
  }

  /** 
   * OR
   * 
   * function f2() {
   *    "use strict";   // see strict mode
   *    return this;
   * }
   * 
   * OR
   * 
   * var f2 = function () {
   *    "use strict";   // see strict mode
   *    return this; 
   * }
   * 
   * but the functions are not bind to the global object
  */


  console.log(globalThis.f2() === globalThis);    // true
  console.log(f2() === undefined);    // true

  /**
   * Note: In the second example, "this" should be 
   * undefined, because f2 was called "directly" and not 
   * as a "method" or "property" of an object (e.g. 
   * "window.f2()"). 
   * 
   * This feature wasn't implemented in some browsers when 
   * they first started to support strict mode. As a 
   * result, they incorrectly returned the window object. 
   */

  /**
   * To set the value of "this" to a particular value when 
   * calling a function, use "call()", or "apply()" as in 
   * the examples below. 
   */
}


// Class context

/**
 * The behavior of "this" in "classes" and "functions" is 
 * similar, since classes are functions under the hood. 
 * But there are some differences and caveats. 
 */

label05: {
  /**
   * Within a class constructor, "this" is a regular 
   * object. All non-static methods within the class are 
   * added to the prototype of "this": 
   */
  class Example {
    constructor() {
      const proto = Object.getPrototypeOf(this);
      console.log(Object.getOwnPropertyNames(proto));
    }

    first() { }
    second() { }
    static third() { }
  }

  new Example();  // ['constructor', 'first', 'second']

  /**
   * Note: Static methods are not properties of "this". 
   * They are properties of the class itself.
   */
}


// Derived classes

/**
 * Unlike base class constructors, derived constructors 
 * have no initial "this" binding. Calling super() creates 
 * a this binding within the constructor and essentially 
 * has the effect of evaluating the following line of 
 * code, where Base is the inherited class: 
 * 
 * this = new Base();
 * 
 * Warning: Referring to "this" before calling super() 
 * will throw an error. 
 */

label06: {
  /**
   * Derived classes must not return before calling 
   * super(), unless they return an Object or have no 
   * constructor at all. 
   */

  class Base { }
  class Good extends Base { }
  class AlsoGood extends Base {
    constructor() {
      return { a: 5 };
    }
  }
  class Bad extends Base {
    constructor() { }
  }

  console.log(new Good() instanceof Base);
  console.log(new AlsoGood() instanceof Base);
  try {
    console.log(new Bad());
  } catch (error) {
    console.log(error);
  }
}


// Examples

// this in function contexts

label07: {
  // An object can be passed as the first argument to call
  // or apply and this will be bound to it.
  const obj = { a: "Custom" };

  // Variables declared with var become properties of the global object.
  var a = "Global";

  function whatsThis() {
    return this.a;
    // The value of this is dependent on how the function is called
  }

  console.log(whatsThis());
  // "Global" as this in the function isn't set, so it defaults to the global/window object in no-strict mode

  console.log(whatsThis.call(obj));
  // "Custom" as this in the function is set to obj

  console.log(whatsThis.apply(obj));
  // "Custom" as this in the function is set to obj
}


// this and object conversion

label08: {
  function add(c, d) {
    return this.a + this.b + c + d;
  }

  const o = { a: 1, b: 3 };

  // The first parameter is the object to use as
  // "this", subsequent parameters are passed as
  // arguments in the function call
  console.log(add.call(o, 5, 7));   // 16

  // The first parameter is the object to use as
  // "this", the second is an array whose
  // members are used as the arguments in the function call
  console.log(add.apply(o, [10, 20]));    // 34


  /**
   * Note that in non-strict mode, with "call" and "apply",
   * if the value passed as "this" is not an object, an 
   * attempt will be made to convert it to an object. 
   * Values "null" and "undefined" become the global 
   * object.
   * 
   * Primitives like "7" or "foo" will be converted to an 
   * Object using the related constructor, so the 
   * primitive number "7" is converted to an object as if 
   * by "new Number(7)" and the string "foo" to an object 
   * as if by "new String("foo")", e.g.
   */

  function bar() {
    // "use strict";
    console.table(Object.prototype.toString.call(this));
    // return this;
  }

  bar.call(null);       // [object global]
  bar.call(undefined);  // [object global]
  bar.call(7);          // [object Number]
  bar.call("foo");      // [object String]
}


// The bind() method

/**
 * ECMAScript 5 introduced "Function.prototype.bind()". 
 * Calling "f.bind(someObject)" creates a new function 
 * with the same body and scope as "f", but where "this" 
 * occurs in the original function, in the new function it
 * is permanently bound to the first argument of "bind", 
 * regardless of how the function is being used.
 */

label09: {
  function f() {
    return this.a;
  }

  const g = f.bind({ a: "azerty" });
  console.log(g());   // azerty

  const h = g.bind({ a: "yoo" }); // bind only works once!
  console.log(h());   // azerty

  const o = { a: 37, f, g, h };
  console.log(o.a, o.f(), o.g(), o.h());
}


// Arrow functions

label10: {
  /**
   * In arrow functions, "this" retains the value of the 
   * enclosing lexical context's "this". In global code, 
   * it will be set to the global object: 
   */
  const globalObject = this;
  const foo = () => this;
  console.log(globalObject === foo());
}

label11: {
  /**
   * Note: if "this" arg is passed to "call", "bind", or 
   * "apply" on invocation of an arrow function it will be 
   * ignored. You can still prepend arguments to the call,
   *  but the first argument ("thisArg") should be set to 
   * "null".
   */

  // Call as a method of an object
  const globalObject = this;
  const foo = () => this;
  const obj = { func: foo, a: 10 };
  console.log(obj.func() === globalObject);   // true

  // Attempt to set this using call
  console.log(foo.call(obj) === globalObject);    // true

  // Attempt to set this using bind
  const boundFoo = foo.bind(obj);
  console.log(boundFoo() === globalObject);   // true

  /**
   * No matter what, "foo"'s "this" is set to what it was 
   * when it was created (in the example above, the global 
   * object). The same applies to arrow functions created 
   * inside other functions: their "this" remains that of 
   * the enclosing lexical constex.
   */
}


label12: {
  // Create obj with a method bar that returns a function 
  // that returns its this. The returned function is created as
  // an arrow function, so its this is permanently bound to the
  // this of its enclosing function. The value of bar can be set
  // in the call, which in turn sets the value of the returned
  // function.
  // Note: the `bar()` syntax is equivalent to `bar: function()`
  // in this context

  const obj = {
    bar() {
      const x = (() => this);
      return x;
    }
  };

  // Call bar as method of obj, setting its this to obj
  // Assign a reference to the returned function to fn
  const fn = obj.bar();

  // Call fn without setting this, would normally default
  // to the global or undefined in strict mode
  console.log(fn() === obj);    // true

  // But caution if you reference the method of obj without calling it
  const fn2 = obj.bar;
  // Calling the arrow function's this from inside the bar method() 
  // will now return window, because it follows the this from fn2.
  // console.log(fn2()() === window); // true
}


label13: {
  const obj = {
    bar() {
      const x = (() => this);
      return x;
    }
  }

  // Call fn without setting this, would normally default
  // to the global object or undefined in strict mode
  const fn = obj.bar();
  console.log(fn() === obj);    // true

  // But caution if you reference the method of obj without calling it
  const fn2 = obj.bar;
  const fn3 = fn2();
  console.log(fn3());
  // console.log(globalThis);
  // console.log(fn2()());
}


/**
 * In the above, the function (call it anonymous function A) assigned to obj.bar returns another function (call it anonymous function B) that is created as an arrow function. As a result, function B's this is permanently set to the this of obj.bar (function A) when called. When the returned function (function B) is called, its this will always be what it was set to initially. In the above code example, function B's this is set to function A's this which is obj, so it remains set to obj even when called in a manner that would normally set its this to undefined or the global object (or any other method as in the previous example in the global execution context). 
 */



label13: {
  const obj1 = {
    func1: function () {
      const whatsThis = () => this;
      return whatsThis;
    }
  };

  const fn = obj1.func1();
  console.log(fn() === obj1);

  const obj2 = {
    func2: obj1.func1
  };

  const fn2 = obj2.func2();
  console.log(fn2() === obj2);
}




// As an object method

label14: {
  /**
   * When a function is called as a method of an object, 
   * its "this" is set to the object the method is called on
   * 
   * In the following example, when "o.f()" is invoked, 
   * inside the function "this" is bound to the "o" object.
   */
  const o = {
    prop: 37,
    f() {
      return this.prop;
    }
  };

  console.log(o.f());   // 37
}



label15: {
  /**
   * Note that this behavior is not at all affected by how 
   * or where the function was defined. In the previous 
   * example, we defined the function inline as the "f" 
   * member during the definition of "o". However, we could 
   * have just as easily defined the function first and 
   * later attached it to "o.f". Doing so results in the 
   * same behavior:
   */
  const o = { prop: 37 };

  function independent() {
    return this.prop;
  }

  o.f = independent;

  console.log(o.f());   // 37

  /**
   * This demonstrates that it matters only that the 
   * function was invoked from the "f" member of "o".
   */

  /**
   * Similarly, the "this" binding is only affected by the 
   * most immediate member reference. In the following 
   * example, when we invoke the function, we call it as a 
   * method "g" of the object "o.b". This time during 
   * execution, "this" inside the function will refer to 
   * "o.b". The fact that the object is itself a member of 
   * "o" has no consequence; the most immediate reference 
   * is all that matters. 
   */
  o.b = { g: independent, prop: 42 };
  console.log(o.b.g());   // 42
}



// this on the object's prototype chain

label16: {
  /**
   * The same notion holds true for methods defined 
   * somewhere on the object's prototype chain. If the 
   * method is on an object's prototype chain, "this" 
   * refers to the object the method was called on, as if 
   * the method were on the object. 
   */
  const o = {
    f() {
      return this.a + this.b;
    }
  }

  const p = Object.create(o);
  p.a = 1;
  p.b = 4;

  console.log(p.f());   // 5


  /**
   * In this example, the object assigned to the variable 
   * "p" doesn't have its own "f" property, it inherits it 
   * from its prototype. But it doesn't matter that the 
   * lookup for "f" eventually finds a member with that 
   * name on "o"; the lookup began as a reference to 
   * "p.f", so "this" inside the function takes the value 
   * of the object referred to as "p". That is, since "f" 
   * is called as a method of "p", its "this" refers to 
   * "p". This is an interesting feature of JavaScript's 
   * prototype inheritance. 
   */
}


// this with a getter or setter



label17: {
  /**
   * Again, the same notion holds true when a function is 
   * invoked from a getter or a setter. A function used as 
   * getter or setter has its "this" bound to the object 
   * from which the property is being set or gotten.
   */
  function sum() {
    return this.a + this.b + this.c;
  }

  const o = {
    a: 1,
    b: 2,
    c: 3,
    get average() {
      return (this.a + this.b + this.c) / 3;
    }
  };

  Object.defineProperty(o, "sum", {
    get: sum,
    enumerable: true,
    configurable: true
  });
  console.log(o.average, o.sum);    // 2, 6
}



// As a constructor

label19: {
  /**
   * When a function is used as a constructor (with the 
   * "new" keyword), its "this" is bound to the new object 
   * being constructed.
   */

  /**
   * Note: While the default for a constructor is to return 
   * the object referenced by "this", it can instead return 
   * some other object (if the return value isn't an 
   * object, the the "this" object is returned)
   */

  /**
   * Constructors work like this:
   * 
   * function MyConstructor() {
   *    // Actual function body code goes here.
   *    // Create properties on `this` as
   *    // desired by assigning to them, for example, this.fum = "nom";
   *    // et cetera...
   * 
   *    // If the function has a return statement that 
   *    // returns an object, that object will be the
   *    // result of the `new` expression. Otherwise,
   *    // the result of the expression is the object
   *    // currently bound to `this`
   *    // (i.e., the common case mst usually seen).
   * }
   */
  function C() {
    this.a = 37;
  }
  const o = new C();
  console.log(o.a);   // 37

  function C2() {
    this.a = 37;
    return { a: 38 };
  }
  const p = new C2();
  console.log(p.a);   // 38

  // function C3() {
  //   this.a = 10;
  //   return this.a;
  // }
  // const q = new C3();
  // console.log(q);


  /**
   * In the last example ("C2"), because an object was 
   * returned during construction, the new object that "this"
   * was bound to gets discarded. (This essentially makes 
   * the statement "this.a = 37;" dead code. It's not 
   * exactly dead because it gets executed, but it can be 
   * eliminated with no outside effects.)
   */
}



// As a DOM event handler

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

// https://javascript.info/arrow-functions
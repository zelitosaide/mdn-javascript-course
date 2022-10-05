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
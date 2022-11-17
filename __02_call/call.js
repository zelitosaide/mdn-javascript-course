label01: {
  function Product(name, price) {
    this.name = name;
    this.price = price;
  }

  function Food(name, price) {
    Product.call(this, name, price);
    this.category = "food";
  }

  function Toy(name, price) {
    Product.call(this, name, price);
    this.category = "toy";
  }

  const cheese = new Food("feta", 5);
  const fun = new Toy("robot", 40);

  // console.log(cheese, fun);
}

label02: {
  const animails = [
    { species: "Lion", name: "King" },
    { species: "Whale", name: "Fail" },
  ];

  function assignPrintMethod(i) {
    this.print = function () {
      console.log(`#${i} ${this.species}: ${this.name}`);
    };
    this.print();
  }

  for (let i = 0; i < animails.length; i++) {
    assignPrintMethod.call(animails[i], i);
  }
}

label03: {
  function greet() {
    const reply = [
      this.animal,
      "typically sleep between",
      this.sleepDuration,
    ].join(" ");

    console.log(reply);
  }

  const obj = {
    animal: "cats",
    sleepDuration: "12 and 16 hours",
  };

  greet.call(obj); // cats typically sleep between 12 and 16 hours
}

label04: {
  var globProp = "Wisen";
  // globProp = "Wisen";

  function display() {
    console.log(`globProp value is ${this.globProp}`);
  }

  display.call(); // Logs "globProp value is Wisen"
}

label05: {
  var globalProp = "Wisen";

  function display() {
    "use strict";
    console.log(`globalProp value is ${this.globalProp}`);
  }

  try {
    display.call(); // throws TypeError: Cannot read the property of 'globalProp' of undefined
  } catch {
    console.log(new Error("Whoops!").message);
  }
}

label06: {
  function Person(name, age) {
    this.name = name;
    this.age = age;
  }

  function Student(name, age, average) {
    Person.call(this, name, age);
    this.average = average;
  }

  const zelito = new Student("Zelito", 25, 1);

  console.log({ ...zelito });
}

label07: {
}

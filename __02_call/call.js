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

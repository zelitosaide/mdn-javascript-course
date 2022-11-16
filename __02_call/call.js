label01: {
  function Product(name, price) {
    this.name = name;
    this.price = price;
  }

  function Food(name, price) {
    Product.call(this, name, price);
    this.category = "food";
  }

  console.log(new Product("cheese", 10));
  console.log(new Food("cheese", 10));
}

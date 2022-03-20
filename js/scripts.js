function Pizza(name) {
  this.name = name;
  this.price = 0;
  this.quantity = 1;
  this.toppings = [];
}

// Pizza size
Pizza.prototype.setSize = function (size) {
  const pizzaSize = pizzaSizes.find((pizzaSize) => pizzaSize.size == size);
  if (pizzaSize) {
      this.size = pizzaSize;
      this.calculateTotal();
  }
};

// Pizza crust
Pizza.prototype.setCrust = function (name) {
  const pizzaCrust = pizzaCrusts.find((pizzaCrust) => pizzaCrust.name == name);
  if (pizzaCrust) {
      this.crust = pizzaCrust;
      this.calculateTotal();
  }
};

Pizza.prototype.setTopings = function (toppings) {
  this.toppings = toppings;
  this.calculateTotal();
};

//Quantity
Pizza.prototype.setQuantity = function (quantity) {
  this.quantity = +quantity;
  this.calculateTotal();
};

// calculate total
Pizza.prototype.calculateTotal = function () {
  const toppingPrice = 80;

  if (this.size) {
      this.price = this.size.price;
  }

  if (this.crust) {
      this.price = this.price + this.crust.price;
  }

  // add the price of toppings
  this.price += this.toppings.length * toppingPrice;

  this.price *= this.quantity;
};

// pizza sizes
const pizzaSizes = [
  {
      size: "small",
      price: 700,
  },
  {
      size: "medium",
      price: 1000,
  },
  {
      size: "large",
      price: 1500,
  },
];

// pizza crusts
const pizzaCrusts = [
  {
      name: "crispy",
      price: 300,
  },
  {
      name: "stuffed",
      price: 250,
  },
  {
      name: "Glutten free",
      price: 200,
  },
];

//toppings
const pizzaToppings = ["Olives", "Bacon", "Sausages"];

const pizzas = [
  { name: "Pepperoni" },
  { name: "Hawaiian" },
  { name: "Margherita" },
  { name: "Chicken Tikka" },
  { name: "Diavola" },
  { name: "Quattro Stagioni" },
];

$(function () {
  // append pizzas
  pizzas.forEach((pizza) => {
      $("#pizza").append(`<option value="${pizza.name}">${pizza.name}</option>`);
  });
  // append pizza sizes
  pizzaSizes.forEach((pizzaSize) => {
      $("#size").append(
          `<option value="${pizzaSize.size}">${pizzaSize.size}-${pizzaSize.price}</option>`
      );
  });

  // append pizza crusts
  pizzaCrusts.forEach((pizzaCrust) => {
      $("#crust").append(
          `<option value="${pizzaCrust.name}">${pizzaCrust.name}-${pizzaCrust.price}</option>`
      );
  });

  //append pizza toppings
  pizzaToppings.forEach((topping) => {
      $(".toppings").append(`<div class="col-md-6">
      <div class="form-check">
        <input class="form-check-input" name="toppings[]" type="checkbox" id="${topping}" value="${topping}">
        <label class="form-check-label" for="${topping}">
            ${topping}
        </label>
        </div>
      </div>`);
  });

  // function to calculate grand total
  function calculateGrandTotal() {
      let total = 0;
      cart.forEach((pizza) => {
          total += pizza.price;
      });

      $(".grand-total").html(`Ksh <span class="text-bold">${total}</span> `);

  }

  // initialize an empty cart
  const cart = [];

  // check if cart is empty
  if (cart.length == 0) {
      $(".empty-cart").show();
      $(".delivery-button").hide();
  } else {
      $(".empty-cart").hide();
  }
  $("#order-form").on("submit", function (e) {
      e.preventDefault();

      const selectedPizzaName = $("#pizza").val();
      const selectedSize = $("#size").val();
      const selectedCrust = $("#crust").val();
      const selectedToppings = $("input[name='toppings[]']:checkbox:checked")
          .map(function () {
              return $(this).val();
          })
          .get();

      // validation for all fields
      if (!selectedPizzaName || !selectedSize || !selectedCrust) {
          $("#error").text("** Please select a pizza, size and crust ** ");
          return;
      } else {
          $("#error").text("");
      }

      // cart details
      //check if selected pizza exists in cart
      const cartPizza = cart.find((pizza) => {
          const sameToppings =
              JSON.stringify(pizza.toppings) == JSON.stringify(selectedToppings);

          return (
              pizza.name == selectedPizzaName &&
              pizza.size.size == selectedSize &&
              sameToppings
          );
      });
      //if it exists increase quantity
      if (cartPizza) {
          cartPizza.setQuantity(cartPizza.quantity + 1);
      } else {
          const pizza = new Pizza(selectedPizzaName);
          pizza.setSize(selectedSize);
          pizza.setCrust(selectedCrust);
          pizza.setTopings(selectedToppings);

          cart.push(pizza);
      }
      // empty tbody first
      $(".order-table tbody").html("");
      //loop and append
      cart.forEach((pizza, cartIndex) => {
          $(".order-table tbody").append(`
          <tr>
              <td>${pizza.name}</td>
              <td>${pizza.size.size}</td>
              <td>${pizza.crust.name}</td>
              <td>${pizza.toppings.join(", ")}</td>
              <td>
                  <input type="number" min="1" class="input-sm form-control pizza-quantity" data-cart-index="${cartIndex}" value="${pizza.quantity
              }" />
              </td>
              <td>Ksh ${pizza.price}</td>
          </tr>
      `);
          // show checkout button
          $(".delivery-button").show();
          // console.log(pizza);
          //update grand total
          calculateGrandTotal();

      });

  });
  //pizza quantity change event
  $("body").on("change", ".pizza-quantity", function () {
      const quantity = $(this).val();
      const cartIndex = $(this).data("cart-index");
      const pizza = cart[cartIndex];

      if (quantity > 0) {
          pizza.setQuantity(quantity);
          // update line total
          $(this).parent().next().html(`Ksh <span class="text-bold">${pizza.price}</span> `);
      }

      //update grand total
      calculateGrandTotal();
  });

  // delivery modal
  $("#delivery-form").on("submit", function (e) {
      e.preventDefault();
      // check if the user has selected the radio button
      const selectd = $("input[name='deliveryMethod']:checked");
      if (selectd.val() == undefined) {
          $(".delivery-option").html("<p class='text-danger'>** Please select the delivery method **</p>");
          return;
      } else {
          $(".delivery-option").text("");
          // check which radio button was selected
          if (selectd.val() == "delivery") {
              $("#location-input-details").show();
              // user inputs variables
              const customerName = $("#customerName").val();
              const customerPhone = $("#customerPhone").val();
              const customerLocation = $("#customerLocation").val();
              const additionalInfo = $("#additionalInfo").val();
              // validate user inputs
              if (!customerName || !customerPhone || !customerLocation) {
                  $(".error-delivery-location").text("Fill in all input fields with * to proceed!")
                  return;
              } else {
                  $(".error-delivery-location").text("");
              }
              function calculateGrandTotal() {
                  let total = 0;
                  cart.forEach((pizza) => {
                      total += pizza.price;
                  });
                  const getTotalPlusDeliveryFee = total + 128;
                  console.log(getTotalPlusDeliveryFee);
                  console.log(cart);
                  $("#select-delivery-method").hide();
                  $(".delivery-head").append(`
                  <div class="alert alert-success" role="alert">Hello ${customerName}. Order successfully processed. Your order will be delivered to your location(${customerLocation})🙂</div>
                      <div class="d-flex justify-content-between">
                          <div>
                              <h5>Order Summary</h5>
                          </div>
                          <div>
                              <p class="color-palace float-right">Total Ksh <span class="text-bold">${getTotalPlusDeliveryFee}</span></p>
                          </div>
                      </div>
                  `);
                  //loop and append
                  cart.forEach((pizza, cartIndex) => {
                      $(".delivery-bottom").append(`
                      <div>
                      <div class="row">
                          <div class="col-md-12">
                              <ol class="list-group">
                                  <li class="list-group-item d-flex justify-content-between align-items-start">
                                      <div class="ms-2 me-auto">
                                          <div class="fw-bold">${pizza.name}(${pizza.size.size})</div>
                                          Crust - ${pizza.crust.name} <br>
                                          Toppings - ${pizza.toppings.join(", ")}
                                      </div>
                                      <span class="badge bg-primary rounded-pill">${pizza.quantity}</span>
                                  </li>
                              </ol>
                          </div>
                      </div>
                     </div>
                      `);
                  });

              }
              calculateGrandTotal()
              // $("#deliveryMethodModal").hide();
          } else if (selectd.val() == "pickup") {
              function calculateGrandTotal() {
                  let total = 0;
                  cart.forEach((pizza) => {
                      total += pizza.price;
                  });
                  const getTotalPlusDeliveryFee = total;
                  console.log(getTotalPlusDeliveryFee);
                  $("#select-delivery-method").hide();
                  $(".delivery-head").append(`
                  <div class="alert alert-success" role="alert">Hello. Order successfully processed. Please pickup your order in an hour.</div>
                      <div class="d-flex justify-content-between">
                          <div>
                              <h5>Order Summary</h5>
                          </div>
                          <div>
                              <p class="color-palace float-right">Total Ksh <span class="text-bold">${getTotalPlusDeliveryFee}</span></p>
                          </div>
                      </div>
                  `);
                  //loop and append
                  cart.forEach((pizza, cartIndex) => {
                      $(".delivery-bottom").append(`
                      <div>
                      <div class="row">
                          <div class="col-md-12">
                              <ol class="list-group">
                                  <li class="list-group-item d-flex justify-content-between align-items-start">
                                      <div class="ms-2 me-auto">
                                          <div class="fw-bold">${pizza.name}(${pizza.size.size})</div>
                                          Crust - ${pizza.crust.name} <br>
                                          Toppings - ${pizza.toppings.join(", ")}
                                      </div>
                                      <span class="badge bg-primary rounded-pill">${pizza.quantity}</span>
                                  </li>
                              </ol>
                          </div>
                      </div>
                     </div>
                      `);
                  });

              }
              calculateGrandTotal()
          }
      }

  })
});


// var price, crust_price, topping_price;
// let total = 0;

// function Getpizza(name,size,crust,topping,total){
//   this.name = name;
//   this.size = size;
//   this.crust = crust;
//   this.topping = topping;
//   this. total = total;
// }

// // Function for proceed button
// $("button.proceed").click(function(event){
//   let pName = $(".name option:selected").val();
//   let pSize = $("#size option:selected").val();
//   let pCrust = $("#crust option:selected").val();
//   let pTopping = [];

//   $.each($("input[name='Toppings']:checked"), function(){
//     pTopping.push($(this).val());
//   });
//   console.log(pTopping.join(", "));
// // })

// switch(pSize){
//   case "0":
//     price = 0;
//     break;

//     case "large":
//       price = 1500;
//       console.log(price);
//       break;

//       case "medium":
//         price = 1000;
//         console.log("The price is "+price);
//         break;

//         case "small":
//           price = 700;
//           console.log(price);
//           default:
//             console.log("error");
// }

// switch(pCrust){
//   case "0":
//     crust_price = 0;
//     break;

//     case "Crispy":
//       crust_price = 300;
//       break;

//       case "Stuffed":
//         crust_price = 250;
//         break;

//         case "Gluten-free":
//           crust_price = 200;
//           break;
//           default:
//             console.log("No Price");
// }

// let topping_value = pTopping.length*50;
// console.log("topping value" +topping_value);

// if((pSize == "0") && (pCrust =="0")){
//   console.log("nothing selected");
//   $("button.proceed").show();
//   $("#information").show();
//   $(div.choice).hide();
//   alert("Please select pizza size and crust");
// }
// else{
//   $("button.proceed").hide();
//   $("#information").hide();
//   $("div.choice").slideDown(1000);
// }

// total = price + crust_price +topping_value;
// console.log(total);
// let checkoutTotal = checkoutTotal + total;

// $("#pizzaname").html($(".name option: selected").val());
// $("#pizzasize").html($("#size option: selected").val());
// $("#pizzacrust").html($("#crust option: selected").val());
// $("#pizzatopping").html(pTopping.join(", "));
// $("#totals").html(total);

// // Add button function

// $("button.addPizza").click(function(){
//   let pName = $(".name option:selected").val();
//   let pSize = $("#size option :selected").val();
//   let pCrust = $("#crust option :selected").val();
//   let pTopping = [];
//   $.each($("input[name='Toppings']: checked"), function(){
//     pTopping.push($(this).val());
//   });
//   console.log(pTopping.join(", "));
//   switch(pSize){
//     case "0":
//       price = 0;
//       break;

//       case "large":
//         price = 1500;
//         console.log(price);
//         break;

//         case "medium":
//           price = 1000;
//           console.log("The price is "+price);
//           break;

//           case "small":
//             price = 700;
//             console.log(price);
//             default:
//               console.log("error");
//   }
//   switch(pCrust){
//     case "0":
//       crust_price = 0;
//       break;

//       case "Crispy":
//         crust_price = 300;
//         break;

//         case "Stuffed":
//           crust_price = 250;
//           break;

//           case "Gluten-free":
//             crust_price = 200;
//             break;
//             default:
//               console.log("No crust");
//   }
//   let topping_value = pTopping.length*50;
//   console.log("toppings value" + topping_value);
//   total = price + crust_price + topping_value;
//   console.log(total);

//   checkoutTotal = checkoutTotal + total;
//   console.log(checkoutTotal);

//   // constructor function

//   var newOrder = new Getpizza(pName, pSize, pCrust, pTopping, total);

//   $("#ordersmade").append('<tr><td id="pizzaname">'+newOrder.name +'</td><td id="pizzasize">' + newOrder.size + '</td><td id="pizzacrust">'+newOrder.crust + '</td><td id="pizzatopping">'+newOrder.topping+'</td><td id="totals">'+newOrder.total+'</td></tr>');
//   console.log(newOrder);

// });

// // Function for checkout Button

// $("button#checkout").click(function(){
//   $("button#checkout").hide();
//   $("button.addPizza").hide();
//   $("button.deliver").slideDown(1000);
//   $("button.pickup").slideDown(1000);
//   $("#addedprice").slideDown(1000);
//   console.log("Your total bill is sh. "+checkoutTotal);
//   $("#pizzatotal").append("Your bill is sh. "+checkoutTotal);
// });

// // When delivery button is clicked

// $("button.deliver").click(function(){
//   $(".pizzatable").hide();
//   $(".choice h2").hide();
//   $(".delivery").slideDown(1000);
//   $("#addedprice").hide();
//   $("button.deliver").hide();
//   $("#pizzatotal").hide();

//   let deliveryAmount = checkoutTotal+500;
//   console.log("You will pay sh. "+deliveryAmount+" upon delivery.");
//   $("#totalbill").append("Your bill plus delivery fee is: "+deliveryAmount);
// });

// // When pickup button is clicked

// $("button.pickup").click(function(){
//   $(".pizzatable").hide();
//   $(".choice h2").hide();
//   $(".delivery").slideDown(1000);
//   $("#addedprice").hide();
//   $("button.pickup").hide();
//   $("#pizzatotal").hide();

//   let pickupAmount = checkoutTotal;
//   console.log("You will pay sh. "+pickupAmount+" on pickup.");
//   $("#totalbill").append("Your bill is: "+pickupAmount);
// });

// // When complete button is clicked

// $("button#complete-order").click(function(event){
//   event.preventDefault();

//   $("#pizzatotal").hide();
//   $(".delivery").hide();
//   $(".pickup").hide();
//   $("button#complete-order").hide();

//   let deliveryAmount = checkoutTotal+500;
//   console.log("Final bill is: "+deliveryAmount);

//   let pickupAmount = checkoutTotal;
//   console.log("Final bill is "+pickupAmount);

//   let location = $("input#location").val();

//   if ($("input#location").val()!=""){

//     $("#finalmessage").append("We have received your order and it will be delivered to you at "+location+ "Prepare sh. "+deliveryAmount );
//     $("totalbill").hide();
//     $("#finalmessage").slideDown(1200);
//   }

//   else {
//     alert("Please fill in delivery location.");
//     $(".delivery").show();
//     $("button#complete-order").show();
//   }
// });
// event.preventDefault();

// });



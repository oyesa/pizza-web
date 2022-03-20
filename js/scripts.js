


var price, crust_price, topping_price;
let total = 0;

function Getpizza(name,size,crust,topping,total){
  this.name = name;
  this.size = size;
  this.crust = crust;
  this.topping = topping;
  this. total = total;
}

// Function for proceed button
$("button.proceed").click(function(event){
  let pName = $(".name option:selected").val();
  let pSize = $("#size option:selected").val();
  let pCrust = $("#crust option:selected").val();
  let pTopping = [];

  $.each($("input[name='Toppings']:checked"), function(){
    pTopping.push($(this).val());
  });
  console.log(pTopping.join(", "));
// })

switch(pSize){
  case "0":
    price = 0;
    break;

    case "large":
      price = 1500;
      console.log(price);
      break;

      case "medium":
        price = 1000;
        console.log("The price is "+price);
        break;

        case "small":
          price = 700;
          console.log(price);
          default:
            console.log("error");
}

switch(pCrust){
  case "0":
    crust_price = 0;
    break;

    case "Crispy":
      crust_price = 300;
      break;

      case "Stuffed":
        crust_price = 250;
        break;

        case "Gluten-free":
          crust_price = 200;
          break;
          default:
            console.log("No Price");
}

let topping_value = pTopping.length*50;
console.log("topping value" +topping_value);

if((pSize == "0") && (pCrust =="0")){
  console.log("nothing selected");
  $("button.proceed").show();
  $("#information").show();
  $(div.choice).hide();
  alert("Please select pizza size and crust");
}
else{
  $("button.proceed").hide();
  $("#information").hide();
  $("div.choice").slideDown(1000);
}

total = price + crust_price +topping_value;
console.log(total);
let checkoutTotal = checkoutTotal + total;

$("#pizzaname").html($(".name option: selected").val());
$("#pizzasize").html($("#size option: selected").val());
$("#pizzacrust").html($("#crust option: selected").val());
$("#pizzatopping").html(pTopping.join(", "));
$("#totals").html(total);

// Add button function

$("button.addPizza").click(function(){
  let pName = $(".name option:selected").val();
  let pSize = $("#size option :selected").val();
  let pCrust = $("#crust option :selected").val();
  let pTopping = [];
  $.each($("input[name='Toppings']: checked"), function(){
    pTopping.push($(this).val());
  });
  console.log(pTopping.join(", "));
  switch(pSize){
    case "0":
      price = 0;
      break;

      case "large":
        price = 1500;
        console.log(price);
        break;

        case "medium":
          price = 1000;
          console.log("The price is "+price);
          break;

          case "small":
            price = 700;
            console.log(price);
            default:
              console.log("error");
  }
  switch(pCrust){
    case "0":
      crust_price = 0;
      break;

      case "Crispy":
        crust_price = 300;
        break;

        case "Stuffed":
          crust_price = 250;
          break;

          case "Gluten-free":
            crust_price = 200;
            break;
            default:
              console.log("No crust");
  }
  let topping_value = pTopping.length*50;
  console.log("toppings value" + topping_value);
  total = price + crust_price + topping_value;
  console.log(total);

  checkoutTotal = checkoutTotal + total;
  console.log(checkoutTotal);

  // constructor function

  var newOrder = new Getpizza(pName, pSize, pCrust, pTopping, total);

  $("#ordersmade").append('<tr><td id="pizzaname">'+newOrder.name +'</td><td id="pizzasize">' + newOrder.size + '</td><td id="pizzacrust">'+newOrder.crust + '</td><td id="pizzatopping">'+newOrder.topping+'</td><td id="totals">'+newOrder.total+'</td></tr>');
  console.log(newOrder);

});

// Function for checkout Button

$("button#checkout").click(function(){
  $("button#checkout").hide();
  $("button.addPizza").hide();
  $("button.deliver").slideDown(1000);
  $("button.pickup").slideDown(1000);
  $("#addedprice").slideDown(1000);
  console.log("Your total bill is sh. "+checkoutTotal);
  $("#pizzatotal").append("Your bill is sh. "+checkoutTotal);
});

// When delivery button is clicked

$("button.deliver").click(function(){
  $(".pizzatable").hide();
  $(".choice h2").hide();
  $(".delivery").slideDown(1000);
  $("#addedprice").hide();
  $("button.deliver").hide();
  $("#pizzatotal").hide();

  let deliveryAmount = checkoutTotal+500;
  console.log("You will pay sh. "+deliveryAmount+" upon delivery.");
  $("#totalbill").append("Your bill plus delivery fee is: "+deliveryAmount);
});

// When pickup button is clicked

$("button.pickup").click(function(){
  $(".pizzatable").hide();
  $(".choice h2").hide();
  $(".delivery").slideDown(1000);
  $("#addedprice").hide();
  $("button.pickup").hide();
  $("#pizzatotal").hide();

  let pickupAmount = checkoutTotal;
  console.log("You will pay sh. "+pickupAmount+" on pickup.");
  $("#totalbill").append("Your bill is: "+pickupAmount);
});

// When complete button is clicked

$("button#complete-order").click(function(event){
  event.preventDefault();

  $("#pizzatotal").hide();
  $(".delivery").hide();
  $(".pickup").hide();
  $("button#complete-order").hide();

  let deliveryAmount = checkoutTotal+500;
  console.log("Final bill is: "+deliveryAmount);

  let pickupAmount = checkoutTotal;
  console.log("Final bill is "+pickupAmount);

  let location = $("input#location").val();

  if ($("input#location").val()!=""){

    $("#finalmessage").append("We have received your order and it will be delivered to you at "+location+ "Prepare sh. "+deliveryAmount );
    $("totalbill").hide();
    $("#finalmessage").slideDown(1200);
  }

  else {
    alert("Please fill in delivery location.");
    $(".delivery").show();
    $("button#complete-order").show();
  }
});
event.preventDefault();

});

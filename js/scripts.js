


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
})

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
});
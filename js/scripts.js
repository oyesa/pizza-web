


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

  $.each($("input[name='toppings']:checked"), function(){
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
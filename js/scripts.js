


var price, crust_price, topping_price;
let total = 0;

function getPizza(name,size,crust,topping,total){
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
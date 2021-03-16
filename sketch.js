var dog,sadDog,happyDog;

var feed, addFood, foodObj, foodStock;

var database;
//addfirebase

function preload(){
  sadDog=loadImage("Images/JJ.png");
  happyDog=loadImage("Images/J.png");
}

function setup() {
  database = firebase.database;
  createCanvas(1000,400);
  
  foodObj = new Food();

  foodStock = database.ref('food');

  foodStock.on("value", readStock);

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

}

function draw() {
  background(255,255,255);
  
  foodObj.display();

  drawSprites();

}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock(-1));
  }
}

//function to add food in stock

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}
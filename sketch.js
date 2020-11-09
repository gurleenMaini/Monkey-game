var play= 1;
var end= 0;
var gameState= play;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score, survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_collided = loadAnimation("sprite_0.png");
}



function setup() {
  
  createCanvas(500,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale = 0.1;

  ground = createSprite(600,350,1200,10);
  ground.velocityX = -10;
  ground.x=ground.width/2;
  console.log(ground.x);

  obstacleGroup = createGroup();
  foodGroup = createGroup();

  score= 0;
  survivalTime= 0;
}


function draw() {
  background("cyan");
  
  stroke("black");
  textSize(15);
  fill("black");
  text ("Score:" + score, 400,50);
  
  stroke("white");
  textSize(15);
  fill("black");
  text ("Survival time:" + survivalTime, 100,20);
  
  if (gameState=== play){
    survivalTime = survivalTime+Math.round(getFrameRate()/60);
    
    if (keyDown("space")&& monkey.y>= 200){
      monkey.velocityY= -10;
    }
    
     monkey.velocityY = monkey.velocityY + 0.5;
 
  if (ground.x < 0){
   ground.x= ground.width/2;
  }
  
  if (monkey.isTouching(foodGroup)){
     foodGroup.destroyEach();
     score = score+1;
     console.log("string");
  }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState= end;
    }
}
  
  if (gameState=== end){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    monkey.changeAnimation("collided", monkey_collided);
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);

     fill("magenta")
    stroke("black")
    textSize(50);
    text("GAMEOVER", 100, 170);

  }

  food();
  obstacles();
  drawSprites();
  
  monkey.collide(ground);
}

function food(){
  
  if (frameCount % 80=== 0){
    var banana = createSprite(400,40,10,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.velocityX = -3
    banana.lifetime = 150;
    banana.scale = 0.1;
    
    //banana.depth= monkey.depth;
    //monkey.depth= monkey.depth+ 1;
    foodGroup.add(banana);

  }
}

function obstacles(){
  
  if (frameCount % 300=== 0){
    var stone= createSprite(500,330,40,40);
    //stone.debug= true;
    stone.velocityX= -3;
    stone.addImage(obstacleImage);
    stone.setCollider("circle",0,0,180);
    stone.scale= 0.1;
    stone.lifetime= 150;
    obstacleGroup.add(stone);
  }
}



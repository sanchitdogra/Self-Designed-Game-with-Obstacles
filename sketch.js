const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var engineObj, world;
var ground;
var player;
var invisibleGround;
var playerWalkImg;
var jumpState = 0;
var carObj =[];

function preload(){
  playerStandImg=loadAnimation("boy_standing_01.png","boy_standing_02.png","boy_standing_03.png","boy_standing_04.png");
  playerWalkImg=loadAnimation("boy_walking_01.png","boy_walking_02.png","boy_walking_03.png","boy_walking_04.png","boy_walking_05.png","boy_walking_06.png");
  playerJumpAnimation = loadAnimation("boy_jumping_01.png","boy_jumping_03.png","boy_jumping_04.png","boy_jumping_05.png","boy_jumping_06.png","boy_jumping_07.png","boy_jumping_08.png");
  playerSlideAnimation = loadAnimation("boy_sliding_01.png","boy_sliding_02.png","boy_sliding_03.png","boy_sliding_04.png","boy_sliding_05.png","boy_sliding_06.png","boy_sliding_07.png");
  backgroundImg = loadImage("background.png");

}
function setup() 
{
  createCanvas(displayWidth, displayHeight-120);
  engineObj = Engine.create();
  world = engineObj.world;

  //ground = new Ground(0,displayHeight/2+200,displayWidth, 80);
  //ground = new Ground(displayWidth/2-700,displayHeight/2+220,displayWidth*9,10);
  ground = new Ground(displayWidth/2-20,displayHeight-200, displayWidth*20,10)
  player  = createSprite(displayWidth/2-700, displayHeight-250, 100,100);
  //player  = createSprite(0,0, 100,100);

  //car = new Car(displayWidth/2, displayHeight/2);

  
  player.addAnimation("standing",playerStandImg);
  player.addAnimation("walking",playerWalkImg);
  player.addAnimation("jumping",playerJumpAnimation);
  player.addAnimation("sliding",playerSlideAnimation);
  player.setCollider("circle", 0,0,40);

  //player.scale=0.5;
 invisibleGround = createSprite(displayWidth/2-20,displayHeight-200, displayWidth*20,10);
 invisibleGround.visible=false;

 player.debug = true;
  if(frameCount %60 ===0)
{
 for (var k = 100; k <= 460; k = k + 50)
 {
     carObj.push(new Car(k, 175));
 }
}
}

function draw() 
{
  background(backgroundImg);  

  Engine.update(engineObj);


  ground.display();
  
  if(frameCount %60 ===0)
  {
   //for (var k = 100; k <= 460; k = k + 50)
   //{
       carObj.push(new Car(player.x+800, 175));
       
   //}
  }
 //car.display();
  camera.debug=true;
  camera.position.x =player.x +700;
  //camera.position.y =  displayHeight-250;
  playerMovement();
  player.velocityY=player.velocityY+0.5
  player.collide(invisibleGround);

  //console.log(car);
  //spawnCar();

  for (var i = 0; i < carObj.length; i++)
  {
      carObj[i].display();
  }

  drawSprites();
}

function playerMovement()
{
  if(keyWentDown(RIGHT_ARROW))
  {
    player.velocityX = 20;
    player.changeAnimation("walking",playerWalkImg);
  }

  if(keyWentUp(RIGHT_ARROW))
  {
    player.velocityX = 0;
    player.changeAnimation("standing",playerStandImg);
  }
  if(keyWentDown("space")){
    player.velocityY=-10;
    player.changeAnimation("jumping",playerJumpAnimation);
    jumpState = 1;
  }
  if(jumpState === 1&&player.isTouching(invisibleGround)){
    player.changeAnimation("standing",playerStandImg);
    jumpState =0;
  }
  if(keyWentDown(DOWN_ARROW)){
    player.changeAnimation("sliding",playerSlideAnimation);
    //player.y = displayHeight-200;
  }
  if(keyWentUp(DOWN_ARROW)){
    player.changeAnimation("standing",playerStandImg);
    //player.y = displayHeight-250;
  }
}
 function spawnCar()
{
  if(frameCount %60 ===0)
 {
    car = new Car(200,200);
    car.display();
  }
}
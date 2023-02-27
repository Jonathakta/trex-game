var Play =1;

var End =0;

var gameState= Play


var trex, trex_running, trex_collided;

var ground, invisibleGround, groundImage;

var obstaclesGroup

var cloud, cloudsGroup, cloudImage;
 
var ob1 , ob2 , ob3, ob3 , ob4 , ob5 , ob6;

var newImage;

var gameOver , restart

var score=0;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");


  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
 
}

function setup() {
  createCanvas(600, 200);

  gameOver = createSprite(200,200,200,200);
gameOver.addImage(gameOverImg);

restart = createSprite(220,220,220,220);
restart.addImage(restartImg);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  // trex.adicionarAnimação("colidiu",trex_colidiu)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
obstaclesGroup = createGroup();
cloudsGroup = createGroup();


  console.log("Hello"+ 5)
  
}

function draw() {
  background(180);

  text("Pontuaçao" + score,500,50);
if(gameState === Play){
score = score + Math.round(frameCount/60);



  if(keyDown("space")&& trex.y >= 140) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
  
  gameOver.visible =false;
  //gerar as nuvens
  spawnClouds();
  
spawnObstacles();


if(obstaclesGroup.isTouching(trex)){
  gameState = END;
}



  drawSprites();
  

}
else if (gameState === END) {
       
  ground.velocityX = 0;
 obstaclesGroup.setLifetime(-1);
cloudsGroup.setLifetime(-1);
 obstaclesGroup.setVelocityXEach(0);
 cloudsGroup.setVelocityXEach(0);

gameOver.visible = true;

}

}


//else if(gameState ===End){

//else ground.velocityX=0;


  
  
  

function spawnClouds() {
  
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    console.log(cloud.depth);
    
    cloud.lifetime = 200;
    
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
    }
}


function  spawnObstacles(){

if(frameCount % 60 ===0)
{
var obstacle =createSprite(590,170,10,10);

obstacle.velocityX = -6;

var rand = Math.round(random  (1,6));
switch(rand){

case 1: obstacle.addImage(ob1);

case 2: obstacle.addImage(ob2);

case 3: obstacle.addImage(ob3);

case 4: obstacle.addImage(ob4);

case 5: obstacle.addImage(ob5);

case 6: obstacle.addImage(ob6);

break;
default: break;

}

obstacle.scale =0.5;
obstacle.lifetime =300;
obstaclesGroup.add(obstacle);






}
}

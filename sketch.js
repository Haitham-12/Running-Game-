var PLAY = 1;
var END = 0;
var gameState = PLAY;

var obstacle1Img;
var obstacle2Img;
var obstacle3Img;

var playAnimations, player;

var coinsGroup;
var obstaclesGroup;

var invisibleRoad;

var coin1Img;
var coin2Img;



var score;

var jungleImg, jungle;
var road1Img, road;

function preload(){
obstacle1Img = loadImage("Obstacle 1.png");
obstacle2Img = loadImage("Obstacle 2.png");
obstacle3Img = loadImage("Obstacle 3.png");

coin2Img = loadImage("Coin 2.png");

gameOverImg = loadImage("gameover.png")

jungleImg = loadImage("jungle.jpg");
road1Img = loadImage("Road 1.png");

playAnimations = loadAnimation("r1.png","r2.png","r3.png","r4.png","r5.png","r6.png","r7.png","r8.png");
}

function setup(){
    createCanvas(900,800);

    road = createSprite(500,500,900,50);
    road.addImage("road",road1Img);
    
    player = createSprite(50,450);
    player.addAnimation("player",playAnimations);
    
    gameOver = createSprite(50,450);
    gameOver.addImage(gameOverImg);

    gameOver.scale = 0.5;

    invisibleGround = createSprite(450,730,3000,50);
    invisibleGround.visible = false;
    
    road.velocityX = -4;

    player.setCollider("rectangle",0,0,50,300);
    player.debug = true

    obstaclesGroup = createGroup();
    coinsGroup = createGroup();
  
    score = 0;
}

function draw(){
    background(jungleImg);
    
    if(gameState === PLAY){

        gameOver.visible = false;

        road.velocityX = -(4 + 3* score/100)
        //scoring
        score = score + Math.round(getFrameRate()/600);
    
    text("Score: "+ score, 450,25,600,600);
        if(road.x < 400){
        road.x = 500
        }
        if(keyDown("space")&& player.y >= 550){
            player.velocityY = -29
        }
       player.velocityY = player.velocityY + 1;
    
       player.collide(invisibleGround);
        spawnCoins();
        spawnObstacles();
        drawSprites();
    }

    if(obstaclesGroup.isTouching(player)){
        gameState = END;
        gameOver.visible = true;

}
}

function spawnObstacles(){
    if(frameCount%200 === 0){
        obstacle1 = createSprite(900,650,20,20);
        obstacle1.velocityX = -(6 + score/600);
        obstacle1.velocityX = -4;
        
        
        var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle1.addImage("Obstacle 1.png",obstacle1Img);
              break;
      case 2: obstacle1.addImage("Obstacle 2.png",obstacle2Img);
              break;
      case 3: obstacle1.addImage("Obstacle 3.png",obstacle3Img);
              break;
      default: break;
    }
    obstacle1.scale = 0.3;
    obstacle1.lifetime =900/4;
    obstaclesGroup.add(obstacle1);
    }
    }
    function spawnCoins() {
       
        if (frameCount % 600 === 0) {
          var coin = createSprite(900,650,20,20);
        
          coin.addImage(coin2Img);
          coin.scale = 0.3;
          coin.velocityX = -3;
        }
    }
var PLAY,END,gameState,highScore,monkey,m1,iGround,Obstacles,Bananas,survivalTime,life,eatenBananas,gameOver,restart,g1,r1,b1,s1,m2,Backdrop,b2;

function preload(){
  m1=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png" ); 
  
  m2=loadAnimation("Monkey_01.png");
  g1=loadImage("Untitled.png");
  r1=loadImage("Restart.png");
  b1=loadImage("banana.png");
  s1=loadImage("stone.png");
  b2=loadImage("FQizObE.png");
}

function setup(){
  createCanvas(displayWidth,displayHeight/2);

  Backdrop = createSprite(displayWidth/64,displayHeight,displayWidth/2,displayHeight/2);
  Backdrop.addImage(b2);
  Backdrop.scale = 1.10;
  
  monkey = createSprite(50,390,20,20);
  monkey.addAnimation("m1",m1);
  monkey.addAnimation("m2", m2);
  monkey.scale = 0.15;
 
  iGround = createSprite(350,395,700,5);
  iGround.visible = false;
  
  Obstacles = new Group();
  Bananas = new Group();
  PLAY=1;
  END=0;
  
  highScore=0
  
  gameState=PLAY;
  survivalTime=0;
  life = 0;
  eatenBananas=0;

  gameOver = createSprite(350,220);
  gameOver.addImage(g1)
  gameOver.scale = 0.4;
  gameOver.visible = false;

  restart = createSprite(350,280);
  restart.addImage(r1)
  restart.scale = 0.3;
  restart.visible = false;
}

function draw() {
  //set background to white
  background("white");

  life = frameCount + 1;

  if (gameState === PLAY){
    //move the ground
  ground.velocityX=9
    
    if (Backdrop.x < 0){
      Backdrop.x = Backdrop.width / 2;
    }
    
    //jump when the space key is pressed
    if (keyDown("space") && monkey.y >= 345){
      monkey.velocityY = -18 ;
    }
  
    if (Bananas.isTouching(monkey)){
      Bananas.destroyEach();
      eatenBananas = eatenBananas + 1;
    }

    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8;
    
    //spawn the bananas
    spawnBananas();
    
    //spawn the obstacles
    spawnObstacles();
    
    survivalTime = Math.round(survivalTime  + getFrameRate()/ 60);
    
    if (Obstacles.isTouching(monkey)){
      gameState=END;
    }
  }
  
  if (gameState === END) {
    End();
  }
  
  //stop monkey from falling down
  monkey.collide(iGround);

  drawSprites();
  
  textSize(17);
  textFont("Georgia");
  textStyle(BOLD);
  fill("black");
  if (highScore>0){
    text("Best Time " + highScore,450,150);
  }

  
  textSize(17);
  textFont("Georgia");
  textStyle(BOLD);
  text("Bananas Eaten: " + eatenBananas,270,100);

  textSize(17);
  textFont("Georgia");
  textStyle(BOLD);
  text("Survival Time " + survivalTime,270,150);

  if (mousePressedOver(restart)){
    reset();
  }
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,320,40,10);
    banana.y = random(200,250);
    banana.addImage(b1);
    banana.scale = 0.05;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 150;
    
    //adjust the depth
    banana.depth = monkey.depth + 1;
    
    //add each banana to the group
    Bananas.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 300 === 0){
    var Rock = createSprite(750,365,20,20);
    Rock.addImage(s1);
    Rock.velocityX = -(3 + (3 * survivalTime / 100));
    Rock.scale = 0.2;
    Rock.lifetime = 250;
    
    //add each obstacle to the group
    Obstacles.add(Rock);

    Obstacles.setColliderEach("rectangle",0,10,200,200);
  }
}

function End(){
  gameOver.visible = true;
  gameOver.scale = 0.4;

  restart.visible = true;
  restart.scale = 0.4;
  
  Backdrop.velocityX = 0;
  Obstacles.setVelocityXEach(0);
  Bananas.setVelocityXEach(0);
 
  monkey.changeAnimation("m2", m2);

  monkey.velocityY = 0;
  Obstacles.setLifetimeEach(life);
  Bananas.setLifetimeEach(life);

  if (highScore < survivalTime){
    highScore = survivalTime;
  }
}

function reset(){
  
  gameState=PLAY;
  
  survivalTime=0;

  eatenBananas=0;

  gameOver.visible = false;
  restart.visible = false;
  
  monkey.changeAnimation("m1",m1);
  
  Obstacles.destroyEach();
  Bananas.destroyEach();
}

  

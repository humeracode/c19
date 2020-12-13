var flappy, flappy_flying;
var pole1, pole2, pole1Img, pole2Img, polesGroup;
var ground, groundImg;
var gameState = "ready",
  score = 0, score2 = 0;
  invisibleGround, invisible2, invisible3, invisibleGroup;
var poleGroup, restart, restartImg, gameOver, gameOverImg;

function preload() {
  flappy_flying = loadImage("flappy3.png")
  groundImg = loadImage("ground.png");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");

}

function setup() {
  createCanvas(600, 600);
  ground = createSprite(300, 300);
  ground.addImage(groundImg);
  ground.scale = 1.85;
  ground.velocityX = -4;
  
  gameOver = createSprite(250, 250, 50, 50);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;
  gameOver.scale = 0.5
  
  restart = createSprite(250, 400, 10, 10);
  restart.visible = false;
  restart.addImage(restartImg);
  restart.scale = 0.5;

  flappy = createSprite(50, 300, 10, 10);
  flappy.addAnimation("flappy", flappy_flying);
  flappy.scale = 0.01;
  //flappy.debug = true;
  flappy.setCollider("circle", 0, 0, 1200);

  invisibleGround = createSprite(300, 520, 600, 5);

  invisible2 = createSprite(300, 0, 600, 10);
  invisible2.visible = false;



  poleGroup = new Group();
  invisibleGroup = new Group();

}

function draw() {
  background(255);
  if (gameState === "ready") {
    if (mousePressedOver(ground)) {
      gameState = "play";
    }

    if (ground.x < 50) {
      ground.x = 300;
    }

    drawSprites();
    textSize(30);
    fill("orange")
    text("Press anywhere to continue", 150, 350);

  }
  if (gameState === "play") {
    if (keyDown("space") || mousePressedOver(ground)) {
      flappy.velocityY = -10;
    }
    invisible2.visible = false;
    invisibleGround.visible = false;
    if (ground.x < 50) {
      ground.x = 300;
    }
    flappy.velocityY += 0.8;
    if (flappy.isTouching(invisibleGround) || poleGroup.isTouching(flappy)) {
      gameState = "end";
    }
    
    poles();
    flappy.collide(invisibleGround);
    flappy.collide(invisible2);
    if (invisibleGroup.isTouching(flappy)) {
      score += 1;
      score2 = Math.ceil(score/8);
    }


    drawSprites();
    textSize(35);
    fill(0);
    textStyle("bold")
    text('Score : ' + score2, 180, 50);
  }
  if (gameState === "end") {
    poleGroup.setLifetimeEach(-1);
    flappy.collide(invisibleGround);
    drawSprites();
    flappy.velocityY = 4;
    ground.velocityX = 0;
    poles();
    poleGroup.setVelocityXEach(0);
    poleGroup.setLifetimeEach(-1);
    invisibleGroup.setLifetimeEach(-1)
    gameOver.visible = true;
    restart.visible = true;
    textStyle("bold");
    fill("black");
    textSize(30);
    text("Final score :"+score2,160, 320);
    
    if(mousePressedOver(restart)){
      gameState = "play";
      gameOver.visible = false;
      restart.visible = false;
      flappy.y = 250;
      poleGroup.destroyEach();
      invisibleGroup.destroyEach();
      score = 0;
      score2 = 0;
      ground.velocityX = -4;
    }

  }

}

function poles() {
  if (frameCount % 60 === 0 && gameState === "play") {
    pole1 = createSprite(600, 50, 50, 200);
    pole1.height = Math.round(random(80, 500));
    pole1.velocityX = -4;
    pole1.shapeColor = "darkgreen";
    pole1.lifetime = 150;

    invisible3 = createSprite(600, 200, 10, 600);
    invisible3.velocityX = -4;
    invisible3.visible = false;
    invisible3.lifetime = 150;
    
    pole2 = createSprite(600, 400, 50, 200);
    pole2.velocityX = -4;
    pole2.shapeColor = "darkgreen";
    pole2.lifetime = 150;
    if (pole1.height < 150) {
      pole2.y = Math.round(random(400, 450));
      pole2.height = Math.round(random(300, 350));
    } else if (pole1.height < 250) {
      pole2.y = Math.round(random(450, 500));
      pole2.height = Math.round(random(250, 400));
    } else if (pole1.height < 350) {
      pole2.y = Math.round(random(500, 550));
      pole2.height = Math.round(random(100, 300));
    } else {
      pole2.y = Math.round(random(500, 550));
      pole2.height = Math.round(random(80, 150));
    }

    
    
    poleGroup.add(pole1);
    poleGroup.add(pole2);
    invisibleGroup.add(invisible3);
    
    gameOver.depth = pole1.depth
    gameOver.depth += 1;
    
    restart.depth = pole1.depth;
    restart.depth += 1;
    
    
  }
}

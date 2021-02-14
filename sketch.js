function preload(){
  spaceship_up = loadImage('images/spaceship_left.png');
  asteroid = loadAnimation('images/asteroid1.png','images/asteroid2.png','images/asteroid3.png');
  bg_asteroid = loadImage("images/bg_Asteroid.jpg");
  earthimg = loadImage("images/earth.png");
  bulletimg = loadImage("images/bullet.png");
  explosion1 = loadImage("images/explosion.png");
  start = loadImage("Start1.png");
  title = loadImage("TITLE.PNG");
  bg = loadImage("background.png");
}

function setup(){

  createCanvas(windowWidth,windowHeight);
  
  //background
  back = createSprite(windowWidth/2, windowHeight/2, width,height);
  back.addImage(bg_asteroid);
  back.scale = 3;

  //spaceship
  spaceship = createSprite(windowWidth/2, height-40);
  spaceship.addImage(spaceship_up);
  spaceship.scale = 0.3

  bulletGroup = createGroup();
  
  //earth
  earth = createSprite(200, 100);
  earth.addImage("earth", earthimg);
  earth.addImage("explosion", explosion1)
  earth.rotation = 360;
  earth.scale = 0.5;
  earth.rotateToDirection = true; 
  earth.velocityX = 5;
  
  group = createGroup();

  count = 3;

  //gameStates
  END = 0;
  PLAY = 1;
  START = 2;
  gameState = START;
}

function draw(){

  if(gameState === START){
    //story = createSprite(width/2, height/2);
    //story.addImage("Start1.png");
    background(0);
    push();
    imageMode (CENTER);
    image(title, width/2, 100, 400, 300);
    image(bg,width-50,height)
    image(bg,50,100)
    image(start, width/2, height/2, 400, 400);
    textSize(30);
    fill ("black");
    text("Press 'P' to play", width/2-100, height/2+150);
    pop ();
    if(keyDown("p")){
      gameState = PLAY;
    }
  }
  
  if(gameState === PLAY){
  back.velocityY = 1;

  earth.rotation = earth.rotation+1;

  if(back.y>height/2+100){
    back.y = height/2;
  }

  if(keyDown("space")){
    bullets();
  }

  spawnAsteroid();
    
  if(keyDown("left")){
    spaceship.mirrorX(-1);
    spaceship.x = spaceship.x - 7;
  }

  if(keyDown("right")){
    spaceship.mirrorX(1);
    spaceship.x = spaceship.x + 7;
  }

    group.collide(earth, explosion);
    for(var i = 0;i < group.length; i++){
      if(bulletGroup.isTouching(group)){
        
        if(group.get(i)!= null){
          var x =group.get(i)
          x.changeImage("explosion", explosion1);
          group.get(i).destroy();
          console.log(x);
        }
      }

      drawSprites();

      push()
      fill("yellow");
      textSize(20);
      text("Level 1", 50, 50);
      if(count !=0){
        textSize(20);
        text(count + " Lives left before explosion", width-250,50);
      }
      pop()
    }

    if(count === 0){
      gameState = END;
    }

  }

  if(gameState === END){
    back.velocityy = 0;
    group.setVelocityXEach(0);
    group.setVelocityYEach(0);
    earth.setVelocity (0, 0);
    drawSprites();
    textSize(50);
    fill("red")
    text("GAME OVER",width/2-100,50)
  }
}

function spawnAsteroid(){
  if(frameCount % 60 === 0){
  var asteroid_sprite = createSprite(random(0, width), 0);
  asteroid_sprite.addAnimation("asteroid", asteroid);
  asteroid_sprite.scale = 0.3;
  asteroid.rotation = (90, 180);
  asteroid.lifetime = 300

  asteroid_sprite.rotateToDirection = true;
  asteroid_sprite.velocityX = random(-4, 6);
  asteroid_sprite.velocityY = random(4, 8);
  group.add(asteroid_sprite);
  }
}

function bullets(){
  var bullets = createSprite(spaceship.x, spaceship.y);
  bullets. addImage(bulletimg);
  bullets.scale = 0.1;
  bullets.velocityY = -7;
  bullets.lifetime = 350
  bulletGroup.add(bullets);
}

function explosion(){
  count-= 1;
  if(count===2){
    earth.scale = 0.3;
  }
  if(count===1){
    earth.scale = 0.1;
  }
  if(count===0){
    earth.changeImage("explosion");
    earth.scale = 1;
  }
}
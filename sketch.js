const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var background,bgImg,bg2Img;
var hero,heroImg,coinImg,rubyImg;
var monster,monsterImg;
var monsterGroup;
var gameend,gameendImg;
var backgroundImg;
var reset,resetImg;
var coinGroup,energyGroup;
var fallDown,fallDownImg;
var scoreCollection = 0;
var bg = "gamingbackground2.png";


var END =0;
var PLAY =1;
var gameState = PLAY;


function preload(){
  bgImg = loadImage("gamingbackground2.png");
  bg2Img = loadImage("gamingbackGround1.jpg");
  heroImg = loadImage("Superhero.png");
  monsterImg = loadImage("monster.png");
  coinImg  = loadImage("coin.png");
  rubyImg = loadImage("ruby.png");
  gameendImg = loadImage("gameOver.png");
  resetImg = loadImage("restart.png");
  fallDownImg = loadImage("out.png");
  getBackgroundImg();
}

function setup() {
  engine = Engine.create();
  world = engine.world;

  createCanvas(3000,700);

  /*background = createSprite(1500,350);
  background.addImage(bgImg);
  background.velocityX = -3;
  background.x = background.width/2;*/

  hero = createSprite(300,350);
  hero.addImage(heroImg);
  hero.scale=1.5;

  
  fallDown = createSprite(300,350);
  fallDown.addImage(fallDownImg);
  fallDown.visible = false;

  reset = createSprite(1500,200);
  reset.addImage(resetImg);
  reset.visible = false;

  gameend = createSprite(1500,120);
  gameend.addImage(gameendImg);
  gameend.visible = false;

  monsterGroup = new Group();
  coinGroup = new Group();
  rubyGroup = new Group();

 
 
}

function draw() {
 if(backgroundImg)

 background(backgroundImg);

  Engine.update(engine);
  
  if(gameState === PLAY){

if(background.x < 1000 ){
    background.x = width/2;
  }

  if(hero.isTouching(coinGroup)){
    coinGroup.destroyEach();
      scoreCollection = scoreCollection + 1;
  }

  if(hero.isTouching(rubyGroup)){
    rubyGroup.destroyEach();
    scoreCollection = scoreCollection +200;
  }


  if(monsterGroup.isTouching(hero)){
   gameState = END;
  }
  createMonster();
  createCoin();
  createRuby();
  }

  else if(gameState === END){
    gameend.visible = true;
    reset.visible = true;
    monsterGroup.setVelocityXEach(0);
    monsterGroup.setLifetimeEach(-1);

    coinGroup.setVelocityXEach(0);
    coinGroup.setLifetimeEach(-1);

    rubyGroup.setVelocityXEach(0);
    rubyGroup.setLifetimeEach(-1);

  hero.visible = false;
  fallDown.visible = true;
  reset.visible = true;
  gameend.visible = true;
  
    background.velocityX = 0;
    if(mousePressedOver(reset)) {
      restart();
    }
  }

  
  

  hero.y = mouseY;


  edges= createEdgeSprites();
  hero.collide(edges);

  
  
  drawSprites();

  textSize(35);
  text("Score : "+ scoreCollection,250,50);
  fill("black");

  textSize(30);
  text("NOTE : IF YOU NEED MORE POINTS TRY TO FIND THE RUBY",1000,50);
  text("BUT YOU NEED TO CROSS THE MONSTER ",1000,100);
  fill("black")
 

}
function createMonster(){
  if (frameCount % 140 === 0){
    var monster = createSprite(3000,350);
   monster.y = Math.round(random(200,630));
   monster.addImage(monsterImg);
   monster.scale=0.3;
   monster.velocityX = -4;
   monster.lifetime = -1;
   monsterGroup.add(monster);
   }
}
function createCoin(){
   if (frameCount % 90 === 0){
    var coin = createSprite(3000,350);
   coin.y = Math.round(random(100,650));
   coin.addImage(coinImg);
   coin.scale=0.3;
   coin.velocityX = -4;
   coin.lifetime = -1;
   coinGroup.add(coin);
   }
}

function createRuby(){
if (frameCount % 900 === 0){
  var ruby = createSprite(3000,350);
 ruby.y = Math.round(random(100,650));
 ruby.addImage(rubyImg);
 ruby.scale=0.3;
 ruby.velocityX = -4;
 ruby.lifetime = -1;
 rubyGroup.add(ruby);
 }
}
function restart (){
  
  gameend.visible = false;
  reset.visible = false;
  background.velocityX = -3;
  
  gameState = PLAY;
  
  monsterGroup.destroyEach();
  coinGroup.destroyEach();
  rubyGroup.destroyEach();
  
  hero.visible = true;
   fallDown.visible = false;
  
 
  
  scoreCollection = 0;
  
}
async function getBackgroundImg(){
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=19){
        bg = "gamingbackground1.jpg";
        bg.velocityX = -3;
        bg.x <width/2
    }
    else{
        bg = "gamingbackground2.png";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}

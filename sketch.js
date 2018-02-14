//virtual camera
//move the mouse around
//the sprite follows the mouse but appears at the center of the sketch
//because the camera is following it

var ghost;
var bg;
var frame;
//the scene is twice the size of the canvas
var SCENE_W = 3200;
var SCENE_H = 1600;
var canvas;
var intensity;
var from;
var forecast;
var smog
var smogbg

function preload() {
  // console.log(loadJSON("https://jsonplaceholder.typicode.com/comments"));
  intensity = loadJSON("https://api.carbonintensity.org.uk/intensity");
  console.log(intensity);
  
  myFont = loadFont('assets/Karla-Regular.ttf');
}

function setup() {
  from = intensity.data[0].from;
  forecast = intensity.data[0].intensity.forecast;
  smog = forecast*0.3;
  console.log(from);
  canvas = createCanvas(windowWidth,windowHeight);
  
  //create a sprite and add the 3 animations
  ghost = createSprite(400, 200, 50, 100);
  
  var myAnimation = ghost.addAnimation("floating", "assets/ghost_standing0001.png", "assets/ghost_standing0007.png");
  myAnimation.offY = 18;
  
  ghost.addAnimation("moving", "assets/ghost_walk0001.png", "assets/ghost_walk0004.png");
  
  bg = new Group();
  
  //create some background for visual reference
  for(var i=0; i<smog; i++)
  {
  //create a sprite and add the 3 animations
  var cloud = createSprite(random(-width, SCENE_W+width), random(-height, SCENE_H+height));
  //cycles through rocks 0 1 2
  cloud.addAnimation("normal", "assets/cloudy"+i%3+".png");
  bg.add(cloud);
  }
  
  frame = loadImage("assets/frame.png");
}

function draw() {
  background(66,76,81,80);  
  textAlign(LEFT) ;
  textFont(myFont);
  textSize(32);
  fill(255);
  text("GREAT BRITAIN: " + from, ghost.position.x-680, ghost.position.y-360);
  text("Carbon Intensity Forcast: " + forecast +" gCO  "+ "/kWh", ghost.position.x-680, ghost.position.y-320);
  textSize(24);
  text("2", ghost.position.x-192, ghost.position.y-315)
  textSize(14);
  text("*The Carbon Intensity forecast includes CO2 emissions related to electricity generation only.", ghost.position.x-680, ghost.position.y+380);
  text("  More information at carbonintensity.org.uk", ghost.position.x-680, ghost.position.y+400);

  
  //mouse trailer, the speed is inversely proportional to the mouse distance
  ghost.velocity.x = (camera.mouseX-ghost.position.x)/20;
  ghost.velocity.y = (camera.mouseY-ghost.position.y)/20;
  
  //a camera is created automatically at the beginning
  
  //.5 zoom is zooming out (50% of the normal size)
  if(mouseIsPressed)
    camera.zoom = .5;
  else
    camera.zoom = 1;
  
  //set the camera position to the ghost position
  camera.position.x = ghost.position.x;
  camera.position.y = ghost.position.y;
  
  //limit the ghost movements
  if(ghost.position.x < 0)
    ghost.position.x = 0;
  if(ghost.position.y < 0)
    ghost.position.y = 0;
  if(ghost.position.x > SCENE_W)
    ghost.position.x = SCENE_W;
  if(ghost.position.y > SCENE_H)
    ghost.position.y = SCENE_H;
  

  //shadow using p5 drawing
  noStroke();
  fill(0,0,0,20);
  //shadow
  ellipse(ghost.position.x, ghost.position.y+90, 80, 30);
  //character on the top
  drawSprite(ghost);
  
  
    //draw the scene
  //rocks first
  drawSprites(bg);
  // if(mouseIsPressed) {
  //   user.displace(bg);
  // } else {
  //   user.collide(bg);
  // }
  
  //I can turn on and off the camera at any point to restore
  //the normal drawing coordinates, the frame will be drawn at 
  //the absolute 0,0 (try to see what happens if you don't turn it off
  camera.off();
  image(frame,0,0);
}

// RPG Game (Name Undecided)
// Matthew Resendes
// November 15th 2019 - 
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Tile set taken from https://opengameart.org/content/dungeon-crawl-32x32-tiles
// Font style taken from https://www.fontspace.com/chequered-ink/ancient-modern-tales
 let tiles;
 let tilesHigh, tilesWide;
 let tilesWidth, tilesHeight;
 let levelToLoad;
 let lines;

 let pulse;

let touchingStair = false;

let floorTile;
let playerSelect = 0;

let state; 

let player = {
  sprite: 0, 
  maxHealth:60,
  maxLevel: 15,
  health:  60, 
  attack: 1, 
  defense: 0,
  x:0, 
  y:0,
  level: 0,
  lastXp: 0,
  xp: 0
};


let switcher = true;
let alpha = 250;
let floorNumber;

let movingUp = false, movingDown = false, movingLeft = false, movingRight = false;

function preload(){
  font = loadFont("assets/Ancient Modern Tales.otf")
  levelToLoad = "assets/levels/1.txt";
  lines = loadStrings(levelToLoad);

  wall = loadImage ("sprites/brick_dark0.png");
  blackEmpty = loadImage("sprites/black_empty.png")
  whiteEmpty = loadImage("sprites/white_empty.png");
  floor1 = loadImage("sprites/cobble_blood3.png");
  floor2 = loadImage("sprites/cobble_blood4.png");
  floor3 = loadImage("sprites/cobble_blood5.png");
  gFloor2 = loadImage("sprites/lair3.png");
  enter = loadImage("sprites/dngn_enter.png");

  player.sprite = loadImage("sprites/angel.png");
  mage = loadImage("sprites/mage.png");
  warrior = loadImage("sprites/warrior.png");
  wizardBg = loadImage("sprites/wizard_background.jpg");


  //player = 
  //enemie 1 = 
}

function setup() {
  // 2:1 ratio
  createCanvas(1500, 750 );
  state = "menu"
  textAlign(CENTER, CENTER);

  tilesHigh = lines.length;
  tilesWide = lines[0].length;

  tileWidth = width / tilesWide ;
  tileHeight = height / tilesHigh;

  tiles = createEmpty2dArray(tilesWide, tilesHigh);

  //put values into 2d array of characters
  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      let tileType = lines[y][x];
      tiles[x][y] = tileType;
    }
  }
}

function draw() {
  background(0);
  updateState();
}

function updateState(){
  if (state === "menu"){
    displayMenu(); 
  }
  else if (state === "option"){
    displayOptions();
  }
  else if (state === "gameChoice"){
    displayGameChoice();
  }
  else if (state === "gameLoop"){
    gameLoop();
  }
}
function displayMenu(){
  background ("#524646");
// Game text 
  textSize(55);
  textFont(font);
  text ("RPG Game", width/2, height/3 )
  menuButtons();
}

function menuButtons(){
//Creates start button
  rectMode(CORNER);
  startButton = new Clickable(width/2 - 100, height/2);
  startButton.resize(200, 70);
  startButton.color = "#b00e0e";
  startButton.textSize = 20;
  startButton.textFont = font;
  startButton.text = "New Game"
  startButton.draw();
  startButton.onHover = function(){
    startButton.color = "#800606"
    startButton.draw();
  }
  startButton.onPress = function(){
    state = "gameChoice";
    clear();
  }
  

//Creates option button
  optionButton = new Clickable(width/2 - 100 , height/2 + 125)
  optionButton.resize(200, 70);
  optionButton.color = "#b00e0e";
  optionButton.textSize = 20;
  optionButton.textFont = font;
  optionButton.text = "Options"
  optionButton.draw();
  optionButton.onHover = function(){
    optionButton.color = "#800606"
    optionButton.draw();
  }
  optionButton.onPress = function(){
    console.log("press")
    state = "option";
    clear();
  }
}


function displayOptions(){
  background ("#524646");
  optionsButtons();
}

function optionsButtons(){
  // Creates the button to go back to menu
  optionBackButton = new Clickable(width/2 - 100 , height/2 + 125)
  optionBackButton.resize(200, 70);
  optionBackButton.color = "#b00e0e";
  optionBackButton.textSize = 20;
  optionBackButton.textFont = font;
  optionBackButton.text = "Back"
  optionBackButton.draw();
  optionBackButton.onHover = function(){
    optionBackButton.color = "#800606"
    optionBackButton.draw();
  }
  optionBackButton.onPress = function(){
    state = "menu";
    clear();
  }
}

function displayGameChoice(){
  background(43,75,210);
  rectMode(CENTER);
  fill(255);
  stroke(0);
  strokeWeight(20);
  rect(width/2, height/2.5, 300, 450);
  displayGameChoiceButtons();

}

let playerSelectBool;
function displayGameChoiceButtons(){
  rectMode(CORNER);

  nextButton = new Clickable(width/2 - 22.5, height/1.6);
  nextButton.resize(45,30);
  nextButton.color = "#b00e0e";
  nextButton.textFont = font;
  nextButton.textSize = 25;
  nextButton.text = "Next";
  nextButton.draw();
  nextButton.onPress = function(){
    playerSelect ++;
  }
  displayPlayerSelect();
  // Creates the button to confirm Choice
  confirmButton = new Clickable(width/2 - 100, height - height/4);
  confirmButton.resize(200, 70);
  confirmButton.color = "#b00e0e";
  confirmButton.textSize = 20;
  confirmButton.textFont = font;
  confirmButton.text = "Confirm";
  confirmButton.draw();
  confirmButton.onHover = function(){
    confirmButton.color = "#800606"
    confirmButton.draw();
  }
  confirmButton.onPress = function(){
    console.log("press")
    state = "gameLoop";
    clear();
  }
}

function displayPlayerSelect(){
  if (playerSelect === 0){
    fill("black");
    textSize(30);
    text("Mage", width/2, height/2)
    image(wizardBg, width/2 - 125, height/2.5 - 200, 250, 250);
    image(mage, width/2 - 25, height/2.5 - 100, 50, 50);
    player.sprite = mage;
  }
  if (playerSelect === 1){
    fill(0);
    textSize(30);
    text("Warrior", width/2, height/2)
    fill("green");
    image(warrior, width/2 - 25, height/2.5 - 100, 50, 50);
    //rect(width/2 - 125, height/2.5 - 200, 250, 250);
    player.sprite = warrior;
  }
  if (playerSelect === 2){
    fill("purple")
    rect(width/2 - 125, height/2.5 - 200, 250, 250);
  }
  else if (playerSelect === 3){
    playerSelect = 0;
  }
}


function gameLoop(){
  displayMap();
  playerMovement();
  updateHealthBar();
  gameLoopButtons();
  playerLevelUp();
}

function gameLoopButtons(){

}

function playerLevelUp(){
  //Levels the player up incresing Health
  for (let i = 0; i < player.maxLevel; i++)
    if (player.xp >= player.lastXp + 500){
      player.health = player.health * 1.1;
      player.maxHealth = player.maxHealth * 1.1;
      player.level ++;
      player.lastXp = player.lastXp + 500;
      updateHealthBar();
  }
}

function displayLevel() {
  // Draws the correct image to character
  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      showTile(tiles[x][y], x, y);
    }
  }
} 

function displayMap(){
  displayLevel();
}


function showTile(location, x, y){
  // Converts # into walls 
  if (location === "#"){
    image(wall, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
  }
  // Converts . into floors
  else if (location === "."){
    floorRandomizer();
    image(floorTile, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
  }
  // Converts x into black spaces 
  else if (location === "X"){
    image(blackEmpty, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
  }
  else if (location === ">"){
    image(floor2, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
    image(enter, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
  }
}

function floorRandomizer(){
  floorNumber = ceil(random(1,3));
  if (floorNumber === 1){
    floorTile = floor1;
  }
  else if (floorNumber === 2){
    floorTile = floor2;
  }
  else if (floorNumber === 3){
    floorTile = floor3;
  }
}
  

function createEmpty2dArray(cols, rows) {
  //Creates a empty 2d array
  let randomGrid = [];
  for (let x = 0; x < cols; x++) {
    randomGrid.push([]);
    for (let y = 0; y < rows; y++) {
      randomGrid[x].push(0);
    }
  }
  return randomGrid;
}

function updateHealthBar(){
  // Creates a functioning Health bar with scalablity to level
  x = map(player.health, 0, player.maxHealth, 0, 110);
  rectMode(CENTER);
  fill(0);
  rect(width/15, height/16, 120, 25);
  fill(0,255,0);
  rect(width/15, height/16, x, 15);
  textSize(19);
  fill(255,0,0);
  text("Health : " + floor(player.health), width/15, height/16);
  death();
}
function playerMovement(){
  image(player.sprite, player.x, player.y, tileWidth, tileHeight);
  if (movingUp) {
    player.y -= 3;
  }
  if (movingDown) {
    player.y += 3;
  }
  if (movingLeft) {
    player.x -=3;
  }
  if (movingRight) {
    player.x +=3;
  }
}

function keyPressed() {
  if (key === "w") {
    movingUp = true;
  }
  if (key === "s") {
    movingDown = true;
  }
  if (key === "a") {
    movingLeft = true;
  }
  if (key === "d") {
    movingRight = true;
  }
}

function keyReleased() {
  if (key === "w") {
    movingUp = false;
  }
  if (key === "s") {
    movingDown = false;
  }
  if (key === "a") {
    movingLeft = false;
  }
  if (key === "d") {
    movingRight = false;
  }
}

function death(){
  if (player.health <= 0){
    fill(255, 0, 0, 255);
    textSize(60);
    text("Game Over", width/2, height/2);
    textSize(27);
    fill(255,0,0, alpha)
    text("Press SPACEBAR TO RESTART", width/2, height/2 + 40);
    if (alpha <= 255 && switcher === true){
      alpha -= 5
    }
    if (alpha === 255){
      switcher = true;
    }
    if (alpha === 0){
      switcher = false;
    }
    if (alpha >= 0 && switcher === false){
      alpha += 5;
    }
    console.log(alpha);
    if (keyPressed){
      if (keyCode === 32){
      state = "menu";
      }
    } 
  }
}

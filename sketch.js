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

function preload(){
  font = loadFont("assets/Ancient Modern Tales.otf")
  levelToLoad = "assets/levels/2.txt";
  lines = loadStrings(levelToLoad);
  wall = loadImage ("sprites/brick_dark0.png");
  blackEmpty = loadImage("sprites/black_empty.png")
  whiteEmpty = loadImage("sprites/white_empty.png");
  floor = loadImage("sprites/cobble_blood3.png");
  floor2 = loadImage("sprites/lair3.png");
  player.sprite = loadImage("sprites/angel.png");
  


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
    clear();
    state = "gameChoice";
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
    clear();
    state = "option";
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
    clear();
    state = "menu";
  }
}

function displayGameChoice(){
  background(43,75,210);
  displayGameChoiceButtons();

}

function displayGameChoiceButtons(){
  // fill(0);
  // rect(width/4, height/3, 300, 500);
  // rect(width- width/4, height/3, 300, 500);
  
  // Creates the button to confirm Choice
  confirmButton = new Clickable(width/2 - 100, height - height/4)
  confirmButton.resize(200, 70);
  confirmButton.color = "#b00e0e";
  confirmButton.textSize = 20;
  confirmButton.textFont = font;
  confirmButton.text = "Confirm"
  confirmButton.draw();
  confirmButton.onHover = function(){
    confirmButton.color = "#800606"
    confirmButton.draw();
  }
  confirmButton.onPress = function(){
    clear();
    console.log("press")
    state = "gameLoop";
  }
}

function gameLoop(){
  background(255);
  displayLevel();
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
      player.health = player.health * 1.3;
      player.maxHealth = player.maxHealth * 1.3;
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


function showTile(location, x, y){
  // Converts # into walls 
  if (location === "#"){
    image(wall, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
  }
  // Converts . into floors
  else if (location === "."){
    image(floor2, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
  }
  // Converts x into black spaces 
  else if (location === "x"){
    image(blackEmpty, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
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
  x = map(player.health, 0, player.maxHealth, 0, 90);
  rectMode(CENTER);
  fill(0);
  rect(width/15, height/16, 100, 20);
  fill(0,255,0);
  rect(width/15, height/16, x, 10);
  textSize(15);
  fill(255,0,0);
  console.log("ran")
  text("Health : " + floor(player.health), width/15, height/16);
}

function keyIsDown(){
  if (key === "w" || key === UP_ARROW){
    player.y -= 1;
  }
  if (key === "s" || key === DOWN_ARROW){
    player.y += 1;
  }
  if (key === "a" || key === LEFT_ARROW){
    player.x -= 1;
  }
  if (key === "d" || key === RIGHT_ARROW){
    player.x += 1;  
  }
}

function playerMovement(){
  image(player.sprite, player.x, player.y, tileWidth, tileHeight);
}


// keep player outside of text based grid
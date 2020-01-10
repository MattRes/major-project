// RPG Game (Name Undecided)
// Matthew Resendes
// November 15th 2019 - 
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Tile set taken from https://opengameart.org/content/dungeon-crawl-32x32-tiles
// Font style taken from https://www.fontspace.com/chequered-ink/ancient-modern-tales
 let playMap;
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
  x:6, 
  y:3,
  level: 0,
  lastXp: 0,
  xp: 0
};


let switcher = true;
let alpha = 250;
let floorNumber;

function preload(){
  //FANCY GAME FONT
  font = loadFont("assets/Ancient Modern Tales.otf")

  levelToLoad = "assets/levels/1.txt";

  // LEVELS 
  level1 = "assets/levels/1.txt";
  level2 = "assets/levels/2.txt";
  level3  = "assets/levels/3.txt";
  lines = loadStrings(levelToLoad);

  // MAP ASSETS
  wall = loadImage ("sprites/mapassets/brick_dark0.png");
  blackEmpty = loadImage("sprites/mapassets/black_empty.png")
  whiteEmpty = loadImage("sprites/mapassets/white_empty.png");
  floor1 = loadImage("sprites/mapassets/cobble_blood3.png");
  floor2 = loadImage("sprites/mapassets/cobble_blood4.png");
  floor3 = loadImage("sprites/mapassets/cobble_blood5.png");
  gFloor2 = loadImage("sprites/mapassets/lair3.png");
  enter = loadImage("sprites/mapassets/dngn_enter.png");

  // PLAYER SPRITES
  mage = loadImage("sprites/player/mage.png");
  wizardBg = loadImage("sprites/wizardbg.png");

  warrior = loadImage("sprites/player/warrior.png");
  warriorBg = loadImage("sprites/warriorbg.jpg");

  ranger = loadImage("sprites/player/ranger.png");
  rangerBg = loadImage("sprites/rangerbg.jfif");

  orc = loadImage("sprites/enemies/orc_warrior.png");
  turtle = loadImage("sprites/enemies/turtle.png");

  // ITEMS
  healthPotion = loadImage("sprites/items/Potions/health_potion.png");
  poisonPotion = loadImage("sprites/items/Potions/posion_potion.png");

  //MELEE WEAPONS 
  battleAxe = loadImage("sprites/items/Melee/battle_axe1.png");
  executioner = loadImage("sprites/items/Melee/executioner_axe1.png");
  falchion = loadImage("sprites/items/Melee/falchion1.png");
  club = loadImage("sprites/items/Melee/giant_club.png");
  halberd = loadImage("sprites/items/Melee/halberd2.png");
  smallAxe = loadImage("sprites/items/Melee/hand_axe2.png");
  longSword = loadImage("sprites/items/Melee/long_sword.1.png");

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

  playMap = createEmpty2dArray(tilesWide, tilesHigh);

  //put values into 2d array of characters
  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      let tileType = lines[y][x];
      playMap[x][y] = tileType;
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

  // Creates a button to toggle through playable characters 
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
  // Allows for the character to select a player from Mage, Warrior and Ranger
  if (playerSelect === 0){
    fill("black");
    textSize(30);
    text("Mage", width/2, height/2)
    image(wizardBg, width/2 - 125, height/2.5 - 200, 250, 250);
    image(mage, width/2 - 37.5, height/2.5 - 60, 75, 75);
    player.sprite = mage;
    mageStats();
  }
  if (playerSelect === 1){
    fill(0);
    textSize(30);
    text("Warrior", width/2, height/2)
    image(warriorBg, width/2 - 125, height/2.5 - 200, 250, 250);
    image(warrior, width/2 - 37.5, height/2.5 - 50, 75, 75);
    player.sprite = warrior;
    warriorStats();
  }
  if (playerSelect === 2){
    textSize(30);
    text("Ranger", width/2, height/2 - height/44)
    image(rangerBg, width/2 - 125, height/2.5 - 200, 250, 250);
    image(ranger, width/2 - 37.5, height/2.5 - 37.5 , 75, 75);
    player.sprite = ranger;
    rangerStats();

  }
  else if (playerSelect === 3){
    playerSelect = 0;
  }
}

function mageStats(){
  textSize(15);
  text("Health:" + player.maxHealth, width/2, height/2 + height/30);
  text("Attack:" + player.attack, width/2, height/2 + height/16);
  text("Defense:" + player.defense, width/2, height/2 + height/11);
  player.maxHealth = 40;
  player.health = 40; 
  player.attack = 3;
  player.defense = 0;
}

function warriorStats(){
  textSize(15);
  text("Health:" + player.maxHealth, width/2, height/2 + height/30);
  text("Attack:" + player.attack, width/2, height/2 + height/16);
  text("Defense:" + player.defense, width/2, height/2 + height/10);
  player.maxHealth = 65;
  player.health = 65; 
  player.attack = 1.5;
  player.defense = 3;
}

function rangerStats(){
  textSize(15);
  text("Health:" + player.maxHealth, width/2, height/2 + height/30);
  text("Attack:" + player.attack, width/2, height/2 + height/16);
  text("Defense:" + player.defense, width/2, height/2 + height/10);
  player.maxHealth = 55;
  player.health = 55; 
  player.attack = 1.5;
  player.defense = 1;
}

function gameLoop(){
  displayMap();
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
  }
}


function displayLevel() {
  // Draws the correct image to character
  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      showTile(playMap[x][y], x, y);
    }
  }
} 

function displayMap(){
  displayLevel();
}


function showTile(location, x, y){
  if (location === "#"){
    // Converts # into walls 
    image(wall, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
    movable = true;
  }
  else if (location === "."){
    // Converts . into floors
    floorRandomizer();
    image(floor3, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
  }
  else if (location === "X"){
    // Converts x into black spaces 
    image(blackEmpty, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
  }
  else if (location === ">"){
    // Converts > into stairs
    image(floor2, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
    image(enter, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
  }
  else if (location === "O"){
    image(floor2, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
    image(orc, x*tileWidth, y*tileHeight, tileWidth, tileHeight);

  }
  else if (location === "P"){
    // Converts S into spawn points
    image(floor2, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
    image(player.sprite, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
    player.x = x;
    player.y = y;
  }
}

function floorRandomizer(){
  // Randomizes the floors tiles make it slightly less painful to look at 
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
  reScale = map(player.health, 0, player.maxHealth, 0, 110);
  rectMode(CENTER);
  fill(0);
  rect(width/15, height/16, 120, 25);
  fill(0,255,0);
  rect(width/15, height/16, reScale, 15);
  textSize(19);
  fill(255,0,0);
  text("Health : " + floor(player.health), width/15, height/16);
  death();
  xCoor = player.x
  yCoor = player.y

  console.log(xCoor, yCoor, );
}

function death(){
  // Allows the player to die when their health reaches 0
  if (player.health <= 0){
    fill(255, 0, 0, 255);
    textSize(60);
    text("Game Over", width/2, height/2);
    textSize(27);
    fill(255,0,0, alpha)
    text("Press SPACEBAR TO RESTART", width/2, height/2 + 40);

    // Adjusts the alpha of the press to restart text to give it a blinking animation
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
    // Sends playe back to the main menu
    if (keyPressed){
      if (keyCode === 32){
      state = "menu";
      }
    } 
  }
}
let infront;
function keyPressed(){
  playMap[player.x][player.y] = ".";
  if (key === "w" || keyCode === UP_ARROW){
    if (playMap[player.x][player.y-1] != "#" ){
      player.y -= 1;
    }
  }
  if (key === "s" || keyCode === DOWN_ARROW){
    if (playMap[player.x][player.y+1] != "#" ){
      player.y += 1;
    }
  }
  if (key === "d" || keyCode === LEFT_ARROW){
    if (playMap[player.x+1][player.y] != "#" ){
      player.x += 1;
    }
  }
  if (key === "a" || keyCode === RIGHT_ARROW){
    if (playMap[player.x-1][player.y] != "#" ){
      player.x -= 1;
    }
  }
  playMap[player.x][player.y] = "P";
}

// function stairs(){
//   if (playMap[player.x][player.y] === "<"){
//       levelToLoad = l;
//       l++

//     }
//   } 

// class enemy{
//   constructor(type, x, y){
//     this.type = type;
//     this.x = x;
//     this.y = y; 

//   }
// }
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
let playerHasItem;
let pulse;
let color;
let floorTile;
let playerSelect = 0;
let state; 
let sound = false;

let player = {
  sprite: 0, 
  maxHealth:60,
  maxLevel: 15,
  health:  60,
  baseAttack:1, 
  attack: 1, 
  defense: 0,
  x:0, 
  y:0,
  direction: "right",
  level: 0,
  lastXp: 0,
  xp: 0
};

let orc = {
  sprite: 0,
  x:0,
  y:0, 
  attack:3, 
  health: 20
};

let inventory = [];
let tileType;
let chestItem;
let chestItemSprite;
let r;
chestOpened = false;
let switcher = true;
let alpha = 250;
let floorNumber;
let lv1, lv2, lv3;
let attackSound;

function preload(){
  //FANCY GAME FONT
  font = loadFont("assets/Ancient Modern Tales.otf");
  attackSound = loadSound("assets/attackSound.mp3");

  // LEVELS 
  lv1 = "assets/levels/1.txt";
  lv2 = "assets/levels/2.txt";
  lv3  = "assets/levels/3.txt";
  levelToLoad = lv1;
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
  chest = loadImage("sprites/mapassets/chest.png");
  chestOpen = loadImage("sprites/mapassets/chest_open.png");
  trap = loadImage("sprites/mapassets/trap.png");

  // PLAYER SPRITES
  mage = loadImage("sprites/player/mage.png");
  wizardBg = loadImage("sprites/wizardbg.png");
  
  warrior = loadImage("sprites/player/warrior.png");
  warriorBg = loadImage("sprites/warriorbg.jpg");
  
  ranger = loadImage("sprites/player/ranger.png");
  rangerBg = loadImage("sprites/rangerbg.jfif");
  
  orcSprite = loadImage("sprites/enemies/orc_warrior.png");
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
  longSword = loadImage("sprites/items/Melee/long_sword1.png");
  
  //Ranged weapons
  crossbow = loadImage("sprites/items/Ranged/crossbow1.png");
  handCrossBow = loadImage("sprites/items/Ranged/hand_crossbow.png");
  throwingStone = loadImage("sprites/items/Ranged/stone.png");
  
  arrow = loadImage("sprites/items/Ranged/elven_arrow.png");
}
// Weapon Stats

  axe1 = {
    name: "Battle Axe",
    sprite: 0,
    attackSpeed: 1,
    attack:2,
  };
  excutioner = {
    name: "Executioner",
    sprite: 0,
    attackSpeed: 1,
    attack:3,
  };
  falchion1 = {
    name: "Falchion",
    sprite: 0,
    attackSpeed: 1,
    attack:2,
  };
  club1 = {
    name: "Club",
    sprite: 0,
    attackSpeed: 1,
    attack:1.5,
  };
  halberd1 = {
    name: "Halberd",
    sprite: 0,
    attackSpeed: 1,
    attack:1,
  };
  axe2 = {
    name: "Hatchet",
    sprite: 0,
    attackSpeed: 2,
    attack:2,
  };
  longSword1 = {
    name: "Long Sword",
    sprite: 0,
    attackSpeed: 1.5,
    attack:3,
  };
  crossbow1 = {
    name: "Crossbow",
    sprite: 0,
    attackSpeed: 1,
    attack:2,
  };
  handCrossBow1 = {
    name: "Hand Crossbow",
    sprite: 0,
    attackSpeed: 2,
    attack:1.5,
  };
  stone = {
    name: "Stone",
    sprite: 0,
    attackSpeed: 3,
    attack:0.5,
  };
  poisonPotion1 = {
    name: "Magic Potion",
    sprite: 0, 
    attackSpeed: 0,
    attack: 0
  };
  healthPotion1 = {
    name: "Health Potion",
    sprite: 0,
    attackSpeed: 0,
    attack: 0
  };
function setup() {
  axe1.sprite = battleAxe;
  excutioner.sprite = executioner;
  falchion1.sprite = falchion;
  club1.sprite = club;
  halberd1.sprite = halberd;
  axe2.sprite = smallAxe;
  longSword1.sprite = longSword;
  crossbow1.sprite = crossbow;
  handCrossBow1.sprite = handCrossBow;
  stone.sprite = throwingStone;
  healthPotion1.sprite = healthPotion;
  poisonPotion1.sprite = poisonPotion;

  orc.sprite = orcSprite;
  color = "#800606";
  // 2:1 ratio
  createCanvas(1500, 750 );
  state = "menu"
  textAlign(CENTER, CENTER);
  
  tilesHigh = lines.length;
  tilesWide = lines[0].length;
  
  
  tileWidth = width / tilesWide ;
  tileHeight = height / tilesHigh;
  
  playMap = createEmpty2dArray(tilesWide, tilesHigh);
  
  chestItems = [axe1, excutioner, falchion1, club1, halberd1, axe2, longSword1, crossbow1, handCrossBow1, stone]; //healthPotion1, poisonPotion1
  //put values into 2d array of characters
  for (let y = 0; y < tilesHigh; y++) {
    for (let x = 0; x < tilesWide; x++) {
      tileType = lines[y][x];
      playMap[x][y] = tileType;
    }
 }
  
  playerHasItem = false;
  playerHasHealthPotion = true;
  playerHealthPotions = 5; 
}

function draw() {
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
  else if (state === "level1"){
    level1();
  }
  else if (state === "level2"){
    level2();
  }
  else if (state === "level3"){
    level3();
  }

  else if (state === "controlDisplay")
    displayControls();
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
  // Creates the control menu buttin
  controlsMenu = new Clickable(width/2- 100, height/2);
  controlsMenu.resize(200, 70);
  controlsMenu.color = "#b00e0e";
  controlsMenu.textSize = 20;
  controlsMenu.textFont = font;
  controlsMenu.text = "Controls";
  controlsMenu.draw();

  controlsMenu.onHover = function(){
    controlsMenu.color = "#800606";
    controlsMenu.draw();
  }
  controlsMenu.onPress = function(){
    state = "controlDisplay";
    clear();
  }

  //Creates a sound button
  soundButton = new Clickable(width/2- 100, height/2 - 125);
  soundButton.resize(200, 70);
  soundButton.color = color;
  soundButton.textSize = 20;
  soundButton.textFont = font;
  soundButton.text = "Sound";
  soundButton.draw();

  soundButton.onHover = function(){
    soundButton.color = "#800606";;
    soundButton.draw();
  }
  soundButton.onPress = function(){
    if (sound === true){
      color = "#800606";
      soundButton.color = color;
      soundButton.draw();
      sound = false;
      console.log(sound)
      
    }
    else if (sound === false){
      color = "#00FF00";
      soundButton.color = color;
      soundButton.draw();
      sound = true;
      console.log(sound)
  }
}
}
function displayControls(){
  background(43,75,210);
  fill(0);
  textSize(30)
  text("W,A,S,D - Movement", width/2, height/3)
  text("E - Interact Key", width/2, height/3 + 50)
  text("Space Bar - Attack", width/2, height/3 + 100)
  text("H or Click on potions - Consume Potion", width/2, height/3 + 150)
  controlMenuButtons();
}

function controlMenuButtons(){
  controlBackButton = new Clickable(width/2 - 100 , height/2 + 125)
  controlBackButton.resize(200, 70);
  controlBackButton.color = "#b00e0e";
  controlBackButton.textSize = 20;
  controlBackButton.textFont = font;
  controlBackButton.text = "Back"
  controlBackButton.draw();

  controlBackButton.onHover = function(){
    controlBackButton.color = "#800606"
    controlBackButton.draw();
  }
  controlBackButton.onPress = function(){
    state = "option";
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
    state = "level1";
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
    text("Ranger", width/2, height/2);
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
  player.baseAttack = 3;
  player.defense = 0;
}

function warriorStats(){
  textSize(15);
  text("Health:" + player.maxHealth, width/2, height/2 + height/30);
  text("Attack:" + player.attack, width/2, height/2 + height/16);
  text("Defense:" + player.defense, width/2, height/2 + height/10);
  player.maxHealth = 65;
  player.health = 65; 
  player.attack = 2;
  player.baseAttack = 2;
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
  player.baseAttack = 1.5;
  player.defense = 1;
}
function level1(){
  displayLevel();
  updateHealthBar();
  levelButtons();
  playerLevelUp();
  chestMenu();
}
function level2(){
  changeMap();
  displayLevel();
  updateHealthBar();
  levelButtons();
  playerLevelUp();
  chestMenu();
}
function level3(){
  displayLevel();
  updateHealthBar();
  levelButtons();
  playerLevelUp();
  chestMenu();
}

function levelButtons(){
  rectMode(CORNER);
  fill(255);
  textSize(15);
  text("Magic", width - 75, height - 120, 50, 50);
  rect(width - 75, height - 75, 50, 50);
  text("Health", width - 135, height - 120, 50, 50);
  rect(width - 135, height - 75, 50, 50);
  text("Weapon", width - 195, height - 120, 50, 50);
  rect(width - 195, height - 75, 50, 50);
  if (playerHasItem){
    image(chestItemSprite, width - 195, height - 75, 50, 50);
  }
  if (playerHasHealthPotion){
    fill(255,0,0);
    textSize(20);
    healthButton = new Clickable(width - 135, height - 75);
    healthButton.resize(52,52);
    healthButton.cornerRadius = 0;
    healthButton.color = ("#ffffff");
    healthButton.textSize = 20;
    healthButton.textFont = font;
    healthButton.text = "";
    healthButton.draw();
    healthButton.onPress = function(){
      if (playerHealthPotions > 0){
        player.health +=20;
        if (player.health > player.maxHealth){
          player.health = player.maxHealth;
        }
        playerHealthPotions --;
      }
      else;
    }
  
    image(healthPotion1.sprite, width - 135, height - 75, 50, 50);
    text(playerHealthPotions, width - 115, height - 60, 50, 50);
  }   
}

function playerLevelUp(){
  //Levels the player up incresing Health
  for (let i = 0; i < player.maxLevel; i++)
    if (player.level < player.maxLevel){
      if (player.xp >= player.lastXp + 500){
        player.health = player.health * 1.1;
        player.maxHealth = player.maxHealth * 1.1;
        player.level ++;
        player.lastXp = player.lastXp + 500;
  }
  else;
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

function showTile(location, x, y){
  if (location === "#"){
    // Converts # into walls 
    image(wall, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
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
    image(orcSprite, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
    orc.x = x;
    orc.y = y;
  }
  else if (location === "P"){
    // Converts S into spawn points
    image(floor2, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
    image(player.sprite, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
    player.x = x;
    player.y = y;
  }
  else if (location === "C"){
    image(floor2, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
    image(chest, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
  }
  else if (location === "Q"){
    image(floor2, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
    image(chestOpen, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
  }
  else if (location === "T"){
    image(floor2, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
    image(trap, x*tileWidth, y*tileHeight, tileWidth, tileHeight);
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
  
let randomGrid;
function createEmpty2dArray(cols, rows) {
  //Creates a empty 2d array
  randomGrid = [];
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
    // Sends player back to the main menu
    if (keyPressed){
      if (keyCode === 32){
      state = "menu";
      }
    } 
  }
}

function keyPressed(){
  // Main movement
  playMap[player.x][player.y] = ".";
  if (key === "w" || keyCode === UP_ARROW){
    // if w or the up arrow is pressed, it checks if the player can move and if on trap -10 health
    player.direction = "up";
    if (playMap[player.x][player.y-1] === "."|| playMap[player.x][player.y-1] === "T"){
      if (playMap[player.x][player.y-1] === "T"){
        player.health -= 10;
      }
      player.y -= 1;
    }
    else;;
  }
  if (key === "s" || keyCode === DOWN_ARROW){
    // if s or the down arrow is pressed, it checks if the player can move and if on trap -10 health
    player.direction = "down";
    if (playMap[player.x][player.y+1] === "."|| playMap[player.x][player.y+1] === "T"){
      if (playMap[player.x][player.y+1] === "T"){
        onTrap = true;
        player.health -= 10;
      }
      player.y += 1;
    }
    else;
  }
  if (key === "d" || keyCode === RIGHT_ARROW){
    // if d or the right arrow is pressed, it checks if the player can move and if on trap -10 health
    player.direction = "right";
    if (playMap[player.x+1][player.y] === "."|| playMap[player.x+1][player.y] === "T"){
      if (playMap[player.x+1][player.y] === "T"){
        player.health -= 10;
      }
      player.x += 1;
    }
    else;
  }
  if (key === "a" || keyCode === LEFT_ARROW){
    // if a or the left arrow is pressed, it checks if the player can move and if on trap -10 health
    player.direction = "left";
    if (playMap[player.x-1][player.y] === "." || playMap[player.x-1][player.y] === "T"){
      if (playMap[player.x-1][player.y] === "T"){
        player.health -= 10;
      }
      player.x -= 1;
    }
    else;
  }

  if (key === "h"){
    // Use health potions
    if (playerHealthPotions > 0){
      player.health +=20;
      if (player.health > player.maxHealth){
        player.health = player.maxHealth;
      }
      playerHealthPotions --;
    }
    else;
  }
  if (key === "e"){
    //Chest interaction 
    if (direction = "right" && playMap[player.x+1][player.y] === "C"){
      playMap[player.x+1][player.y] = "Q"
      chestOpened = true;
      chestDropPopUp();
    }
    if (direction = "left" && playMap[player.x-1][player.y] === "C"){
      playMap[player.x-1][player.y] = "Q"
      chestOpened = true;
      chestDropPopUp();
    }
    if (direction = "up" && playMap[player.x][player.y-1] === "C"){
      playMap[player.x][player.y-1] = "Q"
      chestOpened = true;
      chestDropPopUp();
    }
    if (direction = "down" && playMap[player.x][player.y+1] === "C"){
      playMap[player.x][player.y+1] = "Q"
      chestOpened = true;
      chestDropPopUp();
    }
    
    //Stair interaction
    if (direction = "right" && playMap[player.x+1][player.y] === ">"){
      changeMap();
      stairs();
      }
    else if (direction = "left" && playMap[player.x-1][player.y] === ">"){
      changeMap();
      stairs();
    }
    else if (direction = "up" && playMap[player.x][player.y-1] === ">"){
      changeMap();
      stairs();
    }
    else if (direction = "down" && playMap[player.x][player.y+1] === ">"){
      changeMap();
      stairs();
      }
    }

  if (keyCode === 32){
    // Checks to see if theres something to attack
    if (direction = "right" && playMap[player.x+1][player.y] === "O"){
      orc.health = orc.health - player.attack;
      if (sound === true){
        attackSound.play();
      }
    }
    if (direction = "left" && playMap[player.x-1][player.y] === "O"){
      orc.health = orc.health - player.attack;
      if (sound){
        attackSound.play();
      }
    }
    if (direction = "up" && playMap[player.x][player.y-1] === "O"){
      orc.health = orc.health - player.attack;
      if (sound){
        attackSound.play();
      }
    }
    if (direction = "down" && playMap[player.x][player.y+1] === "O"){
      orc.health = orc.health - player.attack;
      if (sound){
        attackSound.play();
      }
    }
    if (playMap[player.x][player.y] === playMap[orc.x][orc.y])
      orc.health = orc.health - player.attack;
      if (sound){
        attackSound.play();
      }
}
  playMap[player.x][player.y] = "P";
  orcMovement();
};

function chestMenu(){
  // Creates the main chest menu
  if (chestOpened){
    rectMode(CENTER);
    fill(0,0,255)
    rect(width/2,height/2, 300, 200);
    fill(255);
    rect(width/2,height/2, 280, 180);
    fill(0);
    text("Congratulations! You found a " + chestItem, width/2, height/3 + 50)
    image(chestItemSprite, width/2 - 50, height/3 + 85, 100, 100);
    text("Damage: " + chestItems[r].attack, width/2 + 90, height/2 - 40);    
    text("Speed: " + chestItems[r].attackSpeed, width/2 + 90, height/2 - 20);
    chestDropPopUpButtons();
  }
}

function chestDropPopUp(){
  //Randomizes the chest drop
  r = floor(random(0, chestItems.length));
  chestItem = chestItems[r].name;
  chestItemSprite = chestItems[r].sprite;

}
function chestDropPopUpButtons(){
  // Draws the chest buttons
  if (chestOpened){
    rectMode(CORNER);
    chestEquip = new Clickable(width/2 + 80, height/2 + 10)
    chestEquip.resize(40, 30);
    chestEquip.color = "#b00e0e";
    chestEquip.textSize = 15;
    chestEquip.textFont = font;
    chestEquip.text = "Equip"
    chestEquip.draw();
    chestEquip.onHover = function(){
      chestEquip.color = "#800606"
      chestEquip.draw();
    }
    chestEquip.onPress = function(){
      inventory.push(chestItem);
      player.attack = player.baseAttack;
      player.attack = player.attack + chestItems[r].attack;
      chestOpened = false;
      playerHasItem = true;
      console.log(chestItem[r]);
    }
    // Creates the cancel button for the chest menu
    chestCancel = new Clickable(width/2 + 80, height/2 + 50)
    chestCancel.resize(40, 30);
    chestCancel.color = "#b00e0e";
    chestCancel.textSize = 15;
    chestCancel.textFont = font;
    chestCancel.text = "Cancel"
    chestCancel.draw();
    chestCancel.onHover = function(){
      chestCancel.color = "#800606"
      chestCancel.draw();
    }
    chestCancel.onPress = function(){
      chestOpened = false;
    }
}
};

function stairs(){
  if (state === "level1"){
    levelToLoad = lv2;
    lines = loadStrings(levelToLoad);
    playMap = createEmpty2dArray(tilesWide, tilesHigh);
    state = "level2";

    
  }
  else if (state === "level2"){
    state === "level3";
    levelToLoad = lv3;
    lines = loadStrings(levelToLoad);
    playMap = createEmpty2dArray(tilesWide, tilesHigh);
  }
  else;
  } 

  function changeMap(){
    for (let y = 0; y < tilesHigh; y++) {
      for (let x = 0; x < tilesWide; x++) {
        tileType = lines[y][x];
        playMap[x][y] = tileType;
      }
   }
  }
function orcMovement(){
  //Orc movement (not super elegant or efficient/was working on creating this as part of the enemy class, but ran out of time)
  playMap[orc.x][orc.y] = ".";
  if (playMap[orc.x + 1][orc.y] === "." && orc.health > 0){
      if (orc.x - player.x <= 10 && orc.x - player.x > 0){
        if (playMap[orc.x -1][orc.y] != "P"){
          orc.x --
        }  
      }
      else if (orc.x - player.x <= 1){
        //console.log("cat");
        orc.x ++
      }
      if (orc.y - player.y <= 10 && orc.y - player.y > 0){
        orc.y --
      }
      else if (orc.y - player.y <0){
        orc.y ++
      }
      if (playMap[orc.x+1][orc.y] === playMap[player.x][player.y] || playMap[orc.x-1][orc.y] === playMap[player.x][player.y]|| 
        playMap[orc.x][orc.y-1] === playMap[player.x][player.y] || playMap[orc.x][orc.y+1] === playMap[player.x][player.y] || playMap[orc.x][orc.y] === playMap[player.x][player.y]){
        player.health -=3;
      }
    }
    playMap[orc.x][orc.y] = "O";
    if (orc.health < 0){
      playMap[orc.x][orc.y] = ".";
      if (playMap[orc.x][orc.y] === playMap[player.x][player.y]){
        playMap[orc.x][orc.y] = "P";
        player.xp += 250;
      }
  }
}
// class enemy{
//   constructor(type, x, y, health, attack){
//     this.type = type;
//     this.x = x;
//     this.y = y;
//     this.health = health;
//     this.attack = attack;
//   }
//   move(){
  // playMap[orc.x][orc.y] = ".";
  // if (playMap[orc.x + 1][orc.y] === "." && orc.health > 0){
  //     if (orc.x - player.x <= 10 && orc.x - player.x > 0){
  //       if (playMap[orc.x -1][orc.y] != "P"){
  //         orc.x --
  //       }  
  //     }
  //     else if (orc.x - player.x <= 1){
  //       //console.log("cat");
  //       orc.x ++
  //     }
  //     if (orc.y - player.y <= 10 && orc.y - player.y > 0){
  //       console.log(orc.y - player.y);
  //       orc.y --
  //     }
  //     else if (orc.y - player.y <0){
  //       console.log(orc.y - player.y);
  //       orc.y ++
  //     }
//   checkDead(){
//     if (this.health <= 0){
//       playMap[this.x][this.y] = ".";
//     }
//   }
// }
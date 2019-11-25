// RPG Game (Name Undecided)
// Matthew Resendes
// November 15th 2019 - 
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Tile set taken from https://opengameart.org/content/dungeon-crawl-32x32-tiles
// Font style taken from https://www.fontspace.com/chequered-ink/ancient-modern-tales

let state; 

let player = {
  health:  60, 
  attack: 1, 
  defense: 0
};

function preload(){
  font = loadFont("assets/Ancient Modern Tales.otf")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  state = "menu"
  textAlign(CENTER, CENTER);
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
    displayGameLoop();
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
  
  //Button to confirm Choice
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

function displayGameLoop(){
  r = random(0,255)
  g = random(0,255)
  b = random(0,255)
  background(r,g,b);
  gameLoopButtons();
}

function gameLoopButtons(){

}

function healthBar(){
  
}
// keep player outside of text based grid
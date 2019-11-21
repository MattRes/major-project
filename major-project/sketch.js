// RPG Game (Name Undecided)
// Matthew Resendes
// November 15th 2019 - 
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// Tile set taken from https://opengameart.org/content/dungeon-crawl-32x32-tiles
let state; 


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
  if (state === "option"){
    displayOptions();
    optionsButtons();
  }
  if (state === "gameChoice")
    displayGameChoice();
  }
  if (state === "gameLoop"){
    displayGameLoop();
    gameLoopButtons();
  }
function displayMenu(){
  background ("#524646");
// Game text 
  textSize(55);
  text ("RPG Game", width/2, height/3 )
  menuButtons();
}

function menuButtons(){
//Creates start button
  startButton = new Clickable(width/2 - 100, height/2);
  startButton.resize(200, 70);
  startButton.color = "#b00e0e";
  startButton.textSize = 20;
  startButton.text = "New Game"
  startButton.draw();
  startButton.onHover = function(){
    startButton.color = "#d11313";
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
  optionButton.text = "Options"
  optionButton.draw();
  optionButton.onPress = function(){
    console.log("press")
    clear();
    state = "option";
  }
}


function displayOptions(){
  background (0,0,0);
  optionsButtons();
}

function optionsButtons(){
  optionBackButton = new Clickable(width/2 - 100 , height/2 + 125)
  optionBackButton.resize(200, 70);
  optionBackButton.color = "#b00e0e";
  optionBackButton.textSize = 20;
  optionBackButton.text = "Back"
  optionBackButton.draw();
  optionBackButton.onPress = function(){
    clear();
    state = "menu";
  }
}

function displayGameChoice(){
  background(43,75,210);
  confirmButton = new Clickable(width/2 - 100 , height/2 + 125)
  confirmButton.resize(200, 70);
  confirmButton.color = "#b00e0e";
  confirmButton.textSize = 20;
  confirmButton.text = "Back"
  confirmButton .draw();
  confirmButton.onPress = function(){
    clear();
    state = "gameLoop";
  }
}

function displayLoop(){

}

function gameLoopButtons(){

}
// keep player outside of text based grid
// RPG Game (Name Undecided)
// Matthew Resendes
// November 15th 2019 - 
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state; 
let startButton;
let optionButton;



function setup() {
  createCanvas(windowWidth, windowHeight);
  state = "menu"
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
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
  }
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
  startButton = new Clickable(width/2,height/2);
  startButton.resize(200, 70);
  startButton.color = "#b00e0e";
  startButton.textSize = 20;
  startButton.text = "New Game"
  startButton.draw();
  startButton.onHover = function(){
    startButton.color = "#d11313";
  }
  

//Creates option button
  optionButton = new Clickable(width/2, height/2 + 100)
  optionButton.resize(200, 70);
  optionButton.color = "#b00e0e";
  optionButton.textSize = 20;
  optionButton.text = "Options"
  optionButton.draw();

}

function displayOptions(){
  background (0,0,0);
}

// keep player outside of text based grid
// RPG Game (Name Undecided)
// Matthew Resendes
// November 15th 2019 - 
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let state; 
let startButton;
let buttonIndicator;



function setup() {
  createCanvas(windowWidth, windowHeight);
  buttonIndicator = false;
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  startButton = new Button(width/2 , height/2 , 100, 100, "blue", "Start");
}

function draw() {
  background(0);
  startButton.display();
  console.log(startButton.x, startButton.y);
}

class Button {
  constructor(x,   y, width, height, color, text){
    this.x = x;
    this.y = y;
    this.width = width; 
    this.height = height;
    this.color = color; 
    this.text = text; 
    }
    display() {
      fill(this.color);
      rect(this.x, this.y, this.width, this.height);
      fill("red");
      text (this.text, this.x, this.y)
  }
}

function displayStartScreen(){
  background(66, 138, 245);

}
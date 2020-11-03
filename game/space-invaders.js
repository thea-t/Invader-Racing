var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

//store info about the invaders
var npc1XPosition = 10;
var npc2XPosition = 10;
var npc3XPosition = 10;
var npcYPosition = 50;
var npcXStepMax = 10;
var npcXStepMin = -2;
var npcSpeed = 0.7;
var winningX = 600;
var money = 5;
var currentBet;

window.onload = function Start() {

    document.getElementById("yourBet").innerHTML = "Your Bet: ";
    document.getElementById("money").innerHTML = "Money: " + money;

    //background image
    backgroundImage = new Image();
    backgroundImage.src = "background.jpg";
    backgroundImage.onload = function () {
        context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        //invaders image
        npcImage = new Image();
        npcImage.src = "npc.png";
        npcImage.onload = function () {

            //call the "update" function 60 FPS
            setInterval(update, 1000 / 60);
        }
    }
}


function update() {
    //change the invader's X pos randomly, give a custom speed to the process and redraw 
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    npc1XPosition += (Math.floor(Math.random() * npcXStepMax) + npcXStepMin) * npcSpeed;
    npc2XPosition += (Math.floor(Math.random() * npcXStepMax) + npcXStepMin) * npcSpeed;
    npc3XPosition += (Math.floor(Math.random() * npcXStepMax) + npcXStepMin) * npcSpeed;

    checkWinner();
    drawInvaders();
    preventCheating();

    //draw the finish line
    context.beginPath();
    context.moveTo(winningX, 0);
    context.lineTo(winningX, canvas.height);
    context.stroke();
}

//check the winner, notify and reward the player accordingly
function checkWinner() {
    if (npc1XPosition >= winningX) {
        alert("1 wins!");
        if (currentBet == 1) {
            changeMoney(2);
        }
        resetPositions();
    }
    if (npc2XPosition >= winningX) {
        alert("2 wins!");

        if (currentBet == 2) {
            changeMoney(2);
        }

        resetPositions();
    }
    if (npc3XPosition >= winningX) {
        alert("3 wins!");

        if (currentBet == 3) {
            changeMoney(2);
        }

        resetPositions();
    }
}

//draw the invaters in custom X and Y positions
function drawInvaders() {
    context.drawImage(npcImage, npc1XPosition, npcYPosition);
    context.drawImage(npcImage, npc2XPosition, npcYPosition + 100);
    context.drawImage(npcImage, npc3XPosition, npcYPosition + 200);
}


function bet(number) {
    //display the player's bet
    document.getElementById("yourBet").innerHTML = "Your Bet: " + number;
    //store the current bet
    currentBet = number;
    //lose money when you bet
    changeMoney(-1);
    //disable the buttons
    activateButtons(false);
}

//control and display the money of the player
function changeMoney(amount) {
    money += amount;
    document.getElementById("money").innerHTML = "Money: " + money;
}

//How to disable buttons: https://stackoverflow.com/questions/22456641/disable-non-clickable-an-html-button-in-javascript
function activateButtons(enable) {
    document.getElementById("bet1button").disabled = !enable;
    document.getElementById("bet2button").disabled = !enable;
    document.getElementById("bet3button").disabled = !enable;
}

//disable the buttons when the invaders are in the middle of the road
function preventCheating() {

    if (npc1XPosition >= winningX / 2) {
        activateButtons(false);
    }

    if (npc2XPosition >= winningX / 2) {
        activateButtons(false);
    }

    if (npc3XPosition >= winningX / 2) {
        activateButtons(false);
    }
}

//reset everything 
function resetPositions() {
    npc1XPosition = 10;
    npc2XPosition = 10;
    npc3XPosition = 10;
    currentBet = 0;
    document.getElementById("yourBet").innerHTML = "Your Bet: ";
    activateButtons(true);
}
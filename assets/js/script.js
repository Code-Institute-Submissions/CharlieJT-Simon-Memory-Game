// Variables

let sequence = [];
let playerSequence = [];
let light;
let turn;
let correct;
let compTurn;
let intervalId;
let strictMode = false;
let sound = true;
let on = false;

// buttons, number display & pads targetted as variables using jQuery

const numDisplay = document.getElementById("number-counter");
const greenPad = document.getElementById("0");
const redPad = document.getElementById("1");
const yellowPad = document.getElementById("2");
const bluePad = document.getElementById("3");
const startButton = document.getElementById("start");
const strictButton = document.getElementById("strict");
const startModal = document.getElementById("start-modal-button");
const scoreModal = document.getElementById("score-modal-display");


// Event Listener checks to see if strict slider is true or false when clicked
strictButton.addEventListener('click', (event) => {
    if (strictButton.checked == true) {
        strictMode = true;
    }
    else {
        strictMode = false;
    }
});

// Event Listener initialisation when start button is clicked
startButton.addEventListener('click', (event) => {
    clearInterval(intervalId);
    play();
});

// Default play setting
function play() {
    sequence = [];
    playerSequence = [];
    getRandomNumber();
    light = 0;
    intervalId = 0;
    turn = 1;
    numDisplay.innerHTML = "0";
    correct = true;
    compTurn = true;
    intervalId = setInterval(gameTurn, 800);
}

// Gets a random number & pushes into the sequence
function getRandomNumber() {
    sequence.push(Math.floor(Math.random() * 4) + 1);
}

// An action taking place whether it's the player's turn or the computer's turn
function gameTurn() {
    on = false;
    if (light == turn) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
        console.log(sequence);
    }
    if (compTurn) {
        clearColor();
        setTimeout(function() {
            if (sequence[light] == 1) green();
            if (sequence[light] == 2) red();
            if (sequence[light] == 3) yellow();
            if (sequence[light] == 4) blue();
            light++;
            $(".pad").addClass('disabled');
        }, 300);
    }
    setTimeout(function() {
        $(".pad").removeClass('disabled');
    }, 299);
}

// Sounds & Lights being generated for each color

function green() {
    if (sound) {
        let audio = document.getElementById("sound-green");
        audio.play();
    }
    sound = true;
    $(greenPad).addClass("green-light");
}

function red() {
    if (sound) {
        let audio = document.getElementById("sound-red");
        audio.play();
    }
    sound = true;
    $(redPad).addClass("red-light");
}

function yellow() {
    if (sound) {
        let audio = document.getElementById("sound-yellow");
        audio.play();
    }
    sound = true;
    $(yellowPad).addClass("yellow-light");
}

function blue() {
    if (sound) {
        let audio = document.getElementById("sound-blue");
        audio.play();
    }
    sound = true;
    $(bluePad).addClass("blue-light");
}

// This returns all of the colours back to their original state from being flashed
function clearColor() {
    $(greenPad).removeClass("green-light");
    $(redPad).removeClass("red-light");
    $(yellowPad).removeClass("yellow-light");
    $(bluePad).removeClass("blue-light");
}

//  This will flash all of the colours at the same time
function lightAllColors() {
    $(greenPad).addClass("green-light");
    $(redPad).addClass("red-light");
    $(yellowPad).addClass("yellow-light");
    $(bluePad).addClass("blue-light");
}

// Events taking place when each of the pads are clicked
greenPad.addEventListener('click', (event) => {
    playerSequence.push(1);
    check();
    green();
    setTimeout(function() {
        clearColor();
    }, 300);
});

redPad.addEventListener('click', (event) => {
    playerSequence.push(2);
    check();
    red();
    setTimeout(function() {
        clearColor();
    }, 300);
});

yellowPad.addEventListener('click', (event) => {
    playerSequence.push(3);
    check();
    yellow();
    setTimeout(function() {
        clearColor();
    }, 300);
});

bluePad.addEventListener('click', (event) => {
    playerSequence.push(4);
    check();
    blue();
    setTimeout(function() {
        clearColor();
    }, 300);
});

// Checking to see if sequences are correct or wrong
function check() {
    if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1])
        correct = false;
    if (correct == false) {
        lightAllColors();
        numDisplay.innerHTML = "Lose!";
        setTimeout(function() {
            numDisplay.innerHTML = (turn) - 1;
            clearColor();
            if (strictMode) {
                $(".pad").addClass('disabled');
                displayModal();
                scoreModal.innerHTML = (turn) - 1;
            }
            else {
                compTurn = true;
                light = 0;
                playerSequence = [];
                correct = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);
        sound = false;
        let audio = document.getElementById("sound-lost");
        audio.play();
        $(".pad").addClass('disabled');
    }
    if (turn == playerSequence.length && correct) {
        turn++;
        playerSequence = [];
        getRandomNumber();
        compTurn = true;
        light = 0;
        numDisplay.innerHTML = (turn) - 1;
        $(".pad").addClass('disabled');
        intervalId = setInterval(gameTurn, 800);
    }
}

function displayModal() {
    $('#scoresModal').modal('show');
}

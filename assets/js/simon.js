// Variables

let sequence = [];
let playerSequence = [];
let playInterval, computerCount, playerCount, turn, win;
let strictMode = true;

// Buttons, number displays, pads & modals targetted as variables using JQuery.

const numDisplay = document.getElementById("number-counter");
const pad = document.getElementsByClassName('pad');
const greenPad = document.getElementById("1");
const redPad = document.getElementById("2");
const yellowPad = document.getElementById("3");
const bluePad = document.getElementById("4");
const startButton = document.getElementById("start");
const strictSwitch = document.getElementById("strict");
const modalScroll = document.getElementById('modal-scroll')
const startModal = document.getElementById("start-modal-button");
const startWinModal = document.getElementById("start-modal-win-button");
const loseModalDisplay = document.getElementById("lose-modal-display");
const winModalDisplay = document.getElementById("win-modal-display");

// Whatever code is written inside the JQuery ready method will run once the page Document Object Modal (DOM) is ready to execute JavaScript code.

$(document).ready(function() {

    // jQuery function to allow modal scroll icon to scroll down upon click.

    $(modalScroll).on('click', function(e) {
        var linkHref = $(this).attr('href');
        e.preventDefault();
        $('.modal-body').animate({
            scrollTop: $(linkHref).offset().top
        }, 1000);
    });
    
    $(startButton).click(function() {
        clearInterval(playInterval);
        setTimeout(function() {
            removeLightOnAllPads();  
        }, 200);
        $(numDisplay).text('0');
        setTimeout(function() {
            startPlay();
        }, 500);
    });
    
    $(startModal).on("click", function() {
        clearInterval(playInterval);
        $(numDisplay).text('0');
        setTimeout(function() {
            startPlay();
        }, 500);
    });
    
    $(strictSwitch).on("click", function() {
        if (strictSwitch.checked == true) {
            strictMode = true;
            turn = 1;
            $(".pad").addClass('disabled');
            clearInterval(playInterval);
            if ($(numDisplay).text() == "-") {
                $(numDisplay).text("-");
            } else {
                $(numDisplay).text("0");
            }
            setTimeout(function() {
                removeLightOnAllPads();
            }, 600);
        }
        else {
            strictMode = false;
        }
    });


    $(pad).click(function() {
        let padId = $(this).attr('id');
        if (padId == 1) {
            greenLightAndSound();
            playerSequence.push(parseInt(padId));
        }
        if (padId == 2) {
            redLightAndSound();
            playerSequence.push(parseInt(padId));
        }
        if (padId == 3) {
            yellowLightAndSound();
            playerSequence.push(parseInt(padId));
        }
        if (padId == 4) {
            blueLightAndSound();
            playerSequence.push(parseInt(padId));
        }
        checking();
    });
});

function startPlay() {
    initialGameSettings();
    randomNumber();
    gamePlay();
}

function initialGameSettings() {
    sequence = [];
    turn = 0;
    $(".pad").addClass('disabled');
}

function randomNumber() {
    randomNum = Math.ceil(Math.random() * 1);
    sequence.push(randomNum);
    console.log(sequence);
}

function gamePlay() {
    turn++;
    playerCount = 0;
    computerCount = 0;
    playerSequence = [];
    playInterval = setInterval(function() {
        if (sequence.length === computerCount) {
            clearInterval(playInterval);
            $(".pad").removeClass('disabled');
        }
        switch (sequence[computerCount]) {
            case 1:
                greenLightAndSound();
                break;
            case 2:
                redLightAndSound();
                break;
            case 3:
                yellowLightAndSound();
                break;
            case 4:
                blueLightAndSound();
                break;
            default:
                break;
        }
        computerCount++;
    }, 800);
}

function greenLightAndSound() {
    $(greenPad).addClass('green-light')
    setTimeout(function() {
        removeLightOnAllPads();
    }, 400);
    soundGenerate('green');
}

function redLightAndSound() {
    $(redPad).addClass('red-light')
    setTimeout(function() {
        removeLightOnAllPads();
    }, 400);
    soundGenerate('red');
}

function yellowLightAndSound() {
    $(yellowPad).addClass('yellow-light')
    setTimeout(function() {
        removeLightOnAllPads();
    }, 400);
    soundGenerate('yellow');
}

function blueLightAndSound() {
    $(bluePad).addClass('blue-light')
    setTimeout(function() {
        removeLightOnAllPads();
    }, 400);
    soundGenerate('blue');
}

function soundGenerate(color) {
    let sound = $(`#sound-${color}`)[0];
    sound.currentTime = 0;
    sound.play();
}

function removeLightOnAllPads() {
    $(greenPad).removeClass("green-light");
    $(redPad).removeClass("red-light");
    $(yellowPad).removeClass("yellow-light");
    $(bluePad).removeClass("blue-light");
}

function addLightsToAllPads() {
    $(greenPad).addClass("green-light");
    $(redPad).addClass("red-light");
    $(yellowPad).addClass("yellow-light");
    $(bluePad).addClass("blue-light");
}

function displayModal() {
    $('#loseModal').modal('show');
    $(loseModalDisplay).text(turn);
}

function checking() {
    playerCount++;
    console.log(playerCount);
    if (playerCount === 2 && strictMode === true) {
        clearInterval(playInterval);
        $(".pad").addClass('disabled');
        winGame();
    }
    if (playerSequence[playerCount - 1] === sequence[playerCount - 1]) {
        if (playerSequence.length === turn) {
            randomNumber();
            $(".pad").addClass('disabled');
            $(numDisplay).text(playerCount);
            setTimeout(gamePlay, 500);
        }
    }
    else {
        $(".pad").addClass('disabled');
        soundGenerate('lost');
        $(numDisplay).text('Lose');
        addLightsToAllPads();
        setTimeout(function() {
            removeLightOnAllPads();
            setTimeout(function() {
                $(numDisplay).text(turn);
                displayModal();
            }, 600);
        }, 400);
    }
}

function winGame() {
    turn++;
    $(numDisplay).text(turn - 1);
    $(numDisplay).text("WIN!");
    setTimeout(function() {
        addLightsToAllPads();
        setTimeout(function() {
            $(winModalDisplay).text(turn - 1);
            $('#winModal').modal('show');
            let audio = document.getElementById("sound-win");
            audio.currentTime = 0;
            audio.play();
        }, 700);
    }, 700);
}

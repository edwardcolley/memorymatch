$(document).ready(initializeApp)

var firstCardClicked = null;
var secondCardClicked = null;
var matched = null;
var max_matches = 1;
var attempts = 0;
var games_played = 1;
var check1 = null;
var check2 = null;

function initializeApp() {
    var twoMinutes = 60 * 2,
        display = $('#time');
    $('.front').on('click', handleCardClick);
    $('.closeBtn').on('click', closeModal);
    $('.closeBtn2').on('click', closeModalDone);
    $('.closeWarningBtn').on('click', closeWarningModal);
    $('.resetBtn').on('click', resetGame);
    placeShuffledCards();
    startTimer(twoMinutes, display);
}

function handleCardClick(event) {

    if (firstCardClicked === null) {
        check1 = event.target.parentElement
        $(check1).addClass('flipaction');
        firstCardClicked = $(event.currentTarget)
        siblings = firstCardClicked.siblings();
        backCard = siblings.css('background-image');
        $(event.target).off("click");
        setTimeout(function () {
            $(event.target).on('click', handleCardClick)
        }, 1000)

    } else if (secondCardClicked === null) {
        check2 = event.target.parentElement
        $(check2).addClass('flipaction');
        secondCardClicked = $(event.currentTarget)
        siblings2 = secondCardClicked.siblings();
        backCard2 = siblings2.css('background-image');
        attempts++;

        if (backCard2 === backCard) {
            playRightSound();
            matched++;
            firstCardClicked = null;
            secondCardClicked = null;
            displayStats();
        } else {
            playWrongSound();
            $('.front').off("click");
            setTimeout(function () {
                flipCardBack();
                $('.front').on('click', handleCardClick);
                firstCardClicked = null;
                secondCardClicked = null;
            }, 1000)
            displayStats();

        }

        if (matched === max_matches) {
            games_played++;
            openModal();
        }
    }
};

function flipCardBack() {
    $(check1).removeClass('flipaction');
    $(check2).removeClass('flipaction');
}

function resetGame() {
    location.reload();
}

function displayStats() {
    $('#accuracy').text(calculateAccuracy);
    $('#attempts').text(attempts);
    $('#games_played').text(games_played);

}

function displayStatsWithoutAccuracy() {
    $('#accuracy').text('0%');
    $('#attempts').text(attempts);
    $('#games_played').text(games_played);

}

function openModal() {
    $('#winningModal').removeClass('hidden');
}

function closeModal() {
    $('#winningModal').addClass('hidden');
    resetStats();
}

function closeModalDone() {
    $('#winningModal').addClass('hidden');
}

function closeWarningModal() {
    $('#warningModal').addClass('hidden');
}

function clickOutside(event) {
    if (event.target === modal[0]) {
        modal[0].style.display = 'none';
    }
    resetStats();
}

function calculateAccuracy() {
    accuracy = ((matched / attempts) * 100).toFixed(2);
    return accuracy + "%";
}

function resetStats() {
    matched = null;
    attempts = 0;
    displayStatsWithoutAccuracy();
    $('div').removeClass("flipaction")
    resetShuffledCards();
    
}

function shuffleCards() {
    var cardArray = ['card1', 'card2', 'card3', 'card4', 'card5', 'card6', 'card7', 'card8', 'card9',
        'card10', 'card11', 'card12', 'card13', 'card14', 'card15', 'card16', 'card17',
        'card18'];
    var currentIndex = cardArray.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cardArray[currentIndex];
        cardArray[currentIndex] = cardArray[randomIndex];
        cardArray[randomIndex] = temporaryValue;
    }
    return cardArray;
}

function placeShuffledCards() {
    var shuffledCards = shuffleCards();

    for (var i = 0; i <= 17; i++) {
        $(`#back${i+1}`).addClass(`back flip-card-back ${shuffledCards[i]}`);
    }
}

function resetShuffledCards() {

    for (var i = 1; i <= 18; i++) {
        $(`#back${i}`).removeClass();
    }

    placeShuffledCards();
}

function playWrongSound() {
    var bleep = new Audio();
    bleep.src = "assets/sounds/button-11.mp3";
    bleep.play();
}

function playRightSound() {
    var ding = new Audio();
    ding.src = "assets/sounds/ding-sound-effect_1.mp3";
    ding.play();
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

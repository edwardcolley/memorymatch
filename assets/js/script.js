$(document).ready(initializeApp)

var firstCardClicked = null;
var secondCardClicked = null;
var matched = null;
var max_matches = 9;
var attempts = 0;
var games_played = 1;
var check1 = null;
var check2 = null;
var timer2 = null;

function initializeApp() {
    var minutes = 60 * 1;
    $('.front').on('click', handleCardClick);
    $('.closeBtn').on('click', closeModal);
    $('.closeBtn2').on('click', closeModalDone);
    $('.closeBtn3').on('click', closeLosingModal);
    $('.closeWarningBtn').on('click', closeWarningModal);
    $('.resetBtn').on('click', resetGame);
    placeShuffledCards();
    startTimer(minutes, $('#time'), 1000);
}

function handleCardClick(event) {
    
    $(event.currentTarget).off("click");
    event.preventDefault();
    console.log("event.currentTarget: ", event.currentTarget);
    if (firstCardClicked === null) {
        
        check1 = event.currentTarget.parentElement
        $(check1).addClass('flipaction');
        firstCardClicked = $(event.currentTarget)
        siblings = firstCardClicked.siblings();
        backCard = siblings.css('background-image');
        $('.front').off("click")
        setTimeout(function () {
            $('.front').on("click", handleCardClick);
        }, 500)

    } else if (secondCardClicked === null) {
        check2 = event.currentTarget.parentElement
        $(check2).addClass('flipaction');
        secondCardClicked = $(event.currentTarget)
        siblings2 = secondCardClicked.siblings();
        backCard2 = siblings2.css('background-image');
        attempts++;
        $('.front').off("click")
        

        if (backCard2 === backCard) {
            playRightSound();
            $('#slothGif').addClass('spinAnimate');
            setTimeout(function () {
                $('#slothGif').removeClass('spinAnimate');
            }, 700)
            matched++;
            displayStats();
            if (matched === null) {
                var interval = 1050;
            } else {
                var increase = matched * 300;
                var numeric = 1000 + increase;
                var interval = numeric;
            }
            startTimer(currentCount(), $('#time'), interval);
        } else {
            playWrongSound();
            $('#slothGif').addClass('shakeAnimate');
            setTimeout(function () {
                $('#slothGif').removeClass('shakeAnimate');
            }, 700)
            setTimeout(function () {
                flipCardBack(check1, check2);
            }, 1000)
            displayStats();

        }

        firstCardClicked = null;
        secondCardClicked = null;
        setTimeout(function () {
            $('.front').on("click", handleCardClick);
        }, 1500)

        if (matched === max_matches) {
            games_played++;
            openModal();
            clearInterval(timer2);
        } 
    }
};

function flipCardBack(first, second) {
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

function losingModal() {
    $('#losingModal').removeClass('hidden');
}

function closeLosingModal() {
    $('#losingModal').addClass('hidden');
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
    var minutes = 60 * 1;
    displayStatsWithoutAccuracy();
    $('div').removeClass("flipaction")
    resetShuffledCards();
    startTimer(minutes, $('#time'), 1000);
    
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

function startTimer(duration, display, interval) {
    var timer = duration, minutes, seconds;
    timer2 = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);
        if (--timer < 0) {
            losingModal();
            display.text("0:00");
        }
    }, interval);
}

function currentCount() {
    var count = $('#time').text();
    var minutes = parseInt(count[1]);
    var seconds = parseInt(count[3] + count[4]);
    var minutesToSeconds = minutes * 60;
    var totalSeconds = minutesToSeconds + seconds;
    clearInterval(timer2);
    $('#time').empty();

    return totalSeconds;
}

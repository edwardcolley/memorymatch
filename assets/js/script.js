$(document).ready(initializeApp)

var firstCardClicked = null;
var secondCardClicked = null;
var matched = null;
var max_matches = 3;
var attempts = 0;
var games_played = null;
var checkbox1 = null;
var checkbox2 = null;

function initializeApp() {
    $('.front').on('click', handleCardClick);
    $('.closeBtn').on('click', closeModal);
    placeShuffledCards();
}

function handleCardClick(event) {
    debugger;
    // $(event.currentTarget).addClass('hidden');
    if (firstCardClicked === null) {
        firstCardClicked = $(event.currentTarget)
        siblings = firstCardClicked.siblings();
        backCard = siblings.css('background-image');
        checkbox1 = $(event.delegateTarget.parentElement.offsetParent.children[1].parentElement.children[0]);
        
    } else if (secondCardClicked === null) {
        console.log("event2", event)
        secondCardClicked = $(event.currentTarget)
        siblings2 = secondCardClicked.siblings();
        backCard2 = siblings2.css('background-image');
        checkbox2 = $(event.delegateTarget.parentElement.offsetParent.children[1].parentElement.children[0]);
        attempts++;

        if (backCard2 === backCard) {
            playRightSound();
            matched++;
            firstCardClicked = null;
            secondCardClicked = null;

            displayStats();
        } else {
            playWrongSound();
            $('.front').off();
            setTimeout(function () {
                // $(firstCardClicked).removeClass('hidden');
                // $(secondCardClicked).removeClass('hidden');
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
    (checkbox1).prop("checked", false);
    (checkbox2).prop("checked", false);
}

function displayStats() {
    $('#accuracy').text(calculateAccuracy);
    $('#attempts').text(attempts);
    $('#games_played').text(games_played);

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
    $('#simpleModal').removeClass('hidden');
}

function closeModal() {
    $('#simpleModal').addClass('hidden');
    resetStats();

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
    attempts = null;
    displayStatsWithoutAccuracy();
    $('div div div').removeClass('hidden');
    placeShuffledCards();
}

// Fisher-Yates Shuffle
function shuffleCards() {
    var cardArray = ['card1', 'card2','card3','card4','card5','card6','card7','card8','card9',
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
    $('#back1').addClass(shuffledCards[0])
    $('#back2').addClass(shuffledCards[1])
    $('#back3').addClass(shuffledCards[2])
    $('#back4').addClass(shuffledCards[3])
    $('#back5').addClass(shuffledCards[4])
    $('#back6').addClass(shuffledCards[5])
    $('#back7').addClass(shuffledCards[6])
    $('#back8').addClass(shuffledCards[7])
    $('#back9').addClass(shuffledCards[8])
    $('#back10').addClass(shuffledCards[9])
    $('#back11').addClass(shuffledCards[10])
    $('#back12').addClass(shuffledCards[11])
    $('#back13').addClass(shuffledCards[12])
    $('#back14').addClass(shuffledCards[13])
    $('#back15').addClass(shuffledCards[14])
    $('#back16').addClass(shuffledCards[15])
    $('#back17').addClass(shuffledCards[16])
    $('#back18').addClass(shuffledCards[17])
}

// function resetShuffledCards() {
//     $('#back1').removeClass()
//     $('#back2').removeClass()
//     $('#back3').removeClass()
//     $('#back4').removeClass()
//     $('#back5').removeClass()
//     $('#back6').removeClass()
//     $('#back7').removeClass()
//     $('#back8').removeClass()
//     $('#back9').removeClass()
//     $('#back10').removeClass()
//     $('#back11').removeClass()
//     $('#back12').removeClass()
//     $('#back13').removeClass()
//     $('#back14').removeClass()
//     $('#back15').removeClass()
//     $('#back16').removeClass()
//     $('#back17').removeClass()
//     $('#back18').removeClass()

//     placeShuffledCards();
// }

function playWrongSound() {
    var bleep = new Audio();
    bleep.src = "/memory_match/assets/sounds/button-11.mp3";
    bleep.play();
}

function playRightSound() {
    var ding = new Audio();
    ding.src = "/memory_match/assets/sounds/ding-sound-effect_1.mp3";
    ding.play();
}



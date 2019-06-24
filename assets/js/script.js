$(document).ready(initializeApp)

function initializeApp() {
    $('.front').on('click', handleCardClick);
    placeShuffledCards();
}




var firstCardClicked = null;
var secondCardClicked = null;
var matched = null;
var max_matches = 3;
var attempts = 0;
var games_played = null;

function handleCardClick(event) {
    $(this).addClass('hidden');

    if (firstCardClicked === null) {
        firstCardClicked = $(this)
        siblings = firstCardClicked.siblings();
        backCard = siblings.css('background-image');
    } else if (secondCardClicked === null) {
        secondCardClicked = $(this)
        siblings2 = secondCardClicked.siblings();
        backCard2 = siblings2.css('background-image');



        attempts++;

        if (backCard2 === backCard) {
            matched++;
            firstCardClicked = null;
            secondCardClicked = null;

            displayStats();
        } else {
            $('.front').off();
            setTimeout(function () {
                $(firstCardClicked).removeClass('hidden');
                $(secondCardClicked).removeClass('hidden');
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

var modal = $('#simpleModal');
var modalBtn = $('#modalBtn');
var closeBtn = $('.closeBtn')[0];


$(modalBtn).on('click', openModal);
$(closeBtn).on('click', closeModal);

function openModal() {

    modal[0].style.display = 'block';
}
function closeModal() {
    modal[0].style.display = 'none';
    resetStats();


}
function clickOutside(event) {
    if (event.target === modal[0]) {
        modal[0].style.display = 'none';
    }
    resetStats();
}

function calculateAccuracy() {
    accuracy = Math.floor((matched / attempts) * 100);
    return accuracy + "%";
}

function resetStats() {
    matched = null;
    attempts = null;
    displayStatsWithoutAccuracy();
    $('div').removeClass('hidden');
    placeShuffledCards();
}

// Fisher-Yates (aka Knuth) Shuffle
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






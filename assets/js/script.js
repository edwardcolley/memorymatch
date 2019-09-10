$(document).ready(initializeApp)

var firstCardClicked = null;
var secondCardClicked = null;
var matched = null;
var max_matches = 2;
var attempts = 0;
var games_played = null;
var checkbox1 = null;
var checkbox2 = null;

function initializeApp() {
    $('.front').on('click', handleCardClick);
    $('.back').on('click', handleCardClick);
    $('.closeBtn').on('click', closeModal);
    $('.closeWarningBtn').on('click', closeWarningModal);
    placeShuffledCards();
}

function handleCardClick(event) {
    disableReflip = event.target;
    disableMethod = event.delegateTarget.parentElement.offsetParent.children[1].parentElement.children[0];
    if($(disableReflip).hasClass("back")){
        return $(disableMethod).prop("checked", false);
    }

    if (firstCardClicked === null) {
        console.log(event);
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
                flipCardBack();
                $('.front').on('click', handleCardClick);
                firstCardClicked = null;
                secondCardClicked = null;
            }, 400)
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
    // debugger;
    matched = null;
    attempts = null;
    displayStatsWithoutAccuracy();
    $('input').prop("checked", false)
    resetShuffledCards();
    animateShuffle();
    
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
    //  ;
    for (var i = 0; i <= 17; i++) {
        $(`#back${i+1}`).addClass(`back flip-card-back ${shuffledCards[i]}`);
    }
}

function resetShuffledCards() {

    for (var i = 1; i <= 18; i++) {
        $(`#back${i}`).removeClass();
    }

    placeShuffledCards();
    animateShuffle();
}

function animateShuffle() {
    var x = $("#C1").position()
    console.log("top: " + x.top + " Left: " + x.left);
    $("#C1").animate({ left: "16.4%"});
    $("#C2").animate({ right: "16.4%"});
    $("#C3").animate({ top: "33.8%", right: "16.4%"});
    $("#C4").animate({ top: "67.6%"});
    $("#C5").animate({ left: "16.4%", top: "67.6%"});
    $("#C6").animate({ right: "49.2%"});
    $("#C7").animate({ bottom: "33.8%", left: "81.8%"});
    $("#C8").animate({ right: "16.4%"});
    $("#C13").animate({ left: "49.2%", bottom: "67.6%"});
    $("#C18").animate({ right: "16.4%", bottom: "67.6%"});
    $("#C9").animate({ top: "33.8%", left: "32.8%"});
    $("#C10").animate({ top: "33.8%", right: "49.2%"});
    $("#C11").animate({ top: "33.8%", right: "32.8%"});
    $("#C12").animate({ right: "49.2%"});
    $("#C14").animate({ left: "65.6%", bottom: "33.8%"});
    $("#C15").animate({ right: "16.4%"});
    $("#C16").animate({ bottom: "33.8%", left: "16.4%"});
    $("#C17").animate({ bottom: "33.8%", right: "16.4%"});
}

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



$(document).ready(function() {
    $('.front').on('click', handleCardClick)

    var firstCardClicked = null;
    var secondCardClicked = null;
    var matched = null;

    function handleCardClick(event) {
        $(this).addClass('hidden');
        debugger;
        if (firstCardClicked === null) {
            firstCardClicked = $(this)
            siblings = firstCardClicked.siblings();
            backCard = siblings.css('background-image');
            console.log(backCard);
        } else if (secondCardClicked === null) {
            secondCardClicked = $(this)
            siblings2 = secondCardClicked.siblings();
            backCard2 = siblings2.css('background-image');
            console.log(backCard2);
            if (backCard2 === backCard) 
            console.log('They match');
            matched++;
            firstCardClicked = null;
            secondCardClicked = null;
        }
        
    }

})




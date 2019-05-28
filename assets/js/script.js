$(document).ready(function() {
    $('.front').on('click', handleCardClick)

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
            console.log('first card: ', firstCardClicked);
            siblings = firstCardClicked.siblings();
            backCard = siblings.css('background-image');
        } else if (secondCardClicked === null) {
            secondCardClicked = $(this)
            console.log('second card: ', secondCardClicked);
            siblings2 = secondCardClicked.siblings();
            backCard2 = siblings2.css('background-image');
            
            displayStats();

            
            
            if (backCard2 === backCard) {
            console.log('They match');
            matched++;
            console.log('matched: ', matched);
            firstCardClicked = null;
            secondCardClicked = null;
            console.log(firstCardClicked, secondCardClicked)

            displayStats();
            } else {
                attempts++;
                console.log('attempts: ', attempts);
                firstCardClicked = null;
                secondCardClicked = null;
            }
            
            if (matched === max_matches) {
               games_played++;
               console.log('games played: ', games_played);
                openModal();
            }
           
        }

        function displayStats() {
            $('#accuracy').text(calculateAccuracy);
            $('#attempts').text(attempts);
            $('#games_played').text(games_played);

        }
       
    }
    
    var modal = $('#simpleModal');
    var modalBtn = $('#modalBtn');
    var closeBtn = $('.closeBtn')[0];
    

    $(modalBtn).on('click', openModal);
    $(closeBtn).on('click', closeModal);
    $(window).on('click', clickOutside);

    function openModal() {
        console.log('testing');
        modal[0].style.display = 'block';
    }
    function closeModal() {
        modal[0].style.display = 'none';
    }
    function clickOutside(event) {
        if (event.target === modal[0]) {
            modal[0].style.display = 'none';
        }
    }
  
    function calculateAccuracy() {
        accuracy = matched / attempts;
        console.log('accuracy: ', accuracy);
        return accuracy;
    }
    
})




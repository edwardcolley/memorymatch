$(document).ready(function() {
    $('.front').on('click', handleCardClick);
    

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
                setTimeout(function(){
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

    function resetStats () {
        matched = null;
        attempts = null;
        // games_played++;
        displayStatsWithoutAccuracy();
        $('div').removeClass('hidden');
        
    }
    
})




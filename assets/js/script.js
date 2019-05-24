$(document).ready(function() {
    $('.front').on('click', handleCardClick)

    var firstCardClicked = null;
    var secondCardClicked = null;
    var matched = null;
    var max_matches = 2;

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
            
            if (backCard2 === backCard) {
            console.log('They match');
            matched++;
            console.log(matched);
            firstCardClicked = null;
            secondCardClicked = null;
            console.log(firstCardClicked, secondCardClicked)
            }
            
            if (matched === max_matches) {
               openModal();
            }
           
        }
       
    }
    
    var modal = $('#simpleModal');
    var modalBtn = $('#modalBtn');
    var closeBtn = $('.closeBtn')[0];
    // var closeBtn = document.getElementsByClassName('closeBtn')[0];
    

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
  
    
})




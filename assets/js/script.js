$(document).ready(function() {
    $('.front').on('click', handleCardClick)

    function handleCardClick(event) {
        $(this).addClass('hidden');
    }
})



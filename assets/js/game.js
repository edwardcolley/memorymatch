class Game {
    constructor() {
        this.firstCardClicked = null;
        this.secondCardClicked = null;
        this.backCard = null
        this.backCard2 = null
        this.matched = null;
        this.max_matches = 9;
        this.attempts = 0;
        this.games_played = null;
        this.handleCardClick = this.handleCardClick.bind(this);
        this.addEventListeners();
        //try not setting it equal to this.handleCardClick
    }

    addEventListeners() {
        $('.front').on('click', this.handleCardClick);
        $('.closeBtn').on('click', this.closeModal);
    }

    handleCardClick(event) {
        // debugger;
        $(event.currentTarget).addClass('hidden');
        if (this.firstCardClicked === null) {
            this.firstCardClicked = $(event.currentTarget)
            let siblings = this.firstCardClicked.siblings();
            this.backCard = siblings.css('background-image');
        } else if (this.secondCardClicked === null) {
            this.secondCardClicked = $(event.currentTarget)
            let siblings2 = this.secondCardClicked.siblings();
            this.backCard2 = siblings2.css('background-image');
            this.attempts++;

            if (this.backCard2 === this.backCard) {
                debugger;
                this.playRightSound();
                matched++;
                this.firstCardClicked = null;
                this.secondCardClicked = null;

                this.displayStats();
            } else {
                this.playWrongSound();
                $('.front').off();
                setTimeout(function () {
                    $(this.firstCardClicked).removeClass('hidden');
                    $(this.secondCardClicked).removeClass('hidden');
                    $('.front').on('click', this.handleCardClick);
                    this.firstCardClicked = null;
                    this.secondCardClicked = null;
                }, 1000)
                this.displayStats();

            }

            if (this.matched === this.max_matches) {
                games_played++;
                this.openModal();
            }

        }



    }

    displayStats() {
        $('#accuracy').text(calculateAccuracy);
        $('#attempts').text(attempts);
        $('#games_played').text(games_played);

    }

    displayStats() {
        $('#accuracy').text(calculateAccuracy);
        $('#attempts').text(attempts);
        $('#games_played').text(games_played);

    }
    displayStatsWithoutAccuracy() {
        $('#accuracy').text('0%');
        $('#attempts').text(attempts);
        $('#games_played').text(games_played);

    }

    openModal() {
        $('#simpleModal').removeClass('hidden');
    }

    closeModal() {
        $('#simpleModal').addClass('hidden');
        this.resetStats();

    }
    clickOutside(event) {
        if (event.target === modal[0]) {
            modal[0].style.display = 'none';
        }
        this.resetStats();
    }

    calculateAccuracy() {
        accuracy = ((matched / attempts) * 100).toFixed(2);
        return accuracy + "%";
    }

    resetStats() {
        matched = null;
        attempts = null;
        this.displayStatsWithoutAccuracy();
        $('div div div').removeClass('hidden');
        this.placeShuffledCards();
    }

    // Fisher-Yates Shuffle
    shuffleCards() {
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

    placeShuffledCards() {
        var shuffledCards = this.shuffleCards();

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

    playWrongSound() {
        var bleep = new Audio();
        bleep.src = "/memory_match/assets/sounds/button-11.mp3";
        bleep.play();
    }

    playRightSound() {
        var ding = new Audio();
        ding.src = "/memory_match/assets/sounds/ding-sound-effect_1.mp3";
        ding.play();
    }



}
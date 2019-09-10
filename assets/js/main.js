$(document).ready(initializeApp);

var gameboard;
function initializeApp() {
    gameboard = new Game();
    gameboard.placeShuffledCards();
}
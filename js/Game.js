/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

//Step 2: Inside the Game.js file, declare the Game class.
//Step 3:
/**
 * missed : Used to track the number of missed guesses by the player. The initial
value is `0`, since no guesses have been made at the start of the game.
  phrases : An array of Phrase objects to use with the game. For now, initialize the
property to an empty array. In the next step you'll work on initializing this
property with an array of Phrase objects.
  activePhrase : This is the Phrase object that’s currently in play. The initial value is
`null`.
 */
class Game {
    constructor(game) {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

//Step 4: 
/**
 * 
 * Creates phrases for use in game
 * @return {array} An array of phrases that could be used in the game
 * Inside the Game class, create a method called `createPhrases()`, that creates
and returns an array of 5 new Phrase objects, and then set the `phrases` property to call
that method.
 */
createPhrases() {
    const phrase1 = new Phrase("A Piece of Cake");
    const phrase2 = new Phrase("Water under the bridge");
    const phrase3 = new Phrase("Cut To The Chase");
    const phrase4 = new Phrase("Break a leg");
    const phrase5 = new Phrase("President of the United States");
    const phrases = [phrase1, phrase2, phrase3, phrase4, phrase5];
    return phrases;
}

//Step five
/**
* Selects random phrase from phrases property
* @return {Object} Phrase object chosen to be used
*/
getRandomPhrase() {
    const randomNum = Math.floor(Math.random() * this.phrases.length);
    return this.phrases[randomNum];
};


/**
* Begins game by selecting a random phrase and displaying it to user
*/
startGame() {
    /**
     * The `startGame()` method hides the start screen overlay (the `div` element with an `id` of
`overlay`), calls the `getRandomPhrase()` method to select a Phrase object from the Game
object’s array of phrases, and then adds the phrase to the gameboard by calling the
`addPhraseToDisplay()` method (which is a method on the Phrase class) on the selected Phrase
object. The selected phrase should be stored in the Game’s `activePhrase` property, so it can be
easily accessed throughout the game.
     */

const overlay = document.querySelector("#overlay");
overlay.style.display = "none";
this.activePhrase=this.getRandomPhrase();
this.activePhrase.addPhraseToDisplay();
};

/**
* Checks for winning move
* @return {boolean} True if game has been won, false if game wasn't
won
*/
checkForWin() {
    //if the length of letters that are revealed and displayed is the same as the length of the total letters, the player has won.
    const letterPicked = document.querySelectorAll(".letter");
    const lettersDisplayed = document.querySelectorAll(".show");
    if (letterPicked.length === lettersDisplayed.length){
        return true;
    }else{
        return false;
    }
};



/**
* Increases the value of the missed property
* Removes a life from the scoreboard
* Checks if player has remaining lives and ends game if player is out
*/
removeLife() {
//increase the value of the missed property
this.missed++;

//replace one of the `liveHeart.png` images with a `lostHeart.png` image
const hearts = document.querySelectorAll(".tries");
//The <li> tag defines a list item.
const lostHeart = document.createElement("li");
lostHeart.classList.add("tries");
lostHeart.innerHTML = `<img src=\"images/lostHeart.png\" alt=\"Heart Icon\" height=\"35\" width=\"30\">`;

//replace the live heart image with the lost heart image
hearts[this.missed-1].parentNode.replaceChild(lostHeart,hearts[this.missed-1]); 

//If the player has five missed guesses (i.e they're out of lives), 
//then end the game by calling the `gameOver()` method.
if(this.missed===5){
    this.gameOver(false);
}

};

/**
* Displays game over message
This method displays the original start screen overlay, and
depending on the outcome of the game, updates the overlay `h1` element with a
friendly win or loss message, and replaces the overlay’s `start` CSS class with
either the `win` or `lose` CSS class.
* @param {boolean} gameWon - Whether or not the user won the game
*/
gameOver(gameWon) {
    const message = document.getElementById('game-over-message');
    const overlay = document.querySelector("#overlay");
    const resetButton = document.getElementById('btn__reset');

    if (gameWon) {
        this.resetGame();
        overlay.style.display = "block";
        message.textContent = "Congratulations, you have won the game!"
        resetButton.textContent = 'Play Again';
    } else {
        this.resetGame();
        overlay.style.display = "block";
        message.textContent = "Unfortunately, you have lost the game!"
        resetButton.textContent = 'Try Again';
        this.resetGame();
    }
    
};

/**
* Handles onscreen keyboard button clicks
* @param (HTMLButtonElement) button - The clicked button element
*/
handleInteraction(button){
    //console.log(button);

    //Disable the selected letter’s onscreen keyboard button. 

    //from https://www.w3schools.com/jsref/prop_select_disabled.asp:
    //The disabled property sets or returns whether a drop-down list should be disabled, or not. 
    //A disabled element is unusable and un-clickable. Disabled elements are usually rendered in gray by default in browsers.
    button.disabled = true;
    
    //If the phrase does not include the guessed letter
    //add the `wrong` CSS class to the selected letter's keyboard button and call the `removeLife()` method.
    if (this.activePhrase.checkLetter(button.textContent)===false) {
        button.classList = "wrong";
        this.removeLife();
    
    //If the phrase includes the guessed letter, add the `chosen` CSS class to the selected 
    //letter's keyboard button, call the `showMatchedLetter()` method on the phrase, and then 
    //call the `checkForWin()` method. If the player has won the game, also call the `gameOver()` method.
    } else {   
        button.classList = "chosen";
        this.activePhrase.showMatchedLetter(button.textContent);

        if (this.checkForWin()===true) {
            this.gameOver(true);
        };
    };
    
};

/**
 * Update your app to reset the gameboard between games. After a game is completed, the
gameboard needs to be reset so that clicking the "Start Game" button will successfully load a
new game.
 */
resetGame(){
//Remove all `li` elements from the Phrase `ul` element.
    const phraseID = document.querySelector("#phrase");
    const phraseDivUL = phraseID.querySelector("ul");
    phraseDivUL.innerHTML="";
//Enable all of the onscreen keyboard buttons and update each to use the `key` CSS class, and not use the `chosen` or `wrong` CSS classes.
    const chosenKeys = document.querySelectorAll('.chosen');
    for (let i=0;i<chosenKeys.length; i++){
        //console.log(keyboardKeys[i]);
        chosenKeys[i].disabled = false;
        chosenKeys[i].className="key";
}
const wrongKeys = document.querySelectorAll('.wrong');
for (let o=0;o<wrongKeys.length; o++){
    //console.log(keyboardKeys[i]);
    wrongKeys[o].disabled = false;
    wrongKeys[o].className="key";
}

// Reset all of the heart images (i.e. the player's lives) in the scoreboard at the bottom of
// the gameboard to display the `liveHeart.png` image.
this.missed=0;

const hearts = document.querySelectorAll(".tries");
console.log(hearts);
//The <li> tag defines a list item.
hearts.innerHTML="";
for (let i=0; i<5;i++){
    hearts.innerHTML+= '<li class="tries"><img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30"></li>';
}
console.log(hearts);
}

    };





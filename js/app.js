/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */



let game;
const btn__reset = document.querySelector("#btn__reset");
btn__reset.addEventListener("click", () => {
    game= new Game();
    game.startGame();
    // const randomPhrase = game.getRandomPhrase();
    // const phrase = new Phrase(randomPhrase.phrase);
    // phrase.addPhraseToDisplay();
})

const webKeyboard = document.querySelector("#qwerty");
webKeyboard.addEventListener('click', e => {
    //make sure that clicking the space between and around the onscreen keyboard 
    //buttons does not result in the `handleInteraction()` method being called
    if(e.target.tagName === 'BUTTON') {
        game.handleInteraction(e.target);
    
    }
});
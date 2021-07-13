/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

//Step 2: Inside the Phrase.js file, declare the Phrase class.
//Step 3: phrase : This is the actual phrase the Phrase object is representing. This property
//should be set to the `phrase` parameter, but converted to all lower case.
class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

/**
* Display phrase on game board
*/
addPhraseToDisplay() {
    const phraseID = document.querySelector("#phrase");
    const phraseDivUL = phraseID.querySelector("ul");
    for (let i = 0; i<this.phrase.length; i++){
        if(this.phrase[i]===' '){
            phraseDivUL.innerHTML+='<li class="space"> </li>';
        }else{
            phraseDivUL.innerHTML+=`<li class="hide letter ${this.phrase[i]}">${this.phrase[i]}</li>`;
        }
    }
};

/**
* Checks if passed letter is in phrase
* @param (string) letter - Letter to check
*/
checkLetter(letter) {
    
    if(this.phrase.includes(letter)){
        return true;
    }else{
        return false;
    }
};


/**
 * Reveals the letter(s) on the board that matches the
player's selection. To reveal the matching letter(s), select all of the letter DOM
elements that have a CSS class name that matches the selected letter and
replace each selected element's `hide` CSS class with the `show` CSS class

* Displays passed letter on screen after a match is found
* @param (string) letter - Letter to display
*/
showMatchedLetter(letter) {
    const allLetters = document.getElementsByClassName('letter');
    for (let i = 0; i < allLetters.length; i++) {
        if(letter === allLetters[i].textContent){
            allLetters[i].classList.replace('hide', 'show');
        }
};
    }
}



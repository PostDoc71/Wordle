'use strict';

// First attempt at Wordle solver
// I think it gives an appropriate hint without giving a solution

//--------------------------------------
// DATA FEEDS FOR X AND J WORDS

// JWords = 
// juror junto junta jumpy JUMBO JUICY JUICE JUdge joust jolly joker joist 
// joint jiffy jewel jetty jerky jelly jazzy jaunt fjord enjoy eject banjo

// XWords =
// waxen vixen twixt toxin toxic sixty sixth relax proxy pixie pixel oxide 
// maxim index inbox helix fixer exult extra extol expel exist exile exert 
// excel exalt exact epoxy detox buxom boxer Borax axion axiom axial annex affix
//--------------------------------------

//--------------------------------------
// MAIN PROGRAM

let WordsInputEl = document.getElementById('words-input');
let CalculateEl = document.getElementById('calculate');
let ClearEl = document.getElementById('clear');
let OutputBox = document.getElementById('output-box');

WordsInputEl.addEventListener('change', Calculate)
WordsInputEl.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        Calculate();
    }
});
CalculateEl.addEventListener('click', Calculate);
ClearEl.addEventListener('click', Clear)

//--------------------------------------
// FUNCTIONS

function Calculate() {
    let Words = WordsInputEl.value.toUpperCase().split(/[^A-Za-z]+/).filter(x => x);
    console.log(Words);
    if (Validate(Words)) {
        let WordGroups = test(Words);

        OutputBox.innerHTML = '';
        for (let i = 0; i < WordGroups.length; i++) {
            let WordGroup = WordGroups[i];
            WordGroup.GroupSizes.sort((a,b) => b.GroupSizes.length - a.GroupSizes.length);
            WordGroup.GroupSizes.reverse();
            OutputBox.innerText += WordGroup.Guess + ' ';
            OutputBox.innerHTML += WordGroup.GroupSizes.length;
            OutputBox.innerHTML += ' - ';
            OutputBox.innerHTML += WordGroup.GroupSizes.join(',');
            OutputBox.innerHTML += '<br>'
        }
    }
}

function Validate(Words) {
    for (let i=0; i < Words.length; i++) {
        if (!(/^[A-Z]{5}$/.test(Words[i]))) {
            let ErrorMsg = Words[i] + ' must be alpha only & exactly 5 letters long';
            console.log(ErrorMsg);
            OutputBox.innerHTML = ErrorMsg;
            return false;
        }
    }
    return true;
}

function Clear (Words) {
    WordsInputEl.value = '';
    Calculate();
}

// Display each group with stats
function test(PossibleAnswers) {
    let WordGroups = [];
    for (let i = 0; i < PossibleAnswers.length; i++) {  // Collect the patterns
        let GuessWord = PossibleAnswers [i];
        let Patterns = [];
        for (let j = 0; j < PossibleAnswers.length; j++) {
            let MatchWord = PossibleAnswers [j];
            let Pattern = MatchPattern (GuessWord, MatchWord);
            Patterns.push(Pattern);     // ***   
        }
        // Tally the number of groups and number of elements in each group
        let Groups ={};
        for (let j = 0; j < Patterns.length; j++) {
            let Pattern = Patterns[j];
            if (Groups[Pattern] === undefined) {
                Groups[Pattern] = 0;
            }
            Groups[Pattern]++;
        }
        WordGroups.push({ Guess: GuessWord, GroupSizes: Object.values(Groups)  });
    }
    WordGroups.sort ((a,b) => b.GroupSizes.length - a.GroupSizes.length);

    for (let i = 0; i < WordGroups.length; i++) {
        let WordGroup = WordGroups[i];
        console.log(WordGroup.Guess, WordGroup.GroupSizes.length, '=>', WordGroup.GroupSizes.join(','));
    }

    return WordGroups;
}

function MatchPattern(GuessStr, MatchStr) {
// Change strings to arrays
    let OutputArr = ['.', '.', '.', '.', '.']  //Initialize to no match
    let GuessArr = [GuessStr[0], GuessStr[1], GuessStr[2], GuessStr[3], GuessStr[4]];
    let MatchArr = [MatchStr[0], MatchStr[1], MatchStr[2], MatchStr[3], MatchStr[4]];
    let OutputStr = '';

    for (let i = 0; i < GuessStr.length; i++) {
// Test for green exact matches
        if (GuessArr[i] === MatchArr[i]) {
            MatchArr[i] = '#';
            GuessArr[i] = '%';              // assures that this does not get replaced by a yellow
            OutputArr[i] = 'X';
        } 
        OutputStr = OutputArr[0] + OutputArr[1] + OutputArr[2] + OutputArr[3] + OutputArr[4];
    }
// Test for yellow match in wrong place
    for (let i = 0; i < GuessStr.length; i++) {
        let Marker = 0;
        if (MatchArr.indexOf(GuessArr[i]) !== -1) {
            MatchArr[MatchArr.indexOf(GuessArr[i])] = '$';
            OutputArr[i] = 'O';
        }
        OutputStr = OutputArr[0] + OutputArr[1] + OutputArr[2] + OutputArr[3] + OutputArr[4];
    }           
    OutputStr = OutputArr[0] + OutputArr[1] + OutputArr[2] + OutputArr[3] + OutputArr[4];
    return OutputStr;
}


 
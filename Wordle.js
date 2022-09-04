'use strict';

// First attempt at Wordle solver
// I think it gives appropriate hints without giving a solution

// ====================================
// DATA FEEDS

// JWords = 
// juror junto junta jumpy JUMBO JUICY JUICE JUdge joust jolly joker joist 
// joint jiffy jewel jetty jerky jelly jazzy jaunt fjord enjoy eject banjo
// Test list =
// aahed junta esntp frack joint
// XWords =
// waxen vixen twixt toxin toxic sixty sixth relax proxy pixie pixel oxide 
// maxim index inbox helix fixer exult extra extol expel exist exile exert 
// excel exalt exact epoxy detox buxom boxer Borax axion axiom axial annex affix

//--------------------------------------
Promise.all([
    fetch('https://babelthuap.github.io/kokowordle/solutions.json').then(r => r.json()),
    fetch('https://babelthuap.github.io/kokowordle/guesses.json').then(r => r.json()),
  ]).then (([s, g]) => {
    const SolutionList = [...s];
    const GuessList = [...g];

// ====================================
// MAIN PROGRAM

let WordsInputEl = document.getElementById('words-input');
let WordCheckEl = document.getElementById('word-check');
let SolutionListEl = document.getElementById('solution-list');
let GuessListEl = document.getElementById('guess-list');
let CalculateEl = document.getElementById('calculate');
let ClearEl = document.getElementById('clear');
let OutputBox = document.getElementById('output-box');

// WordsInputEl.addEventListener('keypress', e => {
//     if (e.key === 'Enter') {
//         Calculate();
//     }
// });

WordCheckEl.addEventListener('click', WordCheck);
SolutionListEl.addEventListener('click', () => ShowList(SolutionList));
GuessListEl.addEventListener('click', () => ShowList(GuessList));
CalculateEl.addEventListener('click', Calculate);
ClearEl.addEventListener('click', Clear);

// ====================================
// FUNCTIONS

// -----------------------------------
// Check words against the Wordle dictionaries

function WordCheck() {
    let Words = WordsInputEl.value.toUpperCase().split(/[^A-Za-z]+/).filter(x => x);
    if (Validate(Words)) {
        let Output = '';
        let Msg = [];
        OutputBox.innerHTML = '';

        /* Check which list the word is in */
        for (let i = 0; i < Words.length; i++) {
            Msg[i] = Words[i] + ' - '; 
            if (searchStringInArray (Words[i], SolutionList) >= 0) {
                Msg[i] += `bonafide solution<br>`;
            } else if (searchStringInArray (Words[i], GuessList) >= 0) {
                Msg[i] += `valid guess word<br>`;
            } else {
                Msg[i] += `not in the dictionary<br>`;
            }
        }

        /* Sort and display the list */
        for (let i = 0; i < Words.length; i++) {
            if (Msg[i].match(/\bbonafide\b/)) {
                Output +=  Msg[i];
            }
        }        
        for (let i = 0; i < Words.length; i++) {
            if (Msg[i].match(/\bvalid\b/)) {
                Output += Msg[i];
            }           
        }        
        for (let i = 0; i < Words.length; i++) {
            if (Msg[i].match(/\bnot\b/)) {
                Output += Msg[i];
            }  
        }
        for (let i = 0; i < Msg.length; i++)
        OutputBox.innerHTML = Output;
    }
}

// -----------------------------------
// Display the entire contents of the dictionaries

function ShowList (List) {
    OutputBox.innerHTML = '';
    let Output = '';
    let h = Math.floor(List.length / 6) + 1;
    let j = h + h;
    let k = j + h;
    let m = k + h;
    let n = m + h;

    for (let i = 0; i < h; i++) {
        Output += List[i] + ' ' + List[h+i] +' ' +  List[j+i] +' ' +  List[k+i] +' ' +  List[m+i];
        if (List[n + i]) {
            Output += ' ' + List[n+i] + `<br>`;
        } else {
            Output += `<br>`;
        }
    }

    OutputBox.innerHTML = Output;
}

// -----------------------------------
// Calculate word list stats by number of groups and number of elements in each group

function Calculate() {
    let Words = WordsInputEl.value.toUpperCase().split(/[^A-Za-z]+/).filter(x => x);

    if ( Validate(Words) ) {
        let WordGroups = test(Words);
        OutputBox.innerHTML = '';
        for (let i = 0; i < WordGroups.length; i++) {
            let WordGroup = WordGroups[i];
            WordGroup.GroupSizes.sort((a,b) => b - a);
            OutputBox.innerText += WordGroup.Guess + ' ';
            OutputBox.innerHTML += WordGroup.GroupSizes.length;
            OutputBox.innerHTML += ' - ';
            OutputBox.innerHTML += WordGroup.GroupSizes.join(',');
            OutputBox.innerHTML += '<br>';
        }
    }
}

function test(PossibleAnswers) {
    let WordGroups = [];

    for (let i = 0; i < PossibleAnswers.length; i++) {  

        // Collect the patterns
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
    return WordGroups;
}

function MatchPattern(GuessStr, MatchStr) {

// Change strings to arrays
    let OutputArr = ['.', '.', '.', '.', '.']  //Initialize to no match
    let GuessArr = [GuessStr[0], GuessStr[1], GuessStr[2], GuessStr[3], GuessStr[4]];
    let MatchArr = [MatchStr[0], MatchStr[1], MatchStr[2], MatchStr[3], MatchStr[4]];
    let OutputStr = '';

// Mark green matches
    for (let i = 0; i < GuessStr.length; i++) {
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

// -----------------------------------
// PRIMITIVE FUNCTIONS

function searchStringInArray (str, strArray) {
    for (let j=0; j<strArray.length; j++) {
        if (strArray[j].match(str)) return j;
    }
    return -1;
}

function Validate(Words) {
    for (let i=0; i < Words.length; i++) {
        if (!(/^[A-Z]{5}$/.test(Words[i]))) {
            let ErrorMsg = Words[i] + ' must be alpha only & exactly 5 letters long';
            OutputBox.innerHTML = ErrorMsg;
            return false;
        }
    }
    return true;
}

function Clear (Words) {
    WordsInputEl.value = '';
    OutputBox.innerHTML = '';
}

}
)
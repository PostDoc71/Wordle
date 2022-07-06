'use strict';

// First attempt at Wordle solver
// I think it gives an appropriate hint without giving a solution

//--------------------------------------
// MAIN PROGRAM

//--------------------------------------
// Global variables

// Feed data here until I have an input line
let PossibleAnswers = 'juror junto junta jumpy JUMBO JUICY JUICE JUdge joust jolly joker joist joint jiffy jewel jetty jerky jelly jazzy jaunt fjord enjoy eject banjo';
PossibleAnswers = PossibleAnswers.toUpperCase ();
PossibleAnswers = PossibleAnswers.split(' ');
for (let i=0; i < PossibleAnswers.length; i++) {
    if (!(/^[A-Z]{5}$/.test(PossibleAnswers[i]))) {
        console.log (PossibleAnswers[i], 'must be alpha only, exactly 5 letters long, and delimiter must be a single space.');
        return;
    }
}
//let JWords = ['JUROR', 'JUNTO', 'JUNTA', 'JUMPY', 'JUMBO', 'JUICY', 'JUICE', 'JUDGE', 'JOUST', 'JOLLY', 'JOKER', 
//'JOIST', 'JOINT', 'JIFFY', 'JEWEL', 'JETTY', 'JERKY', 'JELLY', 'JAZZY', 'JAUNT', 'FJORD', 'ENJOY', 'EJECT', 'BANJO'];
let PatternArr = [];
let GroupsArr = [];
let GroupTallyStr = '';
let TempStr = '';
//--------------------------------------

console.log ('---------------');

// Display each group with stats
for (let i  = 0; i< PossibleAnswers.length; i++) {  // Collect the patterns
    let GuessWord = PossibleAnswers [i];
    let Pattern = [];
    for (let j = 0; j < PossibleAnswers.length; j++) {
        let MatchWord = PossibleAnswers [j];
        Pattern[j] = MatchPattern (GuessWord, MatchWord);
        PatternArr[i] = PatternArr[i] + Pattern[j];        
//        PatternArr[i].push(Pattern[j]);        
    }
    for (let j = 0; j < PossibleAnswers.length; j++) {  // Tally the patterns
        let GroupTally = [];
        for (let k = j; k < PossibleAnswers.length; k++) {
            let TestStr = Pattern[j];
            if (TestStr === Pattern[k]) {
                GroupTally[j]++;
                Pattern[j] = '*****'; //removes element from further counting
            }
            GroupTallyStr = GroupTally.length + '=';
            TempStr = '>';
        for (let k = 0; k < GroupTally.length; k++) { // create string tally values
            TempStr = TempStr + GroupTally[k];
        }
        GroupTallyStr = GroupTallyStr + TempStr;
        console.log (GroupTallyStr);
        }
        console.log (GuessWord, 'X', PossibleAnswers[j], '=', Pattern[j]);
        return;
    }   
    console.log ( )
}

//--------------------------------------
// Functions

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


 
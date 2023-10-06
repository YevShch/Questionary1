const prompt = require( 'prompt-sync' )( { sigint: true } )
let questions = require( './questions.json' );
let userData = require( './results.json' );
const fs = require( 'fs' )
const result = {
  "userName": "",
  "userDate": "",
  "userResult": []
};

console.log( "FRÅGEFORMULÄR *VILKET HUSDJUR PASSAR DIG BÄST." );

const readQuestions = () => {
  const data = fs.readFileSync( 'answers.json' );
  return JSON.parse( data );
};
let katTotalPoints = 0;
let hundTotalPoints = 0;
let kaninTotalPoints = 0;
let fiskTotalPoints = 0;

questions.forEach( ( question, index ) => {
  console.log( `${ index + 1 }. ${ question.question }` );

  let userInput = "";

  let katPoints;
  let hundPoints;
  let kaninPoints;
  let fiskPoints;

  while ( userInput.trim().toLowerCase() !== "ja" && userInput.trim().toLowerCase() !== "nej" ) {
    userInput = prompt( "Vänligen svara 'ja' eller 'nej':" );

    if ( userInput.trim().toLowerCase() !== "ja" && userInput.trim().toLowerCase() !== "nej" ) {
      userInput = prompt( "Vänligen svara 'ja' eller 'nej':" );
    } else if ( userInput == "ja" )
    {
      katPoints = question.ja.Kat
      hundPoints = question.ja.Hund
      kaninPoints = question.ja.Kanin
      fiskPoints = question.ja.Fisk
    } else if ( userInput == "nej" )
    {
      katPoints = question.nej.Kat
      hundPoints = question.nej.Hund
      kaninPoints = question.nej.Kanin
      fiskPoints = question.nej.Fisk
    }
    console.log( "Du svarade: " + userInput );

    katTotalPoints += katPoints;
    hundTotalPoints += hundPoints;
    kaninTotalPoints += kaninPoints;
    fiskTotalPoints += fiskPoints;
  }
} );
console.log( "Det var sista fråga!" );

const katResult = ( katTotalPoints * 100 ) / ( questions.length * 3 )
const hundResult = ( hundTotalPoints * 100 ) / ( questions.length * 3 )
const kaninResult = ( kaninTotalPoints * 100 ) / ( questions.length * 3 )
const fiskResult = ( fiskTotalPoints * 100 ) / ( questions.length * 3 )

console.log( "Resultaten av frågeformuläret: kat -" + katResult + "%, hund -" + hundResult + "%, kanin -" + kaninResult + "%, fisk -" + fiskResult + "%." );

let totalResult = [ katResult, hundResult, kaninResult, fiskResult ];

result.userName = prompt( `Skriv gärna ditt namn ` );
result.userDate = new Date();
result.userResult = totalResult
userData.push( result );
console.log( userData );

fs.writeFileSync( './results.json', JSON.stringify( userData, null, 2 ), ( err ) => {
  if ( err ) throw err;
  console.log( userData );
} );

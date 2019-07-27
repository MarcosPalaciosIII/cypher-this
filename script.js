
// - function to create alphabet in array

// " ".charCodeAt(0) // 32
// "!".charCodeAt(0) // 33
// '"'.charCodeAt(0) // 34
// "#".charCodeAt(0) // 35
// "$".charCodeAt(0) // 36
// "%".charCodeAt(0) // 37
// "&".charCodeAt(0) // 38
// "'".charCodeAt(0) // 39
// "(".charCodeAt(0) // 40
// ")".charCodeAt(0) // 41
// "*".charCodeAt(0) // 42
// "+".charCodeAt(0) // 43
// ",".charCodeAt(0) // 44
// "-".charCodeAt(0) // 45
// ".".charCodeAt(0) // 46
// "/".charCodeAt(0) // 47

// "0".charCodeAt(0) // 48
// "9".charCodeAt(0) // 57

// ":".charCodeAt(0) // 58
// ";".charCodeAt(0) // 59

// "<".charCodeAt(0) // 60
// "=".charCodeAt(0) // 61
// ">".charCodeAt(0) // 62
// "?".charCodeAt(0) // 63
// "@".charCodeAt(0) // 64

// 'A'.charCodeAt(0) // 65
// 'Z'.charCodeAt(0) // 90

// "[".charCodeAt(0) // 91
// "\".charCodeAt(0) // 92
// "]".charCodeAt(0) // 93
// "^".charCodeAt(0) // 94
// "_".charCodeAt(0) // 95
// "`".charCodeAt(0) // 96

// "a".charCodeAt(0) // 97
// "z".charCodeAt(0) // 122

// "{".charCodeAt(0) // 123
// "|".charCodeAt(0) // 124
// "}".charCodeAt(0) // 125

var genCharArray = (charA, charZ) => {

    let alphabetArray = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        alphabetArray.push(String.fromCharCode(i));
    }
    return alphabetArray;
};


// - another way to set up a unique array along with a filter

// var onlyUnique = (value, index, self) => {
//     return self.indexOf(value) === index;
// }

// - the function for the cypher
var cypher = (word, sentence, cryptType) => {

  // creating alphabet to use in the cypher using the "genCharArray" function from above
  let alphabet = genCharArray('!', '}');

  // how much each letter will shift in the cypher
  let shift = alphabet.indexOf(word[0]) + word.length;

  // this is for a unique array
  let theWord = [...new Set(word.split(''))];

  // - another way to make a unique array using the "onlyUnique" function from above
  // let theWord = word.split('').filter(onlyUnique)

for(let i = theWord.length-1; i >= 0; i--) {
    alphabet.splice(alphabet.indexOf(theWord[i]), 1);
    alphabet.unshift(theWord[i]);

  }

  // this will hold the new sentence that is created from the cypher to then have it returned
  let newSentence = [];

  // - another way to iterate over an array (similar to normal for loop)

  // for(i in sentence) {
  //   console.log(sentence[i])
  // }

  // iterate through the sentence given and make the changes needed in order to encrypt or decrypt it
for(let i of sentence) {
    let tempIndex = alphabet.indexOf(i) + shift;
    if(cryptType === 'decrypt') {
      tempIndex = alphabet.indexOf(i) - shift;
    }

    if(alphabet.indexOf(i) < 0) {
      newSentence.push(' ');
    } else if(tempIndex > alphabet.length-1) {
      newSentence.push(alphabet[tempIndex - alphabet.length]);
    } else if(tempIndex < 0 && cryptType === 'decrypt') {
      newSentence.push(alphabet[tempIndex + alphabet.length]);
    } else {
      newSentence.push(alphabet[tempIndex]);
    }

  }
  return newSentence.join('');
};


window.addEventListener('DOMContentLoaded', () => {
  var theCryptType;

  document.getElementById('submitButton').onclick = () => {
    var theSentence = document.getElementById('sentence').value;
    var cypherKey = document.getElementById('cypherKey').value;
     if(document.getElementById('encrypt').checked) {
       theCryptType = 'encrypt';
     } else {
       theCryptType = 'decrypt';
     }

    document.getElementById('response').innerText = cypher(cypherKey, theSentence, theCryptType);

  };
});

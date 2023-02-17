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

//function to generate a shuffled alphabet string used in the cypher algorithm.
let genAlpha1 = (charA, charZ, key) => {
  let alphabetArray = []; //alpha array
  let from = charA.charCodeAt(0); //beginning character
  let to = charZ.charCodeAt(0); //ending character

  //add all the characters between to/from to the alpha array
  for (let i = from; i <= to; i++) {
    alphabetArray.push(String.fromCharCode(i));
  }

  //create a unique array by splitting characters in the key and removing duplicates chars
  let uniqueArr = [...new Set(key.split(''))];

  //shuffling alphaArray by moving the uniqueArr chars.
  for (let i = uniqueArr.length - 1; i >= 0; i--) {
    alphabetArray.splice(alphabetArray.indexOf(uniqueArr[i]), 1);
    alphabetArray.unshift(uniqueArr[i]);
  }

  //return alphaArray as a string
  return alphabetArray.join('');
};

//function to generate a shifted alpha string based on alpha1
let genAlpha2 = (alpha, shift) => {
  let tempArr = [];

  //Determine the new character base on the amount shifted
  for (char of alpha) {
    let index = (alpha.indexOf(char) + shift) % alpha.length;
    tempArr.push(alpha[index]);
  }

  //return shifted alpha as a string
  return tempArr.join('');
};

// - the function for the cypher
let cypher = (sentence, method, key) => {
  // this will hold the new sentence that is created from the cypher to then have it returned
  let newSentence = [];

  // generate first alpha string of characters
  let alpha1 = genAlpha1(' ', '}', key);

  // determines the amount each char will shift for the second alpha string.
  let shift = key.charCodeAt(0) + key.length;

  // generate second alpha string with the shifted characters
  let alpha2 = genAlpha2(alpha1, shift);

  //iterate through the sentence given and make the changes needed in order to encrypt or decrypt it
  for (let char of sentence) {
    if (method === 'encrypt') {
      //push to newSentence Array the shifted character
      let index = alpha1.indexOf(char);
      newSentence.push(alpha2[index]);
    } else {
      // we are decryping

      let index = alpha2.indexOf(char);
      newSentence.push(alpha1[index]);
    }
  }

  //return
  return newSentence.join('');
};

window.addEventListener('DOMContentLoaded', () => {
  var theCryptType;

  document.getElementById('submitButton').onclick = () => {
    var theSentence = document.getElementById('sentence').value;
    var cypherKey = document.getElementById('cypherKey').value;
    if (document.getElementById('encrypt').checked) {
      theCryptType = 'encrypt';
    } else {
      theCryptType = 'decrypt';
    }

    document.getElementById('response').innerText = cypher(
      theSentence,
      theCryptType,
      cypherKey
    );
  };
});

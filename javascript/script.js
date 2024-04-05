let scoreStr = localStorage.getItem("score");
let score = JSON.parse(scoreStr) || {
  win: 0,
  lost: 0,
  tie: 0,
};
score.diisplayScore = function () {
  return `Win: ${this.win} | Lost: ${this.lost} | Tie: ${this.tie}`;
}

function reset() {
  localStorage.clear();
  document.location.reload(true)
}
function computerChoiceFunction() {
  let randomNumber = Math.random() * 3;
  let computerChoice = '';
  if (randomNumber > 0 && randomNumber <= 1) {
    computerChoice = 'Bat';
  } else if (randomNumber > 1 && randomNumber <= 2) {
    computerChoice = 'Ball';
  } else {
    computerChoice = 'Stump';
  }
  return computerChoice;
}

// function getResult(userMove, computerMove) {
//   if (userMove === 'Bat') {
//     if (computerMove === 'Ball') {
//       score.win++;
//       return 'User won.';
//     } else if (computerMove === 'Bat') {
//       score.tie++;
//       return 'Match tie.';
//     } else if (computerMove === 'Stump') {
//       score.lost++;
//       return 'Computer won.';
//     }
//   } else if (userMove === 'Ball') {
//     if (computerMove === 'Ball') {
//       score.tie++;
//       return 'Match tie.';
//     } else if (computerMove === 'Bat') {
//       score.lost++;
//       return 'Computer won.';
//     } else if (computerMove === 'Stump') {
//       score.win++;
//       return 'User won.';
//     }
//   } else {
//     if (computerMove === 'Ball') {
//       score.lost++;
//       return 'Computer won.';
//     } else if (computerMove === 'Bat') {
//       score.win++;
//       return 'User won.';
//     } else if (computerMove === 'Stump') {
//       score.tie++;
//       return 'Match tie.';
//     }
//   }
// }
function getResult(userMove, computerMove) {
  let resultMsg = '';

  if (userMove === computerMove) {
    score.tie++;
    resultMsg = 'Match tie.';
  } else if (
    (userMove === 'Bat' && computerMove === 'Ball') ||
    (userMove === 'Ball' && computerMove === 'Stump') ||
    (userMove === 'Stump' && computerMove === 'Bat')
  ) {
    score.win++;
    resultMsg = 'User won.';
  } else {
    score.lost++;
    resultMsg = 'Computer won.';
  }

  return resultMsg;
}


function showResult(userMove, computerMove, result) {
  localStorage.setItem('score', JSON.stringify(score));
  document.querySelector('#user-move').innerText = `You have chosen ${userMove}`
  document.querySelector('#computer-move').innerText = `Computer choice is ${computerMove}`
  document.querySelector('#result-move').innerText = `The result is: ${result}`
  document.querySelector('#score').innerText = `Score is ${score.diisplayScore()}`

  // alert(`
  // You have chosen ${userMove}.
  // Computer choice is ${computerMove} 

  // The result is: ${result}
  // ${score.diisplayScore()}
  // `);
}

async function batFunction() {
  let computerChoice = computerChoiceFunction();
  let resultMsg = await getResult('Bat', computerChoice);
  showResult('Bat', computerChoice, resultMsg);
}

async function ballFunction() {
  let computerChoice = computerChoiceFunction();
  let resultMsg = await getResult('Ball', computerChoice);
  showResult('Ball', computerChoice, resultMsg);
}

async function stumpFunction() {
  let computerChoice = computerChoiceFunction();
  let resultMsg = await getResult('Stump', computerChoice);
  showResult('Stump', computerChoice, resultMsg);
}

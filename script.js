function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getComputerChoice() {
  let max = 3;                     // three possible choices
  let choice = getRandomInt(max);  // get random number between 0-2

  if (choice == 0) {
    return 'rock';
  } else if (choice == 1) {
    return 'paper';
  } else {
    return 'scissors';
  }
}

function getHumanChoice() {
  let userChoice = prompt('Please enter your choice (Rock, Paper, Scissors)');
  return userChoice;
}

function playRound(humanChoice, computerChoice) {
  humanChoice = humanChoice.toLowerCase();

  if (humanChoice === 'rock' && computerChoice === 'scissors') {
    return 'You win! Rock beats scissors';
  } else if (humanChoice === 'paper' && computerChoice === 'rock') {
    return 'You win! Paper beats rock';
  } else if (humanChoice === 'scissors' && computerChoice === 'paper') {
    return 'You win! Scissors beats paper';
  } else if (humanChoice === computerChoice) {
    return 'Its a tie!';
  } else {
    return 'You loose! ' + computerChoice + ' beats ' + humanChoice;
  }
}

function playGame() {
  let humanSelection = 0;
  let computerSelection = 0;

  let humanScore = 0;
  let computerScore = 0;
  let rounds = 5;  // number of rounds played

  let result = 0;

  function printRoundResult() {
    console.log('You Chose: ' + humanSelection);
    console.log('Computer Chose: ' + computerSelection);
    console.log(result);
  }

  for (let i = 0; i < rounds; i++) {
    humanSelection = getHumanChoice();
    computerSelection = getComputerChoice();

    result = playRound(humanSelection, computerSelection);

    if (result.includes('win')) { // checks if result includes win and ups score
      printRoundResult();
      humanScore++;
    } else if (result.includes('tie')) {
      printRoundResult();
      rounds++;
    } else {
      printRoundResult();
      computerScore++;
    }
  }

  if (humanScore > computerScore) {  // choose game winner
    return 'You won the game!';
  } else {
    return 'You lost the game!';
  }
}

console.log(playGame());

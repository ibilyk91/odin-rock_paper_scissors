const display = document.createElement('div');
display.textContent = 'Please make your selection:\n';
document.body.appendChild(display);
display.style.whiteSpace = 'pre-line'; // needed for \n to work

const playerSelection = document.createElement('div');
const rock = document.createElement('button');
rock.textContent = 'rock';
const paper = document.createElement('button');
paper.textContent = 'paper';
const scissors = document.createElement('button');
scissors.textContent = 'scissors';

playerSelection.append(rock, paper, scissors);
document.body.appendChild(playerSelection);



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

function getHumanChoice() { // for each button create click event & return textContent of the button clicked
  return new Promise(resolve => { // creating new object from Promise(), which is like a blueprint
    document.querySelectorAll('button').forEach(btn => {
      btn.onclick = () => resolve(btn.textContent);
    });
  });
}

function playRound(humanChoice, computerChoice) {

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

async function playGame() {
  let humanSelection = 0;
  let computerSelection = 0;

  let humanScore = 0;
  let computerScore = 0;
  let rounds = 5;  // number of rounds played

  let result = 0;


  function printRoundResult() {
    display.textContent += 'You Chose: ' + humanSelection + '\n' +
        'Computer Chose: ' + computerSelection + '\n' + result + '\n' +
        '---------------------------------\n';
  }

  for (let i = 0; i < rounds; i++) {
    humanSelection = await getHumanChoice(); // wait for function to finish. only works for async functions
    computerSelection = getComputerChoice();

    result = playRound(humanSelection, computerSelection);

    if (result.includes(
            'win')) {  // checks if result includes win and ups score
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

  let message = '';

  if (humanScore > computerScore) {  // choose game winner
    message = ':) You won the game!';
  } else {
    message = ':( You lost the game!';
  }

  display.textContent += message;
}

playGame();

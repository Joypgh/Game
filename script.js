// Select the board, cells, message, and button elements
const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restart = document.getElementById('restart');

// Define the symbols for the players
const X = 'X';
const O = 'O';

// Define the winning combinations as an array of arrays
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Define a variable to keep track of the current player
let currentPlayer = X;

// Define a variable to keep track of the game status
let gameActive = true;

// Add an event listener to the board element to handle clicks
board.addEventListener('click', handleCellClick);

// Add an event listener to the button element to handle clicks
restart.addEventListener('click', handleRestartClick);

// Define a function to handle cell clicks
function handleCellClick(event) {
    // Get the clicked cell element
    const clickedCell = event.target;

    // Check if the clicked cell is a valid cell
    if (clickedCell.classList.contains('cell')) {
        // Check if the game is active and the cell is empty
        if (gameActive && !clickedCell.textContent) {
            // Place the current player's symbol on the cell
            clickedCell.textContent = currentPlayer;
            // Add a class to the cell to style it
            clickedCell.classList.add(currentPlayer);
            // Check if the game is over
            checkGameStatus();
        }
    }
}
// Define a function to check the game status
function checkGameStatus() {
    // Loop through the winning combinations
    for (let combination of WINNING_COMBINATIONS) {
        // Get the values of the cells for the current combination
        let cell1 = cells[combination[0]].textContent;
        let cell2 = cells[combination[1]].textContent;
        let cell3 = cells[combination[2]].textContent;
        // Check if the values are equal and not empty
        if (cell1 && cell1 === cell2 && cell2 === cell3) {
            // The current player has won
            gameActive = false; // Set the game status to inactive
            message.textContent = `${currentPlayer} has won!`; // Display the winner message
            return; // Exit the function
        }
    }
    // Check if there are any empty cells left
    let emptyCells = [...cells].filter(cell => !cell.textContent);
    // If there are no empty cells, the game is a draw
    if (emptyCells.length === 0) {
        gameActive = false; // Set the game status to inactive
        message.textContent = 'It\'s a draw!'; // Display the draw message
        return; // Exit the function
    }
    // If the game is not over, switch the current player
    switchPlayer();
}

// Define a function to switch the current player
function switchPlayer() {
    // Use a ternary operator to toggle between X and O
    currentPlayer = currentPlayer === X ? O : X;
    // Display the current player's turn
    message.textContent = `${currentPlayer}'s turn`;
}

// Define a function to handle restart clicks
function handleRestartClick() {
    // Reset the game status
    gameActive = true;
    // Reset the current player
    currentPlayer = X;
    // Reset the message
    message.textContent = `${currentPlayer}'s turn`;
    // Loop through the cells and clear their content and class
    for (let cell of cells) {
        cell.textContent = '';
        cell.classList.remove(X);
        cell.classList.remove(O);
    }
}

// Select the popup and its child elements
const popup = document.querySelector(".popup");
const popupTitle = document.querySelector(".popup-title");
const popupMessage = document.querySelector(".popup-message");
const popupButton = document.querySelector(".popup-button");

// Define a function to show the popup
function showPopup() {
  // Set the display of the popup to block
  popup.style.display = "block";
  // Check if the game is over
  if (gameActive) {
    // If the game is not over, set the popup title and message to indicate a draw
    popupTitle.textContent = "It's a draw!";
    popupMessage.textContent = "No one won this round.";
  } else {
    // If the game is over, set the popup title and message to indicate the winner
    popupTitle.textContent = "You won!";
    popupMessage.textContent = `Congratulations, you beat the computer with ${currentPlayer}!`;
  }
}

// Define a function to hide the popup
function hidePopup() {
  // Set the display of the popup to none
  popup.style.display = "none";
}

// Add an event listener to the popup button to restart the game when clicked
popupButton.addEventListener("click", () => {
  // Hide the popup
  hidePopup();
  // Restart the game
  handleRestartClick();
});

// Modify the checkGameStatus function to show the popup when the game is over or a draw
function checkGameStatus() {
  // Loop through the winning combinations
  for (let combination of WINNING_COMBINATIONS) {
    // Get the values of the cells for the current combination
    let cell1 = cells[combination[0]].textContent;
    let cell2 = cells[combination[1]].textContent;
    let cell3 = cells[combination[2]].textContent;
    // Check if the values are equal and not empty
    if (cell1 && cell1 === cell2 && cell2 === cell3) {
      // The current player has won
      gameActive = false; // Set the game status to inactive
      // Show the popup
      showPopup();
      return; // Exit the function
    }
  }
  // Check if there are any empty cells left
  let emptyCells = [...cells].filter((cell) => !cell.textContent);
  // If there are no empty cells, the game is a draw
  if (emptyCells.length === 0) {
    gameActive = false; // Set the game status to inactive
    // Show the popup
    showPopup();
    return; // Exit the function
  }
  // If the game is not over, switch the current player
  switchPlayer();
}
// Select the frame element
const frame = document.querySelector(".frame");

// Define a function to add a new row to the frame
function addRow() {
  // Get the current number of rows
  let rows = frame.style.gridTemplateRows.split(" ").length;
  // Increment the number of rows
  rows++;
  // Set the new number and size of rows
  frame.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  // Loop through the number of columns
  for (let i = 0; i < frame.style.gridTemplateColumns.split(" ").length; i++) {
    // Create a new cell element
    let cell = document.createElement("div");
    // Add the cell class to the cell element
    cell.classList.add("cell");
    // Add a border to the cell element
    cell.style.border = "2px solid black";
    // Append the cell element to the frame element
    frame.appendChild(cell);
  }
}

// Define a function to add a new column to the frame
function addColumn() {
  // Get the current number of columns
  let columns = frame.style.gridTemplateColumns.split(" ").length;
  // Increment the number of columns
  columns++;
  // Set the new number and size of columns
  frame.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  // Loop through the number of rows
  for (let i = 0; i < frame.style.gridTemplateRows.split(" ").length; i++) {
    // Create a new cell element
    let cell = document.createElement("div");
    // Add the cell class to the cell element
    cell.classList.add("cell");
    // Add a border to the cell element
    cell.style.border = "2px solid black";
    // Append the cell element to the frame element
    frame.appendChild(cell);
  }
}

// Add event listeners to the buttons to call the functions when clicked
document.getElementById("add-row").addEventListener("click", addRow);
document.getElementById("add-column").addEventListener("click", addColumn);

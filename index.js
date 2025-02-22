//initialising an empty board
const board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const movement = [];

// function animateTiles(movement) {
//   while (movement.length !== 0) {
//     let move = movement.pop(); // Store and remove the last movement

//     if (move.direction == "left") {
//       let dis = (move.to[1] - move.from[1]) * 110;  // Fix multiplication

//       tiles[(move.from[0] * 4) + move.from[1]].animate([
//         { transform: `translateX(${dis}px)` },
//         { transform: 'translateX(0px)' }  // Return to normal position
//       ], {
//         duration: 9000,
//         iterations: 1
//       });
//     }

//     if (move.direction == "right") {
//       let dis = (move.from[1] - move.to[1]) * 110;  // Fix multiplication

//       tiles[(move.from[0] * 4) + move.from[1]].animate([
//         { transform: `translateX(${dis}px)` },
//         { transform: 'translateX(0px)' }  // Return to normal position
//       ], {
//         duration: 9000,
//         iterations: 1
//       });
//     }

//     if (move.direction == "down") {
//       let dis = (move.to[0] - move.from[0]) * 110;  // Fix multiplication

//       tiles[(move.from[0] * 4) + move.from[1]].animate([
//         { transform: 'translateX(0px)' },
//         { transform: `translateX(${dis}px) ` }  // Return to normal position
//       ], {
//         duration: 9000,
//         iterations: 1
//       });
//     }

//     if (move.direction == "up") {
//       let dis = (move.from[1] - move.to[1]) * 110;  // Fix multiplication

//       tiles[(move.from[0] * 4) + move.from[1]].animate([
//         { transform: 'translateX(0px)' },
//         { transform: `translateX(${dis}px) ` }  // Return to normal position
//       ], {
//         duration: 9000,
//         iterations: 1
//       });
//     }
//   }

//   setTimeout(() => updateBoard(), 500); // Delay board update until animation completes
// }


//referencing the values of the board in a nodearray
const tiles = document.querySelectorAll(".tile");

//start of the game two random tiles appear
function startGame() {
  let firstRandomTile = Math.floor(Math.random() * 16);
  let secondRandomTile = Math.floor(Math.random() * 16);
  while (secondRandomTile === firstRandomTile) {
    secondRandomTile = Math.floor(Math.random() * 16);
  }
  console.log(firstRandomTile);
  console.log(secondRandomTile);

  board[Math.floor(firstRandomTile / 4)][firstRandomTile % 4] =
    Math.floor(Math.random() * 2) === 0 ? 2 : 4;

  board[Math.floor(secondRandomTile / 4)][secondRandomTile % 4] =
    Math.floor(Math.random() * 2) === 0 ? 2 : 4;

  updateBoard();
  console.log("reached");
  console.log(board);

  //key movement function
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowDown") {
      moveTiles("down");
      console.log("keydown");
    } else if (event.key === "ArrowUp") {
      moveTiles("up");
      console.log("keyup");
    } else if (event.key === "ArrowLeft") {
      moveTiles("left");
    } else if (event.key === "ArrowRight") {
      moveTiles("right");
    }
    let randomTile = Math.floor(Math.random() * 16);
    while (board[Math.floor(randomTile / 4)][randomTile % 4] !== 0) {
      randomTile = Math.floor(Math.random() * 16);
    }
    board[Math.floor(randomTile / 4)][randomTile % 4] =
      Math.floor(Math.random() * 2) === 0 ? 2 : 4;

    updateBoard();
  });
}

window.onload = function () {
  startGame();
};

//updating the board values acc to the board array
//this function updates the tiles array not the
function updateBoard() {
  //animateTiles(movement);
  console.log(movement);
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      let index = row * 4 + col;
      tiles[index].textContent = board[row][col] === 0 ? 0 : board[row][col];
      // console.log(tiles[index]);

      //losing the game
      let zeroCount = 0;
      for (let parse = 0; parse < tiles.length; parse++) {
        // console.log(tiles[parse].textContent);
        if (tiles[parse].textContent == 0) {
          zeroCount++;
          // console.log("counting");
          // console.log(zeroCount);
        }
      }

      if (zeroCount == 0){

        alert("Game Over!");

      }
      //hiding tiles with content == 0
      if (board[row][col] === 0) {
        tiles[index].style.display = "none";
      } else {
        tiles[index].style.display = "block";
      }

      //changing the color of tiles based on their values
      if (board[row][col] === 2) {
        tiles[index].style.backgroundColor = "#EEE4DA";
        tiles[index].style.color = "#776E65";
      } else if (board[row][col] === 4) {
        tiles[index].style.backgroundColor = "#EDE0C8";
        tiles[index].style.color = "#776E65";
      } else if (board[row][col] === 8) {
        tiles[index].style.backgroundColor = "#F2B179";
        tiles[index].style.color = "#F9F6F2";
      } else if (board[row][col] === 16) {
        tiles[index].style.backgroundColor = "#F59563";
        tiles[index].style.color = "#F9F6F2";
      } else if (board[row][col] === 32) {
        tiles[index].style.backgroundColor = "#F67C5F";
        tiles[index].style.color = "#F9F6F2";
      } else if (board[row][col] === 64) {
        tiles[index].style.backgroundColor = "#F65E3B";
        tiles[index].style.color = "#F9F6F2";
      } else {
        tiles[index].style.backgroundColor = "#EDCF72";
        tiles[index].style.color = "#F9F6F2";
      }
    }
  }
}

//function to move tiles
function moveTiles(direction) {
  //move tiles for down direction
  if (direction === "down") {
    for (let row = 2; row >= 0; row--) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col] !== 0) {
          if (board[row + 1][col] === 0) {
            let targetRow = row + 1;
            while (targetRow < 3 && board[targetRow + 1][col] === 0) {
              targetRow++;
            }
            if (
              targetRow < 3 &&
              board[targetRow + 1][col] === board[row][col]
            ) {
              board[targetRow + 1][col] = board[row][col] * 2;
              board[row][col] = 0;

              //storing postions for tiles' animations
              movement.push({
                from: [row, col],
                to: [targetRow + 1, col],
                direction: "down",
                value: board[targetRow + 1][col],
              });



            } else {
              board[targetRow][col] = board[row][col];
              board[row][col] = 0;

              //storing postions for tiles' animations
              movement.push({
                from: [row, col],
                to: [targetRow, col],
                direction: "down",
                value: board[targetRow][col],
              });
            }
          } else if (board[row][col] === board[row + 1][col]) {
            board[row + 1][col] = board[row][col] * 2;
            board[row][col] = 0;

            //storing postions for tiles' animations
            movement.push({
              from: [row, col],
              to: [row + 1, col],
              direction: "down",
              value: board[row + 1][col],
            });
          } else {
            board[row][col] = board[row][col];
          }
        }
      }
    }
  }

  //move tiles for up direction
  if (direction === "up") {
    for (let row = 1; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col] !== 0) {
          if (board[row - 1][col] === 0) {
            let targetRow = row - 1;
            while (targetRow > 0 && board[targetRow - 1][col] === 0) {
              targetRow--;
            }
            if (
              targetRow > 0 &&
              board[targetRow - 1][col] === board[row][col]
            ) {
              board[row - 1][col] = board[row][col] * 2;
              board[row][col] = 0;

              //storing position for tiles' animations
              movement.push({
                from: [row, col],
                to: [row - 1, col],
                direction: "up",
                value: board[row - 1][col],
              });

            } 
            else{ 
              
              board[targetRow][col] = board[row][col];
              board[row][col] = 0;
            
              //storing position for tiles' animations
              movement.push({
                from: [row, col],
                to: [targetRow, col],
                direction: "up",
                value: board[targetRow][col],
              });
            }


          } else if (board[row][col] === board[row - 1][col]) {
            board[row - 1][col] = board[row][col] * 2;
            board[row][col] = 0;

            //storing postion fir tiles' animations
            movement.push({
              from: [row, col],
              to: [row - 1, col],
              direction: "up",
              value: board[row - 1][col],
            }); 

          } else {
            board[row][col] = board[row][col];
          }
        }
      }
    }
  }

  //move tiles for left direction
  if (direction === "left") {
    for (let row = 0; row < 4; row++) {
      for (let col = 1; col < 4; col++) {
        if (board[row][col] !== 0) {
          if (board[row][col - 1] === 0) {
            let targetCol = col - 1;
            while (targetCol > 0 && board[row][targetCol - 1] === 0) {
              targetCol--;
            }
            if (board[row][targetCol - 1] === board[row][col]) {
              board[row][targetCol - 1] = board[row][col] * 2;
              board[row][col] = 0;

              //storing positions for tiles' animations
              movement.push({
                from: [row, col],
                to: [row, targetCol - 1],
                direction: "left",
                value: board[row][targetCol - 1],
              });

            } else {
              board[row][targetCol] = board[row][col];
              board[row][col] = 0;

              //storing positions for tiles' animations
              movement.push({
                from: [row, col],
                to: [row, targetCol],
                direction: "left",
                value: board[row][targetCol],
              });

            }
          } else if (board[row][col] === board[row][col - 1]) {
            board[row][col - 1] = board[row][col] * 2;
            board[row][col] = 0;

            //storing positions for tiles' animations
            movement.push({
              from: [row, col],
              to: [row, col - 1],
              direction: "left",
              value: board[row][col - 1],
            });

          } else {
            board[row][col] = board[row][col];
          }
        }
      }
    }
  }

  //move tiles for right direction
  if (direction === "right") {
    for (let row = 0; row < 4; row++) {
      for (let col = 2; col >= 0; col--) {
        if (board[row][col] !== 0) {
          if (board[row][col + 1] === 0) {
            let targetCol = col + 1;
            while (targetCol < 3 && board[row][targetCol + 1] === 0) {
              targetCol++;
            }
            if (board[row][col] === board[row][targetCol + 1]) {
              board[row][targetCol + 1] = board[row][col] * 2;
              board[row][col] = 0;

              // storing positions for tiles' animations
              movement.push({
                from: [row, col],
                to: [row, targetCol + 1],
                direction: "right",
                value: board[row][targetCol + 1],
              });

            } else {
              board[row][targetCol] = board[row][col];
              board[row][col] = 0;

              // storing positions for tiles' animations
              movement.push({
                from: [row, col],
                to: [row, targetCol],
                direction: "right",
                value: board[row][targetCol],
              });
            }
          } else if (board[row][col] === board[row][col + 1]) {
            board[row][col + 1] = board[row][col] * 2;
            board[row][col] = 0;

            // storing positions for tiles' animations
            movement.push({
              from: [row, col],
              to: [row, col + 1],
              direction: "right",
              value: board[row][col + 1],
            });
          } else {
            board[row][col] = board[row][col];
          }
        }
      }
    }
  }

  updateBoard();
}

//initialising an empty board
const board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

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
    while (board[Math.floor(randomTile/4)][randomTile%4] !==0){
      randomTile = Math.floor(Math.random() * 16);
    }
    board[Math.floor(randomTile/4)][randomTile%4] = Math.floor(Math.random() * 2) ===  0 ? 2: 4;

    updateBoard();
    
  });
}

window.onload = function () {
  startGame();
};

//updating the board values acc to the board array
//this function updates the tiles array not the
function updateBoard() {
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      let index = row * 4 + col;
      tiles[index].textContent = board[row][col] === 0 ? 0 : board[row][col];
      console.log(tiles[index]);

      //hiding tiles with content == 0
      if (board[row][col] === 0) {
        tiles[index].style.display = "none";
      } else {
        tiles[index].style.display = "block";
      }

      //changing the color of tiles based on their values
      if (board[row][col] === 2){
        tiles[index].style.backgroundColor = "#EEE4DA";
      } else if (board[row][col] === 4) {
        tiles[index].style.backgroundColor = "#EDE0C8";
      } else if (board[row][col] === 8) {
        tiles[index].style.backgroundColor = "#F2B179";
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
            while (targetRow < 3 && board[targetRow+1][col] === 0) {
              targetRow++;
            }
            if (targetRow>3 && board[targetRow+1][col] === board[row][col]){
                 
            board[targetRow+1][col] = board[row][col] * 2;
            board[row][col] = 0;
            }
            else {
                board[targetRow][col] = board[row][col];
                board[row][col] = 0;
            }
          } 
          else if(board[row][col] === board[row+1][col]){
            
            board[row+1][col] = board[row][col] * 2;
            board[row][col] = 0;
          }
          else {
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
            while (targetRow > 0 && board[targetRow-1][col] === 0) {
              targetRow--;
            }
            if (targetRow>0 && board[targetRow-1][col] === board[row][col]){
                 
            board[row-1][col] = board[row][col] * 2;
            board[row][col] = 0;
            }
           else
           board[targetRow][col] = board[row][col];
           board[row][col] = 0;
          }
          else if (board[row][col] === board[row -1][col]){
            
            board[row-1][col] = board[row][col] * 2;
            board[row][col] = 0;
          } 
          else {
            board[row][col] = board[row][col];
          }
        }
      }
    }
  }
  
  //move tiles for left direction
  if (direction === "left"){
    for (let row = 0; row < 4; row++){
        for (let col = 1; col < 4; col++){
            if (board[row][col] !==0){
                if (board[row][col-1] === 0){
                    let targetCol = col -1;
                    while (targetCol > 0 && board[row][targetCol-1] === 0){
                        targetCol--;
                    }
                    if (board[row][targetCol-1] === board[row][col]){
                        
                        board[row][targetCol-1] = board[row][col] * 2;
                        board[row][col] = 0;
                    }
                    else{
                        board[row][targetCol] = board[row][col];
                         board[row][col] = 0;
                    }

                    
                }
                else if (board[row][col] === board[row][col-1]){
                   
                    board[row][col-1] = board[row][col] * 2;
                    board[row][col] = 0;
                }
                else{
                    board[row][col] = board[row][col];
                }
            }
        }
    }
  }

  //move tiles for right direction
  if(direction === "right"){
    for (let row = 0; row < 4; row++){
        for (let col = 2; col >=0; col--){
            if (board[row][col] !==0){
                if (board[row][col+1] ===0){
                    let targetCol = col+1;
                    while (targetCol < 3 && board[row][targetCol+1] === 0){
                        targetCol++;
                    }
                    if (board[row][col] === board[row][targetCol+1]){
                    
                        board[row][targetCol+1] = board[row][col] * 2;
                        board[row][col] = 0;
                    } 
                    else{
                        board[row][targetCol] = board[row][col];
                        board[row][col] = 0;
                    }
                }
                else if (board[row][col] === board[row][col+1]){
                    
                    board[row][col+1] = board[row][col] * 2;
                    board[row][col] = 0;
                }
                else{
                    board[row][col] = board[row][col];
                }
            }
        }
    }
  }


  updateBoard();
}



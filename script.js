/* Variable Declarations */
const ROWS = 6;
const COLS = 7;
// Red Player: -1, Yellow Player: 1
let currentPlayer = Math.random() <= 0.5 ? -1 : 1;
let height = Array(COLS).fill(ROWS-1);
let button = document.getElementById("btn");
const board = [];

/* Function Declarations */
const setGame = () => {
    /* setting up the board array */
    for(let col = 0; col < COLS; col++){
        board.push([]);
    }
    /* setting the tiles */
    for(let row = 0; row < ROWS; row++){
        for(let col = 0; col < COLS; col++){
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.id = row.toString() + '-' + col.toString()
            tile.addEventListener('click', setTile);
            document.getElementById("board").appendChild(tile);
        }
    }
};

const setTile = (e) => {
    let column = e.target.id.split('-')[1];
    let row = height[column];
    if(row < 0){
        return;
    }
    /* updating the board array */
    board[column].push(currentPlayer);
    /* updating CSS */
    let color = currentPlayer === -1 ? "tile-red" : "tile-yellow";
    const tile = document.getElementById(row.toString() + "-" + column.toString());
    tile.classList.toggle(color);
    tile.removeEventListener('click', setTile);
    currentPlayer = currentPlayer * -1;
    height[column] = height[column] - 1;
    gameEnd(column);
};

const endGame = (player) => {

};

const changeWinner = (gameOver, player, column, verticalWin, row = 0) => {
    if(gameOver === true){
        const winner = document.getElementById("winner");
        winner.innerHTML = player === -1 ? "Red Wins!" : "Yello Wins!";
        if(verticalWin === true){
            for(let i = row; i < row + 4; i++){
                const tile = document.getElementById(i.toString() + '-' + column.toString());
                tile.classList.toggle('tile-win');
            }
        }
        else{
           for(let col = column; col < column + 4; col++){
                row = ROWS - board[col].length;
                const tile = document.getElementById(row.toString() + '-' + col.toString());
                tile.classList.toggle('tile-win');
           }
        }
        endGame(player); 
    }
};

const gameEnd = (col) => {
    /* checking vertical win */ 
    let gameOver = false;
    let player = board[col].at(-1); 
    const verticalLine = board[col].slice(-4);

    if(verticalLine.length === 4){
        gameOver = true;
        for(let i = 0; i < verticalLine.length; i++){
            if(verticalLine[i] !== verticalLine[0]){
                gameOver = false;
                break;
            }
        }
    }
    changeWinner(gameOver, player, col, true, height[col] + 1);
    
    /* checking horizontal win */
    for(let i = 0; i < 4; i++){
        player = board[i].at(-1);
        if(player === undefined){continue;}
        gameOver = true;

        for(let j = i + 1; j < i + 4; j++){
            let temp = board[j].at(-1);
            let difference = Math.abs(board[j].length - board[j-1].length);
            if(temp !== player || temp === undefined || difference > 1){
                gameOver = false;
                break;
            }   
        }

        changeWinner(gameOver, player, i, false);
    }
};

/* Function Calls */
window.addEventListener('load', setGame);
btn.addEventListener('click', () => location.reload());




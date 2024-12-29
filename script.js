/* Variable Declarations */
const ROWS = 6;
const COLS = 7;
let playerRed = "R"; // -1
let playerYellow = "Y"; // 1
let currentPlayer = Math.random() <= 0.5 ? -1 : 1;
let gameOver = false;
let height = Array(COLS).fill(ROWS-1);
let button = document.getElementById("btn");
const board = [];

/* Function Declarations */
const setGame = () => {
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
    let color = currentPlayer === -1 ? "tile-red" : "tile-yellow";
    const tile = document.getElementById(row.toString() + "-" + column.toString());
    tile.classList.toggle(color);
    tile.removeEventListener('click', setTile);
    currentPlayer = currentPlayer * -1;
    height[column] = height[column] - 1;
    gameEnd();
};

const gameEnd = (e) => {
    // checking vertical win

    // checking horizontal win
};

/* Function Calls */
window.addEventListener('load', setGame);
btn.addEventListener('click', () => location.reload());






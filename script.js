/* Variable Declarations */
const ROWS = 6;
const COLS = 7;
let playerRed = "R";
let playerYellow = "Y";
let currentPlayer = Math.random() <= 0.5 ? "R" : "Y";
let gameOver = false;

window.addEventListener('load', function(e){
    setGame();
});

const setGame = () => {
    for(let row = 0; row < ROWS; row++){
        for(let col = 0; col < COLS; col++){
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.id = row.toString() + '-' + col.toString()
            tile.onclick = setTile;
            document.getElementById("board").appendChild(tile);
        }
    }
};

const setTile = (e) => {
    if(currentPlayer === "R"){
        e.target.classList.toggle("tile-red");
        // disabling click for a clicked tile
        e.target.onclick = "";
        currentPlayer = "Y";
    } else if(currentPlayer === "Y"){
        e.target.classList.toggle("tile-yellow");
        // disabling click for a clicked tile
        e.target.onclick = "";
        currentPlayer = "R";
    }
};
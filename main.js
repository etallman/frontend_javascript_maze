'use strict';

//Create player, rows, and cells//
var mazeDiv = document.getElementById("maze");

function createPlayer() {
    let player = document.createElement('div');
    player.classList.add("playerClass");
    mazeDiv.appendChild(player);
    return player;
}

let player = createPlayer()

function createRow(rowData) {
    let row = document.createElement('div');
    row.classList.add("row");
    mazeDiv.appendChild(row);
    rowData.split("").forEach(element => {
        let type
        if (element == "W") {
            type = "wall"
        } else if (element == "S") {
            type = "start"
        } else if (element == "F") {
            type = "finish"
        }
        createCell(row, type)
    });;
}

function createCell(parent, type) {
    let cell = document.createElement('div');
    cell.classList.add("cell", type);
    parent.appendChild(cell);
}


const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

//Create according to array//
map.forEach(createRow)

//Define initial player position//
const playerSize = 40;
const playerPosition = {
    x: 0,
    y: 9
}

//Check for win//
function checkWin() {
    if (map[playerPosition.y][playerPosition.x] == "F") {
        document.getElementById("winMessage").style.display = "block"
        player.classList.add("playerGameEnd");;
    }
}

//Move player on board along X and Y axis//
function movePlayer() {
    player.style.top = playerPosition.y * playerSize + "px";
    player.style.left = playerPosition.x * playerSize + "px";
}
movePlayer();

document.addEventListener('keydown', (event) => {

    const keyName = event.key;

    if (keyName == "ArrowDown") {
        if (map[playerPosition.y + 1][playerPosition.x] != "W" && playerPosition.y !== map.length - 1) {
            playerPosition.y++
        }
    }
    if (keyName == "ArrowUp") {
        if (map[playerPosition.y - 1][playerPosition.x] != "W" && playerPosition.y !== 0) {
            playerPosition.y--
        }
    }
    if (keyName == "ArrowLeft") {
        if (map[playerPosition.y][playerPosition.x - 1] != "W" && playerPosition.x !== 0) {
            playerPosition.x--
        }
    }
    if (keyName == "ArrowRight") {
        if (map[playerPosition.y][playerPosition.x + 1] != "W" && playerPosition.x !== map[0].length - 1) {
            playerPosition.x++
        }
    }
    movePlayer();
    checkWin();
});

//Restart the Game//
startButton.onclick = function () {
    location.reload()
}
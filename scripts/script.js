let positionX;
let positionY;
let carrotPositionX;
let carrotPositionY;
let rabbitPositionX;
let rabbitPositionY;
let position;
let points = 0;
let tagline;
let counter = 0;
const max = 5;
const min = 1;
let beer = document.getElementById("beer");
let url = "https://api.punkapi.com/v2/beers/random";

let pic = document.getElementById("mainpicture");
let carrot = document.getElementById("carrot");
let rabbit = document.getElementById("rabbit");
startPosition();

function getBeer() {
    fetch(url)
        .then(function (response) { return response.json() })
        .then(function (data) {
            let beers = data;
            beers.map(function (mybeer) {
                let name = mybeer.name;
                let tag = mybeer.tagline;
                let description = mybeer.brewers_tips;
                beer = document.getElementById("beer");
                beer.innerHTML = name + "<br>" + tag + "<br>" + description + "<br><br>";
            })
        })
}

let up = document.getElementById("up");
up.addEventListener("click", moveUp);
let down = document.getElementById("down");
down.addEventListener("click", moveDown);
let left = document.getElementById("left");
left.addEventListener("click", moveLeft);
let right = document.getElementById("right");
right.addEventListener("click", moveRight);
let restart = document.getElementById("restart");
restart.addEventListener("click", startOver);

drawPlayerGrid(positionX, positionY);

function printPosition(positionX, positionY, direction) {
    document.getElementById("position").innerHTML = "<br>(" + positionX + " , " + positionY + ")" + direction + "<br>";
    document.getElementById("points").innerHTML = points + " poäng <br><br>";
    drawPlayerGrid(positionX, positionY);
}

function drawPlayerGrid(positionX, positionY) {
    let playerGrid = document.getElementById("playerGrid");
    playerGrid.innerHTML = "";
    for (let i = 1; i <= max; i++) {
        for (let j = 1; j <= max; j++) {
            if (positionX === j && positionY === i) {
                let cell = document.createElement("div");
                cell.innerHTML = "X";
                playerGrid.appendChild(cell);
            }
            else {

                cell = document.createElement("div");
                cell.innerHTML = "*";
                playerGrid.appendChild(cell);
            }
        }
    }
}

function randomizeNumber() {
    return Math.floor(Math.random() * max) + min;
}

function startPosition() {
    tagline = " - Leta reda på moroten passa dig för kaninen!";
    positionX = randomizeNumber();
    positionY = randomizeNumber();
    carrotPosition();
    rabbitPosition();
    printPosition(positionX, positionY, tagline);
}

function startOver() {
    points = 0;
    tagline = " Starta";
    pic.setAttribute("src", "/images/rabbitandcarrot.gif");
    printPosition(positionX, positionY, tagline);
    startPosition();
}

function showBackground(positionX, positionY) {
    pic.setAttribute("src", "/images/" + positionX + positionY + ".jpg");
}

function rabbitPosition() {
    if (counter === 0) {
        rabbitPositionX = randomizeNumber();
        rabbitPositionY = randomizeNumber();
    }
    if (counter % 2 === 0) {
        if (rabbitPositionX < max && rabbitPositionY < max) {
            rabbitPositionX++;
            rabbitPositionY++;
        }
        else if (rabbitPositionX > min && rabbitPositionY > min)
        {
            rabbitPositionX--;
            rabbitPositionY--;
        }
        else if (rabbitPositionX === max || rabbitPositionY === max)
        {
            rabbitPositionX = min;
            rabbitPositionY = min;
        }
        else if(rabbitPositionX === min || rabbitPositionY === min)
        {
            rabbitPositionX = max;
            rabbitPositionY = max;
        }
        else if(rabbitPositionY > min)
        {
            rabbitPositionY--;
        }
        else if(rabbitPositionY < max){
            rabbitPositionY++;
        }
    }
}


function carrotPosition() {
    carrotPositionX = randomizeNumber();
    carrotPositionY = randomizeNumber();
}


function checkPositions() {
    counter++;
    console.log(counter);
    if (positionX === carrotPositionX && positionY === carrotPositionY) {
        points += 50;
        tagline = " - Du hittade en morot! " + points + " poäng";
        getBeer();
        carrot.setAttribute("class", "visible carrot");
        carrotPosition();
    }
    else if (positionX === rabbitPositionX && positionY === rabbitPositionY) {
        points -= 20;
        tagline = " - Ånej, kaninen fångade dig! " + points + " poäng";
        rabbit.setAttribute("class", "visible rabbit");
    }
    else {
        tagline = "";
        carrot.setAttribute("class", "hidden carrot");
        rabbit.setAttribute("class", "hidden rabbit");
    }
    if (positionX === rabbitPositionX && ((positionY - 1) === rabbitPositionY)
    || (positionX === rabbitPositionX && ((positionY + 1) === rabbitPositionY))
    || ((positionX - 1) === rabbitPositionX) && (positionY === rabbitPositionY)
    || ((positionX + 1) === rabbitPositionX && (positionY === rabbitPositionY))) {
        tagline += " Kaninen är nära dig...";
    }
    rabbitPosition();
    beer.innerHTML = "";
    showBackground(positionX, positionY);
    printPosition(positionX, positionY, tagline);
}


function moveUp() {
    if (positionY > min) {
        positionY--;
        checkPositions();
    }
    else {
        tagline = " - Du kan inte komma mer norrut";
    }
    printPosition(positionX, positionY, tagline);
}

function moveDown() {
    if (positionY < max) {
        positionY++;
        checkPositions();
    }
    else {
        tagline = " - Du kan inte komma mer söderut";
    }
    printPosition(positionX, positionY, tagline);
}

function moveLeft() {
    if (positionX > min) {
        positionX--;
        checkPositions();
    }
    else {
        tagline = " - Du kan inte komma mer västerut"
    }
    printPosition(positionX, positionY, tagline);
}

function moveRight() {
    if (positionX < max) {
        positionX++;
        checkPositions();
    }
    else {
        tagline = " - Du kan inte komma mer österut"
    }
    printPosition(positionX, positionY, tagline);
}
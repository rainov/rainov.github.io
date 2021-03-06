const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

canvas.width = 672;
canvas.height = 744;

var startGame = true; //Shows the gameStart screen and changes the space button behavior.
var unit = 48; //The default size unit
var death = false; //In case of death, this stops refreshing of the screen for a second
var objSpeed = 1; //Controls the speed of all objects, except the frog and the timer, increases on leveleUp
var lifes = 3;
var score = 0; //This adds up to 5, when the frog reaches a leaf, and then resets to 0 for the new level.
var gameOver = false; //After all lifes are lost, this goes true and changes the behavior of the space button and shows the gameOver screen.
var ride = false; //This resets to false every time when the frog moves. Its true only with collision with turtles or logs and controls the death from river.
var levelUp = false; //Upon saving all 5 frogs, this shows up the levelUp screen and changes the behavior of the space button.
var points = 0; //The current points displayed on the screen.
var pointsLevel = 740; //This is diminnishing when the frog moves up. Prevents accumulating points for going back and forward.
var hightScore = 0; //HighScore for the current game, not displayed. Its used only to measure the saved highScore in local storage
if (JSON.parse(window.localStorage.getItem('froggerHighScore'))) {
var savedHighScore = JSON.parse(window.localStorage.getItem('froggerHighScore')); //Alltime highscore.. thats the one displayed on the screen.
} else {
    var savedHighScore = 0;
};

//Game screens
var startScreen = new Image() ;
startScreen.src = './sprites/startScreen.png'
var gameOverImage = new Image();
gameOverImage.src = './sprites/gameOver.png';
var levelUpImage = new Image();
levelUpImage.src = './sprites/levelUp.png';

//Car images
var carRow1 = new Image();
carRow1.src = './sprites/carRow1.png';
var carRow2 = new Image();
carRow2.src = './sprites/carRow2.png';
var carRow3 = new Image();
carRow3.src = './sprites/carRow3.png';
var raceCar = new Image();
raceCar.src = './sprites/raceCar.png';
var truck = new Image();
truck.src = './sprites/truck.png';

//Frog images
var frogImage = new Image();
frogImage.src = './sprites/myfrog.png';
var frogUpImage = new Image();
frogUpImage.src = './sprites/myfrogUp.png';
var frogLeftImage = new Image();
frogLeftImage.src = './sprites/myfrogLeft.png';
var frogLeft = new Image();
frogLeft.src = './sprites/frogLeft.png';
var frogRightImage = new Image();
frogRightImage.src = './sprites/myfrogRight.png';
var frogRight = new Image();
frogRight.src = './sprites/frogRight.png';
var frogDownImage = new Image();
frogDownImage.src = './sprites/myfrogDown.png';
var frogDown = new Image();
frogDown.src = './sprites/frogDown.png';

//Frog states
var frogDeath = new Image();
frogDeath.src = './sprites/death.png';
var frogSplash = new Image();
frogSplash.src = './sprites/frogSplash.png';
var scoreStar = new Image();
scoreStar.src = './sprites/score.png';
var life = new Image();
life.src = './sprites/life.png';

//Score images
var scoreLeaf = new Image();
scoreLeaf.src = './sprites/scoreLeaf.png';
var scoreFrog = new Image();
scoreFrog.src = './sprites/scoreFrog.png';
var fly = new Image();
fly.src = './sprites/fly.png';

//Turtle images
var turtlesImage = new Image();
turtlesImage.src = './sprites/turtle1.png'
var turtlesImage2 = new Image();
turtlesImage2.src = './sprites/turtle2.png'
var turtlesImage3 = new Image();
turtlesImage3.src = './sprites/turtle3.png'
var turtlesImage4 = new Image();
turtlesImage4.src = './sprites/turtle4.png'
var turtlesRight = new Image();
turtlesRight.src = './sprites/turtleRight1.png'
var turtlesRight2 = new Image();
turtlesRight2.src = './sprites/turtleRight2.png'
var turtlesRight3 = new Image();
turtlesRight3.src = './sprites/turtleRight3.png'
var turtlesRight4 = new Image();
turtlesRight4.src = './sprites/turtleRight4.png'
var turtlesSunk1 = new Image();
turtlesSunk1.src = './sprites/turtle3sunk1.png'
var turtlesSunk2 = new Image();
turtlesSunk2.src = './sprites/turtle3sunk2.png'
var turtlesSunk3 = new Image();
turtlesSunk3.src = './sprites/turtle3sunk3.png'
var turtlesSunk4 = new Image();
turtlesSunk4.src = './sprites/turtle3sunk4.png'
var turtles2Sunk1 = new Image();
turtles2Sunk1.src = './sprites/turtle2sunk1.png'
var turtles2Sunk2 = new Image();
turtles2Sunk2.src = './sprites/turtle2sunk2.png'
var turtles2Sunk3 = new Image();
turtles2Sunk3.src = './sprites/turtle2sunk3.png'
var turtles2Sunk4 = new Image();
turtles2Sunk4.src = './sprites/turtle2sunk4.png'

//Log images
var log3 = new Image();
log3.src = './sprites/tree3.png'
var log4 = new Image();
log4.src = './sprites/tree4.png'



class GlobalObject {
    constructor(x, y, speed, length, image) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.length = length;
        this.image = image;
    }

    draw() {
        context.drawImage(this.image, this.x, this.y);
    };
}

class Car extends GlobalObject {
    constructor(x, y, speed, length, image) {
        super(x, y, speed, length, image) ;
    };

    move(deltaTime) {
        this.x = this.x + ( this.speed  * deltaTime / 1000 ) * objSpeed ;
        this.distance = this.x - unit * 2;
    };

    //Collision detection with the frog
    crash(frog) {
        this.bottom = this.y + unit;
        this.right = this.x + unit * this.length;
        if (this.x <= frog.x + unit &&
            this.right >= frog.x &&
            this.bottom - 1 >= frog.y &&
            this.y <= frog.y + unit - 1) {
            frog.image = frogDeath;
            death = true;
            lifes--;
            lifeArray.splice(lifeArray[lifeArray.length], 1);
            setTimeout(() => {
                frog.reset();
            }, 1000);
        };
    };

    //The cars appear on random place everytime when they get off screen... this function prevents overlapping
    // and allways puts the cars in the correct order as they are in the array. 
    replace(carsArr) {
        if (this.x > canvas.width && this.speed > 0 || this.right < 0 && this.speed < 0) {
            if (this.speed > 0 && this.x == carsArr[0].x) {
                if (carsArr[2].distance > 0) {
                    this.x = -unit * Math.ceil(Math.random() * 8);
                } else {
                    this.x = carsArr[2].distance - unit * Math.ceil(Math.random() * 8);
                };
            };
            if (this.speed < 0 && this.x == carsArr[0].x) {
                if (carsArr[2].right < canvas.width) {
                    this.x = canvas.width + unit * Math.ceil(Math.random() * 8);
                } else {
                    this.x = carsArr[2].right + unit * Math.ceil(Math.random() * 8);
                };
            };
            if (this.speed > 0 && this.x == carsArr[1].x) {
                if (carsArr[0].distance > 0) {
                    this.x = -unit * Math.ceil(Math.random() * 8);
                } else {
                    this.x = carsArr[0].distance - unit * Math.ceil(Math.random() * 8);
                };
            };
            if (this.speed < 0 && this.x == carsArr[1].x) {
                if (carsArr[0].right < canvas.width) {
                    this.x = canvas.width + unit * Math.ceil(Math.random() * 8);
                } else {
                    this.x = carsArr[0].right + unit * Math.ceil(Math.random() * 8);
                };
            };
            if (this.speed > 0 && this.x == carsArr[2].x) {
                if (carsArr[1].distance > 0) {
                    this.x = -unit * Math.ceil(Math.random() * 8);
                } else {
                    this.x = carsArr[1].distance - unit * Math.ceil(Math.random() * 8);
                };
            };
            if (this.speed < 0 && this.x == carsArr[2].x) {
                if (carsArr[1].right < canvas.width) {
                    this.x = canvas.width + unit * Math.ceil(Math.random() * 8);
                } else {
                    this.x = carsArr[1].right + unit * Math.ceil(Math.random() * 8);
                };
            };
        };
    };
};


    
class RiverObjects extends GlobalObject {
    constructor(x, y, speed, length, image) {
        super(x, y, speed, length, image) ;
    };

    draw() {
        context.drawImage(this.image, this.x, this.y);
    };

    //There is a GlobalObject variable named 'ride'... this functions sets it to true, if there is 
    //collision with the frog. Also disables the ride function if the frog stays 
    //near the screen end, so it sunks if the turtles or logs go over the screen.
    carry(frog, deltaTime) {
        this.bottom = this.y + unit;
        this.right = this.x + unit * this.length;
        if (this.safe && this.x + 20 <= frog.x + unit &&
            this.right - 20 >= frog.x &&
            this.bottom - 1 >= frog.y &&
            this.y <= frog.y + unit - 1) {
                frog.x = frog.x + ( this.speed  * deltaTime / 1000 ) * objSpeed ;
                ride = true;
                if (frog.x <= 0) {
                    frog.x = 0;
                };
                if (frog.x + unit >= this.right - unit && frog.x == 0) {
                    setTimeout(() => {
                        ride = false;
                    }, 900);
                };
        };
    };

};


//Random set of turtles is sunking each time. This is the controller function for that.
function sunk( array1, array2 ) {
    setTimeout( () => {
        array1[ Math.floor(Math.random() * 3) ].sunk = true ;
        setTimeout( () => {
            array2[ Math.floor(Math.random() * 3) ].sunk = true ;
        }, 1000 ) ;
    }, 1000 ) ;
} ;
//Timer for the sunk controller. It ensures that the first 2 sets of turtles have finished the sunk move, before it starts new.
function diveTimer() {
    setInterval(() => {
        sunk( turtleArray, turtleArray2) ;
    }, 6000 );
};

//Ninja turtles
class Turtles extends RiverObjects{
    constructor(x, y, speed, length, image) {
        super(x, y, speed, length, image) ;
        this.sunk = false; //When true, starts the sunk animation.
        this.safe = true; //Goes false when the turtles are submurged... The frog doesnt get ride status.
        this.sunkStart = false; //Controls the sunk animation.
        this.startMove = false; //Controls the swim animation.
    };

    //Controls animation and behaviour of the sunking
    sunking() {
        if ( this.sunk && !this.sunkStart ) {
            if (this.length > 2) {
                this.image = turtlesSunk1;
            } else {
                this.image = turtles2Sunk1;
            };
            this.sunkStart = true;
            setTimeout(() => {
                if (this.length > 2) {
                    this.image = turtlesSunk2;
                } else {
                    this.image = turtles2Sunk2;
                };
                setTimeout(() => {
                    if (this.length > 2) {
                        this.image = turtlesSunk3;
                    } else {
                        this.image = turtles2Sunk3;
                    };
                    setTimeout(() => {
                        if (this.length > 2) {
                            this.image = turtlesSunk4;
                        } else {
                            this.image = turtles2Sunk4;
                        };
                        this.safe = false;
                        ride = false; //The frog dies at this point
                        setTimeout(() => {
                            if (this.length > 2) {
                                this.image = turtlesSunk3;
                            } else {
                                this.image = turtles2Sunk3;
                            };
                            this.safe = true;
                            setTimeout(() => {
                                if (this.length > 2) {
                                    this.image = turtlesSunk2;
                                } else {
                                    this.image = turtles2Sunk2;
                                };
                                setTimeout(() => {
                                    if (this.length > 2) {
                                        this.image = turtlesSunk1;
                                    } else {
                                        this.image = turtles2Sunk1;
                                    };
                                    this.sunk = false; //Normal swim animation can start again.
                                    this.sunkStart = false;
                                }, 400);
                            }, 400);
                        }, 1500);
                    }, 1000);
                }, 400);
            }, 400);
        };
    };
    
    //Movement to the left and also controls the animation based on state
    move(deltaTime) {
        this.right = this.x + this.length * unit;
        this.x = this.x + ( this.speed  * deltaTime / 1000 ) * objSpeed ;
        if (this.right <= -unit) {
            this.x = canvas.width;
        } ;
        if ( !this.sunk && !this.startMove) {
            this.swim() ; //If not in a state of sunking, normal swim animation is used.
        } ;
    };

    //Controls the animation while normal swimming
    swim() {
        if (this.length < 3 && !this.sunk) {
            this.image = turtlesRight2;
        } else if (this.length == 3 && !this.sunk) {
            this.image = turtlesImage2;
        };
        this.startMove = true ;
        setTimeout(() => {
            if (this.length < 3 && !this.sunk) {
                this.image = turtlesRight3;
            } else if (this.length == 3 && !this.sunk) {
                this.image = turtlesImage3;
            };
            setTimeout(() => {
                if (this.length < 3 && !this.sunk) {
                    this.image = turtlesRight4;
                } else if (this.length == 3 && !this.sunk) {
                    this.image = turtlesImage4;
                };
                setTimeout(() => {
                    if (this.length < 3 && !this.sunk) {
                        this.image = turtlesRight3;
                    } else if (this.length == 3 && !this.sunk) {
                        this.image = turtlesImage3;
                    };
                    setTimeout(() => {
                        if (this.length < 3 && !this.sunk) {
                            this.image = turtlesRight2;
                        } else if (this.length == 3 && !this.sunk) {
                            this.image = turtlesImage2;
                        };
                        setTimeout(() => {
                            if (this.length < 3 && !this.sunk) {
                                this.image = turtlesRight;
                            } else if (this.length == 3 && !this.sunk) {
                                this.image = turtlesImage;
                            };
                            setTimeout( () => {
                                this.startMove = false ;
                            }, 1000);
                        }, 300);
                    }, 300);
                }, 300);
            }, 300);
        }, 300);
    };
};
//End of Ninja Turtles


class Log extends RiverObjects {
    constructor(x, y, speed, length, image) {
        super(x, y, speed, length, image) ;
        this.safe = true;
    };

    //Movement to the right
    swim(deltaTime) {
        this.right = this.x + this.length * unit;
        this.x = this.x + ( this.speed  * deltaTime / 1000 ) * objSpeed ;
        if (this.x >= canvas.width) {
            this.x = 0 - unit * this.length;
        };
    };
};



class Timer extends GlobalObject {
    constructor(x, y, speed, length, color) {
        super(x, y, speed, length) ;
        this.color = color;
    }

    draw() {
        context.beginPath();
        context.rect(this.x, this.y, unit * this.length, 30);
        context.fillStyle = this.color;
        context.fill();
        context.lineWidth = 1;
        context.stroke();
    };

    //This controls the animation of the timer and the behaviour of the frog image
    //if the time goes off
    diminish() {
        this.length = this.length - this.speed;
        if (this.length < 0) {
            this.length = 0;
            this.speed = 0;
            frog.image = frogDeath;
            death = true;
            lifes--;
            lifeArray.splice(lifeArray[lifeArray.length], 1);
            setTimeout(() => {
                frog.reset();
            }, 1000);
        } ;
        if ( lifes < 0 || score == 5 || startGame ) {
            this.length = 0 ;
            this.speed = 0 ;
        } ;
    } ;
} ;


class SimpleGlobalObject {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
    };

    draw() {
        context.drawImage(this.image, this.x, this.y);
    };
}


class Frog extends SimpleGlobalObject{
    constructor(x, y, image) {
        super(x, y, image);
    };

    //When the frog gets to the level of the river, this function detects water collision,
    // based on the ride variable.
    drawn() {
    if (this.y < canvas.height - unit * 8 && !ride && this.y > canvas.height - unit * 14 - 1) {
        frog.image = frogSplash;
        lifes--;
        lifeArray.splice(lifeArray[lifeArray.length], 1);
        death = true;
            setTimeout(() => {
                this.reset();
            }, 1000);
        };
    };
    
    //If the frog dies or reaches the safe area at the end, this function
    //repositions the it, resets the timer and start refreshing the screen again.
    reset() {
        timer.length = 9;
        timer.speed = 0.004;
        this.x = unit * 7;
        this.y = canvas.height - unit * 2;
        this.image = frogImage;
        death = false;
        lastTimeStamp = lastTimeStamp + 1000 ;
        window.requestAnimationFrame(refreshScreen);
    };

    //All the movements are setting the ride variable to false, so if it jumps from a log or turtle
    //and not land on a safe zone, its drawning in the river.
    //The move up key also adds points based on the current reached level. Going back and forward does not award points.
    //Only if you reach vertical level that you havent been before.
    moveUp() {
        ride = false
        this.x = this.x;
        this.y = this.y - unit;
        if (pointsLevel > this.y) {
            pointsLevel = this.y;
            points += 10;
            if (hightScore < points) {
                hightScore = points;
                if (savedHighScore < hightScore) {
                window.localStorage.setItem('froggerHighScore', JSON.stringify(hightScore));
                };
            }
        } else {
            pointsLevel = pointsLevel;
        };
    };
    moveDown() {
        this.bottom = this.y + unit;
        if (this.bottom >= canvas.height - unit) {
            this.y = canvas.height - unit * 2;
        } else {
            ride = false;
            this.x = this.x;
            this.y = this.y + unit;
        };
    };
    moveRight() {
        this.right = this.x + unit;
        if (this.right >= canvas.width) {
            this.x = this.x;
        } else {
            ride = false;
            this.y = this.y
            this.x = this.x + unit;
        };
    };
    moveLeft() {
        if (this.x <= 0) {
            this.x = 0;
        } else {
            ride = false;
            this.y = this.y;
            this.x = this.x - unit;
        };
    };
};


//The life icons on the bottom
class Life extends SimpleGlobalObject{
    constructor(x, y, image) {
        super(x, y, image);
    };
};


//There are 3 different game screens showed based on game states
class GameScreen extends SimpleGlobalObject{
    constructor(x, y, image) {
        super(x, y, image);
    };

    startGame() {
        if ( startGame ) {
            this.x = 0 ;
        } else {
            this.x = -unit * 14 ;
        } ;
    };

    gameEnd() {
        if ( lifes < 0 ) {
            //console.log(JSON.parse(window.localStorage.getItem('froggerHighScore')));
            gameOver = true;
            setTimeout( () => {
                this.x = 0 ;
            }, 500 ) ;
         } else {
             this.x = -unit * 14 ;
         };
    };

    levelUp() {
        if ( score == 5 ) {
            levelUp = true ;   
            pointsLevel = 740;
            setTimeout( () => {
                this.x = 0 ;
            }, 500 ) ;
         } else {
             this.x = -unit * 14 ;
         };
    };
};


//This function controls the bonusFlys that appear on the score leafs.
function appear(array) {
    let bonusFly = array[Math.floor(Math.random() * 5)];
    bonusFly.bonus = true ;
    setTimeout(() => {
        bonusFly.bonus = false;
        setTimeout(() => {
            appear(array);
        }, 3000);
    }, 4000);
};


//The lilly pads at the end
class LillyPads extends SimpleGlobalObject{
    constructor(x, y, image) {
        super(x, y, image);
        this.safe = true; //This goes false when there is a saved frog on the lilly. Next jump on that leaf will be deadly.
        this.bonus = false; //This is randomly set to true from the appear function. If its true and the lilly is safe, a bonusFly appears.
    };

    //This contols the flys in a way that they dont appear on a lilly pad with a safed frog.
    bonusFly() {
        if (this.bonus && this.safe ) {
            this.image = fly ;
        } else if ( this.image == scoreFrog ) {
            this.image = scoreFrog ;
        }
         else {
            this.image = scoreLeaf ;
        };
    };

    //This function controls the points award and the images on the lilly pads.
    //Shows a happy frog if the lilly is used.
    //Also resets the frog to start position.
    score(frog) {
        this.right = this.x + unit;
        this.bottom = this.y + unit;
        if (this.x + 20 <= frog.x + unit &&
            this.right - 20 >= frog.x &&
            this.bottom - 1 >= frog.y &&
            this.y <= frog.y + unit - 1) {
            if (this.safe) {
                frog.image = scoreStar;
                ride = true;
                if(this.image == fly) {
                    points += 100 ;
                } else {
                    points += 50;
                };
                this.safe = false;
                this.image = scoreFrog;
                if (hightScore < points) {
                    hightScore = points;
                    if (savedHighScore < hightScore) {
                        window.localStorage.setItem('froggerHighScore', JSON.stringify(hightScore));
                    };
                };
                death = true;
                score++ ;
                pointsLevel = 740;
                setTimeout(() => {
                    frog.reset();
                }, 1000);
            };
        };
    };

    draw() {
        context.drawImage(this.image, this.x, this.y);
    };
};



var frog = new Frog(unit * 7, canvas.height - unit * 2, frogImage);
var timer = new Timer(unit * 2 - 15, canvas.height - 37, 0.004, 9,'yellow');

//the gameScreens are loaded and wait off screen.
var start = new GameScreen( -unit * 14, 0, startScreen ) ;
var over = new GameScreen( -unit * 14, 0, gameOverImage ) ;
var next = new GameScreen( -unit * 14, 0, levelUpImage ) ;

//The lilly pads
var lillyPads = [new LillyPads(unit - 20, unit + 15, scoreLeaf)];
for (let i = 0; i < 4; i++) {
    lillyPads.push(new LillyPads(lillyPads[i].x + 138, unit + 15, scoreLeaf));
};

var lifeArray = [] ;
var firstRowCars = [] ;
var secondRowCars = [] ;
var thirdRowCars = [] ;
var raceCarRow = [] ;
var trucksRow = [] ;
var turtleArray = [] ;
var turtleArray2 = [] ;
var logsArray = [] ;
var logsArray2 = [] ;
var logsArray3 = [] ;
for (let i = 0; i < 3; i++) {
    firstRowCars.push(new Car( unit + ( i * unit * 6), canvas.height - unit * 3, -0.5 * unit, 1, carRow1));    
    secondRowCars.push(new Car(canvas.width - unit - ( i * unit *  6), canvas.height - unit * 4, 0.7 * unit, 1, carRow2));    
    thirdRowCars.push(new Car( unit*2 + ( i * unit * 5), canvas.height - unit * 5, -1 * unit, 1, carRow3));  
    raceCarRow.push(new Car(canvas.width - ( 2 * unit ) - ( i * unit *  5), canvas.height - unit * 6, 1.4 * unit, 1, raceCar));   
    trucksRow.push(new Car( unit*2 + ( i * unit * 5), canvas.height - unit * 7, -1.4 * unit, 2, truck));     
    lifeArray.push(new Life(unit * (11 + i), canvas.height - unit + 10, life)); 
    turtleArray.push(new Turtles(  unit * 2 + ( i * unit * 6), canvas.height - unit * 9, -1 * unit, 3, turtlesImage));      
    turtleArray2.push(new Turtles(  unit * 2 + ( i * 6 * unit), canvas.height - unit * 12, -1.5 * unit, 2, turtlesRight));    
    logsArray.push(new Log(canvas.width - ( 2 * unit ) - ( i * unit * 5.7), canvas.height - unit * 10, 1 * unit, 3, log3));   
    logsArray2.push(new Log(canvas.width - ( 2 * unit ) - ( i * unit * 6), canvas.height - unit * 11, 1.6 * unit, 4, log4));
    logsArray3.push(new Log(canvas.width - ( 2 * unit ) - ( i * unit * 5.7), canvas.height - unit * 13, 1.9 * unit, 3, log3)); 
}



let lastTimeStamp = 0 ;
function refreshScreen(timeStamp) {

    let deltaTime = timeStamp - lastTimeStamp ;
    lastTimeStamp = timeStamp ;

    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < firstRowCars.length; i++) {
        firstRowCars[i].move(deltaTime);
        firstRowCars[i].draw();
        firstRowCars[i].replace(firstRowCars);
        firstRowCars[i].crash(frog);
        secondRowCars[i].move(deltaTime);
        secondRowCars[i].draw();
        secondRowCars[i].replace(secondRowCars);
        secondRowCars[i].crash(frog);
        thirdRowCars[i].move(deltaTime);
        thirdRowCars[i].draw();
        thirdRowCars[i].replace(thirdRowCars);
        thirdRowCars[i].crash(frog);
        raceCarRow[i].move(deltaTime);
        raceCarRow[i].draw();
        raceCarRow[i].replace(raceCarRow);
        raceCarRow[i].crash(frog);
        trucksRow[i].move(deltaTime);
        trucksRow[i].draw();
        trucksRow[i].replace(trucksRow);
        trucksRow[i].crash(frog);
        turtleArray[i].move(deltaTime);
        turtleArray[i].draw();
        turtleArray[i].carry(frog, deltaTime);
        turtleArray[i].sunking();
        turtleArray2[i].move(deltaTime);
        turtleArray2[i].draw();
        turtleArray2[i].carry(frog, deltaTime);
        turtleArray2[i].sunking();
        logsArray[i].swim(deltaTime);
        logsArray[i].draw();
        logsArray[i].carry(frog, deltaTime);
        logsArray2[i].swim(deltaTime);
        logsArray2[i].draw();
        logsArray2[i].carry(frog, deltaTime);
        logsArray3[i].swim(deltaTime); 
        logsArray3[i].draw();
        logsArray3[i].carry(frog, deltaTime); 
    };
    
    for (let i = 0; i < lillyPads.length; i++) {
        lillyPads[i].draw();
        lillyPads[i].score(frog);
        lillyPads[i].bonusFly();
    };

    for (let i = 0; i < lifeArray.length; i++) {
        lifeArray[i].draw();
    };

    context.font = '28pt Calibri';
    context.fillStyle = 'white';
    context.fillText(points, unit * 2 + 10, 32);
    if (JSON.parse(window.localStorage.getItem('froggerHighScore'))) {
        context.fillText(JSON.parse(window.localStorage.getItem('froggerHighScore')), unit * 8 + 20, 32);
    } else {
        context.fillText(hightScore, unit * 8 + 20, 32);
    }
    
    timer.diminish();
    timer.draw();
    frog.drawn();
    frog.draw();
    start.startGame();
    start.draw();
    next.levelUp();
    next.draw();
    over.gameEnd();
    over.draw();
    
    if (!death) {
        window.requestAnimationFrame(refreshScreen);
    };
};

window.requestAnimationFrame(refreshScreen);
appear(lillyPads);
diveTimer();


//The controls of the game based on 4 different states.
window.addEventListener('keydown', function (event) {
    if (!gameOver && !levelUp && !startGame ) {
        switch (event.keyCode) {
            case 37:
                frog.moveLeft();
                frog.image = frogLeftImage;
                setTimeout(() => {
                    frog.image = frogLeft;
                }, 74);
                break;
            case 38:
                frog.moveUp();
                frog.image = frogUpImage;
                setTimeout(() => {
                    frog.image = frogImage;
                }, 74);
                break;
            case 39:
                frog.moveRight();
                frog.image = frogRightImage;
                setTimeout(() => {
                    frog.image = frogRight;
                }, 74);
                break;
            case 40:
                frog.moveDown();
                frog.image = frogDownImage;
                setTimeout(() => {
                    frog.image = frogDown;
                }, 74);
                break;
        };
    } else if (levelUp) {
        switch (event.keyCode) {
            case 32:
                for (let i = 0; i < lillyPads.length; i++) {
                    lillyPads[i].image = scoreLeaf;
                    lillyPads[i].safe = true;
                };
                levelUp = false;
                objSpeed += 0.5;
                score = 0;
                timer.length = 9 ;
                timer.speed = 0.004;
                break;
        }
    } else if ( startGame ) {
        switch (event.keyCode) {
            case 32: 
                startGame = false;
                    timer.length = 9;
                    timer.speed = 0.004;
                break;
        };
    } else {
        switch (event.keyCode) {
            case 32:
                lifes = 3;
                gameOver = false;
                points = 0;
                score = 0;
                pointsLevel = 740;
                objSpeed = 1 ;
                    timer.length = 9 ;
                    timer.speed = 0.004 ;
                for (let i = 0; i < 3; i++) {
                    lifeArray.push(new Life(unit * (11 + i), canvas.height - unit + 10, life));
                };
                for (let i = 0; i < lillyPads.length; i++) {
                    lillyPads[i].image = scoreLeaf;
                    lillyPads[i].safe = true;
                };
                break;
        };
    };
});
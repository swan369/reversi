let player = "O";
let opponent = "X"; //computer is black
let whiteScore = 2;
let blackScore = 2;
let whiteNameTurn = false;
let mode = "";
let username = false;
let ENDGAME = false;
let whiteName = "";
let blackName = "";
let jackpot = false;
let playing = false;

let grid = [
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "O", "X", "", "", ""],
  ["", "", "", "X", "O", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
];

const anyMoreMoves = (valid) => {
  let isValid = valid;
  if (valid === false) {
    //game ends
    $(".output").text(
      "Click incorrectly or either player has no moves moves ? if so, game over"
    );
    countScores(grid);
  }
  return isValid;
};

const countScores = (grid) => {
  for (const x of grid) {
    for (const y of x) {
      const element = y;
      if (element === "O") {
        whiteScore += 1;
        $(".O").text(whiteScore);
      } else if (element === "X") {
        blackScore += 1;
        $(".X").text(blackScore);
      }
    }
  }
  blackScore = 0;
  whiteScore = 0;
};
const randomNum = (arr) => {
  return Math.floor(Math.random() * arr.length);
};
// const gridNum = [["X"], "O", "X", "X", "O"];

const shuffleDeck = (arr) => {
  const randomNumber = function (dice) {
    return Math.trunc(Math.random() * dice) + 1;
  };
  let deck = arr;
  for (let currentIndex = 0; currentIndex < arr.length; currentIndex += 1) {
    let currentCard = deck[currentIndex];
    let randomIndex = randomNumber(arr.length - 1);

    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = currentCard;
  }

  return deck;
};

// in step3
const tilesCreate = (grid) => {
  // builds single div representing a row that will hook many small divs each
  // outer loop creates x8 rows. Each row hooks x8 small TILES
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    const $DIV = $("<div>").addClass(`row ${i}row`);

    //container DIV hooks div-rows
    $(".container-main").append($DIV);

    // inner loops creates x8 small tiles without leaving loops that will hook to a single parent row div before leaving inner loop
    for (let j = 0; j < row.length; j++) {
      const $TILE = $("<div>")
        .addClass("tile green")
        .attr("id", `tile${i}${j}`)
        .data("coordinates", { x: i, y: j });

      //respective row hooks a $TILE
      $(`.${i}row`).append($TILE);

      $TILE.text(`${i},${j}`);
    }
  }
  //set initial tiles colors
  // $(".tile").on("click", tileIsClicked);
  $("#tile43").addClass("black");
  $("#tile34").addClass("black");
  $("#tile33").addClass("white");
  $("#tile44").addClass("white");
  // $("#tile11").addClass("white");
  // $("#tile00").addClass("white");
  // $("#tile20").addClass("black");
  // $("#tile12").addClass("white");

  // $("#tile22").addClass("black");
  // $("#tile21").addClass("black");
  // $("#tile53").addClass("black");
  // $("#tile32").addClass("white");
};

// init game function

const endGame = () => {
  let endGame = true;
  for (const x of grid) {
    for (const y of x) {
      const element = y;
      // console.log(element);
      if (element === "") {
        endGame = false;
      }
    }
  } // returns true of false

  return endGame;
};

const initGame = () => {
  player = "O";
  opponent = "X"; //computer is black
  whiteScore = 2;
  blackScore = 2;
  whiteNameTurn = false;
  playing = false;
  mode = "";
  username = false;
  ENDGAME = false;
  whiteName = "";
  blackName = "";

  grid = [
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "O", "X", "", "", ""],
    ["", "", "", "X", "O", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
  ];

  $(".row").remove();
  $(".output").text("Select PVP or Computer Mode to begin");
  $(".B").text("");
  $(".W").text("REVERSI");
  $(".X").text("");
  $(".O").text("");
  // ====== initialisation of initial buttons listeners=====
  //pvp button
  $(".pvp").on("click", pvpInitialStart);
  $(".computer").on("click", comInitialStart);
  // submit button
  $(".submit").on("click", () => {
    const $input = $(".input");
    const $outputMainMsg = mainMessage($input.val());
    console.log($outputMainMsg);
    displayOutput($outputMainMsg);
    $input.val("");
  });
  // start button
  $(".start").on("click", initGame);

  // =========end of initial buttons listners==========
};

// function to test for valid move

const withinBoard = (moveX, moveY) =>
  moveX >= 0 && moveX <= 7 && moveY >= 0 && moveY <= 7;

//togglePlayer
const togglePlayer = () => {
  player = player === "O" ? "X" : "O";
  opponent = opponent === "X" ? "O" : "X";
  // console.log("currentPlayer: ", player, "currentOpponent: ", opponent);
};

const updateGrid = (x, y, player) => {
  // console.log("update grid: ", x, y);
  // console.log(player);

  grid[x][y] = player;
  // console.log(grid[x][y]);
};

const gridValue = (x, y) => {
  return grid[x][y];
};

const displayOutput = (message) => {
  $(".output").text(message);
};

const pvpInitialStart = () => {
  let outputMsg = "White player, input name";
  mode = "pvp";
  username = true;
  whiteNameTurn = true;
  displayOutput(outputMsg);
};

// step 6 in step 4.1 activePlayer selected tile is changed to activePlayer's color === the end
const tileChangePlayer = (
  $isValid,
  $targetX,
  $targetY,
  player,
  $target,
  isArrValidEnd,
  comStartX,
  comStartY
) => {
  if ($isValid === true && mode === "pvp") {
    if (player === "O") {
      $target.toggleClass("white");
      // $target.toggleClass("green");
      console.log("was here as white");
      updateGrid($targetX, $targetY, player);
      togglePlayer();
      $(".output").text(`${blackName} your turn`);
      // console.log("player", player);
      // console.log("opponent", opponent);
    } else if (player === "X") {
      console.log("was here for player2");
      $target.toggleClass("black");
      // $target.toggleClass("green");
      updateGrid($targetX, $targetY, player);
      togglePlayer();
      displayOutput(`${whiteName} your turn`);
      // console.log("player", player);
      // console.log("opponent", opponent);
    }
  }
  console.log($isValid);
  if (mode === "computer") {
    console.log($isValid);
    if (player === "O" && $isValid === true) {
      $target.toggleClass("white");
      // console.log("white player computer mode");

      updateGrid($targetX, $targetY, player);
      // console.log(opponent);
      togglePlayer();
      // console.log(opponent);
      $(".output").text(`${blackName} your turn`);
    }
    if (player === "X" && jackpot === true) {
      console.log("computerSpot2Flip: ", comStartX, comStartY);
      const $comTile = $(`#tile${comStartX}${comStartY}`);
      $comTile.toggleClass("black");
      updateGrid(comStartX, comStartY, player);
      togglePlayer();
      displayOutput(`${whiteName} your turn`);
    }
  }
};
// step 5.2.3 // flip the tile
const flipTile = (x, y) => {
  console.log("player: ", player, "opponent: ", opponent);
  // console.log(x, y);
  const gridValue = grid[x][y];
  const $tile = $(`#tile${x}${y}`);

  if (player === "O") {
    // console.log($tile);
    // console.log(`flipping ${x}${y}`);
    $tile.addClass("white");
    $tile.removeClass("black");
    updateGrid(x, y, player);
    // console.log(grid[x][y]);
    // console.log(player, opponent);
  } else if (player === "X") {
    console.log("was here as black");
    $tile.addClass("black");
    $tile.removeClass("white");
    updateGrid(x, y, player);
    // console.log(grid[x][y]);
    // console.log(player, opponent);
  }
};
// step 5.2.2 // uses slices
// FLIP TILE is INSIDE
const correctTilesToFlip = (x, y, isCorner) => {
  console.log(x, y);
  if (mode === "pvp") {
    const Xarr = x.slice(0, -1);
    const Yarr = y.slice(0, -1);
    // const opponentTile = 2;
    console.log("cardsToFlip: ", Xarr, Yarr);

    //POTENTIAL PROBLEMS DUE TO WRONG READING HENCE FLIPPING
    for (let i = 0; i < Xarr.length; i++) {
      const elementX = Xarr[i];
      for (let j = i; j <= i; j++) {
        const elementY = Yarr[j];
        console.log(elementX, elementY);
        flipTile(elementX, elementY); // grid updated and tiles except players is flipped
      }
    }
  }
  if (mode === "computer") {
    // if (isComputerFlipTile === false) {
    // }
    isComputerFlipTile = true;
    if (isComputerFlipTile === true) {
    }
    const Xarr = x.slice(0, -1);
    const Yarr = y.slice(0, -1);
    // const opponentTile = 2;
    console.log("IMPORTANT cardsToFlip: ", Xarr, Yarr);

    //POTENTIAL PROBLEMS DUE TO WRONG READING HENCE FLIPPING
    // loops and flips all the required tiles in one go
    for (let i = 0; i < Xarr.length; i++) {
      const elementX = Xarr[i];
      for (let j = i; j <= i; j++) {
        const elementY = Yarr[j];
        console.log(
          "as Computer/white exact coordinates to flip b4 flip: ",
          elementX,
          elementY
        );
        flipTile(elementX, elementY); // grid updated and tiles except players is flipped
      }
    }
  }
  // computerFlipTile = false;
  return true;
};
// step 5.2.1 // finds "POTENTIAL" correct direction
const directionFinder = (x, y) => {
  let isDirect = false;
  const startX = x;
  const startY = y;
  // console.log(x, y);
  // const blackArray = [];
  const directionArray = [];
  const validArray = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];

  validArray.forEach((item, index) => {
    let moveX = startX;
    let moveY = startY;
    const [x, y] = item;
    moveX += x;
    moveY += y;
    if (withinBoard(moveX, moveY)) {
      if (grid[moveX][moveY] === opponent) {
        // console.log(moveX, moveY);
        // if move hits an opponent tile, it records to directionArray //but it's still ?? valid direction

        if (x === 0 && y === 1) {
          directionArray.push("right");
          isDirect = true;
        } else if (x === -1 && y === 1) {
          directionArray.push("topRight");
          isDirect = true;
        } else if (x === 1 && y === 1) {
          directionArray.push("bottomRight");
          isDirect = true;
        } else if (x === -1 && y === 0) {
          directionArray.push("top");
          isDirect = true;
        } else if (x === -1 && y === -1) {
          directionArray.push("topLeft");
          isDirect = true;
        } else if (x === 0 && y === -1) {
          directionArray.push("left");
          isDirect = true;
        } else if (x === 1 && y === -1) {
          directionArray.push("bottomLeft");
          isDirect = true;
        } else if (x === 1 && y === 0) {
          directionArray.push("bottom");
          isDirect = true;
        }
      }
    }
  });
  // spotBlack: blackArray
  return { direction: directionArray, validDirect: isDirect };
};
// step 5.2 Final Check
const validFinal = (isValidInitial, x, y) => {
  let isValidMove = false; //default
  console.log(isValidInitial);
  console.log(player, opponent);
  console.log(x, y);
  if (isValidInitial === true) {
    const directionObj = directionFinder(x, y);
    // console.log(directionObj);
    const directArr = directionObj.direction;
    // console.log(directArr);
    for (const direct of directArr) {
      let moveX = x;
      let moveY = y;
      let directX = 0;
      let directY = 0;
      // console.log("start position:", x, y);
      let stepsXarr = []; // collect X steps
      let stepsYarr = []; // collect Y steps

      if (direct === "top") {
        directX = -1;
        directY = 0;
      } else if (direct === "topLeft") {
        directX = -1;
        directY = -1;
      } else if (direct === "topRight") {
        directX = -1;
        directY = 1;
      } else if (direct === "left") {
        directX = 0;
        directY = -1;
      } else if (direct === "right") {
        directX = 0;
        directY = 1;
      } else if (direct === "bottomLeft") {
        directX = 1;
        directY = -1;
      } else if (direct === "bottom") {
        directX = 1;
        directY = 0;
      } else if (direct === "bottomRight") {
        directX = 1;
        directY = 1;
      }

      // must take first step into opposing square
      moveX += directX;
      moveY += directY;
      // console.log("direction: ", directX, directY);
      // console.log(moveX, moveY);
      stepsXarr.push(moveX);
      stepsYarr.push(moveY);
      // if (withinBoard(moveX, moveY) === false) {
      //   continue;
      // }
      while (grid[moveX][moveY] === opponent) {
        //second step // possible own tile
        moveX += directX;
        moveY += directY;
        stepsXarr.push(moveX);
        stepsYarr.push(moveY);
        if (withinBoard(moveX, moveY) === false) {
          break;
        }
        // console.log("I got into loop");

        console.log("direction : ", directX, directY);
        console.log("danger points :", moveX, moveY);

        if (grid[moveX][moveY] === player) {
          // console.log("got in above reverseSteps");
          const test = correctTilesToFlip(stepsXarr, stepsYarr);
          stepsXarr = [];
          stepsYarr = [];
          isValidMove = test;
        }
      }
    }
  }

  return isValidMove;
};

// step 5.1 Initial Check
const validInitial = (x, y) => {
  // console.log(player, opponent);
  console.log(x, y);
  let isValidInitial = false;
  if (grid[x][y] === "") {
    // console.log(x, y);
    const startX = x; //remember start X
    const startY = y; // remember start Y

    const validArray = [
      [0, 1], //c
      [1, 1], //c
      [1, 0], //c
      [1, -1], //c
      [0, -1], //c
      [-1, -1], //c
      [-1, 0], //c
      [-1, 1], //c
    ];

    for (const item of validArray) {
      let moveX = startX;
      let moveY = startY;
      const [x, y] = item;
      // console.log(x, y);

      // console.log(moveX, moveY);
      // console.log(moveX, moveY);
      moveX += x; // first steps into ?? opponent tile
      moveY += y; // first steps in ?? opponent tile
      // while (withinBoard(moveX, moveY)) {
      if (withinBoard(moveX, moveY)) {
        // console.log(moveX, moveY);
        if (grid[moveX][moveY] === "X" && player === "O") {
          // console.log("checkingasWhite");
          isValidInitial = true;
        }
        if (grid[moveX][moveY] === "O" && player === "X") {
          // console.log("checkingasBlack");
          isValidInitial = true;
        }
        // moveX += x;
        // moveY += y;
      }
    }
  }
  // console.log(player, opponent);
  console.log(isValidInitial);
  return isValidInitial;
};
// step 5.0 // checks tile clicked is valid
const validMove = (x, y, initialChk, validFinal) => {
  // console.log(player, opponent);
  // console.log(x, y);
  const isInitial = initialChk(x, y);
  // console.log(isInitial);
  const result = validFinal(isInitial, x, y);
  // console.log(result);
  return result;
};

// ===============TESTING AREA=================
// search Emptry Spots
const searchEmptySpots = (grid) => {
  const emptySpotsArr = [];
  let isSpot = false;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      const element = grid[i][j];
      if (element === "") {
        // console.log(grid[i][j]);
        emptySpotsArr.push([i, j]);
        isSpot = true;
      }
    }
  }

  return { isEmpty: isSpot, spotsArr: emptySpotsArr };
};

const isArrValidAdjacent = (isArrObjEmpty) => {
  let isAdjacent = false;
  const isEmpty = isArrObjEmpty.isEmpty;
  const spotArr = isArrObjEmpty.spotsArr;
  const validAdjArr = [];
  const dirArray = [];
  if (isEmpty === true) {
    for (let i = 0; i < spotArr.length; i++) {
      let eleIarr = spotArr[i]; // [i,j]

      // console.log("eleIarr :", eleIarr);
      const [x, y] = eleIarr;
      const isArrDirectObj = directionFinder(x, y);
      if (isArrDirectObj.validDirect === true) {
        validAdjArr.push([x, y]);
        dirArray.push(isArrDirectObj.direction);
        isAdjacent = true;
      }
      // console.log(isArrDirectObj);
    }
  }
  // console.log(validAdjArr);
  return {
    isAdj: isAdjacent,
    adjArr: validAdjArr,
    directArr: dirArray,
  };
};
// const isArrAdjacent = isArrValidAdjacent(isArrEmptySpots);
// console.log(isArrAdjacent);

const isCheckCorners = (isValid, startX, startY) => {
  console.log("pos startXandY: ", startX, startY);
  let isGoodSpot = false;
  if (isValid === true) {
    console.log(
      "inCheckCorners and checking whether StartX n StartY = corners"
    );
    const goodSpots = [
      [0, 0],
      [0, 7],
      [7, 0],
      [7, 7],
    ];

    isGoodSpot = goodSpots.some((item) => {
      const a = item;
      const b = [startX, startY];

      function arrayEquals(a, b) {
        return (
          Array.isArray(a) &&
          Array.isArray(b) &&
          a.length === b.length &&
          a.every((val, index) => val === b[index])
        );
      }

      const isEqual = arrayEquals(a, b); // true, the function works
      if (isEqual) {
        return isEqual;
      }
    });
  }
  return isGoodSpot;
};

const loopEachCoor = (isArrObj) => {
  let cornerFirst = false;
  let valid = { valid: false };

  console.log(isArrObj);
  const possibleCoorArr = isArrObj.adjArr;
  console.log(possibleCoorArr);

  // for (const item of possibleCoorArr) {
  //   const [x, y] = item;
  //   const isGood = isCheckCorners(true, x, y);

  //   if (isGood === true && jackpot === false) {
  //     cornerFirst = true;

  //     if (cornerFirst === true) {
  //       const oneCoorChkObj = isComputerValidEnd(isArrObj, x, y);
  //       console.log(oneCoorChkObj);

  //       if (jackpot === true) {
  //         return oneCoorChkObj; // returns true and the player's beginning tile to flip to own color
  //       }
  //     }
  //   }
  // }

  const deck = shuffleDeck(possibleCoorArr);

  if (jackpot === false && cornerFirst === false) {
    for (let i = 0; i < deck.length; i++) {
      const item = deck.pop();
      // const item = possibleCoorArr[randomNum(possibleCoorArr)];
      const [x, y] = item;

      const oneCoorChkObj = isComputerValidEnd(isArrObj, x, y);
      console.log(oneCoorChkObj);

      if (jackpot === true) {
        return oneCoorChkObj; // returns true and the player's beginning tile to flip to own color
      }
    }

    // for (const item of possibleCoorArr) {
    //   const [x, y] = item;
    //   console.log(item);
    //   const oneCoorChkObj = isComputerValidEnd(isArrObj, x, y);
    //   console.log(oneCoorChkObj);

    //   if (jackpot === true) {
    //     return oneCoorChkObj; // returns true and the player's beginning tile to flip to own color
    //   }
    // }
  }
  return valid;
};

const isComputerValidEnd = (isArrObj, x, y) => {
  const finale = { valid: false };
  // let isComputerFlipTile = true;

  // const directArr = isArrObj.directArr;
  // let validAdjArr = isArrObj.adjArr;
  // let isValidMove = false;
  let startX = x;
  let startY = y;

  // console.log(isArrObj);
  // console.log(validAdjArr);
  // console.log(directArr);

  console.log(player, opponent);

  const directionArr = [
    [1, 0],
    [1, 1],
    [0, 1],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];

  for (const item of directionArr) {
    let lastDirectDone = false;
    const [dX, dY] = item;

    console.log("square 1 direction :", dX, dY);

    const isValidCoor = (x, y, dX, dY) => {
      // let isValidCoor = false;
      console.log("start pos XY:", x, y);
      startX = x;
      startY = y;
      let moveX = startX;
      let moveY = startY;
      let stepsXarr = [];
      let stepsYarr = [];
      let directX = dX;
      let directY = dY;

      if (directX === -1 && directY === 1) {
        console.log("I am final direction");
        lastDirectDone = true;
      }

      // must take first step into opposing square
      moveX += directX;
      moveY += directY;
      console.log("current pos after 1st movement : ", moveX, moveY);
      stepsXarr.push(moveX);
      stepsYarr.push(moveY);
      console.log("stepsArr: ", stepsXarr, stepsYarr);
      // if (withinBoard(moveX, moveY) === false) {
      //   continue;
      // }
      if (withinBoard(moveX, moveY)) {
        console.log("was here line 704 after withinBoard");
        while (grid[moveX][moveY] === opponent) {
          console.log("was here line 706 after hitting opponent");
          //second step // possible own tile
          console.log("next movement:", moveX, moveY);
          moveX += directX;
          moveY += directY;
          console.log("after movement:", moveX, moveY);
          console.log("steps: ", stepsXarr, stepsYarr);

          if (withinBoard(moveX, moveY) === false) {
            break;
          } else {
            stepsXarr.push(moveX);
            stepsYarr.push(moveY);
            console.log("steps: ", stepsXarr, stepsYarr);
            console.log("after movement plus:", moveX, moveY);
          }

          if (grid[moveX][moveY] === player) {
            console.log("after movement plus hit own card:", moveX, moveY);
            console.log("arrOfStepsToFlip", stepsXarr, stepsYarr);
            return { valid: true, Xarr: stepsXarr, Yarr: stepsYarr };
          }
        }

        moveX = startX;
        moveY = startY;
        stepsXarr = [];
        stepsYarr = [];
        console.log(
          "didnt hit own card, hence reset for next direction to test"
        );
        console.log("pos reset :", moveX, moveY);
        console.log("steps reset", stepsXarr, stepsYarr);
      }
      moveX = startX;
      moveY = startY;
      stepsXarr = [];
      stepsYarr = [];
      // }

      return { valid: false };
    };

    const isValidCoorObj = isValidCoor(startX, startY, dX, dY);
    console.log(isValidCoorObj);

    const isGoodCorner = isCheckCorners(isValidCoorObj.valid, startX, startY);
    console.log(isGoodCorner); // // checks whether startX and Start Y matches with good corners after passing VALIDITY confirm

    //####### JACKPOT condition in here #######
    const flipOpponentTiles = (isGoodCorner, Xarr, Yarr, isValidCoorObj) => {
      console.log("it is ok if undefined: ", Xarr, Yarr);
      console.log(isValidCoorObj);
      let isValidMove = false;
      if (isGoodCorner === true) {
        jackpot = true; //#######JACKPOT########
        console.log("gonna flip opp tiles in next line");
        const isTilesFlipped = correctTilesToFlip(Xarr, Yarr, isGoodCorner);
        console.log("hit jackpot with corner");
        isValidMove = true;
      } else if (isGoodCorner === false && isValidCoorObj === true) {
        jackpot = true; //#######JACKPOT########
        console.log("gonna flip opp tile next line");
        console.log("hit jackpot with something");
        const isTilesFlipped = correctTilesToFlip(Xarr, Yarr, isGoodCorner);

        isValidMove = true;
      }
      stepsXarr = [];
      stepsYarr = [];
      return isValidMove;
    };
    console.log(isValidCoorObj.valid);
    const isFlippedOppTiles = flipOpponentTiles(
      isGoodCorner,
      isValidCoorObj.Xarr,
      isValidCoorObj.Yarr,
      isValidCoorObj.valid
    );
    console.log(isFlippedOppTiles);
    console.log(
      "check lastDirectionDone of final direct :",
      lastDirectDone,
      "jackpot :",
      jackpot
    );

    if (jackpot === true && lastDirectDone === true) {
      console.log("went pass into jackpot and lastDirectDone is true");
      return { sX: startX, sY: startY };
    }
    console.log(
      "shouldn't be in this line if jackpot and lastDirectDone is true"
    );
    // isValidMove = isFlippedOppTiles;
  }
  return finale;
};

// ====================TESTING AREA ============
// step 4.1 tilesListenOn- Callback function to determine TILE is valid
const tileIsClicked = (event) => {
  if (playing === true) {
    if (mode === "pvp") {
      $(".pvp").off();
    } else $(".computer").off();

    $(".submit").off();

    const $target = $(event.target);
    const $objXY = $target.data("coordinates");
    // console.log($objXY);
    const $targetX = $objXY.x;
    const $targetY = $objXY.y;
    // console.log($targetX, $targetY);

    console.log("was i here again");

    const $isValid = validMove($targetX, $targetY, validInitial, validFinal); // later validFinal
    console.log($isValid);

    const ANYMOREMOVES = anyMoreMoves($isValid);

    tileChangePlayer(ANYMOREMOVES, $targetX, $targetY, player, $target);
    countScores(grid);

    // ======= COMPUTER AI BEGINS ============
    if (mode === "computer" && player === "X" && playing === true) {
      const isArrEmptySpots = searchEmptySpots(grid);

      const isArrAdjacent = isArrValidAdjacent(isArrEmptySpots);
      console.log(isArrAdjacent);

      const isArrValidEnd = loopEachCoor(isArrAdjacent);
      console.log(isArrValidEnd);
      // const isArrValidEnd = isComputerValidEnd(isArrAdjacent);
      // isArrValidEnd.isValid,

      tileChangePlayer(
        $isValid,
        $targetX,
        $targetY,
        player,
        $target,
        isArrValidEnd.valid,
        isArrValidEnd.sX,
        isArrValidEnd.sY
      );
      jackpot = false; // reset for next round check
      //count scores
      countScores(grid);
    }
    // =============COMPUTER AI ENDS============
    // isEndgame checks
    const ENDGAME = endGame();
    if (ENDGAME === true) {
      let finalMSG = "";
      // if (whiteScore > blackScore) {
      //   finalMSG = `${whiteName} wins`;
      // } else {
      //   finalMSG = `${blackName} wins`;
      // }
      finalMSG += "The game has ended, please press reset to start new";
      displayOutput(finalMSG);
      // initGame(ENDGAME);
    }
  }
};

// step 4.0 - tiles turn on
const tilesListenOn = () => {
  $(".tile").on("click", tileIsClicked);
};

//step 3
const mainMessage = (input) => {
  let output = "invalid choice";
  if (username === true && mode === "pvp") {
    // console.log(whiteNameTurn);
    // console.log(input);
    if (input !== "" && whiteNameTurn === true) {
      // console.log("came in");
      whiteName = input;
      // console.log(whiteName);
      $(".W").text(whiteName);
      whiteNameTurn = false;
      // console.log(output);
      output = "Black player, input your name";
      console.log(output);
    } else if (input !== "" && whiteNameTurn === false) {
      // console.log("came into black name");
      username = false;
      blackName = input;
      $(".B").text(blackName);
      $(".submit").off();
      output = `${whiteName} start playing`;
      playing = true;
    }
    console.log(mode, username);
    if (mode === "pvp" && username === false) {
      tilesCreate(grid); // render tiles
      tilesListenOn(); // turn on tiles listener
      whiteNameTurn = false;
      // console.log(output);
      $(".X").text("0");
      $(".O").text("0");
      $(".pvp").off();
    }
    // console.log(output);
  }

  if (username === true && mode === "computer") {
    console.log(username);
    if (input !== "" && whiteNameTurn === true) {
      console.log("came in and accepts white username");
      whiteName = input;
      whiteNameTurn === false;

      username = false;
      $(".W").text(whiteName);
      blackName = "computer";
      $(".B").text("Computer");
      output = `Game starts. ###${whiteName}###, as white player, you go first `;
      playing = true;
    }
    if (mode === "computer" && username === false) {
      tilesCreate(grid); // render tiles
      tilesListenOn(); // turn on tiles listener
      $(".X").text("0");
      $(".O").text("0");
      $(".computer").off();
      $(".submit").off();
    }
  }

  return output;
};

//step 2 // ask white player to input name // turn on mode- computer
const comInitialStart = () => {
  let outputMsg = "White player, input name";
  mode = "computer";
  username = true;
  whiteNameTurn = true;
  displayOutput(outputMsg);
};

// step 1, turn on ALL hardcoded buttons
const main = () => {
  //PVP button
  $(".pvp").on("click", pvpInitialStart);

  // submit button
  $(".submit").on("click", () => {
    const $input = $(".input");
    const $outputMainMsg = mainMessage($input.val());
    // console.log($outputMainMsg);
    displayOutput($outputMainMsg);
    $input.val("");
  });
  // start button
  $(".start").on("click", initGame);

  // computer button
  $(".computer").on("click", comInitialStart);
};

$(main);

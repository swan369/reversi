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
let myMessage = "invalid choice";

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
      "Are you sure there are no more moves !?!?. Open your eyes please !"
    );
    // countScores(grid);
  }
  return isValid;
};
const isEndGame = (isSquares, isAdjTile) => {
  countScores(grid);

  if (isSquares === false || isAdjTile === false || ENDGAME === true) {
    // ENDGAME = true;
    let finalMSG = "";
    if (whiteScore > blackScore) {
      finalMSG = `${whiteName} wins. `;
    } else if (whiteScore === blackScore) {
      finalMSG = "It is a draw ";
    } else {
      finalMSG = `${blackName} wins. `;
    }

    finalMSG += "The game has ended, please press reset to start anew";
    displayOutput(finalMSG);
  }
};

const countScores = (grid) => {
  blackScore = 0;
  whiteScore = 0;
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
};
const randomNum = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

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

// function in step3
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

      // $TILE.text(`${i},${j}`);
    }
  }
  //set initial tiles colors
  $("#tile43").addClass("black");
  $("#tile34").addClass("black");
  $("#tile33").addClass("white");
  $("#tile44").addClass("white");
};

const anySquaresLeft = (grid) => {
  let isAdjTile = false;

  for (let i = 0; i < grid.length; i++) {
    let row = grid[i];
    for (let j = 0; j < row.length; j++) {
      if (grid[i][j] === "") {
        return true;
      }
    }
  }
  return isAdjTile;
};
// init game function
const initGame = () => {
  player = "O";
  opponent = "X"; //computer is black
  whiteScore = 2;
  blackScore = 2;
  whiteNameTurn = false;
  mode = "";
  username = false;
  ENDGAME = false;
  whiteName = "";
  blackName = "";
  jackpot = false;
  playing = false;

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
  $(".W").text("");
  $(".X").text("");
  $(".O").text("");
  // ====== initialisation of initial buttons listeners=====
  //pvp button
  $(".pvp").on("click", pvpInitialStart);
  $(".computer").on("click", comInitialStart);
  // reset button
  $(".reset").on("click", initGame);
  $(".submit").off();
  // =========end of initial buttons listners==========
};

const withinBoard = (moveX, moveY) =>
  moveX >= 0 && moveX <= 7 && moveY >= 0 && moveY <= 7;

//togglePlayer
const togglePlayer = () => {
  player = player === "O" ? "X" : "O";
  opponent = opponent === "X" ? "O" : "X";
};

const updateGrid = (x, y, player) => {
  grid[x][y] = player;
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
  $(".reset").on("click", initGame);
  $(".computer").off();
  $(".submit").on("click", () => {
    const $input = $(".input");
    const $outputMainMsg = mainMessage($input.val());
    displayOutput($outputMainMsg);
    $input.val("");
  });
};

const searchEmptySpots = (grid) => {
  const emptySpotsArr = [];
  let isSpot = false;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid.length; j++) {
      const element = grid[i][j];
      if (element === "") {
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

      const [x, y] = eleIarr;
      const isArrDirectObj = directionFinder(x, y);
      if (isArrDirectObj.validDirect === true) {
        validAdjArr.push([x, y]);
        dirArray.push(isArrDirectObj.direction);
        isAdjacent = true;
      }
    }
  }
  return {
    isAdj: isAdjacent,
    adjArr: validAdjArr,
    directArr: dirArray,
  };
};

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
      // reference for arrayEquals function : https://www.codegrepper.com/code-examples/javascript/how+to+check+if+two+arrays+are+equal+javascriptß
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
  const possibleCoorArr = isArrObj.adjArr;
  const deck = shuffleDeck(possibleCoorArr);

  if (jackpot === false && cornerFirst === false) {
    for (let i = 0; i < deck.length; i++) {
      const item = deck.pop();
      const [x, y] = item;

      const oneCoorChkObj = isComputerValidEnd(isArrObj, x, y);

      if (jackpot === true) {
        return oneCoorChkObj; // returns true and the player's beginning tile to flip to own color
      }
    }
  }
  return valid;
};

const isComputerValidEnd = (isArrObj, x, y) => {
  const finale = { valid: false };

  let startX = x;
  let startY = y;

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
    const isValidCoor = (x, y, dX, dY) => {
      startX = x;
      startY = y;
      let moveX = startX;
      let moveY = startY;
      let stepsXarr = [];
      let stepsYarr = [];
      let directX = dX;
      let directY = dY;

      if (directX === -1 && directY === 1) {
        lastDirectDone = true;
      }

      // must take first step into opposing square
      moveX += directX;
      moveY += directY;
      stepsXarr.push(moveX);
      stepsYarr.push(moveY);
      if (withinBoard(moveX, moveY)) {
        while (grid[moveX][moveY] === opponent) {
          //second step // possible own tile
          moveX += directX;
          moveY += directY;

          if (withinBoard(moveX, moveY) === false) {
            break;
          } else {
            stepsXarr.push(moveX);
            stepsYarr.push(moveY);
          }

          if (grid[moveX][moveY] === player) {
            return { valid: true, Xarr: stepsXarr, Yarr: stepsYarr };
          }
        }
        moveX = startX;
        moveY = startY;
        stepsXarr = [];
        stepsYarr = [];
      }
      moveX = startX;
      moveY = startY;
      stepsXarr = [];
      stepsYarr = [];

      return { valid: false };
    };

    const isValidCoorObj = isValidCoor(startX, startY, dX, dY);

    const isGoodCorner = isCheckCorners(isValidCoorObj.valid, startX, startY);

    //####### JACKPOT condition in here #######
    const flipOpponentTiles = (isGoodCorner, Xarr, Yarr, isValidCoorObj) => {
      let isValidMove = false;
      if (isGoodCorner === true) {
        jackpot = true; //#######JACKPOT########
        const isTilesFlipped = correctTilesToFlip(Xarr, Yarr, isGoodCorner);
        isValidMove = true;
      } else if (isGoodCorner === false && isValidCoorObj === true) {
        jackpot = true; //#######JACKPOT########
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

    if (jackpot === true && lastDirectDone === true) {
      return { sX: startX, sY: startY };
    }
  }
  return finale;
};

// ###======== COMPUTER AI
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
      updateGrid($targetX, $targetY, player);
      togglePlayer();
      $(".output").text(`${blackName} your turn`);
    } else if (player === "X") {
      $target.toggleClass("black");
      updateGrid($targetX, $targetY, player);
      togglePlayer();
      displayOutput(`${whiteName} your turn`);
    }
  }
  console.log($isValid);
  if (mode === "computer") {
    if (player === "O" && $isValid === true) {
      $target.toggleClass("white");
      updateGrid($targetX, $targetY, player);
      togglePlayer();
      $(".output").text(`${blackName} your turn`);
    }
    if (player === "X" && jackpot === true) {
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
  const gridValue = grid[x][y];
  const $tile = $(`#tile${x}${y}`);

  if (player === "O") {
    $tile.addClass("white");
    $tile.removeClass("black");
    updateGrid(x, y, player);
  } else if (player === "X") {
    $tile.addClass("black");
    $tile.removeClass("white");
    updateGrid(x, y, player);
  }
};
// step 5.2.2 // uses slices
// FLIP TILE is INSIDE
const correctTilesToFlip = (x, y, isCorner) => {
  if (mode === "pvp") {
    const Xarr = x.slice(0, -1);
    const Yarr = y.slice(0, -1);

    for (let i = 0; i < Xarr.length; i++) {
      const elementX = Xarr[i];
      for (let j = i; j <= i; j++) {
        const elementY = Yarr[j];
        flipTile(elementX, elementY); // grid updated and tiles except players is flipped
      }
    }
  }
  if (mode === "computer") {
    isComputerFlipTile = true;
    if (isComputerFlipTile === true) {
    }
    const Xarr = x.slice(0, -1);
    const Yarr = y.slice(0, -1);

    // loops and flips all the required tiles in one go
    for (let i = 0; i < Xarr.length; i++) {
      const elementX = Xarr[i];
      for (let j = i; j <= i; j++) {
        const elementY = Yarr[j];

        flipTile(elementX, elementY); // grid updated and tiles except players is flipped
      }
    }
  }
  return true;
};
// step 5.2.1 // finds "POTENTIAL" correct direction
const directionFinder = (x, y) => {
  let isDirect = false;
  const startX = x;
  const startY = y;
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

// step 5.2 Final Check (validFinal for Begin Check and validFinalTwo for End Check)
const validFinalTwo = (isValidInitial, x, y) => {
  let isValidMove = false; //default

  if (isValidInitial === true) {
    const directionObj = directionFinder(x, y);
    const directArr = directionObj.direction;
    for (const direct of directArr) {
      let moveX = x;
      let moveY = y;
      let directX = 0;
      let directY = 0;

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

      while (grid[moveX][moveY] === opponent) {
        //second step // possible own tile
        moveX += directX;
        moveY += directY;

        if (withinBoard(moveX, moveY) === false) {
          break;
        }

        if (grid[moveX][moveY] === player) {
          isValidMove = true;
        }
      }
    }
  }

  return isValidMove;
};

const validFinal = (isValidInitial, x, y) => {
  let isValidMove = false; //default
  if (isValidInitial === true) {
    const directionObj = directionFinder(x, y);
    const directArr = directionObj.direction;
    for (const direct of directArr) {
      let moveX = x;
      let moveY = y;
      let directX = 0;
      let directY = 0;
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
      stepsXarr.push(moveX);
      stepsYarr.push(moveY);
      while (grid[moveX][moveY] === opponent) {
        //second step // possible own tile
        moveX += directX;
        moveY += directY;
        stepsXarr.push(moveX);
        stepsYarr.push(moveY);
        if (withinBoard(moveX, moveY) === false) {
          break;
        }
        if (grid[moveX][moveY] === player) {
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
  let isValidInitial = false;
  if (grid[x][y] === "") {
    const startX = x; //remember start X
    const startY = y; // remember start Y

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

    for (const item of validArray) {
      let moveX = startX;
      let moveY = startY;
      const [x, y] = item;
      moveX += x; // first steps into ?? opponent tile
      moveY += y; // first steps in ?? opponent tile
      if (withinBoard(moveX, moveY)) {
        if (grid[moveX][moveY] === "X" && player === "O") {
          isValidInitial = true;
        }
        if (grid[moveX][moveY] === "O" && player === "X") {
          isValidInitial = true;
        }
      }
    }
  }
  return isValidInitial;
};
// step 5.0 // checks tile clicked is valid
const validMove = (x, y, validInitial, validFinal) => {
  const isInitial = validInitial(x, y);
  const result = validFinal(isInitial, x, y);
  return result;
};

// step 4.1 tilesListenOn- Callback function to determine TILE is valid
const tileIsClicked = (event) => {
  if (playing === true) {
    if (mode === "pvp") {
      $(".pvp").off();
    } else $(".computer").off();

    $(".submit").off();

    const $target = $(event.target);
    const $objXY = $target.data("coordinates");
    const $targetX = $objXY.x;
    const $targetY = $objXY.y;

    const $isValid = validMove($targetX, $targetY, validInitial, validFinal); // later validFinal

    const ANYMOREMOVES = anyMoreMoves($isValid);

    tileChangePlayer(ANYMOREMOVES, $targetX, $targetY, player, $target);
    countScores(grid);

    // ======= COMPUTER AI BEGINS ============
    if (mode === "computer" && player === "X" && playing === true) {
      const isArrEmptySpots = searchEmptySpots(grid);

      const isArrAdjacent = isArrValidAdjacent(isArrEmptySpots);

      const isArrValidEnd = loopEachCoor(isArrAdjacent);

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
    const lastChk = (grid) => {
      const row = [0, 1, 2, 3, 4, 5, 6, 7];
      const column = [0, 1, 2, 3, 4, 5, 6, 7];
      let isAdjTile = false;

      for (let i = 0; i < row.length; i++) {
        for (let j = 0; j < column.length; j++) {
          if (grid[i][j] === "") {
            const isValid = validInitial(i, j);
            const finale = validFinalTwo(isValid, i, j);
            if (finale === true) {
              return finale;
            }
          }
        }
      }
      return isAdjTile;
    };
    const isAdjTile = lastChk(grid);
    const isEmptySquares = anySquaresLeft(grid);
    isEndGame(isEmptySquares, isAdjTile);
  }
};

// step 4.0 - tiles turn on
const tilesListenOn = () => {
  $(".tile").on("click", tileIsClicked);
};

//step 3
const mainMessage = (input) => {
  if (username === true && mode === "pvp") {
    if (input !== "" && whiteNameTurn === true) {
      whiteName = input;
      $(".W").text(whiteName);
      whiteNameTurn = false;
      const blackNameInput = "Black player, input your name";
      myMessage = blackNameInput;
    } else if (input !== "" && whiteNameTurn === false) {
      username = false;
      blackName = input;
      $(".B").text(blackName);
      $(".submit").off();
      myMessage = `${whiteName} start playing. You are White`;
      playing = true;
    }
    if (mode === "pvp" && username === false) {
      tilesCreate(grid); // render tiles
      tilesListenOn(); // turn on tiles listener
      whiteNameTurn = false;
      $(".X").text("0");
      $(".O").text("0");
      $(".pvp").off();
    }
  }

  if (username === true && mode === "computer") {
    if (input !== "" && whiteNameTurn === true) {
      whiteName = input;
      whiteNameTurn === false;
      username = false;
      $(".W").text(whiteName);
      blackName = "computer";
      $(".B").text("Computer");
      myMessage = `Game starts. ###${whiteName}###, as white player, you go first `;
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

  return myMessage;
};

//step 2 // ask white player to input name // turn on mode- computer
const comInitialStart = () => {
  let outputMsg = "White player, input name";
  mode = "computer";
  username = true;
  whiteNameTurn = true;
  displayOutput(outputMsg);
  $(".reset").on("click", initGame);
  $(".pvp").off();
  $(".submit").on("click", () => {
    const $input = $(".input");
    const $outputMainMsg = mainMessage($input.val());
    displayOutput($outputMainMsg);
    $input.val("");
  });
};

// step 1, turn on ALL hardcoded buttons
const main = () => {
  // const vid = document.getElementById("sound1");
  // vid.volume = 0.1;

  //PVP button
  $(".pvp").on("click", pvpInitialStart);
  //computer button
  $(".computer").on("click", comInitialStart);
};

$(main);

let currentUser = 1
const board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
const sectionArray = ['block_0', 'block_1', 'block_2', 'block_3', 'block_4', 'block_5', 'block_6', 'block_7', 'block_8']
let testBoolean = false;

let theAI;
let thePlayer;
let isTheComputerGoingFirst = false;


// Places and X or and O based on who the current use is
function placeChoice(id) {
    // Checks to see if space is occupied
    if (board[id] !== 0) {
        console.log('Space occupied')
        // Sets space selected based on the current player
    } else {
        if (currentUser === 1) {
            board[id] = currentUser;
            document.getElementById(`block_${id}`).innerHTML = 'X';
            document.getElementById(`block_${id}`).className = 'block occupied';
        } else {
            board[id] = currentUser;
            document.getElementById(`block_${id}`).innerHTML = 'O';
            document.getElementById(`block_${id}`).className = 'block occupied';
            console.table(board);
        }
        // Checks board for win after every move made
        const { state, winner } = checkWinState(board);
        if (state && winner !== 'tie') {
            console.log('You Win!')
            // Displays a red X or O dependig on which user won the game
            if (winner === 1) {
                document.getElementById('x-win').style.display = 'block';
            } else {
                document.getElementById('o-win').style.display = 'block';
            }
            document.getElementById('play-area').className = 'play-area blur'
            // Disables css hovers and onclicks when game is 
            for (let i = 0; i < 9; i++) {
                document.getElementById(`block_${i}`).removeEventListener('click', buffer, true); document.getElementById(`block_${i}`).className = 'block-done';
            }
        } else if (state && winner === 'tie') {
            document.getElementById('play-area').className = 'play-area blur';
            console.log("It's a tie")
        } else {
            // Changes user after a move is made
            changeUser();
        }
    }
}

function buffer(id) {
    placeChoice(id);
    if (currentUser === theAI) {
        compMove();
    }
}

function compMove() {
    //-------------------------RANDOM AI------------------------------------------------------------------
    // let freeArray = [];
    // board.forEach((square, squareIndex) => {
    //     if (square === 0) {
    //         freeArray.push(squareIndex)
    //     }
    // })

    // let randomFreeSquare = freeArray[Math.floor(Math.random() * freeArray.length)];

    //-------------------------RANDOM AI------------------------------------------------------------------
    //-------------------------MINIMAX AI------------------------------------------------------------------
    let tempBoard = [...board];
    const setDepth = 20;
    let bestScore = -Infinity;
    let bestMove;
    let counter = 0;

    tempBoard.forEach((square, squareIndex) => {
        if (square === 0) {
            tempBoard[squareIndex] = currentUser;
            let score = minimax(tempBoard, setDepth, -Infinity, Infinity, false);
            tempBoard[squareIndex] = 0;
            if (score > bestScore) {
                bestScore = score;
                bestMove = squareIndex;
            }
        }
    })


    // function minimax(board, depth, isMaximizing) {
    //     let returnScore;
    //     const { state, winner } = checkWinState(board);
    //     if (state || depth === 0) {
    //         if (testBoolean) {
    //             console.log(
    //                 `
    //                 ${board[0]}|${board[1]}|${board[2]}\n

    //                 ${board[2]}|${board[3]}|${board[4]}\n
    //                 ${board[6]}|${board[7]}|${board[8]}\n
    //                 `
    //             )
    //         }
    //         counter++;

    //         switch (winner) {
    //             case 'tie':
    //                 return returnScore = 0.5;
    //             case theAI:
    //                 return depth * depth;
    //             case thePlayer:
    //                 return depth * depth * -1
    //         }
    //         return returnScore
    //     }

    //     if (isMaximizing) {
    //         let maxEval = -Infinity;
    //         board.forEach((square, squareIndex) => {
    //             if (square === 0) {
    //                 board[squareIndex] = theAI;
    //                 let eval = minimax(board, depth - 1, false);
    //                 board[squareIndex] = 0;
    //                 maxEval = Math.max(maxEval, eval);
    //             }
    //         })
    //         return maxEval
    //     } else {
    //         let minEval = Infinity;
    //         board.forEach((square, squareIndex) => {
    //             if (square === 0) {
    //                 board[squareIndex] = thePlayer;
    //                 let eval = minimax(board, depth - 1, true);
    //                 board[squareIndex] = 0;
    //                 minEval = Math.min(minEval, eval);
    //             }
    //         })
    //         return minEval;
    //     }

    // }
    //----------------------------------APLA BETA PRUNING --------------------------------------------
    function minimax(board, depth, alpha, beta, isMaximizing) {
        let returnScore;
        const { state, winner } = checkWinState(board);
        if (state || depth === 0) {
            if (testBoolean) {
                console.log(
                    `
                    ${board[0]}|${board[1]}|${board[2]}\n
                    
                    ${board[2]}|${board[3]}|${board[4]}\n
                    ${board[6]}|${board[7]}|${board[8]}\n
                    `
                )
            }
            counter++;

            switch (winner) {
                case 'tie':
                    return returnScore = 0.5;
                case theAI:
                    return depth * depth;
                case thePlayer:
                    return depth * depth * -1
            }
            return returnScore
        }

        if (isMaximizing) {
            let maxEval = -Infinity;
            board.forEach((square, squareIndex) => {
                if (square === 0) {
                    board[squareIndex] = theAI;
                    let eval = minimax(board, depth - 1, false);
                    board[squareIndex] = 0;
                    maxEval = Math.max(maxEval, eval);
                    alpha = Math.max(alpha, eval);
                    if (beta <= alpha) return;
                }
            })
            return maxEval
        } else {
            let minEval = Infinity;
            board.forEach((square, squareIndex) => {
                if (square === 0) {
                    board[squareIndex] = thePlayer;
                    let eval = minimax(board, depth - 1, true);
                    board[squareIndex] = 0;
                    minEval = Math.min(minEval, eval);
                    beta = Math.min(beta, eval);
                    if (beta <= alpha) return;
                }
            })
            return minEval;
        }

    }
    //-------------------------MINIMAX AI------------------------------------------------------------------

    console.log(`Checked ${counter} possibilities`)
    console.log(`The best move is at position: ${bestMove}`)
    setTimeout(() => placeChoice(bestMove), 500);
}

// Wipes the board clean of markers
function resetBoard() {
    currentUser = 1;

    document.getElementById('play-area').className = 'play-area';
    document.getElementById('o-win').style.display = 'none';
    document.getElementById('x-win').style.display = 'none';
    for (let i = 0; i < 9; i++) {
        document.getElementById(`block_${i}`).innerHTML = '';
        console.log('complete for ', i)
        // document.getElementById(`block_${ i } `).onclick = () => placeChoice(i);
        document.getElementById(`block_${i}`).className = 'block';
        document.getElementById(`block_${i}`).removeEventListener('click', buffer, true);
        document.getElementById(`block_${i}`).addEventListener('click', buffer, true);
        board[i] = 0;
    }
    showActivePlayer();
    whoGoesFirst(isTheComputerGoingFirst);
}
// Changes the current user
function changeUser() {

    if (currentUser === 2) {
        currentUser = 1;
    } else { currentUser = 2; }
    showActivePlayer()
}

// Check whether the game has been won
function checkWinState(board) {
    let winner;
    let state = false;

    function shortCut(num1, num2, num3, players) {
        return (
            board[num1] === players &&
            board[num2] === players &&
            board[num3] === players
        )
    }

    for (let players = 1; players < 3; players++) {
        if (
            // Horizontal Win Conditions
            (shortCut(0, 1, 2, players)) ||
            (shortCut(3, 4, 5, players)) ||
            (shortCut(6, 7, 8, players)) ||
            // Vertical Win Conditions
            (shortCut(0, 3, 6, players)) ||
            (shortCut(1, 4, 7, players)) ||
            (shortCut(2, 5, 8, players)) ||
            // Diagonal Win Conditions
            (shortCut(0, 4, 8, players)) ||
            (shortCut(2, 4, 6, players))) {

            winner = players;
            state = true;
        } else if (!board.includes(0) && state === false) {
            winner = 'tie';
            state = true;
        }
    }
    return { state, winner };
}


function showActivePlayer() {
    if (currentUser === 1) {
        document.querySelector('#currentPlayer').innerHTML = 'USER';
    } else {
        document.querySelector('#currentPlayer').innerHTML = 'CPU';
    }
}

function whoGoesFirst(isTheComputerGoingFirst) {

    if (isTheComputerGoingFirst) {
        theAI = 1;
        thePlayer = 2;
        compMove()
    } else {
        theAI = 2;
        thePlayer = 1;
    }

    for (let i = 0; i < 9; i++) {
        document.getElementById(`block_${i}`).addEventListener('click', buffer, true);
    }

}

function testFunction() {
    testBoolean = true;
    console.log('Test Button pressed')

}

document.addEventListener('DOMContentLoaded', function () {
    var checkbox = document.querySelector('input[type="checkbox"]');

    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            // do this
            console.log('Checked');
            isTheComputerGoingFirst = true;
        } else {
            // do that
            console.log('Not checked');
            isTheComputerGoingFirst = false;
        }
    });
});

showActivePlayer();
whoGoesFirst(isTheComputerGoingFirst);
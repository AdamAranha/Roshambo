let currentUser = 1
const board = [0, 0, 0, 0, 0, 0, 0, 0, 0]
const sectionArray = ['block_0', 'block_1', 'block_2', 'block_3', 'block_4', 'block_5', 'block_6', 'block_7', 'block_8']

// Places and X or and O based on who the current use is
function placeChoice(id) {
    // Checks to see if space is occupied
    if (document.querySelector(`#block_${id}`).innerHTML !== '') {
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
        }
        // Checks board for win after every move made




        if (checkWinState(board, currentUser).state && checkWinState(board, currentUser).winner === currentUser) {
            console.log('You Win!')
            // Displays a red X or O dependig on which user won the game
            if (currentUser === 1) {
                document.getElementById('x-win').style.display = 'block';
            } else {
                document.getElementById('o-win').style.display = 'block';
            }
            document.getElementById('play-area').className = 'play-area blur'
            // Disables css hovers and onclicks when game is 
            for (let i = 0; i < 9; i++) {
                document.getElementById(`block_${i}`).onclick = null;
                document.getElementById(`block_${i}`).className = 'block-done';
            }
        } else if (checkWinState(board).state && checkWinState(board).winner === 'tie') {
            document.getElementById('play-area').className = 'play-area blur';
            console.log("It's a tie")
        } else {
            // Changes user after a move is made
            changeUser();
            console.log('Player Switched')

        }

    }
}

function buffer(id) {
    placeChoice(id);
    setTimeout(() => compMove(), 500)
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

    const scores = {
        1: 10,
        2: -10,
        tie: 0
    }

    const inverseScores = {
        1: -10,
        2: 10,
        tie: 0
    }
    console.table(tempBoard)
    console.log(currentUser)

    tempBoard.forEach((square, squareIndex) => {
        if (square === 0) {
            tempBoard[squareIndex] = currentUser;
            let score = minimax(tempBoard, 0, false);
            tempBoard[squareIndex] = 0;
            if (score > bestScore) {
                bestScore = score;
                bestMove = squareIndex;
            }
        }
    })

    function minimax(board, depth, isMaximizing) {
        let whoIsComp = isMaximizing ? 1 : 2;
        let whoIsPlayer = isMaximizing ? 2 : 1;

        const { state, winner } = checkWinState(board, whoIsComp);
        if (state) {
            counter++
            return scores[`${winner}`];
        }

        if (isMaximizing) {
            let maxEval = -Infinity;
            board.forEach((square, squareIndex) => {
                if (square === 0) {
                    board[squareIndex] = 1;
                    let eval = minimax(board, depth + 1, false);
                    board[squareIndex] = 0;
                    maxEval = Math.max(maxEval, eval);
                }
            })
            return maxEval
        } else {
            let minEval = Infinity;
            board.forEach((square, squareIndex) => {
                if (square === 0) {
                    board[squareIndex] = 2;
                    let eval = minimax(board, depth + 1, true);
                    board[squareIndex] = 0;
                    minEval = Math.min(minEval, eval)
                }
            })
            return minEval;
        }

    }










    //-------------------------MINIMAX AI------------------------------------------------------------------
    console.log('The best move is ', bestMove)
    placeChoice(bestMove);
}

// Wipes the board clean of markers
function resetBoard() {
    currentUser = 1;
    document.getElementById('play-area').className = 'play-area';
    document.getElementById('o-win').style.display = 'none';
    document.getElementById('x-win').style.display = 'none';
    for (let i = 0; i < 9; i++) {
        document.querySelector(`#block_${i} `).innerHTML = '';
        // document.getElementById(`block_${ i } `).onclick = () => placeChoice(i);
        document.getElementById(`block_${i} `).className = 'block';
        board[i] = '';
    }
    showActivePlayer();
}
// Changes the current user
function changeUser() {

    if (currentUser === 2) {
        currentUser = 1;
    } else { currentUser = 2; }
    showActivePlayer()
}

// Check whether the game has been won
function checkWinState(board, currentPlayer) {
    let winner;


    function shortCut(num1, num2, num3) {
        return (
            board[num1] === currentPlayer &&
            board[num2] === currentPlayer &&
            board[num3] === currentPlayer
        )
    }

    // Horizontal Win Conditions
    if ((shortCut(0, 1, 2)) ||

        (shortCut(3, 4, 5)) ||

        (shortCut(6, 7, 8)) ||
        // Vertical Win Conditions
        (shortCut(0, 3, 6)) ||

        (shortCut(1, 4, 7)) ||

        (shortCut(2, 5, 8)) ||
        // Diagonal Win Conditions
        (shortCut(0, 4, 8)) ||

        (shortCut(2, 4, 6))) {

        winner = currentPlayer;
        return { state: true, winner };
    } else if (!board.includes(0)) {
        winner = 'tie';
        return { state: true, winner }
    }


    return { state: false };
}


function showActivePlayer() {
    if (currentUser === 1) {
        document.querySelector('#currentPlayer').innerHTML = 'USER';
    } else {
        document.querySelector('#currentPlayer').innerHTML = 'CPU';
    }


}

showActivePlayer();
compMove();
let currentUser = 0
const board = ['', '', '', '', '', '', '', '', '']


const winOptions = 1


document.querySelector('#userId').innerHTML = currentUser

// Places and X or and O based on who the current use is
function placeChoice(id) {
    if (currentUser === 0) {
        board[id] = currentUser;
        document.querySelector(`#block_${id}`).innerHTML = 'X';
    } else {
        board[id] = currentUser;
        document.querySelector(`#block_${id}`).innerHTML = 'O';

    }
    console.log(board)
    checkWinState();
}

// Wipes the board clean of markers
function resetBoard() {

    for (let i = 0; i < 9; i++) {
        document.querySelector(`#block_${i}`).innerHTML = '';
        board[i] = ''
    }
}
// Changes the current user
function changeUser() {
    switch (currentUser) {
        case 0:
            currentUser = 1;
            break;

        case 1:
            currentUser = 0;
            break;
    }

    document.querySelector('#userId').innerHTML = currentUser;
}

let passedArray = [a = 1, b = 2, c = 3];

let check = function (a, b, c = '') {
    let array = [...passedArray];
    array.forEach((index) => console.log(index));

    for (let i = 0; i < array.length; i++) {
        if (array[i] !== passedArray[i]) return false;
    }
    return true;
}

// Check whether the game has been won
function checkWinState() {
    // Horizontal Win Conditions
    if ((board[0] === currentUser &&
        board[1] === currentUser &&
        board[2] === currentUser) ||

        (board[3] === currentUser &&
            board[4] === currentUser &&
            board[5] === currentUser) ||

        (board[6] === currentUser &&
            board[7] === currentUser &&
            board[8] === currentUser) ||
        // Vertical Win Conditions
        (board[0] === currentUser &&
            board[3] === currentUser &&
            board[6] === currentUser) ||

        (board[1] === currentUser &&
            board[4] === currentUser &&
            board[7] === currentUser) ||

        (board[2] === currentUser &&
            board[5] === currentUser &&
            board[8] === currentUser) ||
        // Diagonal Win Conditions
        (board[0] === currentUser &&
            board[4] === currentUser &&
            board[8] === currentUser) ||

        (board[2] === currentUser &&
            board[4] === currentUser &&
            board[6] === currentUser)) {
        console.log('You Win!')
    }
    ;
}

console.log(check(2, 3, 4));
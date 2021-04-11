let currentUser = 0


document.querySelector('#userId').innerHTML = currentUser


function placeChoice(id) {
    if (currentUser === 0) {
        document.querySelector(`#${id}`).innerHTML = 'X'
    } else {
        document.querySelector(`#${id}`).innerHTML = 'O'

    }
}

function resetBoard() {

    for (let i = 0; i < 9; i++) {
        document.querySelector(`#block_${i}`).innerHTML = ''
    }
}

function changeUser() {
    switch (currentUser) {
        case 0:
            currentUser = 1;
            break;

        case 1:
            currentUser = 0;
            break;
    }

    document.querySelector('#userId').innerHTML = currentUser
}
import React from 'react';

function Board() {
    return (
        <div class="play-area" id="play-area">
            <div id="block_0" class="block" onclick="placeChoice('0')"></div>
            <div id="block_1" class="block" onclick="placeChoice('1')"></div>
            <div id="block_2" class="block" onclick="placeChoice('2')"></div>
            <div id="block_3" class="block" onclick="placeChoice('3')"></div>
            <div id="block_4" class="block" onclick="placeChoice('4')"></div>
            <div id="block_5" class="block" onclick="placeChoice('5')"></div>
            <div id="block_6" class="block" onclick="placeChoice('6')"></div>
            <div id="block_7" class="block" onclick="placeChoice('7')"></div>
            <div id="block_8" class="block" onclick="placeChoice('8')"></div>
        </div>
    )
}

export default Board;
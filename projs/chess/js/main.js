'use strict'

// Pieces Types
const PAWN_BLACK = '♟';
const ROOK_BLACK = '♜';
const KNIGHT_BLACK = '♞';
const BISHOP_BLACK = '♝';
const QUEEN_BLACK = '♛';
const KING_BLACK = '♚';
const PAWN_WHITE = '♙';
const ROOK_WHITE = '♖';
const KNIGHT_WHITE = '♘';
const BISHOP_WHITE = '♗';
const QUEEN_WHITE = '♕';
const KING_WHITE = '♔';

// The Chess Board
var gBoard;
var gSelectedElCell = null;

function restartGame() {
    gBoard = buildBoard();
    renderBoard(gBoard);
}

function buildBoard() {
    var board = [];
    // build the board 8 * 8
    for (var i = 0; i < 8; i++) {
        board[i] = [];
        for (var j = 0; j < 8; j++) {
            var piece = '';
            if (i === 1) piece = PAWN_BLACK;
            if (i === 6) piece = PAWN_WHITE;
            board[i][j] = piece;
        }
    }
    board[0][0] = board[0][7] = ROOK_BLACK;
    board[0][1] = board[0][6] = KNIGHT_BLACK;
    board[0][2] = board[0][5] = BISHOP_BLACK;
    board[0][3] = QUEEN_BLACK;
    board[0][4] = KING_BLACK;

    board[7][0] = board[7][7] = ROOK_WHITE;
    board[7][1] = board[7][6] = KNIGHT_WHITE;
    board[7][2] = board[7][5] = BISHOP_WHITE;
    board[7][3] = QUEEN_WHITE;
    board[7][4] = KING_WHITE;

    // console.table(board);
    return board;

}

function renderBoard(board) {
    var strHtml = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var cell = row[j];
            // figure class name
            var className = ((i + j) % 2 === 0) ? 'white' : 'black';
            var tdId = 'cell-' + i + '-' + j;
            strHtml += '<td id="' + tdId + '" onclick="cellClicked(this)"' +
                'class="' + className + '">' + cell + '</td>';
        }
        strHtml += '</tr>';
    }
    var elMat = document.querySelector('.game-board');
    elMat.innerHTML = strHtml;
}

function cellClicked(elCell) {
    // console.log('elCell', elCell)
    // if the target is marked - move the piece!

    if (elCell.classList.contains('mark')) {
        console.log('move!')
        cleanBoard()
        movePiece(gSelectedElCell, elCell)
        return
    }

    cleanBoard();

    elCell.classList.add('selected');
    gSelectedElCell = elCell;

    // console.log('elCell.id: ', elCell.id);
    var cellCoord = getCellCoord(elCell.id); // 'cell-3-5' => {i:3 ,j:5}
    // console.log('cellCoord', cellCoord);
    var piece = gBoard[cellCoord.i][cellCoord.j];
    // console.log('piece', piece)

    var possibleCoords = [];
    switch (piece) {
        case ROOK_BLACK:
        case ROOK_WHITE:
            possibleCoords = getAllPossibleCoordsRook(cellCoord);
            break;
        case BISHOP_BLACK:
        case BISHOP_WHITE:
            possibleCoords = getAllPossibleCoordsBishop(cellCoord);
            break;
        case KNIGHT_BLACK:
        case KNIGHT_WHITE:
            possibleCoords = getAllPossibleCoordsKnight(cellCoord);
            break;
        case PAWN_BLACK:
        case PAWN_WHITE:
            possibleCoords = getAllPossibleCoordsPawn(cellCoord, piece === PAWN_WHITE);
            break;

    }
    markCells(possibleCoords);
}

function movePiece(elFromCell, elToCell) {
    // console.log('elFromCell', elFromCell)
    // console.log('elToCell', elToCell)
    // use: getCellCoord to get the coords, move the piece
    var fromCoord = getCellCoord(elFromCell.id) // cell-1-3 => {i:1 , j:3}
    var toCoord = getCellCoord(elToCell.id)

    // update the MODEl, gBoard
    var piece = gBoard[fromCoord.i][fromCoord.j]
    console.log('piece', piece)
    gBoard[toCoord.i][toCoord.j] = piece;
    gBoard[fromCoord.i][fromCoord.j] = '';
    console.table(gBoard)

    // update the DOM , <table></table>
    elFromCell.innerText = '';
    elToCell.innerText = piece;
}

function markCells(coords) {
    // console.log('coords', coords)
    // query select them one by one and add mark 
    for (var i = 0; i < coords.length; i++) {
        var coord = coords[i];
        // console.log('coord', coord)
        var selector = getSelector(coord) // {i:2 , j:0} => '#cell-2-0'
        var elCell = document.querySelector(selector); // <td></td>
        // console.log('elCell', elCell)
        elCell.classList.add('mark')
    }

}

function cleanBoard() {
    var elTds = document.querySelectorAll('.mark, .selected');
    for (var i = 0; i < elTds.length; i++) {
        elTds[i].classList.remove('mark', 'selected');
    }
}

// Gets a string such as: 'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var coord = {};
    var parts = strCellId.split('-');
    coord.i = +parts[1]
    coord.j = +parts[2];
    return coord;
}

// Gets an object such as: {i:2, j:7} and returns '#cell-2-7'
function getSelector(coord) {
    return '#cell-' + coord.i + '-' + coord.j
}

function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j] === ''
}

function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
    // console.log('pieceCoord', pieceCoord)
    // console.log('isWhite', isWhite)
    // handle PAWN use isEmptyCell()
    var res = [];
    var diff = (isWhite) ? -1 : 1;
    var nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
    // console.log('nextCoord', nextCoord);
    if (isEmptyCell(nextCoord)) res.push(nextCoord)

    if (pieceCoord.i === 1 && !isWhite || pieceCoord.i === 6 && isWhite) {
        diff *= 2;
        var nextCoord = { i: pieceCoord.i + diff, j: pieceCoord.j };
        // console.log('nextCoord', nextCoord);
        if (isEmptyCell(nextCoord)) res.push(nextCoord)
    }
    // console.log('res', res)
    return res;
}

function getAllPossibleCoordsRook(pieceCoord) {
    var res = [];

    return res;
}

function getAllPossibleCoordsBishop(pieceCoord) {
    var res = [];
    var i = pieceCoord.i - 1;
    for (var idx = pieceCoord.j + 1; i >= 0 && idx < 8; idx++) {
        var coord = { i: i--, j: idx };
        if (!isEmptyCell(coord)) break;
        res.push(coord);
    }
    return res;
}

function getAllPossibleCoordsKnight(pieceCoord) {
    var res = [];

    return res;
}

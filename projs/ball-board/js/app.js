const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GAMER = 'GAMER';

const GAMER_IMG = '<img src="img/gamer.png">';
const BALL_IMG = '<img src="img/ball.png">';

// Model:
var gBoard;
var gGamerPos;

function initGame() {
	gGamerPos = { i: 2, j: 9 };
	// console.log('gGamerPos', gGamerPos)
	gBoard = buildBoard();
	renderBoard(gBoard);

}

function buildBoard() {
	// Create the Matrix 10 * 12 
	var board = createMat(10, 12);
	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var cell = { type: FLOOR, gameElement: null };

			if (i === 0 || i === board.length - 1
				|| j === 0 || j === board[0].length - 1) {
				cell.type = WALL
			}
			board[i][j] = cell
		}
	}
	// Place the gamer and two balls
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	board[2][5].gameElement = BALL
	board[7][4].gameElement = BALL

	// console.log(board)
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j }) // cell-0-1

			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += '\t<td class="cell ' + cellClass +
				'"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	// console.log('strHTML is:');
	// console.log(strHTML);
	var elBoard = document.querySelector('.board');
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {
	// console.log('i', i)
	// console.log('j', j)

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) ||
		(jAbsDiff === 1 && iAbsDiff === 0)) {
		// console.log('MOVE', iAbsDiff, jAbsDiff);

		if (targetCell.gameElement === BALL) {
			console.log('Collecting!');
		}

		// Moving from current position:
		// Model:
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Dom:
		renderCell(gGamerPos, '')

		// Moving to selected position:
		// Model:
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER
		// Dom:
		renderCell(gGamerPos, GAMER_IMG)

	}
	// else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location) // '.cell-1-2'
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {
	console.log('event.key', event.key)
	var i = gGamerPos.i;
	var j = gGamerPos.j;

	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;
	}
}

// Returns the class name for a specific cell
// {i:4 , j:5} => cell-4-5
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}


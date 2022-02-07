'use strict'

var gProjs;
const STORAGE_KEY = 'projsDB'
_createProjs()



function getProjsForDisplay(){    
    return gProjs
}

function addProj(name, title, desc, url, publishedAt, labels){   
    const proj = _createProj(name, title, desc, url, publishedAt, labels)
    gProjs.unshift(proj)
    _saveProjsToStorage()
}

function _createProj(name, title, desc, url, publishedAt, labels){
    let proj = {
        id:_makeId(),
        name,
        title,
        desc,
        url,
        publishedAt,
        labels
    }
    return proj
}

function _createProjs(){
    // gProjs = loadFromStorage(STORAGE_KEY)
    
    // if(!gProjs || !gProjs.length){
        gProjs = [
            _createProj('Minesweeper','Board game', 'lorem ipsum lorem ipsum lorem ipsum', '/projs/minesweeper/index.html', 1643666400000, ['Matrixes', 'keyboard events','Games']),
            _createProj('In-Picture Game','Important Software', 'lorem ipsum lorem ipsum lorem ipsum', '/projs/picture/index.html', 1644451325000, ['Matrixes', 'keyboard events','Software']),
            _createProj('Touch Nums','Board game', 'lorem ipsum lorem ipsum lorem ipsum', '/projs/touch-nums/index.html', 1644244579510, ['Matrixes', 'keyboard events','Games']),
            _createProj('Ball Board','Board game', 'lorem ipsum lorem ipsum lorem ipsum', '/projs/ball-board/index.html', 1644244587084, ['Matrixes', 'keyboard events','Games']),
            _createProj('Chess','Board game', 'lorem ipsum lorem ipsum lorem ipsum', '/projs/chess/index.html', 1644244593129, ['Matrixes', 'keyboard events','Games']),
            _createProj('Todos','Important Software', 'lorem ipsum lorem ipsum lorem ipsum', '/projs/todos/index.html', 1644244600166, ['Matrixes', 'keyboard events','Software']),
            _createProj('Books Shop','Important Software', 'lorem ipsum lorem ipsum lorem ipsum', '/projs/bookShop/index.html', 1644244607124, ['Matrixes', 'keyboard events','Software'])
        ]
    //}
    
    _saveProjsToStorage()
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(var i=0; i < length; i++)    {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveProjsToStorage(){
    saveToStorage(STORAGE_KEY, gProjs)
}


//more functions 

// function removeBook(bookId){
//     let idx = gBooks.findIndex(book=>book.id==bookId)    
//     gBooks.splice(idx,1)
//     _saveBooksToStorage()
// }


// function updateBook(idxBook, bookId, elTitle, elPrice, elImg, elRate){
//     let cuuBook = {
//         id: bookId,
//         name: elTitle.value,
//         price: elPrice.value,
//         imgUrl: elImg.value,
//         rate: elRate.value
//     }

//     // console.log('cuuBook', cuuBook);
//     gBooks.splice(idxBook,1,cuuBook)
//     _saveBooksToStorage()
// }
'use strict'

var gBooks;
const STORAGE_KEY = 'booksDB'
const PAGE_SIZE = 5
var gPageIdx = 0
_createBooks()

function setNextPage() {
    gPageIdx++
    if (gPageIdx * PAGE_SIZE >= gBooks.length) {
      gPageIdx = 0
    }
  }

function getBooksForDisplay(){
    var books = gBooks
    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)
    return books
}

function getAllBoks(){
    return gBooks
}

function removeBook(bookId){
    let idx = gBooks.findIndex(book=>book.id==bookId)    
    gBooks.splice(idx,1)
    _saveBooksToStorage()
}

function addBook(elTitle, elPrice, elImg, elRate){
    
    // console.log('book', book);
    const book = _createBook(elTitle, elPrice, elImg, elRate)
    gBooks.unshift(book)
    _saveBooksToStorage()
}

function updateBook(idxBook, bookId, elTitle, elPrice, elImg, elRate){
    let cuuBook = {
        id: bookId,
        name: elTitle.value,
        price: elPrice.value,
        imgUrl: elImg.value,
        rate: elRate.value
    }

    // console.log('cuuBook', cuuBook);
    gBooks.splice(idxBook,1,cuuBook)
    _saveBooksToStorage()
}

function _createBook(elTitle, elPrice, elImg, elRate){
    let book = {
        id:_makeId(),
        name: elTitle,
        price:Number(elPrice),
        imgUrl:elImg,
        rate: Number(elRate)
    }
    return book
}

function _createBooks(){
    gBooks = loadFromStorage(STORAGE_KEY)
    
    if(!gBooks || !gBooks.length){
        gBooks = [
            _createBook('Harri', 20, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzqBo8K2LeAqRsL2ucyQIysBX9BGF1IGhspI0DFo1MxLWoi9_vftFqOj_bX6jdrbANmJs&usqp=CAU',0),
            _createBook('mari', 50, 'https://d3tvwjfge35btc.cloudfront.net/Assets/79/324/L_p0015132479.jpg',0),
            _createBook('kary', 70, 'https://i.pinimg.com/originals/ff/6d/08/ff6d080b2700b10eb62bda21b592d16d.png',0)
        ]
    }
    
    _saveBooksToStorage()
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(var i=0; i < length; i++)    {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _saveBooksToStorage(){
    saveToStorage(STORAGE_KEY, gBooks)
}
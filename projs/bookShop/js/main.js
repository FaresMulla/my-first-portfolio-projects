'use strict'

var gSortClick = 0

function onInit(){
    // console.log('ready');
    renderBooks()
}

function onRemoveBook(bookId){
    // console.log('removing book', bookId);
    removeBook(bookId)
    renderBooks()
}

function renderBooks (){
    const books = getBooksForDisplay()
    var strHtml = books.map(book => `
    <tr>
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${book.price}$</td>
                <td>${book.rate}</td>
                <td>
                    <button onclick="onReadBook(event, '${book.id}')">Read</button>
                    <button onclick="onOpenModalUpdate(event, '${book.id}')">Update</button>
                    <button onclick="onRemoveBook('${book.id}')">Delete</button>
                </td>
            </tr>
    `)
    
    document.querySelector('.booksList').innerHTML = strHtml.join('')

}

function onReadBook(ev, bookId){
    ev.stopPropagation();
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    // console.log('bookId', bookId);
    
    const bookObj = gBooks.find(book=>book.id==bookId)
    // console.log('bookObj', bookObj);

    elModal.innerHTML = `
    <h1 class="bookTitle">${bookObj.name}</h1>        
        <h2>price: ${bookObj.price}</h2>

        <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores praesentium animi ad eius, aperiam commodi dignissimos vel soluta hic labore voluptas reiciendis totam deleniti quos eos officia possimus harum repellat porro accusamus alias! Quod eius, laborum asperiores alias adipisci commodi quia veniam, sed autem atque dolores animi velit hic. Nostrum?
        </p>
        <img src="${bookObj.imgUrl}" alt="${bookObj.name} book cover pictuer">
        <hr>
        <button onclick="closeModal()" class="closeModalBtn">Close</button>
    `
    
}

function closeModal(){
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    // location.reload();
}

function onOpenModalAdd(){
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'block'

    elModal.innerHTML = `
    <div class="addBook">
        <h2>Add New Book</h2>
        <input type="text" name="title" placeholder="book title" class="title">
        <input type="number" name="price" placeholder="book price" class="price">
        <input type="text" name="imgUrl" placeholder="img url" class="imgUrl">
        
        <div class="rateDiv">
        <button onclick="minusOne()">➖</button>
        <input class="rateInput" min="0" max="9" type="number" name="rateNum" value="0">
        <button onclick="addOne()">➕</button>
        </div>
        <hr>

        <button class="addButton" onclick="onAddBook()">Add</button>
        <button onclick="closeModal()" class="closeModalBtn">close</button>
        
    </div>
    
    `
}

function onAddBook(){
    
    let elTitle = document.querySelector('input[name=title]')
    let elPrice = document.querySelector('input[name=price]')
    let elImg = document.querySelector('input[name=imgUrl]')
    let elRate = document.querySelector('input[name=rateNum]')

    addBook(elTitle.value, elPrice.value, elImg.value, elRate.value)
    renderBooks()

    elTitle.value='',
    elPrice.value= null,
    elImg.value=''
    elRate.value = 0
    // console.log('elTitle', elTitle.value);


}

function onOpenModalUpdate(ev, bookId){
    ev.stopPropagation();
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    // console.log('bookId', bookId);
    
    const bookObj = gBooks.find(book=>book.id==bookId)
    // console.log('bookObj', bookObj);
    
    
    

    elModal.innerHTML = `
    <div class="addBook">
        <h2>Update Book - ${bookObj.name}</h2>
        <input type="text" name="title" placeholder="book title" class="title" value="${bookObj.name}">
        <input type="number" name="price" placeholder="book price" class="price" value="${bookObj.price}">
        <input type="text" name="imgUrl" placeholder="img url" class="imgUrl" value="${bookObj.imgUrl}">

        <div class="rateDiv">
        <button onclick="minusOne()">➖</button>
        <input class="rateInput" min="0" max="9" type="number" name="rateNum" value="${bookObj.rate}">
        <button onclick="addOne()">➕</button>
        </div>

        <button class="addButton" onclick="onUpdateBook(event,'${bookObj.id}')">Update</button>
        <button onclick="closeModal()" class="closeModalBtn">close</button>
    </div>    
    `
    
}

function onUpdateBook (ev, bookId){
    ev.stopPropagation();
    const elModal = document.querySelector('.modal')

    // console.log(bookId);
    let idxBook = gBooks.findIndex(book=>book.id==bookId)

    let elTitle = document.querySelector('input[name=title]')    
    let elPrice = document.querySelector('input[name=price]')     
    let elImg = document.querySelector('input[name=imgUrl]')
    let elRate = document.querySelector('input[name=rateNum]')
    

    updateBook(idxBook, bookId, elTitle, elPrice, elImg, elRate)
    elModal.innerHTML = `
    <h1>Update Done</h1>
    <button onclick="closeModal()" class="closeModalBtn">close</button>
    `
    renderBooks()

}

function minusOne(){
    let elRate = document.querySelector('input[name=rateNum]')
    let newRate = Number(elRate.value)
    newRate--
    if(newRate===-1)return
    elRate.value = Number(newRate)

}

function addOne(){
    let elRate = document.querySelector('input[name=rateNum]')
    // console.log(elRate.value);
    let newRate = Number(elRate.value)
    newRate++
    if(newRate===11)return
    elRate.value = Number(newRate)

}

function sortByPrice(){
    var books = getAllBoks()
    if (gSortClick===0){
        books.sort((a,b)=>a.price - b.price)
        gSortClick = 1
    }else{
        books.sort((a,b)=>b.price - a.price)
        gSortClick = 0
    }    
    
    renderBooks()
}

function sortByRate(){
    var books = getAllBoks()
    if (gSortClick===0){
        books.sort((a,b)=>a.rate - b.rate)
        gSortClick = 1
    }else{
        books.sort((a,b)=>b.rate - a.rate)
        gSortClick = 0
    }
    
    renderBooks()
}

function sortByTitle(){
    var books = getAllBoks()
    if (gSortClick===0){
        books.sort((a,b)=>{
            if(a.name < b.name) return-1
            return 1
        })
        gSortClick = 1
    }else{
        books.sort((a,b)=>{
            if(b.name < a.name) return-1
            return 1
        })
        gSortClick = 0
    }
    
    renderBooks()
}


function onNextPage() {
    setNextPage()
    renderBooks()
}

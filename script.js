const sideCollar = document.querySelector('.side-collar');
const side = document.querySelector('.side');
const bookDisplay = document.querySelector('.book-display');

//Form input elements
const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const genreInput = document.querySelector('#genre');
const summaryInput = document.querySelector('#summary');
const addBookButton = document.querySelector('#add-book-button')

let library = [];

let Book = function(title, author, pages, genre, summary, read){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.genre = genre,
    this.summary = summary,
    this.read = read
}

let newBook = new Book('The Hunters', 'Jim', 256, 'Horror', 'Really scary', false);    



function createBookFromForm(){
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let genre = genreInput.value;
    let summary = summaryInput.value;
    
    let newBook = new Book(title, author, pages, genre, summary, false);

    addBookToLibrary(newBook);
}

function addBookToLibrary(book){
    library.push(book);
}

function removeBookFromlibrary(index){
    /*  let index = library.findIndex((item) =>{
        item === book;
    }); */
    
    library.splice(index, 1);
}

function clearForm(){
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    genreInput.value = '';
    summaryInput.value = '';
}

//Display books on page
function displayBooks(){

    library.forEach((book)=>{
        bookDisplay.appendChild(createBookElement(book))
    })

}

function createBookElement(book){
    let bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    let title = document.createElement('div');
    title.classList.add('book-title');
    title.textContent = book.title;

    let author = document.createElement('div');
    author.classList.add('book-author');
    author.textContent = 'by '+book.author;

    let pages = document.createElement('div');
    pages.classList.add('book-pages');
    pages.textContent = book.pages;

    let genre = document.createElement('div');
    genre.classList.add('book-genre');
    genre.textContent = book.genre;

    let summary = document.createElement('div');
    summary.classList.add('book-summary');
    summary.textContent = book.summary;

    bookDiv.appendChild(title);
    bookDiv.appendChild(author);
    bookDiv.appendChild(pages);
    bookDiv.appendChild(genre);
    bookDiv.appendChild(summary);

    return bookDiv;
}

//This prevents the form from submitting
//but keeps form validation, so we'll use this
//instead of a click event on the button
form.addEventListener('submit', (e)=>{
    e.preventDefault();

    createBookFromForm();

    displayBooks();

    //Clear form and collapse side panel
    clearForm();
})


sideCollar.addEventListener('click', ()=>{
    side.classList.toggle('active');
})
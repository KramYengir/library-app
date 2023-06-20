const sideCollar = document.querySelector('.side-collar');
const side = document.querySelector('.side');
const addBookButton = document.querySelector('#add-book-button')
const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const genreInput = document.querySelector('#genre');
const summaryInput = document.querySelector('#summary');

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

//This prevents the form from submitting
//but keeps form validation, so we'll use this
//instead of a click event on the button
form.addEventListener('submit', (e)=>{
    e.preventDefault();

    createBookFromForm();

    //Clear form and collapse side panel
    clearForm();
})


sideCollar.addEventListener('click', ()=>{
    side.classList.toggle('active');
})
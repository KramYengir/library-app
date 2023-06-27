const sideCollar = document.querySelector('.side-collar');
const side = document.querySelector('.side');
const bookDisplay = document.querySelector('.book-display');
const bookCount = document.querySelector('.count-span');
const readCount = document.querySelector('.read-span');
const unreadCount = document.querySelector('.unread-span');


const sortOption = document.querySelector('select');

//Form input elements
const form = document.querySelector('form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const genreInput = document.querySelector('#genre');
const summaryInput = document.querySelector('#summary');
const addBookButton = document.querySelector('#add-book-button')
const loadBooksButton = document.querySelector('#load-button')


let library = [];

let Book = function(title, author, pages, genre, summary, read){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.genre = genre,
    this.summary = summary,
    this.read = read
}

Book.prototype.changeReadStatus = function(){
    this.read = !this.read;
}

function createBookFromForm(){
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let genre = genreInput.value;
    let summary = summaryInput.value;
    
    let newBook = new Book(title, author, pages, genre, summary, false);

    addBookToLibrary(newBook);
    /* addBookToDisplay(createBookElement(newBook)); */

    refreshBookDisplay();
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

function refreshBookDisplay(){

    while(bookDisplay.hasChildNodes()){
        bookDisplay.firstChild.remove();
    }

    let sortedLibrary;

    //determine if sorting is needed
    switch(sortOption.value){
        case 'none':
            sortedLibrary = library;
            break;
        case 'ascending':
            sortedLibrary = library.sort( (a,b)=>{
                return a.title.localeCompare(b.title);
            });
            break;
        case 'descending':
            sortedLibrary = library.sort( (a,b)=>{
                return -1 * a.title.localeCompare(b.title);
            });
            break;
        case 'shortest':
            sortedLibrary = library.sort( (a,b)=>{
            return a.pages - b.pages;
            });
            break;
        case 'longest':
            sortedLibrary = library.sort( (a,b)=>{
            return b.pages - a.pages;
        });
        break;
        default:
            sortedLibrary = library;
    }

    sortedLibrary.forEach((book) =>{
        let bookElement = createBookElement(book);
        bookDisplay.appendChild(bookElement);
    })

    refreshStats();
}

function refreshStats(){
    bookCount.textContent = `${library.length}`;
    readCount.textContent = `${library.filter((book) => book.read).length}`;
    unreadCount.textContent = `${library.filter((book) => !book.read).length}`;

}


function createBookElement(book){
    let bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

    let bookTopDiv = document.createElement('div');
    bookTopDiv.classList.add('book-top')

    let title = document.createElement('div');
    title.classList.add('book-title');
    title.textContent = book.title;

    let removeButton = document.createElement('button');
    removeButton.classList.add('remove-button');
    removeButton.textContent = 'X';
    removeButton.addEventListener('click', () =>{
       if(confirm('Are you sure?')){
        let index = removeButton.parentElement.parentElement.dataset.index;
        removeBookFromDisplay(index);
       }
       else return;
    })

    bookTopDiv.appendChild(title);
    bookTopDiv.appendChild(removeButton);

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

    let readDiv = document.createElement('div');
    readDiv.classList.add('read-div');
    if(!book.read){
        readDiv.classList.add('unread');
    }
    readDiv.textContent = getBookReadStatus(book);
    readDiv.addEventListener('click', ()=>{
        book.changeReadStatus();
        readDiv.classList.toggle('unread');
        readDiv.textContent = getBookReadStatus(book);
        refreshStats();
    })

    bookDiv.appendChild(bookTopDiv);
    bookDiv.appendChild(author);
    bookDiv.appendChild(pages);
    bookDiv.appendChild(genre);
    bookDiv.appendChild(summary);
    bookDiv.appendChild(readDiv);
    bookDiv.dataset.index = library.indexOf(book);

    return bookDiv;
}
function getBookReadStatus(book){
    if(book.read){
        return 'Read'
    }
    else return 'Unread';
}
function loadExampleLibrary(amount = 6){
    for(let i=0; i<amount; i++){
        let newBook = new Book('Jumanji', 'Dave Batista', 256, 'Comedy', 
                                'Madcap comedy about a bunch of mad animals running around the place',
                                false);
        library.push(newBook);
    }

    refreshBookDisplay();
    toggleEmptyLibraryImg();
}

function sortAlphabetically(display){
    library.sort();
    refreshBookDisplay();
}

function toggleEmptyLibraryImg(){
    if((library.length == 0) && !side.classList.contains('active')){
        bookDisplay.classList.add('empty');
    }
    else{
        bookDisplay.classList.remove('empty');
    }
}

function removeBookFromDisplay(index){
    removeBookFromlibrary(index);
    refreshBookDisplay();
}

//This prevents the form from submitting
//but keeps form validation, so we'll use this
//instead of a click event on the button
form.addEventListener('submit', (e)=>{
    e.preventDefault();

    createBookFromForm();

    //Clear form 
    clearForm();

    //Collapse form
    side.classList.toggle('active');
})

sortOption.addEventListener('click', refreshBookDisplay);

sideCollar.addEventListener('click', ()=>{
    side.classList.toggle('active');
    toggleEmptyLibraryImg();
})

loadBooksButton.addEventListener('click', (e)=>{
    e.preventDefault();
    loadExampleLibrary();
    //Collapse form
    side.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function() {
    toggleEmptyLibraryImg();
  });
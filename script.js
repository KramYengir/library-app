const sideCollar = document.querySelector('.side-collar');
const side = document.querySelector('.side');

let library = [];

let Book = function(title, author, pages, genre, summary, read){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.genre = genre,
    this.summary = summary,
    this.read = read
}

let newBook = new Book('The Hunters', 'Jim', 256, 
                        'Horror', 'Really scary', false);


function addBookToLibrary(book){
    library.push(book);
}

function removeBookFromlibrary(book){
    let index = library.findIndex((item) =>{
        item === book;
    });

    library.splice(index, 1);
}

sideCollar.addEventListener('click', ()=>{
    side.classList.toggle('active');
})
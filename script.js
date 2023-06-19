const sideCollar = document.querySelector('.side-collar');
const side = document.querySelector('.side');

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


sideCollar.addEventListener('click', ()=>{
    side.classList.toggle('active');
})
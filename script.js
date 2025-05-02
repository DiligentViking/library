const bookContainer = document.querySelector(".book-container");

const myLibrary = [];

function Book(id, title, author, genre, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, genre, pages, read) {
  const uuid = crypto.randomUUID();
  const book = new Book(uuid, title, author, genre, pages, read);
  myLibrary.push(book);
}

function displayBook(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');

  const bookHeader = document.createElement('div');
  bookHeader.classList.add('book-header');

  const title = document.createElement('h3');
  title.classList.add('title');
  title.textContent = book.title;

  const btnDelete = document.createElement('button');
  btnDelete.classList.add('btn-delete');
  btnDelete.textContent = '✖️';

  bookHeader.append(title, btnDelete);

  const author = document.createElement('h2');
  author.classList.add('author');
  author.textContent = book.author;

  const genre = document.createElement('p');
  genre.classList.add('genre');
  author.textContent = book.genre;
  
  const pages = document.createElement('p');
  pages.classList.add('pages');
  pages.textContent = 'Number of pages: ' + book.pages;

  const btnRead = document.createElement('button');
  btnRead.classList.add('btn-read');
  btnRead.textContent = (book.read) ? 'Read' : 'Not read yet';

  bookCard.append(bookHeader, author, genre, pages, btnRead);
  
  bookContainer.append(bookDiv);
}

function displayLibrary() {
  bookContainer.textContent = '';
  myLibrary.forEach((book) => {
    displayBook(book);
  })
}

addBookToLibrary('1984', 'George Orwell', 'dystopia', 328, false);

displayLibrary();

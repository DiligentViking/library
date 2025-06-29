const bookContainer = document.querySelector('.book-container');
const btnAddBook = document.querySelector('.btn-add-book');
const bookModal = document.querySelector('.book-modal');
const btnCancel = document.querySelector('.btn-cancel');
const btnConfirm = document.querySelector('.btn-confirm');
const bookForm = document.querySelector('.book-form');

const myLibrary = [];

class Book {
  constructor(id, title, author, genre, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.pages = pages;
    this.read = read;
  }
}

function addBookToLibrary(title, author, genre, pages, read) {
  const uuid = crypto.randomUUID();
  const book = new Book(uuid, title, author, genre, pages, read);
  myLibrary.push(book);
}

function displayBook(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  bookCard.setAttribute('data-id', book.id);

  const bookHeader = document.createElement('div');
  bookHeader.classList.add('book-header');

  const title = document.createElement('h2');
  title.classList.add('title');
  title.textContent = book.title;

  const btnDelete = document.createElement('button');
  btnDelete.classList.add('btn-delete');
  btnDelete.textContent = '✖️';

  bookHeader.append(title, btnDelete);

  const author = document.createElement('h3');
  author.classList.add('author');
  author.textContent = book.author;

  const genre = document.createElement('p');
  genre.classList.add('genre');
  genre.textContent = book.genre;
  
  const pages = document.createElement('p');
  pages.classList.add('pages');
  pages.textContent = 'Number of pages: ' + book.pages;

  const btnRead = document.createElement('button');
  btnRead.classList.add('btn-read');
  btnRead.setAttribute('data-read', book.read);
  btnRead.textContent = (book.read) ? '🤓Read!' : '🫥Not read yet';

  bookCard.append(bookHeader, author, genre, pages, btnRead);
  
  bookContainer.append(bookCard);
}

function displayLibrary() {
  bookContainer.textContent = '';
  myLibrary.forEach((book) => {
    displayBook(book);
  })
}

addBookToLibrary('1984', 'George Orwell', 'dystopia', 328, true);
addBookToLibrary('The Emerald Enigma', 'Paul Regnier', 'sci-fi', 151, true);
addBookToLibrary('Macbeth', 'William Shakespeare', 'tragedy', 80, false);
addBookToLibrary('The Hobbit', 'JRR Tolkien', 'fantasy', 314, false);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 'American', 290, true);
addBookToLibrary('The Iron Gauntlet', 'Paul Regnier', 'sci-fi', 244, false);

// displayBook(myLibrary[0]);  // this works
displayLibrary();


btnAddBook.addEventListener('click', () => {
  bookModal.showModal();  // have this instead of show()
});

btnCancel.addEventListener('click', (e) => {
  e.preventDefault();  // i have this instead of a formmethod="dialog" in the html
  bookModal.close();  // closeModal() is not a function for some reason
});

bookForm.addEventListener('submit', (e) => {
  if (!bookForm.checkValidity()) {
    return;  // beautiful. ty, Alessandro.
  }

  e.preventDefault();

  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  const genre = document.querySelector('#genre');
  const pages = document.querySelector('#pages');
  const read = document.querySelector('#read');

  addBookToLibrary(title.value, author.value, genre.value, pages.value, read.checked);

  title.value = '';
  author.value = '';
  genre.value = '';
  pages.value = '';
  read.checked = false;

  const bookToDisplay = myLibrary[myLibrary.length - 1];
  displayBook(bookToDisplay);

  bookModal.close();
});

bookContainer.addEventListener('click', (e) => {
  const targetClass = e.target.classList.value;
  let cardId;  // number of parentNode's in chain may vary if structure is modified
  let bookIndex;  // now this does not very so i do repeat myself below
  switch (targetClass) {
    case 'btn-delete':
      cardId = e.target.parentNode.parentNode.dataset.id;
      bookIndex = myLibrary.findIndex((book) => book.id == cardId);
      myLibrary.splice(bookIndex, 1);
      bookContainer.removeChild(e.target.parentNode.parentNode);
      break;
      
    case 'btn-read':
      cardId = e.target.parentNode.dataset.id;
      bookIndex = myLibrary.findIndex((book) => book.id == cardId);
      myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
      const isRead = myLibrary[bookIndex].read;
      e.target.setAttribute('data-read', isRead);
      // console.log(e.target);
      e.target.textContent = (myLibrary[bookIndex].read) ? '🤓Read!' : '🫥Not read yet';
      break;
  }
});

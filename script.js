const myLibrary = [];

function Book(title, author, genre, numPages, id) {  // I am kind of unsure why TOP wants the params in the second func
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.numPages = numPages;
  this.id = id;
}

function addBookToLibrary(title, author, genre, numPages) {
  const uuid = self.crypto.randomUUID();
  const book = new Book(title, author, genre, numPages, uuid);
  myLibrary.push(book);
}

addBookToLibrary('The Guide', 'Brian Brendon', 'Self-Help', 100);
addBookToLibrary('Macbeth', 'William Shakespeare', 'Tragedy', 80);
console.log(myLibrary);


const tableData = document.querySelector('#table-data');

for (const book of myLibrary) {
  const newRow = document.createElement('tr');

  const dataTitle = document.createElement('th');
  dataTitle.textContent = book.title;
  newRow.append(dataTitle);
  for (const prop in book) {
    if (prop == 'title') continue;
    const dataOther = document.createElement('td');
    dataOther.textContent = book[prop];
    newRow.append(dataOther);
  }
  
  tableData.appendChild(newRow);
}


const newBookBtn = document.querySelector('#new-book-btn');
const newBookModal = document.querySelector('#new-book-modal');
const closeModal = document.querySelector('#close-modal');

newBookBtn.addEventListener('click', () => {
  newBookModal.showModal();
});

closeModal.addEventListener('click', () => {
  newBookModal.close();
});

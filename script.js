const myLibrary = [];

function Book(id, title, author, genre, numPages) {  // I am kind of unsure why TOP wants the params in the second func
  this.id = id;
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.numPages = numPages;
}

function addBookToLibrary(title, author, genre, numPages) {
  const uuid = self.crypto.randomUUID();
  const book = new Book(uuid, title, author, genre, numPages);
  myLibrary.push(book);
}

addBookToLibrary('The Guide', 'Brian Brendon', 'self-help', 100);
console.log(myLibrary);

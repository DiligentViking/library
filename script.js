const myLibrary = [];

function Book(title, author, genre, numPages, id) {
  this.title = title;
  this.author = author;
  this.genre = genre;
  this.numPages = numPages;
  this.id = id;
}

Book.prototype.toggleRead = function() {
  if (this.read) {
    this.read = false;
  } else {
    this.read = true;
  }
}

function addBookToLibrary(title, author, genre, numPages) {
  const uuid = self.crypto.randomUUID();
  const book = new Book(title, author, genre, numPages, uuid);
  myLibrary.push(book);
}

function updateLibraryTable() {
  const tableData = document.querySelector('#table-data');

  while (tableData.firstChild) {
    tableData.removeChild(tableData.firstChild);
  }

  for (const book of myLibrary) {
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-id', book.id);

    const dataTitle = document.createElement('th');
    dataTitle.textContent = book.title;
    newRow.appendChild(dataTitle);

    for (const prop in book) {
      if (prop == 'title' || prop == 'read' || !book.hasOwnProperty(prop)) {  // at this point i may as well repeat code for each prop
        continue;
      }
      const dataOther = document.createElement('td');
      dataOther.textContent = book[prop];
      newRow.appendChild(dataOther);
    }

    const dataDel = document.createElement('td');
    const delBtn = document.createElement('button');
    delBtn.setAttribute('data-id', book.id);
    delBtn.textContent = 'Delete';
    dataDel.appendChild(delBtn);
    newRow.appendChild(dataDel);

    const dataToggleRead = document.createElement('td');
    const toggleReadBtn = document.createElement('button');
    toggleReadBtn.setAttribute('data-id', book.id)
    if (book.read) {
      toggleReadBtn.textContent = 'Read: yes';
    } else {
      toggleReadBtn.textContent = 'Read: not yet';
    }
    dataToggleRead.appendChild(toggleReadBtn);
    newRow.appendChild(dataToggleRead);

    tableData.appendChild(newRow);
  }
}

addBookToLibrary('The Guide', 'Brian Brendon', 'Self-Help', 100);
addBookToLibrary('Macbeth', 'William Shakespeare', 'Tragedy', 80);
addBookToLibrary("Roget's Thes.", 'Robert Roget', 'Thesaurus', 202);

updateLibraryTable();


const newBookBtn = document.querySelector('#new-book-btn');
const newBookModal = document.querySelector('#new-book-modal');
const cancelModal = document.querySelector('#cancel-modal');
const submitModal = document.querySelector('#submit-modal');
const newBookInputs = document.querySelectorAll('#new-book-modal input');

newBookBtn.addEventListener('click', () => {
  newBookModal.showModal();
});

cancelModal.addEventListener('click', () => {
  newBookModal.close();
});

submitModal.addEventListener('click', (e) => {
  e.preventDefault();  // so i just set a custom behavior here (beats having to try to learn the dang default behavior)
  const bookSpecs = [];
  for (const input of newBookInputs) {
    bookSpecs.push(input.value);
    input.value = '';
  }
  addBookToLibrary(bookSpecs[0], bookSpecs[1], bookSpecs[2], bookSpecs[3]);
  newBookModal.close();
  updateLibraryTable();
});


const tableData = document.querySelector('#table-data');

tableData.addEventListener('click', (e) => {
  /* console.log(e.target.textContent);  // this actually works!
  console.log(e.target.previousSibling);  // it seems this may have potential */

  // const parentRow = e.target.parentNode.parentNode;  // old way (that worked)
  // tableData.removeChild(parentRow);

  // const btnId = e.target.getAttribute('data-id');  // second old way (also worked)
  // const rowToRemove = document.querySelector(`tr[data-id="${btnId}"]`);
  // tableData.removeChild(rowToRemove);

  if (e.target.textContent == 'Delete') {
    const btnId = e.target.getAttribute('data-id');
    for (const book of myLibrary) {
      if (book.id == btnId) {
        const bookLocation = myLibrary.indexOf(book);
        myLibrary.splice(bookLocation, 1);
      }
    }
    updateLibraryTable();
  } else if (e.target.textContent.slice(0, 4) == 'Read') {  // seems a bit un-DRY
    const btnId = e.target.getAttribute('data-id');
    for (const book of myLibrary) {
      if (book.id == btnId) {
        console.log(book);
        book.toggleRead();
        console.log(book);
      }
    }
    updateLibraryTable();
  }
})

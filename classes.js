class Book {
  constructor(name, author, read) {
    this.name = name;
    this.author = author;
    this.read = read;
  }

  changeReadStatus() {
    this.read = !this.read;
  }
}

class Library {
  myLibrary = [];
  library = document.body.querySelector(".library-grid");

  addBookToLibrary(bookName, author, read) {
    console.log("Add To Display");
    const newBook = new Book(bookName, author, read);
    this.myLibrary.push(newBook);
    this.addToDisplay();
  }

  addToDisplay() {
    console.log("Add To Display");
    while (this.library.firstChild)
      this.library.removeChild(this.library.firstChild);

    this.myLibrary.forEach((e, i) => {
      const bookItem = document.createElement("li");
      bookItem.classList.add("library-grid-item");

      e.key = i;

      const bookItemBook = document.createElement("div");
      const bookItemAuthor = document.createElement("div");
      const bookItemRead = document.createElement("button");
      const removeBookItem = document.createElement("button");

      bookItem.setAttribute("data-key", i);
      removeBookItem.setAttribute("data-key", i);
      bookItemRead.setAttribute("data-key", i);

      removeBookItem.textContent = "Remove";

      bookItemBook.classList.add("book-item-book");
      bookItemAuthor.classList.add("book-item-author");
      bookItemRead.classList.add("book-item-read");
      removeBookItem.classList.add("book-item-remove");

      bookItemBook.textContent = e.name;
      bookItemAuthor.textContent = e.author;
      bookItemRead.textContent = e.read ? "Read" : "Not Yet Read";

      bookItem.appendChild(bookItemBook);
      bookItem.appendChild(bookItemAuthor);
      bookItem.appendChild(bookItemRead);
      bookItem.appendChild(removeBookItem);
      this.library.appendChild(bookItem);
    });
  }

  init() {
    const body = document.body;
    const addBookBtn = body.querySelector(".add-book-btn");

    const modalBackdrop = body.querySelector(".modal-backdrop");
    const modalForm = body.querySelector(".modal-form");
    const exitModalBtn = body.querySelector(".exit-modal-btn");
    const submitModalBtn = body.querySelector(".submit-book-modal-btn");

    const bookInput = body.querySelector("input[id=book]");
    const authorInput = body.querySelector("input[id=author]");
    const readCheckboxInput = body.querySelector("input[id=read]");

    //remove book item
    this.library.addEventListener("click", (e) => {
      let button = e.target.closest(".book-item-remove");
      let target = e.target.closest(".library-grid-item");

      if (!button) return;

      let key = button.getAttribute("data-key");

      target.remove();

      this.myLibrary = this.myLibrary.filter((e) => e.key != key);
    });

    //change read status
    this.library.addEventListener("click", (e) => {
      let button = e.target.closest(".book-item-read");

      if (!button) return;
      let key = button.getAttribute("data-key");

      let item = this.myLibrary.filter((e) => e.key == key)[0];

      item.changeReadStatus();

      console.log(item);

      button.textContent = item.read ? "Read" : "Not yet read";
    });

    //show modal
    addBookBtn.addEventListener("click", (e) => {
      modalBackdrop.style.visibility = "visible";
      body.style.overflow = "hidden";
    });

    //remove modal on backdrop click
    modalBackdrop.addEventListener("click", (e) => {
      if (!e.target.classList.contains("modal-backdrop")) return;
      e.target.closest(".modal-backdrop").style.visibility = "hidden";
      body.style.overflow = "visible";
    });

    //create a book item
    modalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addBookToLibrary(
        bookInput.value,
        authorInput.value,
        readCheckboxInput.checked
      );
      body.style.overflow = "visible";
      modalBackdrop.style.visibility = "hidden";
      bookInput.value = "";
      authorInput.value = "";
      readCheckboxInput.checked = false;
    });

    //exit modal
    exitModalBtn.addEventListener("click", (e) => {
      modalBackdrop.style.visibility = "hidden";
      body.style.overflow = "visible";
    });
  }
}

const library = new Library();
library.init();

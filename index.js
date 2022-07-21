let myLibrary = []
const body = document.body
const library = body.querySelector(".library-grid")
const addBookBtn = body.querySelector(".add-book-btn")

const modalBackdrop = body.querySelector(".modal-backdrop")
const exitModalBtn = body.querySelector(".exit-modal-btn")
const submitModalBtn = body.querySelector(".submit-book-modal-btn")

const bookInput = body.querySelector("input[id=book]")
const authorInput = body.querySelector("input[id=author]")
const readCheckboxInput = body.querySelector("input[id=read]")

//constructor
function Book(name, author, read) {
  this.name = name
  this.author = author
  this.read = read
}

//place method in prototype so instances can inherit from
//instead of making duplicating the method for each instance
Book.prototype.changeReadStatus = function () {
  this.read = !this.read
}

function addBookToLibrary(name, author, read) {
  const newBook = new Book(name, author, read)
  myLibrary.push(newBook)
  addToDisplay()
}

//add array to display
function addToDisplay() {
  while (library.firstChild) library.removeChild(library.firstChild)

  myLibrary.forEach((e, i) => {
    const bookItem = document.createElement("li")
    bookItem.classList.add("library-grid-item")

    e.key = i

    const bookItemBook = document.createElement("div")
    const bookItemAuthor = document.createElement("div")
    const bookItemRead = document.createElement("button")
    const removeBookItem = document.createElement("button")

    bookItem.setAttribute("data-key", i)
    removeBookItem.setAttribute("data-key", i)
    bookItemRead.setAttribute("data-key", i)

    removeBookItem.textContent = "Remove"

    bookItemBook.classList.add("book-item-book")
    bookItemAuthor.classList.add("book-item-author")
    bookItemRead.classList.add("book-item-read")
    removeBookItem.classList.add("book-item-remove")

    bookItemBook.textContent = e.name
    bookItemAuthor.textContent = e.author
    bookItemRead.textContent = e.read ? "Read" : "Not Yet Read"

    bookItem.appendChild(bookItemBook)
    bookItem.appendChild(bookItemAuthor)
    bookItem.appendChild(bookItemRead)
    bookItem.appendChild(removeBookItem)
    library.appendChild(bookItem)
  })
  console.log(myLibrary)
}

//remove book item
library.addEventListener("click", (e) => {
  let button = e.target.closest(".book-item-remove")
  let target = e.target.closest(".library-grid-item")

  if (!button) return

  let key = button.getAttribute("data-key")

  target.remove()

  myLibrary = myLibrary.filter((e) => e.key != key)
})

//change read status
library.addEventListener("click", (e) => {
  let button = e.target.closest(".book-item-read")

  if (!button) return
  let key = button.getAttribute("data-key")

  let item = myLibrary.filter((e) => e.key == key)[0]

  item.changeReadStatus()

  console.log(item)

  button.textContent = item.read ? "Read" : "Not yet read"
})

//show modal
addBookBtn.addEventListener("click", (e) => {
  modalBackdrop.style.visibility = "visible"
  body.style.overflow = "hidden"
})

//remove modal on backdrop click
modalBackdrop.addEventListener("click", (e) => {
  if (!e.target.classList.contains("modal-backdrop")) return
  e.target.closest(".modal-backdrop").style.visibility = "hidden"
  body.style.overflow = "visible"
})

//create a book item
submitModalBtn.addEventListener("click", (e) => {
  if (!bookInput.value) return
  if (!authorInput.value) return

  addBookToLibrary(
    bookInput.value,
    authorInput.value,
    readCheckboxInput.checked
  )
  body.style.overflow = "visible"
  modalBackdrop.style.visibility = "hidden"
  bookInput.value = ""
  authorInput.value = ""
  readCheckboxInput.checked = false
})

//exit modal
exitModalBtn.addEventListener("click", (e) => {
  modalBackdrop.style.visibility = "hidden"
  body.style.overflow = "visible"
})

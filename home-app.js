// const allBooks = document.querySelectorAll('[data-value]')
// import data from "./data.json" assert { type: "json" }

// console.log(data)

// allBooks.forEach(book => {
// 	// handles opening of book-details
// 	book.addEventListener("click", () => {
// 		localStorage.setItem('id', book.getAttribute("data-value"));
// 		console.log(book.getAttribute("data-value"))
// 		window.open('./detail.html', "_self");
// 	})

// 	// handles loading of book-cover and book-title
// 	console.log(book.childNodes)
// 	book.childNodes[1].src = data[book.getAttribute('data-value')].cover
// 	book.childNodes[3].textContent = data[book.getAttribute('data-value')].title
// })

// import data from "./compact_cleaned_data.json"

const booksView = document.querySelector(".books-view");
let numOfBooksLoaded = 50;
dataFetch()

function dataFetch() {
  fetch('/compact_cleaned_data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    populateBooks(numOfBooksLoaded, data)
    populateBookCovers(data)
  });
}

function populateBooks(numOfBooksLoaded, data) {
  for(let i = 0; i < numOfBooksLoaded; i++) {
    const book = document.createElement("div");
    const bookCover = document.createElement("img");
    const bookLink = document.createElement("a");
    
    book.id = "book";
    book.className = "book";
    booksView.appendChild(book);

    bookLink.href = `book-details.html?id=${data[i]["id"]}`
    bookLink.target = "_blank"
    book.appendChild(bookLink)

    bookCover.alt = "Book Cover"
    bookCover.loading = "lazy"
    bookCover.className = "book-cover"
    bookCover.id = "book-cover"
    bookLink.appendChild(bookCover)
  }
}

function populateBookCovers(data) {
  const bookCovers = document.querySelectorAll(".book-cover")
  bookCovers.forEach((bookCover, index) => {
    bookCover.src = data[index]["cover_link"];
    bookCover.alt = data[index]["title"]
  });
}

function isAtBottom() {
  const scrollTop = window.scrollY || window.pageYOffset;
  const documentHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;
  return scrollTop + viewportHeight >= documentHeight - 1;
}

window.addEventListener('scroll', () => {
  if (isAtBottom()) {
    // Increment the variable when the bottom is reached
    numOfBooksLoaded += 20;
    console.log(numOfBooksLoaded)  
    dataFetch()
  }
});

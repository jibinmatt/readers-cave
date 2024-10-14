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
    if (data[index]["cover_link"]) {
      bookCover.src = data[index]["cover_link"];
      bookCover.alt = data[index]["title"]
    } else {
      bookCover.src = `https://placehold.co/224x336/B9B9B9/575757/?text=${data[index]["title"]}`
      bookCover.alt = data[index]["title"]
    }
  });
}

function isAtBottom() {
  const scrollTop = window.scrollY;
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

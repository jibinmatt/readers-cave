let numOfBooksLoaded = 0 

function dataFetch() {
  fetch('/compact_cleaned_data.json')
  .then(response => response.json())
  .then(data => {
    populateBooks(numOfBooksLoaded, data)
  }) 
}

function populateBooks(numOfBooksLoaded, data) {
  const maxBooks = Math.min(data.length, numOfBooksLoaded+50) 
  
  for (let i = numOfBooksLoaded;  i < maxBooks;  i++) {
    const booksView = document.querySelector(".books-view") 
    const book = document.createElement("div") 
    const bookCover = document.createElement("img") 
    const bookLink = document.createElement("a") 
    
    book.className = "book"
    bookLink.href = `book-details.html?id=${data[i].id}` 
    bookLink.target = "_blank" 
    bookCover.alt = "Book Cover" 
    bookCover.loading = "lazy" 
    bookCover.className = "book-cover" 
    
    if (data[i]["cover_link"]) {
      bookCover.src = data[i]["cover_link"] 
      bookCover.alt = data[i]["title"]
    } else {
      bookCover.src = `https://placehold.co/224x336/B9B9B9/575757/?text=${data[i]["title"]}`
      bookCover.alt = data[i]["title"]
    }
    
    bookLink.appendChild(bookCover) 
    book.appendChild(bookLink) 
    booksView.appendChild(book) 
  }
  const spBookCover = document.querySelector(".spotlight-book-cover")
  const spBookTitle = document.querySelector(".spotlight-book-title")
  const spBookAuthor = document.querySelector(".spotlight-book-author")
  const spBookDesc = document.querySelector(".spotlight-book-desc")
  const spBookLink = document.querySelector(".spotlight-book-link")
  
  let randomIndex = Math.floor(Math.random() * data.length)
  spBookTitle.textContent = data[randomIndex]["title"]
  spBookAuthor.textContent = data[randomIndex]["author"]
  spBookDesc.textContent = data[randomIndex]["description"]
  spBookCover.src = data[randomIndex]["cover_link"]
  spBookLink.href = `book-details.html?id=${data[randomIndex].id}`
  spBookLink.target = "_blank"
}

function isAtBottom() {
  const scrollTop = window.scrollY 
  const documentHeight = document.documentElement.scrollHeight 
  const viewportHeight = window.innerHeight 
  return scrollTop + viewportHeight >= documentHeight - 1 
}

dataFetch()
window.addEventListener('scroll', () => {
  if (isAtBottom()) {
    // Increment the variable when the bottom is reached
    numOfBooksLoaded += 50 
    dataFetch()
  }
}) 

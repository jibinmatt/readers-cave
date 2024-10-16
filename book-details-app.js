const bookId = getQueryParam('id');
console.log(bookId)
dataFetch(bookId)

function dataFetch(bookId) {
  fetch('/compact_cleaned_data.json')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    const bookDetails = data.find(book => book["id"] === bookId);
    console.log(bookDetails)
    populateBookDetails(bookDetails, data)
  });
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function getRecBookDetails(data, recBookID) {
  return data.find(obj => obj.id === recBookID);
}

function populateBookDetails(bookDetails, data) {
  const bookCover = document.querySelector(".book-cover")
  const bookTitle = document.querySelector(".book-title")
  const bookAuthorLink = document.querySelector(".author-link")
  const bookAuthor = document.querySelector(".author")
  const bookDesc = document.querySelector(".book-desc")
  const bookDetPages = document.querySelector(".table-data-pages")
  const bookDetDate = document.querySelector(".table-data-date")
  const bookDetSeries = document.querySelector(".table-data-series")
  const bookDetIsbn = document.querySelector(".table-data-isbn")
  const grLink = document.querySelector(".gr-link")
  const recommendedBooksWrapper = document.querySelector(".recommended-books")

  if (bookDetails["cover_link"]) {
    bookCover.src = bookDetails["cover_link"]
    bookCover.alt = bookDetails["title"] || "No title available"
  }
  
  bookTitle.textContent = bookDetails["title"] || "No title available"
  bookAuthorLink.href = bookDetails["author_link"] || "/"
  bookAuthorLink.target = "_blank" 
  bookAuthor.textContent = bookDetails["author"] || "Unknown author"
  bookDesc.textContent = bookDetails["description"] || "No description available"
  bookDetPages.textContent = bookDetails["number_of_pages"] || "N/A"
  bookDetDate.textContent = bookDetails["date_published"] || "Unknown date"
  bookDetSeries.textContent = bookDetails["series"] || "N/A"
  bookDetIsbn.textContent = bookDetails["isbn"] || "N/A"
  grLink.href = bookDetails["link"] || "/"
  grLink.target = "_blank" 

  for (let rbook in bookDetails["recommended_books"]) {
    const recommendedBook = document.createElement("div")
    const recBookCover = document.createElement("img")
    const recbookLink = document.createElement("a");
    let recBookId = bookDetails["recommended_books"][rbook]
    let recBookDetails = getRecBookDetails(data, recBookId)

    if (recBookDetails) {
      recBookCover.src = recBookDetails["cover_link"]
      recbookLink.href = `book-details.html?id=${recBookDetails["id"]}`
      recbookLink.target = "_blank"
      recommendedBook.className = "recommended-book"
      recBookCover.className = "rec-book-cover"

      recbookLink.appendChild(recBookCover)
      recommendedBook.appendChild(recbookLink)
      recommendedBooksWrapper.appendChild(recommendedBook)
    }
  }
}



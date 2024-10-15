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
    populateBookDetails(bookDetails)
  });
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

function populateBookDetails(bookDetails) {
  const bookCover = document.querySelector(".book-cover")
  const bookTitle = document.querySelector(".book-title")
  const bookAuthor = document.querySelector(".author")
  const bookDesc = document.querySelector(".book-desc")
  const bookDetPages = document.querySelector(".table-data-pages")
  const bookDetDate = document.querySelector(".table-data-date")
  const bookDetSeries = document.querySelector(".table-data-series")
  const bookDetIsbn = document.querySelector(".table-data-isbn")
  const azLink = document.querySelector(".az-link")

  if (bookDetails["cover_link"]) {
    bookCover.src = bookDetails["cover_link"]
    bookCover.alt = bookDetails["title"] || "No title available"
  }
  
  bookTitle.textContent = bookDetails["title"] || "No title available"
  bookAuthor.textContent = bookDetails["author"] || "Unknown author"
  bookDesc.textContent = bookDetails["description"] || "No description available"
  bookDetPages.textContent = bookDetails["number_of_pages"] || "N/A"
  bookDetDate.textContent = bookDetails["date_published"] || "Unknown date"
  bookDetSeries.textContent = bookDetails["series"] || "N/A"
  bookDetIsbn.textContent = bookDetails["isbn"] || "N/A"
  azLink.href = bookDetails["worldcat_redirect_link"] || "/"
}



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
  console.log(bookCover)
  if (bookDetails["cover_link"]) {
    bookCover.setAttribute("src", bookDetails["cover_link"])
    bookCover.setAttribute("alt", bookDetails["title"])
  } else {
    bookCover.setAttribute("src", `https://placehold.co/512x824/B9B9B9/575757/?text=${bookDetails["title"]}`)
    bookCover.setAttribute("alt", bookDetails["title"])
  }
  // bookCover.setAttribute()
}

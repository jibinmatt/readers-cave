const allBooks = document.querySelectorAll('[data-value]')
import data from "./data.json" assert { type: "json" }

console.log(data)

allBooks.forEach(book => {
	// handles opening of book-details
	book.addEventListener("click", () => {
		localStorage.setItem('id', book.getAttribute("data-value"));
		console.log(book.getAttribute("data-value"))
		window.open('./detail.html', "_self");
	})

	// handles loading of book-cover and book-title
	console.log(book.childNodes)
	book.childNodes[1].src = data[book.getAttribute('data-value')].cover
	book.childNodes[3].textContent = data[book.getAttribute('data-value')].title
})

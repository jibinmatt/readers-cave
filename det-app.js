const title = document.querySelector('#title')
const author = document.querySelector('#author')
const info = document.querySelector(".info")
const pages = document.querySelector(".pages")
const isbn = document.querySelector(".isbn")
const btns = document.querySelectorAll(".btn")
const datePublished = document.querySelector(".datePublished")



const id = localStorage.getItem('id');
import data from "./data.json" assert { type: "json" }

/* 
const container5 = document.querySelector(".div5")
const container6 = document.querySelector(".div6")
const container7 = document.querySelector(".div7")
const container8 = document.querySelector(".div8")

container5.style.backgroundImage = `url(${data[id].cover})`
container5.style.backgroundRepeat = "no-repeat"
container5.style.backgroundSize = "200%"
container5.style.backgroundPosition = "left top"

container6.style.backgroundImage = `url(${data[id].cover})`
container6.style.backgroundRepeat = "no-repeat"
container6.style.backgroundSize = "200%"
container6.style.backgroundPosition = "bottom left"

container7.style.backgroundImage = `url(${data[id].cover})`
container7.style.backgroundRepeat = "no-repeat"
container7.style.backgroundSize = "200%"
container7.style.backgroundPosition = "right top"

container8.style.backgroundImage = `url(${data[id].cover})`
container8.style.backgroundRepeat = "no-repeat"
container8.style.backgroundSize = "200%"
container8.style.backgroundPosition = "bottom right"
*/

title.textContent = data[id].title
author.textContent = data[id].author
info.textContent = data[id].info
pages.textContent = `Pages : ${data[id].pages}`
isbn.textContent = `ISBN : ${data[id].ISBN}`
datePublished.textContent = `Date Published : ${data[id].publishedOn}`

btns.forEach((btn, bookid) => {
  btn.textContent = data[id].genres[bookid]
})  

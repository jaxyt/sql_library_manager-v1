const table = document.querySelector("table");
const books = document.querySelector("tbody").children;
const body = document.querySelector("body");
let pageLength = 5;

/**
 * Adds Search Functionality
 * creates and inserts a search form into the page
 * then adds an eventlistener which listens for keyboard events and hides all the books
 * finally, it searches through all the books and removes the "hidden" attribute from the matching results
 */
const searchBooks = () => {
    const searchForm = document.createElement("form");
    const searchInput = document.createElement("input");
    body.insertBefore(searchForm, table);
    searchForm.appendChild(searchInput);
    searchInput.setAttribute("type", "search");
    searchInput.setAttribute("placeholder", "Start Searching Here");
    searchInput.addEventListener("keyup", e => {
        let searchQuery = e.target.value;
        let regex = new RegExp(searchQuery, "gi");
        for (let i = 0; i < books.length; i++) {
            const book = books[i];
            book.setAttribute("hidden", "true")
        }
        for (let i = 0; i < books.length; i++) {
            const book = books[i];
            if (regex.test(book.children[0].children[0].innerHTML) || regex.test(book.children[1].innerHTML) || regex.test(book.children[2].innerHTML) || regex.test(book.children[3].innerHTML) ) {
                book.removeAttribute("hidden")
            }
        }
    });
}

/**
 * Adds Pagination
 * creates and appends a list of page numbers determined by the amount of books retrieved from the database
 * then adds an eventlistener which listens for mouse events and which hides all books
 * finally, it searches through all the books and removes the "hidden" attribute from the books that correspond to the current page
 */
const pageMenu = () => {
    const pageCount = Math.floor(books.length / pageLength) + 1;
    for (let i = pageLength; i < books.length; i++) {
        const book = books[i];
        book.setAttribute("hidden", "true")
    }
    const pageList = document.createElement("ul");
    table.appendChild(pageList);
    for (let i = 0; i < pageCount; i++) {
        const page = document.createElement("li");
        const pageLink = document.createElement("button");
        pageLink.innerHTML = i + 1;
        pageList.appendChild(page);
        page.appendChild(pageLink);
    }
    pageList.addEventListener("click", e => {
        const clicked = e.target;
        for (let i = 0; i < books.length; i++) {
            const book = books[i];
            if (i >= (clicked.innerHTML - 1) * pageLength && i <= (clicked.innerHTML * pageLength) - 1) {
                book.removeAttribute("hidden");
            } else {
                book.setAttribute("hidden", "true");
            }
            
        }
    })
}


searchBooks();

pageMenu();

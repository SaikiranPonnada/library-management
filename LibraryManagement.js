let searchResults = document.getElementById("searchResults");
let selectDisplayCount = document.getElementById("selectDisplayCount");
let searchInput = document.getElementById("searchInput");
let spinner = document.getElementById("spinner");
let resultParagraph = document.getElementById("resultParagraph");

function itemDisplay(each) {
    let {
        imageLink,
        author
    } = each;
    let bookEl = document.createElement("div");
    bookEl.classList.add("col-6");
    searchResults.appendChild(bookEl);

    let imageEl = document.createElement("img");
    imageEl.classList.add("w-100");
    imageEl.src = imageLink;
    bookEl.appendChild(imageEl);

    let authorName = document.createElement("p");
    authorName.textContent = author;
    authorName.classList.add("text-center");
    bookEl.appendChild(authorName);
}

function createAndAppendBooks() {
    let url = "https://apis.ccbp.in/book-store?title=" + searchInput.value + "&maxResults=" + selectDisplayCount.value;
    let options = {
        method: "GET"
    };
    spinner.classList.remove("d-none");
    fetch(url, options)
        .then(function(response) {
            return response.json();
        }).then(function(jsonData) {
            let searchResults = jsonData.search_results;
            if (searchResults.length !== 0) {
                for (let each of searchResults) {
                    spinner.classList.add("d-none");
                    resultParagraph.textContent = "Popular Books";
                    itemDisplay(each);
                }
            } else {
                spinner.classList.add("d-none");
                resultParagraph.classList.add("text-center");
                resultParagraph.textContent = "No fesults found";
            }
        });
}



function bookSearch(event) {
    resultParagraph.textContent = "";
    if (event.key === "Enter") {
        searchResults.textContent = "";
        createAndAppendBooks();
    }
}

searchInput.addEventListener("keydown", bookSearch);
selectDisplayCount.addEventListener("change", function(event) {
    event.preventDefault();
    searchResults.textContent = "";
    resultParagraph.textContent = "";
    createAndAppendBooks();
});
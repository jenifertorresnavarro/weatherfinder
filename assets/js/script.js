var searchFormEl = document.querySelector("#search-form");

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector("#search-input").value;

    if (!searchInputVal) {
        console.error("Please Type in a City");
        return;
    }

    var queryString = "./results.html?q=" + searchInputVal;

    location.assign(queryString);
}

searchFormEl.addEventListener("search", handleSearchFormSubmit);

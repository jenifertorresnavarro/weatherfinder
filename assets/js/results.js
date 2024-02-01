var resultTextEl = document.querySelector("#result-text");
var resultContentEl = document.querySelector("#result-content");
var searchFormEl = document.querySelector("#search-form");

function getParams() {
    var searchParamsArr = document.location.search.split("&");

    var query = searchParamsArr[0].split("=").pop();
    var format = searchParamsArr[1].split("=").pop();

    searchApi(query, format);
}

function printResults(resultObj) {
    console.log(resultObj);

    var resultCard = document.createElement("div");
    resultCard.classList.add("card", "bg-light", "text-dark", "mb-3", "p-3");

    var resultBody = document.createElement("div");
    resultBody = classlist.add("card-body");
    resultCard.append(resultBody);

    var titleEl = document.createElement("h3");
    titleEl.textContent = resultObj.title;

    var bodyContentEl = document.createElement("p");
    bodyContentEl.innerHTML =
    "<strong>Date:</strong> " + resultObj.date + "<br/>";

    if(resultObj.subject) {
        bodyContentEl.innerHTML +=
        "<strong>Subjects:</strong> " + resultObj.subject.join(",") + "<br/>";
    } else {
        bodyContentEl.innerHTML +=
        "<strong>Subjects:</strong> No subject for this entry.";
    }

    if (resultObj.description) {
        bodyContentEl.innerHTML +=
        "<strong>Description:</strong>" + resultObj.description[0];
    } else {
        bodyContentEl.innerHTML +=
        "<strong>Description:</strong> No description for this entry.";
    }

    var linkButtonEl = document.creationElement("a");
    linkButtonEl.textContent = "read more";
    linkButtonEl.seatAttribute("href", resultObj.url);

    resultBody.append(titleEl, bodyContentEl, linkButtonEl);

    resultContentEl.append(resultCard);
    }

    function searchApi(query, format) {
        var locQueryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + location + "appid" + API_KEY + "&units=imperial";

        locQueryUrl = locQueryUrl + "&q=" + query;

        fetch(locQueryUrl)
        .then(function(response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
    .then(function(locRes) {

    resultTextEl.textContent = locRes.search.query;

    console.log(locRes);

    if (!locRes.results.length) {
        console.log("no results found!");
        resultContentEl.innerHTML = "<h3>No results found, search again</h3>";
    }else{
        resultContentEl.textContent = "";
        for (var i =0; i < locRes.results.length ; i++) {
            printResults(locRes.results[i]);
        }
        }
    })
    .catch(function (error) {
        console.error(error);
    });
}

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector("#search-input").value;
    var formatInputVal = document.querySelector("#format-input").value;
if (!searchInputVal) {
    console.error("you need a search input value");
    return;

}

searchApi(searchInputVal, formatInputVal);
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);

getParams();
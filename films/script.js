//funkcja samowywoĹ‚ujÄ…ca sie i domkniecia

var films= (function() {
    const filmsList = document.getElementById('films-list');
    const filmElement = document.getElementById('film-pattern');
    
    const movieCheckbox = document.getElementById('movie-type');
    const seriesCheckbox = document.getElementById('series-type');
    const episodeCheckbox = document.getElementById('episode-type');
    const typeCheckboxes = document.getElementsByName('checkbox');
    const releasedYearInput = document.getElementById('released-year-input');
    const titleInput = document.getElementById('searching-form-input');
    const movieDetailsList = document.getElementById('movie-details');
    const moreFilmsDiv = document.getElementById('more-movies-div');
    const moreFilmsBtn = document.getElementById('more-movies-btn');
    var pageCounter = 1;

    function onlyOneSelect() {
        let checkedCounter = 0;
        typeCheckboxes.forEach(element => {if(element.checked==true) checkedCounter++});
        if(checkedCounter > 1) {
            openErrorModal("You can choose only one option!");
            uncheckAllCheckboxes(typeCheckboxes);
        }
    }

    function uncheckAllCheckboxes(checkboxes) {
        checkboxes.forEach(element => element.checked = false);
    }

    function ifTypeSelected() {
        let type = "";
        typeCheckboxes.forEach(element => {if(element.checked==true) type=element.value});
        return type;
    }

    function ifReleasedYearEntered() {
        if(releasedYearInput.value != "") {
            return "&y=" + releasedYearInput.value;
        } else return "";
    }

    function ifMovieTitleEntered() {
        if(titleInput.value != "") {
            return "&s=" + titleInput.value;
        } else return "";
    }

    function buildUrlForRequest() {
        var base = "https://www.omdbapi.com/?apikey=e48dc44f";

        if(ifMovieTitleEntered() == "") {
            openErrorModal("Enter title first!");
        } else {
            getMovies(base+ifMovieTitleEntered()+ifTypeSelected()+ifReleasedYearEntered()+"&page="+pageCounter);
        }
    }

    function responseValidation(response) {
        if(response.Response == "False") {
            openErrorModal(response.Error);
        } else if(response.Response == "True") return true;
    }

    function openErrorModal(message) {
        document.getElementById('error-message').innerHTML = message;
        $('#error-modal').modal('show');
    }

    function openDetailsModal(detailsOrRating, details) {
        movieDetailsList.innerHTML = "";
        if(detailsOrRating) createDetailsForModal(details);
        else createRatingsForModal(details);
        $('#movie-details-modal').modal('show');
    }

    function getMovies(url) {
        console.log(url);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var response = JSON.parse(this.responseText);
                console.log(response);
                if(responseValidation(response)) createList(response.Search);
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }

    function moreFilmsVisible() {
        moreFilmsDiv.attributes.style.value = "";
    }

    function createList(films) {
        console.log(films);
        if(pageCounter==1) filmsList.innerHTML = "";
        films.forEach( function(film) {
            filmsList.append(createElement(film.Poster, film.Title));
        })
        moreFilmsVisible();
    }

    function createElement(imgSrc, title) {

        let element = filmElement.cloneNode(true);
        element.attributes.style.value = "";
            
        element.getElementsByTagName('img').poster.src = imgSrc;
        element.getElementsByTagName('p').title.innerText = title;
        element.getElementsByTagName('button')[0].addEventListener('click', function() {getMovieInfo(true, title)});
        element.getElementsByTagName('button')[1].addEventListener('click', function() {getMovieInfo(false, title)});

        return element;
    }

    function createDetailsForModal(details) {
        if(details != null) {
            movieDetailsList.append(createParagraph("Runtime", details.Runtime));
            movieDetailsList.append(createParagraph("Country", details.Country));
            //more details from json
        }
    }

    function createRatingsForModal(details) {
        details.Ratings.forEach(rating => movieDetailsList.append(createParagraph(rating.Source, rating.Value)));
        console.log(details);
    }

    function createParagraph(title, detail) {
        var p = document.createElement('p');
        p.innerText = title + ": " + detail;
        return p;
    }

    function getMovieInfo(detailsOrRating, title) {
        let url = "https://www.omdbapi.com/?apikey=e48dc44f&t=";
        
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var details = JSON.parse(this.responseText);
                console.log(details);
                openDetailsModal(detailsOrRating, details);
            }
        }
        xhttp.open("GET", url+title, true);
        xhttp.send();
    }

    movieCheckbox.onchange = onlyOneSelect;
    seriesCheckbox.onchange = onlyOneSelect;
    episodeCheckbox.onchange = onlyOneSelect;

    document.getElementById('searching-form').addEventListener('submit', function(e) {
        e.preventDefault();
        pageCounter=1;
        buildUrlForRequest();
    });

    moreFilmsBtn.addEventListener("click", function() {
        pageCounter++;
        buildUrlForRequest()
    });
})();


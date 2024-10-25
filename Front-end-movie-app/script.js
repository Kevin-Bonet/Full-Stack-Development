const APILINK = 'http://localhost:3000/movies';
const SEARCHAPI = 'http://localhost:3000/search?query='; // Search URL
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

// Fetch and display movies (default popular movies)
returnMovies(APILINK);

function returnMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(function (data) {
            main.innerHTML = ''; // Clear previous content
            data.results.forEach(element => {
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');
                const div_row = document.createElement('div');
                div_row.setAttribute('class', 'row');
                const div_column = document.createElement('div');
                div_column.setAttribute('class', 'column');
                const image = document.createElement('img');
                image.setAttribute('class', 'thumbnail');
                image.setAttribute('id', 'image');
                const title = document.createElement('h3');
                title.setAttribute('id', 'title');

                title.innerHTML = `${element.title}`;
                if (element.poster_path) {
                    const fullImageURL = IMG_PATH + element.poster_path;
                    image.src = fullImageURL;
                } else {
                    image.src = 'https://via.placeholder.com/300x450?text=No+Image';
                }

                div_card.appendChild(image);
                div_card.appendChild(title);
                div_column.appendChild(div_card);
                div_row.appendChild(div_column);
                main.appendChild(div_row);
            });
        });
}

// Handle search form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchItem = search.value;
    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem); // Call the search endpoint with the user's query
        search.value = ''; // Clear the search input field
    }
});

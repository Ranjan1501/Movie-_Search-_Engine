
//0c7a0b4b1bf64ab860373f8949655670

    var timeout; // global to access from any function 
    // Search movie
    let movies_div = document.getElementById("movies");
    let error = document.getElementById("error");
    let search = document.getElementById("search");
    async function searchMovie(movie_name) {
        try {
            let res = await fetch(`https://api.themoviedb.org/4/list/1?api_key=0c7a0b4b1bf64ab860373f8949655670`);

            let data = await res.json();
            return data;


        } catch (e) {
            let img = document.createElement("img");
            img.src = "https://image.shutterstock.com/shutterstock/photos/577933447/display_1500/stock-vector--error-page-not-found-isolated-in-white-background-577933447.jpg";

            error.append(img, e);
        }

    }
    //  searchMovie("black"); 


    function appendMovies(movies) {

        if (movies === undefined) {
            return false;
        }
        movies_div.innerHTML = null;
        // traversing through all movies
        movies.forEach(function (movie) {
            // console(movie.Title); 

            let name = document.createElement("p");

            name.textContent = movie.title;

            let name2 = document.createElement("p");

            name2.textContent = movie.title;

            let img = document.createElement("img");
          

            img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`; // to Access poster for poster Path

            let release_date = document.createElement("p");
            release_date.textContent="Release date: "+movie.release_date;

            let rating = document.createElement("p");
            rating.innerHTML = "Vote Average: "+ movie.vote_average; 

            let btn = document.createElement("button");

            btn.innerText = "Watch Now"

            btn.onclick = function () {
                showMovie(movie);
                 window.location.href = "movie-III-1.html"; 
            }


            
            let div = document.createElement("div");


            // append to show movies 
            div.append(img, name, release_date,rating, btn);
            search.append(div);
           
             movies_div.append(name2);  // search box searching by tittle 
            // appendign movies tittle to dom
            
        });

    }


    async function main() {     // searchMovie is async function
        let name = document.getElementById("movie").value;


        //get searchMoviename

        if (name.length < 3) {
            return false;

        }
        let res = await searchMovie(name);


        let movies_data = res.results;

        appendMovies(movies_data);

        console.log("res:", res);

    }

    function debounce(fun, time) {
        // fun-main() 
        // time- interval between
        // after some execution main()

        //bla setTimeout- fun()- main()- searchMovie()
        // we have clear previous data of b bla blac final res- black widow
        timeout = setTimeout(function () {
            fun();

        }, time)

    }
    if (localStorage.getItem("list") === null) {
        localStorage.setItem("list", JSON.stringify([]));
    }

    function showMovie(movie) {
        let arr = JSON.parse(localStorage.getItem("list"));
        arr.push(movie)

        localStorage.setItem("list", JSON.stringify(arr));
    }
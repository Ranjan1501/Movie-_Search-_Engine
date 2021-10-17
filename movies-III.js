
//0c7a0b4b1bf64ab860373f8949655670

    var timeout; // global to access from any function 
    // Search movie
    let movies_div = document.getElementById("movies");
    let error = document.getElementById("error");
    let search = document.getElementById("search");
    let movieinput=document.getElementById("movie").value; 
    async function searchMovie(movie_name) {
        try {
if(movieinput.value===null) {
    movieinput.value="trending";
}

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

    function Signup(e) {
        e.preventDefault();
        let form = document.getElementById("signup-form");

        let user_data = {                   // spelling should be same as per mocker like
            name: form.name.value,           // name, email, description etc. 
            email: form.email.value,
            mobile: form.mobile.value,
            password: form.password.value,
            username: form.username.value,
            description: form.description.value,
        };
        console.log("user_data", user_data);

        // object format to json format for server to red 

        user_data = JSON.stringify(user_data);

        // fetching data from masai api database

        fetch("https://masai-api-mocker.herokuapp.com/auth/register", { // first is url and 2nd is object with standard parameter like method, body, headers etc.  

            method: 'POST',  // sending user data like posting a letter for registeration
            body: user_data,  // user data details to deliver to address

            headers: {
                "Content-Type": 'application/json'
            },
        })
            .then((res) => {
                return res.json();

            })
            .then((res) => {
                console.log("res", res);

            })
            .catch((err) => {
                console.log("err", err);
            });
    }
    // after register you will get success/failure code 

    // description: "gokuldham"
    // email: "aryastark@gmail.com"
    // mobile: "7804040400"
    // name: "champak"
    // password: "12345"
    // username: "champak123"

    //login
    function Login(e) {
        e.preventDefault();
        let form = document.getElementById("login-form");

        let user_data = {

            password: form.pass.value,
            username: form.user.value,

        };

        let data_to_send = JSON.stringify(user_data);
        console.log("data_to_send", data_to_send);

        fetch("https://masai-api-mocker.herokuapp.com/auth/login", {

            method: 'POST',  // for the server to verify

            body: data_to_send,

            headers: {
                "Content-Type": "application/json",
            },

        })
            .then((res) => {
                return res.json();

            })
            .then((res) => {
                console.log("res", res);
                fetchmyData(user_data.username, res.token);

            })


            .catch((err) => {
                console.log("err", err);
            });
    }

    function fetchmyData(username, token) {
        fetch(`https://masai-api-mocker.herokuapp.com/user/${username}`, {


            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },

        })

            .then((res) => {
                return res.json();

            })
            .then((res) => {
                console.log("res", res);

            })


            .catch((err) => {
                console.log("err", err);
            });

    } 
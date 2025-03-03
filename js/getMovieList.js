const movieListContainer = document.getElementById("moveListContainer");

const loginBtn = document.getElementById("login");
const profileBtn = document.getElementById("profile");
const addBtnCont = document.getElementById("btnContainer");

if (localStorage.getItem("token")) {
    loginBtn.innerHTML = "logout";
}

loginBtn.addEventListener("click", async () => {
    if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
        window.location.href = "/login.html";
    } else {
        window.location.href = "/login.html";
    }
});

profileBtn.onclick = () => {
    if (localStorage.getItem("token")) {
        window.location.href = "/profile.html";
    } else {
        window.location.href = "/login.html";
    }
};

let movieList = [];

const getMovieList = async () => {
    let token;
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/api/movie/all", {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
                method: "CORS",
            },
        });

        const data = await res.json();

        if (data.movies) movieList = [...data.movies];
    } else {
        alert("you have to login first !");
    }
};

window.addEventListener("load", async () => {
    if(localStorage.getItem('role') === "admin"){
        const addBtn = document.createElement('button');
        addBtn.className = "head";
        addBtn.innerText = "add Movie"
        addBtn.onclick = () => {
            window.location.href = "/addMovie.html";
        }
        addBtnCont.appendChild(addBtn)
    }
    
    await getMovieList();
    if (movieList.length > 0) {
        console.log(movieList);
        movieList.map((movie) => {
            let movieContainer = document.createElement("div");
            let movieImg = document.createElement("img");
            let movieName = document.createElement("p");
            movieContainer.appendChild(movieImg);
            movieContainer.appendChild(movieName);
            movieContainer.id = movie._id;
            movieContainer.addEventListener('click', () => {
                window.location.href = `/movieDetails.html?${movieContainer.id}`
            })
            movieImg.src = `http://localhost:3000/${movie.coverPicture}`;
            movieName.innerText = movie.title;
            movieName.style.color = "white";
            movieContainer.className = "image";
            // movieImg.className = "movie-img"
            movieListContainer.appendChild(movieContainer);
        });
    }
});
const container = document.getElementById("container");
const loginBtn = document.getElementById("login");

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

const getProfile = async () => {
    let token;
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");

        const res = await fetch("http://localhost:3000/api/user/profile", {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
                method: "CORS",
            },
        });
        const data = await res.json();

        if (data.user) return data.user;
        else return null;
    } else {
        alert("you have to login first !");
    }
};

const addMovieToFavourites = async (id) => {
    let token;
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        const res = await fetch(
            `http://localhost:3000/api/movie/addToFavourites`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                    method: "CORS",
                },
                body: JSON.stringify({ movie: id }),
            }
        );

        const data = await res.json();

        if (data.message) return data.message;
    }
    return null;
}

window.addEventListener("load", async () => {
    const user = await getProfile();
    if (user) {
        if (
            user.watchList.length > 0 &&
            Object.keys(user.watchList[0]).length > 0
        ) {
            user.watchList.map((el) => {
                container.innerHTML += `<div class="movie">
            <div class="details">
                <div class="image1" id="${el.movie._id}">
                    <img id="cover" src="http://localhost:3000/${el.movie.coverPicture}" />
                </div>
                <div class="content">
                    <div class="film_name">
                        <h2 id="title">${el.movie.title}</h2>
                        <div class="rate">
                            <input
                                type="radio"
                                id="star5"
                                name="rate"
                                value="5"
                            />
                            <label for="star5" title="text">5 stars</label>
                            <input
                                type="radio"
                                id="star4"
                                name="rate"
                                value="4"
                            />
                            <label for="star4" title="text">4 stars</label>
                            <input
                                type="radio"
                                id="star3"
                                name="rate"
                                value="3"
                            />
                            <label for="star3" title="text">3 stars</label>
                            <input
                                type="radio"
                                id="star2"
                                name="rate"
                                value="2"
                            />
                            <label for="star2" title="text">2 stars</label>
                            <input
                                type="radio"
                                id="star1"
                                name="rate"
                                value="1"
                            />
                            <label for="star1" title="text">1 star</label>
                        </div>
                    </div>
                    <div class="film_name">
                        <h2>summary :</h2>
                    </div>
                    <div class="summary" id="description">
                        ${el.movie.description}
                    </div>
                    <div>
                        <button class="favBtn" id="${el.movie._id}">add to favourites</button>
                    <div>
                </div>
            </div>
        </div>`;
            });
            document.querySelectorAll(".favBtn").forEach((btn) => {
                btn.onclick = async (e) => {
                    alert(await addMovieToFavourites(e.target.id));
                };
            });
            document.querySelectorAll(".image1").forEach((img) => {
                img.addEventListener('click', (e) => {location.href = `/movieDetails.html?${img.id}`});
            });
        } else container.innerHTML += `<div class="movie">
        <div class="details">
            <div class="content">
               <h1>you don t have any movies in your watchlist</h1>
            </div>
        </div>
    </div>`
    } else {
        alert("user not found");
    }
});

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

window.addEventListener("load", async () => {
    const profilePic = document.getElementById("profilePic");
    const cover = document.getElementById("cover");
    const username = document.getElementById("name");
    const movieListContainer = document.getElementById("fav");
    const user = await getProfile();
    if (user) {
        profilePic.src = `http://localhost:3000/${user.profilePicture}`;
        cover.style.backgroundImage = `url("http://localhost:3000/${user.coverPicture}")`;
        cover.style.backgroundRepeat = "no-repeat";
        cover.style.backgroundSize = "cover";
        username.innerText = user.nickName;
        if (
            user.watchList.filter(el => el.isFavourite).length > 0 &&
            Object.keys(user.watchList[0]).length > 0
        ) {
            user.watchList.filter(el => el.isFavourite).map((el) => {
                let movieContainer = document.createElement("div");
                let movieImg = document.createElement("img");
                let movieName = document.createElement("p");
                movieContainer.appendChild(movieImg);
                movieContainer.appendChild(movieName);
                movieContainer.id = el.movie._id;
                movieContainer.addEventListener("click", () => {
                    window.location.href = `/movieDetails.html?${movieContainer.id}`;
                });
                movieImg.src = `http://localhost:3000/${el.movie.coverPicture}`;
                movieName.innerText = el.movie.title;
                movieName.style.color = "white";
                movieContainer.className = "image";
                movieListContainer.appendChild(movieContainer);
            });
        }else{
            movieListContainer.innerHTML += "<div><h3>you don t have any favourites yet</h3></div>";
        }
    } else {
        alert("user not found");
    }
});

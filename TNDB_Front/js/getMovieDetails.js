const title = document.getElementById("title");
const description = document.getElementById("description");
const cover = document.getElementById("cover");
const duration = document.getElementById("duration");
const category = document.getElementById("category");
const director = document.getElementById("director");
const outdate = document.getElementById("outdate");
const addToWatchList = document.getElementById("addToWL");
const critContainer = document.getElementById("critiques");
const addCrit = document.getElementById("addCrit");
const reviewField = document.getElementById("critInput");
const loginBtn = document.getElementById("login");
const wall = document.getElementById('wall');
const trailer = document.getElementById('trailer');

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

const getMovieDetails = async () => {
    let token;
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        const res = await fetch(
            `http://localhost:3000/api/movie/${location.search.split("?")[1]}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`,
                    method: "CORS",
                },
            }
        );

        const data = await res.json();

        if (data.movie) return data.movie;
    } else {
        return null;
    }
};

const addMovieToWatchList = async () => {
    let token;
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        const res = await fetch(
            `http://localhost:3000/api/movie/addToWatchList`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                    method: "CORS",
                },
                body: JSON.stringify({ movie: location.search.split("?")[1] }),
            }
        );

        const data = await res.json();

        if (data.message) return data.message;
    }
    return null;
};

const getMovieReviews = async () => {
    let token;
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        const res = await fetch(
            `http://localhost:3000/api/review/${location.search.split("?")[1]}`,
            {
                method: "GET",
                headers: {
                    authorization: `Bearer ${token}`,
                    method: "CORS",
                },
            }
        );

        const data = await res.json();

        if (data.reviews) return data.reviews;
    }
    return null;
};


const addReview = async (review) => {
    let token;
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        const res = await fetch(
            `http://localhost:3000/api/review/add`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`,
                    method: "CORS",
                },
                body: JSON.stringify({ movie: location.search.split("?")[1], review }),
            }
        );

        const data = await res.json();

        if (data.message) return data.message;
    }
    return null;
};

window.addEventListener("load", async () => {
    const movie = await getMovieDetails();
    const reviews = await getMovieReviews();
    if (movie) {
        console.log(movie);
        cover.src = `http://localhost:3000/${movie.coverPicture}`;
        wall.style.backgroundImage = `url("http://localhost:3000/${movie.coverPicture}")`;
        title.innerText = movie.title;
        description.innerText = movie.description;
        outdate.innerText = movie.outDate;
        director.innerText = movie.director;
        duration.innerText = movie.duration + " minutes";
        category.innerText = movie.category.value;
        //"https://www.youtube.com/embed/VGDmNCuxv8w"
        trailer.src = `https://www.youtube.com/embed/${movie.trailer.split('=')[1]}`;
        if (reviews && reviews.length > 0) {
            reviews.reverse().map((review) => {
                const reviewDiv = document.createElement("div");
                const nameH3 = document.createElement("h3");
                const personDiv = document.createElement("div");
                const picDiv = document.createElement("div");
                const commentH3 = document.createElement("h3");
                const commentDiv = document.createElement("div");
                const picImg = document.createElement("img");

                reviewDiv.className = "review";
                personDiv.className = "person";
                picDiv.className = "pic";

                nameH3.innerText = review.user.fullName;
                commentH3.innerText = review.review;
                picImg.src = `http://localhost:3000/${review.user.profilePicture}`;

                picDiv.appendChild(picImg);
                personDiv.appendChild(picDiv);
                personDiv.appendChild(nameH3);
                commentDiv.appendChild(commentH3);

                reviewDiv.appendChild(personDiv);
                reviewDiv.appendChild(commentDiv);

                critContainer.appendChild(reviewDiv);
            });
        } else {
            const reviewDiv = document.createElement("div");
            reviewDiv.innerHTML = "no reviews yet, be the first to add one !";
            critContainer.appendChild(reviewDiv);
        }
    } else {
        alert("movie not found");
    }
});

addToWatchList.onclick = async () => {
    alert(await addMovieToWatchList());
};


addCrit.onclick = async () => {
    const input = reviewField.value;
    if(input && input.length > 3){
        await addReview(input);
        location.reload();
    }
}
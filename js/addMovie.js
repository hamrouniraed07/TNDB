let categories = [];
const categSelect = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const title = document.getElementById("title");
const director = document.getElementById("director");
const duration = document.getElementById("duration");
const category = document.getElementById("category");
const description = document.getElementById("description");
const trailer = document.getElementById("trailer");
const outdate = document.getElementById("outDate");
const cover = document.getElementById("coverPicture");

const getCategories = async () => {
    const res = await fetch("http://localhost:3000/api/category/all", {
        method: "GET",
        headers: {
            // authorization: `Bearer ${token}`,
            method: "CORS",
        },
    });
    const data = await res.json();

    if (data.categories) categories = [...data.categories];
};

const addMovie = async (input) => {
    let token;
    if (localStorage.getItem("token")) token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/api/movie/add", {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data",
            method: "CORS",
        },
        body: input,
    });
    const data = await res.json();

    console.log(data);
};

window.addEventListener("load", async () => {
    await getCategories();
    if (categories.length > 0) {
        console.log(categories);
        categories.map((category) => {
            let option = document.createElement("option");
            option.value = category._id;
            option.innerHTML = category.value;
            option.name = "category";
            categSelect.appendChild(option);
        });
    }
});

addBtn.onclick = () => {
    const form = new FormData();

    form.append("title", title.value);
    form.append("director", director.value);
    form.append("duration", duration.value);
    form.append("description", description.value);
    form.append("trailer", trailer.value);
    form.append("category", category.value);
    form.append("outDate", new Date(outdate.value));
    form.append("coverPicture", cover.files[0]);

    addMovie(form);
    // window.location.href = "/index.html"
};

const signUpBtn = document.getElementById("signUp");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");
const firstNameField = document.getElementById("firstName");
const lastNameField = document.getElementById("lastName");
const nickNameField = document.getElementById("nickName");
const profilePic = document.getElementById("profile");
const coverPic = document.getElementById("cover");

const signUp = async (fromData) => {
    token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:3000/api/user/signUp`, {
        method: "POST",
        headers: {
            // "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
            method: "CORS",
        },
        body: fromData,
    });

    const data = await res.json();

    if (data.message) return data.message;
};

signUpBtn.onclick = () => {
    const form = new FormData();

    form.append("firstName", firstNameField.value);
    form.append("lastName", lastNameField.value);
    form.append("nickName", nickNameField.value);
    form.append("email", emailField.value);
    form.append("password", passwordField.value);
    form.append("coverPicture", coverPic.files[0]);
    form.append("profilePicture", profilePic.files[0]);

    alert(signUp(form));
    location.href = "/login.html"
};

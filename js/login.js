const loginBtn = document.getElementById("login");
const emailField = document.getElementById("email");
const passwordField = document.getElementById("password");

const login = async (email, password) => {
    localStorage.removeItem("token");
    const res = await fetch("http://localhost:3000/api/user/signIn", {
        method: "POST",
        headers: {
            method: "CORS",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await res.json();

    return { status: res.status, data };
};

loginBtn.onclick = async () => {
    if (emailField.value && passwordField.value) {
        const { status, data } = await login(
            emailField.value,
            passwordField.value
        );
        if (status === 200) {
            localStorage.setItem("token", data.token);
            if (emailField.value === "admin@root.com") localStorage.setItem("role", "admin");
            else localStorage.setItem("role", "user");

            window.location.href = "/index.html";
        } else alert(data.message);
    }
};

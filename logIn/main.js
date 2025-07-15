document.addEventListener("DOMContentLoaded", function () {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    const activeUserDetails = JSON.parse(localStorage.getItem("activeUserDetails"));
    if (activeUser) {
        const header = document.querySelector("header");
        header.innerHTML = `<div style="background-color: #DD4444;">
            <p>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</p>
        </div>
        <nav>
            <h1>E-commerce</h1>
            <ul>
                <li><a href="../homePage">Home</a></li>
                <li><a href="../contact/">Contact</a></li>
                <li><a href="../about/">About</a></li>
                <li><a href="../signUp/">Sign Up</a></li>
                <li><a href="../shop/">Shop</a></li>
            </ul>
            <div>
                <input type="text" placeholder="What are you looking for?">
                <i class="fa-solid fa-magnifying-glass"></i>
                <i class="fa-solid fa-cart-shopping"></i>
                <a href="../account/" style="color: black;"><i class="fa-solid fa-user"></i></a>
                <span class="username"></span>
                <button class="logOutBtn">log out</button>
            </div>
        </nav>`;
        const username = document.querySelector(".username");
        username.textContent = activeUserDetails.username;
    }
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const loginData = Object.fromEntries(formData.entries());

        loginFunc(loginData);
    });
});

function showMessage(message, type) {
    const messageBox = document.querySelector("#message-box");

    messageBox.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => {
        messageBox.innerHTML = "";
    }, 3000);
}

function loginFunc(user) {
    fetch("http://195.26.245.5:9505/api/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.status != 403) {
                showMessage("Login successful! Redirecting...", "success");

                localStorage.setItem("activeUser", JSON.stringify(data.body));

                return fetch("http://195.26.245.5:9505/api/clients/get-details", {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + data.body.token,
                    },
                })
                    .then((res) => res.json())
                    .then((details) => {
                        localStorage.setItem("activeUserDetails", JSON.stringify(details));
                        setTimeout(() => {
                            window.location.href = "../homePage/index.html";
                        }, 5);
                    });
            } else {
                showMessage("Invalid username or password!", "danger");
            }
        })
        .catch((error) => {
            console.error("Login error:", error);
            showMessage("Server error. Please try again later.", "danger");
        });
    const logOutBtn = document.querySelector(".logOutBtn");
    logOutBtn.addEventListener("click", () => {
        localStorage.removeItem("activeUser");
        localStorage.removeItem("activeUserDetails");
        setTimeout(() => {
            window.location.href = "../logIn/index.html";
        }, 5);
    })
}

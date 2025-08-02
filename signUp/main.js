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
                <a href="../cart/" style="color: black;"><i class="fa-solid fa-cart-shopping"></i></i></a>
                <a href="../account/" style="color: black;"><i class="fa-solid fa-user"></i></a>
                <span class="username"></span>
                <button class="logOutBtn">log out</button>
            </div>
        </nav>`;
        const username = document.querySelector(".username");
        username.textContent = activeUserDetails.username;
    }
    const form = document.querySelector("form");
    const messageBox = document.querySelector("#message-box");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);
        const userData = Object.fromEntries(formData.entries());

        if (Object.values(userData).some((value) => value.trim() === "")) {
            showMessage("All fields are required!", "danger");
            return;
        }

        const newUser = { ...userData };

        addUser(newUser);
        form.reset();
    });

    function showMessage(message, type) {
        messageBox.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
        setTimeout(() => {
            messageBox.innerHTML = "";
        }, 3000);
    }

    function addUser(user) {
        fetch("http://195.26.245.5:9505/api/clients", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((err) => {
                        if (response.status === 403) {
                            showMessage("User with this email or username already exists!", "warning");
                        } else {
                            showMessage("Something went wrong!", "danger");
                        }
                        throw new Error("HTTP Error: " + response.status);
                    });
                } else {
                    showMessage("User successfully created!", "success");
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
            });
    };
    const logOutBtn = document.querySelector(".logOutBtn");
    logOutBtn.addEventListener("click", () => {
        localStorage.removeItem("activeUser");
        localStorage.removeItem("activeUserDetails");
        setTimeout(() => {
            window.location.href = "../signUp/index.html";
        }, 5);
    })
})

document.addEventListener("DOMContentLoaded", function () {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    const activeUserDetails = JSON.parse(localStorage.getItem("activeUserDetails"));
    if (activeUser) {
        const header = document.querySelector("header");
        header.innerHTML = ` <div style="background-color: #DD4444;">
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
    const userDetailsDiv = document.querySelector(".user-details-div");

    function fillUserDetails(details) {
        document.querySelector(".user-name span").textContent = details.name;
        document.querySelector(".user-surname span").textContent = details.surname;
        document.querySelector(".user-email span").textContent = details.email;
        document.querySelector(".user-username span").textContent = details.username;
    }

    if (activeUserDetails) {
        fillUserDetails(activeUserDetails);
    }

    if (activeUser && activeUser.token) {
        fetch("http://195.26.245.5:9505/api/clients/get-details", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + activeUser.token
            }
        })
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Failed to fetch from API");
                }
                return response.json();
            })
            .then(function (data) {
                localStorage.setItem("activeUserDetails", JSON.stringify(data));
                fillUserDetails(data);
                console.log(data);

            })
            .catch(function (error) {
                console.error("Error fetching user details:", error);
                userDetailsDiv.innerHTML =
                    `<h2>Failed to load user info</h2>
                <p>Something went wrong. Please <a href="../logIn">log in</a> again.</p>`
                    ;
            });
    } else if (!activeUserDetails) {
        userDetailsDiv.innerHTML =
            `<h2>No user logged in</h2>
            <p>Please <a href="../logIn">log in</a> to view your details.</p>`
            ;
    }
    const logOutBtn = document.querySelector(".logOutBtn");
    logOutBtn.addEventListener("click", () => {
        localStorage.removeItem("activeUser");
        localStorage.removeItem("activeUserDetails");
        setTimeout(() => {
            window.location.href = "../account/index.html";
        }, 5);
    })
});
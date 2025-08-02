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
    const logOutBtn = document.querySelector(".logOutBtn");
    logOutBtn.addEventListener("click", () => {
        localStorage.removeItem("activeUser");
        localStorage.removeItem("activeUserDetails");
        setTimeout(() => {
            window.location.href = "../createProduct/index.html";
        }, 5);
    })

    let myForm = document.querySelector("form");

    myForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(myForm);
        const product = {};

        formData.forEach((value, key) => {
            product[key] = value;
        })

        let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartItems.push(product);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        setTimeout(() => {
            window.location.href = "../userProducts/index.html";
        }, 200);
    });

    let image = document.querySelector(".image");
    let url = document.querySelector(".url");

    url.addEventListener("blur", () => {
        image.src = url.value;
    });
})
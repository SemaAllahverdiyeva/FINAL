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
    };

    
    const products = JSON.parse(localStorage.getItem("cartItems")) || [];
    const table = document.querySelector("table");

    products.forEach((product, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.brand || product.brend}</td>
            <td>${product.model}</td>
            <td>${product.category}</td>
            <td><img src="${product.url}" alt="" style="width: 250px;"></td>
            <td>${product.price}</td>
            <td>${product.rating || "5/5"}</td>
            <td><button style="border: none; padding: 5px 10px; border-radius: 5px; background-color: rgb(0, 102, 255); color: white;">Edit</button></td>
            <td><button style="border: none; padding: 5px 10px; border-radius: 5px; background-color: #DB4444; color: white; margin-left: 20px;">Delete</button></td>
        `;

        table.appendChild(tr);
    });

    
    const logOutBtn = document.querySelector(".logOutBtn");
    logOutBtn.addEventListener("click", () => {
        localStorage.removeItem("activeUser");
        localStorage.removeItem("activeUserDetails");
        setTimeout(() => {
            window.location.href = "../userProducts/index.html";
        }, 10);
    })
});
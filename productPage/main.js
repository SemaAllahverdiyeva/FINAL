document.addEventListener("DOMContentLoaded", function () {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    const token = activeUser.token;

    const productId = localStorage.getItem("selectedProductId");

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
        username.textContent = activeUser.username;
    };

    if (!productId) {
        alert("No product selected!");
    }

    fetch(`http://195.26.245.5:9505/api/products/${productId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) throw new Error("Product fetch failed");
            return response.json();
        })
        .then(product => {
            fillProductData(product);
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Unable to load product.");
        });

    function fillProductData(product) {
        document.querySelector(".div1 img").src = product.imageUrl;
        document.querySelector(".model").textContent = `${product.brand} ${product.model}`;
        document.querySelector(".rating").textContent = `⭐ ${product.rating}`;
        document.querySelector(".rating2").textContent = `(${Math.floor(Math.random() * 100)} Reviews)`;
        document.querySelector(".stock").textContent = "In Stock";
        document.querySelector(".price").textContent = `$${product.price}`;
        document.querySelector(".description").textContent = product.description || "No description available.";

        const addToCartBtn = document.querySelector(".div2 button");
        addToCartBtn.addEventListener("click", () => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingProduct = cart.find(p => p.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Product added to cart!");
        });
    }
});

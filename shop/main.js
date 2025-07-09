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
                <input type="text" placeholder="What are you lookimg for?">
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
    const productList = document.querySelector("#productList");
    let products = [];
    let filteredProducts = [];

    function fetchProducts() {
        fetch("http://195.26.245.5:9505/api/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${activeUser?.token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                return response.json();
            })
            .then(data => {
                products = data;
                filteredProducts = [...products];
                localStorage.setItem("products", JSON.stringify(products));
                loadProducts();
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                productList.innerHTML = `<p class="text-danger text-center"> Failed to load products </p>`;
            });
    }

    function loadProducts() {
        productList.innerHTML = "";

        if (filteredProducts.length === 0) {
            productList.innerHTML = `<p class="text-center">No products found.</p>`;
            return;
        }

        filteredProducts.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("col-md-3", "mb-4");
            productCard.innerHTML = `
               <a href="../productPage" class="product-card"> <div>
                    <img src="${product.imageUrl}" alt="${product.brand}" class="product-image" data-id="${product.id}">
                    <h6 class="product-title" data-id="${product.id}">${product.brand} ${product.model}</h6>
                    <p class="price">${product.price}$</p>
                    <p class="rating">⭐ ${product.rating} <span>(${Math.floor(Math.random() * 100) + 1})</span></p>
                    <button class="btn-add-to-cart" data-id="${product.id}">Add to cart</button>
                </div>
                 </a>

            `;

            productList.appendChild(productCard);
        });

        document.querySelectorAll(".btn-add-to-cart").forEach(button => {
            button.addEventListener("click", function () {
                const productId = this.getAttribute("data-id");
                addToCart(productId);
            });
        });
    }

    function addToCart(productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find(p => p.id === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            const product = products.find(p => p.id === productId);
            if (product) {
                cart.push({ ...product, quantity: 1 });
            }
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
    }

    fetchProducts();
    const logOutBtn = document.querySelector(".logOutBtn");
    logOutBtn.addEventListener("click", () => {
        localStorage.removeItem("activeUser");
        localStorage.removeItem("activeUserDetails");
    });
});

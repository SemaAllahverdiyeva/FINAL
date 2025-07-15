document.addEventListener("DOMContentLoaded", function () {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    const token = activeUser?.token;

    const productId = localStorage.getItem("selectedProductId");

    if (!productId) {
        alert("No product selected!");
        return;
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
        document.querySelector(".div2 h1").textContent = `${product.brand} ${product.model}`;
        document.querySelector(".div2 > div img").src = "../images/productPage/Four Star.png";
        document.querySelector(".div2 > div p:nth-of-type(1)").textContent = `(${Math.floor(Math.random() * 100)} Reviews)`;
        document.querySelector(".div2 > div p:nth-of-type(2)").textContent = "In Stock";
        document.querySelector(".div2 > p:nth-of-type(1)").textContent = `$${product.price}`;
        document.querySelector(".div2 > p:nth-of-type(2)").textContent = product.description || "No description available.";

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

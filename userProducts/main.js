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
                <a href="../cart/" style="color: black;"><i class="fa-solid fa-cart-shopping"></i></a>
                <a href="../account/" style="color: black;"><i class="fa-solid fa-user"></i></a>
                <span class="username"></span>
                <button class="logOutBtn">log out</button>
            </div>
        </nav>`;

        const username = document.querySelector(".username");
        username.textContent = activeUserDetails.username;
    }

    const table = document.querySelector("table");

    // API-dən məhsulları götür
    fetch("http://195.26.245.5:9505/api/products/myProducts?page=1&size=1", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${activeUser?.token}`
        }
    })
        .then(response => response.json())
        .then(products => {
            // API-dən gələn məhsulları cədvələ əlavə et
            products.content.forEach((product, index) => {
                const tr = document.createElement("tr");

                tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${product.brand}</td>
                <td>${product.model}</td>
                <td>${product.categoryId}</td>
                <td><img src="${product.imageUrl}" alt="" style="width: 250px;"></td>
                <td>${product.price}</td>
                <td>${product.rating || '-'}</td>
                <td><button style="border: none; padding: 5px 10px; border-radius: 5px; background-color: rgb(0, 102, 255); color: white;">Edit</button></td>
                <td><button style="border: none; padding: 5px 10px; border-radius: 5px; background-color: #DB4444; color: white; margin-left: 20px;" class="delete-btn" onclick="deleteProduct('${product.id}', this)">Delete</button></td>
            `;

                table.appendChild(tr);
            });
        })
        .catch(err => console.error("Failed to fetch products:", err));

    const logOutBtn = document.querySelector(".logOutBtn");
    logOutBtn.addEventListener("click", () => {
        localStorage.removeItem("activeUser");
        localStorage.removeItem("activeUserDetails");
        setTimeout(() => {
            window.location.href = "../userProducts/index.html";
        }, 10);
    });
});
function deleteProduct(productId, btnElement) {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    if (confirm("Are you sure you want to delete this product?")) {
        fetch(`http://195.26.245.5:9505/api/products/delete/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${activeUser?.token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    alert("Product deleted successfully");
                    btnElement.closest("tr").remove(); // cədvəldən sil
                } else {
                    alert("Failed to delete product");
                }
            })
            .catch(err => console.error("Delete error:", err));
    }
}
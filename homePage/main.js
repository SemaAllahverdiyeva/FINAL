document.addEventListener("DOMContentLoaded", function () {
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));
    const activeUserDetails = JSON.parse(localStorage.getItem("activeUserDetails"));
    const username = document.querySelector(".username");

    if (activeUser) {
        username.textContent = activeUserDetails.username;
    } else {
        const header = document.querySelector("header");
        header.innerHTML = `
            <header>
        <div style="background-color: #DD4444;">
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
                <i class="fa-solid fa-magnifying-glass" style="margin: 5px;"></i>
                <button><a href="../logIn" style="color: #fff;">log in</a></button>

            </div>
        </nav>
    </header>
        `
    }

    const logOutBtn = document.querySelector(".logOutBtn");
    logOutBtn.addEventListener("click", () => {
        localStorage.removeItem("activeUser");
        localStorage.removeItem("activeUserDetails");
    })
})
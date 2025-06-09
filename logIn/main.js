document.addEventListener("DOMContentLoaded", function () {
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
            console.log(data);
            if (data.status != 403) {
                showMessage("Login successful! Redirecting...", "success");
                localStorage.setItem("activeUser", JSON.stringify(data.body));
                setTimeout(() => {
                    window.location.href = "../homePage/index.html";
                }, 2000);
            } else {
                showMessage("Invalid username or password!", "danger");
            }
        })
        .catch((error) => {
            console.error("Login error:", error);
            showMessage("Server error. Please try again later.", "danger");
        });
}

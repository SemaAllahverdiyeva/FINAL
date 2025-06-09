document.addEventListener("DOMContentLoaded", function () {
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
    }
});

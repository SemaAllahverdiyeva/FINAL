document.addEventListener("DOMContentLoaded", function () {
    const userDetailsDiv = document.querySelector(".user-details-div");
    const activeUserDetails = JSON.parse(localStorage.getItem("activeUserDetails"));
    const activeUser = JSON.parse(localStorage.getItem("activeUser"));

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
            ` <h2>No user logged in</h2>
            <p>Please <a href="../logIn">log in</a> to view your details.</p>`
            ;
    }
});

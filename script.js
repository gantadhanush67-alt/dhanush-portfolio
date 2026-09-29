<<<<<<< HEAD
// ==============================
// GOOGLE APPS SCRIPT DATABASE
// ==============================

const GOOGLE_SHEETS_URL =
    "https://script.google.com/macros/s/AKfycbwA5Xs5aTFT3KtXMGeH3kE1abm_4q6BV8knFlJcuEXiGMXXfsPz7RzoT5MF-oBKbd_q/exec";


// ==============================
// CONTACT FORM
// ==============================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton =
            contactForm.querySelector('button[type="submit"]');

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        const timestamp = new Date().toISOString();

        // Data for Google Sheets
        const databaseData = {
            name: name,
            email: email,
            message: message,
            timestamp: timestamp
        };


        // ==============================
        // SAVE TO GOOGLE SHEETS
        // ==============================

        try {

            const sheetsResponse = await fetch(
                GOOGLE_SHEETS_URL,
                {
                    method: "POST",
                    body: JSON.stringify(databaseData)
                }
            );

            const sheetsResult =
                await sheetsResponse.json();

            if (!sheetsResult.success) {
                throw new Error("Google Sheets error");
            }


            // ==============================
            // SEND TO FORMSPREE
            // ==============================

            const formData = new FormData(contactForm);

            const formspreeResponse = await fetch(
                "https://formspree.io/f/moevynlj",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json"
                    }
                }
            );


            if (formspreeResponse.ok) {

                formMessage.textContent =
                    "Thank you! Your message has been received.";

                formMessage.className = "success";

            } else {

                formMessage.textContent =
                    "Saved successfully, but email notification failed.";

                formMessage.className = "success";
            }


            contactForm.reset();


        } catch (error) {

            console.error(error);

            formMessage.textContent =
                "Sorry, something went wrong. Please try again.";

            formMessage.className = "error";

        }


        submitButton.disabled = false;
        submitButton.textContent = "Send message";

    });
}



// ==============================
// ADMIN LOGIN
// ==============================

const adminLoginBtn =
    document.getElementById("adminLoginBtn");

const adminPassword =
    document.getElementById("adminPassword");

const adminMessage =
    document.getElementById("adminMessage");

const adminResponses =
    document.getElementById("adminResponses");

const responsesList =
    document.getElementById("responsesList");


if (adminLoginBtn) {

    adminLoginBtn.addEventListener("click", function () {

        const password =
            adminPassword.value.trim();

        const correctPassword =
            "Dhanush@2026";


        if (password === correctPassword) {

            adminMessage.textContent =
                "Login successful!";

            adminMessage.className = "success";

            sessionStorage.setItem(
                "adminLoggedIn",
                "true"
            );

            adminPassword.value = "";


            if (adminResponses) {
                adminResponses.style.display = "block";
            }


            // Get responses from Google Sheets
            displayResponses();


        } else {

            adminMessage.textContent =
                "Incorrect password. Please try again.";

            adminMessage.className = "error";


            if (adminResponses) {
                adminResponses.style.display = "none";
            }

        }

    });

}



// ==============================
// GET RESPONSES FROM GOOGLE SHEETS
// ==============================

async function displayResponses() {

    if (!responsesList) {
        return;
    }


    responsesList.innerHTML =
        "<p>Loading responses...</p>";


    try {

        const response =
            await fetch(GOOGLE_SHEETS_URL);

        const savedResponses =
            await response.json();


        if (!Array.isArray(savedResponses) ||
            savedResponses.length === 0) {

            responsesList.innerHTML =
                "<p>No responses yet.</p>";

            return;
        }


        responsesList.innerHTML = "";


        savedResponses.forEach(function (response) {

            const responseCard =
                document.createElement("div");

            responseCard.className =
                "about-card";


            const nameHeading =
                document.createElement("h3");

            nameHeading.textContent =
                response.name;


            const emailText =
                document.createElement("p");

            emailText.innerHTML =
                "<strong>Email:</strong> ";

            emailText.appendChild(
                document.createTextNode(response.email)
            );


            const messageText =
                document.createElement("p");

            messageText.innerHTML =
                "<strong>Message:</strong> ";

            messageText.appendChild(
                document.createTextNode(response.message)
            );


            const timeText =
                document.createElement("p");

            timeText.innerHTML =
                "<strong>Time:</strong> ";


            const date =
                new Date(response.timestamp);


            timeText.appendChild(
                document.createTextNode(
                    date.toLocaleString()
                )
            );


            responseCard.appendChild(nameHeading);
            responseCard.appendChild(emailText);
            responseCard.appendChild(messageText);
            responseCard.appendChild(timeText);


            responsesList.appendChild(responseCard);

        });


    } catch (error) {

        console.error(error);

        responsesList.innerHTML =
            "<p>Unable to load responses from Google Sheets.</p>";

    }

}



// ==============================
// LIGHT / DARK THEME TOGGLE
// ==============================

const themeToggle =
    document.getElementById("themeToggle");


if (themeToggle) {

    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "light") {

        document.body.classList.add(
            "light-theme"
        );

        themeToggle.textContent = "🌙";
    }


    themeToggle.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "light-theme"
            );


            if (
                document.body.classList.contains(
                    "light-theme"
                )
            ) {

                themeToggle.textContent = "🌙";

                localStorage.setItem(
                    "theme",
                    "light"
                );

            } else {

                themeToggle.textContent = "☀️";

                localStorage.setItem(
                    "theme",
                    "dark"
                );

            }

        }
    );

=======
// ==============================
// CONTACT FORM
// ==============================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');

        const formData = new FormData(contactForm);

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        try {
            const response = await fetch(
                "https://formspree.io/f/moevynlj",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json"
                    }
                }
            );

            if (response.ok) {
                formMessage.textContent =
                    "Thank you! Your message has been received.";
                formMessage.className = "success";

                contactForm.reset();
            } else {
                formMessage.textContent =
                    "Sorry, your message could not be sent. Please try again.";
                formMessage.className = "error";
            }

        } catch (error) {
            formMessage.textContent =
                "Something went wrong. Please try again later.";
            formMessage.className = "error";
        }

        submitButton.disabled = false;
        submitButton.textContent = "Send message";
    });
>>>>>>> 12aa3b713e4d2ffdd40381c63f2645fa5b8524c0
}
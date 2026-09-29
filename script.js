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
}
// Initialisation d'EmailJS avec ta Clé Publique
(function() {
    emailjs.init("GFif07CyUqPbiHAuJ");
})();

document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. SUIVI DE LA SECTION ACTIVE AU SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-menu a");

    window.addEventListener("scroll", () => {
        let current = "";
        // Utilisation de window.scrollY (plus moderne que pageYOffset)
        const scrollPosition = window.scrollY || document.documentElement.scrollTop;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            // Détection de la section visible à l'écran
            if (scrollPosition >= sectionTop - 160) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    /* ==========================================================================
       2. GESTION DU FORMULAIRE DE CONTACT (EMAILJS)
       ========================================================================== */
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Récupération des valeurs du formulaire
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const phone = document.getElementById("phone").value;
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value;

            // Validation rapide côté client
            if (!name || !email || !phone || !subject || !message) {
                alert("Veuillez remplir tous les champs requis.");
                return;
            }

            // Changement d'état visuel du bouton de soumission
            const submitBtn = contactForm.querySelector(".btn-submit");
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Envoi en cours...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Paramètres pour tes templates EmailJS
            const templateParams = {
                name: name,
                email: email,
                phone: phone,
                subject: subject,
                message: message
            };

            // Identifiants EmailJS installés dans ton compte
            const serviceID = "service_oy602vf"; 
            const templateAdminID = "template_0wqft5y"; // Notification pour toi (Basile)
            const templateUserID = "template_j8c11ep";  // Confirmation pour ton client

            // Envoi simultané des deux e-mails
            const sendAdminEmail = emailjs.send(serviceID, templateAdminID, templateParams);
            const sendUserEmail = emailjs.send(serviceID, templateUserID, templateParams);

            Promise.all([sendAdminEmail, sendUserEmail])
                .then(() => {
                    alert(`Merci ${name} ! Votre message a bien été envoyé. Un e-mail de confirmation vous a été envoyé.`);
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error("Erreur d'envoi EmailJS :", error);
                    alert("Désolé, une erreur est survenue lors de l'envoi du message. Veuillez réessayer ou me contacter directement via WhatsApp.");
                })
                .finally(() => {
                    // Rétablir l'état initial du bouton
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    /* ==========================================================================
       3. MENU BURGER RESPONSIVE (MOBILE)
       ========================================================================== */
    const menuToggle = document.getElementById("mobile-menu");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            if (navMenu.classList.contains("mobile-active")) {
                navMenu.classList.remove("mobile-active");
                navMenu.style.display = "none";
            } else {
                navMenu.classList.add("mobile-active");
                navMenu.style.display = "flex";
                navMenu.style.flexDirection = "column";
                navMenu.style.position = "absolute";
                navMenu.style.top = "70px";
                navMenu.style.left = "0";
                navMenu.style.width = "100%";
                navMenu.style.backgroundColor = "#020b24";
                navMenu.style.padding = "20px";
                navMenu.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)";
            }
        });

        // Fermer le menu mobile lorsqu'on clique sur un lien
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                if (navMenu.classList.contains("mobile-active")) {
                    navMenu.classList.remove("mobile-active");
                    navMenu.style.display = "none";
                }
            });
        });
    }
});

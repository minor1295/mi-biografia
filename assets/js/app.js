const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const toggleButton = document.querySelector("#toggle-certifications");
const moreCertifications = document.querySelector("#more-certifications");

const updateHeaderState = () => {
    if (!header) {
        return;
    }

    header.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                currentObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.16,
            rootMargin: "0px 0px -30px 0px",
        }
    );

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (toggleButton && moreCertifications) {
    toggleButton.addEventListener("click", () => {
        const isHidden = moreCertifications.hasAttribute("hidden");

        if (isHidden) {
            moreCertifications.removeAttribute("hidden");
            toggleButton.setAttribute("aria-expanded", "true");
            toggleButton.textContent = "Ver menos certificaciones";

            requestAnimationFrame(() => {
                moreCertifications.querySelectorAll(".reveal").forEach((card) => {
                    card.classList.add("is-visible");
                });
            });

            return;
        }

        moreCertifications.setAttribute("hidden", "");
        toggleButton.setAttribute("aria-expanded", "false");
        toggleButton.textContent = "Ver más certificaciones";
    });
}

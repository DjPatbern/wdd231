document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            navToggle.classList.toggle("open"); 
        });

        document.querySelectorAll("#nav-menu a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                navToggle.classList.remove("open");
            });
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                navMenu.classList.remove("active");
                navToggle.classList.remove("open");
            }
        });
    }
});


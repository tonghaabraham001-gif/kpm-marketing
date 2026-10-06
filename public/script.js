/* =========================================================
   KPM MARKETING
   Project ID: KPM-WEB-001
   Developed by KPM Marketing
   ========================================================= */


// =========================================================
// MOBILE NAVIGATION
// =========================================================

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {

        navigation.classList.toggle("active");

        const isOpen = navigation.classList.contains("active");

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        menuToggle.textContent = isOpen ? "×" : "☰";

    });

}


// Close mobile navigation after clicking a link

if (navigation) {

    const navLinks = navigation.querySelectorAll("a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navigation.classList.remove("active");

            if (menuToggle) {

                menuToggle.textContent = "☰";

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

            }

        });

    });

}



// =========================================================
// SCROLL REVEAL ANIMATION
// =========================================================

const revealElements = document.querySelectorAll(
    ".service-card, .project-card, .process-step, .visual-card, .about-content"
);


if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.style.opacity = "1";

        element.style.transform = "translateY(0)";

    });

}



// =========================================================
// ZEALOUS EVENTS
// Project ID: KPM-WEB-001
// =========================================================

const zealousPreviewImage =
    document.getElementById("zealousPreviewImage");

const zealousTabs =
    document.querySelectorAll(".zealous-tab");


if (zealousPreviewImage && zealousTabs.length > 0) {

    zealousTabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            const image =
                tab.getAttribute("data-image");

            if (!image) return;


            // Fade image out

            zealousPreviewImage.style.opacity = "0";


            setTimeout(() => {

                zealousPreviewImage.src = image;

                zealousPreviewImage.style.opacity = "1";

            }, 180);


            // Update active button

            zealousTabs.forEach((item) => {

                item.classList.remove("active");

            });

            tab.classList.add("active");

        });

    });

}



/* =========================================================
   LOVE TAILOR & LAUNDRY — PORTFOLIO PREVIEW
   Project ID: KPM-WEB-002
   Developed by KPM Marketing
   ========================================================= */

const loveTailorPreviewImage =
    document.getElementById("loveTailorPreviewImage");

const loveTailorTabs =
    document.querySelectorAll(".love-tailor-tab");

loveTailorTabs.forEach((tab) => {
    tab.addEventListener("click", () => {

        const image = tab.dataset.image;

        if (!loveTailorPreviewImage || !image) return;

        loveTailorPreviewImage.style.opacity = "0";

        setTimeout(() => {
            loveTailorPreviewImage.src = image;
            loveTailorPreviewImage.style.opacity = "1";
        }, 180);

        loveTailorTabs.forEach((item) => {
            item.classList.remove("active");
        });

        tab.classList.add("active");
    });
});/* =========================================================
   MOBILE SWIPE SUPPORT
   Zealous Events + Love Tailor & Laundry
   ========================================================= */

function enablePortfolioSwipe(previewImage, tabs) {

    if (!previewImage || tabs.length === 0) return;

    let touchStartX = 0;
    let touchEndX = 0;

    previewImage.addEventListener("touchstart", (event) => {

        touchStartX = event.changedTouches[0].screenX;

    }, { passive: true });


    previewImage.addEventListener("touchend", (event) => {

        touchEndX = event.changedTouches[0].screenX;

        const swipeDistance = touchEndX - touchStartX;

        // Ignore very small movements
        if (Math.abs(swipeDistance) < 50) return;

        const activeIndex = Array.from(tabs).findIndex(
            (tab) => tab.classList.contains("active")
        );

        if (activeIndex === -1) return;

        let nextIndex;

        if (swipeDistance < 0) {

            // Swipe left → next image
            nextIndex = (activeIndex + 1) % tabs.length;

        } else {

            // Swipe right → previous image
            nextIndex =
                (activeIndex - 1 + tabs.length) % tabs.length;

        }

        tabs[nextIndex].click();

    }, { passive: true });

}


/* Enable swipe for both portfolio projects */

enablePortfolioSwipe(
    zealousPreviewImage,
    zealousTabs
);

enablePortfolioSwipe(
    loveTailorPreviewImage,
    loveTailorTabs
)/* =========================================================
   KPM PORTFOLIO — IMAGE LIGHTBOX
   Tap, zoom, and swipe through portfolio images
   ========================================================= */

const kpmLightbox =
    document.getElementById("kpmLightbox");

const kpmLightboxImage =
    document.getElementById("kpmLightboxImage");

const kpmLightboxClose =
    document.getElementById("kpmLightboxClose");


/* ---------------------------------------------------------
   Portfolio groups
   --------------------------------------------------------- */

const portfolioGroups = [
    {
        image: zealousPreviewImage,
        tabs: zealousTabs
    },
    {
        image: loveTailorPreviewImage,
        tabs: loveTailorTabs
    }
];


/* ---------------------------------------------------------
   Open lightbox
   --------------------------------------------------------- */

portfolioGroups.forEach((group) => {

    if (!group.image) return;

    group.image.style.cursor = "zoom-in";

    group.image.addEventListener("click", () => {

        if (!kpmLightbox || !kpmLightboxImage) return;

        kpmLightboxImage.src = group.image.src;
        kpmLightboxImage.alt = group.image.alt;

        kpmLightbox.classList.add("active");
        kpmLightbox.setAttribute("aria-hidden", "false");

        kpmLightboxImage.classList.remove("zoomed");

        // Remember which portfolio is currently open
        kpmLightbox.currentGroup = group;

    });

});


/* ---------------------------------------------------------
   Close lightbox
   --------------------------------------------------------- */

function closeKpmLightbox() {

    if (!kpmLightbox) return;

    kpmLightbox.classList.remove("active");
    kpmLightbox.setAttribute("aria-hidden", "true");

    if (kpmLightboxImage) {
        kpmLightboxImage.classList.remove("zoomed");
    }

}


if (kpmLightboxClose) {

    kpmLightboxClose.addEventListener(
        "click",
        closeKpmLightbox
    );

}


/* ---------------------------------------------------------
   Tap image → zoom
   --------------------------------------------------------- */

if (kpmLightboxImage) {

    kpmLightboxImage.addEventListener("click", (event) => {

        event.stopPropagation();

        kpmLightboxImage.classList.toggle("zoomed");

    });

}


/* ---------------------------------------------------------
   Swipe while lightbox is open
   --------------------------------------------------------- */

let lightboxTouchStartX = 0;

if (kpmLightboxImage) {

    kpmLightboxImage.addEventListener(
        "touchstart",
        (event) => {

            lightboxTouchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    kpmLightboxImage.addEventListener(
        "touchend",
        (event) => {

            const touchEndX =
                event.changedTouches[0].screenX;

            const swipeDistance =
                touchEndX - lightboxTouchStartX;

            if (Math.abs(swipeDistance) < 50) return;

            const group =
                kpmLightbox.currentGroup;

            if (!group || !group.tabs.length) return;


            const activeIndex =
                Array.from(group.tabs).findIndex(
                    (tab) =>
                        tab.classList.contains("active")
                );


            if (activeIndex === -1) return;


            let nextIndex;


            if (swipeDistance < 0) {

                // Swipe left → next image
                nextIndex =
                    (activeIndex + 1) %
                    group.tabs.length;

            } else {

                // Swipe right → previous image
                nextIndex =
                    (activeIndex - 1 +
                        group.tabs.length) %
                    group.tabs.length;

            }


            const nextTab =
                group.tabs[nextIndex];

            if (!nextTab) return;


            // Change the original portfolio image
            nextTab.click();


            // Update the expanded image
            setTimeout(() => {

                if (group.image && kpmLightboxImage) {

                    kpmLightboxImage.src =
                        group.image.src;

                    kpmLightboxImage.alt =
                        group.image.alt;

                }

            }, 190);


            // Reset zoom after changing image
            kpmLightboxImage.classList.remove(
                "zoomed"
            );

        },
        { passive: true }
    );

}


/* ---------------------------------------------------------
   Click outside image → close
   --------------------------------------------------------- */

if (kpmLightbox) {

    kpmLightbox.addEventListener(
        "click",
        (event) => {

            if (event.target === kpmLightbox) {

                closeKpmLightbox();

            }

        }
    );

}


/* ---------------------------------------------------------
   Escape key → close
   --------------------------------------------------------- */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            closeKpmLightbox();

        }

    }
);
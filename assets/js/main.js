(() => {
    "use strict";

    const header = document.querySelector("[data-header]");

    // Footer year
    document.querySelectorAll("[data-year]").forEach((el) => {
        el.textContent = new Date().getFullYear();
    });

    // Mobile navigation
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-nav]");

    if (header && toggle && nav) {
        const backdrop = document.querySelector("[data-nav-backdrop]");
        const isOpen = () => document.body.classList.contains("nav-open");

        const setOpen = (open) => {
            document.body.classList.toggle("nav-open", open);
            toggle.setAttribute("aria-expanded", String(open));
            document.body.style.overflow = open ? "hidden" : "";
            if (open) {
                const firstLink = nav.querySelector("a");
                if (firstLink) setTimeout(() => firstLink.focus(), 160);
            }
        };

        toggle.addEventListener("click", () => setOpen(!isOpen()));

        if (backdrop) {
            backdrop.addEventListener("click", () => setOpen(false));
        }

        nav.addEventListener("click", (e) => {
            if (e.target.closest("a")) setOpen(false);
        });

        document.addEventListener("keydown", (e) => {
            if (!isOpen()) return;

            if (e.key === "Escape") {
                setOpen(false);
                toggle.focus();
            }

            // Focus trap while the drawer is open
            if (e.key === "Tab") {
                const focusables = [toggle, ...nav.querySelectorAll("a[href]")];
                const first = focusables[0];
                const last = focusables[focusables.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });

        // Close if resized up to desktop
        window.addEventListener("resize", () => {
            if (window.innerWidth > 700 && isOpen()) {
                setOpen(false);
            }
        });
    }

    // Header shadow on scroll
    if (header) {
        const onScroll = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 8);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
    }

    // Scroll reveal
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in-view");
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        revealEls.forEach((el) => io.observe(el));
    } else {
        revealEls.forEach((el) => el.classList.add("in-view"));
    }

    // Back to top
    const toTop = document.querySelector("[data-to-top]");

    if (toTop) {
        const toggleToTop = () => {
            const show = window.scrollY > 600;
            toTop.classList.toggle("is-visible", show);
            toTop.setAttribute("aria-hidden", String(!show));
            toTop.tabIndex = show ? 0 : -1;
        };
        toggleToTop();
        window.addEventListener("scroll", toggleToTop, { passive: true });
        toTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Menu category filters
    const chips = document.querySelectorAll("[data-filter]");
    const items = document.querySelectorAll("[data-category]");

    chips.forEach((chip) => {
        chip.addEventListener("click", () => {
            chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
            const filter = chip.dataset.filter;
            items.forEach((item) => {
                item.hidden = filter !== "all" && item.dataset.category !== filter;
            });
        });
    });

    // Contact form validation + demo success
    const form = document.querySelector("[data-form]");

    if (form) {
        form.setAttribute("novalidate", "");

        const validateField = (field) => {
            const wrap = field.closest(".field");
            if (!wrap) return true;
            const valid =
                field.checkValidity() &&
                !(field.id === "pickup-date" && field.value && field.value <= field.min);
            wrap.classList.toggle("invalid", !valid && (field.value !== "" || field.required));
            return valid;
        };

        const dateInput = form.querySelector("#pickup-date");
        if (dateInput) {
            const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
            dateInput.min = tomorrow;
        }

        form.querySelectorAll("input, select, textarea").forEach((field) => {
            field.addEventListener("blur", () => validateField(field));
            field.addEventListener("input", () => {
                const wrap = field.closest(".field");
                if (wrap && wrap.classList.contains("invalid")) validateField(field);
            });
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            let allValid = true;
            form.querySelectorAll("input, select, textarea").forEach((field) => {
                const ok = validateField(field);
                if (!ok && allValid) {
                    field.focus();
                    allValid = false;
                } else if (!ok) {
                    allValid = false;
                }
            });

            if (!allValid) return;

            // Placeholder endpoint -> simulate success until a real Formspree ID is set
            const isDemo = form.action.includes("YOUR_FORM_ID");

            if (!isDemo) {
                form.removeAttribute("novalidate");
                form.submit();
                return;
            }

            const success = form.querySelector(".form-success");
            if (success) {
                success.hidden = false;
                success.scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
            form.reset();
            form.querySelectorAll(".field.invalid").forEach((f) =>
                f.classList.remove("invalid")
            );
        });
    }
})();

(() => {
    "use strict";

    const BRAND = {
        name: "Crumb&nbsp;<span class=\"amp\">&amp;</span>&nbsp;Ember",
        home: "index.html",
        tel: "+255740383245",
        telDisplay: "+255 740 383 245",
        email: "mwikalijoyce301@gmail.com",
        wa: "https://wa.me/255740383245"
    };

    const NAV = [
        { href: "index.html", label: "Home", key: "index" },
        { href: "products.html", label: "Menu", key: "products" },
        { href: "about.html", label: "Our Story", key: "about" },
        { href: "contact.html", label: "Visit", key: "contact" }
    ];

    const FOOTER_HOURS = [
        { d: "Tue – Fri", v: "7:00 – 18:00" },
        { d: "Saturday", v: "8:00 – 17:00" },
        { d: "Sunday", v: "8:00 – 14:00" },
        { d: "Monday", v: "Oven rests" }
    ];

    const ICON_PHONE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.5 2.9.7a2 2 0 0 1 1.6 1.9z"/></svg>';
    const ICON_WHATSAPP = '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true"><path d="M12 2a9.9 9.9 0 0 0-8.5 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.1 14.9l-.5-.3-3 .8.8-2.9-.3-.5A8 8 0 0 1 12 4zm-3.1 4.2c-.2 0-.5.1-.7.4-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3l-2-.9c-.3-.1-.5-.2-.7.1l-.9 1.1c-.2.2-.3.3-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.4-.6-.4h-.6z"/></svg>';
    const ICON_EMAIL = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>';
    const ICON_TO_TOP = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5m0 0-6 6m6-6 6 6"/></svg>';

    const headerTemplate = (current) => `
        <div class="container header-inner">
            <a class="brand" href="${BRAND.home}" aria-label="Crumb and Ember — home">
                <img src="assets/img/logo.svg" alt="" width="36" height="36">
                <span class="brand-name">${BRAND.name}</span>
            </a>
            <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="site-nav">
                <span class="nav-toggle-box" aria-hidden="true"><i></i><i></i><i></i></span>
                <span class="visually-hidden">Menu</span>
            </button>
            <div class="nav-backdrop" data-nav-backdrop aria-hidden="true"></div>
            <nav id="site-nav" class="site-nav" data-nav aria-label="Main navigation">
                <ul class="nav-list">
                    ${NAV.map((item) => `
                        <li><a href="${item.href}"${item.key === current ? " aria-current=\"page\"" : ""}>${item.label}</a></li>
                    `).join("")}
                    <li class="nav-item-cta"><a class="btn btn-primary btn-sm" href="contact.html#order">Order ahead</a></li>
                </ul>
                <div class="nav-extra">
                    <a class="drawer-tel" href="tel:${BRAND.tel}">
                        ${ICON_PHONE}
                        ${BRAND.telDisplay}
                    </a>
                    <a class="btn btn-ghost btn-block" href="${BRAND.wa}" target="_blank" rel="noopener">WhatsApp us</a>
                </div>
            </nav>
        </div>
    `;

    const footerTemplate = (minimal) => {
        if (minimal) {
            return `
                <div class="container footer-base">
                    <p>© <span data-year>2026</span> Crumb &amp; Ember Bakery.</p>
                    <p class="footer-note">Baked with patience.</p>
                </div>
            `;
        }
        return `
            <div class="container footer-grid">
                <div class="footer-brand">
                    <a class="brand brand-light" href="${BRAND.home}">
                        <img src="assets/img/logo.svg" alt="" width="34" height="34">
                        <span class="brand-name">${BRAND.name}</span>
                    </a>
                    <p>Small-batch bread and pastry from a single wood-fired oven. Pre-order by 8 PM for next-morning pickup.</p>
                    <ul class="socials" role="list">
                        <li><a href="${BRAND.wa}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${ICON_WHATSAPP}</a></li>
                        <li><a href="mailto:${BRAND.email}" aria-label="Email us">${ICON_EMAIL}</a></li>
                    </ul>
                </div>
                <nav class="footer-nav" aria-label="Footer navigation">
                    <h3>Explore</h3>
                    <ul role="list">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="products.html">Menu</a></li>
                        <li><a href="about.html">Our story</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </nav>
                <nav class="footer-nav" aria-label="Legal">
                    <h3>Legal</h3>
                    <ul role="list">
                        <li><a href="terms.html">Terms of Service</a></li>
                        <li><a href="privacy.html">Privacy Policy</a></li>
                    </ul>
                </nav>
                <div class="footer-hours">
                    <h3>Hours</h3>
                    <dl>
                        ${FOOTER_HOURS.map(({ d, v }) => `<div><dt>${d}</dt><dd>${v}</dd></div>`).join("")}
                    </dl>
                </div>
                <div class="footer-findus">
                    <h3>Find us</h3>
                    <address>
                        12 Mill Lane, Old Town<br>
                        <a href="mailto:${BRAND.email}">${BRAND.email}</a><br>
                        <a href="tel:${BRAND.tel}">${BRAND.telDisplay}</a>
                    </address>
                </div>
            </div>
            <div class="container footer-base">
                <p>© <span data-year>2026</span> Crumb &amp; Ember Bakery. All rights reserved.</p>
                <p class="footer-note">Baked with patience.</p>
            </div>
        `;
    };

    const inject = (host, html) => {
        const tpl = document.createElement("template");
        tpl.innerHTML = html.trim();
        host.replaceChildren(tpl.content.cloneNode(true));
    };

    // Footer year + back-to-top are shared across the whole page, so wire once.
    const initShared = () => {
        document.querySelectorAll("[data-year]").forEach((el) => {
            el.textContent = new Date().getFullYear();
        });
    };

    // <site-header> renders the nav. Carries the existing .site-header class so
    // the design-system CSS keeps applying without changes.
    class SiteHeader extends HTMLElement {
        connectedCallback() {
            if (this._rendered) return;
            this._rendered = true;
            inject(this, headerTemplate(this.getAttribute("current") || ""));
            this.classList.add("site-header");
            this.setAttribute("data-header", "");
        }
    }

    // <site-footer> renders the footer (optionally minimal for the 404 page).
    class SiteFooter extends HTMLElement {
        connectedCallback() {
            if (this._rendered) return;
            this._rendered = true;
            const minimal = this.hasAttribute("minimal");
            inject(this, footerTemplate(minimal));
            this.classList.add("site-footer");
            initShared();
        }
    }

    if ("customElements" in window) {
        customElements.define("site-header", SiteHeader);
        customElements.define("site-footer", SiteFooter);
    }

    // Re-run when the drawer/hamburger toggles are present after injection.
    const ready = () => initShared();
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", ready);
    } else {
        ready();
    }

    // Export nothing; main.js binds to data attributes once components are present.
})();
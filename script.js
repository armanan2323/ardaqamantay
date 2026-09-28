const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });
}

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu?.classList.remove("open");
    });
});

const langButtons = document.querySelectorAll(".lang-btn");

function setLanguage(lang) {
    document.documentElement.lang = lang === "kz" ? "kk" : "ru";

    document.querySelectorAll("[data-ru][data-kz]").forEach(element => {
        element.textContent = element.dataset[lang];
    });

    document.querySelectorAll("[data-placeholder-ru]").forEach(element => {
        element.placeholder = lang === "kz"
            ? element.dataset.placeholderKz
            : element.dataset.placeholderRu;
    });

    langButtons.forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.lang === lang
        );
    });

    localStorage.setItem("ardaq-language", lang);
}

langButtons.forEach(button => {
    button.addEventListener("click", () => {
        setLanguage(button.dataset.lang);
    });
});

setLanguage(localStorage.getItem("ardaq-language") || "ru");

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".catalog-card");

filters.forEach(filter => {
    filter.addEventListener("click", () => {
        filters.forEach(item => item.classList.remove("active"));
        filter.classList.add("active");

        const category = filter.dataset.filter;

        cards.forEach(card => {
            const visible =
                category === "all" ||
                card.dataset.category === category;

            card.classList.toggle("hide", !visible);
        });
    });
});

const orderForm = document.querySelector("#orderForm");
const formMessage = document.querySelector("#formMessage");

if (orderForm) {
    orderForm.addEventListener("submit", event => {
        event.preventDefault();

        const name = orderForm.querySelector('[name="name"]')?.value.trim() || "";
        const phone = orderForm.querySelector('[name="phone"]')?.value.trim() || "";
        const category = orderForm.querySelector('[name="category"]')?.value.trim() || "";
        const message = orderForm.querySelector('[name="message"]')?.value.trim() || "";

        const text = `Новая заявка с сайта ArdaqAmantay

Имя: ${name}
Телефон: ${phone}
Категория: ${category}
Сообщение: ${message}`;

        const whatsappUrl = `https://wa.me/77089338225?text=${encodeURIComponent(text)}`;

        window.open(whatsappUrl, "_blank");

        const language = localStorage.getItem("ardaq-language") || "ru";

        formMessage.textContent = language === "kz"
            ? "Өтінім WhatsApp арқылы жіберуге дайын."
            : "Заявка подготовлена для отправки в WhatsApp.";

        orderForm.reset();
    });
}

document.querySelectorAll("body *").forEach(element => {
    if (element.children.length === 0) {
        element.textContent = element.textContent.replaceAll("—", "-");
    }
});
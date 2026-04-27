async function loadLanguage(lang) {
    const res = await fetch(`./assets/lang/${lang}.json`);
    const translations = await res.json();

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        el.textContent = translations[key] || key;
    });
}

// Idioma
document.getElementById("langSwitcher").addEventListener("change", e => {
    const lang = e.target.value;
    loadLanguage(lang);
    localStorage.setItem("language", lang);
});

// Cor primária
document.getElementById("colorPicker").addEventListener("input", e => {
    document.documentElement.style.setProperty("--primary-color", e.target.value);
    localStorage.setItem("primaryColor", e.target.value);
});

// Fonte
document.getElementById("fontSize").addEventListener("input", e => {
    document.documentElement.style.setProperty("--font-size", e.target.value + "px");
    localStorage.setItem("fontSize", e.target.value);
});

// Carregar preferências salvas
window.addEventListener("load", () => {
    const savedLang = localStorage.getItem("language") || "pt-br";
    const savedColor = localStorage.getItem("primaryColor");
    const savedFont = localStorage.getItem("fontSize");

    loadLanguage(savedLang);
    if (savedColor) document.documentElement.style.setProperty("--primary-color", savedColor);
    if (savedFont) document.documentElement.style.setProperty("--font-size", savedFont + "px");

    // Sempre dark
    document.documentElement.classList.add("dark-theme");
});
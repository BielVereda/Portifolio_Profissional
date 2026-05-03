// Função para carregar idioma
async function loadLanguage(lang) {
    try {
        const response = await fetch(`./assets/lang/${lang}.json`);
        const translations = await response.json();

        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const keys = el.getAttribute("data-i18n").split(".");
            let text = translations;
            keys.forEach((key) => {
                if (text && text[key]) {
                    text = text[key];
                } else {
                    text = null;
                }
            });
            if (text) {
                el.textContent = text;
            }
        });
    } catch (error) {
        console.error("Erro ao carregar idioma:", error);
    }
}

// Função para salvar preferências
function savePreference(key, value) {
    localStorage.setItem(key, value);
}

// Carregar preferências salvas (com pt-br como padrão)
window.addEventListener("load", () => {
    const savedColor = localStorage.getItem("primaryColor");
    const savedFont = localStorage.getItem("fontSize");

    // Sempre inicia em pt-br
    loadLanguage("pt-br");
    savePreference("language", "pt-br");

    if (savedColor) {
        document.documentElement.style.setProperty("--primary-color", savedColor);
    }
    if (savedFont) {
        document.documentElement.style.setProperty("--font-size", savedFont + "px");
    }

    // Sempre dark
    document.documentElement.classList.add("dark-theme");
});

// Alterar idioma manualmente
document.getElementById("langSwitcher").addEventListener("change", (e) => {
    const lang = e.target.value;
    loadLanguage(lang);
    savePreference("language", lang);
});

// Alterar cor primária
document.getElementById("colorPicker").addEventListener("input", (e) => {
    const color = e.target.value;
    document.documentElement.style.setProperty("--primary-color", color);
    savePreference("primaryColor", color);
});

// Alterar tamanho da fonte
document.getElementById("fontSize").addEventListener("input", (e) => {
    const fontSize = e.target.value;
    document.documentElement.style.setProperty("--font-size", fontSize + "px");
    savePreference("fontSize", fontSize);
});
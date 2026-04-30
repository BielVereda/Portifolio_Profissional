const configBtn = document.getElementById("configBtn");
const settingsPanel = document.querySelector(".settings-panel");

configBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // evita conflito com clique fora
    settingsPanel.classList.toggle("active");
});

// Fecha se clicar fora
document.addEventListener("click", (e) => {
    if (
        settingsPanel.classList.contains("active") &&
        !settingsPanel.contains(e.target) &&
        e.target !== configBtn &&
        !configBtn.contains(e.target)
    ) {
        settingsPanel.classList.remove("active");
    }
});
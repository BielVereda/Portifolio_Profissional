document.addEventListener("DOMContentLoaded", () => {
    const secretInput = document.getElementById("secretCode");
    const feedback = document.createElement("p");
    feedback.id = "secretFeedback";
    feedback.style.color = "var(--primary-color)";
    feedback.style.fontWeight = "bold";
    feedback.style.marginTop = "0.5rem";

    if (secretInput && secretInput.parentNode) {
        secretInput.parentNode.appendChild(feedback);
    }

    const codes = [
        "vereda", "matrix", "retro", "darkside",
        "konami", "glitch", "invert", "biel",
        "devmode", "neon"
    ];

    const unlocked = new Set();

    // ============================
    // MATRIX CANVAS
    // ============================
    const canvas = document.getElementById("matrix");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "01";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0);

    function getPrimaryColor() {
        return getComputedStyle(document.documentElement)
            .getPropertyValue('--primary-color')
            .trim();
    }

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = getPrimaryColor(); // usa a cor primária
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 33);

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // ============================
    // FUNÇÃO ARCO-ÍRIS VIA JS
    // ============================
    function startRainbowAnimation() {
        const colors = ["red","orange","yellow","green","blue","indigo","violet"];
        let i = 0;

        setInterval(() => {
            document.documentElement.style.setProperty("--primary-color", colors[i % colors.length]);
            i++;
        }, 4000); // troca a cada quatro segundos
    }

    // ============================
    // EASTER EGGS
    // ============================
    secretInput.addEventListener("change", () => {
        const code = secretInput.value.trim().toLowerCase();

        document.body.classList.remove(
            "rainbow-mode", "matrix-mode", "retro-mode",
            "darkside-mode", "glitch-mode", "invert-mode", "neon-mode"
        );

        if (codes.includes(code)) {
            unlocked.add(code);

            switch (code) {
                case "vereda":
                    document.body.classList.add("rainbow-mode");
                    startRainbowAnimation(); // ativa o arco-íris JS
                    break;

                case "matrix":
                    document.body.classList.add("matrix-mode");
                    break;

                case "retro":
                    document.body.classList.add("retro-mode");
                    break;

                case "darkside":
                    document.body.classList.add("darkside-mode");
                    break;

                case "konami":
                    alert("🎉 Você desbloqueou o Konami Code!");
                    break;

                case "glitch":
                    document.body.classList.add("glitch-mode");
                    setTimeout(() => document.body.classList.remove("glitch-mode"), 3000);
                    break;

                case "invert":
                    document.body.classList.add("invert-mode");
                    break;

                case "biel":
                    alert("✨ Você achou o segredo do Biel!");
                    break;

                case "devmode":
                    alert("📊 DevMode: Projetos carregados: " + document.querySelectorAll(".project-card").length);
                    break;

                case "neon":
                    document.body.classList.add("neon-mode");
                    break;
            }

            feedback.textContent = `✨ Código aceito! (${unlocked.size}/10 easter eggs encontrados)`;
        } else {
            feedback.textContent = "❌ Código inválido ou desconhecido.";
        }

        secretInput.value = "";
    });
});
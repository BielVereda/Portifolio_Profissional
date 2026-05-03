document.addEventListener("DOMContentLoaded", () => {
    /* === FILTRO DE PROJETOS + CARROSSEL === */
    const filterButtons = document.querySelectorAll(".filter button");
    const projects = Array.from(document.querySelectorAll(".project-card"));
    const track = document.querySelector(".carousel-track");
    const prevBtn = document.querySelector(".carousel-btn.prev");
    const nextBtn = document.querySelector(".carousel-btn.next");

    let index = 0;

    // Função para embaralhar array (Fisher-Yates shuffle)
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Embaralha os projetos e reinsere no track
    const shuffledProjects = shuffle(projects);
    shuffledProjects.forEach(project => track.appendChild(project));

    // Mostra todos os projetos no início
    shuffledProjects.forEach(project => {
        project.style.display = "block";
    });

    // Marca "Todos" como ativo no início
    const allBtn = document.querySelector('[data-filter="all"]');
    if (allBtn) {
        allBtn.classList.add("active");
    }

    // Atualiza carrossel centralizando o card selecionado
    function updateCarousel() {
        const visibleProjects = Array.from(shuffledProjects).filter(
            p => p.style.display !== "none"
        );
        if (visibleProjects.length > 0) {
            const cardWidth = visibleProjects[0].offsetWidth + 32; // largura + margem
            const offset = (track.offsetWidth / 2) - (cardWidth / 2);
            track.style.transform = `translateX(${offset - index * cardWidth}px)`;
        }
    }

    // Lógica de clique nos botões de filtro
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const category = btn.getAttribute("data-filter");

            // Remove active de todos e adiciona no clicado
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            // Filtra os projetos
            shuffledProjects.forEach(project => {
                project.style.display =
                    category === "all" || project.dataset.category === category
                        ? "block"
                        : "none";
            });

            // Reset carrossel ao aplicar filtro
            index = 0;
            updateCarousel();
        });
    });

    // Botões do carrossel com navegação circular
    prevBtn.addEventListener("click", () => {
        const visibleProjects = Array.from(shuffledProjects).filter(
            p => p.style.display !== "none"
        );
        if (visibleProjects.length > 0) {
            index = (index - 1 + visibleProjects.length) % visibleProjects.length;
            updateCarousel();
        }
    });

    nextBtn.addEventListener("click", () => {
        const visibleProjects = Array.from(shuffledProjects).filter(
            p => p.style.display !== "none"
        );
        if (visibleProjects.length > 0) {
            index = (index + 1) % visibleProjects.length;
            updateCarousel();
        }
    });

    // Inicializa carrossel centralizado
    updateCarousel();


    /* === DROPDOWN CURRÍCULO === */
    const resumeSelect = document.getElementById("resumeFormat");
    const resumeDownload = document.getElementById("resumeDownload");

    if (resumeSelect && resumeDownload) {
        // Define PDF como padrão
        resumeDownload.href = `./assets/docs/Curriculum_BielVereda.${resumeSelect.value}`;

        resumeSelect.addEventListener("change", () => {
            const format = resumeSelect.value;
            resumeDownload.href = `./assets/docs/Curriculum_BielVereda.${format}`;
        });
    }


    /* === NAVBAR ACTIVE ON SCROLL === */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    function setActiveLink() {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", setActiveLink);
});
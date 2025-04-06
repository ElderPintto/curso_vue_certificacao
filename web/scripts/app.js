import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

document.addEventListener("DOMContentLoaded", () => {
  const contentArea = document.getElementById("content-area");

  const modules = [
    { id: "modulo1", name: "Introdução", type: "modulo" },
    { id: "modulo2", name: "Fundamentos", type: "modulo" },
    { id: "modulo3", name: "Reatividade", type: "modulo" },
    { id: "modulo4", name: "Componentes", type: "modulo" },
    { id: "modulo5", name: "Roteamento", type: "modulo" },
    { id: "modulo6", name: "Gerenciamento de Estado", type: "modulo" },
    { id: "modulo7", name: "Composition API", type: "modulo" },
    { id: "modulo8", name: "Testes e Depuração", type: "modulo" },
    {
      id: "cronograma_estudos",
      name: "Cronograma de Estudos",
      type: "complementar",
    },
    {
      id: "exercicios_praticos",
      name: "Exercícios Práticos",
      type: "complementar",
    },
    {
      id: "requisitos_certificacao",
      name: "Requisitos de Certificação",
      type: "complementar",
    },
  ];

  // config do Marked para syntax highlighting
  marked.setOptions({
    highlight: function (code, lang) {
      // Adicione suporte específico para Vue
      if (lang === "vue") {
        return Prism.highlight(code, Prism.languages.vue, "vue");
      }

      if (Prism.languages[lang]) {
        return Prism.highlight(code, Prism.languages[lang], lang);
      }
      return code;
    },
    langPrefix: "language-",
  });

  // Create module navigation
  modules.forEach((module) => {
    const li = document.createElement("li");
    const a = document.createElement("a");

    a.href = `#${module.id}`;
    a.textContent = module.name;
    a.classList.add("module-link");

    const container =
      module.type === "modulo"
        ? document.querySelector("#module-list")
        : document.querySelector("#complementary-list");

    a.addEventListener("click", () => loadModule(module.id));
    li.appendChild(a);
    container.appendChild(li);
  });

  function loadModule(moduleId) {
    // Caminho relativo correto para GitHub Pages
    fetch(`markdown/${moduleId}.md`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((markdown) => {
        const html = marked.parse(markdown);
        contentArea.innerHTML = `
          <div class="module">
            <h1>${modules.find((m) => m.id === moduleId).name}</h1>
            ${html}
          </div>
        `;

        // Forçar highlight do Prism após renderização
        Prism.highlightAll();

        setupLessonProgress(moduleId);
      })
      .catch((error) => {
        console.error("Erro ao carregar módulo:", error);
        contentArea.innerHTML = `<p>Erro ao carregar módulo: ${error.message}</p>`;
      });
  }

  function setupLessonProgress(moduleId) {
    const lessons = document.querySelectorAll(".lesson");
    lessons.forEach((lesson, index) => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("lesson-completed");

      const lessonKey = `${moduleId}_lesson_${index}`;

      // Load previous progress
      checkbox.checked = localStorage.getItem(lessonKey) === "true";

      checkbox.addEventListener("change", () => {
        localStorage.setItem(lessonKey, checkbox.checked);
      });

      lesson.querySelector(".lesson-header").appendChild(checkbox);
    });
  }

  // Load first module by default
  loadModule("modulo1");

  // Tema Dark
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");

  // Aplicar tema salvo
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Evento de alternância de tema
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Salvar preferência
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  });
});

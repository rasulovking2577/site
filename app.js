(() => {
  "use strict";
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  const year = new Date().getFullYear();
  $$("[data-year]").forEach(el => el.textContent = year);

  const menuButton = $(".menu-toggle");
  const nav = $("#main-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open", !expanded);
    });
    $$("a", nav).forEach(link => link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    }));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        menuButton.setAttribute("aria-expanded", "false");
        nav.classList.remove("open");
        menuButton.focus();
      }
    });
  }

  const progress = $(".scroll-progress");
  let ticking = false;
  const updateProgress = () => {
    if (!progress) return;
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
    ticking = false;
  };
  addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
  updateProgress();

  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });
    revealItems.forEach(el => observer.observe(el));
  } else {
    revealItems.forEach(el => el.classList.add("is-visible"));
  }

  const projectData = {
    saklya: {
      name: "SAKLYA", category: "HOSPITALITY / WEBSITE",
      url: "https://rasulovking2577.github.io/SAKLYA/",
      description: "Веб-проект для заведения. На этой странице собраны ссылка на работающий сайт и краткая информация без неподтверждённых бизнес-результатов.",
      concept: "Визуальное направление кейса показано здесь как редакционное превью. Оно не является скриншотом исходного сайта.",
      role: "Состав и объём личного вклада нужно описывать по фактической истории разработки; здесь не добавлены неподтверждённые детали.",
      type: "preview-saklya"
    },
    aragvi: {
      name: "ARAGVI", category: "RESTAURANT / WEBSITE",
      url: "https://rasulovking2577.github.io/Aragvi/",
      description: "Отдельный опубликованный веб-проект. Открой живую версию, чтобы посмотреть фактический интерфейс.",
      concept: "Превью на странице кейса — графическая обложка портфолио, не скриншот сайта.",
      role: "Технологии и функции не перечисляются без отдельной проверки исходного кода.",
      type: "preview-aragvi"
    },
    barbershop: {
      name: "BARBERSHOP", category: "LOCAL BUSINESS / WEBSITE",
      url: "https://rasulovking2577.github.io/BARBERSHOP/",
      description: "Опубликованный веб-проект для локального сервиса.",
      concept: "Кейс разделяет визуальную обложку и настоящий проект, чтобы не выдавать концептуальную графику за скриншот.",
      role: "Не заявляем неподтверждённые функции, коммерческие показатели или клиентские отзывы.",
      type: "preview-barber"
    },
    portfolio: {
      name: "Личное портфолио", category: "PERSONAL BRAND / WEBSITE",
      url: "https://rasulovking2577.github.io/website/",
      description: "Предыдущая опубликованная версия личного сайта.",
      concept: "Новая концепция RASULOV / GRAVITY задумана как более цельная многостраничная система.",
      role: "Это личный проект. Не добавляем отзывы, награды или вымышленные результаты.",
      type: "preview-portfolio"
    }
  };

  const caseRoot = $("#case-content");
  if (caseRoot) {
    const slug = new URLSearchParams(location.search).get("project") || "saklya";
    const p = projectData[slug] || projectData.saklya;
    const keys = Object.keys(projectData);
    const currentIndex = keys.indexOf(slug);
    const previous = projectData[keys[(currentIndex + keys.length - 1) % keys.length]];
    const next = projectData[keys[(currentIndex + 1) % keys.length]];
    document.title = `${p.name} — кейс RASULOV®`;
    caseRoot.innerHTML = `
      <div class="case-hero reveal is-visible">
        <p class="eyebrow">PROJECT CASE / ${p.category}</p>
        <h1>${p.name === "BARBERSHOP" ? "BARBER<br><span class='outline-text'>SHOP.</span>" : `${p.name}<span class="blue-dot">.</span>`}</h1>
        <p class="page-lead">${p.description}</p>
        <a class="button button-primary" href="${p.url}" target="_blank" rel="noreferrer">Открыть работающий проект <span>↗</span></a>
      </div>
      <div class="case-visual"><div class="tile-art ${p.type}"><span>${p.name}</span><i></i><b>${p.category}</b></div><div class="case-visual-label">${p.name}</div></div>
      <div class="case-content">
        <aside class="case-sidebar">PROJECT / ${String(currentIndex + 1).padStart(2,"0")}<a href="projects.html">← Все проекты</a><a href="${p.url}" target="_blank" rel="noreferrer">Live website ↗</a></aside>
        <article class="case-article">
          <section><h2>Задача и контекст</h2><p>${p.description}</p></section>
          <section><h2>Визуальная концепция</h2><p>${p.concept}</p></section>
          <section><h2>Реализация</h2><p>${p.role}</p><p>Подробный технический разбор можно дополнить после проверки конкретной версии исходников и истории изменений.</p></section>
          <section><h2>Посмотреть проект</h2><p>Лучший способ оценить работу — открыть опубликованную версию.</p><a class="underlined-link" href="${p.url}" target="_blank" rel="noreferrer">Перейти на сайт <span>↗</span></a></section>
          <div class="case-nav"><a href="case.html?project=${keys[(currentIndex + keys.length - 1) % keys.length]}">← ${previous.name}</a><a href="case.html?project=${keys[(currentIndex + 1) % keys.length]}">${next.name} →</a></div>
        </article>
      </div>
      <section class="inline-cta"><p class="eyebrow">NEXT / YOUR PROJECT</p><h2>Обсудим похожую задачу?</h2><a class="button button-primary" href="contact.html">Связаться <span>↗</span></a></section>`;
  }

  const copyButton = $("#copy-brief");
  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const text = $("#brief-text")?.textContent || "";
      const status = $("#copy-status");
      try {
        await navigator.clipboard.writeText(text);
        status.textContent = "Бриф скопирован.";
      } catch {
        const area = document.createElement("textarea");
        area.value = text;
        area.style.position = "fixed";
        area.style.opacity = "0";
        document.body.append(area);
        area.select();
        const ok = document.execCommand("copy");
        area.remove();
        status.textContent = ok ? "Бриф скопирован." : "Не удалось скопировать. Выдели текст и скопируй вручную.";
      }
    });
  }
})();
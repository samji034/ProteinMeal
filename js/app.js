/* ============================================================
   PROTEINMEALS — LOGIQUE DU SITE
   (Normalement tu n'as jamais besoin de toucher à ce fichier :
   pour ajouter une recette, va dans js/recipes.js)
   ============================================================ */

(function () {
  "use strict";

  // --- Éléments du DOM ---
  const listEl = document.getElementById("recipe-list");
  const searchEl = document.getElementById("search");
  const countEl = document.getElementById("count");
  const emptyEl = document.getElementById("empty");
  const sortBtn = document.getElementById("sort-btn");
  const sortMenu = document.getElementById("sort-menu");
  const sortOptions = Array.from(document.querySelectorAll(".sort-option"));

  const modal = document.getElementById("modal");
  const modalBackdrop = modal.querySelector(".modal-backdrop");
  const modalClose = document.getElementById("modal-close");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalStats = document.getElementById("modal-stats");
  const modalIngredients = document.getElementById("modal-ingredients");
  const modalSteps = document.getElementById("modal-steps");

  // --- État ---
  let currentSort = null; // null = alphabétique | "proteines" | "calories"
  let currentQuery = "";

  // Supprime les accents pour une recherche tolérante ("proteine" trouve "protéiné")
  function normalize(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  // --- Filtre + tri ---
  function getVisibleRecipes() {
    let items = RECETTES.filter(function (r) {
      return normalize(r.nom).includes(normalize(currentQuery));
    });

    if (currentSort === "proteines") {
      items.sort(function (a, b) { return b.proteines - a.proteines; });
    } else if (currentSort === "calories") {
      items.sort(function (a, b) { return a.calories - b.calories; });
    } else {
      items.sort(function (a, b) {
        return a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" });
      });
    }
    return items;
  }

  // --- Rendu de la liste ---
  function render() {
    const items = getVisibleRecipes();
    listEl.innerHTML = "";

    items.forEach(function (r) {
      const li = document.createElement("li");

      const card = document.createElement("button");
      card.className = "recipe-card";
      card.type = "button";
      card.setAttribute("aria-label", "Voir la recette : " + r.nom);

      const img = document.createElement("img");
      img.className = "card-img";
      img.src = r.image;
      img.alt = r.nom;
      img.loading = "lazy";
      img.onerror = function () { img.removeAttribute("src"); img.onerror = null; };

      const body = document.createElement("div");
      body.className = "card-body";

      const name = document.createElement("h2");
      name.className = "card-name";
      name.textContent = r.nom;

      const meta = document.createElement("div");
      meta.className = "card-meta";
      meta.append(
        chip("👤 " + r.personnes + (r.personnes > 1 ? " pers." : " pers."), ""),
        chip("🔥 " + r.calories + " kcal", "cal"),
        chip("💪 " + r.proteines + " g prot.", "protein")
      );

      body.append(name, meta);
      card.append(img, body);
      card.addEventListener("click", function () { openModal(r); });
      li.append(card);
      listEl.append(li);
    });

    emptyEl.hidden = items.length > 0;
    countEl.textContent = items.length + (items.length > 1 ? " recettes" : " recette");
  }

  function chip(text, extraClass) {
    const span = document.createElement("span");
    span.className = "chip" + (extraClass ? " " + extraClass : "");
    span.textContent = text;
    return span;
  }

  // --- Recherche ---
  searchEl.addEventListener("input", function () {
    currentQuery = searchEl.value.trim();
    render();
  });

  // --- Menu "Trier par" ---
  function toggleMenu(open) {
    const willOpen = open !== undefined ? open : sortMenu.hidden;
    sortMenu.hidden = !willOpen;
    sortBtn.setAttribute("aria-expanded", String(willOpen));
  }

  sortBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  sortOptions.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const value = btn.dataset.sort;
      // Re-cliquer sur l'option cochée la décoche → retour à l'ordre alphabétique
      currentSort = currentSort === value ? null : value;

      sortOptions.forEach(function (b) {
        b.setAttribute("aria-checked", String(b.dataset.sort === currentSort));
      });
      sortBtn.classList.toggle("is-active", currentSort !== null);
      render();
      toggleMenu(false);
    });
  });

  // Ferme le menu si on clique ailleurs
  document.addEventListener("click", function () {
    if (!sortMenu.hidden) toggleMenu(false);
  });
  sortMenu.addEventListener("click", function (e) { e.stopPropagation(); });

  // --- Popup recette ---
  function openModal(r) {
    modalImg.src = r.image;
    modalImg.alt = r.nom;
    modalTitle.textContent = r.nom;

    modalStats.innerHTML = "";
    modalStats.append(
      chip("👤 " + r.personnes + " pers.", ""),
      chip("🔥 " + r.calories + " kcal / pers.", "cal"),
      chip("💪 " + r.proteines + " g prot. / pers.", "protein")
    );
    if (r.temps) modalStats.append(chip("⏱ " + r.temps, ""));

    modalIngredients.innerHTML = "";
    r.ingredients.forEach(function (ing) {
      const li = document.createElement("li");
      li.textContent = ing;
      modalIngredients.append(li);
    });

    modalSteps.innerHTML = "";
    r.etapes.forEach(function (step) {
      const li = document.createElement("li");
      const p = document.createElement("span");
      p.textContent = step;
      li.append(p);
      modalSteps.append(li);
    });

    modal.hidden = false;
    document.body.classList.add("modal-open");
    modal.querySelector(".modal-card").scrollTop = 0;
    modalClose.focus({ preventScroll: true });
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
  }

  modalClose.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", closeModal); // clic en dehors = fermer
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  // --- Premier rendu ---
  render();
})();

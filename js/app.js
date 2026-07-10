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
  const modalAddCart = document.getElementById("modal-add-cart");

  // Liste de courses
  const cartBtn = document.getElementById("cart-btn");
  const cartCount = document.getElementById("cart-count");
  const cartModal = document.getElementById("cart-modal");
  const cartBackdrop = cartModal.querySelector(".modal-backdrop");
  const cartClose = document.getElementById("cart-close");
  const cartListEl = document.getElementById("cart-list");
  const cartEmpty = document.getElementById("cart-empty");
  const cartActions = document.getElementById("cart-actions");
  const cartCopy = document.getElementById("cart-copy");
  const cartClear = document.getElementById("cart-clear");

  // --- État ---
  let currentSort = null; // null = alphabétique | "proteines" | "calories"
  let currentQuery = "";
  let currentRecipe = null; // recette ouverte dans le popup

  // Liste de courses persistante (survit à la fermeture du site)
  const CART_KEY = "proteinmeals_courses";
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) { cart = []; }

  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
  }

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
    currentRecipe = r;
    modalAddCart.classList.remove("added");
    document.getElementById("modal-add-cart-label").textContent = "Ajouter à la liste de courses";
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
    if (e.key !== "Escape") return;
    if (!cartModal.hidden) closeCart();
    else if (!modal.hidden) closeModal();
  });

  // ============================================================
  // LISTE DE COURSES
  // ============================================================

  function updateCartBadge() {
    cartCount.textContent = String(cart.length);
    cartCount.hidden = cart.length === 0;
  }

  function renderCart() {
    cartListEl.innerHTML = "";

    cart.forEach(function (item, index) {
      const li = document.createElement("li");

      const text = document.createElement("span");
      text.className = "cart-item-text";
      text.textContent = item;

      const remove = document.createElement("button");
      remove.className = "cart-remove";
      remove.type = "button";
      remove.textContent = "✕";
      remove.setAttribute("aria-label", "Supprimer : " + item);
      remove.addEventListener("click", function () {
        cart.splice(index, 1);
        saveCart();
        renderCart();
      });

      li.append(text, remove);
      cartListEl.append(li);
    });

    cartEmpty.hidden = cart.length > 0;
    cartActions.hidden = cart.length === 0;
    updateCartBadge();
  }

  // Ajout des ingrédients de la recette ouverte (sans doublons exacts)
  modalAddCart.addEventListener("click", function () {
    if (!currentRecipe) return;
    let added = 0;
    currentRecipe.ingredients.forEach(function (ing) {
      if (!cart.includes(ing)) {
        cart.push(ing);
        added++;
      }
    });
    saveCart();
    renderCart();
    modalAddCart.classList.add("added");
    document.getElementById("modal-add-cart-label").textContent =
      added > 0 ? "Ajouté à la liste ✓" : "Déjà dans la liste ✓";
  });

  // Ouverture / fermeture du popup liste de courses
  function openCart() {
    renderCart();
    cartModal.hidden = false;
    document.body.classList.add("modal-open");
    cartModal.querySelector(".modal-card").scrollTop = 0;
  }

  function closeCart() {
    cartModal.hidden = true;
    // Ne réactive le scroll que si le popup recette n'est pas ouvert derrière
    if (modal.hidden) document.body.classList.remove("modal-open");
  }

  cartBtn.addEventListener("click", openCart);
  cartClose.addEventListener("click", closeCart);
  cartBackdrop.addEventListener("click", closeCart);

  // Copier toute la liste dans le presse-papiers
  cartCopy.addEventListener("click", function () {
    const texte = "🛒 Liste de courses ProteinMeals\n\n" +
      cart.map(function (item) { return "- " + item; }).join("\n");

    function feedback(ok) {
      cartCopy.textContent = ok ? "Copié ✓" : "Impossible de copier";
      setTimeout(function () { cartCopy.textContent = "Copier la liste"; }, 2000);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texte)
        .then(function () { feedback(true); })
        .catch(function () { feedback(fallbackCopy(texte)); });
    } else {
      feedback(fallbackCopy(texte));
    }
  });

  // Méthode de secours pour les vieux navigateurs mobiles
  function fallbackCopy(texte) {
    const ta = document.createElement("textarea");
    ta.value = texte;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.append(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    ta.remove();
    return ok;
  }

  // Tout vider
  cartClear.addEventListener("click", function () {
    if (cart.length === 0) return;
    if (confirm("Vider toute la liste de courses ?")) {
      cart = [];
      saveCart();
      renderCart();
    }
  });

  // --- Premier rendu ---
  render();
  updateCartBadge();
})();

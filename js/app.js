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
  const modalAddCartLabel = document.getElementById("modal-add-cart-label");
  const qtyMinus = document.getElementById("qty-minus");
  const qtyPlus = document.getElementById("qty-plus");
  const qtyValue = document.getElementById("qty-value");

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
  let currentSort = null;    // null = alphabétique | "proteines" | "calories"
  let currentQuery = "";
  let currentRecipe = null;  // recette ouverte dans le popup
  let multiplier = 1;        // nombre de fois la recette (×1, ×2…)
  let addFeedbackTimer = null;

  // Liste de courses persistante : tableau de { nom, unite, qte }
  // (qte === null pour les ingrédients sans quantité, ex: "sel, poivre")
  const CART_KEY = "proteinmeals_courses_v2";
  let cart = [];
  try {
    cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) { cart = []; }

  function saveCart() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {}
  }

  // ============================================================
  // OUTILS DE TEXTE
  // ============================================================

  // Supprime les accents pour une recherche tolérante
  function normalize(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // "de " ou "d'" selon la première lettre du nom
  function liaisonDe(nom) {
    return /^[aeiouyhàâäéèêëîïôöùûü]/i.test(nom) ? "d'" : "de ";
  }

  // Met le PREMIER mot au pluriel : "gousse d'ail" → "gousses d'ail"
  function pluriel(nom) {
    const mots = nom.split(" ");
    if (!/[sxz]$/i.test(mots[0])) mots[0] += "s";
    return mots.join(" ");
  }

  // 0.5 → "½", 1.5 → "1½", 0.25 → "¼", sinon nombre arrondi
  function fmtQte(q) {
    const entier = Math.floor(q);
    const reste = q - entier;
    let frac = "";
    if (Math.abs(reste - 0.5) < 0.01) frac = "½";
    else if (Math.abs(reste - 0.25) < 0.01) frac = "¼";
    else if (Math.abs(reste - 0.75) < 0.01) frac = "¾";
    else if (reste > 0.01) return String(Math.round(q * 100) / 100);
    if (entier === 0) return frac || "0";
    return String(entier) + frac;
  }

  /* Texte d'un ingrédient.
     options.mult    : multiplicateur de quantité
     options.courses : true pour la liste de courses
                       (arrondit les unités au supérieur, cache la note) */
  function ingredientText(ing, options) {
    const mult = (options && options.mult) || 1;
    const courses = options && options.courses;

    // Sans quantité ("sel, poivre") : juste le nom
    if (ing.qte == null) return capitalize(ing.nom);

    let q = ing.qte * mult;
    let texte;

    if (ing.unite) {
      // "600 g de blanc de poulet" / "2 c. à soupe d'huile d'olive"
      texte = fmtQte(q) + " " + ing.unite + " " + liaisonDe(ing.nom) + ing.nom;
    } else {
      // À l'unité : dans la liste de courses on arrondit au supérieur
      // (1½ citron → on achète 2 citrons)
      if (courses) q = Math.ceil(q);
      texte = fmtQte(q) + " " + (q > 1 ? pluriel(ing.nom) : ing.nom);
    }

    if (ing.note && !courses) texte += " (" + ing.note + ")";
    return texte;
  }

  // ============================================================
  // LISTE DES RECETTES (recherche + tri + rendu)
  // ============================================================

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
        chip("👤 " + r.personnes + " pers.", ""),
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
      // Re-cliquer sur l'option cochée la décoche → ordre alphabétique
      currentSort = currentSort === value ? null : value;

      sortOptions.forEach(function (b) {
        b.setAttribute("aria-checked", String(b.dataset.sort === currentSort));
      });
      sortBtn.classList.toggle("is-active", currentSort !== null);
      render();
      toggleMenu(false);
    });
  });

  document.addEventListener("click", function () {
    if (!sortMenu.hidden) toggleMenu(false);
  });
  sortMenu.addEventListener("click", function (e) { e.stopPropagation(); });

  // ============================================================
  // POPUP RECETTE
  // ============================================================

  function renderModalStats(r) {
    modalStats.innerHTML = "";
    modalStats.append(
      chip("👤 " + (r.personnes * multiplier) + " pers.", ""),
      chip("🔥 " + r.calories + " kcal / pers.", "cal"),
      chip("💪 " + r.proteines + " g prot. / pers.", "protein")
    );
    if (r.temps) modalStats.append(chip("⏱ " + r.temps, ""));
  }

  function renderModalIngredients(r) {
    modalIngredients.innerHTML = "";
    r.ingredients.forEach(function (ing) {
      const li = document.createElement("li");
      li.textContent = ingredientText(ing, { mult: multiplier });
      modalIngredients.append(li);
    });
  }

  function setMultiplier(value) {
    multiplier = Math.min(9, Math.max(1, value));
    qtyValue.textContent = "×" + multiplier;
    qtyMinus.disabled = multiplier === 1;
    qtyPlus.disabled = multiplier === 9;
    if (currentRecipe) {
      renderModalStats(currentRecipe);
      renderModalIngredients(currentRecipe);
    }
  }

  qtyMinus.addEventListener("click", function () { setMultiplier(multiplier - 1); });
  qtyPlus.addEventListener("click", function () { setMultiplier(multiplier + 1); });

  function openModal(r) {
    currentRecipe = r;
    resetAddButton();
    setMultiplier(1);

    modalImg.src = r.image;
    modalImg.alt = r.nom;
    modalTitle.textContent = r.nom;
    renderModalStats(r);
    renderModalIngredients(r);

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
  modalBackdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!cartModal.hidden) closeCart();
    else if (!modal.hidden) closeModal();
  });

  // ============================================================
  // LISTE DE COURSES
  // ============================================================

  // Clé d'agrégation : même nom + même unité = même ligne
  function cartKey(nom, unite) {
    return normalize(nom) + "|" + (unite || "");
  }

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
      text.textContent = ingredientText(item, { courses: true });

      const remove = document.createElement("button");
      remove.className = "cart-remove";
      remove.type = "button";
      remove.textContent = "✕";
      remove.setAttribute("aria-label", "Supprimer : " + item.nom);
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

  // Ajoute les ingrédients de la recette ouverte, × le multiplicateur.
  // Même nom + même unité → les quantités S'ADDITIONNENT.
  modalAddCart.addEventListener("click", function () {
    if (!currentRecipe) return;

    currentRecipe.ingredients.forEach(function (ing) {
      const key = cartKey(ing.nom, ing.unite);
      const existing = cart.find(function (it) {
        return cartKey(it.nom, it.unite) === key;
      });

      if (ing.qte == null) {
        // Sans quantité : une seule fois dans la liste
        if (!existing) cart.push({ nom: ing.nom, unite: null, qte: null });
      } else if (existing && existing.qte != null) {
        existing.qte += ing.qte * multiplier;
      } else {
        cart.push({ nom: ing.nom, unite: ing.unite || null, qte: ing.qte * multiplier });
      }
    });

    // Liste triée alphabétiquement, plus pratique en magasin
    cart.sort(function (a, b) {
      return a.nom.localeCompare(b.nom, "fr", { sensitivity: "base" });
    });

    saveCart();
    renderCart();

    // Retour visuel, puis le bouton redevient cliquable pour ré-ajouter
    modalAddCart.classList.add("added");
    modalAddCartLabel.textContent = multiplier > 1
      ? "Ajouté ×" + multiplier + " ✓"
      : "Ajouté à la liste ✓";
    clearTimeout(addFeedbackTimer);
    addFeedbackTimer = setTimeout(resetAddButton, 1600);
  });

  function resetAddButton() {
    clearTimeout(addFeedbackTimer);
    modalAddCart.classList.remove("added");
    modalAddCartLabel.textContent = "Ajouter à la liste de courses";
  }

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
      cart.map(function (item) {
        return "- " + ingredientText(item, { courses: true });
      }).join("\n");

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
    cart = [];
    saveCart();
    renderCart();
  });

  // --- Premier rendu ---
  render();
  updateCartBadge();
})();

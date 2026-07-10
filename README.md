# 🍳 ProteinMeals

Site statique pour lister mes recettes protéinées, pensé mobile d'abord.
Aucune dépendance, aucun build : HTML + CSS + JS purs, prêt pour GitHub Pages.

## 📁 Structure

```
proteinmeals/
├── index.html        ← la page (tu n'y touches jamais)
├── css/
│   └── style.css     ← le style (tu n'y touches jamais)
└── js/
    ├── recipes.js    ← ⭐ LES RECETTES : le seul fichier à modifier
    └── app.js        ← la logique (recherche, tri, popup)
```

## ➕ Ajouter une recette (30 secondes)

Ouvre `js/recipes.js`, copie-colle un bloc existant dans le tableau `RECETTES` et modifie-le :

```js
{
  nom: "Nom du plat",
  image: "https://images.unsplash.com/photo-XXXX?w=640&q=60&auto=format&fit=crop",
  personnes: 2,
  calories: 500,      // kcal PAR PERSONNE
  proteines: 40,      // g PAR PERSONNE
  temps: "25 min",
  ingredients: [
    { qte: 300, unite: "g", nom: "blanc de poulet" }, // → "300 g de blanc de poulet"
    { qte: 2, nom: "œuf" },                           // à l'unité → "2 œufs"
    { qte: 0.5, nom: "citron", note: "le jus" },      // → "½ citron (le jus)"
    { nom: "sel, poivre" }                            // sans quantité
  ],
  etapes: [
    "Première étape.",
    "Deuxième étape."
  ]
},
```

**Règles des ingrédients** (c'est ce qui permet à la liste de courses d'additionner) :
- `qte` : nombre (0.5 = ½). Omets-le si pas de quantité (« sel, poivre »).
- `unite` : `"g"`, `"ml"`, `"c. à soupe"`, `"c. à café"`, `"pincée"`… Omets-la pour les choses à l'unité (citron, œuf, avocat…).
- `nom` : **toujours au singulier** pour les unités (le pluriel est automatique) et **exactement le même nom** d'une recette à l'autre pour que les quantités s'additionnent (« blanc de poulet » ≠ « poulet »).
- `note` : précision optionnelle affichée entre parenthèses dans la recette (pas dans la liste de courses).

💡 Pour les images libres de droit : [unsplash.com](https://unsplash.com) → clic droit sur la photo → « Copier l'adresse de l'image », puis ajoute `?w=640&q=60&auto=format&fit=crop` à la fin pour qu'elle charge vite.

Ensuite :

```bash
git add . && git commit -m "Ajout recette : Nom du plat" && git push
```

Le site se met à jour tout seul (compte 1-2 min).

## 🚀 Déployer sur GitHub Pages (première fois)

1. Crée un dépôt sur GitHub (ex: `proteinmeals`)
2. Dans ce dossier :
   ```bash
   git init
   git add .
   git commit -m "Premier commit ProteinMeals"
   git branch -M main
   git remote add origin https://github.com/TON_PSEUDO/proteinmeals.git
   git push -u origin main
   ```
3. Sur GitHub : **Settings → Pages → Source : Deploy from a branch → Branch : `main` / `(root)` → Save**
4. Le site sera en ligne sur `https://TON_PSEUDO.github.io/proteinmeals/`

## ✨ Fonctionnalités

- 🔍 Recherche instantanée (ignore les accents)
- ↕️ Tri : protéines (décroissant), calories (croissant), ou alphabétique si rien n'est coché (re-cliquer sur une option la décoche)
- 📱 Popup recette : croix en haut à droite, clic en dehors ou touche Échap pour fermer
- 🛒 Liste de courses : les quantités du même ingrédient **s'additionnent** (300 g + 300 g = 600 g), les ingrédients à l'unité sont **arrondis au supérieur** (1 citron + ½ citron = 2 citrons), sélecteur ×1 ×2… pour ajouter une recette plusieurs fois, suppression article par article, copie dans le presse-papiers, et sauvegarde automatique en local (localStorage)
- 🖼 Images en lazy-loading pour un chargement rapide

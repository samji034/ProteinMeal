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
    "300 g de ...",
    "1 c. à soupe de ..."
  ],
  etapes: [
    "Première étape.",
    "Deuxième étape."
  ]
},
```

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
- 🖼 Images en lazy-loading pour un chargement rapide

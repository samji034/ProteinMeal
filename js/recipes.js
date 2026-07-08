/* ============================================================
   PROTEINMEALS — LISTE DES RECETTES
   ============================================================
   POUR AJOUTER UNE RECETTE :
   1. Copie-colle un bloc { ... }, (n'oublie pas la virgule)
   2. Remplis les champs
   3. C'est tout. Le site se met à jour tout seul.

   Champs :
   - nom        : nom du plat
   - image      : URL d'une image (libre de droit, ex: unsplash.com)
   - personnes  : nombre de personnes
   - calories   : kcal PAR PERSONNE
   - proteines  : grammes de protéines PAR PERSONNE
   - temps      : temps de préparation (texte libre)
   - ingredients: liste des ingrédients (un par ligne)
   - etapes     : liste des étapes (une par ligne)
   ============================================================ */

const RECETTES = [
  {
    nom: "Bowl poulet & quinoa",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=640&q=60&auto=format&fit=crop",
    personnes: 2,
    calories: 520,
    proteines: 42,
    temps: "25 min",
    ingredients: [
      "300 g de blanc de poulet",
      "150 g de quinoa cru",
      "1 avocat",
      "150 g de tomates cerises",
      "1 poignée de jeunes pousses d'épinards",
      "1 c. à soupe d'huile d'olive",
      "Jus d'un demi-citron",
      "Sel, poivre, paprika"
    ],
    etapes: [
      "Rincer le quinoa puis le cuire 12 à 15 min dans 2 fois son volume d'eau salée. Égoutter.",
      "Couper le poulet en dés, l'assaisonner avec sel, poivre et paprika.",
      "Faire revenir le poulet 6 à 8 min à la poêle avec un filet d'huile d'olive jusqu'à ce qu'il soit doré.",
      "Couper l'avocat en tranches et les tomates cerises en deux.",
      "Dresser les bols : quinoa au fond, puis poulet, avocat, tomates et épinards.",
      "Arroser de jus de citron et d'un filet d'huile d'olive. Servir aussitôt."
    ]
  },
  {
    nom: "Saumon grillé & légumes rôtis",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=640&q=60&auto=format&fit=crop",
    personnes: 2,
    calories: 480,
    proteines: 38,
    temps: "30 min",
    ingredients: [
      "2 pavés de saumon (140 g chacun)",
      "1 courgette",
      "1 poivron rouge",
      "200 g de brocoli",
      "2 c. à soupe d'huile d'olive",
      "1 gousse d'ail",
      "1 citron",
      "Sel, poivre, herbes de Provence"
    ],
    etapes: [
      "Préchauffer le four à 200 °C.",
      "Couper les légumes en morceaux, les mélanger avec l'huile, l'ail haché, sel et herbes.",
      "Enfourner les légumes 15 min sur une plaque.",
      "Poser les pavés de saumon sur la plaque, saler, poivrer, ajouter des rondelles de citron.",
      "Remettre au four 12 à 15 min : le saumon doit rester légèrement rosé au centre.",
      "Servir avec un quartier de citron."
    ]
  },
  {
    nom: "Steak & patates douces",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=640&q=60&auto=format&fit=crop",
    personnes: 2,
    calories: 610,
    proteines: 45,
    temps: "35 min",
    ingredients: [
      "2 steaks de bœuf (180 g chacun)",
      "500 g de patates douces",
      "1 c. à soupe d'huile d'olive",
      "20 g de beurre",
      "2 gousses d'ail",
      "Quelques branches de thym",
      "Sel, poivre"
    ],
    etapes: [
      "Préchauffer le four à 210 °C.",
      "Couper les patates douces en frites, les huiler, saler, puis enfourner 25 min en retournant à mi-cuisson.",
      "Sortir les steaks du frigo 15 min avant cuisson, saler et poivrer.",
      "Chauffer une poêle très fort. Saisir les steaks 2 à 3 min par face selon l'épaisseur.",
      "Ajouter beurre, ail écrasé et thym, arroser les steaks 1 min.",
      "Laisser reposer les steaks 5 min sous une feuille d'alu, puis servir avec les frites."
    ]
  },
  {
    nom: "Toast avocat & œufs pochés",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=640&q=60&auto=format&fit=crop",
    personnes: 1,
    calories: 430,
    proteines: 22,
    temps: "15 min",
    ingredients: [
      "2 tranches de pain complet",
      "1 avocat mûr",
      "2 œufs",
      "1 c. à soupe de vinaigre blanc",
      "Piment d'Espelette",
      "Sel, poivre"
    ],
    etapes: [
      "Porter une casserole d'eau à frémissement avec le vinaigre.",
      "Casser chaque œuf dans un petit bol, créer un tourbillon dans l'eau et y glisser l'œuf. Pocher 3 min, puis égoutter.",
      "Toaster le pain.",
      "Écraser l'avocat à la fourchette avec sel et poivre, le tartiner sur les toasts.",
      "Déposer un œuf poché sur chaque toast, saupoudrer de piment d'Espelette."
    ]
  },
  {
    nom: "Dahl de lentilles corail",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=640&q=60&auto=format&fit=crop",
    personnes: 3,
    calories: 390,
    proteines: 18,
    temps: "30 min",
    ingredients: [
      "250 g de lentilles corail",
      "400 ml de lait de coco",
      "1 oignon",
      "2 gousses d'ail",
      "1 c. à soupe de curry en poudre",
      "1 c. à café de curcuma",
      "400 g de tomates concassées",
      "1 c. à soupe d'huile",
      "Coriandre fraîche, sel"
    ],
    etapes: [
      "Émincer l'oignon et l'ail, les faire revenir 3 min dans l'huile.",
      "Ajouter curry et curcuma, cuire 1 min pour libérer les arômes.",
      "Ajouter les lentilles rincées, les tomates, le lait de coco et 200 ml d'eau.",
      "Laisser mijoter 20 min à feu doux en remuant régulièrement.",
      "Saler, ajuster la consistance avec un peu d'eau si besoin.",
      "Servir parsemé de coriandre, avec du riz basmati pour un repas complet."
    ]
  },
  {
    nom: "Pancakes protéinés banane",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=640&q=60&auto=format&fit=crop",
    personnes: 2,
    calories: 350,
    proteines: 28,
    temps: "20 min",
    ingredients: [
      "2 bananes mûres",
      "3 œufs",
      "60 g de flocons d'avoine",
      "30 g de whey (vanille ou nature)",
      "1 c. à café de levure chimique",
      "1 pincée de cannelle",
      "Un peu d'huile de coco pour la poêle"
    ],
    etapes: [
      "Mixer tous les ingrédients jusqu'à obtenir une pâte lisse.",
      "Laisser reposer la pâte 5 min.",
      "Chauffer une poêle à feu moyen avec un peu d'huile de coco.",
      "Verser des petites louches de pâte, cuire 2 min jusqu'à l'apparition de bulles.",
      "Retourner et cuire 1 à 2 min de l'autre côté.",
      "Servir avec des fruits rouges ou un filet de miel."
    ]
  }
];

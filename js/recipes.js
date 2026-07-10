/* ============================================================
   PROTEINMEALS — LISTE DES RECETTES
   ============================================================
   POUR AJOUTER UNE RECETTE :
   1. Copie-colle un bloc { ... }, (n'oublie pas la virgule)
   2. Remplis les champs
   3. C'est tout. Le site se met à jour tout seul.

   FORMAT D'UN INGRÉDIENT (important pour la liste de courses !) :
   { qte: 300, unite: "g", nom: "blanc de poulet" }
     → affiche "300 g de blanc de poulet"
     → la liste de courses ADDITIONNE les quantités du même nom

   { qte: 1, nom: "citron" }            → "1 citron" (à l'unité)
   { qte: 0.5, nom: "citron", note: "le jus" } → "½ citron (le jus)"
     → dans la liste de courses : 1 + 0.5 = 1.5 → arrondi à "2 citrons"

   { nom: "sel, poivre" }               → sans quantité, jamais dupliqué

   Règles :
   - qte   : nombre (0.5 = ½, 0.25 = ¼). Omets-le si pas de quantité.
   - unite : "g", "ml", "c. à soupe", "c. à café", "pincée", "poignée"…
             Omets-la pour les choses à l'unité (citron, œuf, avocat…).
   - nom   : TOUJOURS AU SINGULIER pour les unités ("citron", "œuf",
             "gousse d'ail") → le site met le pluriel tout seul.
             Utilise EXACTEMENT le même nom d'une recette à l'autre
             pour que les quantités s'additionnent.
   - note  : précision optionnelle, entre parenthèses à l'affichage
             (elle n'apparaît pas dans la liste de courses).
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
      { qte: 300, unite: "g", nom: "blanc de poulet" },
      { qte: 150, unite: "g", nom: "quinoa" },
      { qte: 1, nom: "avocat" },
      { qte: 150, unite: "g", nom: "tomates cerises" },
      { qte: 1, unite: "poignée", nom: "jeunes pousses d'épinards" },
      { qte: 1, unite: "c. à soupe", nom: "huile d'olive" },
      { qte: 0.5, nom: "citron", note: "le jus" },
      { nom: "sel, poivre, paprika" }
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
      { qte: 2, nom: "pavé de saumon", note: "140 g chacun" },
      { qte: 1, nom: "courgette" },
      { qte: 1, nom: "poivron rouge" },
      { qte: 200, unite: "g", nom: "brocoli" },
      { qte: 2, unite: "c. à soupe", nom: "huile d'olive" },
      { qte: 1, nom: "gousse d'ail" },
      { qte: 1, nom: "citron" },
      { nom: "sel, poivre, herbes de Provence" }
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
      { qte: 2, nom: "steak de bœuf", note: "180 g chacun" },
      { qte: 500, unite: "g", nom: "patates douces" },
      { qte: 1, unite: "c. à soupe", nom: "huile d'olive" },
      { qte: 20, unite: "g", nom: "beurre" },
      { qte: 2, nom: "gousse d'ail" },
      { qte: 3, nom: "branche de thym" },
      { nom: "sel, poivre" }
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
      { qte: 2, nom: "tranche de pain complet" },
      { qte: 1, nom: "avocat", note: "bien mûr" },
      { qte: 2, nom: "œuf" },
      { qte: 1, unite: "c. à soupe", nom: "vinaigre blanc" },
      { nom: "piment d'Espelette" },
      { nom: "sel, poivre" }
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
      { qte: 250, unite: "g", nom: "lentilles corail" },
      { qte: 400, unite: "ml", nom: "lait de coco" },
      { qte: 1, nom: "oignon" },
      { qte: 2, nom: "gousse d'ail" },
      { qte: 1, unite: "c. à soupe", nom: "curry en poudre" },
      { qte: 1, unite: "c. à café", nom: "curcuma" },
      { qte: 400, unite: "g", nom: "tomates concassées" },
      { qte: 1, unite: "c. à soupe", nom: "huile" },
      { nom: "coriandre fraîche, sel" }
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
      { qte: 2, nom: "banane", note: "bien mûres" },
      { qte: 3, nom: "œuf" },
      { qte: 60, unite: "g", nom: "flocons d'avoine" },
      { qte: 30, unite: "g", nom: "whey", note: "vanille ou nature" },
      { qte: 1, unite: "c. à café", nom: "levure chimique" },
      { qte: 1, unite: "pincée", nom: "cannelle" },
      { nom: "huile de coco pour la poêle" }
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

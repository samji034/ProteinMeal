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
  },
  {
  nom: "Buns farcis au bœuf et mozzarella",
  image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=640&q=60&auto=format&fit=crop",
  personnes: 2,
  calories: 520,
  proteines: 41,
  temps: "20 min",
  ingredients: [
    { qte: 100, unite: "g", nom: "mozzarella", note: "di cucina" },
    { qte: 120, unite: "g", nom: "farine de blé" },
    { qte: 120, unite: "g", nom: "skyr" },
    { qte: 5, unite: "g", nom: "levure chimique" },
    { qte: 100, unite: "g", nom: "sauce tomate" },
    { qte: 150, unite: "g", nom: "bœuf haché", note: "5% de MG" }
  ],
  etapes: [
    "Dans un récipient, mélanger la farine de blé, la levure chimique et le skyr pour former la pâte à buns.",
    "Diviser la pâte en deux pâtons égaux et les étaler de manière à pouvoir les farcir.",
    "Faire cuire le bœuf haché 5% à la poêle au préalable.",
    "Garnir le centre de chaque pâte avec la sauce tomate, le bœuf haché cuit et la mozzarella di cucina.",
    "Refermer soigneusement la pâte sur elle-même pour former les buns bien hermétiques.",
    "Faire cuire à la poêle à feu moyen ou au four jusqu'à ce que les buns soient bien dorés et que le fromage soit fondu."
  ]
},{
  nom: "Dobberman bowl",
  image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=640&q=60&auto=format&fit=crop",
  personnes: 1,
  calories: 740,
  proteines: 56,
  temps: "15 min",
  ingredients: [
    { qte: 400, unite: "g", nom: "pomme de terre" },
    { qte: 150, unite: "g", nom: "bœuf haché", note: "5% de MG" },
    { qte: 110, unite: "g", nom: "cancoillotte" }
  ],
  etapes: [
    "Éplucher et couper les pommes de terre en dés, puis les faire cuire (à l'eau, à la poêle ou à l'Air Fryer).",
    "Faire cuire le bœuf haché 5% dans une poêle bien chaude.",
    "Ajouter la cancoillotte en fin de cuisson sur la viande ou les pommes de terre pour la faire napper et fondre doucement.",
    "Dresser le tout dans un bol, mélanger et déguster bien chaud."
  ]
},{
  nom: "Sweet potato beef bowl",
  image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=640&q=60&auto=format&fit=crop",
  personnes: 1,
  calories: 680,
  proteines: 64,
  temps: "20 min",
  ingredients: [
    { qte: 300, unite: "g", nom: "patate douce" },
    { qte: 3, unite: "g", nom: "huile d'olive" },
    { qte: 225, unite: "g", nom: "bœuf haché", note: "93/7 ou 5% de MG" },
    { qte: 100, unite: "g", nom: "cottage cheese", note: "2% de MG" },
    { nom: "piment jalapeño", note: "au vinaigre, en rondelles" },
    { nom: "miel" },
    { nom: "sel, poivre, ail en poudre" }
  ],
  etapes: [
    "Couper la patate douce en dés en laissant la peau pour conserver les nutriments.",
    "Dans un récipient, mélanger les dés de patate douce avec l'huile d'olive, du sel, du poivre et de l'ail en poudre.",
    "Placer le tout dans l'Air Fryer pendant environ 15 minutes à 200°C jusqu'à ce qu'ils soient bien dorés.",
    "Pendant ce temps, faire cuire le bœuf haché dans une poêle.",
    "Dresser le bol : déposer les dés de patate douce au fond, ajouter le bœuf haché cuit, puis disposer le cottage cheese sur le dessus.",
    "Garnir avec quelques rondelles de piment jalapeño, ajouter une pincée de sel de mer et un léger filet de miel avant de servir."
  ]
},{
  nom: "Clafoutis protéiné aux fruits rouges",
  image: "https://images.unsplash.com/photo-1511018556340-d16986a1c194?w=640&q=60&auto=format&fit=crop",
  personnes: 4,
  calories: 195,
  proteines: 18,
  temps: "55 min",
  ingredients: [
    { qte: 4, nom: "œuf" },
    { qte: 500, unite: "g", nom: "skyr" },
    { qte: 50, unite: "g", nom: "maïzena" },
    { nom: "arôme vanille" },
    { nom: "sirop d'érable", note: "ou sirop d'agave, stévia, miel" },
    { qte: 50, unite: "g", nom: "myrtille" },
    { qte: 100, unite: "g", nom: "framboise" }
  ],
  etapes: [
    "Dans un grand récipient, casser et mélanger les œufs.",
    "Ajouter le skyr, la maïzena, ainsi qu'un filet d'arôme vanille.",
    "Sucrer la préparation selon vos préférences avec du sirop d'érable, de l'agave ou du miel (ne pas hésiter à être généreux pour contrebalancer l'acidité du skyr).",
    "Fouetter énergiquement l'ensemble jusqu'à l'obtention d'une texture bien lisse et homogène.",
    "Tapisser un moule à gâteau de papier cuisson, puis y verser la pâte.",
    "Répartir uniformément les myrtilles et les framboises sur le dessus de la préparation.",
    "Enfourner à 180°C pendant environ 45 à 50 minutes.",
    "Laisser refroidir, puis placer impérativement au réfrigérateur pendant toute une nuit. La texture et les saveurs seront bien meilleures le lendemain matin."
  ]
},{
  nom: "Smoothie protéiné aux fruits rouges et chia",
  image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=640&q=60&auto=format&fit=crop",
  personnes: 1,
  calories: 550,
  proteines: 65,
  temps: "5 min",
  ingredients: [
    { qte: 2, unite: "scoop", nom: "whey" },
    { qte: 250, unite: "ml", nom: "lait" },
    { qte: 150, unite: "g", nom: "yaourt grec" },
    { qte: 1, nom: "banane" },
    { qte: 100, unite: "g", nom: "fruits rouges", note: "surgelés (myrtilles, fraises)" },
    { qte: 1, unite: "c. à soupe", nom: "graine de chia" },
    { unite: "poignée", nom: "glaçon" },
    { nom: "miel" }
  ],
  etapes: [
    "Verser le lait et le yaourt grec au fond du blender.",
    "Ajouter la whey protéine.",
    "Ajouter la banane, les fruits rouges surgelés, les graines de chia et la poignée de glaçons.",
    "Mixer le tout pendant 20 à 30 secondes jusqu'à obtenir une texture homogène.",
    "Laisser reposer le smoothie pendant 2 à 3 minutes pour permettre aux graines de chia d'épaissir naturellement la texture.",
    "Ajouter un filet de miel si désiré, servir et déguster aussitôt."
  ]
}
];

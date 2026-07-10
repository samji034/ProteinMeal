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
  nom: "Buns farcis au bœuf et mozzarella",
  image: "https://res.cloudinary.com/hv9ssmzrz/image/fetch/c_fill,f_auto,h_1200,q_auto:eco,w_1200/https://s3-eu-west-1.amazonaws.com/images-ca-1-0-1-eu/recipe_photos/original/121951/P1140505.jpg",
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
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8CSlPLg5QGx5oAHtTshApeN01IjmcJBmzFZLC1jSQbqntWE6cbHONm0Xb&s=10",
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
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlahz5eExlX3KKiNFvMmCSHRrBR5otRsVcjARNBjbDRMzfQmaUUuMUuKI&s=10",
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
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgNk5tctEXovTSmxx2PwL4SRNSg5wrOos1g7OWfuti0C62lwSO86nDZE-v&s=10",
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

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
},
{
  nom: "Tasty crousty fit",
  image: "https://www.marciatack.fr/wp-content/uploads/2026/03/tasty-crousty-maison.jpg",
  personnes: 1,
  calories: 940,
  proteines: 67,
  temps: "25 min",
  ingredients: [
    { qte: 100, unite: "g", nom: "riz" },
    { qte: 15, unite: "g", nom: "sauce aigre-douce" },
    { qte: 10, unite: "g", nom: "oignon crispy" },
    { qte: 4, unite: "g", nom: "huile d'olive" },
    { qte: 50, unite: "g", nom: "crème liquide", note: "4% de MG" },
    { qte: 30, unite: "g", nom: "panko" },
    { qte: 150, unite: "g", nom: "filet de poulet" },
    { qte: 160, unite: "g", nom: "skyr" },
    { qte: 1.5, nom: "œuf", note: "environ 75g" },
    { qte: 4, unite: "g", nom: "vinaigre de riz" },
    { nom: "sel, poivre, paprika" }
  ],
  etapes: [
    "Rincer le riz puis le faire cuire de manière classique (au cuiseur ou à la casserole).",
    "Pour la sauce façon mayonnaise : faire cuire les œufs dans l'eau bouillante pour obtenir des œufs durs.",
    "Dans un mixeur, ajouter les œufs durs écalés, le skyr, le vinaigre de riz, l'huile d'olive, du sel et du poivre. Mixer une minute pour obtenir une texture onctueuse.",
    "Préparer les tenders : couper le filet de poulet en morceaux de taille moyenne.",
    "Dans un récipient, mélanger le poulet avec un peu de skyr supplémentaire, du paprika, du sel et du poivre.",
    "Enrober chaque morceau de poulet dans la chapelure panko.",
    "Faire cuire les tenders au Air Fryer à 180°C pendant 12 minutes, en pensant à les retourner à mi-cuisson (utiliser un spray d'huile d'olive si besoin). Couper ensuite le poulet en petits morceaux.",
    "Dans un bol, mélanger une partie de la sauce mixée avec la crème à 4% et un peu de poivre pour l'alléger.",
    "Dresser l'assiette : disposer le riz chaud, napper généreusement de sauce blanche, ajouter les morceaux de poulet croustillant, remettre un filet de sauce blanche, puis terminer avec la sauce aigre-douce et les oignons crispy."
  ]
},
{
  nom: "Brioche aux pépites de chocolat",
  image: "https://www.cookomix.com/wp-content/uploads/mediapress/members/91578/26404/rn_image_picker_lib_temp_27aa1a2b-5b54-480f-a92e-bc2c1b1073bc-800x600.jpg",
  personnes: 1,
  calories: 272,
  proteines: 22,
  temps: "45 min",
  ingredients: [
    { qte: 200, unite: "g", nom: "blanc d'œuf" },
    { qte: 10, unite: "g", nom: "maïzena" },
    { qte: 25, unite: "g", nom: "pépite de chocolat" },
    { nom: "stévia" },
    { nom: "extrait de vanille", note: "ou flavpowder" },
    { nom: "sel" }
  ],
  etapes: [
    "Préchauffer le cour à 180°C.",
    "Ajouter une pincée de sel dans les blancs d'œuf et les monter fermement en neige à l'aide d'un batteur électrique.",
    "Une fois les blancs bien fermes, ajouter la maïzena, la stévia et l'extrait de vanille (ou la flavpowder pour le goût).",
    "Continuer de battre doucement pour incorporer les ingrédients sans faire retomber les blancs.",
    "Ajouter les pépites de chocolat et mélanger délicatement une dernière fois à l'aide d'une spatule.",
    "Disposer la préparation sur une plaque recouverte de papier cuisson en formant une grosse boule bien bombée.",
    "Enfourner pendant 30 à 35 minutes à 180°C jusqu'à ce que la brioche soit bien gonflée et dorée."
  ]
},
{
  nom: "Burrito boeuf bacon",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9ZqRqG6UnjW6JKt_BKLUvl3F_8D1LweyBDDZ-3SPZdXE1aw3yMGFxh7UG&s=10",
  personnes: 6,
  calories: 271,
  proteines: 29.7,
  temps: "20 min",
  ingredients: [
    { qte: 500, unite: "g", nom: "bœuf haché", note: "5% de MG" },
    { qte: 6, nom: "wrap", note: "extra fin" },
    { qte: 100, unite: "g", nom: "fromage râpé", note: "protéiné" },
    { qte: 40, unite: "g", nom: "bacon fumé" },
    { qte: 20, unite: "g", nom: "moutarde de Dijon" },
    { qte: 40, unite: "g", nom: "ketchup", note: "0% de sucre" },
    { qte: 130, unite: "g", nom: "skyr" },
    { qte: 40, unite: "g", nom: "concentré de tomate" },
    { qte: 1, nom: "oignon" },
    { nom: "cornichon", note: "au vinaigre" },
    { nom: "sauce chipotle", note: "optionnelle" },
    { nom: "sel, poivre" }
  ],
  etapes: [
    "Émincer finement l'oignon et le faire revenir dans une poêle bien chaude.",
    "Ajouter le concentré de tomate avec un petit filet d'eau, puis incorporer le bœuf haché 5% et laisser cuire l'ensemble.",
    "Pendant la cuisson de la viande, préparer la sauce : dans un récipient, mélanger le skyr, la moutarde de Dijon, le ketchup 0%, les cornichons coupés en petits dés et la sauce chipotle si désirée.",
    "Râper le fromage protéiné.",
    "Une fois la viande cuite, verser la sauce directement dans la poêle avec le mélange de bœuf haché et d'oignons, puis mélanger hors du feu.",
    "Passer au dressage : sur chaque wrap extra fin, déposer une portion de farce à la viande, ajouter un peu de fromage râpé et des morceaux de bacon fumé.",
    "Plier soigneusement les wraps pour former des burritos hermétiques.",
    "Faire dorer les burritos à la poêle quelques minutes de chaque côté pour que le wrap soit croustillant et que le fromage soit bien fondant."
  ]
},
{
  nom: "Wrap de courgette au poulet",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9py5RoJxfQ-XWy4AUfsknNwo4tUP3e_lMSlOKOye-S2qplS5-sF_tjz9R&s=10",
  personnes: 1,
  calories: 419,
  proteines: 50.3,
  temps: "35 min",
  ingredients: [
    { qte: 350, unite: "g", nom: "courgette" },
    { qte: 100, unite: "g", nom: "poulet", note: "pané ou tenders" },
    { qte: 50, unite: "g", nom: "fromage râpé", note: "protéiné" },
    { qte: 1, nom: "œuf" },
    { qte: 2, nom: "fromage frais", note: "nature ou ail et fines herbes, 0% de MG" },
    { nom: "salade" },
    { nom: "sauce barbecue", note: "ou sauce grill" }
  ],
  etapes: [
    "Préchauffer le four à 200°C.",
    "À l'aide d'une mandoline, couper la courgette en fines lamelles régulières.",
    "Sur une plaque de cuisson recouverte de papier sulfurisé, disposer les rondelles de courgette en les faisant se chevaucher pour former un grand rectangle compact.",
    "Battre l'œuf et l'étaler uniformément au pinceau sur toute la surface des courgettes.",
    "Parsemer le fromage râpé protéiné sur le dessus.",
    "Enfourner à 200°C pendant 25 minutes, jusqu'à ce que la base soit bien solidaire et dorée.",
    "Laisser refroidir quelques instants la plaque de courgette.",
    "Étaler les deux carrés de fromage frais sur la base, puis disposer les morceaux de poulet pané, les feuilles de salade et ajouter un filet de sauce grill.",
    "Rouler délicatement l'ensemble sur lui-même de manière bien serrée pour former le wrap, couper en deux et déguster."
  ]
},
{
  nom: "Pizza rolls express au skyr",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6A7pzxR8syi08-QJ0U3ttKsrO7EQ9_Hg9gUjLsj7BBEyc4YhIs6ipKHP3&s=10",
  personnes: 4,
  calories: 220,
  proteines: 17,
  temps: "30 min",
  ingredients: [
    { qte: 120, unite: "g", nom: "farine de blé" },
    { qte: 120, unite: "g", nom: "skyr" },
    { qte: 5, unite: "g", nom: "levure chimique" },
    { qte: 70, unite: "g", nom: "sauce tomate" },
    { qte: 120, unite: "g", nom: "jambon", note: "blanc, dégraissé" },
    { qte: 70, unite: "g", nom: "mozzarella", note: "râpée" },
    { nom: "sel" }
  ],
  etapes: [
    "Dans un grand récipient, mélanger la farine de blé, la levure chimique, le skyr et une pincée de sel.",
    "Pétrir le mélange à la main jusqu'à obtenir une boule de pâte homogène.",
    "Sur un plan de travail bien fariné, étaler la pâte à l'aide d'un rouleau à pâtisserie.",
    "Napper la surface de la pâte avec une partie de la sauce tomate, puis répartir une partie de la mozzarella râpée (environ 50g) et le jambon préalablement coupé en petits morceaux.",
    "Rouler délicatement la pâte sur elle-même de manière bien serrée pour former un boudin.",
    "Découper le boudin en 4 portions égales.",
    "Disposer les 4 rolls debout dans un plat allant au four.",
    "Ajouter le restant de sauce tomate, de mozzarella râpée (les 20g restants) et éventuellement les derniers morceaux de jambon sur le dessus pour le gratin.",
    "Enfourner à 180°C pendant 20 à 25 minutes (ou au Air Fryer pendant 15 minutes à 170°C) jusqu'à ce que les rolls soient bien gonflés et gratinés."
  ]
},
{
  nom: "Quesadillas poulet haricots",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjGNijcNH5-uFaWr8IwTN6HL5WlETFSl3dt9Ais5waWr3mS0kw9enWmRA6&s=10",
  personnes: 6,
  calories: 450,
  proteines: 50,
  temps: "30 min",
  ingredients: [
    { qte: 750, unite: "g", nom: "blanc de poulet" },
    { qte: 200, unite: "g", nom: "haricot rouge", note: "ou haricots noirs" },
    { qte: 40, unite: "g", nom: "concentré de tomate" },
    { qte: 1, nom: "citron", note: "le jus" },
    { qte: 60, unite: "ml", nom: "sauce barbecue", note: "0% de calories" },
    { qte: 6, nom: "wrap", note: "à l'épeautre ou à l'avoine" },
    { qte: 160, unite: "g", nom: "fromage râpé", note: "protéiné" },
    { nom: "fromage blanc", note: "0% de MG, ou skyr" },
    { nom: "sauce sriracha" },
    { nom: "miel" },
    { nom: "persil" },
    { nom: "sel, poivre, paprika, ail en poudre" }
  ],
  etapes: [
    "Faire cuire les blancs de poulet dans une casserole d'eau bouillante pendant environ 15 minutes.",
    "Une fois cuits, effilocher les blancs de poulet à chaud dans un grand récipient à l'aide d'un batteur électrique (ou de deux fourchettes).",
    "Ajouter au poulet effiloché le concentré de tomate, les épices (paprika, ail, sel, poivre), la sauce barbecue 0% et le jus de citron. Ajouter les haricots rouges rincés et égouttés.",
    "Faire réchauffer et lier brièvement ce mélange dans une poêle à feu doux.",
    "Pendant ce temps, préparer la sauce crémeuse dans un bol en mélangeant du fromage blanc (ou skyr), un filet de sauce barbecue, de la sauce sriracha, un peu de miel, du paprika, de l'ail en poudre et du persil émincé.",
    "Incorporer le mélange de poulet et de haricots directement dans le bol de sauce crémeuse et bien mélanger le tout.",
    "Dresser les quesadillas : sur chaque wrap, étaler une portion de farce sur une moitié, parsemer de fromage protéiné râpé, puis replier le wrap en deux.",
    "Faire griller les quesadillas à la poêle (en s'aidant d'un couvercle ou d'un poids pour bien tasser) ou dans un appareil à panini jusqu'à ce que le wrap soit croustillant et le fromage fondu.",
    "Note optionnelle : vous pouvez les envelopper individuellement dans du papier aluminium pour les conserver au réfrigérateur ou les congeler."
  ]
}
];

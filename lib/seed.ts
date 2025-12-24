import db from './db';

export interface ShrineData {
  name: string;
  description: string;
  color: string;
  sections: {
    name: string;
    image_url: string;
    items: { name: string; quantity: number; image_url: string }[];
  }[];
}

const shrinesData: ShrineData[] = [
  {
    name: 'Crop Altar',
    description: 'Dedicado aos recursos e colheitas',
    color: '#C4A8E8',
    sections: [
      {
        name: 'Recursos Essenciais',
        image_url: 'https://coralisland.fandom.com/wiki/File:Wood.png',
        items: [
          { name: 'Madeira', quantity: 10, image_url: 'https://coralisland.fandom.com/wiki/File:Wood.png' },
          { name: 'Pedra', quantity: 10, image_url: 'https://coralisland.fandom.com/wiki/File:Stone.png' },
          { name: 'Fibra', quantity: 10, image_url: 'https://coralisland.fandom.com/wiki/File:Fiber.png' },
          { name: 'Seiva', quantity: 10, image_url: 'https://coralisland.fandom.com/wiki/File:Sap.png' },
          { name: 'Sementes de Bordo', quantity: 5, image_url: 'https://coralisland.fandom.com/wiki/File:Maple_seeds.png' },
          { name: 'Bolotas', quantity: 5, image_url: 'https://coralisland.fandom.com/wiki/File:Oak_seeds.png' },
          { name: 'Pinha', quantity: 5, image_url: 'https://coralisland.fandom.com/wiki/File:Pine_cone.png' },
        ],
      },
      {
        name: 'Sesajen de Primavera',
        image_url: 'https://coralisland.fandom.com/wiki/File:Turnip.png',
        items: [
          { name: 'Nabo', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Turnip.png' },
          { name: 'Cenoura', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Carrot.png' },
          { name: 'Margarida', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Daisy.png' },
          { name: 'Wasabi', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Wasabi.png' },
          { name: 'Morchella', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Morel.png' },
        ],
      },
      {
        name: 'Sesajen de Verão',
        image_url: 'https://coralisland.fandom.com/wiki/File:Blueberry.png',
        items: [
          { name: 'Mirtilo', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Blueberry.png' },
          { name: 'Pimenta Picante', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Hot_pepper.png' },
          { name: 'Girassol', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Sunflower.png' },
          { name: 'Chalota', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Shallot.png' },
          { name: 'Hibisco', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Hibiscus.png' },
        ],
      },
      {
        name: 'Sesajen de Outono',
        image_url: 'https://coralisland.fandom.com/wiki/File:Pumpkin.png',
        items: [
          { name: 'Abóbora', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Pumpkin.png' },
          { name: 'Arroz', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Rice.png' },
          { name: 'Orquídea', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Orchid.png' },
          { name: 'Trombeta Negra', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Black_trumpet.png' },
          { name: 'Figo', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Fig.png' },
        ],
      },
      {
        name: 'Sesajen de Inverno',
        image_url: 'https://coralisland.fandom.com/wiki/File:Brussel_sprouts.png',
        items: [
          { name: 'Couve de Bruxelas', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Brussel_sprouts.png' },
          { name: 'Couve', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Kale.png' },
          { name: 'Rosa Mosqueta', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Rose_hip.png' },
          { name: 'Floco de Neve', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Snowdrop.png' },
          { name: 'Folha de Chá', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Tea_leaf.png' },
        ],
      },
      {
        name: 'Scavengables do Oceano',
        image_url: 'https://coralisland.fandom.com/wiki/File:Sea_salt.png',
        items: [
          { name: 'Sal Marinho', quantity: 5, image_url: 'https://coralisland.fandom.com/wiki/File:Sea_salt.png' },
          { name: 'Vieira Real', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:King_scallop.png' },
          { name: 'Ostra Oriental', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Eastern_oyster.png' },
          { name: 'Mexilhão Azul', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Blue_mussel.png' },
          { name: 'Ouriço-do-Mar Verde', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Green_sea_urchin.png' },
        ],
      },
    ],
  },
  {
    name: 'Catch Altar',
    description: 'Dedicado a peixes e insetos',
    color: '#A8D8E8',
    sections: [
      {
        name: 'Peixe de Água Doce',
        image_url: 'https://coralisland.fandom.com/wiki/File:Catfish.png',
        items: [
          { name: 'Bagre', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Catfish.png' },
          { name: 'Tilápia', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Tilapia.png' },
          { name: 'Peixe Arco-Íris', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Rainbow_fish.png' },
          { name: 'Aruanã Prateado', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Silver_arowana.png' },
          { name: 'Koi', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Koi.png' },
        ],
      },
      {
        name: 'Peixe de Água Salgada',
        image_url: 'https://coralisland.fandom.com/wiki/File:Pink_snapper.png',
        items: [
          { name: 'Pargo Rosa', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Pink_snapper.png' },
          { name: 'Peixe-Leão', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Lionfish.png' },
          { name: 'Salema Asiática', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Asian_sheepshead.png' },
          { name: 'Atum Albacora', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Yellowfin_tuna.png' },
          { name: 'Sardinha', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Sardine.png' },
        ],
      },
      {
        name: 'Peixe Raro',
        image_url: 'https://coralisland.fandom.com/wiki/File:Sturgeon.png',
        items: [
          { name: 'Esturjão', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Sturgeon.png' },
          { name: 'Gator Gar', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Gator_gar.png' },
          { name: 'Arapaima', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Arapaima.png' },
          { name: 'Garoupa Gigante', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Giant_sea_bass.png' },
          { name: 'Moreia Amarela', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Yellow_moray_eel.png' },
        ],
      },
      {
        name: 'Inseto Diurno',
        image_url: 'https://coralisland.fandom.com/wiki/File:Pipevine_swallowtail_butterfly.png',
        items: [
          { name: 'Borboleta Pipevine', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Pipevine_swallowtail_butterfly.png' },
          { name: 'Besouro Tigre', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Tiger_beetle.png' },
          { name: 'Mariposa Yucca', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Yucca_moth.png' },
        ],
      },
      {
        name: 'Inseto Noturno',
        image_url: 'https://coralisland.fandom.com/wiki/File:Atlas_moth.png',
        items: [
          { name: 'Mariposa Atlas', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Atlas_moth.png' },
          { name: 'Mariposa Luna', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Luna_moth.png' },
          { name: 'Vaga-lume', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Firefly.png' },
        ],
      },
      {
        name: 'Criaturas Oceânicas',
        image_url: 'https://coralisland.fandom.com/wiki/File:Hermit_crab.png',
        items: [
          { name: 'Caranguejo Eremita', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Hermit_crab.png' },
          { name: 'Estrela do Mar', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Starfish.png' },
          { name: 'Coral', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Coral.png' },
          { name: 'Pérola', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Pearl.png' },
        ],
      },
    ],
  },
  {
    name: 'Advanced Altar',
    description: 'Dedicado a animais avançados, culinária e artesanato',
    color: '#F8B4D4',
    sections: [
      {
        name: 'Animais de Celeiro',
        image_url: 'https://coralisland.fandom.com/wiki/File:Large_goat_milk.png',
        items: [
          { name: 'Leite', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Milk.png' },
          { name: 'Leite de Cabra', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Goat_milk.png' },
          { name: 'Lã', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Wool.png' },
          { name: 'Leite de Cabra Grande', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Large_goat_milk.png' },
          { name: 'Lã Grande', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Large_wool.png' },
          { name: 'Leite Grande', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Large_milk.png' },
        ],
      },
      {
        name: 'Animais de Galinheiro',
        image_url: 'https://coralisland.fandom.com/wiki/File:Large_duck_egg.png',
        items: [
          { name: 'Ovo', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Egg.png' },
          { name: 'Ovo de Pato', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Duck_egg.png' },
          { name: 'Ovo Grande', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Large_egg.png' },
          { name: 'Ovo de Pato Grande', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Large_duck_egg.png' },
        ],
      },
      {
        name: 'Culinária Básica',
        image_url: 'https://coralisland.fandom.com/wiki/File:Tomato_soup.png',
        items: [
          { name: 'Vitamina', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Smoothie.png' },
          { name: 'Peixe Grelhado', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Grilled_fish.png' },
          { name: 'Ovo Estalado', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Sunny-side-up_egg.png' },
          { name: 'Sopa de Tomate', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Tomato_soup.png' },
          { name: 'Onigiri', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Onigiri.png' },
        ],
      },
      {
        name: 'Artesão Básico',
        image_url: 'https://coralisland.fandom.com/wiki/File:Mayonnaise.png',
        items: [
          { name: 'Qualquer Maionese', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Mayonnaise.png' },
          { name: 'Qualquer Suco', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Juice.png' },
          { name: 'Qualquer Manteiga', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Butter.png' },
          { name: 'Item do Mar Seco', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Seafood_jerky.png' },
          { name: 'Picles', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Pickles.png' },
        ],
      },
      {
        name: 'Planta de Fruta',
        image_url: 'https://coralisland.fandom.com/wiki/File:Rambutan.png',
        items: [
          { name: 'Rambutão', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Rambutan.png' },
          { name: 'Durian', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Durian.png' },
          { name: 'Manga', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Mango.png' },
          { name: 'Pitaia', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Dragonfruit.png' },
          { name: 'Maçã', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Apple.png' },
          { name: 'Limão', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Lemon.png' },
          { name: 'Amêndoa', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Almond.png' },
          { name: 'Grão de Cacau', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Cocoa_bean.png' },
        ],
      },
      {
        name: 'Drop de Monstro',
        image_url: 'https://coralisland.fandom.com/wiki/File:Silky_fur.png',
        items: [
          { name: 'Pele Sedosa', quantity: 5, image_url: 'https://coralisland.fandom.com/wiki/File:Silky_fur.png' },
          { name: 'Essência de Monstro', quantity: 5, image_url: 'https://coralisland.fandom.com/wiki/File:Monster_essence.png' },
          { name: 'Asa de Morcego', quantity: 5, image_url: 'https://coralisland.fandom.com/wiki/File:Bat_wing.png' },
          { name: 'Carne Dura', quantity: 5, image_url: 'https://coralisland.fandom.com/wiki/File:Tough_meat.png' },
          { name: 'Gosma de Slime', quantity: 5, image_url: 'https://coralisland.fandom.com/wiki/File:Slime_goop.png' },
        ],
      },
    ],
  },
  {
    name: 'Rare Altar',
    description: 'Dedicado a itens raros, preciosos e difíceis de obter',
    color: '#B4E8B4',
    sections: [
      {
        name: 'Cultivos Raros',
        image_url: 'https://coralisland.fandom.com/wiki/File:Snowdrop.png',
        items: [
          { name: 'Floco-de-Neve', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Snowdrop.png' },
          { name: 'Grão de Café', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Coffee_bean.png' },
          { name: 'Alho', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Garlic.png' },
          { name: 'Algodão', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Cotton.png' },
          { name: 'Cacto', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Cactus.png' },
        ],
      },
      {
        name: 'Pedras Preciosas',
        image_url: 'https://coralisland.fandom.com/wiki/File:Pink_diamond.png',
        items: [
          { name: 'Gema Super Rara', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Pink_diamond.png' },
          { name: 'Gema Rara', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Diamond.png' },
          { name: 'Gema Incomum', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Aquamarine.png' },
        ],
      },
      {
        name: 'Culinária Rara',
        image_url: 'https://coralisland.fandom.com/wiki/File:Vegan_taco.png',
        items: [
          { name: 'Taco Vegano', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Vegan_taco.png' },
          { name: 'Torta de Maçã', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Apple_pie.png' },
          { name: 'Serabi', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Serabi.png' },
          { name: 'Pad Thai', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Pad_thai.png' },
          { name: 'Es Cendol', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Es_cendol.png' },
        ],
      },
      {
        name: 'Artesão Raro',
        image_url: 'https://coralisland.fandom.com/wiki/File:Black_honey.png',
        items: [
          { name: 'Mel Preto', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Black_honey.png' },
          { name: 'Kimchi', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Kimchi.png' },
          { name: 'Vinho', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Wine.png' },
          { name: 'Queijo de Cabra Fermentado', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Fermented_goat_cheese_wheel.png' },
          { name: 'Óleo de Trufa Branca', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:White_truffle_oil.png' },
        ],
      },
      {
        name: 'Produtos de Rancho Raros',
        image_url: 'https://coralisland.fandom.com/wiki/File:Black_truffle.png',
        items: [
          { name: 'Trufa Preta', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Black_truffle.png' },
          { name: 'Ovo de Codorna Grande', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Large_quail_egg.png' },
          { name: 'Lã de Lhama Grande', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Large_llama_wool.png' },
          { name: 'Pena Grande', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Large_feather.png' },
          { name: 'Café Gesha Grande', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Large_gesha_coffee_bean.png' },
        ],
      },
      {
        name: 'Recursos Raros',
        image_url: 'https://coralisland.fandom.com/wiki/File:Osmium_kelp_essence.png',
        items: [
          { name: 'Barra de Ouro', quantity: 3, image_url: 'https://coralisland.fandom.com/wiki/File:Gold_bar.png' },
          { name: 'Barra de Prata', quantity: 3, image_url: 'https://coralisland.fandom.com/wiki/File:Silver_bar.png' },
          { name: 'Barra de Bronze', quantity: 3, image_url: 'https://coralisland.fandom.com/wiki/File:Bronze_bar.png' },
          { name: 'Essência de Alga de Ouro', quantity: 3, image_url: 'https://coralisland.fandom.com/wiki/File:Gold_kelp_essence.png' },
          { name: 'Essência de Alga de Prata', quantity: 3, image_url: 'https://coralisland.fandom.com/wiki/File:Silver_kelp_essence.png' },
          { name: 'Essência de Alga de Bronze', quantity: 3, image_url: 'https://coralisland.fandom.com/wiki/File:Bronze_kelp_essence.png' },
          { name: 'Essência de Alga de Ósmio', quantity: 5, image_url: 'https://coralisland.fandom.com/wiki/File:Osmium_kelp_essence.png' },
        ],
      },
    ],
  },
  {
    name: 'Guardian Altar',
    description: 'Dedicado aos guardiões e oferendas lendárias',
    color: '#9B59B6',
    sections: [
      {
        name: 'Oferenda do Mestre Slime',
        image_url: 'https://coralisland.fandom.com/wiki/File:Master_Slime_outfit.png',
        items: [
          { name: 'Qualquer Artefato', quantity: 4, image_url: 'https://coralisland.fandom.com/wiki/File:Artifact_skill.png' },
          { name: 'Qualquer Fóssil', quantity: 4, image_url: 'https://coralisland.fandom.com/wiki/File:Brontosaurus_torso.png' },
          { name: 'Mochila Plop', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Plop_backpack.png' },
          { name: 'Anel de Acumulador', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Hoarder_ring.png' },
          { name: 'Computador Robusto', quantity: 1, image_url: 'https://coralisland.fandom.com/wiki/File:Sturdy_computer.png' },
        ],
      },
      {
        name: 'Retrato do King Tan',
        image_url: 'https://coralisland.fandom.com/wiki/File:King_Tan_outfit.png',
        items: [
          { name: 'Geleia de Durian', quantity: 8, image_url: 'https://coralisland.fandom.com/wiki/File:Jam.png' },
          { name: 'Geleia de Mangostim', quantity: 8, image_url: 'https://coralisland.fandom.com/wiki/File:Jam.png' },
          { name: 'Lichia', quantity: 8, image_url: 'https://coralisland.fandom.com/wiki/File:Lychee.png' },
          { name: 'Manga', quantity: 8, image_url: 'https://coralisland.fandom.com/wiki/File:Mango.png' },
        ],
      },
      {
        name: 'Retrato do Pandazen',
        image_url: 'https://coralisland.fandom.com/wiki/File:Pandazen_outfit.png',
        items: [
          { name: 'Popiah', quantity: 4, image_url: 'https://coralisland.fandom.com/wiki/File:Popiah.png' },
          { name: 'Es Doger', quantity: 4, image_url: 'https://coralisland.fandom.com/wiki/File:Es_doger.png' },
          { name: 'Tempeh com Ervas', quantity: 4, image_url: 'https://coralisland.fandom.com/wiki/File:Herbed_tempeh.png' },
          { name: 'Caçarola de Jaca', quantity: 4, image_url: 'https://coralisland.fandom.com/wiki/File:Jackfruit_casserole.png' },
        ],
      },
      {
        name: 'Retrato da Lady Lavanna',
        image_url: 'https://coralisland.fandom.com/wiki/File:Lady_Lavanna_outfit.png',
        items: [
          { name: 'Leite de Búfala Grande', quantity: 4, image_url: 'https://coralisland.fandom.com/wiki/File:Large_buffalo_milk.png' },
          { name: 'Queijo de Búfala Fermentado', quantity: 4, image_url: 'https://coralisland.fandom.com/wiki/File:Fermented_buffalo_cheese_wheel.png' },
          { name: 'Ovo de Avestruz Centenário Grande', quantity: 4, image_url: 'https://coralisland.fandom.com/wiki/File:Large_century_ostrich_egg.png' },
          { name: 'Maionese de Avestruz Grande', quantity: 4, image_url: 'https://coralisland.fandom.com/wiki/File:Large_ostrich_mayonnaise.png' },
          { name: 'Pegada de Dinossauro', quantity: 5, image_url: 'https://coralisland.fandom.com/wiki/File:Dino_print.png' },
        ],
      },
    ],
  },
];

export function seedDatabase() {
  const existingShrines = db.prepare('SELECT COUNT(*) as count FROM shrines').get() as { count: number };

  if (existingShrines.count > 0) {
    console.log('Database already seeded');
    return;
  }

  console.log('Seeding database...');

  const insertShrine = db.prepare('INSERT INTO shrines (name, description, color) VALUES (?, ?, ?)');
  const insertSection = db.prepare('INSERT INTO sections (shrine_id, name, image_url, order_index) VALUES (?, ?, ?, ?)');
  const insertItem = db.prepare('INSERT INTO section_items (section_id, item_name, quantity, image_url) VALUES (?, ?, ?, ?)');
  const insertStatus = db.prepare('INSERT INTO completion_status (section_id, completed) VALUES (?, 0)');
  const insertItemStatus = db.prepare('INSERT INTO item_completion_status (item_id, completed_quantity) VALUES (?, 0)');

  shrinesData.forEach((shrine) => {
    const shrineResult = insertShrine.run(shrine.name, shrine.description, shrine.color);
    const shrineId = shrineResult.lastInsertRowid;

    shrine.sections.forEach((section, index) => {
      const sectionResult = insertSection.run(shrineId, section.name, section.image_url, index);
      const sectionId = sectionResult.lastInsertRowid;

      section.items.forEach((item) => {
        const itemResult = insertItem.run(sectionId, item.name, item.quantity, item.image_url);
        const itemId = itemResult.lastInsertRowid;
        insertItemStatus.run(itemId);
      });

      insertStatus.run(sectionId);
    });
  });

  console.log('Database seeded successfully!');
}

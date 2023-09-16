"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 *
 * @param element Elemento HTML que deve tremer
 */
function tremor(element) {
    element.classList.add("tremer");
    setTimeout(() => {
        element.classList.remove("tremer");
    }, 820);
}
/**
 *
 * @returns HTMLDivElement
 */
function gerarCards() {
    // Seleciona o elemento com o ID 'card-container'
    const cardContainer = document.getElementById("card-container");
    // Verifica se o elemento existe
    if (!cardContainer) {
        console.error("Elemento card-container não encontrado");
        return;
    }
    // Inicializa uma variável para armazenar o HTML gerado
    let cardsHTML = "";
    // Gera o HTML 6 vezes
    for (let i = 0; i < 6; i++) {
        cardsHTML += `<div id="bg" class="card  animated">
    <div class="card-header">
      <div class="sub-header"><span class="header-desc">Evolves from </span>|<span class="header-desc"> to  </span></div>
      <div class="title">
        <h2 class="pokename">...</h2><h3 class="pokemonHp"> 0HP</h3>
      </div>
      <div class="avatar-container">
        <!--.pre-evolution-title Stage 2-->
        <div class="card-avatar pre-evolution">
        <span class="stage">Pre form</span>
        <img src="pokebolaa.gif" alt="" class="pre-pokemon">
        </div>
        <div class="card-avatar">
        <img src="pokebolaa.gif" alt="" class="pokemon-img">
        </div>
      </div>
      <div class="card-props"><p class="pokemonType"> Pokémon type:...</p><p class="pokemonHeight"> Length 5' 7"</p>, <p  class="pokemonWeight">Weight:200 lbs</p></div>
      <div class="card-body">
        <div class="power-container">
          <h3 class="power-stats"> Pokémon Stats </h3>
          <p class="power-content pokemonAttack"></p>
          <p class="power-content pokemonDefense"></p>
          <p class="power-content pokemonEspecialAttack"></p>
          <p class="power-content pokemonEspecialDefense"></p>
          <p class="power-content pokemonSpeed"></p>

          </div>
        <div class="attack-container">
          <div class="card-icons">
            <div class="type-icon icon-fire attack-icon"></div>
            <div class="type-icon icon-fire attack-icon"></div>
            <div class="type-icon icon-fire attack-icon"></div>
            <div class="type-icon icon-fire attack-icon"></div>
          </div>
          <h3 class="attack-title">Moves</h3>
          <p class="attack-content">Attacks </p>
        </div>
        <div class="attributes-container">
          <div class="weakness-container">  <span class="weaknesses">weaknesses  </span>
          </div>
          <div class="resistance-container"> <span class="resistance">resistance</span>
          </div>
          <div class="advantage-container"> <span class="advantage">Advantage</span>

          </div>
        </div>
      </div>
    </div>
  </div>`;
    }
    // Insere o HTML gerado dentro do elemento 'card-container'
    cardContainer.innerHTML = cardsHTML;
}
gerarCards();
/** Lista de pokemons disponíveis no menu suspenso */
const listaPokemons = document.getElementById("lista-pokemons");
/** Slots onde as informações do Pokemon serão exibidas */
const slots = document.querySelectorAll(".card");
/** Botão para escolher um Pokemon */
const btnChoose = document.getElementById("choose");
/** Botão para compartilhar o time atual */
const btnCompartilhar = document.getElementById("compartilhar");
/** Botão para gerar um Pokemon aleatório */
const btnGerarAleatorio = document.getElementById("gerar-aleatorio");
/** Botão para gerar um time de Pokemons aleatórios */
const btnGerarTimeAleatorio = document.getElementById("gerar-time-aleatorio");
/** Campo de entrada para filtrar Pokemons */
const filtro = document.getElementById("filtro");
/** Botão para resetar todas as seleções e filtros */
const btnReset = document.getElementById("reset");
/** Elemento que representa o cartão onde as informações do Pokemon são exibidas */
let card = document.querySelector("#bg");
let type_info = [
    {
        type: "Fire",
        img: "../../public/assets/img/fire.png",
        advantage: ["Grass", "Ice", "Bug", "Steel"],
        weakness: ["Water", "Ground", "Rock"],
        resistance: ["Fire", "Grass", "Ice", "Bug", "Steel"],
    },
    {
        type: "Water",
        img: "../../public/assets/img/water.png",
        advantage: ["Fire", "Ground", "Rock"],
        weakness: ["Electric", "Grass"],
        resistance: ["Water", "Fire", "Ice", "Steel"],
    },
    {
        type: "Grass",
        img: "../../public/assets/img/grass.png",
        advantage: ["Water", "Ground", "Rock"],
        weakness: ["Fire", "Ice", "Poison", "Flying", "Bug"],
        resistance: ["Water", "Electric", "Grass", "Ground"],
    },
    {
        type: "Electric",
        img: "../../public/assets/img/electric.png",
        advantage: ["Water", "Flying"],
        weakness: ["Ground"],
        resistance: ["Electric", "Flying", "Steel"],
    },
    {
        type: "Ice",
        img: "../../public/assets/img/ice.png",
        advantage: ["Grass", "Ground", "Flying", "Dragon"],
        weakness: ["Fire", "Fighting", "Rock", "Steel"],
        resistance: ["Ice"],
    },
    {
        type: "Fighting",
        img: "../../public/assets/img/fighting.png",
        advantage: ["Normal", "Ice", "Rock", "Dark", "Steel"],
        weakness: ["Flying", "Psychic", "Fairy"],
        resistance: ["Bug", "Rock", "Dark"],
    },
    {
        type: "Poison",
        img: "../../public/assets/img/poison.png",
        advantage: ["Grass", "Fairy"],
        weakness: ["Ground", "Psychic"],
        resistance: ["Grass", "Fighting", "Poison", "Bug", "Fairy"],
    },
    {
        type: "Ground",
        img: "../../public/assets/img/ground.png",
        advantage: ["Fire", "Electric", "Poison", "Rock", "Steel"],
        weakness: ["Water", "Grass", "Ice"],
        resistance: ["Poison", "Rock"],
    },
    {
        type: "Flying",
        img: "../../public/assets/img/flying.png",
        advantage: ["Grass", "Fighting", "Bug"],
        weakness: ["Electric", "Ice", "Rock"],
        resistance: ["Grass", "Fighting", "Bug"],
    },
    {
        type: "Psychic",
        img: "../../public/assets/img/psychic.png",
        advantage: ["Fighting", "Poison"],
        weakness: ["Bug", "Ghost", "Dark"],
        resistance: ["Fighting", "Psychic"],
    },
    {
        type: "Bug",
        img: "../../public/assets/img/bug.png",
        advantage: ["Grass", "Psychic", "Dark"],
        weakness: ["Fire", "Fighting", "Flying", "Ghost"],
        resistance: ["Grass", "Fighting", "Ground"],
    },
    {
        type: "Rock",
        img: "../../public/assets/img/rock.png",
        advantage: ["Fire", "Ice", "Flying", "Bug"],
        weakness: ["Water", "Grass", "Fighting", "Ground", "Steel"],
        resistance: ["Normal", "Fire", "Poison", "Flying"],
    },
    {
        type: "Ghost",
        img: "../../public/assets/img/ghost.png",
        advantage: ["Psychic", "Ghost"],
        weakness: ["Ghost", "Dark"],
        resistance: ["Poison", "Bug"],
    },
    {
        type: "Dragon",
        img: "../../public/assets/img/dragon.png",
        advantage: ["Dragon"],
        weakness: ["Ice", "Dragon", "Fairy"],
        resistance: ["Fire", "Water", "Electric", "Grass"],
    },
    {
        type: "Dark",
        img: "../../public/assets/img/dark.png",
        advantage: ["Psychic", "Ghost"],
        weakness: ["Fighting", "Bug", "Fairy"],
        resistance: ["Ghost", "Dark"],
    },
    {
        type: "Steel",
        img: "../../public/assets/img/steel.png",
        advantage: ["Ice", "Rock", "Fairy"],
        weakness: ["Fire", "Fighting", "Ground"],
        resistance: [
            "Normal",
            "Grass",
            "Ice",
            "Flying",
            "Psychic",
            "Bug",
            "Rock",
            "Dragon",
            "Fairy",
        ],
    },
    {
        type: "Fairy",
        img: "../../public/assets/img/fairy.png",
        advantage: ["Fighting", "Dragon", "Dark"],
        weakness: ["Poison", "Steel"],
        resistance: ["Fighting", "Bug", "Dark"],
    },
    {
        type: "Normal",
        img: "../../public/assets/img/normal.png",
        advantage: [],
        weakness: ["Fighting"],
        resistance: [],
    },
];
let pokemonsEscolhidos = [];
let pokeitems = [
    "Water Stone",
    "Aguav Berry",
    "Assault Vest",
    "Choice Band",
    "Choice Scarf",
    "Choice Specs",
    "Eviolite",
    "Expert Belt",
    "Figy Berry",
    "Focus Sash",
    "Heavy-Duty Boots",
    "Iapapa Berry",
    "Leftovers",
    "Life Orb",
    "Mago Berry",
    "Mental Herb",
    "Power Herb",
    "Rocky Helmet",
    "Salac Berry",
    "Wiki Berry",
    "Ability Shield",
    "Absorb Bulb",
    "Adrenaline Orb",
    "Air Balloon",
    "Apicot Berry",
    "Auspicious Armor",
    "Babiri Berry",
    "Big Nugget",
    "Black Belt",
    "Black Glasses",
    "Black Sludge",
    "Blunder Policy",
    "Booster Energy",
    "Bright Powder",
    "Cell Battery",
    "Charcoal",
    "Charti Berry",
    "Chesto Berry",
    "Chilan Berry",
    "Chople Berry",
    "Clear Amulet",
    "Coba Berry",
    "Colbur Berry",
    "Covert Cloak",
    "Custap Berry",
    "Damp Rock",
    "Draco Plate",
    "Dragon Fang",
    "Dread Plate",
    "Earth Plate",
    "Eject Button",
    "Eject Pack",
    "Electric Seed",
    "Fairy Feather",
    "Fist Plate",
    "Flame Orb",
    "Flame Plate",
    "Ganlon Berry",
    "Grassy Seed",
    "Grepa Berry",
    "Grip Claw",
    "Haban Berry",
    "Hard Stone",
    "Heat Rock",
    "Icicle Plate",
    "Icy Rock",
    "Insect Plate",
    "Iron Plate",
    "Kasib Berry",
    "Kebia Berry",
    "Kee Berry",
    "Kelpsy Berry",
    "King's Rock",
    "Lagging Tail",
    "Lansat Berry",
    "Leppa Berry",
    "Liechi Berry",
    "Light Clay",
    "Loaded Dice",
    "Lum Berry",
    "Luminous Moss",
    "Magnet",
    "Malicious Armor",
    "Maranga Berry",
    "Masterpiece Teacup",
    "Meadow Plate",
    "Metal Coat",
    "Metronome",
    "Micle Berry",
    "Mind Plate",
    "Miracle Seed",
    "Mirror Herb",
    "Misty Seed",
    "Muscle Band",
    "Mystic Water",
    "Never-Melt Ice",
    "Normal Gem",
    "Occa Berry",
    "Passho Berry",
    "Payapa Berry",
    "Petaya Berry",
    "Pixie Plate",
    "Poison Barb",
    "Protective Pads",
    "Psychic Seed",
    "Punching Glove",
    "Quick Claw",
    "Razor Claw",
    "Red Card",
    "Rindo Berry",
    "Room Service",
    "Roseli Berry",
    "Safety Goggles",
    "Scope Lens",
    "Sharp Beak",
    "Shed Shell",
    "Shell Bell",
    "Shuca Berry",
    "Silk Scarf",
    "Silver Powder",
    "Sitrus Berry",
    "Sky Plate",
    "Smooth Rock",
    "Snowball",
    "Soft Sand",
    "Spell Tag",
    "Splash Plate",
    "Spooky Plate",
    "Starf Berry",
    "Sticky Barb",
    "Stone Plate",
    "Tanga Berry",
    "Terrain Extender",
    "Throat Spray",
    "Toxic Orb",
    "Toxic Plate",
    "Twisted Spoon",
    "Unremarkable Teacup",
    "Utility Umbrella",
    "Wacan Berry",
    "Weakness Policy",
    "White Herb",
    "Wide Lens",
    "Wise Glasses",
    "Yache Berry",
    "Zap Plate",
    "Zoom Lens",
    "Adamant Crystal",
    "Adamant Orb",
    "Cornerstone Mask",
    "Griseous Core",
    "Griseous Orb",
    "Hearthflame Mask",
    "Light Ball",
    "Lustrous Globe",
    "Lustrous Orb",
    "Rusted Shield",
    "Rusted Sword",
    "Wellspring Mask",
    "Aspear Berry",
    "Big Root",
    "Binding Band",
    "Cheri Berry",
    "Destiny Knot",
    "Enigma Berry",
    "Float Stone",
    "Focus Band",
    "Iron Ball",
    "Jaboca Berry",
    "Oran Berry",
    "Pecha Berry",
    "Persim Berry",
    "Power Anklet",
    "Power Band",
    "Power Belt",
    "Power Bracer",
    "Power Lens",
    "Power Weight",
    "Rawst Berry",
    "Ring Target",
    "Rowap Berry",
    "Beast Ball",
    "Bottle Cap",
    "Chipped Pot",
    "Cracked Pot",
    "Dawn Stone",
    "Dive Ball",
    "Dream Ball",
    "Dusk Ball",
    "Dusk Stone",
    "Fast Ball",
    "Fire Stone",
    "Friend Ball",
    "Gold Bottle Cap",
    "Great Ball",
    "Heal Ball",
    "Heavy Ball",
    "Hondew Berry",
    "Ice Stone",
    "Leaf Stone",
    "Level Ball",
    "Love Ball",
    "Lure Ball",
    "Luxury Ball",
    "Master Ball",
    "Moon Ball",
    "Moon Stone",
    "Nest Ball",
    "Net Ball",
    "Oval Stone",
    "Poke Ball",
    "Pomeg Berry",
    "Premier Ball",
    "Qualot Berry",
    "Quick Ball",
    "Rare Bone",
    "Repeat Ball",
    "Shiny Stone",
    "Sun Stone",
    "Sweet Apple",
    "Syrupy Apple",
    "Tamato Berry",
    "Tart Apple",
    "Thunder Stone",
    "Timer Ball",
    "Ultra Ball",
    "Water Stone"
];
/**
 * Carrega a lista de Pokemons disponíveis no menu suspenso
 */
function carregarListaDePokemons() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
            const pokemons = response.data.results;
            for (let pokemon of pokemons) {
                const option = document.createElement("option");
                option.innerText = pokemon.name;
                listaPokemons.appendChild(option);
            }
            btnChoose.addEventListener("click", (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                //if  pokemon name exist create a span with X to remove the pokemon name if click
                let pokemonName = filtro.value;
                if (pokemonName === "") {
                    alert("Escolha um Pokémon");
                    return;
                }
                console.log(`🚀 ~ file: main.ts:109 ~ btnChoose.addEventListener ~ pokemonName:`, pokemonName);
                yield escolherPokemon(NaN, pokemonName);
                filtro.value = "";
            }));
            btnCompartilhar.addEventListener("click", function () {
                // Gerar o texto para cada Pokémon
                let textoCompleto = '';
                // Suponha que `seuArrayDePokemons` seja um array contendo todos os Pokémons que você gerou
                for (const pokemon of pokemonsEscolhidos) {
                    textoCompleto += gerarTextoPokemonShowdown(pokemon);
                }
                // Copiar para a área de transferência
                copiarTextoParaClipboard(textoCompleto);
                // Ou abrir Pokémon Showdown (ajuste conforme necessário)
                // window.open('https://pokeapi.co/api/v2/pokemon/');
            });
            btnGerarAleatorio.addEventListener("click", gerarPokemonAleatorio);
            btnGerarTimeAleatorio.addEventListener("click", gerarTimeAleatorio);
            btnReset.addEventListener("click", resetarTime);
            // Adicione o ouvinte de eventos para o campo de busca
            ///filtro.addEventListener("input", filtrarPokemons);
        }
        catch (error) {
            console.error(error);
        }
    });
}
function buscarPreEvolucao(pokemonName) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Primeiro, obtenha o ID da cadeia de evolução do Pokémon
            const pokemonData = yield axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
            const evolutionChain_pre_name = (_a = pokemonData.data.evolves_from_species) === null || _a === void 0 ? void 0 : _a.name;
            // Verifique se evolutionChain_pre_name é null ou undefined aqui
            if (!evolutionChain_pre_name) {
                return {
                    prevEvolution_img: "egg.png",
                    evolutionChain_pre_name: "poke baby",
                };
            }
            const evolutionData = yield axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionChain_pre_name}`);
            const prevEvolution_img = evolutionData.data.sprites.front_default;
            if (!prevEvolution_img) {
                return { prevEvolution_img: "egg.png", evolutionChain_pre_name };
            }
            return { prevEvolution_img, evolutionChain_pre_name };
        }
        catch (error) {
            console.error("Ocorreu um erro ao buscar a evolução anterior:", error);
            return {
                prevEvolution_img: "egg.png",
                evolutionChain_pre_name: "poke baby",
            };
        }
    });
}
function addTooltipEvents() {
    const imgs = document.querySelectorAll(".type-img");
    imgs.forEach((img) => {
        img.addEventListener("mouseover", (event) => {
            const altText = img.getAttribute("alt");
            const tooltipDiv = document.createElement("div");
            tooltipDiv.innerHTML = altText ? altText : "";
            // Obter a posição do elemento de imagem
            const rect = img.getBoundingClientRect();
            const x = rect.left + window.scrollX;
            const y = rect.top + window.scrollY;
            tooltipDiv.style.position = "absolute";
            tooltipDiv.style.left = `${x}px`;
            tooltipDiv.style.top = `${y - 20}px`; // 20 pixels acima da imagem
            tooltipDiv.classList.add("tooltip");
            document.body.appendChild(tooltipDiv);
        });
        img.addEventListener("mouseout", () => {
            const tooltipDiv = document.querySelector(".tooltip");
            if (tooltipDiv) {
                tooltipDiv.remove();
            }
        });
    });
}
function escolherPokemon(randomIndex, pokemonName) {
    return __awaiter(this, void 0, void 0, function* () {
        let query = randomIndex ? randomIndex : pokemonName;
        try {
            const response = yield axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
            const pokemonImg = response.data.sprites.front_default;
            var pokemonWeight = `${response.data.weight} Kg`;
            var pokemonHeight = `${response.data.height}0 Cm`;
            var pokemonType = "";
            for (var type in response.data["types"]) {
                pokemonType += `TYPE:${response.data["types"][type].type.name} `;
            }
            var pokemoves = [];
            for (var move in response.data["moves"]) {
                pokemoves.push(response.data["moves"][move].move.name);
            }
            //get 4 random moves
            var randomMoves = [];
            for (var i = 0; i < 4; i++) {
                var randomMove = pokemoves[Math.floor(Math.random() * pokemoves.length)];
                randomMoves.push(randomMove);
            }
            let moves = randomMoves.join(" | ");
            var pokemonHp = `HP:${response.data["stats"][0]["base_stat"]}`;
            var pokemonAttack = `ATK:${response.data["stats"][1]["base_stat"]}`;
            var pokemonDefense = `DEF:${response.data["stats"][2]["base_stat"]}`;
            var pokemonEspecialAttack = `ESP-ATK:${response.data["stats"][3]["base_stat"]}`;
            var pokemonEspecialDefense = `ESP-DEF:${response.data["stats"][4]["base_stat"]}`;
            var pokemonSpeed = `SPEED:${response.data["stats"]["5"]["base_stat"]}`;
            let timeCompleto = 0;
            pokemonName = pokemonName
                ? pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)
                : response.data.name.charAt(0).toUpperCase() +
                    response.data.name.slice(1);
            for (let slot of slots) {
                if (slot.querySelector(".pokename").innerHTML === "..." ||
                    slot.querySelector(".pokename").innerHTML === "") {
                    const resultado = yield buscarPreEvolucao(response.data.id);
                    if (resultado) {
                        const { prevEvolution_img, evolutionChain_pre_name } = resultado;
                        if (prevEvolution_img) {
                            const preEvolutionElement = slot.querySelector(".pre-pokemon");
                            preEvolutionElement.src = `${prevEvolution_img}`;
                        }
                        if (evolutionChain_pre_name) {
                            const span = slot.querySelector(".sub-header span:first-child");
                            const span_ = slot.querySelector(".sub-header span:last-child");
                            //  console.log(`🚀 ~ file: main.ts:211 ~ escolherPokemon ~ span:`, span);
                            span.innerHTML += `${evolutionChain_pre_name.slice(0, 1).toUpperCase() +
                                evolutionChain_pre_name.slice(1)}`;
                            span_.innerHTML += `${pokemonName}`;
                        }
                    }
                    function addImagesToContainer(container, typesArray) {
                        typesArray.forEach((type) => {
                            const img = document.createElement("img");
                            const typeData = type_info.find((info) => info.type == type.slice(0, 1).toUpperCase() + type.slice(1));
                            img.src = typeData ? typeData.img : "";
                            img.alt = `${type} pokemon`;
                            img.classList.add("type-img");
                            container.appendChild(img);
                        });
                    }
                    response.data.types.forEach((typeObj) => {
                        const typeName = typeObj.type.name;
                        const typeData = type_info.find((info) => info.type.toLowerCase() === typeName);
                        if (typeData) {
                            switch (typeData.type.toLowerCase()) {
                                case "fire":
                                    slot.style.background =
                                        "linear-gradient(to right, #FF4500, #FF8C00)";
                                    break;
                                case "water":
                                    slot.style.background =
                                        "linear-gradient(to left, #1E90FF, #00BFFF)";
                                    break;
                                case "grass":
                                    slot.style.background =
                                        "linear-gradient(to right, #228B22, #32CD32)";
                                    break;
                                case "electric":
                                    slot.style.background =
                                        "linear-gradient(to left, #FFF9C4, #FFA000, #FFC107, #FFFDE7)";
                                    break;
                                case "psychic":
                                    slot.style.background =
                                        "linear-gradient(to right, #8A2BE2, #DA70D6)";
                                    break;
                                case "ice":
                                    slot.style.background =
                                        "linear-gradient(to left, #00CED1, #1E90FF)";
                                    break;
                                case "dragon":
                                    slot.style.background =
                                        "linear-gradient(to right, #8B0000, #A52A2A)";
                                    break;
                                case "dark":
                                    slot.style.background =
                                        "linear-gradient(to left, #2F4F4F, #696969)";
                                    break;
                                case "fairy":
                                    slot.style.background =
                                        "linear-gradient(to right, #FFB6C1, #FF69B4)";
                                    break;
                                case "normal":
                                    slot.style.background =
                                        "linear-gradient(to left, #A9A9A9, #808080)";
                                    break;
                                case "fighting":
                                    slot.style.background =
                                        "linear-gradient(to right, #8B4513, #D2691E)";
                                    break;
                                case "flying":
                                    slot.style.background =
                                        "linear-gradient(to left, #87CEEB, #B0E0E6)";
                                    break;
                                case "poison":
                                    slot.style.background =
                                        "linear-gradient(to right, #9400D3, #8A2BE2)";
                                    break;
                                case "ground":
                                    slot.style.background =
                                        "linear-gradient(to left, #DAA520, #CD853F)";
                                    break;
                                case "rock":
                                    slot.style.background =
                                        "linear-gradient(to right, #BDB76B, #F4A460)";
                                    break;
                                case "bug":
                                    slot.style.background =
                                        "linear-gradient(to left, #556B2F, #6B8E23)";
                                    break;
                                case "ghost":
                                    slot.style.background =
                                        "linear-gradient(to right, #4B0082, #483D8B)";
                                    break;
                                case "steel":
                                    slot.style.background =
                                        "linear-gradient(to left, #C0C0C0, #B0C4DE)";
                                    break;
                                default:
                                    slot.style.background =
                                        "linear-gradient(to right, #FFFFFF, #F5F5F5)";
                                    break;
                            }
                            // Adicionar imagens para fraquezas, vantagens e resistências
                            const weaknessContainer = slot.querySelector(".weakness-container");
                            if (weaknessContainer !== null) {
                                addImagesToContainer(weaknessContainer, typeData.weakness);
                            }
                            const advantageContainer = slot.querySelector(".advantage-container");
                            if (advantageContainer !== null) {
                                addImagesToContainer(advantageContainer, typeData.advantage);
                            }
                            const resistanceContainer = slot.querySelector(".resistance-container");
                            if (resistanceContainer !== null) {
                                addImagesToContainer(resistanceContainer, typeData.resistance);
                            }
                        }
                    });
                    const typeNames = response.data.types.map(({ type: { name } }) => name);
                    const tp_immg = slot.querySelector(".title");
                    if (tp_immg !== null) {
                        addImagesToContainer(tp_immg, typeNames);
                    }
                    slot.querySelector(".attack-content").innerHTML = ` ${moves}`;
                    slot.querySelector(".pokename").innerHTML = ` ${pokemonName}`;
                    slot.querySelector(".pokemonWeight").innerHTML = `${pokemonWeight}`;
                    slot.querySelector(".pokemonHeight").innerHTML = `${pokemonHeight}`;
                    slot.querySelector(".pokemonType").innerHTML = `${pokemonType}`;
                    slot.querySelector(".pokemonHp").innerHTML = `${pokemonHp}`;
                    slot.querySelector(".pokemonAttack").innerHTML = `${pokemonAttack}`;
                    slot.querySelector(".pokemonDefense").innerHTML = `${pokemonDefense}`;
                    slot.querySelector(".pokemonEspecialAttack").innerHTML = `${pokemonEspecialAttack}`;
                    slot.querySelector(".pokemonEspecialDefense").innerHTML = `${pokemonEspecialDefense}`;
                    slot.querySelector(".pokemonSpeed").innerHTML = `${pokemonSpeed}`;
                    const pokemonImgElement = slot.querySelector(".pokemon-img");
                    pokemonImgElement.src = pokemonImg;
                    pokemonImgElement.alt = pokemonName;
                    pokemonImgElement.alt = pokemonName;
                    timeCompleto += 1;
                    break; // Saia do loop, pois você já preencheu um slot
                }
            }
            if (timeCompleto === 6) {
                if (navigator.vibrate) {
                    navigator.vibrate(200);
                }
                else {
                    tremor(document.body);
                }
            }
            const pokemonDetails = {
                name: pokemonName,
                ability: "Sua habilidade aqui",
                type: pokemonType,
                evs: `${pokemonAttack} / ${pokemonEspecialAttack} / ${pokemonSpeed}`,
                nature: "Sua natureza aqui",
                moves: randomMoves
            };
            pokemonsEscolhidos.push(pokemonDetails);
        }
        catch (error) {
            console.error(error);
        }
        addTooltipEvents();
    });
}
function gerarPokemonAleatorio() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let slot of slots) {
            const randomIndex = Math.floor(Math.random() * 151) + 1;
            yield escolherPokemon(randomIndex);
            break;
        }
    });
}
function gerarTimeAleatorio() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let slot of slots) {
            yield gerarPokemonAleatorio();
        }
    });
}
function resetarTime() {
    pokemonsEscolhidos = [];
    for (let slot of slots) {
        slot.querySelector("span").innerText = "";
        const pokemonImgElement = slot.querySelector(".pokemon-img");
        pokemonImgElement.src = "pokebolaa.gif";
        pokemonImgElement.alt = "";
        const pokemonImgElement_ = slot.querySelector(".pre-pokemon");
        pokemonImgElement_.src = "pokebolaa.gif";
        pokemonImgElement_.alt = "";
        const type_img = slot.querySelectorAll(".type-img");
        type_img.forEach((img) => img.remove());
        filtro.value = "";
        const span = slot.querySelector('.sub-header span:first-child');
        const span_ = slot.querySelector('.sub-header span:last-child');
        span.innerHTML = '';
        span_.innerHTML = '';
        slot.querySelector(".pokename").innerHTML = "";
        slot.querySelector(".pokemonWeight").innerHTML = ``;
        slot.querySelector(".pokemonHeight").innerHTML = ``;
        slot.querySelector(".pokemonType").innerHTML = ``;
        slot.querySelector(".pokemonHp").innerHTML = ``;
        slot.querySelector(".pokemonAttack").innerHTML = ``;
        slot.querySelector(".pokemonDefense").innerHTML = ``;
        slot.querySelector(".pokemonEspecialAttack").innerHTML = ``;
        slot.querySelector(".pokemonEspecialDefense").innerHTML = ``;
        slot.querySelector(".pokemonSpeed").innerHTML = ``;
        slot.querySelector(".pre-pokemon").style.background = ``;
        slot.style.background = ``;
        slot.querySelector(".attack-content").innerHTML = ``;
    }
}
function gerarTextoPokemonShowdown(pokemon) {
    // Exemplo de como você poderia criar o texto
    return `
${pokemon.name} @ ${pokeitems[Math.floor(Math.random() * pokeitems.length)]}
Ability: ${pokemon.ability}
Tera Type: ${pokemon.type}
EVs: ${pokemon.evs}
${pokemon.nature} Nature
- ${pokemon.moves.join('\n- ')}
  `;
}
function copiarTextoParaClipboard(texto) {
    const el = document.createElement('textarea');
    el.value = texto;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}
/**
 * Filtra a lista de pokémons com base no valor do campo de entrada
 */
carregarListaDePokemons();
filtro.addEventListener("input", function () {
    // Verificar se já existe um ícone "X", e removê-lo se existir
    const existingSpan = document.querySelector(".pokemon-name");
    if (existingSpan)
        existingSpan.remove();
    // Se o campo de entrada não estiver vazio, adicionar o ícone "X"
    if (filtro.value) {
        const span = document.createElement("span");
        span.innerText = "X";
        span.classList.add("pokemon-name");
        span.addEventListener("click", function (event) {
            event.preventDefault();
            span.remove();
            filtro.value = "";
        });
        // Adicionar o ícone "X" como um elemento irmão do campo de entrada
        if (filtro.parentNode) {
            filtro.parentNode.appendChild(span);
        }
        else {
            console.error("filtro.parentNode is null");
        }
    }
});

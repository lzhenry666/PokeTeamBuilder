function tremor(element: HTMLElement) {
  element.classList.add("tremer");
  setTimeout(() => {
    element.classList.remove("tremer");
  }, 820);
}
function gerarCards(): void {
  // Seleciona o elemento com o ID 'card-container'
  const cardContainer = document.getElementById('card-container');

  // Verifica se o elemento existe
  if (!cardContainer) {
    console.error('Elemento card-container não encontrado');
    return;
  }

  // Inicializa uma variável para armazenar o HTML gerado
  let cardsHTML = '';

  // Gera o HTML 6 vezes
  for (let i = 0; i < 6; i++) {
    cardsHTML += `<div id="bg" class="card">
    <div class="card-header">
      <div class="sub-header"><span class="header-desc">Evolves from Charmeleon</span><span class="header-desc">Put Charizard on the stage | Pokemon</span></div>
      <div class="title">
        <h2 class="pokename">...</h2><p class="pokemonHp"> 0HP</p>
        <div class="type  type-icon icon-fire"></div>
      </div>
      <div class="avatar-container">
        <!--.pre-evolution-title Stage 2-->
        <div class="card-avatar pre-evolution">
        <span class="stage">Stage 2</span></div>
        <div class="card-avatar">
        <img src="../../pokebolaa.gif" alt="" class="pokemon-img">
        </div>
      </div>
      <div class="card-props"><p class="pokemonType"> Pokémon type:...</p><p class="pokemonHeight"> Length 5' 7"</p>, <p  class="pokemonWeight">Weight:200 lbs</p></div>
      <div class="card-body">
        <div class="power-container">
          <h3 class="power-stats"> Pokémon Power Stats </h3>
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
            <div class="type-icon icon-water"></div>
          </div>
          <div class="resistance-container"> <span class="resistance">resistance</span>
            <div class="type-icon icon-fire"></div>
          </div>
          <div class="retreat-container"> <span class="retreat-cost">retreat-cost</span>
            <div class="type-icon icon-normal"></div>
            <div class="type-icon icon-normal"></div>
            <div class="type-icon icon-normal"></div>
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
const listaPokemons = document.getElementById("lista-pokemons") as HTMLSelectElement;
const slots = document.querySelectorAll(".card") as NodeListOf<HTMLDivElement>;
const btnChoose = document.getElementById("choose") as HTMLButtonElement;
const btnCompartilhar = document.getElementById("compartilhar") as HTMLButtonElement;
const btnGerarAleatorio = document.getElementById("gerar-aleatorio") as HTMLButtonElement;
const btnGerarTimeAleatorio = document.getElementById("gerar-time-aleatorio") as HTMLButtonElement;
const filtro = document.getElementById("filtro") as HTMLInputElement;
const btnReset = document.getElementById("reset") as HTMLButtonElement;
let card = document.querySelector("#bg") as HTMLDivElement;




async function carregarListaDePokemons() {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
    const pokemons = response.data.results;

    for (let pokemon of pokemons) {
      const option = document.createElement("option");
      option.innerText = pokemon.name;
      listaPokemons.appendChild(option);

    }

    btnChoose.addEventListener("click", async (event) => {
      event.preventDefault();
      let pokemonName = filtro.value;
      console.log(`🚀 ~ file: main.ts:109 ~ btnChoose.addEventListener ~ pokemonName:`, pokemonName);
      await escolherPokemon(NaN, pokemonName);
    });
        btnCompartilhar.addEventListener("click", compartilharTime);
    btnGerarAleatorio.addEventListener("click", gerarPokemonAleatorio);
    btnGerarTimeAleatorio.addEventListener("click", gerarTimeAleatorio);
    btnReset.addEventListener("click", resetarTime);

    // Adicione o ouvinte de eventos para o campo de busca
    ///filtro.addEventListener("input", filtrarPokemons);

  } catch (error) {
    console.error(error);
  }
}


async function buscarPreEvolucao(pokemonName : string) {
    try {
      // Primeiro, obtenha o ID da cadeia de evolução do Pokémon
      const pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);
      const evolutionChain_pre_name = pokemonData.data.evolves_from_species?.name;
      console.log(`🚀 ~ file: main.ts:134 ~ buscarPreEvolucao ~ evolutionChain_pre_name:`, evolutionChain_pre_name);
      if (evolutionChain_pre_name === null || evolutionChain_pre_name === undefined) {
        return "https://www.vhv.rs/dpng/d/65-659762_pokemon-egg-hd-png-download.png";
      }
      // Em seguida, obtenha os dados da cadeia de evolução
      const evolutionData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionChain_pre_name}`);
      const prevEvolution = evolutionData.data.sprites.front_default;

      return prevEvolution;

    } catch (error) {
      console.error("Ocorreu um erro ao buscar a evolução anterior:", error);
    }
  }



async function escolherPokemon(randomIndex: number, pokemonName?: string)  {

  let query =  randomIndex  ? randomIndex  : pokemonName;



  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query}`);
    const pokemonImg = response.data.sprites.front_default;
    console.log(`🚀 ~ file: main.ts:175 ~ escolherPokemon ~ response:`, response);
    var pokemonWeight = `${response.data.weight} Kg`;
    var pokemonHeight = `${response.data.height}0 Cm`;
    var pokemonType = "";
    for (var type in response.data["types"]) {
       pokemonType += `TYPE:${response.data["types"][type].type.name} `;
    }



    var  pokemoves = []
    for (var move in response.data["moves"]) {
      pokemoves.push(response.data["moves"][move].move.name);
    }
    //get 4 random moves
    var randomMoves = [];
    for (var i = 0; i < 4; i++) {
      var randomMove = pokemoves[Math.floor(Math.random() * pokemoves.length)];
      randomMoves.push(randomMove);
    }
    let moves =  randomMoves.join(" | ");
    var  pokemonHp = `HP:${response.data["stats"][0]["base_stat"]}`;
   var  pokemonAttack = `ATK:${response.data["stats"][1]["base_stat"]}`;
   var  pokemonDefense = `DEF:${response.data["stats"][2]["base_stat"]}`;
   var  pokemonEspecialAttack = `ESP-ATK:${response.data["stats"][3]["base_stat"]}`;
   var  pokemonEspecialDefense = `ESP-DEF:${response.data["stats"][4]["base_stat"]}`;
    var pokemonSpeed = `SPEED:${response.data["stats"]["5"]["base_stat"]}`;
    let timeCompleto = 0;
    pokemonName= pokemonName? pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1) : response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1);
    for (let slot of slots) {

      if (!slot.querySelector('.pokename')!.innerHTML) {
        const preEvolutionImgUrl = await buscarPreEvolucao(response.data.id);
    if (preEvolutionImgUrl) {
      const preEvolutionElement = slot.querySelector('.pre-evolution') as HTMLElement;

      preEvolutionElement.style.backgroundImage = `url(${preEvolutionImgUrl})`;
      preEvolutionElement.style.backgroundSize = 'cover';
    }
    switch (response.data["types"][0].type.name) {
      case 'fire':
        slot.style.background = "linear-gradient(to right, #FF4500, #FF8C00)";
        break;
      case 'water':
        slot.style.background = "linear-gradient(to left, #1E90FF, #00BFFF)";
        break;
      case 'grass':
        slot.style.background = "linear-gradient(to right, #228B22, #32CD32)";
        break;
      case 'electric':
        slot.style.background = "linear-gradient(to left, #FFD400, #FFFF00)";
        break;
      case 'psychic':
        slot.style.background = "linear-gradient(to right, #8A2BE2, #DA70D6)";
        break;
      case 'ice':
        slot.style.background = "linear-gradient(to left, #00CED1, #1E90FF)";
        break;
      case 'dragon':
        slot.style.background = "linear-gradient(to right, #8B0000, #A52A2A)";
        break;
      case 'dark':
        slot.style.background = "linear-gradient(to left, #2F4F4F, #696969)";
        break;
      case 'fairy':
        slot.style.background = "linear-gradient(to right, #FFB6C1, #FF69B4)";
        break;
      case 'normal':
        slot.style.background = "linear-gradient(to left, #A9A9A9, #808080)";
        break;
      case 'fighting':
        slot.style.background = "linear-gradient(to right, #8B4513, #D2691E)";
        break;
      case 'flying':
        slot.style.background = "linear-gradient(to left, #87CEEB, #B0E0E6)";
        break;
      case 'poison':
        slot.style.background = "linear-gradient(to right, #9400D3, #8A2BE2)";
        break;
      case 'ground':
        slot.style.background = "linear-gradient(to left, #DAA520, #CD853F)";
        break;
      case 'rock':
        slot.style.background = "linear-gradient(to right, #BDB76B, #F4A460)";
        break;
      case 'bug':
        slot.style.background = "linear-gradient(to left, #556B2F, #6B8E23)";
        break;
      case 'ghost':
        slot.style.background = "linear-gradient(to right, #4B0082, #483D8B)";
        break;
      case 'steel':
        slot.style.background = "linear-gradient(to left, #C0C0C0, #B0C4DE)";
        break;
      default:
        slot.style.background = "linear-gradient(to right, #FFFFFF, #F5F5F5)";
        break;
    }





      slot.querySelector('.attack-content')!.innerHTML = ` ${moves}`;
      slot.querySelector('.pokename')!.innerHTML = ` ${pokemonName}`;
      slot.querySelector('.pokemonWeight')!.innerHTML = `${pokemonWeight}`;
      slot.querySelector('.pokemonHeight')!.innerHTML = `${pokemonHeight}`;
      slot.querySelector('.pokemonType')!.innerHTML = `${pokemonType}`;
      slot.querySelector('.pokemonHp')!.innerHTML = `${pokemonHp}`;
      slot.querySelector('.pokemonAttack')!.innerHTML = `${pokemonAttack}`;
      slot.querySelector('.pokemonDefense')!.innerHTML = `${pokemonDefense}`;
      slot.querySelector('.pokemonEspecialAttack')!.innerHTML = `${pokemonEspecialAttack}`;
      slot.querySelector('.pokemonEspecialDefense')!.innerHTML = `${pokemonEspecialDefense}`;
      slot.querySelector('.pokemonSpeed')!.innerHTML = `${pokemonSpeed}`;
      slot.querySelector('img')!.src = pokemonImg;
      slot.querySelector('img')!.alt = pokemonName;
      console.log("Elemento para o nome:", slot.querySelector('.pokename'));
      console.log("Elemento para o peso:", slot.querySelector('.pokemonWeight'))
      timeCompleto += 1;
      break;  // Saia do loop, pois você já preencheu um slot
    }
    }


    if (timeCompleto === 6) {
      if (navigator.vibrate) {
        navigator.vibrate(200);
      } else {
        tremor(document.body);
      }
    }  } catch (error) {
    console.error(error);
  }
}




 // Função para gerar um Pokémon aleatório
  // Função para gerar um Pokémon aleatório
  async function gerarPokemonAleatorio() {

    for (let slot of slots) {
      const randomIndex = Math.floor(Math.random() * 151) + 1;

        await escolherPokemon(randomIndex);
        break;

    }
  }
  // Função para gerar um time de Pokémon aleatório
  async function gerarTimeAleatorio() {
    for (let slot of slots) {


      await gerarPokemonAleatorio();
    }
  }





// Função para resetar os slots
function resetarTime() {
  for (let slot of slots) {
      slot.querySelector('span')!.innerText = '';
      slot.querySelector('img')!.src = '';
      slot.querySelector('img')!.alt = '';
      (slot.querySelector('.pokename') as HTMLDivElement).innerHTML = '';
      (slot.querySelector('.pokemonWeight') as HTMLDivElement).innerHTML = ``;
      (slot.querySelector('.pokemonHeight') as HTMLDivElement).innerHTML = ``;
      (slot.querySelector('.pokemonType') as HTMLDivElement).innerHTML = ``;
      (slot.querySelector('.pokemonHp') as HTMLDivElement).innerHTML = ``;
      (slot.querySelector('.pokemonAttack') as HTMLDivElement).innerHTML = ``;
      (slot.querySelector('.pokemonDefense') as HTMLDivElement).innerHTML = ``;
      (slot.querySelector('.pokemonEspecialAttack') as HTMLDivElement).innerHTML = ``;
      (slot.querySelector('.pokemonEspecialDefense') as HTMLDivElement).innerHTML = ``;
      (slot.querySelector('.pokemonSpeed') as HTMLDivElement).innerHTML = ``;
      (slot.querySelector('.pre-evolution') as HTMLDivElement).style.background = ``;


    }

}
 // Função para compartilhar o time de Pokémon usando a Web Share API
async function compartilharTime() {
  const twitterURL = `https://twitter.com/intent/tweet?text=Confira o meu time de Pokémon: ${time}`;
  window.open(twitterURL, '_blank');
  navigator.clipboard.writeText(`Confira o meu time de Pokémon: ${time}`).then(() => {
    alert('Texto copiado para a área de transferência. Cole em sua rede social favorita.');
  }).catch(err => {
    console.error('Não foi possível copiar o texto', err);
  });

}



/*
function filtrarPokemons() {
  const termo = filtro.value.toLowerCase();
  const options = listaPokemons.options;

  let encontrouPokemon = false;

  for (let i = 0; i < options.length; i++) {
    const pokemonName = options[i].innerText.toLowerCase();
    if (pokemonName.startsWith(termo)) {
      options[i].style.display = '';
      if (!encontrouPokemon) {
        listaPokemons.selectedIndex = i;
        encontrouPokemon = true;
      }
    } else {
      options[i].style.display = 'none';
    }
  }

  if (encontrouPokemon) {
    listaPokemons.style.display = 'block';
  } else {
    listaPokemons.style.display = 'none';
  }
}
*/
carregarListaDePokemons();

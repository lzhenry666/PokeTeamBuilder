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
    cardsHTML += `<div class="card">
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
          <h3 class="attack-title"> Fire Spin</h3>
          <p class="attack-content">Discard 2 Energy Card attached to Charizard in order to use this attack </p>
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






async function carregarListaDePokemons() {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151");
    const pokemons = response.data.results;

    for (let pokemon of pokemons) {
      const option = document.createElement("option");
      option.innerText = pokemon.name;
      listaPokemons.appendChild(option);

    }

    //listaPokemons.addEventListener("change", escolherPokemon);
    btnChoose.addEventListener("click", escolherPokemon);
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


async function escolherPokemon(event : Event) {
  event.preventDefault();

  let pokemonName = filtro.value;

  if (!pokemonName) {
    alert("Por favor, selecione um Pokémon.");
    return;
  }

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    console.log('r:',response);
    const pokemonImg = response.data.sprites.front_default;
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
    pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    for (let slot of slots) {

      if (!slot.querySelector('.pokename')!.innerHTML) {
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




// Função para resetar os slots
function resetarTime() {
  for (let slot of slots) {
      slot.querySelector('span')!.innerText = '';
      slot.querySelector('img')!.src = '';
      slot.querySelector('img')!.alt = '';
      slot.querySelector('.pokename')!.innerHTML = '';
      slot.querySelector('.pokemonWeight')!.innerHTML = ``;
      slot.querySelector('.pokemonHeight')!.innerHTML = ``;
      slot.querySelector('.pokemonType')!.innerHTML = ``;
      slot.querySelector('.pokemonHp')!.innerHTML = ``;
      slot.querySelector('.pokemonAttack')!.innerHTML = ``;
      slot.querySelector('.pokemonDefense')!.innerHTML = ``;
      slot.querySelector('.pokemonEspecialAttack')!.innerHTML = ``;
      slot.querySelector('.pokemonEspecialDefense')!.innerHTML = ``;
      slot.querySelector('.pokemonSpeed')!.innerHTML = ``;

    }

}
 // Função para compartilhar o time de Pokémon usando a Web Share API
async function compartilharTime() {
  const time = Array.from(slots).map(slot => slot.innerText).join(', ');

  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Meu Time de Pokémon',
        text: `Confira o meu time de Pokémon: ${time}`,
        url: window.location.href,
      });
      console.log('Time compartilhado com sucesso!');
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  } else {
    alert('Web Share API não é suportada neste navegador.');
  }
}
 // Função para gerar um Pokémon aleatório
  // Função para gerar um Pokémon aleatório
  async function gerarPokemonAleatorio() {
    const randomIndex = Math.floor(Math.random() * 151) + 1;
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomIndex}`);
      const pokemonName = response.data.name;
      const pokemonImg = response.data.sprites.front_default;
      var pokemonWeight = `${response.data.weight} Kg`;
       var pokemonHeight = `${response.data.height}0 Cm`;
    var pokemonType = "";
    for (var type in response.data["types"]) {
       pokemonType += `TYPE:${response.data["types"][type].type.name} `;
    }
   var  pokemonHp = `HP:${response.data["stats"][0]["base_stat"]}`;
   var  pokemonAttack = `ATK:${response.data["stats"][1]["base_stat"]}`;
   var  pokemonDefense = `DEF:${response.data["stats"][2]["base_stat"]}`;
   var  pokemonEspecialAttack = `ESP-ATK:${response.data["stats"][3]["base_stat"]}`;
   var  pokemonEspecialDefense = `ESP-DEF:${response.data["stats"][4]["base_stat"]}`;
    var pokemonSpeed = `SPEED:${response.data["stats"]["5"]["base_stat"]}`;
      let timeCompleto = true;
      for (let slot of slots) {
        if (slot.querySelector('.pokename')!.innerHTML  === '') {
          console.log("Elemento para o nome:", slot.querySelector('.pokename'));
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
        timeCompleto = false;
        break;  // Saia do loop, pois você já preencheu um slot
        }

      }


      if (timeCompleto) {
        if (navigator.vibrate) {
          navigator.vibrate(200);
        } else {
          tremor(document.body);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
  // Função para gerar um time de Pokémon aleatório
  async function gerarTimeAleatorio() {
    for (let slot of slots) {


      await gerarPokemonAleatorio();
    }
  }




// Função para fazer a tela tremer com um efeito CSS




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

const listaPokemons = document.getElementById("lista-pokemons") as HTMLSelectElement;
const slots = document.querySelectorAll(".slot") as NodeListOf<HTMLDivElement>;
const btnChoose = document.getElementById("choose") as HTMLButtonElement;
const btnCompartilhar = document.getElementById("compartilhar") as HTMLButtonElement;
const btnGerarAleatorio = document.getElementById("gerar-aleatorio") as HTMLButtonElement;
const btnGerarTimeAleatorio = document.getElementById("gerar-time-aleatorio") as HTMLButtonElement;
const filtro = document.getElementById("filtro") as HTMLInputElement;
const btnReset = document.getElementById("reset") as HTMLButtonElement;


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
    cardsHTML += `
      <div class="slot card">
        <span class="pokename"></span>
        <div class="card-front">
          <img src="" alt="" class="pokemon-img">
          <div class="infos"></div>
        </div>
        <div class="card-back">
        </div>
      </div>
    `;
  }

  // Insere o HTML gerado dentro do elemento 'card-container'
  cardContainer.innerHTML = cardsHTML;
}

// Chama a função para gerar os cards
gerarCards();

const pokemonImg = document.querySelectorAll('.pokemon-img') as NodeListOf<HTMLImageElement>;
// Quando nenhum Pokémon é selecionado
pokemonImg.forEach((img) => {
  img.classList.add('no-image');
});
















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
    console.log(response);
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
    pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    for (let slot of slots) {
      if (!slot.querySelector('.infos')!.innerHTML) {
        slot.querySelector('.pokename')!.innerHTML = ` ${pokemonName}`;
        slot.querySelector('.infos')!.innerHTML = `
        pokemonWeight: ${pokemonWeight}
        pokemonHeight: ${pokemonHeight}
          pokemonType: ${pokemonType}
          pokemonHp: ${pokemonHp}
          pokemonAttack: ${pokemonAttack}
          pokemonDefense: ${pokemonDefense}
          pokemonEspecialAttack: ${pokemonEspecialAttack}
          pokemonEspecialDefense: ${pokemonEspecialDefense}
          pokemonSpeed: ${pokemonSpeed}
                    `
        slot.querySelector('img')!.src = pokemonImg;
        slot.querySelector('img')!.alt = pokemonName;
        timeCompleto = false;
        break;
      }
    }

    if (timeCompleto) {
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
  let temPokemon = false;
  for (let slot of slots) {
    if (slot.innerHTML) {
      temPokemon = true;
      slot.querySelector('span')!.innerText = '';
      slot.querySelector('img')!.src = '';
      slot.querySelector('img')!.alt = '';
    }
  }

  if (!temPokemon) {
    alert("Nenhum Pokémon foi gerado ainda.");
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
        if (!slot.querySelector('.infos')!.innerHTML) {
          slot.querySelector('.pokename')!.innerHTML = ` ${pokemonName}`;

          slot.querySelector('.infos')!.innerHTML = `
         <p> pokemonWeight: ${pokemonWeight}
          pokemonHeight: ${pokemonHeight}
            pokemonType: ${pokemonType}
            pokemonHp: ${pokemonHp}
            pokemonAttack: ${pokemonAttack}
            pokemonDefense: ${pokemonDefense}
            pokemonEspecialAttack: ${pokemonEspecialAttack}
            pokemonEspecialDefense: ${pokemonEspecialDefense}
            pokemonSpeed: ${pokemonSpeed}`;
          slot.querySelector('img')!.src = pokemonImg;
          slot.querySelector('img')!.alt = pokemonName;
          timeCompleto = false;
          break;
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
      slot.querySelector('.infos')!.innerHTML = '';
      slot.querySelector('img')!.src = '';
      slot.querySelector('img')!.alt = '' ;    }

    for (let i = 0; i < 6; i++) {
      await gerarPokemonAleatorio();
    }
  }

carregarListaDePokemons();


// Função para fazer a tela tremer com um efeito CSS
function tremor(element: HTMLElement) {
  element.classList.add("tremer");
  setTimeout(() => {
    element.classList.remove("tremer");
  }, 820);
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

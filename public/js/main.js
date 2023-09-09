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
function gerarCards() {
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
          <img src="../../pokebolaa.gif" alt="" class="pokemon-img">
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
gerarCards();
const listaPokemons = document.getElementById("lista-pokemons");
const slots = document.querySelectorAll(".slot");
const btnChoose = document.getElementById("choose");
const btnCompartilhar = document.getElementById("compartilhar");
const btnGerarAleatorio = document.getElementById("gerar-aleatorio");
const btnGerarTimeAleatorio = document.getElementById("gerar-time-aleatorio");
const filtro = document.getElementById("filtro");
const btnReset = document.getElementById("reset");
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
            //listaPokemons.addEventListener("change", escolherPokemon);
            btnChoose.addEventListener("click", escolherPokemon);
            btnCompartilhar.addEventListener("click", compartilharTime);
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
function escolherPokemon(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        let pokemonName = filtro.value;
        if (!pokemonName) {
            alert("Por favor, selecione um Pokémon.");
            return;
        }
        try {
            const response = yield axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            console.log(response);
            const pokemonImg = response.data.sprites.front_default;
            var pokemonWeight = `${response.data.weight} Kg`;
            var pokemonHeight = `${response.data.height}0 Cm`;
            var pokemonType = "";
            for (var type in response.data["types"]) {
                pokemonType += `TYPE:${response.data["types"][type].type.name} `;
            }
            var pokemonHp = `HP:${response.data["stats"][0]["base_stat"]}`;
            var pokemonAttack = `ATK:${response.data["stats"][1]["base_stat"]}`;
            var pokemonDefense = `DEF:${response.data["stats"][2]["base_stat"]}`;
            var pokemonEspecialAttack = `ESP-ATK:${response.data["stats"][3]["base_stat"]}`;
            var pokemonEspecialDefense = `ESP-DEF:${response.data["stats"][4]["base_stat"]}`;
            var pokemonSpeed = `SPEED:${response.data["stats"]["5"]["base_stat"]}`;
            let timeCompleto = true;
            pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
            for (let slot of slots) {
                if (!slot.querySelector('.infos').innerHTML) {
                    slot.querySelector('.pokename').innerHTML = ` ${pokemonName}`;
                    slot.querySelector('.infos').innerHTML = `
        pokemonWeight: ${pokemonWeight}
        pokemonHeight: ${pokemonHeight}
          pokemonType: ${pokemonType}
          pokemonHp: ${pokemonHp}
          pokemonAttack: ${pokemonAttack}
          pokemonDefense: ${pokemonDefense}
          pokemonEspecialAttack: ${pokemonEspecialAttack}
          pokemonEspecialDefense: ${pokemonEspecialDefense}
          pokemonSpeed: ${pokemonSpeed}
                    `;
                    slot.querySelector('img').src = pokemonImg;
                    slot.querySelector('img').alt = pokemonName;
                    timeCompleto = false;
                    break;
                }
            }
            if (timeCompleto) {
                if (navigator.vibrate) {
                    navigator.vibrate(200);
                }
                else {
                    tremor(document.body);
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
// Função para resetar os slots
function resetarTime() {
    let temPokemon = false;
    for (let slot of slots) {
        if (slot.innerHTML) {
            temPokemon = true;
            slot.querySelector('span').innerText = '';
            slot.querySelector('img').src = '';
            slot.querySelector('img').alt = '';
        }
    }
    if (!temPokemon) {
        alert("Nenhum Pokémon foi gerado ainda.");
    }
}
// Função para compartilhar o time de Pokémon usando a Web Share API
function compartilharTime() {
    return __awaiter(this, void 0, void 0, function* () {
        const time = Array.from(slots).map(slot => slot.innerText).join(', ');
        if (navigator.share) {
            try {
                yield navigator.share({
                    title: 'Meu Time de Pokémon',
                    text: `Confira o meu time de Pokémon: ${time}`,
                    url: window.location.href,
                });
                console.log('Time compartilhado com sucesso!');
            }
            catch (error) {
                console.error('Erro ao compartilhar:', error);
            }
        }
        else {
            alert('Web Share API não é suportada neste navegador.');
        }
    });
}
// Função para gerar um Pokémon aleatório
// Função para gerar um Pokémon aleatório
function gerarPokemonAleatorio() {
    return __awaiter(this, void 0, void 0, function* () {
        const randomIndex = Math.floor(Math.random() * 151) + 1;
        try {
            const response = yield axios.get(`https://pokeapi.co/api/v2/pokemon/${randomIndex}`);
            const pokemonName = response.data.name;
            const pokemonImg = response.data.sprites.front_default;
            var pokemonWeight = `${response.data.weight} Kg`;
            var pokemonHeight = `${response.data.height}0 Cm`;
            var pokemonType = "";
            for (var type in response.data["types"]) {
                pokemonType += `TYPE:${response.data["types"][type].type.name} `;
            }
            var pokemonHp = `HP:${response.data["stats"][0]["base_stat"]}`;
            var pokemonAttack = `ATK:${response.data["stats"][1]["base_stat"]}`;
            var pokemonDefense = `DEF:${response.data["stats"][2]["base_stat"]}`;
            var pokemonEspecialAttack = `ESP-ATK:${response.data["stats"][3]["base_stat"]}`;
            var pokemonEspecialDefense = `ESP-DEF:${response.data["stats"][4]["base_stat"]}`;
            var pokemonSpeed = `SPEED:${response.data["stats"]["5"]["base_stat"]}`;
            let timeCompleto = true;
            for (let slot of slots) {
                if (!slot.querySelector('.infos').innerHTML) {
                    slot.querySelector('.pokename').innerHTML = ` ${pokemonName}`;
                    slot.querySelector('.infos').innerHTML = `
          <ul>
            <li>Peso: ${pokemonWeight}</li>
            <li>Altura: ${pokemonHeight}</li>
            <li>Tipo: ${pokemonType}</li>
            <li>HP: ${pokemonHp}</li>
            <li>Ataque: ${pokemonAttack}</li>
            <li>Defesa: ${pokemonDefense}</li>
            <li>Ataque Especial: ${pokemonEspecialAttack}</li>
            <li>Defesa Especial: ${pokemonEspecialDefense}</li>
            <li>Velocidade: ${pokemonSpeed}</li>
          </ul>`;
                    slot.querySelector('img').src = pokemonImg;
                    slot.querySelector('img').alt = pokemonName;
                    timeCompleto = false;
                    break;
                }
            }
            if (timeCompleto) {
                if (navigator.vibrate) {
                    navigator.vibrate(200);
                }
                else {
                    tremor(document.body);
                }
            }
        }
        catch (error) {
            console.error(error);
        }
    });
}
// Função para gerar um time de Pokémon aleatório
function gerarTimeAleatorio() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let slot of slots) {
            slot.querySelector('.infos').innerHTML = '';
            slot.querySelector('img').src = '';
            slot.querySelector('img').alt = '';
        }
        for (let i = 0; i < 6; i++) {
            yield gerarPokemonAleatorio();
        }
    });
}
// Função para fazer a tela tremer com um efeito CSS
function tremor(element) {
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
carregarListaDePokemons();

const searchBtn = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

const pokemonName = document.getElementById('pokemon-name');
const pokemonID = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const spriteContainer = document.getElementById('sprite-container');
const typesContainer = document.getElementById('types');
const pokemonCard = document.getElementById('pokemon-card');

const typesGradient = {
  normal: "linear-gradient(135deg, #A8A878, #D8D8C0)",
  fire: "linear-gradient(135deg, #FFCC00, #FF5733)",
  fighting: "linear-gradient(135deg, #C03028, #F08030)",
  water: "linear-gradient(135deg, #33A1FF, #ADD8E6)",
  flying: "linear-gradient(135deg, #A890F0, #C8C8F0)",
  grass: "linear-gradient(135deg, #77DD77, #228B22)",
  poison: "linear-gradient(135deg, #A040A0, #D678D6)",
  electric: "linear-gradient(135deg, #FFFF33, #FFAA00)",
  ground: "linear-gradient(135deg, #E0C068, #C0A860)",
  psychic: "linear-gradient(135deg, #FF77FF, #880088)",
  rock: "linear-gradient(135deg, #B8A038, #D8B860)",
  ice: "linear-gradient(135deg, #ADD8E6, #77CCDD)",
  bug: "linear-gradient(135deg, #A8B820, #C0D830)",
  dragon: "linear-gradient(135deg, #7038F8, #B97FC9)",
  ghost: "linear-gradient(135deg, #705898, #A890C8)",
  dark: "linear-gradient(135deg, #4F4F4F, #000000)",
  steel: "linear-gradient(135deg, #B8B8D0, #D8D8E0)",
  fairy: "linear-gradient(135deg, #FFC0CB, #FF69B4)",
}

const findStat = (data, statName) => {
  const foundStat = data.stats.find(item =>item.stat.name === statName);
  return foundStat ? foundStat.base_stat : null;
}

const displayData = (data) => {
  pokemonName.innerText = data.name.toUpperCase();
  pokemonID.innerText = data.id;
  weight.innerText = data.weight;
  height.innerText = data.height;
  pokemonCard.style.background = typesGradient[data.types[0].type.name];

  hp.innerText = findStat(data, 'hp');
  attack.innerText = findStat(data, 'attack');
  defense.innerText = findStat(data, 'defense');
  specialAttack.innerText = findStat(data, 'special-attack');
  specialDefense.innerText = findStat(data, 'special-defense');
  speed.innerText = findStat(data, 'speed');
  spriteContainer.innerHTML = `<img id="sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png">`;
  typesContainer.innerHTML = `<p style="background: ${typesGradient[data.types[0].type.name]}">${data.types[0].type.name.toUpperCase()}</p>`
  if (data.types.length > 1) {
    typesContainer.innerHTML += `<p style="background: ${typesGradient[data.types[1].type.name]}">${data.types[1].type.name.toUpperCase()}</p>`
  }
}

const fetchData = async (nameOrId) => {
  try {
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`);
    const data = await res.json();
    displayData(data);
  } catch (err) {
    console.log(err);
    if (err instanceof SyntaxError) {
      alert('Pokémon not found');
    }
  }
};

searchBtn.addEventListener('click', () => {
  const search = searchInput.value.toLowerCase();
  fetchData(search);
});
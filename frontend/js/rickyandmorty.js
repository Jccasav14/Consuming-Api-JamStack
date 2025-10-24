const container = document.getElementById("characters-container");

async function loadCharacters() {
  try {
    const res = await fetch("https://rickandmortyapi.com/api/character");
    const data = await res.json();
    const characters = data.results;

    characters.forEach(char => {
      const card = document.createElement("div");
      card.classList.add("character-card");

      card.innerHTML = `
        <img src="${char.image}" alt="${char.name}">
        <div class="character-info">
          <h3>${char.name}</h3>
          <p class="short">Especie: ${char.species}</p>
          <p class="long">Estado: ${char.status} | Género: ${char.gender} | Ubicación: ${char.location.name}</p>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = "<p>Error al cargar los personajes</p>";
  }
}

loadCharacters();

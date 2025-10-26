document.getElementById("loadApi").addEventListener("click", async () => {
  const url = document.getElementById("apiUrl").value.trim();
  const container = document.getElementById("characters-container");
  const message = document.getElementById("message");

  container.innerHTML = "";
  message.textContent = "";

  if (!url) {
    message.textContent = "Por favor, ingresa una URL de API.";
    return;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();


    const items = Array.isArray(data) ? data : data.results || [data];

    items.forEach((item) => {
      const image =
        item.image || item.urlToImage || item.thumbnail || "https://via.placeholder.com/250";
      const name = item.name || item.title || "Sin título";


      const shortDesc =
        item.species ||
        item.status ||
        item.type ||
        item.category ||
        "Sin descripción corta";


      let longDesc = "";

      if (item.status || item.gender || item.origin?.name) {
        longDesc = `Este personaje está ${
          item.status?.toLowerCase() || "sin estado conocido"
        }, pertenece a la especie ${item.species || "desconocida"} y proviene de ${
          item.origin?.name || "un lugar desconocido"
        }.`;
      } else {
        longDesc =
          item.description ||
          item.summary ||
          "No se encontró una descripción detallada.";
      }


      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${image}" alt="${name}">
        <div class="short-desc">${name} - ${shortDesc}</div>
        <div class="long-desc">${longDesc}</div>
      `;
      container.appendChild(card);
    });
  } catch (err) {
    message.textContent = "Error al cargar la API o formato no compatible.";
  }
});

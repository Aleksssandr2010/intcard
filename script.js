const people = [
  {
    name: "Иван Бунин",
    place: "Воронеж",
    coords: [51.6615, 39.2003],
    years: "1870–1953",
    field: "писатель, поэт",
    fact: "Первый русский лауреат Нобелевской премии по литературе (1933).",
  },
  {
    name: "Андрей Платонов",
    place: "Воронеж",
    coords: [51.6631, 39.1784],
    years: "1899–1951",
    field: "писатель, философ",
    fact: "Автор романов «Чевенгур» и «Котлован».",
  },
  {
    name: "Самуил Маршак",
    place: "Воронеж",
    coords: [51.672, 39.1919],
    years: "1887–1964",
    field: "поэт, переводчик",
    fact: "Создал популярные детские стихи и переводы Шекспира.",
  },
  {
    name: "Сергей Мосин",
    place: "село Рамонь",
    coords: [51.9187, 39.3368],
    years: "1849–1902",
    field: "конструктор, инженер",
    fact: "Создатель легендарной трёхлинейной винтовки.",
  },
  {
    name: "Николай Ге",
    place: "Воронеж",
    coords: [51.6652, 39.2105],
    years: "1831–1894",
    field: "художник",
    fact: "Известен историческими и религиозными полотнами.",
  },
];

const map = L.map("map", {
  zoomControl: false,
}).setView([51.75, 39.4], 8);

L.control.zoom({ position: "bottomright" }).addTo(map);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap",
}).addTo(map);

const oblastOutline = [
  [52.1, 38.3],
  [52.3, 38.9],
  [52.25, 39.7],
  [51.95, 40.4],
  [51.5, 40.8],
  [51.0, 40.2],
  [50.8, 39.2],
  [51.1, 38.4],
];

L.polygon(oblastOutline, {
  color: "#3a6ff8",
  fillColor: "#3a6ff8",
  fillOpacity: 0.08,
  weight: 2,
  dashArray: "6 6",
}).addTo(map);

const infoPanel = document.getElementById("infoPanel");
const infoContent = document.getElementById("infoContent");
const closePanel = document.getElementById("closePanel");

function openPanel(person) {
  infoContent.innerHTML = `
    <div class="info-card">
      <span class="tag">${person.place}</span>
      <div>
        <strong>${person.name}</strong>
        <p>${person.field}</p>
      </div>
      <p>${person.fact}</p>
      <div class="info-meta">
        <span><span>Годы жизни</span><span>${person.years}</span></span>
        <span><span>Место рождения</span><span>${person.place}</span></span>
      </div>
    </div>
  `;
  infoPanel.classList.add("open");
}

people.forEach((person) => {
  const marker = L.circleMarker(person.coords, {
    radius: 8,
    color: "#3a6ff8",
    fillColor: "#3a6ff8",
    fillOpacity: 0.9,
    weight: 2,
  }).addTo(map);

  marker.on("click", () => openPanel(person));
});

closePanel.addEventListener("click", () => {
  infoPanel.classList.remove("open");
});

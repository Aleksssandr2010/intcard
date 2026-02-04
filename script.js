const people = [
  {
    id: "bunin",
    name: "Иван Бунин",
    years: "1870–1953",
    city: "Воронеж",
    field: "Литература",
    description:
      "Первый русский лауреат Нобелевской премии по литературе. Воронеж вдохновлял его ранние произведения.",
    place: "Родился в Воронеже, в старинной дворянской семье.",
    coords: [51.672, 39.1843],
  },
  {
    id: "marshak",
    name: "Самуил Маршак",
    years: "1887–1964",
    city: "Воронеж",
    field: "Поэзия",
    description:
      "Поэт, переводчик и детский писатель. Воронежский период связан с его первыми публикациями.",
    place: "Родился в Воронеже, здесь учился и делал первые шаги в литературе.",
    coords: [51.6735, 39.19],
  },
  {
    id: "platonov",
    name: "Андрей Платонов",
    years: "1899–1951",
    city: "Воронеж",
    field: "Проза",
    description:
      "Один из крупнейших русских писателей XX века, автор философских и социально острых произведений.",
    place: "Родился в Воронеже в семье железнодорожника.",
    coords: [51.668, 39.175],
  },
  {
    id: "feoktistov",
    name: "Константин Феоктистов",
    years: "1926–2009",
    city: "Воронеж",
    field: "Космонавтика",
    description:
      "Инженер, участник полета «Восход-1», один из ключевых разработчиков кораблей «Восток».",
    place: "Родился в Воронеже, здесь же получил первые инженерные знания.",
    coords: [51.66, 39.2],
  },
  {
    id: "venevitinov",
    name: "Дмитрий Веневитинов",
    years: "1805–1827",
    city: "Новоживотинное",
    field: "Поэзия",
    description:
      "Поэт-романтик и мыслитель. В селе Новоживотинное находится усадьба Веневитиновых.",
    place: "Родился в усадьбе Новоживотинное, ныне музей-усадьба.",
    coords: [51.6119, 39.1665],
  },
  {
    id: "kramskoy",
    name: "Иван Крамской",
    years: "1837–1887",
    city: "Острогожск",
    field: "Живопись",
    description:
      "Художник и лидер передвижников. Его портреты стали классикой русского реализма.",
    place: "Родился в Острогожске — южном культурном центре области.",
    coords: [50.867, 39.0732],
  },
];

const map = L.map("map", {
  zoomControl: false,
  scrollWheelZoom: true,
}).setView([51.4, 39.2], 8);

L.control.zoom({ position: "bottomright" }).addTo(map);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 13,
  attribution: "&copy; OpenStreetMap",
}).addTo(map);

const panel = document.querySelector(".info-panel");
const closeButton = document.querySelector(".close-panel");

const updatePanel = (person) => {
  document.getElementById("person-name").textContent = person.name;
  document.getElementById("person-years").textContent = person.years;
  document.getElementById("person-place").textContent = person.place;
  document.getElementById("person-description").textContent = person.description;
  document.getElementById("person-city").textContent = person.city;
  document.getElementById("person-field").textContent = person.field;
  panel.classList.add("active");
  closeButton.classList.add("active");
};

const listContainer = document.getElementById("person-list");

people.forEach((person) => {
  const marker = L.marker(person.coords, {
    title: person.name,
  }).addTo(map);

  marker.on("click", () => {
    updatePanel(person);
  });

  marker.bindPopup(`<strong>${person.name}</strong><br/>${person.city}`);

  const item = document.createElement("article");
  item.className = "person-item";
  item.innerHTML = `
    <strong>${person.name}</strong>
    <span>${person.years}</span>
    <span>${person.city} · ${person.field}</span>
    <button type="button">Показать на карте</button>
  `;
  item.querySelector("button").addEventListener("click", () => {
    map.setView(person.coords, 10, { animate: true });
    updatePanel(person);
  });
  listContainer.appendChild(item);
});

const closePanel = () => {
  panel.classList.remove("active");
  closeButton.classList.remove("active");
};

closeButton.addEventListener("click", closePanel);

map.on("click", closePanel);

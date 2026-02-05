const people = [
  {
    name: "Иван Бунин",
    place: "Воронеж",
    coords: [39.2003, 51.6615],
    years: "1870–1953",
    field: "писатель, поэт",
    fact: "Первый русский лауреат Нобелевской премии по литературе (1933).",
    description:
      "Родился в Воронеже в дворянской семье. Его проза тонко передает атмосферу юга России, чувство времени и трагическую красоту уходящей эпохи. Бунин уделял внимание точному слову и музыкальности фразы.",
    highlights: [
      "Нобелевская премия по литературе (1933)",
      "Сборник «Тёмные аллеи»",
      "Эмиграция во Францию и активная литературная жизнь",
    ],
  },
  {
    name: "Андрей Платонов",
    place: "Воронеж",
    coords: [39.1784, 51.6631],
    years: "1899–1951",
    field: "писатель, философ",
    fact: "Автор романов «Чевенгур» и «Котлован».",
    description:
      "Сын железнодорожника, начинал как инженер-мелиоратор, что отразилось в его языке и образах. В его прозе соседствуют утопические мечты и тревожная правда о человеке и обществе.",
    highlights: [
      "Повести «Котлован» и «Ювенильное море»",
      "Особый «платоновский» стиль",
      "Тема человека и мечты о справедливости",
    ],
  },
  {
    name: "Самуил Маршак",
    place: "Воронеж",
    coords: [39.1919, 51.672],
    years: "1887–1964",
    field: "поэт, переводчик",
    fact: "Создал популярные детские стихи и переводы Шекспира.",
    description:
      "Родился в Воронеже, стал одним из главных авторов советской детской литературы. Его переводы отличались точностью и сценической легкостью, а стихи — теплой ироничностью.",
    highlights: [
      "Классические детские стихи и пьесы",
      "Переводы сонетов Шекспира",
      "Работа редактором «Детгиза»",
    ],
  },
  {
    name: "Сергей Мосин",
    place: "село Рамонь",
    coords: [39.3368, 51.9187],
    years: "1849–1902",
    field: "конструктор, инженер",
    fact: "Создатель легендарной трёхлинейной винтовки.",
    description:
      "Инженер-оружейник, который прославился разработкой винтовки образца 1891 года. Его подход сочетал технологичность, надежность и удобство эксплуатации.",
    highlights: [
      "Винтовка Мосина (образец 1891 года)",
      "Служба в артиллерийских мастерских",
      "Вклад в стандартизацию вооружения",
    ],
  },
  {
    name: "Николай Ге",
    place: "Воронеж",
    coords: [39.2105, 51.6652],
    years: "1831–1894",
    field: "художник",
    fact: "Известен историческими и религиозными полотнами.",
    description:
      "Художник-передвижник, который стремился к духовной глубине в исторических сюжетах. Его полотна отличает драматизм, психологическая напряженность и строгая композиция.",
    highlights: [
      "Картины «Пётр I допрашивает царевича Алексея»",
      "Участник Товарищества передвижных выставок",
      "Интерес к религиозным сюжетам",
    ],
  },
];

const rasterStyle = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
  },
  layers: [
    {
      id: "osm-base",
      type: "raster",
      source: "osm",
    },
  ],
};

const map = new maplibregl.Map({
  container: "map",
  style: rasterStyle,
  center: [99, 60],
  zoom: 3.6,
  minZoom: 3,
  maxZoom: 10,
  maxBounds: [
    [19, 41],
    [170, 82],
  ],
  attributionControl: true,
});

map.addControl(
  new maplibregl.NavigationControl({ showCompass: false }),
  "bottom-right"
);

const oblastOutline = [
  [38.3, 52.1],
  [38.9, 52.3],
  [39.7, 52.25],
  [40.4, 51.95],
  [40.8, 51.5],
  [40.2, 51.0],
  [39.2, 50.8],
  [38.4, 51.1],
  [38.3, 52.1],
];

const oblastFeature = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [oblastOutline],
  },
};

const maskFeature = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-180, -90],
        [180, -90],
        [180, 90],
        [-180, 90],
        [-180, -90],
      ],
      [...oblastOutline].reverse(),
    ],
  },
};

map.on("load", () => {
  map.addSource("oblast", {
    type: "geojson",
    data: oblastFeature,
  });

  map.addSource("mask", {
    type: "geojson",
    data: maskFeature,
  });

  map.addLayer({
    id: "mask-layer",
    type: "fill",
    source: "mask",
    paint: {
      "fill-color": "#6e7686",
      "fill-opacity": 0.6,
    },
  });

  map.addLayer({
    id: "oblast-fill",
    type: "fill",
    source: "oblast",
    paint: {
      "fill-color": "#3a6ff8",
      "fill-opacity": 0.22,
    },
  });

  map.addLayer({
    id: "oblast-outline",
    type: "line",
    source: "oblast",
    paint: {
      "line-color": "#2a54bf",
      "line-width": 2,
    },
  });
});

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
      <p>${person.description}</p>
      <p class="info-fact">${person.fact}</p>
      <ul class="info-list">
        ${person.highlights.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <div class="info-meta">
        <span><span>Годы жизни</span><span>${person.years}</span></span>
        <span><span>Место рождения</span><span>${person.place}</span></span>
      </div>
    </div>
  `;
  infoPanel.classList.add("open");
}

people.forEach((person) => {
  const markerEl = document.createElement("button");
  markerEl.className = "marker";
  markerEl.setAttribute("type", "button");
  markerEl.setAttribute("aria-label", person.name);
  markerEl.addEventListener("click", () => openPanel(person));

  new maplibregl.Marker({ element: markerEl })
    .setLngLat(person.coords)
    .addTo(map);
});

closePanel.addEventListener("click", () => {
  infoPanel.classList.remove("open");
});

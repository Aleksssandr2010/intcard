const people = [
  {
    name: "Иван Бунин",
    place: "Воронеж",
    coords: [51.6615, 39.2003],
    years: "1870–1953",
    field: "писатель, поэт",
    fact: "Первый русский лауреат Нобелевской премии по литературе (1933).",
    description:
      "Родился в Воронеже в дворянской семье. Его проза тонко передает атмосферу юга России, чувство времени и трагическую красоту уходящей эпохи. Бунин уделял внимание точному слову и музыкальности фразы.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/7d/Ivan_Bunin_1910s.jpg",
    highlights: [
      "Нобелевская премия по литературе (1933)",
      "Сборник «Тёмные аллеи»",
      "Эмиграция во Францию и активная литературная жизнь",
    ],
  },
  {
    name: "Андрей Платонов",
    place: "Воронеж",
    coords: [51.6631, 39.1784],
    years: "1899–1951",
    field: "писатель, философ",
    fact: "Автор романов «Чевенгур» и «Котлован».",
    description:
      "Сын железнодорожника, начинал как инженер-мелиоратор, что отразилось в его языке и образах. В его прозе соседствуют утопические мечты и тревожная правда о человеке и обществе.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/9f/Andrei_Platonov_1930s.jpg",
    highlights: [
      "Повести «Котлован» и «Ювенильное море»",
      "Особый «платоновский» стиль",
      "Тема человека и мечты о справедливости",
    ],
  },
  {
    name: "Самуил Маршак",
    place: "Воронеж",
    coords: [51.672, 39.1919],
    years: "1887–1964",
    field: "поэт, переводчик",
    fact: "Создал популярные детские стихи и переводы Шекспира.",
    description:
      "Родился в Воронеже, стал одним из главных авторов советской детской литературы. Его переводы отличались точностью и сценической легкостью, а стихи — теплой ироничностью.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0a/Samuil_Marshak_1954.jpg",
    highlights: [
      "Классические детские стихи и пьесы",
      "Переводы сонетов Шекспира",
      "Работа редактором «Детгиза»",
    ],
  },
  {
    name: "Сергей Мосин",
    place: "село Рамонь",
    coords: [51.9187, 39.3368],
    years: "1849–1902",
    field: "конструктор, инженер",
    fact: "Создатель легендарной трёхлинейной винтовки.",
    description:
      "Инженер-оружейник, который прославился разработкой винтовки образца 1891 года. Его подход сочетал технологичность, надежность и удобство эксплуатации.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/2c/Sergey_Mosin_1890s.jpg",
    highlights: [
      "Винтовка Мосина (образец 1891 года)",
      "Служба в артиллерийских мастерских",
      "Вклад в стандартизацию вооружения",
    ],
  },
  {
    name: "Николай Ге",
    place: "Воронеж",
    coords: [51.6652, 39.2105],
    years: "1831–1894",
    field: "художник",
    fact: "Известен историческими и религиозными полотнами.",
    description:
      "Художник-передвижник, который стремился к духовной глубине в исторических сюжетах. Его полотна отличает драматизм, психологическая напряженность и строгая композиция.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/61/Nikolai_Ge_1880s.jpg",
    highlights: [
      "Картины «Пётр I допрашивает царевича Алексея»",
      "Участник Товарищества передвижных выставок",
      "Интерес к религиозным сюжетам",
    ],
  },
];

const map = L.map("map", {
  zoomControl: false,
}).setView([51.75, 39.4], 8);

L.control.zoom({ position: "bottomright" }).addTo(map);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution:
    '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/">CARTO</a>',
  subdomains: "abcd",
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
      <div class="info-header">
        <img src="${person.image}" alt="${person.name}" loading="lazy" />
        <div>
          <strong>${person.name}</strong>
          <p>${person.field}</p>
        </div>
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

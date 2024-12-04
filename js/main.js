const productsContainer = document.getElementById("products__container");
const cardsContainer = document.getElementById("cards__container");

const API_URL = "https://brandstestowy.smallhost.pl/api/random";

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.3,
};

const observer = new IntersectionObserver(observerCallback, options);
observer.observe(productsContainer);

let data;

let pageNumber = 1;
let pageSize = 25;

function renderData(data) {
  data.forEach((item) => {
    const view = document.createElement("div");
    view.textContent = item.text;
    function logMe() {
      console.log(item.text);
    }
    view.addEventListener("click", logMe);
    cardsContainer.appendChild(view);
  });
}

async function fetchData(pageNumber, pageSize) {
  const response = await fetch(
    `${API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );
  const json = await response.json();
  data = json.data;
  renderData(data);
}

function observerCallback(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (data) return;
      fetchData();
    }
  });
}

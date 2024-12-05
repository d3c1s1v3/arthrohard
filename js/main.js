const API_URL = "https://brandstestowy.smallhost.pl/api/random";

const productsContainer = document.getElementById("products__container");
const cardsContainer = document.getElementById("cards__container");
const navLinks = document.getElementsByClassName("link");
// const productFeatures = document.getElementById("product-features");
// const ingredients = document.getElementById("ingredients");
// const products = document.getElementById("products__container");
const threshold = document.getElementById("threshold");
const paginationAmount = document.getElementById("pagination-amount");

console.log(paginationAmount.value);

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 1,
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(productsContainer);
// observer.observe(productFeatures);
// observer.observe(ingredients);
// observer.observe(products);
observer.observe(threshold);

let data;

let pageNumber = 1;
let pageSize = paginationAmount.value;

function renderData() {
  data?.forEach(({ text, id }) => {
    const view = document.createElement("div");
    view.textContent = `${text}: ${id}`;
    function logMe() {
      console.log(text);
    }
    view.addEventListener("click", logMe);
    cardsContainer.appendChild(view);
  });
}

async function fetchData(pageNumber, pageSize) {
  try {
    const response = await fetch(
      `${API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    const json = await response.json();
    data = json.data;
  } catch (error) {
    console.log(error);
  }
}

function observerCallback([{ isIntersecting }]) {
  if (isIntersecting && !data) {
    fetchData(pageNumber, pageSize).then(() => renderData(data));
  } else {
    fetchData(pageNumber, pageSize).then(() => renderData(data));
  }
}

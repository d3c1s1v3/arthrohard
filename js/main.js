const API_URL = "https://brandstestowy.smallhost.pl/api/random";

const links = document.getElementsByClassName("link");
const products = document.getElementById("products");
const productFeaturesSection = document.getElementById("product-features");
const ingredientsSection = document.getElementById("ingredients");
const productCardsContainer = document.getElementById(
  "product--cards__container"
);
const threshold = document.getElementById("threshold");
let itemsAmount = document.querySelector(".items-amount");
const productDetails = document.getElementById("product__details");
const productId = document.getElementById("product__id");
const productName = document.getElementById("product__name");
const closePopupBtn = document.getElementById("close__popup__btn");
const bigDogImg = document.getElementsByClassName("big-dog")[0];
const pagination = document.getElementById("pagination");
const hambugrer = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hambugrer.addEventListener("click", toggleMobileMenu);

const fetchDataObserver = new IntersectionObserver(fetchDataObserverCallback);
const fetchMoreDataObserver = new IntersectionObserver(
  fetchMoreDataObserverCallback
);

fetchDataObserver.observe(products);
fetchMoreDataObserver.observe(threshold);

let data;

let pageNumber = 1;
let pageSize = 25;

function renderData() {
  data?.forEach(({ text, id }) => {
    const view = document.createElement("div");
    view.innerHTML = `
    <h3 class="product__card">ID: ${id}</h3>
    `;
    function togglePopup() {
      productId.textContent = `ID: ${id}`;
      productName.textContent = `Nazwa: ${text}`;
      productDetails.classList.add("show");
    }
    view.addEventListener("click", togglePopup);
    closePopupBtn.addEventListener("click", () =>
      productDetails.classList.remove("show")
    );
    productCardsContainer.appendChild(view);
  });
}

async function fetchData(pageNumber, pageSize) {
  try {
    const response = await fetch(
      `${API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
    const json = await response.json();
    data = json.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

function fetchDataObserverCallback([{ isIntersecting }]) {
  if (!data && isIntersecting)
    fetchData(pageNumber, pageSize).then(() => renderData(data));
}

function fetchMoreDataObserverCallback([{ isIntersecting }]) {
  if (isIntersecting)
    fetchData(pageNumber, pageSize).then(() => renderData(data));
  pageNumber++;
}

window.onscroll = () => {
  const height = 2954;
  if (window.scrollY >= height) bigDogImg.style.transform = "translateY(0)";
};

function toggleMobileMenu() {
  mobileMenu.classList.toggle("show");
}

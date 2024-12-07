const API_URL = "https://brandstestowy.smallhost.pl/api/random";

const productsContainer = document.getElementById("products__container");
const cardsContainer = document.getElementById("cards__container");
const navLinks = document.getElementsByClassName("link");
const threshold = document.getElementById("threshold");
const paginationAmount = document.getElementById("pagination-amount");
const productDetails = document.getElementById("product__details");
const closePopupBtn = document.getElementById("close__popup__btn");
const productId = document.getElementById("product__id");
const productText = document.getElementById("product__text");

const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 1,
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(productsContainer);
observer.observe(threshold);

let data;

let pageNumber = 1;
let pageSize = paginationAmount.value;

function renderData() {
  data?.forEach(({ text, id }) => {
    const view = document.createElement("div");
    view.innerHTML = `
    <h3>ID: ${id}</h3>
    `;

    function toggleMe() {
      productId.textContent = `ID: ${id}`;
      productText.textContent = `${text}`;
      productDetails.classList.add("show");
    }

    view.addEventListener("click", toggleMe);
    closePopupBtn.addEventListener("click", () =>
      productDetails.classList.remove("show")
    );
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
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

function observerCallback([{ isIntersecting }]) {
  if (isIntersecting)
    fetchData(pageNumber, pageSize).then(() => renderData(data));
}

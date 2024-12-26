const API_URL = "https://brandstestowy.smallhost.pl/api/random";

// SELECTORS
const links = document.getElementsByClassName("link");
const products = document.getElementById("products");
const productFeaturesSection = document.getElementById("product-features");
const ingredientsSection = document.getElementById("ingredients");
const productCardsContainer = document.getElementById(
  "product--cards__container"
);
const threshold = document.getElementById("threshold");
let itemsAmount = document.getElementById("items-amount");
const currentPageCount = document.getElementById("current-page-count");
const dropdownOptions = document.getElementById("dropdown-options");
const dropdownOptionsItems = document.getElementsByClassName("option");
const productDetails = document.getElementById("product__details");
const productId = document.getElementById("product__id");
const productName = document.getElementById("product__name");
const closePopupBtn = document.getElementById("close__popup__btn");
const pagination = document.getElementById("pagination");
const hambugrer = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const bigDogImgContainer = document.getElementById("big-dog-img__container");

itemsAmount.addEventListener("click", () =>
  dropdownOptions.classList.toggle("show")
);

hambugrer.addEventListener("click", toggleMobileMenu);

const fetchDataObserver = new IntersectionObserver(fetchDataObserverCallback);
const fetchMoreDataObserver = new IntersectionObserver(
  fetchMoreDataObserverCallback
);
const currentSectionObserver = new IntersectionObserver(
  currentSectionObserverCallback
);

const sections = [productFeaturesSection, ingredientsSection, products];

sections.forEach((section) => {
  currentSectionObserver.observe(section);
});
fetchDataObserver.observe(products);
fetchMoreDataObserver.observe(threshold);

let data;
let pageNumber = 1;
let pageSize = +currentPageCount.textContent;

Array.from(dropdownOptionsItems).forEach((item) => {
  item.addEventListener("click", (e) => {
    fetchData(1, +currentPageCount.textContent);
    currentPageCount.textContent = e.target.textContent;
  });
});

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
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
}

function fetchDataObserverCallback([{ isIntersecting }]) {
  if (!data && isIntersecting)
    fetchData(pageNumber, pageSize).then(() => renderData(data));
}

function fetchMoreDataObserverCallback([{ isIntersecting }]) {
  if (data && isIntersecting)
    if (currentPageCount.textContent === "25") {
      fetchData(++pageNumber, pageSize).then(() => renderData(data));
    }
  if (currentPageCount.textContent === "50") {
    fetchData(++pageNumber, pageSize).then(() => renderData(data));
  }
  if (currentPageCount.textContent === "75") {
    fetchData(++pageNumber, pageSize).then(() => renderData(data));
  }
}

function currentSectionObserverCallback(entries) {
  entries.forEach(({ isIntersecting, target }) => {
    const id = target.id;
    const correspondingLink = Array.from(links).find(
      (link) => link.getAttribute("href").split("#")[1] === id
    );

    if (isIntersecting) {
      correspondingLink?.classList.add("active");
    } else {
      correspondingLink?.classList.remove("active");
    }
  });
}

function toggleMobileMenu() {
  mobileMenu.classList.toggle("show");
}

const productsContainer = document.getElementById("products__container");

const API_URL =
  "https://brandstestowy.smallhost.pl/api/random?pageNumber=3&pageSize=50";

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};

let data = null;

async function fetchData() {
  const response = await fetch(API_URL);
  const json = await response.json();
  data = json;
  console.log(data);
}

function callback(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (data) return;
      fetchData();
    }
  });
}

const observer = new IntersectionObserver(callback, options);

observer.observe(productsContainer);

let apiKey = "kwHSfel-f8rU63xAvWmhAm3MK6La9InFgZiSR2voXxw";
const searchContainer = document.querySelector(".search-container");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const showMoreBtn = document.getElementById("show-more");
const resultsContainer = document.getElementById("results");

let pages = 1;
let inputValue = "";

const getImagesData = async function () {
  try {
    inputValue = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${pages}&query=${inputValue}&client_id=${apiKey}&per_page=12`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) alert("Unable to fetch data at the moment");

    const results = data.results;

    console.log(results);

    results.map((result) => {
      const img = document.createElement("img");
      img.src = result.urls.small;
      const imgLink = document.createElement("a");
      imgLink.href = result.links.html;
      imgLink.target = "_blank";
      imgLink.appendChild(img);
      const favorites = document.createElement("button");
      resultsContainer.appendChild(imgLink);
    });

    showMoreBtn.style.display = "block";
    if (results.length === 0) {
      searchInput.style.border = " 1px solid red";
      searchInput.placeholder = "Please Write something";
      showMoreBtn.style.display = "none";
    } else {
      searchInput.style.border = "none";
      searchInput.placeholder = "Search For Any Image...";
    }
  } catch (err) {
    throw err;
  }
};

searchBtn.addEventListener("click", function () {
  resultsContainer.innerHTML = "";

  pages = 1;
  getImagesData();
});

showMoreBtn.addEventListener("click", function () {
  pages++;
  getImagesData();
});

searchInput.addEventListener("keyup", function () {
  if (searchInput.value != "") searchInput.style.border = "none";
});

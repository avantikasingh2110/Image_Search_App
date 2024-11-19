const searchButton = document.getElementById("search_btn");
const showMoreButton = document.getElementById("show_more");
const resultContainer = document.getElementById("result");

let query = ""; 
let page = 1;

// Fetch images from the API
async function fetchImages() {
    const url = `https://api.unsplash.com/search/photos/?client_id=Bn0EgsVvcO3KK0Mh5uX_1tzHgMXAaAkDVJJaUAJLHQk&query=${query}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
        displayImages(data.results);
        showMoreButton.style.display = "block";
    } else {
        alert("No results found. Please try a different search term.");
        showMoreButton.style.display = "none";
    }
}

// Display images and captions
function displayImages(images) {
    images.forEach((image) => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");

        const img = document.createElement("img");
        img.src = image.urls.small;
        img.alt = image.alt_description || "Image"; 
        img.classList.add("image");

        const caption = document.createElement("p");
        caption.textContent = image.alt_description || "No description available";
        caption.classList.add("caption");

        imageContainer.appendChild(img);
        imageContainer.appendChild(caption);

        resultContainer.appendChild(imageContainer);
    });
}

searchButton.addEventListener("click", () => {
    const input = document.getElementById("search");
    query = input.value.trim();

    if (query === "") {
        alert("Please enter a search term.");
        showMoreButton.style.display = "none";
        return; 
    }

    page = 1;
    resultContainer.innerHTML = "";
    fetchImages(); 
});

showMoreButton.addEventListener("click", () => {
    page++; 
    fetchImages(); 
});

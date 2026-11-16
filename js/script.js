
console.log("script.js loaded");

// Giphy API key
const apiKey = "Vr3YEIx7YgN7O1F02pSekYPAzPEP0Ip4";

// HTML elements
const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");

// Fetch and display GIFs
async function fetchGifs(searchTerm) {
  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=12&rating=g`;

  try {
    fetchButton.disabled = true;
    gifContainer.innerHTML = "<p class='text-center'>Loading GIFs...</p>";

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error("Could not fetch GIFs from Giphy.");
    }

    const result = await response.json();

    const images = result.data.map(gif => gif.images.original.url);

    console.log(images);

    gifContainer.innerHTML = "";

    if (images.length === 0) {
      gifContainer.innerHTML =
        "<p class='text-center'>No GIFs found. Try another search.</p>";
      return;
    }

    images.forEach(imageUrl => {
      gifContainer.innerHTML += `
        <img
          src="${imageUrl}"
          class="col-3 mb-3"
          alt="Giphy GIF"
          loading="lazy"
        >
      `;
    });

  } catch (error) {
    console.error(error);
    gifContainer.innerHTML =
      "<p class='text-danger text-center'>Something went wrong. Please try again.</p>";
  } finally {
    fetchButton.disabled = false;
  }
}

// Button click event
fetchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim() || "funny";

  fetchGifs(searchTerm);
});
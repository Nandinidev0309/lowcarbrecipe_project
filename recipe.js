document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    hamburger.setAttribute("aria-expanded", isOpen);
    hamburger.querySelectorAll(".line").forEach((line, index) => {
      if (isOpen) {
        if (index === 0) line.style.transform = "rotate(45deg)";
        if (index === 1) line.style.opacity = "0";
        if (index === 2) line.style.transform = "rotate(-45deg)";
      } else {
        line.style.transform = "none";
        line.style.opacity = "1";
      }
    });
  });

  const links = document.querySelectorAll(".nav-link");
  const currentUrl = window.location.pathname;

  links.forEach((link) => {
    if (link.getAttribute("href") === currentUrl) {
      link.classList.add("isactive");
    }
  });
});

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const searchTerm = document.getElementById("searchInput").value.trim();
    fetchRecipes(searchTerm);
  });

function fetchRecipes(searchTerm) {
  const url = `https://low-carb-recipes.p.rapidapi.com/search?name=${searchTerm}&tags=keto%3Bdairy-free`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f26d20e2femsh7665d535ac40edbp1102f6jsn65259769eb0c",
      "X-RapidAPI-Host": "low-carb-recipes.p.rapidapi.com",
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => displayRecipes(data))
    .catch((error) => console.error("Error:", error));
}

function displayRecipes(recipes) {
  const recipeCardsContainer = document.getElementById("recipeCards");
  if (!Array.isArray(recipes) || recipes.length === 0) {
    document.getElementById("errorMessage").textContent =
      "No results containing all your search terms were found in the store. Please try another recipe!";
    document.getElementById("errorMessage").style.display = "block";
    return;
  }
  document.getElementById("errorMessage").style.display = "none";
  recipeCardsContainer.innerHTML = "";
  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const image = document.createElement("img");
    image.src = recipe.image;
    image.alt = recipe.name;

    const title = document.createElement("h2");
    title.textContent = recipe.name;

    const button = document.createElement("button");
    button.textContent = "View Recipe";
    button.classList.add("button1");
    button.addEventListener("click", function () {
      displayRecipeDetails(recipe);
    });

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(button);

    recipeCardsContainer.appendChild(card);
  });
}

function displayRecipeDetails(recipe) {
  const modal = document.getElementById("recipeDetailsModal");
  const modalContent = modal.querySelector(".modal-content");
  const closeModalBtn = modal.querySelector(".close");

  const recipeName = modal.querySelector("#recipeName");
  const recipeImage = modal.querySelector("#recipeImage");
  const recipeIngredients = modal.querySelector("#recipeIngredients");
  const recipeSteps = modal.querySelector("#recipeSteps");

  recipeName.textContent = recipe.name;
  recipeImage.src = recipe.image;

  recipeIngredients.innerHTML = "";
  recipe.ingredients.forEach((ingredient) => {
    const li = document.createElement("li");
    li.textContent = ingredient.name;
    recipeIngredients.appendChild(li);
  });

  recipeSteps.innerHTML = "";
  recipe.steps.forEach((step, index) => {
    const li = document.createElement("li");
    li.textContent = step;
    recipeSteps.appendChild(li);
  });

  modal.style.display = "block";

  closeModalBtn.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

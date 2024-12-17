import products from "./myProducts.js";

let panier = []; // Tableau pour stocker les produits ajoutés au panier

// Fonction pour mettre à jour l'affichage du panier
function updatePanier() {
  const panierContent = document.querySelector("#icon-panier .dropdown-content");

  if (panier.length === 0) {
    panierContent.innerHTML = `
      <h2 class="title-open-panier">Panier</h2>
      <p>Votre panier est vide...</p>
    `;
    return;
  }

  // Construire le contenu du panier
  const panierHTML = panier
    .map(
      (product) => `
      <div class="panier-item">
        <img src="${product.imageUrl}" alt="${product.productName}" width="40">
        <span>${product.productName}</span>
        <span>${product.price.toFixed(2)} €</span>
        <select class="quantity-select" data-name="${product.productName}">
          ${Array.from({ length: 10 }, (_, i) => i + 1)
            .map(
              (value) =>
                `<option value="${value}" ${
                  product.quantity === value ? "selected" : ""
                }>${value}</option>`
            )
            .join("")}
        </select>
        <button class="remove-item" data-name="${product.productName}">Supprimer</button>
      </div>
    `
    )
    .join("");

  // Calcul du total
  const total = panier.reduce((sum, product) => sum + product.price * product.quantity, 0);

  // Ajouter le contenu et le bouton de validation
  panierContent.innerHTML = `
    <h2 class="title-open-panier">Panier</h2>
    ${panierHTML}
    <div class="panier-total">
      <strong>Total :</strong> ${total.toFixed(2)} €
    </div>
    <button id="validate-purchase">Valider le panier</button>
  `;

  // Gestion des événements pour les quantités et suppression
  document.querySelectorAll(".quantity-select").forEach((select) => {
    select.addEventListener("change", (e) => {
      const productName = e.target.getAttribute("data-name");
      const newQuantity = parseInt(e.target.value, 10);
      updateQuantity(productName, newQuantity);
    });
  });

  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productName = e.target.getAttribute("data-name");
      removeFromPanier(productName);
    });
  });

  // Gestion du bouton "Valider les achats"
  document.querySelector("#validate-purchase").addEventListener("click", () => {
    alert("Vos achats ont été validés !");
    panier = []; // Vider le panier après validation
    updatePanier(); // Mettre à jour l'affichage
  });
}

// Fonction pour ajouter un produit au panier
function addToPanier(product) {
  const existingProduct = panier.find((item) => item.productName === product.productName);

  if (existingProduct) {
    existingProduct.quantity++; // Augmente la quantité si le produit existe déjà
  } else {
    panier.push({ ...product, quantity: 1 }); // Ajoute le produit avec une quantité initiale de 1
  }

  updatePanier(); // Met à jour l'affichage du panier
  alert(`${product.productName} a été ajouté au panier !`);
}

// Fonction pour supprimer un produit du panier
function removeFromPanier(productName) {
  panier = panier.filter((item) => item.productName !== productName); // Filtre les produits
  updatePanier(); // Met à jour l'affichage du panier
}

// Fonction pour mettre à jour la quantité d'un produit
function updateQuantity(productName, newQuantity) {
  const product = panier.find((item) => item.productName === productName);
  if (product) {
    product.quantity = newQuantity;
    updatePanier(); // Met à jour l'affichage du panier
  }
}

// Fonction pour afficher les produits dans les sections (Rares et Tendances)
function displayProducts() {
  const categories = ["rares", "tendances"]; // Les catégories définies

  categories.forEach((category) => {
    const section = document.querySelector(`#${category} .products-container`);

    const filteredProducts = products.filter((product) => product.category === category);

    filteredProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");

      productCard.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.productName}">
        <h3>${product.productName}</h3>
        <p>${product.description}</p>
        <p>Prix : ${product.price.toFixed(2)} €</p>
        <button class="add-to-panier">Choisir</button>
      `;

      // Ajouter un événement au bouton "Choisir"
      productCard.querySelector(".add-to-panier").addEventListener("click", () => {
        addToPanier(product);
      });

      // Ajouter la carte produit à la section correspondante
      section.appendChild(productCard);
    });
  });
}

// Initialisation au chargement du DOM
document.addEventListener("DOMContentLoaded", () => {
  displayProducts(); // Affiche les produits sur la page
  updatePanier(); // Initialise l'affichage du panier
});
// debut enzo 
import products from "./myProducts.js";

// Tableau pour stocker les articles ajoutés au panier
let panier = [];

// Fonction pour mettre à jour l'affichage du panier
function updatePanier() {
    const panierContent = document.querySelector(
        "#icon-panier .dropdown-content"
    ); 
    panierContent.innerHTML = `
    <h2 class="title-open-panier">Panier</h2>
    ${panier.length > 0
            ? panier
                .map(
                    (product) => `
        <div class="panier-item">
          <img src="${product.imageUrl}" alt="${product.productName
                        }" width="50">
          <span>${product.productName}</span>
          <span>${product.price.toFixed(2)} €</span>
        </div>
      `
                )
                .join("")
            : "<p>Votre Panier est vide...</p>"
        }
  `;
}

// Les catégories sur votre site
const categories = ["rares", "tendances"];

categories.forEach((category) => {
    const section = document.querySelector(`#${category} .products-container`);

    // Filtrer les produits de la catégorie actuelle
    const filteredProducts = products.filter(
        (product) => product.category === category
    );

    filteredProducts.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        // Remplir la carte produit avec les détails
        productCard.innerHTML = `
      <img src="${product.imageUrl}" alt="${product.productName}">
      <h3>${product.productName}</h3>
      <p>${product.description}</p>
      <p>Prix : ${product.price.toFixed(2)} €</p>
      <button class="add-to-panier">Choisir</button>
    `;

        // Ajouter un événement au bouton Choisir
        productCard
            .querySelector(".add-to-panier")
            .addEventListener("click", () => {
                panier.push(product); // Ajouter le produit au tableau panier
                updatePanier(); // Mettre à jour l'affichage du panier
                alert(`${product.productName} a été ajouté au panier !`);
            });

        // Ajouter la carte produit à la section appropriée
        section.appendChild(productCard);
    });
});

// Initialisation du panier vide au chargement
updatePanier();
// fin enzo 

// debut clem 
const stripe = require('stripe')('sk_test_51QUPnHFhiydSL0HhfqTv2s5DosXmrbaV6Vg1zpL2Wws5djqzmKzpQrWH2GuDK1SVFg1dETLHCSjc95GJA5XmDjDD00ahdizCvC');

stripe.products.create({
    name: 'Starter Subscription',
    description: '$12/Month subscription',
}).then(product => {
    stripe.prices.create({
        unit_amount: 1200,
        currency: 'usd',
        recurring: {
            interval: 'month',
        },
        product: product.id,
    }).then(price => {
        console.log('Success! Here is your starter subscription product id: ' + product.id);
        console.log('Success! Here is your starter subscription price id: ' + price.id);
        console.log('Price: $' + (price.unit_amount / 100) + ' per ' + price.recurring.interval);
    }).catch(err => {
        console.error('Error creating price:', err);
    });
}).catch(err => {
    console.error('Error creating product:', err);
});

// fin clem 

// debut jules 

// fin jules

// debut zak

// fin zal
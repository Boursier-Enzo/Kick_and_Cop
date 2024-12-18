import products from "./myProducts.js";

let favorites = []; // Coup de cœur
let panier = []; // Panier
let user = null; // Compte utilisateur

// === Coup de Cœur ===
function updateFavorites() {
  const favoritesContainer = document.querySelector(".icon-coeur .dropdown-content");

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = `
      <h2 class="title-open-coeur">Ma Liste</h2>
      <p>Vous n'avez encore rien aimé...</p>
    `;
    return;
  }

  const favoritesHTML = favorites
    .map(
      (product) => `
      <div class="favorite-item">
        <img src="${product.imageUrl}" alt="${product.productName}" width="50">
        <button class="remove-favorite" data-name="${product.productName}">Retirer</button>
      </div>
    `
    )
    .join("");

  favoritesContainer.innerHTML = `
    <h2 class="title-open-coeur">Ma Liste</h2>
    ${favoritesHTML}
  `;

  // Gestion des boutons pour retirer un favori
  favoritesContainer.querySelectorAll(".remove-favorite").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productName = e.target.getAttribute("data-name");
      removeFromFavorites(productName);
    });
  });
}

function addToFavorites(product) {
  const alreadyFavorite = favorites.find((item) => item.productName === product.productName);
  if (!alreadyFavorite) {
    favorites.push(product);
    updateFavorites();
    alert(`${product.productName} a été ajouté à vos coups de cœur !`);
  } else {
    alert(`${product.productName} est déjà dans vos coups de cœur.`);
  }
}

function removeFromFavorites(productName) {
  favorites = favorites.filter((item) => item.productName !== productName);
  updateFavorites();
}

// === Mon Compte ===
function updateAccount() {
  const userInfo = document.querySelector(".icon-user .dropdown-content");
  if (user) {
    userInfo.innerHTML = `
      <h2 class="title-open-user">Compte</h2>
      <p>Connecté en tant que : ${user.name}</p>
      <button id="logout-btn">Se déconnecter</button>
    `;
    document.getElementById("logout-btn").addEventListener("click", logout);
  } else {
    userInfo.innerHTML = `
      <h2 class="title-open-user">Compte</h2>
      <p>Vous n'êtes pas connecté.</p>
      <button id="login-btn">Se connecter</button>
    `;
    document.getElementById("login-btn").addEventListener("click", login);
  }
}

function login() {
  user = { name: "Enzo", email: "enzo@example.com" };
  updateAccount();
  alert("Connexion réussie !");
}

function logout() {
  user = null;
  updateAccount();
  alert("Déconnexion réussie !");
}

// === Panier ===
function updatePanier() {
  const panierContent = document.querySelector("#icon-panier .dropdown-content");

  if (panier.length === 0) {
    panierContent.innerHTML = `
      <h2 class="title-open-panier">Panier</h2>
      <p>Votre panier est vide...</p>
    `;
    return;
  }

  const panierHTML = panier
    .map(
      (product) => `
      <div class="panier-item">
        <img src="${product.imageUrl}" alt="${product.productName}" width="40">
        <span>${product.price.toFixed(2)}€</span>
        <button class="remove-item" data-name="${product.productName}">Supprimer</button>
      </div>
    `
    )
    .join("");

  const total = panier.reduce((sum, product) => sum + product.price, 0);

  panierContent.innerHTML = `
    <h2 class="title-open-panier">Panier</h2>
    ${panierHTML}
    <div class="panier-total">
      <strong>Total :</strong> ${total.toFixed(2)} €
      <button id="validate-purchase">Valider le panier</button>
    </div>
  `;

  // Gestion des événements
  panierContent.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const productName = e.target.getAttribute("data-name");
      removeFromPanier(productName);
    });
  });

  panierContent.querySelector("#validate-purchase").addEventListener("click", () => {
    alert("Vos achats ont été validés !");
    panier = [];
    updatePanier();
  });
}

function addToPanier(product) {
  panier.push(product);
  updatePanier();
  alert(`${product.productName} a été ajouté au panier !`);
}

function removeFromPanier(productName) {
  panier = panier.filter((item) => item.productName !== productName);
  updatePanier();
}

// === Affichage des produits ===
function displayProducts() {
  const categories = ["rares", "tendances"];
  categories.forEach((category) => {
    const section = document.querySelector(`#${category} .products-container`);
    const filteredProducts = products.filter((product) => product.category === category);

    filteredProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      
      // Création de la liste déroulante pour les tailles
      const tailleSelect = document.createElement("select");
      tailleSelect.id = `taille-${product.productName}`;
      tailleSelect.name = `taille-${product.productName}`;
      const tailles = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46];
      tailles.forEach((taille) => {
        const option = document.createElement("option");
        option.value = taille;
        option.textContent = taille;
        tailleSelect.appendChild(option);
      });

      // Ajout du contenu du produit et de la sélection de taille
      productCard.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.productName}">
        <h3>${product.productName}</h3>
        <p>${product.description}</p>
        <p>${product.price.toFixed(2)} €</p>
      `;

      // Ajout du select pour la taille
      productCard.appendChild(tailleSelect);

      // Boutons Ajouter au Panier et Ajouter aux favoris
      const addToPanierBtn = document.createElement('button');
      addToPanierBtn.classList.add("add-to-panier");
      addToPanierBtn.textContent = "Ajouter au Panier";
      addToPanierBtn.addEventListener("click", () => {
        const selectedTaille = tailleSelect.value;
        if (selectedTaille) {
          addToPanier(product, selectedTaille);  // Passer la taille sélectionnée au panier
        } else {
          alert("Veuillez sélectionner une taille avant d'ajouter au panier.");
        }
      });

      const addToFavoritesBtn = document.createElement('button');
      addToFavoritesBtn.classList.add("add-to-favorites");
      addToFavoritesBtn.textContent = "Ajouter à ma liste";
      addToFavoritesBtn.addEventListener("click", () => {
        addToFavorites(product);
      });

      productCard.appendChild(addToPanierBtn);
      productCard.appendChild(addToFavoritesBtn);
      section.appendChild(productCard);
    });
  });
}

// === Initialisation ===
document.addEventListener("DOMContentLoaded", () => {
  displayProducts();
  updatePanier();
  updateAccount();
  updateFavorites();
});

// Boutons
const enClickAnglais = document.getElementById('anglais');
const enClickEspagnols = document.getElementById('espagnols');
const enClickItalien = document.getElementById('italien');
const enClickFrancais = document.getElementById('francais');
const enClickAllemand = document.getElementById('allemand');
const enClickArabe = document.getElementById('arabe');
const enClickChinois = document.getElementById('chinois');

// traduction
const mentions = document.getElementById('mention');
const sociaux = document.getElementById('sociaux');
const transport = document.getElementById('trans');
const moyens = document.getElementById('moyens');
const cop = document.getElementById('cop');
const kick = document.getElementById('kick');
const mail = document.getElementById('mail');
const nous = document.getElementById('nous');

enClickAnglais.addEventListener('click', function () {
    mentions.textContent = "LEGAL NOTICES | PRIVACY POLICY | CGU | General Terms and Conditions";
    sociaux.textContent = "OUR SOCIAL NETWORKS";
    transport.textContent = "CARRIERS";
    moyens.textContent = "OUR PAYMENT MEANS";
    cop.textContent = "KICK & COP is your go-to destination for stylish shoes, comfortable and suitable for all occasions. We carefully select quality models that combine style and durability.";
    kick.textContent = "ABOUT KICK & COP";
    mail.textContent = "E-MAIL ADDRESS:";
    nous.textContent = "CONTACT US:";
});

enClickEspagnols.addEventListener('click', function () {
    mentions.textContent = "AVISO LEGAL | POLÍTICA DE PRIVACIDAD | UGE | Términos y condiciones generales";
    sociaux.textContent = "NUESTRAS REDES SOCIALES";
    transport.textContent = "TRANSPORTADORES";
    moyens.textContent = "NUESTROS MEDIOS DE PAGO";
    cop.textContent = "KICK & COP es tu destino ideal para encontrar zapatos elegantes, cómodos y adecuados para todas las ocasiones. Seleccionamos cuidadosamente modelos de calidad que combinan estilo y durabilidad.";
    kick.textContent = "ACERCA DE KICK & COP";
    mail.textContent = "DIRECCIÓN DE CORREO ELECTRÓNICO:";
    nous.textContent = "CONTÁCTENOS:";
});

enClickItalien.addEventListener('click', function () {
    mentions.textContent = "NOTE LEGALI | INFORMATIVA SULLA PRIVACY | CGU | Termini e Condizioni Generali";
    sociaux.textContent = "I NOSTRI SOCIAL NETWORK";
    transport.textContent = "VETTORI";
    moyens.textContent = "I NOSTRI MEZZI DI PAGAMENTO";
    cop.textContent = "KICK & COP è la tua destinazione preferita per scarpe eleganti, comode e adatte a tutte le occasioni. Selezioniamo con cura modelli di qualità che uniscono stile e durata.";
    kick.textContent = "INFORMAZIONI SU KICK & COP";
    mail.textContent = "INDIRIZZO E-MAIL:";
    nous.textContent = "CONTATTACI:";
});

enClickFrancais.addEventListener('click', function () {
    mentions.textContent = "MENTIONS LÉGALES | POLITIQUE DE CONFIDENTIALITÉ | CGU | CGV";
    sociaux.textContent = "NOS RÉSEAUX SOCIAUX";
    transport.textContent = "TRANSPORTEURS";
    moyens.textContent = "NOS MOYENS DE PAIEMENT";
    cop.textContent = "KICK & COP est votre destination incontournable pour trouver des chaussures élégantes, confortables et adaptées à toutes les occasions. Nous sélectionnons avec soin des modèles de qualité qui allient style et durabilité.";
    kick.textContent = "À PROPOS DE KICK & COP";
    mail.textContent = "ADRESSE E-MAIL:";
    nous.textContent = "NOUS CONTACTER:";
});

enClickAllemand.addEventListener('click', function () {
    mentions.textContent = "IMPRESSUM | DATENSCHUTZRICHTLINIE | CGU | Allgemeine Geschäftsbedingungen";
    sociaux.textContent = "UNSERE SOZIALEN NETZWERKE";
    transport.textContent = "TRANSPORTDIENSTE";
    moyens.textContent = "UNSERE ZAHLUNGSMETHODEN";
    cop.textContent = "KICK & COP ist Ihre Anlaufstelle für stilvolle, bequeme Schuhe, die für jeden Anlass geeignet sind. Wir wählen sorgfältig hochwertige Modelle aus, die Stil und Haltbarkeit vereinen.";
    kick.textContent = "ÜBER KICK & COP";
    mail.textContent = "E-MAIL-ADRESSE:";
    nous.textContent = "KONTAKTIEREN SIE UNS:";
});

enClickArabe.addEventListener('click', function () {
    mentions.textContent = "الإشعارات القانونية | سياسة الخصوصية | الشروط والأحكام";
    sociaux.textContent = "شبكاتنا الاجتماعية";
    transport.textContent = "شركات النقل";
    moyens.textContent = "طرق الدفع لدينا";
    cop.textContent = "KICK & COP هي وجهتك المثالية للأحذية الأنيقة والمريحة والمناسبة لجميع المناسبات. نختار بعناية نماذج عالية الجودة تجمع بين الأناقة والمتانة.";
    kick.textContent = "حول KICK & COP";
    mail.textContent = "عنوان البريد الإلكتروني:";
    nous.textContent = "اتصل بنا:";
});

enClickChinois.addEventListener('click', function () {
    mentions.textContent = "法律声明 | 隐私政策 | 使用条款 | 一般条款和条件";
    sociaux.textContent = "我们的社交网络";
    transport.textContent = "运输公司";
    moyens.textContent = "我们的支付方式";
    cop.textContent = "KICK & COP 是您寻找时尚、舒适且适合各种场合鞋履的首选目的地。我们精心挑选优质款式，结合了时尚与耐用性。";
    kick.textContent = "关于 KICK & COP";
    mail.textContent = "电子邮件地址：";
    nous.textContent = "联系我们：";
});


// Fonction pour ouvrir le menu
function openMenu() {
    document.getElementById("menu").style.width = "250px";
}

// Fonction pour fermer le menu
function closeMenu() {
    document.getElementById("menu").style.width = "0";
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Recherche activée !");
    
    // Fonction pour gérer la recherche
    function handleSearch(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        const query = document.getElementById("search-input").value.toLowerCase().trim();
        const products = document.querySelectorAll(".product"); // Sélectionner tous les produits

        let found = false; // Variable pour vérifier si un produit est trouvé

        products.forEach(product => {
            const name = product.getAttribute("data-name").toLowerCase();
            const description = product.querySelector("p").textContent.toLowerCase();

            if (name.includes(query) || description.includes(query)) {
                product.style.display = "block"; // Affiche le produit
                found = true;
            } else {
                product.style.display = "none"; // Masque le produit
            }
        });

        if (!found) {
            alert("Aucun produit trouvé pour cette recherche.");
        }
    }

    // Attacher la fonction de recherche au formulaire
    const searchForm = document.getElementById("search-form");
    if (searchForm) {
        searchForm.addEventListener("submit", handleSearch);
    } else {
        console.error("Le formulaire de recherche n'existe pas !");
    }
});




// Fonction pour gérer l'ajout au panier
const cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(event) {
    const button = event.target;
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    // Ajouter l'article au panier
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Attacher l'événement 'click' à chaque bouton 'Ajouter au panier'
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => button.addEventListener('click', addToCart));



// Fonction pour ajouter au panier
function addToCart(event) {
    const button = event.target;
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    // Vérification si l'utilisateur est connecté
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('Vous devez être connecté pour ajouter un article au panier.');
        return;
    }

    // Ajouter l'article au panier
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`${name} a été ajouté au panier.`);
}

// Ajout d'un gestionnaire d'événements sur chaque bouton "Ajouter au panier"
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => button.addEventListener('click', addToCart));
});

// Fonction pour mettre à jour le contenu du panier sans affecter le formulaire
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContent = document.getElementById('cart-content');
    const cartSummary = document.getElementById('cart-summary');

    if (cart.length === 0) {
        cartContent.innerHTML = "<p>Votre panier est vide.</p>";
    } else {
        let total = 0;
        const cartItems = cart.map(item => {
            total += item.price;
            return `<li><span>${item.name}</span><span>${item.price}€</span></li>`;
        }).join("");

        cartContent.innerHTML = `
            <ul>${cartItems}</ul>
        `;
        cartSummary.innerHTML = `
            <p>Total : ${total}€</p>
            <button onclick="clearCart()">Payer</button>
        `;
    }
});


// Fonction pour valider le formulaire de paiement
function validateCheckoutForm() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    if (!name || !address || !phone) {
        alert('Veuillez remplir tous les champs avant de continuer.');
        return false; // Bloque l'action de paiement
    }
    return true; // Autorise l'action de paiement si tout est rempli
}

// Fonction pour gérer le paiement (checkout)
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Votre panier est vide. Ajoutez des articles avant de payer.');
        return;
    }

    // Valider le formulaire avant de procéder
    const isValid = validateCheckoutForm();
    if (!isValid) {
        return; // Si la validation échoue, on arrête la fonction
    }

    // Logique de paiement (ici on simule le paiement)
    alert('Le paiement est en cours...');

    // Vider le panier après le paiement (optionnel)
    localStorage.removeItem('cart');
    location.reload();
}

// Attacher l'événement de paiement au bouton
document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.getElementById('checkout');
    
    if (checkoutButton) {
        checkoutButton.addEventListener('click', checkout);
    }
});




// Fonction pour vider le panier
function clearCart() {
    localStorage.removeItem('cart');
    location.reload();
}

// Stocker les utilisateurs dans le localStorage
const users = JSON.parse(localStorage.getItem('users')) || [];

// Connexion
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                alert('Connexion réussie !');
                localStorage.setItem('loggedInUser', email);
                window.location.href = 'index.html'; // Redirection après connexion
            } else {
                alert('Identifiants incorrects.');
            }
        });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            if (password !== confirmPassword) {
                alert('Les mots de passe ne correspondent pas.');
                return;
            }

            if (users.find(user => user.email === email)) {
                alert('Cet email est déjà utilisé.');
                return;
            }

            users.push({ email, password });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Compte créé avec succès !');
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('Vous devez être connecté pour accéder à cette page.');
        window.location.href = 'identification.html';
    }
});
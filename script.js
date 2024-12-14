// Stockage du panier dans le localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];

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
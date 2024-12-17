
// scripts.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(product, price, image) {
    cart.push({ product, price, image });
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'carrito.html';
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.product}">
            <p>${item.product}</p>
            <p>${item.price}</p>
            <button class="delete-button" onclick="removeFromCart(${index})">🗑️</button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

if (window.location.pathname.includes('carrito.html')) {
    displayCart();
}




// Function to display the summary in the payment page
function displayPaymentSummary() {
    const productImage = document.getElementById('product-image');
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const subtotalPrice = document.getElementById('subtotal-price');
    const totalPrice = document.getElementById('total-price');

    const item = cart[0]; // Assuming only one item for simplicity
    if (item) {
        productImage.src = item.image;
        productName.textContent = item.product;
        productPrice.textContent = item.price;
        subtotalPrice.textContent = item.price;
        totalPrice.textContent = item.price;
    }
}

// Event listener for the contact form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const serviceID = 'service_eq1yh4a';
    const templateID = 'template_je5wm23';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            alert('Mensaje enviado!');
        }, (err) => {
            alert(JSON.stringify(err));
        });
});

// Event listeners for the buy now and checkout buttons
document.addEventListener('DOMContentLoaded', function() {
    const buyNowButton = document.querySelector('.buy-now-button');
    const checkoutButton = document.querySelector('.checkout-button');

    if (buyNowButton) {
        buyNowButton.addEventListener('click', function() {
            window.location.href = 'pagofinal.html';
        });
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            window.location.href = 'pagofinal.html';
        });
    }

    // Display the cart if on carrito.html page
    if (window.location.pathname.includes('carrito.html')) {
        displayCart();
    }

    // Display the payment summary if on pagofinal.html page
    if (window.location.pathname.includes('pagofinal.html')) {
        displayPaymentSummary();
    }
});

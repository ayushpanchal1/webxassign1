"use strict";
// Define an array of furniture products with dummy data
var furnitureProducts = [
    { id: 1, name: "Table", description: "A sturdy wooden table for your living room.", price: 99.99, imageUrl: "https://www.ikea.com/in/en/images/products/ekedalen-extendable-table-oak__0736964_pe740828_s5.jpg?f=s" },
    { id: 2, name: "Chair", description: "Comfortable armchair with cushioned seat.", price: 49.99, imageUrl: "https://www.ikea.com/in/en/images/products/millberget-swivel-chair-murum-black__1020142_pe831799_s5.jpg" },
    { id: 3, name: "Sofa", description: "Modern sofa with adjustable backrest.", price: 299.99, imageUrl: "https://www.ikea.com/in/en/images/products/friheten-corner-sofa-bed-with-storage-skiftebo-dark-grey__0175610_pe328883_s5.jpg" },
    { id: 4, name: "Bookshelf", description: "Tall bookshelf with multiple shelves for storage.", price: 149.99, imageUrl: "https://www.ikea.com/in/en/images/products/billy-bookcase-comb-with-extension-units-oak-effect__1104746_pe867886_s5.jpg?f=s" },
    { id: 5, name: "Bed", description: "King-size bed with upholstered headboard.", price: 499.99, imageUrl: "https://www.ikea.com/us/en/images/products/nordli-bed-with-headboard-and-storage-anthracite__1101959_pe866808_s5.jpg" }
];
// Function to render furniture product catalog
function renderFurnitureProductCatalog(products) {
    var mainElement = document.querySelector('main');
    if (mainElement) {
        var productList_1 = document.createElement('div');
        productList_1.classList.add('row');
        products.forEach(function (product) {
            var productCard = document.createElement('div');
            productCard.classList.add('col-md-4', 'mb-4');
            productCard.innerHTML = "\n                <div class=\"card\">\n                    <img src=\"".concat(product.imageUrl, "\" class=\"card-img-top\" alt=\"").concat(product.name, "\">\n                    <div class=\"card-body\">\n                        <h5 class=\"card-title\">").concat(product.name, "</h5>\n                        <p class=\"card-text\">").concat(product.description, "</p>\n                        <p class=\"card-text\">$").concat(product.price.toFixed(2), "</p>\n                        <button class=\"btn btn-primary\" onclick=\"addToCart(").concat(product.id, ")\">Add to Cart</button>\n                    </div>\n                </div>\n            ");
            productList_1.appendChild(productCard);
        });
        mainElement.appendChild(productList_1);
    }
}
// Define cart array to store items
var cart = [];
// Function to add product to cart
function addToCart(productId) {
    var product = furnitureProducts.find(function (p) { return p.id === productId; });
    if (product) {
        var existingItem = cart.find(function (item) { return item.product.id === product.id; });
        if (existingItem) {
            existingItem.quantity++;
        }
        else {
            cart.push({ product: product, quantity: 1 });
        }
        updateCartModal();
    }
}
// Function to update cart modal content
function updateCartModal() {
    var cartModalBody = document.getElementById('cart-modal-body');
    if (cartModalBody) {
        cartModalBody.innerHTML = '';
        cart.forEach(function (item) {
            var cartItemElement = document.createElement('div');
            cartItemElement.innerHTML = "\n                <p>".concat(item.product.name, " - Quantity: ").concat(item.quantity, " - Price: $").concat((item.product.price * item.quantity).toFixed(2), "</p>\n            ");
            cartModalBody.appendChild(cartItemElement);
        });
    }
}
// Render the furniture product catalog
renderFurnitureProductCatalog(furnitureProducts);
// Handle cart button click to open modal
var cartButton = document.getElementById('cart-button');
var cartModal = document.getElementById('cart-modal');
if (cartButton && cartModal) {
    cartButton.addEventListener('click', function () {
        updateCartModal();
        cartModal.style.display = 'block';
    });
}
// Handle close button click to hide modal
var closeButton = document.querySelector('.close-button');
if (closeButton && cartModal) {
    closeButton.addEventListener('click', function () {
        cartModal.style.display = 'none';
    });
}

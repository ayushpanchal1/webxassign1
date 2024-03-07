// Define an interface for a furniture product
interface FurnitureProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

// Define an array of furniture products with dummy data
const furnitureProducts: FurnitureProduct[] = [
    { id: 1, name: "Table", description: "A sturdy wooden table for your living room.", price: 99.99, imageUrl: "https://www.ikea.com/in/en/images/products/ekedalen-extendable-table-oak__0736964_pe740828_s5.jpg?f=s" },
    { id: 2, name: "Chair", description: "Comfortable armchair with cushioned seat.", price: 49.99, imageUrl: "https://www.ikea.com/in/en/images/products/millberget-swivel-chair-murum-black__1020142_pe831799_s5.jpg" },
    { id: 3, name: "Sofa", description: "Modern sofa with adjustable backrest.", price: 299.99, imageUrl: "https://www.ikea.com/in/en/images/products/friheten-corner-sofa-bed-with-storage-skiftebo-dark-grey__0175610_pe328883_s5.jpg" },
    { id: 4, name: "Bookshelf", description: "Tall bookshelf with multiple shelves for storage.", price: 149.99, imageUrl: "https://www.ikea.com/in/en/images/products/billy-bookcase-comb-with-extension-units-oak-effect__1104746_pe867886_s5.jpg?f=s" },
    { id: 5, name: "Bed", description: "King-size bed with upholstered headboard.", price: 499.99, imageUrl: "https://www.ikea.com/us/en/images/products/nordli-bed-with-headboard-and-storage-anthracite__1101959_pe866808_s5.jpg" }
];

// Function to render furniture product catalog
function renderFurnitureProductCatalog(products: FurnitureProduct[]): void {
    const mainElement = document.querySelector('main');

    if (mainElement) {
        const productList = document.createElement('div');
        productList.classList.add('row');

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('col-md-4', 'mb-4');

            productCard.innerHTML = `
                <div class="card">
                    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">$${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            `;

            productList.appendChild(productCard);
        });

        mainElement.appendChild(productList);
    }
}

// Define Cart Item interface
interface CartItem {
    product: FurnitureProduct;
    quantity: number;
}

// Define cart array to store items
let cart: CartItem[] = [];

// Function to add product to cart
function addToCart(productId: number): void {
    const product = furnitureProducts.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ product, quantity: 1 });
        }
        updateCartModal();
    }
}

// Function to update cart modal content
function updateCartModal(): void {
    const cartModalBody = document.getElementById('cart-modal-body');
    if (cartModalBody) {
        cartModalBody.innerHTML = '';
        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.innerHTML = `
                <p>${item.product.name} - Quantity: ${item.quantity} - Price: $${(item.product.price * item.quantity).toFixed(2)}</p>
            `;
            cartModalBody.appendChild(cartItemElement);
        });
    }
}

// Render the furniture product catalog
renderFurnitureProductCatalog(furnitureProducts);

// Handle cart button click to open modal
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');

if (cartButton && cartModal) {
    cartButton.addEventListener('click', () => {
        updateCartModal();
        (cartModal as HTMLElement).style.display = 'block';
    });
}

// Handle close button click to hide modal
const closeButton = document.querySelector('.close-button');
if (closeButton && cartModal) {
    closeButton.addEventListener('click', () => {
        (cartModal as HTMLElement).style.display = 'none';
    });
}

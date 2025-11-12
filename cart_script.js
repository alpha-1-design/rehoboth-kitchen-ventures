// Global variable to hold the cart data
let cart = [];

// --- 1. CORE FUNCTIONS (Load, Save, Render) ---

function loadCart() {
    // Tries to load the cart from the browser's storage
    const storedCart = localStorage.getItem('shoppingCart');
    cart = storedCart ? JSON.parse(storedCart) : [];
}

function saveCart() {
    // Saves the current cart to the browser's storage
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function renderCart() {
    const cartList = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    let total = 0;

    // Clear the current displayed list
    cartList.innerHTML = ''; 

    if (cart.length === 0) {
        cartList.innerHTML = '<li style="color: #666;">Your cart is empty.</li>';
        cartTotalSpan.textContent = '0.00';
        return;
    }

    // Loop through each item to calculate totals and build the list
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            ${item.name} (${item.quantity} x GHS ${item.price.toFixed(2)}) 
            <span style="float: right;">GHS ${itemTotal.toFixed(2)}</span>
        `;
        cartList.appendChild(listItem);
    });

    // Update the grand total display
    cartTotalSpan.textContent = total.toFixed(2);
    saveCart(); // Save the new cart state
}


// --- 2. ADD TO CART FUNCTIONALITY ---

function addToCart(event) {
    // Ensure the click came from an 'Add to Cart' button
    if (!event.target.classList.contains('add-to-cart')) {
        return;
    }

    // Get the product data from the HTML attributes
    const productCard = event.target.closest('.product-card');
    if (!productCard) return;

    const id = productCard.dataset.productId;
    const name = productCard.dataset.name;
    const price = parseFloat(productCard.dataset.price);

    // Check if item exists to increase quantity or add new item
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }

    renderCart();
    console.log(`${name} added to cart!`);
}


// --- 3. CHECKOUT FUNCTIONALITY (WhatsApp Integration) ---

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }
    
    let message = 'New Order:\n';
    let total = 0;

    // Build the detailed order message for WhatsApp
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `${item.quantity} x ${item.name} (GHS ${item.price.toFixed(2)}) = GHS ${itemTotal.toFixed(2)}\n`;
    });

    message += `\nGRAND TOTAL: GHS ${total.toFixed(2)}`;
    message += `\n\n--- Customer Details ---`;
    message += `\nPlease reply with your name and delivery address.`;

    // Reset the cart and update the display
    cart = [];
    renderCart(); 
    
    // Encode the message and open WhatsApp with your number
    // Number: 233200159500
    const whatsappLink = `https://wa.me/233200159500?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
}


// --- 4. INITIALIZATION (Starts the Cart System) ---

document.getElementById('products').addEventListener('click', addToCart);
  // Load any previously saved items
    renderCart(); // Display the initial cart state
    
    // Event listeners to handle clicks on the product grid and checkout button
    const productsGrid = document.getElementById('products-grid');
    if (productsGrid) {
        productsGrid.addEventListener('click', addToCart);
    }
    
// ... existing code up to line 124

    // Attach the checkout function to the checkout button
    document.getElementById('checkout-button').addEventListener('click', checkout);



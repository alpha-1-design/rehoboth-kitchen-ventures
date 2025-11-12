document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration & Initialization ---
    const shippingCost = 25.00; // Fixed shipping cost in Cedis (₵)
    
    // Load cart items from localStorage (synced with products.js)
    let cart = JSON.parse(localStorage.getItem('rehobothCart')) || [];

    // --- DOM Elements ---
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalDisplay = document.getElementById('subtotal');
    const totalDisplay = document.getElementById('total');
    const shippingDisplay = document.getElementById('shipping');
    const emptyMessage = document.getElementById('empty-cart-message');
    const checkoutButton = document.getElementById('whatsappCheckout'); // The 'Proceed to Checkout' button

    // --- Utility Functions ---

    /** Formats a number to Ghana Cedis (GHS) currency string. */
    const formatCurrency = (amount) => {
        return `₵${amount.toFixed(2)}`;
    };

    /** Saves the current cart array back to localStorage. */
    const saveCart = () => {
        localStorage.setItem('rehobothCart', JSON.stringify(cart));
    };

    /** Calculates totals, updates the summary, and saves the cart state. */
    const updateTotals = () => {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Shipping is 0.00 if cart is empty, otherwise fixed cost
        const currentShipping = cart.length > 0 ? shippingCost : 0.00;
        const total = subtotal + currentShipping;

        // Update UI elements
        subtotalDisplay.textContent = formatCurrency(subtotal);
        shippingDisplay.textContent = formatCurrency(currentShipping);
        totalDisplay.textContent = formatCurrency(total);

        // Toggle empty cart message and button state
        if (cart.length === 0) {
            emptyMessage.classList.remove('hidden');
            checkoutButton.disabled = true;
        } else {
            emptyMessage.classList.add('hidden');
            checkoutButton.disabled = false;
        }
        
        saveCart(); // Save state after every update
    };

    // --- Rendering and Interaction ---

    /** Renders all items in the cart array to the UI. */
    const renderCart = () => {
        cartItemsContainer.innerHTML = ''; // Clear existing items
        
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.dataset.id = item.id;

            const itemHTML = `
                <div class="item-details">
                    <h3>${item.name}</h3>
                </div>
                <div class="item-controls">
                    <p class="item-price">${formatCurrency(item.price)}</p>
                    <div class="quantity-controls">
                        <button data-action="decrement" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button data-action="increment" data-id="${item.id}">+</button>
                    </div>
                    <span class="item-subtotal">${formatCurrency(item.price * item.quantity)}</span>
                </div>
            `;
            itemElement.innerHTML = itemHTML;
            cartItemsContainer.appendChild(itemElement);
        });

        updateTotals();
    };

    /** Handles quantity changes (increment/decrement/remove). */
    const handleQuantityChange = (e) => {
        const target = e.target;
        const action = target.dataset.action;
        const itemId = parseInt(target.dataset.id);

        if (action && itemId) {
            const itemIndex = cart.findIndex(item => item.id === itemId);

            if (itemIndex > -1) {
                if (action === 'increment') {
                    cart[itemIndex].quantity += 1;
                } else if (action === 'decrement') {
                    cart[itemIndex].quantity -= 1;
                    if (cart[itemIndex].quantity <= 0) {
                        // Remove item if quantity drops to zero
                        cart = cart.filter(item => item.id !== itemId);
                    }
                }
                renderCart(); // Re-render the cart after change
            }
        }
    };

    // --- Checkout Logic (Redirection) ---

    /** Redirects the user to the checkout form page. */
    const proceedToCheckout = () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Please add items before checking out.");
            return;
        }
        // Redirect to the new checkout page
        window.location.href = 'checkout.html'; 
    };

    // --- Initialization ---
    
    // Attach event listeners
    cartItemsContainer.addEventListener('click', handleQuantityChange);
    checkoutButton.addEventListener('click', proceedToCheckout);

    // Initial render of the cart when the page loads
    renderCart();
});

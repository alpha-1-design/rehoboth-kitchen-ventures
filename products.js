document.addEventListener('DOMContentLoaded', () => {
    // --- Product Data: EXPANDED LIST (28 Items using kitchen_item_X.jpg format) ---
    const products = [
        { id: 1, name: 'Premium Blender (1000W)', price: 780.00, image: 'kitchen_item_1.jpg', description: 'Powerful blender perfect for smoothies, soups, and crushing ice. A kitchen must-have.' },
        { id: 2, name: 'Smart Toaster Oven (30L)', price: 450.00, image: 'kitchen_item_2.jpg', description: 'Multifunctional oven with digital controls for baking, toasting, and reheating.' },
        { id: 3, name: '18" LED Smart TV', price: 1850.00, image: 'kitchen_item_3.jpg', description: 'Slim design with excellent HD picture quality and built-in streaming apps.' },
        { id: 4, name: 'Pressure Cooker 6L', price: 350.00, image: 'kitchen_item_4.jpg', description: 'Fast, safe, and efficient cooking for stews, beans, and rice. Saves energy.' },
        { id: 5, name: 'Air Conditioner 1.5HP Inverter', price: 3200.00, image: 'kitchen_item_5.jpg', description: 'Energy-efficient AC unit for cooling large rooms quickly and quietly.' },
        { id: 6, name: 'Electric Kettle (1.8L)', price: 150.00, image: 'kitchen_item_6.jpg', description: 'Fast boiling with automatic shut-off feature and stainless steel design.' },
        { id: 7, name: 'Microwave Oven 20L', price: 620.00, image: 'kitchen_item_7.jpg', description: 'Essential compact microwave with various settings for reheating and defrosting.' },
        { id: 8, name: 'Two-Door Refrigerator (400L)', price: 4100.00, image: 'kitchen_item_8.jpg', description: 'Large capacity refrigerator with low energy consumption and frost-free technology.' },
        { id: 9, name: 'Washing Machine (Semi-Auto)', price: 1550.00, image: 'kitchen_item_9.jpg', description: 'Affordable and reliable twin-tub washing machine for everyday laundry needs.' },
        { id: 10, name: 'Gas Cooker (4 Burner + Oven)', price: 2900.00, image: 'kitchen_item_10.jpg', description: 'Durable four-burner gas cooker with an oven and glass cover.' },
        { id: 11, name: 'Coffee Maker (12-Cup)', price: 210.00, image: 'kitchen_item_11.jpg', description: 'Programmable drip coffee machine for home or office use.' },
        { id: 12, name: 'Deep Fryer (3.5L)', price: 420.00, image: 'kitchen_item_12.jpg', description: 'Perfect for making crispy fries, chicken, and other snacks.' },
        { id: 13, name: 'Stand Mixer (5-Speed)', price: 890.00, image: 'kitchen_item_13.jpg', description: 'Heavy-duty mixer for baking, dough kneading, and whipping.' },
        { id: 14, name: 'Hand Iron (Steam)', price: 120.00, image: 'kitchen_item_14.jpg', description: 'Lightweight steam iron with ceramic soleplate for smooth gliding.' },
        { id: 15, name: 'Water Dispenser (Hot/Cold)', price: 999.00, image: 'kitchen_item_15.jpg', description: 'Provides instant access to chilled or hot drinking water.' },
        { id: 16, name: 'Table Fan (16")', price: 180.00, image: 'kitchen_item_16.jpg', description: 'Oscillating table fan with 3 speed settings for quick cooling.' },
        { id: 17, name: 'Vacuum Cleaner (Bagless)', price: 670.00, image: 'kitchen_item_17.jpg', description: 'Powerful suction vacuum cleaner with washable filter.' },
        { id: 18, name: 'Rice Cooker (5L)', price: 280.00, image: 'kitchen_item_18.jpg', description: 'Automatic rice cooker, ideal for large families, fast and efficient.' },
        { id: 19, name: 'Electric Grill (Indoor)', price: 550.00, image: 'kitchen_item_19.jpg', description: 'Smokeless indoor grill with non-stick surface for healthy cooking.' },
        { id: 20, name: 'Home Theatre System', price: 2500.00, image: 'kitchen_item_20.jpg', description: 'Surround sound system for a cinematic audio experience.' },
        { id: 21, name: 'Food Processor (7-in-1)', price: 720.00, image: 'kitchen_item_21.jpg', description: 'Chop, shred, slice, and blend with this versatile kitchen tool.' },
        { id: 22, name: 'Electric Oven (Built-in)', price: 3800.00, image: 'kitchen_item_22.jpg', description: 'Large capacity electric oven with multi-function baking modes.' },
        { id: 23, name: 'Refrigerator (Single Door 150L)', price: 2500.00, image: 'kitchen_item_23.jpg', description: 'Compact and efficient refrigerator, perfect for small apartments or dorms.' },
        { id: 24, name: 'Gas Stove (2 Burner)', price: 650.00, image: 'kitchen_item_24.jpg', description: 'Portable and durable tabletop gas stove for fast cooking.' },
        { id: 25, name: 'Microwave with Grill', price: 850.00, image: 'kitchen_item_25.jpg', description: 'Microwave oven with added grill function for browning and crisping.' },
        { id: 26, name: 'Hair Dryer (Professional)', price: 180.00, image: 'kitchen_item_26.jpg', description: 'High-speed salon-quality hair dryer with diffuser.' },
        { id: 27, name: 'Ceiling Fan (52")', price: 320.00, image: 'kitchen_item_27.jpg', description: 'Classic ceiling fan for quiet, powerful air circulation.' },
        { id: 28, name: 'Waffle Maker', price: 250.00, image: 'kitchen_item_28.jpg', description: 'Non-stick waffle maker for perfect Belgian waffles every time.' }
    ];

    // --- DOM Elements (IDs must match products.html) ---
    const productGrid = document.getElementById('product-grid');
    const searchInput = document.getElementById('search-input'); 
    const searchButton = document.getElementById('search-button');

    // --- Utility Functions ---

    /** Formats a number to Ghana Cedis (GHS) currency string. */
    const formatCurrency = (amount) => {
        return `₵${amount.toFixed(2)}`;
    };

    /** Saves the cart state to localStorage. */
    const saveCart = (cart) => {
        localStorage.setItem('rehobothCart', JSON.stringify(cart));
    };

    /** Loads the cart state from localStorage. */
    const loadCart = () => {
        return JSON.parse(localStorage.getItem('rehobothCart')) || [];
    };

    // --- Rendering and Interaction ---

    /** Renders products based on a filtered array. */
    const renderProducts = (filteredProducts) => {
        productGrid.innerHTML = ''; // Clear existing products

        if (filteredProducts.length === 0) {
            productGrid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; font-size: 1.2em; color: var(--color-accent-red);">No products match your search. Try a different keyword.</p>';
            return;
        }

        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            
            const cardHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <span class="price">${formatCurrency(product.price)}</span>
                <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
                    Add to Cart
                </button>
            `;
            card.innerHTML = cardHTML;
            productGrid.appendChild(card);
        });
    };
    
    /** Adds an item to the cart in localStorage. */
    const addToCart = (e) => {
        if (!e.target.classList.contains('add-to-cart-btn')) return;

        const button = e.target;
        const id = parseInt(button.dataset.id);
        const name = button.dataset.name;
        const price = parseFloat(button.dataset.price);
        
        let cart = loadCart();
        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        saveCart(cart);
        alert(`${name} added to cart! Total items: ${cart.reduce((sum, item) => sum + item.quantity, 0)}`);
    };

    /** Filters the product list based on the search input value. */
    const filterProducts = () => {
        const query = searchInput.value.toLowerCase().trim();
        
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
        
        renderProducts(filtered);
    };

    // --- Initialization & Event Listeners ---

    // Initial render of all products when the page loads
    renderProducts(products);
    
    // Attach the Add to Cart listener to the product grid
    productGrid.addEventListener('click', addToCart);
    
    // Real-time filtering as the user types
    searchInput.addEventListener('input', filterProducts);
    
    // Filtering when the search button is clicked
    searchButton.addEventListener('click', filterProducts);
});
// Wait until the HTML document is fully loaded before running the script
document.addEventListener('DOMContentLoaded', (event) => {

    // 1. Get references to the input field and the button using their IDs
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // 2. Add an event listener to the search button for a 'click' event
    searchButton.addEventListener('click', function() {
        
        // This runs when the button is clicked

        // Get the value typed by the user in the input field
        const searchTerm = searchInput.value;

        // Display an alert to confirm the button is working and show the search term
        if (searchTerm.trim() !== "") {
            alert('You searched for: ' + searchTerm);
            // In a real application, you would put code here to filter your product list
        } else {
            alert('Please enter a search term.');
        }
    });

    // Optional: Allow pressing "Enter" in the input field to search
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click(); // Simulate a button click when Enter is pressed
        }
    });

});

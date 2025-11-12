document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration & Elements ---
    // IMPORTANT: Use your actual WhatsApp number with country code (233)
    const whatsappNumber = "233545480074"; 
    const shippingCost = 25.00;
    
    const cart = JSON.parse(localStorage.getItem('rehobothCart')) || [];

    const summaryContainer = document.getElementById('checkout-summary');
    const form = document.getElementById('customer-info-form');
    const confirmButton = document.getElementById('confirm-whatsapp-order');

    // --- Utility Functions ---

    /** Formats a number to Ghana Cedis (GHS) currency string. */
    const formatCurrency = (amount) => {
        return `₵${amount.toFixed(2)}`;
    };

    /** Generates the HTML for the order summary based on the cart. */
    const renderSummary = () => {
        if (cart.length === 0) {
            summaryContainer.innerHTML = '<p class="error-message">Your cart is empty. Please return to the shop.</p>';
            confirmButton.disabled = true;
            return;
        }

        let subtotal = 0;
        let summaryHTML = '<h3>Cart Items:</h3>';

        cart.forEach(item => {
            const lineTotal = item.price * item.quantity;
            subtotal += lineTotal;
            summaryHTML += `
                <div class="summary-item">
                    <span>${item.name} (x${item.quantity})</span>
                    <span>${formatCurrency(lineTotal)}</span>
                </div>
            `;
        });

        const total = subtotal + shippingCost;

        // Add summary totals
        summaryHTML += `
            <div class="summary-item" style="margin-top: 10px;">
                <span>Subtotal:</span>
                <span>${formatCurrency(subtotal)}</span>
            </div>
            <div class="summary-item">
                <span>Shipping:</span>
                <span>${formatCurrency(shippingCost)}</span>
            </div>
            <div class="summary-total-line">
                <span>TOTAL:</span>
                <span>${formatCurrency(total)}</span>
            </div>
        `;
        
        summaryContainer.innerHTML = summaryHTML;
    };

    /** Handles form submission and generates the final WhatsApp message. */
    const handleCheckout = (e) => {
        e.preventDefault(); 

        if (cart.length === 0) {
             alert("Error: Cart is empty. Please add items before placing an order.");
             return;
        }

        // Gather customer data from form
        const customerData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            location: document.getElementById('location').value,
            address: document.getElementById('address').value
        };

        // Input validation (basic check for required fields)
        if (!customerData.name || !customerData.phone || !customerData.location) {
            alert("Please fill in all required fields (Name, Phone, Location) to confirm your order.");
            return;
        }

        // Generate the order text
        let subtotal = 0;
        let orderText = `*🎉 NEW REHOBOTH ORDER - CONFIRMED CHECKOUT 🎉*\n\n`;

        // 1. Customer Details
        orderText += "*--- CUSTOMER DETAILS ---*\n";
        orderText += `👤 Name: ${customerData.name}\n`;
        orderText += `📞 Phone (WhatsApp): ${customerData.phone}\n`;
        orderText += `📍 Location: ${customerData.location}\n`;
        if (customerData.address.trim()) {
            orderText += `🏠 Address/Landmark: ${customerData.address.trim()}\n`;
        }
        orderText += "\n";

        // 2. Itemized Order
        orderText += "*--- ORDER ITEMS ---*\n";
        cart.forEach((item, index) => {
            const lineTotal = item.price * item.quantity;
            subtotal += lineTotal;
            orderText += `${index + 1}. ${item.name}: ${item.quantity} x ${formatCurrency(item.price)} = ${formatCurrency(lineTotal)}\n`;
        });
        
        // 3. Totals
        const total = subtotal + shippingCost;
        orderText += "\n*--- TOTAL SUMMARY ---*\n";
        orderText += `Subtotal: ${formatCurrency(subtotal)}\n`;
        orderText += `Shipping: ${formatCurrency(shippingCost)}\n`;
        orderText += `*GRAND TOTAL: ${formatCurrency(total)}*\n\n`;
        orderText += "I am ready to proceed with payment and delivery confirmation.";
        
        // Final Action: Send via WhatsApp and Redirect
        const encodedText = encodeURIComponent(orderText);
        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

        // 1. Open the WhatsApp chat in a new tab
        window.open(whatsappLink, '_blank');
        
        // 2. Redirect the current page to the Thank You page
        window.location.href = 'thankyou.html'; 

        // 3. Clear cart data (Must be after the order text is generated)
        localStorage.removeItem('rehobothCart');
    };

    // --- Initialization ---
    renderSummary();
    form.addEventListener('submit', handleCheckout);
});

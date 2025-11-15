// ================= Constants =================
const BASE_URL = "http://localhost:8080/example/eetacbros/shop/items";

// ================= State Variables =================
let cart = [];
let coins = 1000;
currentPlayerId = 0;

// ================= API Functions =================
function getJsonItems(url) {
    return $.ajax({
        url: url,
        dataType: "json",
        method: "GET"
    });
}

const BUY_ITEM_BASE_URL = "http://localhost:8080/example/eetacbros/shop/buy";
function postJsonBuyItems(url,purchaseData) {
    return $.ajax({
        url: url,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(purchaseData),
        dataType: "json"
    });
}

// ================= Cart Functions =================

function buyCartItems() {
    if (cart.length === 0) {
        showNotification('Your cart is empty.', 'error');
        return;
    }

    // Build the purchase JSON
    const purchaseData = {
            playerId: currentPlayerId,
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                durability: item.durability,
                price: item.price,
                emoji: item.emoji,
                description: item.description
            }))
        };

    postJsonBuyItems(BUY_ITEM_BASE_URL,purchaseData)
        .done(function(data) {
        })
        .fail(function(err) {
            console.error("Error fetching data:", err);
            showNotification('Error to send the products', 'error');
}

function checkout() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (total > coins) {
        showNotification('You don\'t have enough coins to complete the purchase.', 'error');
        return;
    }

    buyCartItems();

    // Deduct coins
    coins -= total;
    updateCoinsDisplay();


    // Show success message
    showNotification(`Purchase complete! You spent ${total} coins`, 'success');

    // Clear cart
    clearCart();

    // Close cart modal
    closeCartModal();
}

// ================= Initialization =================
function initializeShop() {
    // Load products
    getJsonItems(BASE_URL)
        .done(function(data) {
            renderProducts(data);
        })
        .fail(function(err) {
            console.error("Error fetching data:", err);
            showNotification('Error al cargar los productos', 'error');
            $('#productsGrid').html('<div class="empty-cart-message">Error al cargar los productos</div>');
        });

    // Set up event handlers
    $('#cartIcon').click(openCartModal);
    $('#closeCart').click(closeCartModal);
    $('#clearCart').click(clearCart);
    $('#checkoutBtn').click(checkout);

    // Close modal when clicking outside
    $('#cartModal').click(function(e) {
        if (e.target === this) {
            closeCartModal();
        }
    });

    // Initialize cart display
    renderCart();
    updateCoinsDisplay();
}

// ================= Main =================
$(document).ready(function() {
    initializeShop();
});
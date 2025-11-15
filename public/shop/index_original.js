// index.js
// ================= Functions =================
const BASE_URL = "http://localhost:8080/example/eetacbros/items";

let cart = [];

// Function to fetch JSON data from a URL
function getJsonItems(url) {
    return jQuery.ajax({
        url: url,
        dataType: "json",
        method: "GET"
    });
}

// Function to log the items to the console
function showItemsShop() {
    getJsonItems(BASE_URL)
        .done(function(data) {
            $('#items-container').empty();
            data.forEach(function(item) {
                const itemHtml = `
                    <div class="item">
                        <div class="emoji">${item.emoji}</div>
                        <div class="name">${item.name}</div>
                        <div class="description">${item.description}</div>
                        <div class="price">$${item.price}</div>
                        <div class="durability">Durability: ${item.durability}</div>
                        <button class="add-to-cart-btn">Add to Cart</button>
                    </div>
                    <br>
                `;

                const $itemElement = $(itemHtml);

                // Attach click handler to the button
                $itemElement.find('.add-to-cart-btn').click(function() {
                    addItemToCart(item);
                });

                $('#items-container').append($itemElement);
            });
        })
        .fail(function(err) {
            console.error("Error fetching data:", err);
            $('#items-container').html("<p>Failed to load items.</p>");
        });
}

// Function to add item to cart
function addItemToCart(item) {
    cart.push(item);
    updateCartDisplay();
    console.log("Item added to cart:", item);
}

// Function to update cart display
function updateCartDisplay() {
    const cartItemsContainer = $('#cart-items');
    cartItemsContainer.empty();

    let total = 0;

    cart.forEach(function(item, index) {
        total += item.price;
        cartItemsContainer.append(`<div class="cart-item">${item.emoji} ${item.name} - ${item.price}</div>`);
    });

    $('#cart-total').text(`Total: ${total}`);
}



// ================= Main =================
$(document).ready(function() {
    showItemsShop();
});
// index.js
// ================= Functions =================
const BASE_URL = "http://localhost:8080/example/eetacbros/items";

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
            // Clear the container first
                $('#items-container').empty();
                // Loop through each item in the JSON
                data.forEach(function(item) {
                    const itemHtml = `
                        <div class="item">
                            <div class="emoji">${item.emoji}</div>
                            <div class="name">${item.name}</div>
                            <div class="description">${item.description}</div>
                            <div class="price">$${item.price}</div>
                            <div class="durability">Durability: ${item.durability}</div>
                        </div>
                    `;
                    // Append the item HTML to the container
                    $('#items-container').append(itemHtml);
                });
        })
        .fail(function(err) {
            console.error("Error fetching data:", err);
             $('#items-container').html("<p>Failed to load items.</p>");
        });
}

// ================= Main =================
$(document).ready(function() {
    showItemsShop();
});

/* JSON EXAMPLE:
WHEN I WRITE THIS URL "http://localhost:8080/example/eetacbros/items" ON THE BROWSER I GET THIS JSON
    [
         {
             "description": "Help you with your maths",
             "durability": 200,
             "emoji": "📱",
             "id": 1,
             "name": "Calculator",
             "price": 200
         },
         {
             "description": "Help you with your projects",
             "durability": 200,
             "emoji": "💻",
             "id": 2,
             "name": "Laptop",
             "price": 200
         }
    ]
 */
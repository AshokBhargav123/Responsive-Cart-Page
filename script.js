
const cartData = [
    {
        id: 1,
        image: "product1.jpg",
        title: "Product 1",
        price: 200,
        quantity: 1
    },
    {
        id: 2,
        image: "product2.jpg",
        title: "Product 2",
        price: 150,
        quantity: 2
    }
];


function formatCurrency(amount) {
    return `₹${amount.toFixed(2)}`;
}


function updateQuantity(itemId, newQuantity) {
    cartData.forEach(item => {
        if (item.id === itemId) {
            item.quantity = newQuantity;
        }
    });

    calculateTotals();
    renderCartItems();
}

// Function to remove cart item
function removeItem(itemId) {

    cartData = cartData.filter(item => item.id !== itemId);

    
    calculateTotals();
    renderCartItems();
}


function calculateTotals() {
    let subtotal = 0;

    cartData.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    document.getElementById('subtotal').textContent = formatCurrency(subtotal);
    document.getElementById('total').textContent = formatCurrency(subtotal); 
}

// Function to render cart items in the table
function renderCartItems() {
    const cartItemsList = document.getElementById('cart-items-list');
    cartItemsList.innerHTML = '';

    cartData.forEach(item => {
        const row = document.createElement('tr');

        const productCell = document.createElement('td');
        const productImage = document.createElement('img');
        productImage.src = item.image;
        productImage.alt = item.title;
        productCell.appendChild(productImage);
        productCell.appendChild(document.createTextNode(' ' + item.title));
        row.appendChild(productCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = formatCurrency(item.price);
        row.appendChild(priceCell);

        const quantityCell = document.createElement('td');
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = 1;
        quantityInput.value = item.quantity;
        quantityInput.addEventListener('change', () => {
            updateQuantity(item.id, parseInt(quantityInput.value));
        });
        quantityCell.appendChild(quantityInput);
        row.appendChild(quantityCell);

        const subtotalCell = document.createElement('td');
        subtotalCell.textContent = formatCurrency(item.price * item.quantity);
        row.appendChild(subtotalCell);

        const removeCell = document.createElement('td');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            removeItem(item.id);
        });
        removeCell.appendChild(removeButton);
        row.appendChild(removeCell);

        cartItemsList.appendChild(row);
    });
}


calculateTotals();
renderCartItems();

document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Checking out...');
});
document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const hiddenCartInput = document.getElementById('hidden-cart');

    let cartDetails = '';

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';

        const itemName = document.createElement('p');
        itemName.textContent = `Producto: ${item.title}`;

        const itemQuantity = document.createElement('p');
        itemQuantity.textContent = `Cantidad: ${item.quantity}`;

        const itemPrice = document.createElement('p');
        itemPrice.textContent = `Precio: $${item.price.toFixed(2)}`;

        itemElement.appendChild(itemName);
        itemElement.appendChild(itemQuantity);
        itemElement.appendChild(itemPrice);

        cartItemsContainer.appendChild(itemElement);

        cartDetails += `Producto: ${item.title}, Cantidad: ${item.quantity}, Precio: $${item.price.toFixed(2)}\n`;
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalElement = document.createElement('p');
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
    cartItemsContainer.appendChild(totalElement);

    cartDetails += `Total: $${total.toFixed(2)}`;

    hiddenCartInput.value = cartDetails;

    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const tel = document.getElementById('tel').value.trim();

        if (nombre === '' || email === '' || tel === '') {
            console.log('Por favor, complete todos los campos.');
        } else {
            console.log('Todos los campos están completos.');
            form.submit();
        }
    });
});
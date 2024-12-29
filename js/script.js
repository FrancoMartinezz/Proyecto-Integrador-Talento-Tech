document.addEventListener('DOMContentLoaded', () => {
    let products = [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        console.log('Datos obtenidos:', data); 
        products = data.products;
        displayProducts(products);
      })
      .catch(error => console.error('Error al obtener los productos:', error)); 
    function displayProducts(products) {
      const container = document.getElementById('products-container');
      if (!container) {
        console.error('Contenedor no encontrado');
        return;
      }
      container.style.display = 'flex';
      container.style.flexWrap = 'wrap';
      container.style.gap = '20px';
  
      products.forEach(product => {
        const card = document.createElement('div');
        card.style.border = '1px solid #ccc';
        card.style.borderRadius = '8px';
        card.style.padding = '16px';
        card.style.width = '20%';
        card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.alignItems = 'center';
        card.style.backgroundColor = '#ffffff';
        card.className = 'product-card';
  
        const title = document.createElement('h2');
        title.textContent = product.title;
        title.style.fontSize = '18px';
        title.style.marginBottom = '8px';
  
        const image = document.createElement('img');
        image.src = product.thumbnail;
        image.alt = product.title;
        image.style.width = '100%';
        image.style.height = 'auto';
        image.style.borderRadius = '8px';
        image.style.marginBottom = '8px';
  
        const price = document.createElement('p');
        price.textContent = `$${product.price}`;
        price.style.fontSize = '16px';
        price.style.marginBottom = '8px';
  
        const description = document.createElement('p');
        description.textContent = product.description;
        description.style.fontSize = '14px';
        description.style.color = '#555';
  
        const stock = document.createElement('p');
        stock.textContent = `Stock actual: ${product.stock} unidades`;
        stock.style.fontSize = '14px';
  
        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Ver más detalles';
        detailsButton.className= 'details-button';
        detailsButton.style.marginTop = '8px';
        detailsButton.addEventListener('click', () => showProductDetails(product));
  
        const buyButton = document.createElement('button');
        buyButton.textContent = 'Agregar al carrito';
        buyButton.className = 'buy-button';
        buyButton.style.marginTop = '8px';
        buyButton.addEventListener('click', () => addToCart(product));
  
        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(description);
        card.appendChild(stock);
        card.appendChild(detailsButton);
        card.appendChild(buyButton);
        container.appendChild(card);
      });
    }
  
    function showProductDetails(product) {
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      overlay.style.display = 'flex';
      overlay.style.justifyContent = 'center';
      overlay.style.alignItems = 'center';
      overlay.style.zIndex = '1000';
  
      const modal = document.createElement('div');
      modal.style.backgroundColor = '#fff';
      modal.style.padding = '20px';
      modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      modal.style.borderRadius = '8px';
      modal.style.width = '75%';
      modal.style.maxWidth = '85%';
      modal.style.maxHeight = '90%';
      modal.style.overflowY = 'auto';
  
      const modalContent = `
        <h2>${product.title}</h2>
        <img src="${product.thumbnail}" class="modal-image" alt="${product.title}" style="width: 50%; height: auto; border-radius: 8px; margin-bottom: 8px;">
        <p><strong>Precio:</strong> $${product.price}</p>
        <p><strong>Descripción:</strong> ${product.description}</p>
        <p><strong>Marca:</strong> ${product.brand}</p>
        <p><strong>Valoracion del producto:</strong> ${product.rating}</p>
        <p><strong>Dimensiones en CM:</strong> ${product.dimensions.depth} de profundidad, ${product.dimensions.height} de alto, ${product.dimensions.width} de ancho</p>
        <p><strong>Categoría:</strong> ${product.category}</p>
        <p><strong>Stock:</strong> ${product.stock} unidades
      `;
  
      modal.innerHTML = modalContent;
  
      const closeButton = document.createElement('button');
      closeButton.textContent = 'Cerrar';
      closeButton.className = 'modal-button';
      closeButton.style.marginTop = '8px';
      closeButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
      });
  
      const buyButton = document.createElement('button');
      buyButton.textContent = 'Agregar al carrito';
      buyButton.className = 'buy-button';
      buyButton.style.marginTop = '8px';
      buyButton.style.marginLeft = '20px';
      buyButton.addEventListener('click', () => {
        addToCart(product);
        document.body.removeChild(overlay);
      });
  
      modal.appendChild(closeButton);
      modal.appendChild(buyButton);
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
    }
  
    function addToCart(product) {
      const existingProduct = cart.find(item => item.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      alert('Producto añadido al carrito');
      displayCart();
    }
  
    function displayCart() {
      const existingCartContainer = document.getElementById('cart-overlay');
      if (existingCartContainer) {
        document.body.removeChild(existingCartContainer);
      }
  
      const cartContainer = document.createElement('div');
      cartContainer.id = 'cart-overlay';
      cartContainer.style.position = 'fixed';
      cartContainer.style.top = '0';
      cartContainer.style.left = '0';
      cartContainer.style.width = '100%';
      cartContainer.style.height = '100%';
      cartContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
      cartContainer.style.display = 'flex';
      cartContainer.style.justifyContent = 'center';
      cartContainer.style.alignItems = 'center';
      cartContainer.style.zIndex = '1000';
  
      const modal = document.createElement('div');
      modal.style.backgroundColor = '#fff';
      modal.style.padding = '20px';
      modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      modal.style.borderRadius = '8px';
      modal.style.width = '75%';
      modal.style.maxWidth = '85%';
      modal.style.maxHeight = '90%';
      modal.style.overflowY = 'auto';
  
      const modalContent = document.createElement('div');
      modalContent.innerHTML = '<h2>Carrito de Compras</h2>';
      if (cart.length === 0) {
        modalContent.innerHTML += '<p>Carrito Vacío</p>';
      } else {
        cart.forEach(item => {
          const cartItem = document.createElement('div');
          cartItem.className = 'cart-container';
  
          const productImage = document.createElement('img');
          productImage.src = item.thumbnail;          ;
          productImage.alt = item.name;
          productImage.className = 'product-image';

          const itemDetails = document.createElement('div');
          itemDetails.textContent = `${item.title} - $${item.price} x ${item.quantity}`;
  
          const removeButton = document.createElement('button');
          removeButton.textContent = 'Eliminar';
          removeButton.className = 'remove-button';
          removeButton.addEventListener('click', () => removeFromCart(item.id));
  
          const quantityInput = document.createElement('input');
          quantityInput.type = 'number';
          quantityInput.className = 'quantity-input';
          quantityInput.value = item.quantity;
          quantityInput.min = '1';
          quantityInput.addEventListener('change', (e) => updateQuantity(item.id, e.target.value));
  
          cartItem.appendChild(productImage);
          cartItem.appendChild(itemDetails);
          cartItem.appendChild(quantityInput);
          cartItem.appendChild(removeButton);
          modalContent.appendChild(cartItem);
        });
  
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const totalElement = document.createElement('p');
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
        modalContent.appendChild(totalElement);
      }
  
      const closeButton = document.createElement('button');
      closeButton.textContent = 'Cerrar';
      closeButton.className = 'modal-button';
      closeButton.style.marginTop = '8px';
      closeButton.addEventListener('click', () => {
        document.body.removeChild(cartContainer);
      });

      const buyButton = document.createElement('button');
      buyButton.textContent = 'Realizar compra';
      buyButton.className = 'buy-button';
      buyButton.style.marginTop = '8px';
      buyButton.style.marginLeft = '20px';
  
      modal.appendChild(modalContent);
      modal.appendChild(closeButton);
      modal.appendChild(buyButton);
      cartContainer.appendChild(modal);
      document.body.appendChild(cartContainer);
    }
  
    function removeFromCart(productId) {
      cart = cart.filter(item => item.id !== productId);
      localStorage.setItem('cart', JSON.stringify(cart));
      displayCart();
    }
  
    function updateQuantity(productId, quantity) {
      const product = cart.find(item => item.id === productId);
      if (product) {
        product.quantity = parseInt(quantity, 10);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
      }
    }
    document.getElementById('cart-button').addEventListener('click', displayCart);
  });
function goToProductDetail(productId) {
    localStorage.setItem( 'selectedProductId', productId);
    window.location.href = 'product-detail.html';
}
function loadProductDetail() {
    const productId = localstorage.getItem('selectedProductId');
    const imagePath = `assets/images/product-${productId}.png`; // Placeholder image path
    if (productId) {
        // Simulated products for demo purposes
        const products = {
            1: { title:'Product 1', description: 'This is Product 1', price: 10, img: imagePath},
            2: { title:'Product 2', description: 'This is Product 2', price: 20, img: imagePath},
            3: { title:'Product 3', description: 'This is Product 3', price: 30, img: imagePath},
            4: { title:'Product 4', description: 'This is Product 4', price: 40, img: imagePath},
            5: { title:'Product 5', description: 'This is Product 5', price: 50, img: imagePath},
            6: { title:'Product 6', description: 'This is Product 6', price: 60, img: imagePath},
        }
        const product = products[productId];
        if (product) {
            document.getElementById('product-title').textContent = product.title;
            document.getElementById('product-description').textContent = product.description;
            document.getElementById('product-price-valure').textContent = product.price;
            document.getElementById('product-img').src = product.img;
        }
    }
}
document.addEventListener('DomContentLoaded', () => {

    if (window.Location.pathname.includes('product-detail.html')) {
        loadProductDetail();
    }
}
);
function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const imagePath = `assets/images/product-${id}.png`;
    cart.push({ id, name, price, img: imagePath}); 
    localStorage.setItem('cart', JSON.stringify(cart));  
    showModal(`${name} has been added to cart!`);
}
if (window.location.pathname.includes('product-detail.html')) {
    loadProductDetail();

    // Add code below to adding event listener for "Add to Cart" button
    document.getElementById('add-to-cart-button').addEventListener('click', () => {
        const productId = localStorage.getItem('selectedProductId');
        const productTitle = document.getElementById('product-title').textContent;
        const productPrice = document.getElementById('product-price-value').textContent;
        addToCart(productId, productTitle, parseFloat(productPrice));
    });
}
function loadCartItems() {
    console.log('load cart items');
    
   
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    console.log(cart);
   
    cartContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
   // template HTML code
        cartItem.innerHTML = `
            <input type="checkbox" class="item-checkbox" data-index="${index}" >
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Quantity: 1</p>
            </div>
            <div class="cart-item-price">$${item.price}</div>
                        <input type="checkbox" class="item-checkbox" data-index="${index}" onchange="updateTotal()"> // update total will be called when checkbox is checked / unchecked

        `;
        cartContainer.appendChild(cartItem);
    });
}
function updateTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkboxes = document.querySelectorAll('.item-checkbox');
    let totalPrice = 0;

    // check if checkbox is checked
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const index = checkbox.dataset.index;
            // if checked then add price to total price
            totalPrice += cart[index].price;
        }
    });

    document.getElementById('total-price').textContent = `Total: $${totalPrice}`;
}
document.addEventListener('DOMContentLoaded', () => {
    // Will only call this function if the name of the page has cart
    if (window.location.pathname.includes('cart')) {
        loadCartItems();
    }

    // Code for other pages
})
const cart = JSON.parse(localStorage.getItem('cart'))

cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <input type="checkbox" class="item-checkbox" data-index="${index}" onchange="updateTotal()">
            <img src="${item.img}" alt="${item.name}">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>Quantity: 1</p>
            </div>
            <div class="cart-item-price">$${item.price}</div>
        `;
        cartContainer.appendChild(cartItem);
    });
    function showModal(message) {
  const modal = document.querySelector('.modal-container');
  const modalText = document.querySelector('.modal h3');
  modalText.textContent = message;
  modal.style.visibility = 'visible';
}

function hideModal(){
  const modal = document.querySelector('.modal-container');
  modal.style.visibility = 'hidden';
}

function addToCart(id, name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const imagePath = `assets/images/product-${id}.png`; // Placeholder image path
  cart.push({ id, name, price, img: imagePath}); // Add image placeholder
  localStorage.setItem('cart', JSON.stringify(cart));  
  showModal(`${name} has been added to cart!`); // call the function to show the modal
}
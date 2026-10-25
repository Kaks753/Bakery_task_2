let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartBtn = document.getElementById('cart-btn');
const cartPopover = document.getElementById('cart-popover');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountSpan = document.getElementById('cart-count');
const productCards = document.querySelectorAll('.product-card');

const toastContainer = document.createElement('div');
toastContainer.className = 'cart-toast-container';
document.body.appendChild(toastContainer);

function updateCartUI() {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountSpan.textContent = cartCount;
  
  if (cartCount > 0) {
    cartBtn.classList.add('active');
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}" role="group" aria-label="Cart item">
        <span>${item.name} x${item.quantity}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
        <div class="cart-controls">
          <button class="quantity-btn decrease" aria-label="Decrease quantity">−</button>
          <button class="quantity-btn increase" aria-label="Increase quantity">+</button>
          <button class="remove-item" aria-label="Remove item">&times;</button>
        </div>
      </div>
    `).join('');
    
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = btn.closest('.cart-item').dataset.id;
        const index = cart.findIndex(item => item.id === itemId);
        if (index !== -1) {
          const itemEl = btn.closest('.cart-item');
          itemEl.classList.add('remove_animation');
          setTimeout(() => {
            cart.splice(index, 1);
            updateCartUI();
            toast('Item removed from cart', 2000);
          }, 150);
        }
      });
    });
    
    document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemEl = btn.closest('.cart-item');
        const itemId = itemEl.dataset.id;
        const index = cart.findIndex(i => i.id === itemId);
        if (index !== -1 && cart[index].quantity > 1) {
          cart[index].quantity--;
          updateCartUI();
        }
      });
    });
    
    document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemEl = btn.closest('.cart-item');
        const itemId = itemEl.dataset.id;
        const index = cart.findIndex(i => i.id === itemId);
        if (index !== -1 && cart[index].quantity < 99) {
          cart[index].quantity++;
          updateCartUI();
        }
      });
    });
  } else {
    cartBtn.classList.remove('active');
    cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
  }
  
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
    cartBtn.classList.add('saved');
    setTimeout(() => cartBtn.classList.remove('saved'), 1500);
  } catch (e) {
    console.warn('Cart storage failed (likely quota exceeded)');
  }
}

function toast(message, duration = 3000) {
  const toastEl = document.createElement('div');
  toastEl.className = 'cart-toast';
  toastEl.textContent = message;
  toastContainer.appendChild(toastEl);
  
  setTimeout(() => {
    toastEl.classList.add('remove');
    setTimeout(() => {
      toastEl.remove();
    }, 300);
  }, duration);
}

document.addEventListener('DOMContentLoaded', () => {
  productCards.forEach(card => {
    const addToCartBtn = card.querySelector('.add-to-cart');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        const nameEl = card.querySelector('h3');
        const priceEl = card.querySelector('.price-pill');
        
        const product = {
          id: Date.now().toString(36) + Math.random().toString(36).substr(2, 5),
          name: nameEl ? nameEl.textContent.trim() : 'Unknown item',
          price: priceEl ? parseFloat(priceEl.textContent.replace('$', '')) : 0
        };
        
        const existingIndex = cart.findIndex(item => item.id === product.id);
        if (existingIndex !== -1) {
          cart[existingIndex].quantity++;
        } else {
          cart.push(product);
        }
        
        updateCartUI();
      });
    }
  });
  
  if (cart.length > 0) {
    updateCartUI();
  }
});

cartBtn.addEventListener('click', () => {
  cartPopover.classList.toggle('active');
});

window.addEventListener('click', (e) => {
  if (!cartPopover.contains(e.target) && !cartBtn.contains(e.target)) {
    cartPopover.classList.remove('active');
  }
});
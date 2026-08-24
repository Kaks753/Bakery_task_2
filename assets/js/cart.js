// Cart management system with animations, accessibility, and persistence

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = 0;
let stripe = null;
let clientSecret = 'test_client_secret';

// Selectors
const cartBtn = document.getElementById('cart-btn');
const cartPopover = document.getElementById('cart-popover');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountSpan = document.getElementById('cart-count');
const productCards = document.querySelectorAll('.product-card');

// Wrappers for added UI elements
const toastContainer = document.createElement('div');
toastContainer.className = 'cart-toast-container';
document.body.appendChild(toastContainer);

// Initialize Stripe on load
document.addEventListener('DOMContentLoaded', async () => {
  const stripeResponse = await fetch('/stripe-checkout/session.json');
  const sessionData = await stripeResponse.json();
  stripe = Stripe(sessionData.stripeKey);
  clientSecret = sessionData.clientSecret;
  
  // Load saved cart
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
  }
  
  // Add event listeners to product cards
  productCards.forEach(card => {
    const addToCartBtn = card.querySelector('.add-to-cart');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', () => {
        const product = {
          id: Math.random().toString(36).substr(2, 9),
          name: card.querySelector('h3') ? card.querySelector('h3').textContent.trim() : 'Unknown item',
          price: card.querySelector('.add-to-cart') ? card.querySelector('.add-to-cart').previousElementSibling.textContent.replace('$', '').trim() : 0
        };
        
        // Add to cart with fade animation
        const existingIndex = cart.findIndex(item => item.id === product.id);
        if (existingIndex !== -1) {
          cart[existingIndex].quantity++;
        } else {
          cart.push({...product, quantity: 1});
        }
        
        updateCartUI();
      });
    }
  });
});

// Animation utilities
function playFadeIn(element) {
  element.style.opacity = 0;
  element.style.transform = 'translateY(-5px)';
  setTimeout(() => {
    element.style.opacity = 1;
    element.style.transform = 'none';
  }, 10);
}

function playFadeOut(element) {
  element.style.opacity = 1;
  element.style.transform = 'none';
  setTimeout(() => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(-5px)';
  }, 150);
}

// Update cart UI with animations and save to localStorage
function updateCartUI() {
  cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountSpan.textContent = cartCount;
  
  if (cartCount > 0) {
    cartBtn.classList.add('active');
    // Rebuild cart items with remove buttons and quantity controls
    cartItemsContainer.innerHTML = cart.map(item => {
      const quantity = item.quantity;
      return `<div class="cart-item" data-id="${item.id}" role="group" aria-label="Cart item">
        <span>${item.name} x${item.quantity}</span>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
        <div class="cart-controls">
          <button class="quantity-btn" data-dir="-" aria-label="Decrease quantity">−</button>
          <button class="quantity-btn" data-dir="-" aria-label="Decrease quantity">−</button>
          <button class="quantity-btn" data-dir="+" aria-label="Increase quantity">+</button>
          <button class="remove-item" aria-label="Remove item">&times;</button>
        </div>
      </div>`
    ).join('');
    
    // Add remove and quantity listeners
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = btn.getAttribute('data-id');
        const index = cart.findIndex(item => item.id === itemId);
        if (index !== -1) {
          // Add fade out animation
          const itemEl = btn.closest('.cart-item');
          itemEl.classList.add('remove_animation');
          setTimeout(() => {
            cart.splice(index, 1);
            updateCartUI();
            toast('Item removed from cart', 2000);
          }, 150); // Match fadeOut duration
        }
      });
      
      // Quantity controls
      btn.closest('.cart-item').querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const dir = btn.getAttribute('data-dir');
          const itemId = btn.closest('.cart-item').getAttribute('data-id');
          const index = cart.findIndex(i => i.id === itemId);
          if (index !== -1) {
            if (dir === '+' && cart[index].quantity < 99) {
              cart[index].quantity++;
            } else if (dir === '-' && cart[index].quantity > 1) {
              cart[index].quantity--;
            }
            updateCartUI();
          }
        });
      });
    });
  } else {
    cartBtn.classList.remove('active');
    cartItemsContainer.innerHTML = '<p>Your cart is empty</p>'; 
  }
  
  // Save to localStorage (with error handling)
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
    // Visual "saved" indicator
    cartBtn.classList.add('saved');
    setTimeout(() => cartBtn.classList.remove('saved'), 1500);
  } catch (e) {
    console.warn('Cart storage failed (likely quota exceeded)');
  }
}

// Toggle cart popover
cartBtn.addEventListener('click', () => {
  cartPopover.classList.toggle('active');
  
  // If cart is empty, force re-render
  if (!cartCount && cartPopover.classList.contains('active')) {
    updateCartUI(); // Force re-render for empty state
  }
}

// Close cart when clicking outside
window.addEventListener('click', (e) => {
  if (!cartPopover.contains(e.target) && !cartBtn.contains(e.target)) {
    cartPopover.classList.remove('active');
  }
}

// Toast notifications
function toast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'cart-toast remove';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // Trigger fadeIn
  setTimeout(() => toast.classList.add('remove'), 10);
  setTimeout(() => {
    toast.classList.add('remove');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 10);
}

// Initialize Stripe Elements (unchanged)
// ... existing Stripe initialization code ...
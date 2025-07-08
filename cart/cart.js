function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart();
  const index = cart.findIndex(p => p.id === product.id);

  if (index > -1) {
    cart[index].quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  saveCart(cart);
  updateCartCount();
  showToast(`${product.name} added to cart`);
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCartItems(); // update UI
  updateCartCount();
  showToast("Item removed from cart");
}

function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) el.innerText = getCart().reduce((total, item) => total + item.quantity, 0);
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.bottom = "30px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#4e54c8";
  toast.style.color = "#fff";
  toast.style.padding = "12px 24px";
  toast.style.borderRadius = "8px";
  toast.style.fontWeight = "600";
  toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(-10px)";
  }, 100);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(0)";
    setTimeout(() => toast.remove(), 400);
  }, 2000);
}

function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  if (!cartItemsContainer) return;

  const cart = getCart();
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        <h4>${item.name}</h4>
        <p>Price: ₹${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: ₹${item.price * item.quantity}</p>
        <button class="remove-button" data-id="${item.id}">Remove</button>
      `;
      cartItemsContainer.appendChild(itemDiv);
    });

    // Attach remove button events
    document.querySelectorAll(".remove-button").forEach(button => {
      button.addEventListener("click", () => {
        const id = button.dataset.id;
        removeFromCart(id);
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  // If on cart page
  if (document.getElementById("cart-items")) {
    renderCartItems();
  }

  // If on product page
  const addButtons = document.querySelectorAll(".add-to-cart");
  addButtons.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      addToCart({ id, name, price });
    });
  });
});

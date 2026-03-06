const products = [
  { id: 1, name: "Apple", emoji: "🍎", category: "frukt", price: 18, unit: "kg" },
  { id: 2, name: "Banan", emoji: "🍌", category: "frukt", price: 22, unit: "kg" },
  { id: 3, name: "Tomat", emoji: "🍅", category: "grönsaker", price: 29, unit: "kg" },
  { id: 4, name: "Gurka", emoji: "🥒", category: "grönsaker", price: 19, unit: "st" },
  { id: 5, name: "Mjölk", emoji: "🥛", category: "mejeri", price: 16, unit: "1L" },
  { id: 6, name: "Ris", emoji: "🍚", category: "basvaror", price: 39, unit: "1kg" },
  { id: 7, name: "Mineralvatten", emoji: "💧", category: "dryck", price: 14, unit: "1.5L" },
  { id: 8, name: "Ost", emoji: "🧀", category: "mejeri", price: 54, unit: "500g" }
];

document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("productList");
  const cartItems = document.getElementById("cartItems");
  const cartBadge = document.getElementById("cartBadge");
  const cartItemCount = document.getElementById("cartItemCount");
  const cartTotal = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const checkoutSummary = document.getElementById("checkoutSummary");
  const confirmOrderBtn = document.getElementById("confirmOrderBtn");

  if (!productList || !cartItems) return;

  const state = {
    cart: []
  };

  function getVisibleProducts() {
    return products.slice();
  }

  function renderProducts() {
    const list = getVisibleProducts();

    productList.innerHTML = list.map(function (product) {
      return (
        '<div class="col-md-6">' +
        '<article class="product-card p-3">' +
        '<h3 class="h6 mb-1">' + product.emoji + ' ' + product.name + '</h3>' +
        '<p class="product-meta mb-2">' + product.category + ' • ' + product.unit + '</p>' +
        '<div class="d-flex justify-content-between align-items-center">' +
        '<strong>' + product.price + ' kr</strong>' +
        '<button class="btn btn-success btn-sm" data-add-id="' + product.id + '">Lägg i kundvagn</button>' +
        '</div>' +
        '</article>' +
        '</div>'
      );
    }).join("");
  }

  function renderCart() {
    if (state.cart.length === 0) {
      cartItems.innerHTML = '<p class="text-muted mb-0">Din kundvagn är tom just nu.</p>';
      updateCartSummary();
      return;
    }

    cartItems.innerHTML = state.cart.map(function (item) {
      return (
        '<div class="cart-item mb-2">' +
        '<div class="d-flex justify-content-between align-items-start">' +
        '<div><strong>' + item.emoji + ' ' + item.name + '</strong><br><small>' + item.price + ' kr/st</small></div>' +
        '<button class="btn btn-sm btn-outline-danger" data-remove-id="' + item.id + '">Ta bort</button>' +
        '</div>' +
        '<div class="d-flex align-items-center gap-2 mt-2">' +
        '<button class="qty-btn" data-dec-id="' + item.id + '">-</button>' +
        '<span>' + item.qty + '</span>' +
        '<button class="qty-btn" data-inc-id="' + item.id + '">+</button>' +
        '<span class="ms-auto fw-semibold">' + (item.qty * item.price) + ' kr</span>' +
        '</div>' +
        '</div>'
      );
    }).join("");

    updateCartSummary();
  }

  function updateCartSummary() {
    const itemCount = state.cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
    const total = state.cart.reduce(function (sum, item) { return sum + item.qty * item.price; }, 0);

    if (cartBadge) cartBadge.textContent = String(itemCount);
    if (cartItemCount) cartItemCount.textContent = String(itemCount);
    if (cartTotal) cartTotal.textContent = total + " kr";
    if (checkoutBtn) checkoutBtn.disabled = itemCount === 0;
  }

  function addToCart(productId) {
    const product = products.find(function (p) { return p.id === productId; });
    if (!product) return;

    const existingItem = state.cart.find(function (item) { return item.id === productId; });

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        emoji: product.emoji,
        price: product.price,
        qty: 1
      });
    }

    renderCart();
  }

  function changeQuantity(productId, change) {
    const item = state.cart.find(function (cartItem) { return cartItem.id === productId; });
    if (!item) return;

    item.qty += change;

    if (item.qty <= 0) {
      state.cart = state.cart.filter(function (cartItem) { return cartItem.id !== productId; });
    }

    renderCart();
  }

  function removeFromCart(productId) {
    state.cart = state.cart.filter(function (item) { return item.id !== productId; });
    renderCart();
  }

  function showCheckoutSummary() {
    if (!checkoutSummary) return;

    if (state.cart.length === 0) {
      checkoutSummary.innerHTML = "<p>Ingen vara i kundvagnen.</p>";
      return;
    }

    const total = state.cart.reduce(function (sum, item) { return sum + item.qty * item.price; }, 0);

    const rows = state.cart.map(function (item) {
      return "<li>" + item.emoji + " " + item.name + " x " + item.qty + " = " + (item.qty * item.price) + " kr</li>";
    }).join("");

    checkoutSummary.innerHTML = "<ul>" + rows + "</ul><p class=\"fw-bold mb-0\">Totalt: " + total + " kr</p>";
  }

  function confirmOrder() {
    if (state.cart.length === 0) return;

    state.cart = [];
    renderCart();

    if (checkoutSummary) {
      checkoutSummary.innerHTML = "<p>Tack! Din order är bekräftad.</p>";
    }

    alert("Tack! Din order är bekräftad.");
  }

  productList.addEventListener("click", function (event) {
    const addButton = event.target.closest("[data-add-id]");
    if (!addButton) return;
    addToCart(Number(addButton.getAttribute("data-add-id")));
  });

  cartItems.addEventListener("click", function (event) {
    const removeButton = event.target.closest("[data-remove-id]");
    const plusButton = event.target.closest("[data-inc-id]");
    const minusButton = event.target.closest("[data-dec-id]");

    if (removeButton) removeFromCart(Number(removeButton.getAttribute("data-remove-id")));
    if (plusButton) changeQuantity(Number(plusButton.getAttribute("data-inc-id")), 1);
    if (minusButton) changeQuantity(Number(minusButton.getAttribute("data-dec-id")), -1);
  });

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", showCheckoutSummary);
  }

  if (confirmOrderBtn) {
    confirmOrderBtn.addEventListener("click", confirmOrder);
  }

  renderProducts();
  renderCart();
});

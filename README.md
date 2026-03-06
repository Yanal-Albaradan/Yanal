# JavaScript Code Explanation

This script makes a simple grocery shop page.

- It has a fixed product list (name, emoji, category, price, unit).
- When the page loads, it gets the needed HTML elements.
- It stores cart data in `state.cart`.

## What the code does

- `renderProducts()` shows all products as cards.
- `addToCart(productId)` adds an item to cart, or increases quantity if it already exists.
- `changeQuantity(productId, change)` increases or decreases item quantity.
- `removeFromCart(productId)` removes an item from cart.
- `renderCart()` redraws the cart UI.
- `updateCartSummary()` updates item count, total price, badge, and checkout button state.
- `showCheckoutSummary()` prints order lines and total in the checkout modal.
- `confirmOrder()` clears the cart and shows confirmation text + alert.

## Interaction

- Click **"Lägg i kundvagn"** to add a product.
- Use **+ / - / Ta bort** inside cart to edit items.
- Click checkout to see summary, then confirm order.

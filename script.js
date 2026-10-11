const products = [
  {name:"Classic T-Shirt", description:"Comfortable everyday wear.", price:12500, image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"},
  {name:"Casual Hoodie", description:"Soft and stylish design.", price:25000, image:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=80"},
  {name:"Women's Top", description:"Modern and fashionable.", price:10250, image:"https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&w=700&q=80"},
  {name:"White Shirt", description:"Simple and elegant.", price:15250, image:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80"}
];
const money = amount => new Intl.NumberFormat("en-NG", {style:"currency", currency:"NGN", maximumFractionDigits:0}).format(amount);
function renderProducts(targetId, items) {
  const target = document.getElementById(targetId);
  target.innerHTML = items.map((p, i) => `
    <article class="product-card">
      <div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>
      <h3>${p.name}</h3><div class="rating" aria-label="5 out of 5 stars">★★★★★</div>
      <p class="description">${p.description}</p><div class="price">${money(p.price)}</div>
      <button class="buy-button" data-product="${p.name}">Add to cart</button>
    </article>`).join("");
}
renderProducts("latest-products", products);
renderProducts("popular-products", [products[0], {...products[1], name:"Premium Hoodie", description:"Comfort meets style."}, products[2], {...products[3], description:"Classic wardrobe essential."}]);

let cartCount = 0;
const count = document.getElementById("cart-count");
const toast = document.getElementById("toast");
let toastTimer;
document.addEventListener("click", event => {
  const button = event.target.closest("[data-product]");
  if (!button) return;
  cartCount++;
  count.textContent = cartCount;
  toast.textContent = `${button.dataset.product} added to your demo cart.`;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
});
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
const searchDialog = document.getElementById("search-dialog");
document.getElementById("search-button").addEventListener("click", () => searchDialog.showModal());
document.getElementById("cart-button").addEventListener("click", () => {
  toast.textContent = `Your demo cart contains ${cartCount} item${cartCount === 1 ? "" : "s"}.`;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
});
document.getElementById("newsletter").addEventListener("submit", event => {
  event.preventDefault();
  document.getElementById("newsletter-message").textContent = "Thanks for subscribing! (Demo only)";
  event.target.reset();
});
document.getElementById("search-input").addEventListener("input", event => {
  const query = event.target.value.toLowerCase();
  document.querySelectorAll("#latest-products .product-card").forEach(card => {
    card.hidden = !card.textContent.toLowerCase().includes(query);
  });
});

const products = [
{
    id: 1,
    name: "Laptop",
    price: 50000,
    image: "images/laptop.jpg",
    category: "Electronics",
    rating: "⭐⭐⭐⭐⭐"
},
{
    id: 2,
    name: "Phone",
    price: 20000,
    image: "images/phone.jpg",
    category: "Electronics",
    rating: "⭐⭐⭐⭐"
},
{
    id: 3,
    name: "Headphones",
    price: 2000,
    image: "images/headphones.jpg",
    category: "Accessories",
    rating: "⭐⭐⭐⭐⭐"
},
{
    id: 4,
    name: "Smart Watch",
    price: 3500,
    image: "images/watch.jpg",
    category: "Accessories",
    rating: "⭐⭐⭐⭐"
},
{
    id: 5,
    name: "Keyboard",
    price: 1500,
    image: "images/keyboard.jpg",
    category: "Accessories",
    rating: "⭐⭐⭐⭐⭐"
},
{
    id: 6,
    name: "Mouse",
    price: 800,
    image: "images/mouse.jpg",
    category: "Accessories",
    rating: "⭐⭐⭐⭐"
},
{
    id: 7,
    name: "Tablet",
    price: 18000,
    image: "images/tablet.jpg",
    category: "Electronics",
    rating: "⭐⭐⭐⭐⭐"
},
{
    id: 8,
    name: "Bluetooth Speaker",
    price: 2500,
    image: "images/speaker.jpg",
    category: "Accessories",
    rating: "⭐⭐⭐⭐"
},
{
    id: 9,
    name: "Gaming Headset",
    price: 4000,
    image: "images/gaming-headset.jpg",
    category: "Accessories",
    rating: "⭐⭐⭐⭐⭐"
},
{
    id: 10,
    name: "Monitor",
    price: 12000,
    image: "images/monitor.jpg",
    category: "Electronics",
    rating: "⭐⭐⭐⭐⭐"
}
];

let cart = {};
let wishlist = [];

const savedWishlist =
localStorage.getItem("wishlist");

if(savedWishlist){
    wishlist =
    JSON.parse(savedWishlist);
}

const savedCart = localStorage.getItem("cart");

if (savedCart) {
    cart = JSON.parse(savedCart);
}

const productsDiv = document.getElementById("products");

function displayProducts(productList) {

    productsDiv.innerHTML = "";

    productList.forEach(product => {

        const div = document.createElement("div");

        div.className = "product";

        div.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p>Price: ₹${product.price}</p>
    <p>${product.rating}</p>

    <div class="product-buttons">
        <button onclick="addToCart(${product.id})">🛒</button>

        <button onclick="addToWishlist(${product.id})">❤️</button>

        <button onclick="viewProduct(${product.id})">ℹ️</button>
    </div>
`;

        productsDiv.appendChild(div);
    });
}

displayProducts(products);

function addToCart(id) {

    if (cart[id]) {

        cart[id].quantity++;

    } else {

        const product =
        products.find(p => p.id === id);

        cart[id] = {
            ...product,
            quantity: 1
        };
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}

function displayCart() {

    const cartList =
    document.getElementById("cart");

    const totalElement =
    document.getElementById("total");

    cartList.innerHTML = "";

    let total = 0;

    Object.values(cart).forEach(item => {

        const li =
        document.createElement("li");

        li.innerHTML = `
<div class="cart-item">
    <span class="cart-name">${item.name}</span>

    <button class="minus-btn"
    onclick="decreaseQuantity(${item.id})">-</button>

    <span class="cart-qty">${item.quantity}</span>

    <button class="plus-btn"
    onclick="increaseQuantity(${item.id})">+</button>

    <span class="cart-price">
        ₹${item.price * item.quantity}
    </span>
</div>
`;

        cartList.appendChild(li);

        total += item.price * item.quantity;
    });

    totalElement.textContent =
    `Total: ₹${total}`;
    const gst = total * 0.18;
const delivery = 50;
const grandTotal = total + gst + delivery;

document.getElementById("subtotal").textContent =
`₹${total}`;

document.getElementById("gst").textContent =
`₹${gst.toFixed(0)}`;

document.getElementById("delivery").textContent =
`₹${delivery}`;

document.getElementById("grandTotal").textContent =
`₹${grandTotal.toFixed(0)}`;
}


function increaseQuantity(id) {

    cart[id].quantity++;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}

function decreaseQuantity(id) {

    cart[id].quantity--;

    if (cart[id].quantity <= 0) {
        delete cart[id];
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}

displayCart();

document.getElementById("checkoutBtn")
.addEventListener("click", checkout);

function checkout() {

    if (Object.keys(cart).length === 0) {

        alert("Your cart is empty!");
        return;
    }

    alert("Order Placed Successfully!");

    cart = {};

    localStorage.removeItem("cart");

    displayCart();
}

document.getElementById("search")
.addEventListener("input", function () {

    const searchText =
    this.value.toLowerCase();

    const filteredProducts =
    products.filter(product =>
        product.name
        .toLowerCase()
        .includes(searchText)
    );

    displayProducts(filteredProducts);
});

document.getElementById("categoryFilter")
.addEventListener("change", function () {

    const category = this.value;

    if (category === "All") {

        displayProducts(products);

    } else {

        const filteredProducts =
        products.filter(product =>
            product.category === category
        );

        displayProducts(filteredProducts);
    }
});

function viewProduct(id) {

    localStorage.setItem(
        "selectedProduct",
        id
    );

    window.location.href =
    "product.html";
}
function addToWishlist(id){

    const product =
    products.find(p => p.id === id);

    const exists =
    wishlist.find(item =>
        item.id === id
    );

    if(exists){

        alert("Already in Wishlist");

    }else{

        wishlist.push(product);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        alert("Added to Wishlist ❤️");
    }
}
function displayWishlist(){

    const wishlistDiv =
    document.getElementById("wishlist");

    wishlistDiv.innerHTML = "";

    wishlist.forEach(item => {

        const li =
        document.createElement("li");

        li.textContent =
        item.name;

        wishlistDiv.appendChild(li);
    });
}

displayWishlist();
function viewProduct(id) {
    localStorage.setItem("selectedProduct", id);
    window.location.href = "product.html";
}
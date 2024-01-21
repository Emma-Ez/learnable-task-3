const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
// Array of Product catalogue
const products = [
    { id: 1, name: 'iPhone 15 Pro Max', price: 1800000 },
    { id: 2, name: 'Samsung Galaxy S23', price: 1200000 },
    { id: 3, name: 'Xiaomi 13T', price: 550000 }
  ];

 // Storing arrays of shopping cart
let cart = [];

 // Function to display the available products
function displayProducts() {
  console.log('Products Available in stock');
  products.forEach(product => {
    console.log(`${product.id}. ${product.name} - ₦${product.price}`);
  });
}

// Adding product to the cart with flow control
function addToCart(productId, quantity = 1) {
  const product = products.find(product => product.id === productId);
  if (product) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    console.log(`${product.name} added to cart!`);
  } else {
    console.log(`Product not found.`);
  }
}

 // Viewing the cart
 function viewCart() {
  console.log('Your Cart:');
  if (cart.length === 0) {
    console.log('Your cart is empty.');
  } else {
    cart.forEach(item => {
      console.log(`${item.name} - ₦${item.price} x ${item.quantity} = ₦${item.price * item.quantity}`);
    });
    console.log(`Total: ₦${calculateTotal()}`);
  }
}
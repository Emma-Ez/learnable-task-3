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
  console.log('');
  products.forEach(product => {
    console.log(`${product.id}. ${product.name} - ₦${product.price}`);
  });
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
// Array of Product catalogue
const products = [
    { id: 1, name: 'iPhone 15 Pro Max', price: "1,800,000" },
    { id: 2, name: 'Samsung Galaxy S23', price: "1,200,000" },
    { id: 3, name: 'Xiaomi 13T', price: "550,000" }
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

  // calculating the total price in the cart
  function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

// Remove an item from the cart
function removeFromCart(productId) {
  const itemIndex = cart.findIndex(item => item.id === productId);

  if (itemIndex !== -1) {
    const removedItem = cart.splice(itemIndex, 1)[0];
    console.log(`${removedItem.name} removed from the cart.`);
  } else {
    console.log(`Product with ID ${productId} not found in the cart.`);
  }
}

// Adjust the quantity of an item in the cart
function adjustQuantity(productId, newQuantity) {
  const item = cart.find(item => item.id === productId);

  if (item) {
    item.quantity = newQuantity;
    console.log(`${item.name} quantity adjusted to ${newQuantity} in the cart.`);
  } else {
    console.log(`Product with ID ${productId} not found in the cart.`);
  }
}

 // Payment processing  logic
 function processPayment() {
  // Simulating payment processing logic
  const paymentAmount = calculateTotal();

  console.log('Processing payment...');
  console.log(`Payment successful! Total amount: ₦${paymentAmount}`);
  console.log('Thank you for your purchase!');
  cart = []; // Clears the cart after successful payment
}
 
  // User input validation
  function validateInput(input, maxId) {
    const number = parseInt(input);
  
    if (isNaN(number) || number <= 0 || number > maxId) {
      console.log('Invalid input. Please enter a valid product ID.');
      return false;
    }
  
    return true;
  }

  // Controlling the main application flow
  function main() {
    displayProducts();
  
    readline.question('Enter product ID to add to cart Or select from one of the following options\n"c" to view cart\n"r" to remove from cart \n"a" to adjust quantity\n"p" to checkout\n"q" to quit): ', (input) => {
      if (input.toLowerCase() === 'q') {
        console.log('Goodbye!, We hope you return soon');
        readline.close();
      } else if (input.toLowerCase() === 'c') {
        viewCart();
        main(); // Continue the loop after viewing cart
      } else if (input.toLowerCase() === 'r') {
        const removeId = readline.question('Enter product ID to remove from cart: ');
        if (validateInput(removeId, products.length)) {
          removeFromCart(parseInt(removeId));
        }
        main(); // Continue the loop after removing from cart
      } else if (input.toLowerCase() === 'a') {
        const adjustId = readline.question('Enter product ID to adjust quantity: ');
        const newQuantity = readline.question('Enter new quantity: ');
        if (validateInput(adjustId, products.length) && !isNaN(parseInt(newQuantity))) {
          adjustQuantity(parseInt(adjustId), parseInt(newQuantity));
        }
        main(); // Continue the loop after adjusting quantity
      } else if (input.toLowerCase() === 'p') {
        processPayment();
        readline.close();
      } else {
        if (validateInput(input, products.length)) {
          const quantity = readline.question('Enter quantity (default is 1): ');
          addToCart(parseInt(input), parseInt(quantity) || 1);
        }
        main(); // Continue the loop after adding a product
      }
    });
  }
  
  // Start the application
  main();
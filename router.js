"use strict";

// Define a Router class
class Router {
 constructor() {
  this.routes = {}; // Initialize an empty object to store routes
 }

 // Method to add routes
 addRoute(path, handler) {
  this.routes[path] = handler; // Associate the path with its corresponding handler
 }

 // Method to navigate to a specific route
 navigateTo(path) {
  const handler = this.routes[path]; // Get the handler associated with the path
  if (handler) {
   handler(); // Invoke the handler function
  } else {
   console.error(`No handler found for path: ${path}`);
  }
 }
}

// Instantiate the Router
const router = new Router();

// Add routes to the router
router.addRoute('/', () => {
 console.log('Navigated to Home page');
 // You can perform actions specific to the Home page here
});

router.addRoute('/about', () => {
 console.log('Navigated to About page');
 // You can perform actions specific to the About page here
});

router.addRoute('/products', () => {
 console.log('Navigated to Products page');
 // You can perform actions specific to the Products page here
});

router.addRoute('/contact', () => {
 console.log('Navigated to Contact page');
 // You can perform actions specific to the Contact page here
});

// Example of how to use the router
// Assuming you have navigation links in your HTML with appropriate href attributes
document.addEventListener('DOMContentLoaded', () => {
 const navigationLinks = document.querySelectorAll('a[href^="/"]');

 navigationLinks.forEach(link => {
  link.addEventListener('click', (event) => {
   event.preventDefault(); // Prevent default link behavior
   const path = link.getAttribute('href'); // Get the path from the href attribute
   router.navigateTo(path); // Navigate to the corresponding route
   history.pushState({}, '', path); // Update the browser history
  });
 });
});

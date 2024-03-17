"use strict";

(function () {
    function checkAuthentication() {
        // Check if the user is logged in or has appropriate credentials
        // This could involve checking for a token in localStorage or session storage
        // You can adjust this according to your authentication mechanism

        // For demonstration purposes, let's assume there's a 'loggedIn' flag in localStorage
        const loggedIn = localStorage.getItem('loggedIn');

        // If user is not logged in, redirect to the login page
        if (!loggedIn) {
            window.location.href = 'login.html'; // Adjust this to your actual login page URL
        }
    }

    // Check authentication on page load
    window.addEventListener("load", checkAuthentication);
})();


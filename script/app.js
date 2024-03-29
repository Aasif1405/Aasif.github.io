/*
* Name - Mohammed Aasif Mohammed Sadhak
* Student ID - 100900614
* Date of completion - 2024-03-28
* Description:  focuses on enhancing the Harmony Hub web project by improving navigation, visualizing data, facilitating event planning, and ensuring code quality through documentation, responsiveness, compatibility, and error handling.
* */

"use strict"; // Enables strict mode for better error handling

$(document).ready(function() {
    // Event handler for clicking the button to load content via AJAX
    $("#loadContentBtn").click(function() {
        // AJAX request to load content from content.html
        $.ajax({
            url: "content.html",
            success: function(result) {
                $("#content").html(result); // Display the loaded content in the designated element
            },
            error: function(xhr, status, error) {
                console.error("Error loading content:", error); // Log any errors that occur during loading
            }
        });
    });

    // Event handler for clicking the button to fetch weather data from an external API
    $("#getWeatherBtn").click(function() {
        // AJAX request to fetch weather data from the specified API
        $.ajax({
            url: "https://api.example.com/weather",
            method: "GET",
            success: function(response) {
                // Display the fetched weather information
                $("#weatherInfo").html("Current weather: " + response.weather);
            },
            error: function(xhr, status, error) {
                console.error("Error fetching weather data:", error); // Log any errors that occur during fetching
            }
        });
    });

    // Event handler for submitting the user registration form
    $("#registrationForm").submit(function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        var isValid = validateRegistrationForm(); // Validate the registration form fields
        if (isValid) {
            // If the form is valid, submit the data via AJAX
            $.ajax({
                url: "submit_registration.php",
                method: "POST",
                data: $(this).serialize(), // Serialize form data for submission
                success: function(response) {
                    alert("Registration successful!"); // Display a success message upon successful registration
                },
                error: function(xhr, status, error) {
                    console.error("Error submitting registration form:", error); // Log any errors that occur during submission
                }
            });
        }
    });

    // Event handler for submitting the login form
    $("#loginForm").submit(function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        var isValid = validateLoginForm(); // Validate the login form fields
        if (isValid) {
            // If the form is valid, submit the data via AJAX
            $.ajax({
                url: "login.php",
                method: "POST",
                data: $(this).serialize(), // Serialize form data for submission
                success: function(response) {
                    var user = JSON.parse(response); // Parse the JSON response
                    $("#welcomeMessage").html("Welcome, " + user.username + "!"); // Display a welcome message with the user's name
                },
                error: function(xhr, status, error) {
                    console.error("Error logging in:", error); // Log any errors that occur during login
                }
            });
        }
    });

    // Event handler for clicking the button to load events
    $("#loadEventsBtn").click(function() {
        // AJAX request to load events from events.json
        $.ajax({
            url: "events.json",
            method: "GET",
            success: function(response) {
                displayEvents(response.events); // Display the loaded events
            },
            error: function(xhr, status, error) {
                console.error("Error loading events:", error); // Log any errors that occur during loading
            }
        });
    });

    // Function to display events
    function displayEvents(events) {
        var eventsHtml = "";
        events.forEach(function(event) {
            // Construct HTML for each event
            eventsHtml += "<div class='event'>";
            eventsHtml += "<h3>" + event.title + "</h3>";
            eventsHtml += "<p>" + event.description + "</p>";
            eventsHtml += "<p>Date: " + event.date + "</p>";
            eventsHtml += "</div>";
        });
        $("#events").html(eventsHtml); // Display the events in the designated element
    }

    // Event handler for clicking the button to load gallery images
    $("#loadGalleryBtn").click(function() {
        // AJAX request to load gallery images from gallery.json
        $.ajax({
            url: "gallery.json",
            method: "GET",
            success: function(response) {
                displayGallery(response.images); // Display the loaded gallery images
            },
            error: function(xhr, status, error) {
                console.error("Error loading gallery images:", error); // Log any errors that occur during loading
            }
        });
    });

    // Function to display gallery images
    function displayGallery(images) {
        var galleryHtml = "";
        images.forEach(function(image) {
            // Construct HTML for each gallery image
            galleryHtml += "<img src='" + image.url + "' alt='" + image.alt + "'>";
        });
        $("#gallery").html(galleryHtml); // Display the gallery images in the designated element
    }

    // Event handler for submitting the search form
    $("#searchForm").submit(function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        var searchTerm = $("#searchInput").val(); // Get the search term from the input field
        // AJAX request to perform search
        $.ajax({
            url: "search.php",
            method: "GET",
            data: { query: searchTerm }, // Pass the search term as data
            success: function(response) {
                $("#searchResults").html(response); // Display the search results
            },
            error: function(xhr, status, error) {
                console.error("Error searching:", error); // Log any errors that occur during searching
            }
        });
    });

    // Event handler for submitting the feedback form
    $("#feedbackForm").submit(function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        // AJAX request to submit feedback data
        $.ajax({
            url: "submit_feedback.php",
            method: "POST",
            data: $(this).serialize(), // Serialize form data for submission
            success: function(response) {
                alert("Feedback submitted successfully!"); // Display a success message upon successful submission
            },
            error: function(xhr, status, error) {
                console.error("Error submitting feedback:", error); // Log any errors that occur during submission
            }
        });
    });

    // Event handler for submitting the login form
    $("#loginForm").submit(function(event) {
        // Update the login button text and href upon successful login
        $("#loginBtn").text("Log Out");
        $("#loginBtn").attr("href", "logout.php");
    });
});


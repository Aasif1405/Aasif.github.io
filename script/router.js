// router.js

"use strict";

// Router class to manage application routes and control page content without reloading
class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentRoute = null;
    }

    // Initialize the router
    init() {
        window.addEventListener('DOMContentLoaded', () => this.route());
        window.addEventListener('popstate', () => this.route());
    }

    // Navigate to a specified route
    navigate(route) {
        history.pushState({}, '', route);
        this.route();
    }

    // Route to the appropriate page based on the URL
    route() {
        const path = window.location.pathname;
        const route = this.routes.find(r => r.path === path);

        if (route) {
            this.currentRoute = route;
            this.render(route.template);
        } else {
            // Handle 404 or default route
            this.render('404.html');
        }
    }

    // Render the template of the current route
    render(template) {
        // Fetch the template content using AJAX or load it directly from a script tag
        // Example using AJAX:

        $.ajax({
            url: template,
            method: 'GET',
            success: (content) => {
                document.getElementById('content').innerHTML = content;
                if (template === 'statistics.html') {
                    drawChart();
                }
            },
            error: (xhr, status, error) => {
                console.error('Error fetching template:', error);
            }
        });
    }
}

// Define the routes
const routes = [
    { path: '/', template: 'index.html' },
    { path: '/portfolio', template: 'portfolio.html' },
    { path: '/services', template: 'services.html' },
    { path: '/team', template: 'team.html' },
    { path: '/blog', template: 'blog.html' },
    { path: '/event_planning', template: 'event_planning.html' },
    // Add the route for the Statistics page
    { path: '/statistics', template: 'statistics.html' }
    // Add more routes as needed
];

// Create a new Router instance with the defined routes
const router = new Router(routes);

// Initialize the router
router.init();

// Function to draw the chart
function drawChart() {
    // Sample data for demonstration
    const data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: 'Sales',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: [200, 300, 400, 500, 600, 700, 800]
        }]
    };

    // Chart configuration
    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    // Render the chart
    const ctx = document.getElementById('statisticsChart').getContext('2d');
    new Chart(ctx, config);
}

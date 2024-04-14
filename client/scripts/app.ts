"use strict";

(function(){

    function AuthGuard(){
        let protected_route = ["contact-list", "edit"];

        if (protected_route.indexOf(location.pathname)>-1) {
            if (!sessionStorage.getItem("user")) {
                location.href = "/login"
            }
        }
    }

    function CheckLogin(){

        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`)
        }

        $("#logout").on("click", function (){
            sessionStorage.clear();
            $("#login").html(`<a class="nav-link" href="/login"><i class="fas fa-sign-in-alt"></i> Login</a>`)
            location.href = "/login"
        });
    }

    /**
     * This function validates input for text field
     * @param input_field_id
     * @param regular_expression
     * @param error_message
     */

    function ValidateField(input_field_id:string, regular_expression:RegExp, error_message:string){

        let messageArea = $("#messageArea").hide();

        $(input_field_id).on("blur", function () {
            // Fail Validation
            let inputFieldText = $(this).val() as string;
            if(!regular_expression.test(inputFieldText)){
                // pattern fails
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            } else {
                // Pass Validation
                messageArea.removeAttr("class").hide();
            }
        });
    }


    function formValidation(){
        ValidateField("#fName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid First Name");
        ValidateField("#lName", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid Last Name");
        ValidateField("#emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address");
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid Contact Number");
    }



    function DisplayHomePage() {
        console.log("Called DisplayHomePage()");
    }

    function DisplayTeamPage() {
        console.log("Called DisplayTeamPage()");
        const learnMoreButton = document.querySelector('button[data-action="learn-more"]');
        const closeButton = document.querySelector('button[data-action="close"]');

        if (learnMoreButton && closeButton) {
            learnMoreButton.addEventListener('click', () => modalOpen());
            closeButton.addEventListener('click', () => modalClose());
        }
    }

    function modalOpen() {
        const modal = document.getElementById("myModal");
        if (modal) {
            modal.style.display = "block";
        } else {
            console.error("Modal element not found.");
        }
    }

    function modalClose(): void {
        const modal = document.getElementById("myModal");
        if (modal) {
            modal.style.display = "none";
        } else {
            console.error("Modal element not found.");
        }
    }

    function DisplayPortfolioPage(){
        console.log("Called DisplayPortfolioPage()");
        // AJAX request to fetch project data
        $.ajax({
            url: "data/projects.json",
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                console.log('Received projects:', response.projects); // Log projects to inspect its structure
                displayProjects(response.projects);
            },
            error: function (xhr, status, error) {
                console.error('Error fetching projects:', error);
            }
        });
    }

    function displayProjects(projects: any[]) {
        let projectsContainer = $('#projects-container');
        // Clear existing content
        projectsContainer.empty();

        // Create table
        let table = $('<table class="table"></table>');
        let tableHead = $('<thead><tr><th>Title</th><th>Description</th><th>Image</th></tr></thead>');
        table.append(tableHead);

        // Create table body
        let tableBody = $('<tbody></tbody>');

        // Check if projects is defined and is an array
        if (projects && Array.isArray(projects)) {
            // Iterate through each project
            projects.forEach(function(project) {

                let row = $('<tr></tr>');
                row.append('<td>' + project.title + '</td>');
                row.append('<td>' + project.description + '</td>');
                row.append('<td>' + project.image + '</td>');
                tableBody.append(row);
            });
        } else {
            console.error('projects data is not in the expected format:', projects);
        }

        // Append table body to table
        table.append(tableBody);

        // Append table to projects container
        projectsContainer.append(table);
    }

    function DisplayServicePage() {
        console.log("Called DisplayServicePage()");
    }

    function DisplayEventsPage() {
        console.log("Called DisplayEventsPage()");
        // AJAX request to fetch event data
        $.ajax({
            url: "data/events.json",
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                console.log('Received events:', response.events); // Log events to inspect its structure
                displayEvents(response.events);
            },
            error: function (xhr, status, error) {
                console.error('Error fetching events:', error);
            }
        });
    }

    function displayEvents(events: any[]) {
        let eventsContainer = $('#events-container');
        // Clear existing content
        eventsContainer.empty();

        // Create table
        let table = $('<table class="table"></table>');
        let tableHead = $('<thead><tr><th>Title</th><th>Date</th><th>Location</th><th>Description</th></tr></thead>');
        table.append(tableHead);

        // Create table body
        let tableBody = $('<tbody></tbody>');

        // Check if events is defined and is an array
        if (events && Array.isArray(events)) {
            // Iterate through each event and create table rows
            events.forEach(function(event) {
                let row = $('<tr></tr>');
                row.append('<td>' + event.title + '</td>');
                row.append('<td>' + event.date + '</td>');
                row.append('<td>' + event.location + '</td>');
                row.append('<td>' + event.description + '</td>');
                tableBody.append(row);
            });
        } else {
            console.error('Events data is not in the expected format:', events);
        }

        // Append table body to table
        table.append(tableBody);

        // Append table to events container
        eventsContainer.append(table);
    }


    function DisplayRegisterPage(){
        console.log("Called DisplayRegisterPage()");

        formValidation();

        $("#registerForm").on("click", function(){
            const username = (<HTMLInputElement>document.getElementById('username')).value;
            let messageArea = $("#messageArea");

            if (username !== "") {


                // Define a class to represent user information
                class User {
                    constructor(
                        public firstName: string,
                        public lastName: string,
                        public username: string,
                        public emailaddress: string,
                        public password: string
                    ) {
                    }
                }

                // Get input field values
                const firstName = (<HTMLInputElement>document.getElementById('fName')).value;
                const lastName = (<HTMLInputElement>document.getElementById('lName')).value;
                const emailaddress = (<HTMLInputElement>document.getElementById('emailAddress')).value;
                const password = (<HTMLInputElement>document.getElementById('password')).value;

                // Create a User object
                const user = new User(firstName, lastName, username, emailaddress, password);

                // Convert User object to JSON string
                const userJson = JSON.stringify({
                    DisplayName: user.firstName + ' ' + user.lastName,
                    EmailAddress: user.emailaddress,
                    Username: user.username,
                    Password: user.password
                });

                // Here you can do whatever you want with the JSON data
                console.log('JSON Data:', userJson);

                // For demonstration, let's assume sending JSON data to a server
                // Replace this with your actual endpoint URL and HTTP method
                fetch("data/events.json", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: userJson
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Server response:', data);
                        // Handle server response as needed
                    })
                    .catch(error => {
                        console.error('There was a problem with the fetch operation:', error);
                    });
            }else{
                $("#username").trigger("focus").trigger("select");
                messageArea
                    .addClass("alert alert-danger")
                    .text("Error: Enter a Username")
                    .show();
            }
        });

        $("#cancelButton").on("click", function(){
            document.forms[0].reset();
            location.href = "./home";
        });
    }

    function DisplayBlogPage() {
        console.log("Called DisplayBlogPage()");
    }


    function DisplayBlogPostPage(){
        console.log("Called DisplayBlog1Page()");
    }

    function DisplayGalleryPage(){
        console.log("Called DisplayGalleryPage()");

    }

    let picIndex: number = 1;

    // Next/previous controls
    function plusPic(n: number): void {
        showPic(picIndex += n);
    }

    // Thumbnail image controls
    function currentPic(n: number): void {
        showPic(picIndex = n);
    }

    function showPic(n: number): void {
        let i: number;
        let slides: HTMLCollectionOf<Element> = document.getElementsByClassName("mySlides");
        let dots: HTMLCollectionOf<Element> = document.getElementsByClassName("demo");
        let captionText: HTMLElement | null = document.getElementById("caption");
        if (n > slides.length) { picIndex = 1; }
        if (n < 1) { picIndex = slides.length; }
        for (i = 0; i < slides.length; i++) {
            (slides[i] as HTMLElement).style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            (dots[i] as HTMLElement).className = (dots[i] as HTMLElement).className.replace(" active", "");
        }
        (slides[picIndex - 1] as HTMLElement).style.display = "block";
        (dots[picIndex - 1] as HTMLElement).className += " active";
        if (captionText)
            captionText.innerHTML = (dots[picIndex - 1] as HTMLElement).getAttribute("alt") || "";

    }


    function Display404Page(){
        console.log("Called Display404Page()");
    }

    function DisplayTermsPage(){
        console.log("Called DisplayTermsPage()");
    }

    function DisplayPrivacyPage(){
        console.log("Called DisplayPrivacyPage")
    }

    function DisplayContactPage(){
        console.log("Called DisplayContactPage")
    }

    function DisplayStatisticsPage(){
        console.log("Called DisplayStatisticsPage")

        // Define an interface for the statistical data
        interface VisitorStatistics {
            date: string;
            visitors: number;
        }

        // Fetch data function
        async function fetchStatisticsData(): Promise<VisitorStatistics[]> {
            try {
                const response = await fetch('statistics.json'); // Assuming JSON file name is statistics.json
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching statistics data:', error);
                return [];
            }
        }

        // Function to render statistics chart using Chart.js
        async function renderStatisticsChart() {
            const statisticsData = await fetchStatisticsData();

            // Extracting dates and visitors from the fetched data
            const dates = statisticsData.map(data => data.date);
            const visitors = statisticsData.map(data => data.visitors);

            // Chart rendering logic using Chart.js
            const ctx = document.getElementById('statistics-chart') as HTMLCanvasElement;
        }

        // Call the function to render the statistics chart
        renderStatisticsChart();

    }


    function DisplayLoginPage(){
        console.log("Called DisplayLoginPage()");

        let messageArea = $("#messageArea");
        messageArea.hide();

        $("#loginButton").on("click", function (){

            let success = false;
            let newUser = new core.User();

            $.get("./data/users.json", function (data) {

                for(const user of data.users){

                    console.log(user);

                    let username:string = document.forms[0].username.value;
                    let password:string = document.forms[0].password.value;

                    if(username === user.Username && password === user.Password){
                        success = true;
                        newUser.fromJSON(user);
                        break;
                    }
                }

                if (success){

                    sessionStorage.setItem("user", newUser.serialize() as string);
                    messageArea.removeAttr("class").hide();
                    location.href = "./eventPlanning";
                }else{

                    $("#username").trigger("focus").trigger("select");
                    messageArea
                        .addClass("alert alert-danger")
                        .text("Error: Invalid Login Credentials")
                        .show();
                }
            });
        });

        $("#cancelButton").on("click", function(){
            document.forms[0].reset();
            location.href = "./home";
        });
    }

    function Start(){
        console.log("App Started");

        let page_id = $("body")[0].getAttribute("id");

        switch(page_id){
            case "home":
                DisplayHomePage();
                break;
            case "team":
                DisplayTeamPage();
                break;
            case "portfolio":
                DisplayPortfolioPage();
                break;
            case "services":
                DisplayServicePage();
                break;
            case "events":
                DisplayEventsPage();
                break;
            case "contact":
                DisplayContactPage();
                break;
            case "login":
                DisplayLoginPage();
                break;
            case "register":
                DisplayRegisterPage();
                break;
            case "404":
                Display404Page();
                break;
            case "blog":
                DisplayBlogPage();
                break;
            case "blogPost":
                DisplayBlogPostPage();
                break;
            case "gallery":
                DisplayGalleryPage();
                break;
            case "terms":
                DisplayTermsPage();
                break;
            case "privacy":
                DisplayPrivacyPage();
                break;
            case "statistics":
                DisplayStatisticsPage();
                break;
        }
    }
    window.addEventListener("load", Start);





})()

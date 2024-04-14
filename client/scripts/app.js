"use strict";
(function () {
    function AuthGuard() {
        let protected_route = ["contact-list", "edit"];
        if (protected_route.indexOf(location.pathname) > -1) {
            if (!sessionStorage.getItem("user")) {
                location.href = "/login";
            }
        }
    }
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`);
        }
        $("#logout").on("click", function () {
            sessionStorage.clear();
            $("#login").html(`<a class="nav-link" href="/login"><i class="fas fa-sign-in-alt"></i> Login</a>`);
            location.href = "/login";
        });
    }
    function ValidateField(input_field_id, regular_expression, error_message) {
        let messageArea = $("#messageArea").hide();
        $(input_field_id).on("blur", function () {
            let inputFieldText = $(this).val();
            if (!regular_expression.test(inputFieldText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function formValidation() {
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
        }
        else {
            console.error("Modal element not found.");
        }
    }
    function modalClose() {
        const modal = document.getElementById("myModal");
        if (modal) {
            modal.style.display = "none";
        }
        else {
            console.error("Modal element not found.");
        }
    }
    function DisplayPortfolioPage() {
        console.log("Called DisplayPortfolioPage()");
        $.ajax({
            url: "data/projects.json",
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                console.log('Received projects:', response.projects);
                displayProjects(response.projects);
            },
            error: function (xhr, status, error) {
                console.error('Error fetching projects:', error);
            }
        });
    }
    function displayProjects(projects) {
        let projectsContainer = $('#projects-container');
        projectsContainer.empty();
        let table = $('<table class="table"></table>');
        let tableHead = $('<thead><tr><th>Title</th><th>Description</th><th>Image</th></tr></thead>');
        table.append(tableHead);
        let tableBody = $('<tbody></tbody>');
        if (projects && Array.isArray(projects)) {
            projects.forEach(function (project) {
                let row = $('<tr></tr>');
                row.append('<td>' + project.title + '</td>');
                row.append('<td>' + project.description + '</td>');
                row.append('<td>' + project.image + '</td>');
                tableBody.append(row);
            });
        }
        else {
            console.error('projects data is not in the expected format:', projects);
        }
        table.append(tableBody);
        projectsContainer.append(table);
    }
    function DisplayServicePage() {
        console.log("Called DisplayServicePage()");
    }
    function DisplayEventsPage() {
        console.log("Called DisplayEventsPage()");
        $.ajax({
            url: "data/events.json",
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                console.log('Received events:', response.events);
                displayEvents(response.events);
            },
            error: function (xhr, status, error) {
                console.error('Error fetching events:', error);
            }
        });
    }
    function displayEvents(events) {
        let eventsContainer = $('#events-container');
        eventsContainer.empty();
        let table = $('<table class="table"></table>');
        let tableHead = $('<thead><tr><th>Title</th><th>Date</th><th>Location</th><th>Description</th></tr></thead>');
        table.append(tableHead);
        let tableBody = $('<tbody></tbody>');
        if (events && Array.isArray(events)) {
            events.forEach(function (event) {
                let row = $('<tr></tr>');
                row.append('<td>' + event.title + '</td>');
                row.append('<td>' + event.date + '</td>');
                row.append('<td>' + event.location + '</td>');
                row.append('<td>' + event.description + '</td>');
                tableBody.append(row);
            });
        }
        else {
            console.error('Events data is not in the expected format:', events);
        }
        table.append(tableBody);
        eventsContainer.append(table);
    }
    function DisplayRegisterPage() {
        console.log("Called DisplayRegisterPage()");
        formValidation();
        $("#registerForm").on("click", function () {
            const username = document.getElementById('username').value;
            let messageArea = $("#messageArea");
            if (username !== "") {
                class User {
                    firstName;
                    lastName;
                    username;
                    emailaddress;
                    password;
                    constructor(firstName, lastName, username, emailaddress, password) {
                        this.firstName = firstName;
                        this.lastName = lastName;
                        this.username = username;
                        this.emailaddress = emailaddress;
                        this.password = password;
                    }
                }
                const firstName = document.getElementById('fName').value;
                const lastName = document.getElementById('lName').value;
                const emailaddress = document.getElementById('emailAddress').value;
                const password = document.getElementById('password').value;
                const user = new User(firstName, lastName, username, emailaddress, password);
                const userJson = JSON.stringify({
                    DisplayName: user.firstName + ' ' + user.lastName,
                    EmailAddress: user.emailaddress,
                    Username: user.username,
                    Password: user.password
                });
                console.log('JSON Data:', userJson);
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
                })
                    .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
            }
            else {
                $("#username").trigger("focus").trigger("select");
                messageArea
                    .addClass("alert alert-danger")
                    .text("Error: Enter a Username")
                    .show();
            }
        });
        $("#cancelButton").on("click", function () {
            document.forms[0].reset();
            location.href = "./home";
        });
    }
    function DisplayBlogPage() {
        console.log("Called DisplayBlogPage()");
    }
    function DisplayBlogPostPage() {
        console.log("Called DisplayBlog1Page()");
    }
    function DisplayGalleryPage() {
        console.log("Called DisplayGalleryPage()");
    }
    let picIndex = 1;
    function plusPic(n) {
        showPic(picIndex += n);
    }
    function currentPic(n) {
        showPic(picIndex = n);
    }
    function showPic(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("demo");
        let captionText = document.getElementById("caption");
        if (n > slides.length) {
            picIndex = 1;
        }
        if (n < 1) {
            picIndex = slides.length;
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[picIndex - 1].style.display = "block";
        dots[picIndex - 1].className += " active";
        if (captionText)
            captionText.innerHTML = dots[picIndex - 1].getAttribute("alt") || "";
    }
    function Display404Page() {
        console.log("Called Display404Page()");
    }
    function DisplayTermsPage() {
        console.log("Called DisplayTermsPage()");
    }
    function DisplayPrivacyPage() {
        console.log("Called DisplayPrivacyPage");
    }
    function DisplayContactPage() {
        console.log("Called DisplayContactPage");
    }
    function DisplayStatisticsPage() {
        console.log("Called DisplayStatisticsPage");
        async function fetchStatisticsData() {
            try {
                const response = await fetch('statistics.json');
                const data = await response.json();
                return data;
            }
            catch (error) {
                console.error('Error fetching statistics data:', error);
                return [];
            }
        }
        async function renderStatisticsChart() {
            const statisticsData = await fetchStatisticsData();
            const dates = statisticsData.map(data => data.date);
            const visitors = statisticsData.map(data => data.visitors);
            const ctx = document.getElementById('statistics-chart');
        }
        renderStatisticsChart();
    }
    function DisplayLoginPage() {
        console.log("Called DisplayLoginPage()");
        let messageArea = $("#messageArea");
        messageArea.hide();
        $("#loginButton").on("click", function () {
            let success = false;
            let newUser = new core.User();
            $.get("./data/users.json", function (data) {
                for (const user of data.users) {
                    console.log(user);
                    let username = document.forms[0].username.value;
                    let password = document.forms[0].password.value;
                    if (username === user.Username && password === user.Password) {
                        success = true;
                        newUser.fromJSON(user);
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    location.href = "./eventPlanning";
                }
                else {
                    $("#username").trigger("focus").trigger("select");
                    messageArea
                        .addClass("alert alert-danger")
                        .text("Error: Invalid Login Credentials")
                        .show();
                }
            });
        });
        $("#cancelButton").on("click", function () {
            document.forms[0].reset();
            location.href = "./home";
        });
    }
    function Start() {
        console.log("App Started");
        let page_id = $("body")[0].getAttribute("id");
        switch (page_id) {
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
})();
//# sourceMappingURL=app.js.map
/*
* Name - Mohammed Aasif Mohammed Sadhak
* Student ID - 100900614
* Date of completion - 2024-01-28
*
* */



"use strict";
/*
* The DisplayHomePage function is created to show
* the content for the website's homepage
* */
(function (){
    function DisplayHomePage(){
        console.log("Called DisplayHomePage()");

    }
    /*
    * The DisplayPortfolioPage functions features the content
    * for the portfolio page of the website.
    * */
    function DisplayPortfolioPage(){
        console.log("Called DisplayPortfolioPage()");

        const projectContainer = document.getElementById('projectContainer');
        const loadMoreBtn = document.getElementById('loadMoreBtn');

        // array for the data of the projects mentioned.
        const projects = [
            { title: 'Code Hub', description: 'Join our intensive coding bootcamp designed for beginners and enthusiasts. ' +
                                                'Learn programming languages, web development, and software engineering fundamentals. ' +
                                                'Engage in hands-on projects and collaborate with mentors.',
                                                image: 'project1.jpg' },

            { title: 'Art Fest', description: 'Immerse yourself in creativity at our annual Harmony Arts Festival. ' +
                                              'Explore diverse art forms, attend workshops, and witness live performances. ' +
                                              'From visual arts to performing arts, Art Fest celebrates the vibrant artistic ' +
                                              'spirit of our community.', image: 'project2.jpg' },

            { title: 'Tech Talks', description: 'Stay updated on the latest in technology with our Tech Talks series. ' +
                                                'Industry experts and thought leaders share insights on emerging trends,' +
                                                ' innovations, and future technologies. Attend informative sessions and ' +
                                                'network with tech enthusiasts.', image: 'project3.jpg' },

        ];

        const projectsPerPage = 1;
        let projectsShown = 0;

        // function to  create a project card for the website
        function createProjectCard(project) {
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4');
            card.innerHTML = `
            <div class="card">
                <img src="images/${project.image}" class="card-img-top" alt="${project.title}">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                </div>
            </div>`;

            projectContainer.appendChild(card);
        }

        // This function is used to display more projects shown.
        function loadMoreProjects() {
            const remainingProjects = projects.slice(projectsShown, projectsShown + projectsPerPage);
            remainingProjects.forEach(createProjectCard);
            projectsShown += projectsPerPage;

            // It will not display the load more when all the all projects are displayed.
            if (projectsShown >= projects.length) {
                loadMoreBtn.style.display = 'none';
            }
        }
        loadMoreProjects();

        // Adding an event listener for the load more projects.
        loadMoreBtn.addEventListener('click', loadMoreProjects);

    }

    function DisplayTeamPage(){
        console.log("Called DisplayTeamPage()");

    }

    function DisplayServicePage(){
        console.log("Called DisplayServicePage()");

    }

    function DisplayBlogPage(){
        console.log("Called DisplayBlogPage()");

    }
    function DisplayCareersPage(){
        console.log("Called DisplayCareersPage()");




    }

    function DisplayContactUSPage(){
        console.log("Called DisplayContactUSPage()");
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            if (validateForm()) {
                displayDataInModal();

                setTimeout(redirectHome, 5000);
            }
        });

        /*
        * It validates the contact form.This functions uses if condition to check if the form
        * is empty and return true if it is valid.
        * */
        function validateForm() {
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');

            if (!fullName.value || !emailAddress.value || !subject.value || !message.value) {
                alert('Please fill in all fields.');
                return false;
            }

            return true;
        }

        //function to display the data in a modal.
        function displayDataInModal() {
            // gets the value from the form using the getElementById.
            const name = document.getElementById('fullName').value;
            const email = document.getElementById('emailAddress').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            const modalContent = `
            <div class="modal fade" id="contactModal" tabindex="-1" aria-labelledby="contactModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="contactModalLabel">Thank You</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Your message has been submitted successfully.</p>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Subject:</strong> ${subject}</p>
                            <p><strong>Message:</strong> ${message}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

            // This appends the model content to body.
            document.body.insertAdjacentHTML('beforeend', modalContent);
            const contactModal = new bootstrap.Modal(document.getElementById('contactModal'));
            contactModal.show();
        }

        function redirectHome() {
            // Redirect to the Home page
            window.location.href = 'index.html';
        }


    }


    function addCareersLink() {
        const careersNavItem = document.createElement('li');
        careersNavItem.classList.add('nav-item');
        const careersLink = document.createElement('a');
        careersLink.classList.add('nav-link');
        careersLink.textContent = 'Careers';
        careersLink.href = 'careers.html';
        careersNavItem.appendChild(careersLink);
        const navbarNav = document.querySelector('.navbar-nav');
        navbarNav.appendChild(careersNavItem);
        if (window.location.href.includes('careers.html')) {
            careersNavItem.classList.add('active');
        }

    }

    function changeBlogToNews() {
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

        // Loop through each link to find the 'Blog' link
        navLinks.forEach(link => {
            if (link.textContent.includes('Blog')) {
                // Change the text content to 'News' if 'Blog' is found
                link.textContent = 'News';
            }
        });
    }

    function Start (){
        console.log("App Started");

        switch (document.title){
            case "Harmony Hub":
                DisplayHomePage()
                break;
            case "Portfolio":
                DisplayPortfolioPage()
                break;
            case "Team":
                DisplayTeamPage()
                break;
            case "Our Services":
                DisplayServicePage()
                break;
            case "Blog":
                DisplayBlogPage()
                break;
            case "Contact US":
                DisplayContactUSPage()
                break;
            case "Careers":
                DisplayCareersPage()
                break;


        }
    }


    document.addEventListener('DOMContentLoaded', function () {
        const footerNav = document.getElementById('footerNav');
        footerNav.classList.add('footer-nav');

        const links = [
            { text: 'Privacy Policy', href: 'privacy.html' },
            { text: 'Terms of Service', href: 'terms.html' },
            { text: 'Contact', href: 'contact.html' },
        ];

        links.forEach((link, index) => {
            const anchor = document.createElement('a');
            anchor.textContent = link.text;
            anchor.href = link.href;
            anchor.classList.add('nav-link');
            footerNav.appendChild(anchor);
        });
    });



    addCareersLink();
    changeBlogToNews();
    window.addEventListener("load",Start);

})()
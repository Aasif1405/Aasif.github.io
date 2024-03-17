"use strict";

(function (){
    function DisplayHomePage(){
        console.log("Called DisplayHomePage()");

        $("#AboutUsBtn").on("click",() =>{
            location.href = "about.html";
        });

        $("main").append(`<p id="MainParagraph" class="mt-3">This is my first paragraph</p>`);
        $("body").append(`<article class="container">
                <p id="ArticleParagraph" class ="mt-3">This is my article paragraph</p></article>`)
    }

    function DisplayProductPage(){
        console.log("Called DisplayProductPage()");

    }

    function DisplayAboutUSPage(){
        console.log("Called DisplayAboutUSPage()");

    }

    function DisplayServicePage(){
        console.log("Called DisplayServicePage()");

    }

    function DisplayContactUsPage(){
        console.log("Called DisplayContactUsPage()");
        let submitButton = document.getElementById("submitButton");
        let subscribeCheckBox = document.getElementById("subscribeCheckBox");
        submitButton.addEventListener("click", function (){
            if (subscribeCheckBox.checked){
                let contact = new Contact(fullName.value,contactNumber.value,emailAddress.value);
                if(contact.serialize()){
                    let key = contact.fullName.substring(0,1)+Date.now();
                    localStorage.setItem(key,contact.serialize());
                }
            }
        })
    }

    function DisplayContactListPage(){
        console.log("Called DisplayContactListPage()");

        if(localStorage.length >0){
            let contactList = document.getElementById("contactList");
            let data = "";


            let keys = Object.keys(localStorage);
            let index = 1;
            for(const key of keys){
                let contactData = localStorage.getItem(key);
                let contact = new Contact;
                contact.deserialize(contactData);
                data += `<tr><th scope = "row" class = "text-center">${index}</th>
                        <td>${contact.fullName}</td>
                        <td>${contact.contactNumber}</td>
                        <td>${contact.emailAddress}</td>
                        <td></td>
                        <td></td>
                        </tr>`;
                index++;
            }
            contactList.innerHTML = data;


        }
    }

    function Start (){
        console.log("App Started");

        switch (document.title){
            case "Home":
                DisplayHomePage()
                break;
            case "Our Products":
                DisplayProductPage()
                break;
            case "About Us":
                DisplayAboutUSPage()
                break;
            case "Our Services":
                DisplayServicePage()
                break;
            case "Contact US":
                DisplayContactUsPage()
                break;
            case "Contact List":
                DisplayContactListPage()
                break;

        }
    }

    window.addEventListener("load",Start)
})()
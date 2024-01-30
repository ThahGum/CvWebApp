

document.write('<script src="https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js"></script>');
document.write('<script src="https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js"></script>');
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBeVtV82aC4I-9z6oe6KAc14qHngKgwdTU",
    authDomain: "cvwebapp-b667c.firebaseapp.com",
    databaseURL: "https://cvwebapp-b667c-default-rtdb.firebaseio.com",
    projectId: "cvwebapp-b667c",
    storageBucket: "cvwebapp-b667c.appspot.com",
    messagingSenderId: "769294286590",
    appId: "1:769294286590:web:62a7f643b47333fa5aafaf",
    measurementId: "G-PCPHRRTR5C"
  };
firebase.initializeApp(firebaseConfig);
const database = firebase.database();


document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.navbar ul li a');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            loadContent(href);
        });
    });

    // Load content based on URL
    function loadContent(url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.querySelector('.content').innerHTML = data;

                // If the loaded content includes the contact form, attach the form submission logic
                if (url.includes('submit.html')) {
                    attachFormSubmission();
                }
            })
            .catch(error => console.error('Error loading content:', error));
    }

    // Load default content
    loadContent('home.html');

        // Form submission logic
    // Form submission logic
    function attachFormSubmission() {
        const contactForm = document.getElementById('contactForm');
        const submittedPage = document.getElementById('submitted-page');

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Assuming a simple validation for name and email
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            if (name.trim() === '' || email.trim() === '') {
                alert('Please fill in all the details.');
                return;
            }

            // Save data to Firebase
            saveDataToFirebase(name, email);

            // Simulate form submission, you can replace this with actual form submission logic
            // For example, sending data to a server using AJAX
            // For demonstration purposes, I'll use a setTimeout to simulate an asynchronous process
            setTimeout(function () {
                // Hide the contact form
                contactForm.style.display = 'none';

                // Load and display the submit.html content
                loadContent('submit.html');
            }, 4000); // Simulating a delay of 4 seconds
        });
    }

    // Save data to Firebase
    function saveDataToFirebase(name, email) {
        const dataRef = database.ref('submissions'); // 'submissions' is the name of your Firebase collection

        // Push the data to Firebase
        dataRef.push({
            name: name,
            email: email,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    }

});

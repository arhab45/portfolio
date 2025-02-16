// Navbar Fixed
window.onscroll = function () {
    const header = document.querySelector('header')
    const FixedNav =header.offsetTop;
    const toTop = document.querySelector('#to-top');

    if (window.pageYOffset > FixedNav) {
        header.classList.add('navbar-fixed');
        toTop.classList.remove('hidden');
        toTop.classList.add('flex');
    }else {
        header.classList.remove('navbar-fixed');
        toTop.classList.remove('flex');
        toTop.classList.add('hidden');
    }
};

// Hamburger
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
});

//klik di luar hamburger
window.addEventListener('click', function (e) {
    if(e.target != hamburger && e.target != navMenu) {
        hamburger.classList.remove('hamburger-active');
        navMenu.classList.add('hidden');
    }
});

//Darkmode
const darkToggle = document.querySelector('#dark-toggle');
const html = document.querySelector('html');

darkToggle.addEventListener('click', function () {
    if (darkToggle.checked) {
        html.classList.add('dark');
        localStorage.theme = 'dark';
    } else {
        html.classList.remove('dark');
        localStorage.theme = 'light';
    }
});

//Pindahkan Posisi Toggle Sesuai Mode
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    darkToggle.checked = true;
    document.documentElement.classList.add('dark');
} else {
    darkToggle.checked = false;
}

// Contact Form
function emailSend() {

    Email.send({
        Host : "smtp.mailendo.com",
        Username : "username",
        Password : "password",
        To : 'them@website.com',
        From : "you@isp.com",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );
}    
//Contact Form
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        swal("Error", "Please fill out all fields.", "error");
        return;
    }

    // Show loading spinner
    document.getElementById('button-text').classList.add('hidden');
    document.getElementById('loading-spinner').classList.remove('hidden');

    // Create a FormData object and append the fields
    const formData = new FormData();
    formData.append('access_key', 'b3c52c61-5c43-4adb-95b2-a7bc3a15d703'); // Replace with your actual access key
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);

    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                swal("Successful", "Your message has been sent!", "success");
                // Clear the form fields
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';
            } else {
                swal("Error", "There was an error submitting the form. Please try again.", "error");
            }
            // Hide loading spinner
            document.getElementById('button-text').classList.remove('hidden');
            document.getElementById('loading-spinner').classList.add('hidden');
        })
        .catch(error => {
            console.error('Error!', error.message);
            swal("Error", "There was an error submitting the form. Please try again.", "error");
            // Hide loading spinner
            document.getElementById('button-text').classList.remove('hidden');
            document.getElementById('loading-spinner').classList.add('hidden');
        });
});


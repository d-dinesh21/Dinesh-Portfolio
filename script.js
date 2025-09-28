// -------------------- Form Submission --------------------
const form = document.getElementById('stayForm');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect form data
    const data = new FormData(form);
    const object = {};
    data.forEach((value, key) => object[key] = value);

    // Send to Google Apps Script Web App
    fetch('https://script.google.com/macros/s/AKfycbyyGn-26rz2lzWyKYoriMTmJyGh4mQvwmZqvAkTKLNVAsT4412CC8Wully0f8Ql6v5L/exec', {  // <-- Replace with your Web App URL
        method: 'POST',
        body: new URLSearchParams(object)
    })
    .then(response => response.json())
    .then(result => {
        if(result.result === "success") {
            alert('Thank you! Your message has been sent.');
            form.reset();
        } else {
            alert('Oops! Something went wrong.');
        }
    })
    .catch(err => alert('Oops! Something went wrong.'));
});

// -------------------- Skills Section Animation --------------------
document.addEventListener('DOMContentLoaded', () => {
    const skills = document.querySelectorAll('.mb-3');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                // Animate label
                const label = entry.target.querySelector('.skill-label');
                if(label) label.classList.add('visible');

                // Animate progress bar
                const bar = entry.target.querySelector('.progress-bar');
                if(bar) bar.style.width = bar.getAttribute('data-width');
            }
        });
    }, { threshold: 0.5 });

    skills.forEach(skill => observer.observe(skill));
});

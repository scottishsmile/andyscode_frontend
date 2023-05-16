// https://getbootstrap.com/docs/5.2/forms/validation/
// This stops the form from submitting if the bootstrap validation is not correct.
// So we can display out error mesages.


// Apply the needs-validation to the form class
// Apply no validate as well, to stop the browser doing it instead
// <form action="/api/login-form" method="post" className="needs-validation" novalidate>



(() => {
    'use strict'
    
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
    
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }
    
        form.classList.add('was-validated')
        }, false)
    })
    })()
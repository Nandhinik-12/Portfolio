$(document).ready(function() {
    // Navbar shrink on scroll
    $(window).on("scroll", function() {
        if($(this).scrollTop() > 90) {
            $(".navbar").addClass("navbar-shrink");
        } else {
            $(".navbar").removeClass("navbar-shrink");
        }
    });
  
    // Smooth scrolling for navigation links
    $('a[href*="#"]').on('click', function(e) {
        e.preventDefault();
        
        $('html, body').animate(
            {
                scrollTop: $($(this).attr('href')).offset().top - 70,
            },
            500,
            'linear'
        );
    });

    // Active nav link highlighting
    $(window).scroll(function() {
        var scrollDistance = $(window).scrollTop() + 72;
        
        $('section').each(function(i) {
            if ($(this).position().top <= scrollDistance) {
                $('.nav-link.active').removeClass('active');
                $('.nav-link[data-scroll-nav="' + $(this).data('scroll-index') + '"]').addClass('active');
            }
        });
    }).scroll();

    // Skills animation
    $(window).scroll(function() {
        var hT = $(".skills").offset().top;
        var hH = $(".skills").outerHeight();
        var wH = $(window).height();
        var wS = $(this).scrollTop();
  
        if(wS > (hT + hH - 1.4 * wH)) {
            $('.skill-bar').each(function() {
                $(this).animate({
                    width: $(this).attr('data-percent')
                }, 2000);
            });
        }
    });
  
    // Close mobile menu when clicking a link
    $(".nav-link").on("click", function() {
        $(".navbar-collapse").collapse("hide");
    });
  
    // Dark/Light mode toggle
    const toggleSwitch = document.querySelector('#theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    // Set initial theme and image
    document.documentElement.setAttribute('data-theme', currentTheme);
    toggleSwitch.src = currentTheme === 'light' ? 'image1.png' : 'image2.png';
  
    function switchTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Update theme and image
        document.documentElement.setAttribute('data-theme', newTheme);
        toggleSwitch.src = newTheme === 'light' ? 'image1.png' : 'image2.png';
        localStorage.setItem('theme', newTheme);
    }
  
    toggleSwitch.addEventListener('click', switchTheme);

    // Contact form handling
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = $('#contact-name').val().trim();
        const email = $('#contact-email').val().trim();
        const subject = $('#contact-subject').val().trim();
        const message = $('#contact-message').val().trim();

        // Basic validation
        if (!name || !email || !message) {
            $('#form-status').html('<div class="alert alert-danger">Please fill in all required fields</div>');
            return;
        }

        // Email validation
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            $('#form-status').html('<div class="alert alert-danger">Please enter a valid email address</div>');
            return;
        }

        // Log form data (in a real app, this would be an AJAX call)
        console.log('Form submitted:', {name, email, subject, message});
        
        // Show success message
        $('#form-status').html('<div class="alert alert-success">Message sent successfully!</div>');
        
        // Reset form
        this.reset();
    });
});
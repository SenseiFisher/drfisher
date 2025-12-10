// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add scroll padding for sticky header
    const header = document.querySelector('.site-header');
    if (header) {
        const headerHeight = header.offsetHeight;
        document.documentElement.style.scrollPaddingTop = `${headerHeight}px`;
    }

    // Mobile menu toggle (if needed in future)
    // You can add a hamburger menu for mobile devices here
});

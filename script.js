document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-item.active');
            
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
                currentlyActive.querySelector('.accordion-content').style.maxHeight = null;
            }

            item.classList.toggle('active');
            const content = item.querySelector('.accordion-content');
            
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // Countdown Timer logic (15 minutes looping or fixed)
    const timeDisplay = document.getElementById('time');
    let timeInSeconds = 14 * 60 + 59; // 14 mins 59 secs

    function updateTimer() {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        
        timeDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        
        if (timeInSeconds > 0) {
            timeInSeconds--;
        } else {
            // Optional: reset timer or keep it at 00:00
            timeInSeconds = 15 * 60; // reset to 15 mins
        }
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    // Intersection Observer for fade-in animations on scroll
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Ripple Effect on buttons
    const buttons = document.querySelectorAll('.ripple');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            
            let ripples = document.createElement('span');
            ripples.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                transform: translate(-50%, -50%);
                pointer-events: none;
                border-radius: 50%;
                animation: animateRipple 1s linear infinite;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.appendChild(ripples);
            setTimeout(() => {
                ripples.remove();
            }, 1000);
        });
    });
});

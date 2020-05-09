/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const navigationList = document.querySelector('nav ul');
const offset = document.querySelector('.offset');
const remFactor = parseFloat(getComputedStyle(document.querySelector('body'))['font-size']);
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the navigation
function buildNavigationMenu() {
    const fragment = document.createDocumentFragment();
    for (const section of sections) {
        const sectionTitle = section.querySelector('h2');
        const newSectionHeading = document.createElement('li');
        newSectionHeading.textContent = sectionTitle.innerText;
        fragment.appendChild(newSectionHeading);
        navigationList.appendChild(fragment);
    }

    navigationList.querySelectorAll('li')[0].classList.add('highlighted-menu-item');
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNavigationMenu();

// Scroll to section on link click
navigationList.addEventListener('click', scrollToSection)

function scrollToSection(event) {
    sectionTitle = event.target.textContent;
    
    for (const section of sections) {
        if (sectionTitle == section.querySelector('h2').textContent) {
            const windowWidthInRem = window.innerWidth / remFactor;
            
            let yOffset = 0;
            if (windowWidthInRem <= 35) {
                yOffset = 9 * remFactor; 
                console.log('small' + yOffset);
            } 
            const y = section.getBoundingClientRect().top + window.pageYOffset - yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        }
    }
}

// Hide/show header on scroll
window.onscroll = function(e) { 
    const header = document.querySelector('header');
    let scrollY = window.pageYOffset || document.documentElement.scrollTop;
    let height = -header.clientHeight;
    header.style.transition = 'transform 0.1s';

    scrollY <= this.lastScroll 
    ? header.style.transform = 'translateY(0px)'
    : header.style.transform = 'translateY(' + height + 'px)'

    this.lastScroll = scrollY ;
}

// Add class to highlight the active section and the active menu item
window.onscroll = function(e) {
    let sectionIndex = 0;
    let minDistance = 10000;
    for (let i = 0; i < sections.length; i++) {
        let sectionDistance = Math.abs(sections[i].getBoundingClientRect().top);
        if (sectionDistance < minDistance) {
            minDistance = sectionDistance;
            sectionIndex = i;
        }
    }

    for (let i = 0; i < sections.length; i++) {
        if (i == sectionIndex) {
            sections[i].classList.add('your-active-class');
            navigationList.querySelectorAll('li')[i].classList.add('highlighted-menu-item');
        } else {
            sections[i].classList.remove('your-active-class');
            navigationList.querySelectorAll('li')[i].classList.remove('highlighted-menu-item');
        }
    }
}
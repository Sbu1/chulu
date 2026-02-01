// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Mobile dropdown toggle
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const totalSlides = slides.length;

// Create dots
const dotsContainer = document.querySelector('.slider-dots');
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.slider-dot');

function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (n + totalSlides) % totalSlides;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

// Slider controls
document.querySelector('.slider-btn.next').addEventListener('click', nextSlide);
document.querySelector('.slider-btn.prev').addEventListener('click', prevSlide);

// Auto-advance slider
let sliderInterval = setInterval(nextSlide, 5000);

// Pause auto-advance on hover
const heroSlider = document.querySelector('.hero-slider');
heroSlider.addEventListener('mouseenter', () => {
    clearInterval(sliderInterval);
});

heroSlider.addEventListener('mouseleave', () => {
    sliderInterval = setInterval(nextSlide, 5000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(15, 20, 25, 0.98)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--bg-dark)';
        navbar.style.backdropFilter = 'none';
    }
    
    lastScroll = currentScroll;
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards
const cards = document.querySelectorAll('.division-card, .about-card, .project-card, .news-card');
cards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Stagger animation for cards in the same section
const sections = document.querySelectorAll('.divisions-grid, .about-grid, .projects-grid, .news-grid');
sections.forEach(section => {
    const sectionCards = section.querySelectorAll('.division-card, .about-card, .project-card, .news-card');
    sectionCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = 'var(--accent-green)';
        
        setTimeout(() => {
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'var(--accent-color)';
            submitBtn.disabled = false;
        }, 2000);
    }, 1500);
});

// Division card hover effects
const divisionCards = document.querySelectorAll('.division-card');
divisionCards.forEach((card, index) => {
    const colors = [
        'var(--accent-color)',
        'var(--accent-blue)',
        'var(--accent-green)',
        'var(--accent-orange)',
        '#9b59b6',
        '#e91e63'
    ];
    
    card.addEventListener('mouseenter', () => {
        card.style.setProperty('--card-color', colors[index % colors.length]);
    });
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard navigation for slider
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        clearInterval(sliderInterval);
        sliderInterval = setInterval(nextSlide, 5000);
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        clearInterval(sliderInterval);
        sliderInterval = setInterval(nextSlide, 5000);
    }
});

// Touch swipe for mobile slider
let touchStartX = 0;
let touchEndX = 0;

heroSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

heroSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextSlide();
        } else {
            prevSlide();
        }
        clearInterval(sliderInterval);
        sliderInterval = setInterval(nextSlide, 5000);
    }
}

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.textContent = footerYear.textContent.replace('2026', currentYear);
}

// Add active state to current section in nav
const sections_nav = document.querySelectorAll('section[id]');

function highlightNav() {
    const scrollY = window.pageYOffset;
    
    sections_nav.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 200;
        const sectionId = current.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNav);

console.log('🏗️ Ilembe Group website loaded successfully!');

// ========================================
// AUTHENTICATION SYSTEM
// ========================================

// Default credentials (CHANGE THESE!)
let credentials = {
    username: 'admin',
    password: 'ilembe2026'
};

// Load custom credentials from localStorage if they exist
if (localStorage.getItem('ilembeCredentials')) {
    credentials = JSON.parse(localStorage.getItem('ilembeCredentials'));
}

// Save credentials
function saveCredentials() {
    localStorage.setItem('ilembeCredentials', JSON.stringify(credentials));
}

// Check if user is logged in
let isLoggedIn = sessionStorage.getItem('ilembeLoggedIn') === 'true';

// Login Modal Elements
const loginModal = document.getElementById('loginModal');
const closeLogin = document.getElementById('closeLogin');
const loginBtn = document.getElementById('loginBtn');
const adminUsername = document.getElementById('adminUsername');
const adminPassword = document.getElementById('adminPassword');
const loginError = document.getElementById('loginError');

// Show login modal
function showLoginModal() {
    loginModal.classList.add('active');
    adminUsername.value = '';
    adminPassword.value = '';
    loginError.classList.remove('active');
    adminUsername.focus();
}

// Close login modal
closeLogin.addEventListener('click', () => {
    loginModal.classList.remove('active');
});

// Close on outside click
loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
    }
});

// Login function
loginBtn.addEventListener('click', () => {
    const username = adminUsername.value.trim();
    const password = adminPassword.value.trim();
    
    if (!username || !password) {
        showLoginError('Please enter both username and password');
        return;
    }
    
    if (username === credentials.username && password === credentials.password) {
        isLoggedIn = true;
        sessionStorage.setItem('ilembeLoggedIn', 'true');
        loginModal.classList.remove('active');
        adminPanel.classList.add('active');
        renderNewsAdmin();
        renderProjectsAdmin();
        loadContactInfo();
    } else {
        showLoginError('Invalid username or password');
        adminPassword.value = '';
    }
});

// Show login error
function showLoginError(message) {
    loginError.textContent = message;
    loginError.classList.add('active');
    setTimeout(() => {
        loginError.classList.remove('active');
    }, 3000);
}

// Allow Enter key to login
adminPassword.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginBtn.click();
    }
});

adminUsername.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        adminPassword.focus();
    }
});

// Logout function
function logout() {
    isLoggedIn = false;
    sessionStorage.removeItem('ilembeLoggedIn');
    adminPanel.classList.remove('active');
    alert('You have been logged out successfully');
}

// Change Username
document.getElementById('changeUsername').addEventListener('click', () => {
    const newUsername = document.getElementById('newUsername').value.trim();
    
    if (!newUsername) {
        alert('Please enter a new username');
        return;
    }
    
    if (newUsername.length < 4) {
        alert('Username must be at least 4 characters long');
        return;
    }
    
    if (confirm('Are you sure you want to change your username?')) {
        credentials.username = newUsername;
        saveCredentials();
        document.getElementById('newUsername').value = '';
        showSuccessMessage('Username changed successfully! Please use your new username next time you login.');
    }
});

// Change Password
document.getElementById('changePassword').addEventListener('click', () => {
    const currentPassword = document.getElementById('currentPassword').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    
    if (!currentPassword || !newPassword || !confirmPassword) {
        alert('Please fill in all password fields');
        return;
    }
    
    if (currentPassword !== credentials.password) {
        alert('Current password is incorrect');
        document.getElementById('currentPassword').value = '';
        return;
    }
    
    if (newPassword.length < 6) {
        alert('New password must be at least 6 characters long');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        alert('New passwords do not match');
        document.getElementById('confirmPassword').value = '';
        return;
    }
    
    if (confirm('Are you sure you want to change your password?')) {
        credentials.password = newPassword;
        saveCredentials();
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        showSuccessMessage('Password changed successfully! Please use your new password next time you login.');
    }
});

// Logout from admin panel
document.getElementById('logoutBtnAdmin').addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        logout();
    }
});

// ========================================
// CONTENT MANAGEMENT SYSTEM (CMS)
// ========================================

// Initialize content storage
let contentData = {
    news: [
        { id: 1, date: 'Jan 2026', title: 'New Construction Project Launch', description: 'Ilembe Group announces major new development in the Durban area.' },
        { id: 2, date: 'Dec 2025', title: 'Excellence in Logistics Award', description: 'Recognized for outstanding service delivery in the logistics sector.' },
        { id: 3, date: 'Nov 2025', title: 'Training Program Expansion', description: 'New training initiatives launched to empower more workers.' }
    ],
    projects: [
        { id: 1, title: 'Bellair', description: 'Major construction project in Bellair area', image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80' },
        { id: 2, title: 'Cato Manor', description: 'Community development project', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80' },
        { id: 3, title: 'KwaMashu Hostels Ward 40', description: 'Hostel renovation and upgrade', image: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800&q=80' },
        { id: 4, title: 'Reservoir Hills', description: 'Residential construction project', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
        { id: 5, title: 'Bridge City Housing', description: 'Large scale housing development', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },
        { id: 6, title: 'UKZN Student Accommodation', description: 'University student housing project', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80' }
    ],
    contact: {
        location: 'Durban, South Africa',
        email: 'info@ilembegroup.co.za',
        phone: '+27 (0)31 XXX XXXX'
    }
};

// Load data from localStorage if available
if (localStorage.getItem('ilembeContent')) {
    contentData = JSON.parse(localStorage.getItem('ilembeContent'));
}

// Save data to localStorage
function saveContent() {
    localStorage.setItem('ilembeContent', JSON.stringify(contentData));
}

// Admin Panel Toggle
const adminToggle = document.getElementById('adminToggle');
const adminPanel = document.getElementById('adminPanel');
const closeAdmin = document.getElementById('closeAdmin');

adminToggle.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!isLoggedIn) {
        showLoginModal();
        return;
    }
    
    // User is logged in, show admin panel
    adminPanel.classList.add('active');
    renderNewsAdmin();
    renderProjectsAdmin();
    loadContactInfo();
});

closeAdmin.addEventListener('click', () => {
    adminPanel.classList.remove('active');
});

// Close admin panel when clicking outside
adminPanel.addEventListener('click', (e) => {
    if (e.target === adminPanel) {
        adminPanel.classList.remove('active');
    }
});

// Admin Tabs
const adminTabs = document.querySelectorAll('.admin-tab');
const adminContents = document.querySelectorAll('.admin-content');

adminTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        adminTabs.forEach(t => t.classList.remove('active'));
        adminContents.forEach(c => c.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(`${targetTab}-content`).classList.add('active');
    });
});

// ========================================
// NEWS MANAGEMENT
// ========================================

function renderNews() {
    const newsGrid = document.querySelector('.news-grid');
    newsGrid.innerHTML = '';
    
    contentData.news.forEach(item => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.innerHTML = `
            <div class="news-date">${item.date}</div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;
        newsGrid.appendChild(newsCard);
    });
}

function renderNewsAdmin() {
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = '';
    
    contentData.news.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'admin-item';
        newsItem.innerHTML = `
            <div class="admin-item-content">
                <div class="admin-item-date">${item.date}</div>
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
            <div class="admin-item-actions">
                <button class="delete-btn" onclick="deleteNews(${item.id})">Delete</button>
            </div>
        `;
        newsList.appendChild(newsItem);
    });
}

document.getElementById('addNews').addEventListener('click', () => {
    const title = document.getElementById('newsTitle').value.trim();
    const date = document.getElementById('newsDate').value.trim();
    const description = document.getElementById('newsDescription').value.trim();
    
    if (!title || !date || !description) {
        alert('Please fill in all fields');
        return;
    }
    
    const newItem = {
        id: Date.now(),
        title,
        date,
        description
    };
    
    contentData.news.unshift(newItem);
    saveContent();
    renderNews();
    renderNewsAdmin();
    
    // Clear form
    document.getElementById('newsTitle').value = '';
    document.getElementById('newsDate').value = '';
    document.getElementById('newsDescription').value = '';
    
    showSuccessMessage('News added successfully!');
});

function deleteNews(id) {
    if (confirm('Are you sure you want to delete this news item?')) {
        contentData.news = contentData.news.filter(item => item.id !== id);
        saveContent();
        renderNews();
        renderNewsAdmin();
        showSuccessMessage('News deleted successfully!');
    }
}

// ========================================
// PROJECTS MANAGEMENT
// ========================================

function renderProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';
    
    contentData.projects.forEach(item => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        const bgImage = item.image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80';
        projectCard.innerHTML = `
            <div class="project-image" style="background: linear-gradient(135deg, rgba(20,30,48,0.7), rgba(36,59,85,0.5)), url('${bgImage}') center/cover;"></div>
            <div class="project-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

function renderProjectsAdmin() {
    const projectsList = document.getElementById('projectsList');
    projectsList.innerHTML = '';
    
    contentData.projects.forEach(item => {
        const projectItem = document.createElement('div');
        projectItem.className = 'admin-item';
        projectItem.innerHTML = `
            <div class="admin-item-content">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                ${item.image ? `<small style="color: var(--text-gray);">Image: ${item.image}</small>` : ''}
            </div>
            <div class="admin-item-actions">
                <button class="delete-btn" onclick="deleteProject(${item.id})">Delete</button>
            </div>
        `;
        projectsList.appendChild(projectItem);
    });
}

document.getElementById('addProject').addEventListener('click', () => {
    const title = document.getElementById('projectTitle').value.trim();
    const description = document.getElementById('projectDescription').value.trim();
    const image = document.getElementById('projectImage').value.trim();
    
    if (!title || !description) {
        alert('Please fill in title and description');
        return;
    }
    
    const newItem = {
        id: Date.now(),
        title,
        description,
        image: image || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80'
    };
    
    contentData.projects.push(newItem);
    saveContent();
    renderProjects();
    renderProjectsAdmin();
    
    // Clear form
    document.getElementById('projectTitle').value = '';
    document.getElementById('projectDescription').value = '';
    document.getElementById('projectImage').value = '';
    
    showSuccessMessage('Project added successfully!');
});

function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        contentData.projects = contentData.projects.filter(item => item.id !== id);
        saveContent();
        renderProjects();
        renderProjectsAdmin();
        showSuccessMessage('Project deleted successfully!');
    }
}

// ========================================
// CONTACT INFO MANAGEMENT
// ========================================

function loadContactInfo() {
    document.getElementById('contactLocation').value = contentData.contact.location;
    document.getElementById('contactEmail').value = contentData.contact.email;
    document.getElementById('contactPhone').value = contentData.contact.phone;
}

function updateContactDisplay() {
    const contactDetails = document.querySelector('.contact-details');
    contactDetails.innerHTML = `
        <div class="contact-item">
            <span class="contact-icon">📍</span>
            <div>
                <strong>Location</strong>
                <p>${contentData.contact.location}</p>
            </div>
        </div>
        <div class="contact-item">
            <span class="contact-icon">📧</span>
            <div>
                <strong>Email</strong>
                <p>${contentData.contact.email}</p>
            </div>
        </div>
        <div class="contact-item">
            <span class="contact-icon">📞</span>
            <div>
                <strong>Phone</strong>
                <p>${contentData.contact.phone}</p>
            </div>
        </div>
    `;
}

document.getElementById('updateContact').addEventListener('click', () => {
    contentData.contact = {
        location: document.getElementById('contactLocation').value.trim(),
        email: document.getElementById('contactEmail').value.trim(),
        phone: document.getElementById('contactPhone').value.trim()
    };
    
    saveContent();
    updateContactDisplay();
    showSuccessMessage('Contact information updated successfully!');
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

function showSuccessMessage(message) {
    const activeContent = document.querySelector('.admin-content.active');
    const existingMessage = activeContent.querySelector('.success-message');
    
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    activeContent.insertBefore(successDiv, activeContent.firstChild);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Initialize content on page load
renderNews();
renderProjects();
updateContactDisplay();

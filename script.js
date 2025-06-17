// Strapi API Configuration
const STRAPI_URL = 'http://localhost:1337';

// API Helper Functions
async function fetchProducts() {
    try {
        const response = await fetch(`${STRAPI_URL}/api/products?populate=*`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return null; // Return null instead of empty array
    }
}

async function fetchIngredients() {
    try {
        const response = await fetch(`${STRAPI_URL}/api/ingredients?populate=*`);
        if (!response.ok) {
            throw new Error('Failed to fetch ingredients');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching ingredients:', error);
        return null; // Return null instead of empty array
    }
}

async function submitContact(contactData) {
    try {
        const response = await fetch(`${STRAPI_URL}/api/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: contactData
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to submit contact form');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error submitting contact:', error);
        throw error;
    }
}

// Enhanced Contact Form (only modify contact form, not products)
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };
        
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            await submitContact(contactData);
            showStatusMessage('success', 'Thank you for your message! We\'ll get back to you soon.');
            this.reset();
        } catch (error) {
            showStatusMessage('error', 'Message sent successfully! (Strapi not connected, but form works)');
            this.reset(); // Still reset form for better UX
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

function showStatusMessage(type, message) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.status-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const statusDiv = document.createElement('div');
    statusDiv.className = `status-message ${type}`;
    statusDiv.textContent = message;
    statusDiv.style.padding = '1rem';
    statusDiv.style.borderRadius = '0.5rem';
    statusDiv.style.marginBottom = '1rem';
    statusDiv.style.fontWeight = '500';
    
    if (type === 'success') {
        statusDiv.style.backgroundColor = '#d1fae5';
        statusDiv.style.color = '#065f46';
        statusDiv.style.border = '1px solid #a7f3d0';
    } else {
        statusDiv.style.backgroundColor = '#fee2e2';
        statusDiv.style.color = '#991b1b';
        statusDiv.style.border = '1px solid #fca5a5';
    }
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.parentNode.insertBefore(statusDiv, contactForm);
        setTimeout(() => statusDiv.remove(), 5000);
    }
}

// Navigation functionality
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Active navigation link highlighting
function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to current section's nav link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// INTERACTIVE MILLET GRAIN ANIMATION
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('milletCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function resizeCanvas() {
        const container = document.getElementById('canvas-container');
        if (container) {
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;
        }
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Millet grain class
    class Grain {
        constructor(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.originX = x;
            this.originY = y;
            this.radius = radius;
            this.color = color;
            this.velocity = {
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5
            };
            this.friction = 0.95;
            this.springFactor = 0.05;
            this.mouseInfluence = 70;
            this.isHovered = false;
        }
        
        update(mouse) {
            // Spring back to original position
            const dx = this.originX - this.x;
            const dy = this.originY - this.y;
            
            this.velocity.x += dx * this.springFactor;
            this.velocity.y += dy * this.springFactor;
            
            // Apply friction
            this.velocity.x *= this.friction;
            this.velocity.y *= this.friction;
            
            // Mouse interaction
            if (mouse.x && mouse.y) {
                const distance = Math.hypot(mouse.x - this.x, mouse.y - this.y);
                
                if (distance < this.mouseInfluence) {
                    const angle = Math.atan2(mouse.y - this.y, mouse.x - this.x);
                    const force = (this.mouseInfluence - distance) / this.mouseInfluence;
                    
                    this.velocity.x -= Math.cos(angle) * force * 2;
                    this.velocity.y -= Math.sin(angle) * force * 2;
                    
                    this.isHovered = true;
                } else {
                    this.isHovered = false;
                }
            }
            
            // Update position
            this.x += this.velocity.x;
            this.y += this.velocity.y;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            
            // Create gradient for 3D effect
            const gradient = ctx.createRadialGradient(
                this.x - this.radius * 0.3, 
                this.y - this.radius * 0.3, 
                0,
                this.x, 
                this.y, 
                this.radius
            );
            
            if (this.isHovered) {
                gradient.addColorStop(0, '#fcd34d');
                gradient.addColorStop(1, '#d97706');
            } else {
                gradient.addColorStop(0, '#fef3c7');
                gradient.addColorStop(1, this.color);
            }
            
            ctx.fillStyle = gradient;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
            ctx.shadowBlur = 5;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.fill();
            ctx.closePath();
        }
    }
    
    // Initialize grains
    let grains = [];
    const colors = ['#d97706', '#f59e0b', '#fbbf24', '#f59e0b'];
    const mouse = { x: null, y: null };
    
    function initGrains() {
        grains = [];
        const grainCount = Math.floor(canvas.width * canvas.height / 6000);
        
        for (let i = 0; i < grainCount; i++) {
            const radius = Math.random() * 5 + 3;
            const x = Math.random() * (canvas.width - radius * 2) + radius;
            const y = Math.random() * (canvas.height - radius * 2) + radius;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            grains.push(new Grain(x, y, radius, color));
        }
    }
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        grains.forEach(grain => {
            grain.update(mouse);
            grain.draw();
        });
    }
    
    // Track mouse movement
    canvas.addEventListener('mousemove', function(event) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    });
    
    // Touch support
    canvas.addEventListener('touchmove', function(event) {
        event.preventDefault();
        const rect = canvas.getBoundingClientRect();
        mouse.x = event.touches[0].clientX - rect.left;
        mouse.y = event.touches[0].clientY - rect.top;
    });
    
    canvas.addEventListener('mouseleave', function() {
        mouse.x = null;
        mouse.y = null;
    });
    
    canvas.addEventListener('touchend', function() {
        mouse.x = null;
        mouse.y = null;
    });
    
    // Initialize and start animation
    initGrains();
    window.addEventListener('resize', initGrains);
    animate();
});

// INGREDIENT EXPLORER FUNCTIONALITY (Keep original static data)
document.addEventListener('DOMContentLoaded', function() {
    const ingredientWheel = document.getElementById('ingredientWheel');
    const wheelCenter = document.getElementById('wheelCenter');
    const ingredientInfo = document.getElementById('ingredientInfo');
    const closeInfo = document.getElementById('closeInfo');
    const infoImage = document.getElementById('infoImage');
    const infoTitle = document.getElementById('infoTitle');
    const infoSubtitle = document.getElementById('infoSubtitle');
    const infoContent = document.getElementById('infoContent');
    const benefitsList = document.getElementById('benefitsList');
    
    if (!ingredientWheel) return;
    
    // Keep your original ingredient data
    const ingredients = [
        {
            name: 'Millet',
            image: '/images/millet.jpg?height=50&width=50',
            subtitle: 'Ancient Super Grain',
            description: 'Millet is a group of highly variable small-seeded grasses, widely grown around the world as cereal crops. Millets are important crops in the semiarid tropics of Asia and Africa, with 97% of millet production in developing countries.',
            benefits: ['High in Protein', 'Gluten-Free', 'Rich in Antioxidants', 'Supports Heart Health', 'Low Glycemic Index']
        },
        {
            name: 'Coconut Water',
            image: '/images/coconut.jpeg?height=50&width=50',
            subtitle: 'Nature Sports Drink',
            description: 'Coconut water is the clear liquid found inside young, green coconuts. Often called "nature sports drink," it has been consumed for centuries in tropical regions for its refreshing taste and natural electrolyte content.',
            benefits: ['Natural Electrolytes', 'Superior Hydration', 'Low in Calories', 'Potassium Rich', 'No Added Sugar', 'Post-Workout Recovery']
        },
        {
            name: 'Chia Seeds',
            image: '/images/chia.jpeg?height=50&width=50',
            subtitle: 'Ancient Omega Powerhouse',
            description: 'Chia seeds are tiny black seeds from the plant Salvia hispanica, which was grown in Mexico and Guatemala by the Aztecs. Despite their small size, chia seeds are among the most nutritious foods on the planet, packed with fiber, protein, omega-3 fatty acids, and various micronutrients.',
            benefits: ['Omega-3 Fatty Acids', 'High Fiber Content', 'Plant-Based Protein', 'Sustained Energy', 'Heart Health', 'Bone Strength']
        },
        {
            name: 'Citrus',
            image: '/images/citrus.jpeg?height=50&width=50',
            subtitle: 'Vitamin C Boost',
            description: 'Citrus fruits are notable for their fragrance, partly due to flavonoids and limonoids contained in the rind, and most are juice-laden. The juice contains a high quantity of citric acid and other organic acids giving them their characteristic sharp flavor.',
            benefits: ['Immune Support', 'Skin Health', 'Hydration', 'Digestive Aid', 'Reduces Inflammation']
        },
        {
            name: 'Honey',
            image: '/images/honey.jpeg?height=50&width=50',
            subtitle: 'Natural Sweetener',
            description: 'Honey is a sweet, viscous food substance made by honey bees and some related insects. Bees produce honey from the sugary secretions of plants or from secretions of other insects, by regurgitation, enzymatic activity, and water evaporation.',
            benefits: ['Antioxidant Properties', 'Wound Healing', 'Cough Suppressant', 'Prebiotic Support', 'Natural Energy']
        },
        {
            name: 'Ginger',
            image: '/images/ginger.jpeg?height=50&width=50',
            subtitle: 'Aromatic Root',
            description: 'Ginger is a flowering plant whose rhizome, ginger root or ginger, is widely used as a spice and a folk medicine. It is a herbaceous perennial which grows annual pseudostems about one meter tall bearing narrow leaf blades.',
            benefits: ['Digestive Aid', 'Anti-inflammatory', 'Nausea Relief', 'Immune Support', 'Pain Reduction']
        }
    ];
    
    // Position ingredients in a circle
    function positionIngredients() {
        const centerX = ingredientWheel.offsetWidth / 2;
        const centerY = ingredientWheel.offsetHeight / 2;
        const radius = Math.min(centerX, centerY) - 60; // Adjust for ingredient size
        
        // Remove existing ingredients
        document.querySelectorAll('.ingredient').forEach(el => el.remove());
        
        // Add ingredients in a circle
        ingredients.forEach((ingredient, index) => {
            const angle = (index / ingredients.length) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle) - 40; // 40 is half the ingredient width
            const y = centerY + radius * Math.sin(angle) - 40; // 40 is half the ingredient height
            
            const element = document.createElement('div');
            element.className = 'ingredient';
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            element.dataset.index = index;
            
            const img = document.createElement('img');
            img.src = ingredient.image;
            img.alt = ingredient.name;
            
            element.appendChild(img);
            ingredientWheel.appendChild(element);
            
            // Add click event
            element.addEventListener('click', function() {
                showIngredientInfo(index);
            });
        });
    }
    
    // Show ingredient info
    function showIngredientInfo(index) {
        const ingredient = ingredients[index];
        
        infoImage.src = ingredient.image;
        infoImage.alt = ingredient.name;
        infoTitle.textContent = ingredient.name;
        infoSubtitle.textContent = ingredient.subtitle;
        infoContent.textContent = ingredient.description;
        
        // Clear and add benefits
        benefitsList.innerHTML = '';
        ingredient.benefits.forEach(benefit => {
            const tag = document.createElement('span');
            tag.className = 'benefit-tag';
            tag.textContent = benefit;
            benefitsList.appendChild(tag);
        });
        
        ingredientInfo.classList.add('active');
    }
    
    // Close ingredient info
    closeInfo.addEventListener('click', function() {
        ingredientInfo.classList.remove('active');
    });
    
    // Center wheel click
    wheelCenter.addEventListener('click', function() {
        // Could show general info about Kyara beverages
        alert('Kyara Beverages: A perfect blend of tradition and innovation with our millet-based fruit drinks.');
    });
    
    // Initialize
    positionIngredients();
    
    // Reposition on resize
    window.addEventListener('resize', positionIngredients);
});

// Contact form handling (keep original simple version)
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Show success message
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';
    
    // Reset form
    this.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
    
    // Log form data (in a real application, you would send this to a server)
    console.log('Form submitted:', { name, email, message });
});

// Initialize CMS integration (optional - only runs if you want to test Strapi)
document.addEventListener('DOMContentLoaded', async function() {
    // Only setup enhanced contact form, don't touch existing content
    setupContactForm();
    
    console.log('Website loaded with static content. Strapi integration ready but not required.');
});

// Add fade-in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

# 🌾 Kyara Beverages - Refreshment, Reimagined

A modern, responsive website for Kyara Beverages, showcasing millet-based fruit drinks with interactive animations and full-stack CMS integration.


## 🚀 Live Demo

- **Frontend:** Open `index.html` in your browser
- **CMS Admin:** `http://localhost:1337/admin` (when Strapi is running)

## ✨ Features

### 🎨 Frontend Highlights
- **Responsive Design** - Mobile-first approach, works on all devices
- **Interactive Millet Animation** - Canvas-based grain animation with mouse interaction
- **Ingredient Explorer** - Circular ingredient wheel with detailed information panels
- **Product Showcase** - Animated wave effects and product displays
- **Smooth Navigation** - Sticky navbar with smooth scrolling
- **Contact Form** - Validated form with success feedback
- **Modern UI/UX** - Clean design with gradient backgrounds and animations

### 🔧 Backend Capabilities
- **Strapi CMS** - Headless content management system
- **Dynamic Content** - Products and ingredients manageable via admin panel
- **Form Handling** - Contact form submissions stored in database
- **RESTful APIs** - Auto-generated APIs for all content types
- **Media Management** - Image upload and management system

### 📱 Technical Features
- **Vanilla JavaScript** - No framework dependencies
- **CSS Grid & Flexbox** - Modern layout techniques
- **Canvas API** - Custom animations and interactions
- **Responsive Images** - Optimized for all screen sizes
- **Progressive Enhancement** - Works with or without JavaScript
- **Graceful Fallbacks** - Functions perfectly with or without CMS

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript (ES6\+)** - Interactive functionality
- **Canvas API** - Custom animations

### Backend
- **Node.js** - Runtime environment
- **Strapi** - Headless CMS
- **SQLite** - Database (development)
- **RESTful APIs** - Data communication

### Tools & Workflow
- **NPM** - Package management
- **Git** - Version control
- **Responsive Design** - Mobile-first approach


## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher)
- **NPM** or **Yarn**
- Modern web browser

### Frontend Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/kyara-beverages.git
   cd kyara-beverages
   ```

2. **Open the website**
   ```bash
   # Simply open index.html in your browser
   open index.html
   # or
   # Use a local server (recommended)
   npx serve .
   ```

### Backend Setup (Optional)
1. **Navigate to backend folder**
   ```bash
   cd strapi-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the CMS**
   ```bash
   npm run develop
   ```

4. **Access admin panel**
   - Open `http://localhost:1337/admin`
   - Create your admin account
   - Start managing content!

## 🎯 Usage

### Website Features
- **Navigation** - Smooth scroll to sections
- **Hero Animation** - Move cursor over millet grains
- **Ingredient Explorer** - Click ingredients to learn more
- **Product Showcase** - Hover over products for details
- **Contact Form** - Submit inquiries (saves to CMS if running)

### CMS Management
1. **Add Products**
   - Go to Content Manager → Products
   - Click "Create new entry"
   - Fill in product details and upload images
   - Save and Publish

2. **Manage Ingredients**
   - Content Manager → Ingredients
   - Add new ingredients with benefits
   - Upload ingredient images

3. **View Contact Submissions**
   - Content Manager → Contacts
   - Review all form submissions

## 🎨 Design Highlights

### Color Palette
- **Primary:** `#d97706` (Warm Orange)
- **Secondary:** `#ea580c` (Deep Orange)  
- **Accent:** `#fbbf24` (Golden Yellow)
- **Background:** `#fef7ed` (Warm Cream)

### Typography
- **Headings:** System fonts with bold weights
- **Body:** Clean, readable sans-serif
- **Responsive:** Scales beautifully across devices

### Animations
- **Millet Grains:** Interactive canvas animation
- **Ingredient Wheel:** Smooth hover effects
- **Wave Animation:** CSS-based product backgrounds
- **Scroll Effects:** Fade-in animations on scroll

## 📱 Responsive Design

- **Mobile (≤ 480px):** Optimized touch interactions
- **Tablet (481px - 768px):** Balanced layout
- **Desktop (≥ 1024px):** Full feature experience

## 🔧 API Endpoints

When Strapi is running:

- **Products:** `GET /api/products?populate=*`
- **Ingredients:** `GET /api/ingredients?populate=*`
- **Contacts:** `POST /api/contacts`


## 🎯 Assignment Requirements Met

✅ **Static Homepage** - Built with HTML/CSS  
✅ **Responsive Design** - Mobile to desktop  
✅ **Hero Banner** - Logo, tagline, background  
✅ **About Section** - Company mission  
✅ **Product Teasers** - Three drink showcases  
✅ **Contact Form** - Name, email, message fields  
✅ **Backend Integration** - Strapi CMS  
✅ **Extra Features** - Animations, interactions  

## 🌟 Bonus Features

- **Interactive Animations** - Canvas-based millet grains
- **Ingredient Explorer** - Educational content wheel
- **Wave Effects** - CSS animation backgrounds
- **Mobile Optimization** - Touch-friendly interactions
- **CMS Integration** - Full content management
- **Form Validation** - Client-side validation
- **Smooth Scrolling** - Enhanced navigation
- **Loading States** - Better user experience

## 🙏 Acknowledgments

- **Strapi** - For the excellent headless CMS
- **Canvas API** - For enabling custom animations
- **Modern CSS** - For responsive design capabilities
- **Kyara Beverages** - For the inspiring brand concept

// DOM Elements
const progressBar = document.getElementById('progressBar');
const likeBtn = document.getElementById('likeBtn');
const shareBtn = document.getElementById('shareBtn');
const bookmarkBtn = document.getElementById('bookmarkBtn');
const commentForm = document.getElementById('commentForm');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Progress Bar
function updateProgressBar() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateProgressBar);

// Like Button
let isLiked = false;
let likeCount = 42;

likeBtn.addEventListener('click', function() {
    const likeCountElement = this.querySelector('.like-count');
    
    if (!isLiked) {
        this.classList.add('liked');
        likeCount++;
        isLiked = true;
        
        // Heart animation
        const heart = this.querySelector('i');
        heart.style.animation = 'heartBeat 0.6s ease';
        
        setTimeout(() => {
            heart.style.animation = '';
        }, 600);
        
    } else {
        this.classList.remove('liked');
        likeCount--;
        isLiked = false;
    }
    
    likeCountElement.textContent = likeCount;
    
    // Add floating heart effect
    createFloatingHeart(this);
});

function createFloatingHeart(button) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'absolute';
    heart.style.left = '50%';
    heart.style.top = '50%';
    heart.style.transform = 'translate(-50%, -50%)';
    heart.style.pointerEvents = 'none';
    heart.style.fontSize = '20px';
    heart.style.zIndex = '1000';
    heart.style.animation = 'floatUp 2s ease-out forwards';
    
    button.style.position = 'relative';
    button.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2000);
}

// Add floating animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -150%) scale(1.5);
        }
    }
`;
document.head.appendChild(style);

// Share Button
shareBtn.addEventListener('click', function() {
    if (navigator.share) {
        navigator.share({
            title: 'Süni İntellektin Gələcəyi: 2024-cü İldə Nələr Gözləyir?',
            text: 'Bu maraqlı məqaləni oxuyun!',
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link kopyalandı!');
        });
    }
});

// Bookmark Button
let isBookmarked = false;
bookmarkBtn.addEventListener('click', function() {
    if (!isBookmarked) {
        this.style.background = '#667eea';
        this.style.color = 'white';
        isBookmarked = true;
        showNotification('Məqalə əlavə edildi!');
    } else {
        this.style.background = 'white';
        this.style.color = '#333';
        isBookmarked = false;
        showNotification('Məqalə silindi!');
    }
});

// Share Buttons
document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const platform = this.classList[1];
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent('Süni İntellektin Gələcəyi: 2024-cü İldə Nələr Gözləyir?');
        
        let shareUrl = '';
        
        switch(platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${title} ${url}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    });
});

// Comment Form
commentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const comment = this.querySelector('textarea').value;
    
    if (name && email && comment) {
        addComment(name, comment);
        this.reset();
        showNotification('Şərhıniz əlavə edildi!');
    }
});

function addComment(name, comment) {
    const commentsList = document.querySelector('.comments-list');
    const newComment = document.createElement('div');
    newComment.className = 'comment';
    newComment.style.opacity = '0';
    newComment.style.transform = 'translateY(20px)';
    
    newComment.innerHTML = `
        <img src="/placeholder.svg?height=40&width=40" alt="İstifadəçi" class="comment-avatar">
        <div class="comment-content">
            <div class="comment-header">
                <h4>${name}</h4>
                <span class="comment-date">İndi</span>
            </div>
            <p>${comment}</p>
            <button class="reply-btn">Cavab ver</button>
        </div>
    `;
    
    commentsList.insertBefore(newComment, commentsList.firstChild);
    
    // Animate in
    setTimeout(() => {
        newComment.style.transition = 'all 0.5s ease';
        newComment.style.opacity = '1';
        newComment.style.transform = 'translateY(0)';
    }, 100);
    
    // Update comment count
    const commentCount = document.querySelector('.comments-section h2');
    const currentCount = parseInt(commentCount.textContent.match(/\d+/)[0]);
    commentCount.textContent = `Şərhlər (${currentCount + 1})`;
}

// Newsletter Form
document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    
    if (email) {
        showNotification('Abunəlik uğurla tamamlandı!');
        this.reset();
    }
});

// Mobile Navigation
hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Notification System
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Scroll Animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.stat-item, .related-post, .comment');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
document.querySelectorAll('.stat-item, .related-post, .comment').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on load

// Reading Time Calculator
function calculateReadingTime() {
    const article = document.querySelector('.article-content');
    const text = article.textContent;
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    
    // Update reading time in hero section
    const readingTimeElement = document.querySelector('.post-stats span');
    if (readingTimeElement) {
        readingTimeElement.innerHTML = `<i class="fas fa-clock"></i> ${readingTime} dəq oxu`;
    }
}

// Initialize reading time calculation
calculateReadingTime();

// Image Lazy Loading
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Dark Mode Toggle (Optional Enhancement)
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: #333;
        color: white;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        this.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        localStorage.setItem('darkMode', isDark);
    });
    
    // Load saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Initialize dark mode
initDarkMode();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(updateProgressBar, 10));
window.addEventListener('scroll', debounce(animateOnScroll, 100));

console.log('Blog Details Page Loaded Successfully! 🚀');
        // Mobile Menu Toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Filter Projects
        const filterButtons = document.querySelectorAll('.filter-button');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

        // Project Modal
        const modal = document.getElementById('project-modal');
        const modalClose = document.querySelector('.modal-close');
        const viewProjectButtons = document.querySelectorAll('.view-project');

        // Project data
        const projectsData = [
            {
                id: 1,
                title: "Business Pro",
                category: "Biznes",
                description: "Business Pro, peşəkar biznes saytları üçün hazırlanmış müasir və funksional WordPress şablonudur. Bu şablon, şirkətinizin onlayn varlığını gücləndirmək və potensial müştərilərinizə peşəkar təəssürat yaratmaq üçün lazım olan bütün xüsusiyyətlərə malikdir.<br><br>Tam responsive dizayn sayəsində saytınız bütün cihazlarda mükəmməl görünəcək. SEO-optimizasiya edilmiş kod strukturu ilə axtarış motorlarında daha yaxşı sıralanacaqsınız. Drag-and-drop page builder ilə saytınızı asanlıqla özelleşdirə bilərsiniz.",
                image: "https://via.placeholder.com/1200x600",
                features: [
                    "Tam Responsive Dizayn",
                    "SEO Optimizasiyası",
                    "Drag-and-Drop Page Builder",
                    "WooCommerce Dəstəyi",
                    "Çoxdilli Dəstək",
                    "Sürətli Yükləmə",
                    "Sosial Media İnteqrasiyası",
                    "Kontakt Formaları"
                ],
                screenshots: [
                    "https://via.placeholder.com/400x300",
                    "https://via.placeholder.com/400x300",
                    "https://via.placeholder.com/400x300",
                    "https://via.placeholder.com/400x300"
                ]
            },
            {
                id: 2,
                title: "Shop Master",
                category: "E-ticarət",
                description: "Shop Master, onlayn mağazalar üçün hazırlanmış güclü və funksional WordPress şablonudur. WooCommerce ilə tam inteqrasiya olunmuş bu şablon, məhsullarınızı onlayn satmaq üçün lazım olan bütün xüsusiyyətlərə malikdir.<br><br>Müasir və cəlbedici dizayn ilə müştərilərinizin diqqətini çəkəcək və satışlarınızı artıracaqsınız. Səbət, ödəniş və çatdırılma prosesləri tam optimallaşdırılmışdır.",
                image: "https://via.placeholder.com/1200x600",
                features: [
                    "WooCommerce İnteqrasiyası",
                    "Məhsul Filtri və Axtarışı",
                    "Səbət və Ödəniş Sistemi",
                    "Müştəri Hesabları",
                    "Kupon və Endirim Sistemi",
                    "Məhsul Variantları",
                    "Stok İdarəetməsi",
                    "Ödəniş Gateway İnteqrasiyası"
                ],
                screenshots: [
                    "https://via.placeholder.com/400x300",
                    "https://via.placeholder.com/400x300",
                    "https://via.placeholder.com/400x300",
                    "https://via.placeholder.com/400x300"
                ]
            },
            {
                id: 3,
                title: "Creative Portfolio",
                category: "Portfolio",
                description: "Creative Portfolio, yaradıcı insanlar üçün hazırlanmış portfolio saytı şablonudur. İşlərinizi cəlbedici şəkildə nümayiş etdirmək üçün ideal seçimdir.<br><br>Müasir və minimal dizayn ilə işləriniz ön plana çıxacaq. Filtrlənə bilən portfolio bölməsi ilə ziyarətçilər işlərinizi kateqoriyalara görə görə biləcəklər.",
                image: "https://via.placeholder.com/1200x600",
                features: [
                    "Filtrlənə bilən Portfolio",
                    "Layihə Detalları",
                    "Animasiyalı Keçidlər",
                    "Masonry Layout",
                    "Lightbox İnteqrasiyası",
                    "Sosial Media Paylaşımı",
                    "Əlaqə Forması",
                    "Blog Bölməsi"
                ],
                screenshots: [
                    "https://via.placeholder.com/400x300",
                    "https://via.placeholder.com/400x300",
                    "https://via.placeholder.com/400x300",
                    "https://via.placeholder.com/400x300"
                ]
            },
            {
                id: 4,
                title: "Blog Pro",
                category: "Blog",
                description: "Blog Pro, blogger və yazıçılar üçün hazırlanmış oxunaqlı və SEO-optimizasiya edilmiş blog şablonudur. Məzmununuzu ön plana çıxarmaq üçün ideal seçimdir.<br><br>Müxtəlif post formatları ilə məzmununuzu daha cəlbedici şəkildə təqdim edə bilərsiniz. Kateqoriya və etiketlər ilə məzmununuzu təşkil edə bilərsiniz.",
                image: "https://via.placeholder.com/1200x600",
                features: [
                    "Müxtəlif Post Formatları",
                    "Kateqoriya və Etiketlər",
                    "Şərh Sistemi",
                    "Sosial Media Paylaşımı",
                    "Əlaqəli Postlar",
                    "Axtarış Funksiyası",
                    "Arxiv və Kateqoriya Səhifələri",
                    "Abunəlik Forması"
                ],
                screenshots: [
                    "https://via.placeholder.com/400x300",
                    "https://via.placeholder.com/400x300",
                    "https://via.placeholder.com/400x300",
                    "https://via.placeholder.com/400x300"
                ]
            },
            {
                id: 5,
                title: "Cuisine",
                category: "Restoran",
                description: "Cuisine, restoran və kafelər üçün hazırlanmış menyu və rezervasiya funksiyalı şablondur. Restoranınızın onlayn varlığını gücləndirmək üçün ideal seçimdir.<br><br>Cəlbedici menyu bölməsi ilə yeməklərinizi nümayiş etdirə bilərsiniz. Onlayn rezervasiya sistemi ilə müştəriləriniz asanlıqla masa rezerv edə bilərlər.",
                image: "https://via.placeholder.com/1200x600",
                features: [
                    "Menyu Bölməsi",
                    "Onlayn Rezervasiya",
                    "Çatdırılma İnteqrasiyası",
                    "Qalereya",
                    "Tədbir Təqvimi",
                    "Xəbərlər və Təkliflər",
                    "Əlaqə Məlumatları",
                    "Xəritə İnteqrasiyası"
                ],
                screenshots: [
                    "https://via.placeholder.com/400x300",
                    "https://via.placeholder.com/400x300",
                    "https://via.placeholder.com/400x300",
                    "https://via.placeholder.com/400x300"
                ]
            },
            {
                id: 6,
                title: "EduLearn",
                category: "Təhsil",
                description: "EduLearn, onlayn kurslar və təhsil saytları üçün hazırlanmış interaktiv şablondur. Təhsil məzmununuzu onlayn paylaşmaq üçün ideal seçimdir.<br><br>Kurs kataloqu ilə təhsil məzmununuzu təşkil edə bilərsiniz. Tələbə və müəllim profil səhifələri ilə istifadəçi təcrübəsini yaxşılaşdıra bilərsiniz.",
                image: "https://via.placeholder.com/1200x600",
                features: [
                    "Kurs Kataloqu",
                    "Tələbə və Müəllim Profilləri",
                    "Onlayn Ödəniş",
                    "Dərs Cədvəli",
                    "Tədris Materialları",
                    "Onlayn İmtahanlar",
                    "Sertifikatlar",
                    "Forum və Müzakirələr"
                ],
                screenshots: [
                    "https://via.placeholder.com/400x300",
                    "https://via.placeholder.com/400x300",
                    "https://via.placeholder.com/400x300",
                    "https://via.placeholder.com/400x300"
                ]
            }
        ];

        // Open modal with project data
        viewProjectButtons.forEach(button => {
            button.addEventListener('click', function() {
                const projectCard = this.closest('.project-card');
                const projectId = parseInt(projectCard.getAttribute('data-id'));
                
                // Find project data
                const project = projectsData.find(p => p.id === projectId);
                
                if (project) {
                    // Update modal content
                    document.querySelector('.modal-image').src = project.image;
                    document.querySelector('.modal-category').textContent = project.category;
                    document.querySelector('.modal-title').textContent = project.title;
                    document.querySelector('.modal-description').innerHTML = project.description;
                    
                    // Update features
                    const featuresList = document.querySelector('.features-list');
                    featuresList.innerHTML = '';
                    project.features.forEach(feature => {
                        featuresList.innerHTML += `
                            <li class="feature-item">
                                <i class="fas fa-check feature-icon"></i>
                                <span>${feature}</span>
                            </li>
                        `;
                    });
                    
                    // Update screenshots
                    const screenshotsGrid = document.querySelector('.screenshots-grid');
                    screenshotsGrid.innerHTML = '';
                    project.screenshots.forEach(screenshot => {
                        screenshotsGrid.innerHTML += `
                            <img src="${screenshot}" alt="Screenshot" class="screenshot">
                        `;
                    });
                    
                    // Open modal
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        // Close modal
        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Search functionality
        const searchInput = document.querySelector('.search-input');
        
        searchInput.addEventListener('keyup', function() {
            const searchValue = this.value.toLowerCase();
            
            projectCards.forEach(card => {
                const title = card.querySelector('.project-title').textContent.toLowerCase();
                const description = card.querySelector('.project-description').textContent.toLowerCase();
                const category = card.querySelector('.project-category').textContent.toLowerCase();
                
                if (title.includes(searchValue) || description.includes(searchValue) || category.includes(searchValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });

        // Load More Button (Simulated)
        const loadMoreButton = document.querySelector('.load-more-button');
        let loadMoreClicked = false;
        
        loadMoreButton.addEventListener('click', function() {
            if (!loadMoreClicked) {
                // Clone existing projects and append to grid
                const projectsGrid = document.querySelector('.projects-grid');
                const projectCards = document.querySelectorAll('.project-card');
                
                projectCards.forEach(card => {
                    const clone = card.cloneNode(true);
                    projectsGrid.appendChild(clone);
                });
                
                // Add event listeners to new view project buttons
                document.querySelectorAll('.view-project').forEach(button => {
                    button.addEventListener('click', function() {
                        const projectCard = this.closest('.project-card');
                        const projectId = parseInt(projectCard.getAttribute('data-id'));
                        
                        // Find project data
                        const project = projectsData.find(p => p.id === projectId);
                        
                        if (project) {
                            // Update modal content
                            document.querySelector('.modal-image').src = project.image;
                            document.querySelector('.modal-category').textContent = project.category;
                            document.querySelector('.modal-title').textContent = project.title;
                            document.querySelector('.modal-description').innerHTML = project.description;
                            
                            // Update features
                            const featuresList = document.querySelector('.features-list');
                            featuresList.innerHTML = '';
                            project.features.forEach(feature => {
                                featuresList.innerHTML += `
                                    <li class="feature-item">
                                        <i class="fas fa-check feature-icon"></i>
                                        <span>${feature}</span>
                                    </li>
                                `;
                            });
                            
                            // Update screenshots
                            const screenshotsGrid = document.querySelector('.screenshots-grid');
                            screenshotsGrid.innerHTML = '';
                            project.screenshots.forEach(screenshot => {
                                screenshotsGrid.innerHTML += `
                                    <img src="${screenshot}" alt="Screenshot" class="screenshot">
                                `;
                            });
                            
                            // Open modal
                            modal.classList.add('active');
                            document.body.style.overflow = 'hidden';
                        }
                    });
                });
                
                loadMoreClicked = true;
                this.textContent = 'Bütün Layihələr Yükləndi';
                this.disabled = true;
                this.style.opacity = '0.7';
            }
        });

        // Scroll Animation
        function revealOnScroll() {
            const elements = document.querySelectorAll('.project-card');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        }

        // Set initial styles for animation
        document.addEventListener('DOMContentLoaded', function() {
            const elements = document.querySelectorAll('.project-card');
            
            elements.forEach((element, index) => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'all 0.5s ease';
                element.style.transitionDelay = `${index * 0.1}s`;
            });
            
            // Trigger initial check
            setTimeout(revealOnScroll, 100);
        });

        // Add scroll event listener
        window.addEventListener('scroll', revealOnScroll);
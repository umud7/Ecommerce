class ProjectSearch {
            constructor() {
                this.projects = document.querySelectorAll('.project-card');
                this.searchInput = document.getElementById('searchInput');
                this.searchForm = document.getElementById('searchForm');
                this.filterButtons = document.querySelectorAll('.filter-btn');
                this.sortSelect = document.getElementById('sortSelect');
                this.resultsCount = document.getElementById('resultsCount');
                this.resultsHeader = document.getElementById('resultsHeader');
                this.noResults = document.getElementById('noResults');
                this.loading = document.getElementById('loading');
                
                this.currentFilter = 'all';
                this.currentSort = 'default';
                this.searchTerm = '';
                
                this.init();
            }

            init() {
                // Event listener-lər
                this.searchForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.performSearch();
                });

                this.searchInput.addEventListener('input', () => {
                    clearTimeout(this.searchTimeout);
                    this.searchTimeout = setTimeout(() => {
                        this.performSearch();
                    }, 300);
                });

                this.filterButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        this.setActiveFilter(btn);
                        this.performSearch();
                    });
                });

                this.sortSelect.addEventListener('change', () => {
                    this.currentSort = this.sortSelect.value;
                    this.sortProjects();
                });

                // İlk yükləmə
                this.updateStats();
            }

            setActiveFilter(activeBtn) {
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                activeBtn.classList.add('active');
                this.currentFilter = activeBtn.dataset.filter;
            }

            performSearch() {
                this.searchTerm = this.searchInput.value.toLowerCase().trim();
                
                // Loading göstər
                this.showLoading();
                
                setTimeout(() => {
                    this.filterProjects();
                    this.hideLoading();
                }, 500);
            }

            filterProjects() {
                let visibleCount = 0;
                
                this.projects.forEach(project => {
                    const title = project.dataset.title.toLowerCase();
                    const tech = project.dataset.tech.toLowerCase();
                    const category = project.dataset.category;
                    const price = parseInt(project.dataset.price);
                    
                    let matchesSearch = true;
                    let matchesFilter = true;
                    
                    // Axtarış termini yoxlanması
                    if (this.searchTerm) {
                        matchesSearch = title.includes(this.searchTerm) || 
                                     tech.includes(this.searchTerm);
                    }
                    
                    // Filter yoxlanması
                    if (this.currentFilter !== 'all') {
                        if (this.currentFilter === 'low-price') {
                            matchesFilter = price <= 100;
                        } else if (this.currentFilter === 'high-price') {
                            matchesFilter = price > 100;
                        } else {
                            matchesFilter = category === this.currentFilter;
                        }
                    }
                    
                    // Nəticəni göstər/gizlət
                    if (matchesSearch && matchesFilter) {
                        project.classList.remove('hidden');
                        project.classList.add('highlight');
                        visibleCount++;
                        
                        // Axtarış terminini highlight et
                        this.highlightSearchTerm(project);
                        
                        setTimeout(() => {
                            project.classList.remove('highlight');
                        }, 600);
                    } else {
                        project.classList.add('hidden');
                    }
                });
                
                this.updateStats(visibleCount);
                this.sortProjects();
            }

            highlightSearchTerm(project) {
                if (!this.searchTerm) return;
                
                const title = project.querySelector('h3');
                const originalText = title.textContent;
                
                // Əvvəlki highlight-ları təmizlə
                title.innerHTML = originalText;
                
                if (originalText.toLowerCase().includes(this.searchTerm)) {
                    const regex = new RegExp(`(${this.searchTerm})`, 'gi');
                    title.innerHTML = originalText.replace(regex, '<span class="search-highlight">$1</span>');
                }
            }

            sortProjects() {
                const projectsArray = Array.from(this.projects);
                const container = document.getElementById('projectsGrid');
                
                projectsArray.sort((a, b) => {
                    switch (this.currentSort) {
                        case 'price-low':
                            return parseInt(a.dataset.price) - parseInt(b.dataset.price);
                        case 'price-high':
                            return parseInt(b.dataset.price) - parseInt(a.dataset.price);
                        case 'name-az':
                            return a.dataset.title.localeCompare(b.dataset.title);
                        case 'name-za':
                            return b.dataset.title.localeCompare(a.dataset.title);
                        default:
                            return 0;
                    }
                });
                
                // DOM-da yenidən sırala
                projectsArray.forEach(project => {
                    container.appendChild(project);
                });
            }

            updateStats(count = null) {
                const visibleProjects = count !== null ? count : 
                    document.querySelectorAll('.project-card:not(.hidden)').length;
                
                this.resultsCount.textContent = visibleProjects;
                
                if (visibleProjects === 0) {
                    this.noResults.style.display = 'block';
                    this.resultsHeader.textContent = 'Heç bir layihə tapılmadı';
                } else {
                    this.noResults.style.display = 'none';
                    this.resultsHeader.textContent = `${visibleProjects} layihə tapıldı`;
                }
            }

            showLoading() {
                this.loading.classList.add('show');
            }

            hideLoading() {
                this.loading.classList.remove('show');
            }
        }

        // Axtarışı təmizləmək
        function clearSearch() {
            const searchInstance = window.projectSearch;
            searchInstance.searchInput.value = '';
            searchInstance.searchTerm = '';
            searchInstance.currentFilter = 'all';
            
            // Aktiv filtri sıfırla
            searchInstance.filterButtons.forEach(btn => btn.classList.remove('active'));
            searchInstance.filterButtons[0].classList.add('active');
            
            // Bütün layihələri göstər
            searchInstance.projects.forEach(project => {
                project.classList.remove('hidden');
                // Highlight-ları təmizlə
                const title = project.querySelector('h3');
                title.innerHTML = title.textContent;
            });
            
            searchInstance.updateStats();
        }

        // Səhifə yüklənəndə axtarış sistemini başlat
        document.addEventListener('DOMContentLoaded', function() {
            window.projectSearch = new ProjectSearch();
        });

        // Klaviatura qısayolları
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + K ilə axtarış inputuna fokus
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('searchInput').focus();
            }
            
            // Escape ilə axtarışı təmizlə
            if (e.key === 'Escape') {
                clearSearch();
            }
        });








        
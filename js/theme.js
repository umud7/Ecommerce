// Theme and Language Management
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem("theme") || "light"
    this.currentLang = localStorage.getItem("language") || "az"
    this.init()
  }

  init() {
    this.applyTheme()
    this.applyLanguage()
    this.setupEventListeners()
  }

  setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById("theme-toggle")
    if (themeToggle) {
      themeToggle.addEventListener("click", () => this.toggleTheme())
    }

    // Language switcher
    const langButtons = document.querySelectorAll(".lang-btn")
    langButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const lang = btn.dataset.lang
        this.setLanguage(lang)
      })
    })
  }

  toggleTheme() {
    this.applyTheme()
    localStorage.setItem("theme", this.currentTheme)
  }

  applyTheme() {
    document.documentElement.setAttribute("data-theme", this.currentTheme)
    document.body.classList.add(`${this.currentTheme}-theme`)
  }

  setLanguage(lang) {
    if (this.currentLang === lang) return

    this.currentLang = lang
    this.applyLanguage()
    localStorage.setItem("language", lang)
  }

  applyLanguage() {
    // Update active language button
    const langButtons = document.querySelectorAll(".lang-btn")
    langButtons.forEach((btn) => {
      btn.classList.remove("active")
      if (btn.dataset.lang === this.currentLang) {
        btn.classList.add("active")
      }
    })

    // Apply translations
    this.translatePage()
  }

  translatePage() {
    const translations = this.getTranslations()
    const elements = document.querySelectorAll("[data-translate]")

    elements.forEach((element) => {
      const key = element.dataset.translate
      if (translations[this.currentLang] && translations[this.currentLang][key]) {
        if (element.tagName === "INPUT" && element.type !== "submit") {
          element.placeholder = translations[this.currentLang][key]
        } else {
          element.textContent = translations[this.currentLang][key]
        }
      }
    })
  }

  getTranslations() {
    return {
      az: {
        // Navigation
        "nav.home": "Ana Səhifə",
        "nav.projects": "Layihələr",
        "nav.about": "Haqqımda",
        "nav.blog": "Blog",
        "nav.contact": "Əlaqə",

        // Home page
        "hero.title": "Hazır Frontend Layihələri",
        "hero.subtitle": "İndi al, dərhal istifadə et",
        "hero.cta.projects": "Layihələrə Bax",
        "hero.cta.about": "Haqqımda",
        "proj.title": "Ən Yaxşı Layihələr",
        "price.title.1": "129 AZN",
        "price.title.2": "79 AZN",
        "price.title.3": "99 AZN",
        "proj.desc.1": "Tam funksional online mağaza şablonu",
        "proj.desc.2": "Yaradıcı şəxslər üçün portfolio saytı",
        "proj.desc.3": "Məhsul və xidmətlər üçün landing səhifə",
        "proj.button": "Bütün Layihələr",
        "why.title": "Niyə Bizi Seçməlisiniz?",
        "why.title.header.1": "Sürətli Başlanğıc",
        "why.title.header.2": "Tam Responsiv",
        "why.title.header.3": "Təmiz Kod",
        "why.title.header.4": "Dəstək",
        "why.title.desc.1": "Layihələrimiz dərhal istifadəyə hazırdır, vaxtınıza qənaət edin.",
        "why.title.desc.2": "Bütün cihazlarda mükəmməl görünüş üçün tam responsiv dizayn.",
        "why.title.desc.3": "Asanlıqla dəyişdirilə bilən təmiz və strukturlu kod.",
        "why.title.desc.4": "Alışdan sonra texniki dəstək və suallarınıza cavab.",
        "customer.comment.header":"Müştəri Rəyləri",
        "customer.comment.title.1":"Bu layihələr mənim üçün əsl xilaskar oldu. Müştərilərə sürətli və keyfiyyətli işlər təqdim edə bilirəm.",
        "customer.comment.title.2":"Kodun keyfiyyəti və dizayn həllərinin müasirliyi məni heyran etdi. Dəfələrlə istifadə edəcəyəm.",
        "customer.comment.title.3":"Layihələrin qiymətləri keyfiyyətinə görə kifayət qədər münasibdir. Dəstək xidməti də əla işləyir.",



        // Projects
        "projects.title": "Hazır Frontend Layihələri",
        "projects.subtitle": "Yüksək keyfiyyətli, tam responsiv və müasir layihələr",
        "projects.search": "Layihələrdə axtarış...",
        "projects.categories": "Kateqoriyalar",
        "projects.all": "Hamısı",
        "projects.sort": "Sıralama",
        "projects.price": "Qiymət Aralığı",
        "projects.apply": "Tətbiq Et",

        // About
        "about.title": "Salam, mən Frontend Developer-əm",
        "about.subtitle": "5+ illik təcrübəm var və müasir web texnologiyaları ilə möhtəşəm layihələr yaradıram.",
        "about.description":
          "Mənim məqsədim sizə vaxtınıza qənaət etdirməkdir. Hazır layihələrimlə siz dərhal işə başlaya bilərsiniz.",
        "about.projects": "Tamamlanmış Layihə",
        "about.clients": "Məmnun Müştəri",
        "about.experience": "İllik Təcrübə",
        "about.technologies": "Texnologiyalarım",
        "about.experience.title": "Təcrübəm",
        "about.mission": "Mənim Məqsədim",

        // Blog
        "blog.title": "Frontend Blog",
        "blog.subtitle": "Web development ipuçları, layihə yaratma prosesi və faydalı məlumatlar",
        "blog.search": "Məqalələrdə axtarış...",
        "blog.popular": "Populyar Məqalələr",
        "blog.categories": "Kateqoriyalar",
        "blog.tags": "Etiketlər",
        "blog.newsletter": "Yeniliklərdən xəbərdar olmaq üçün abunə olun",
        "blog.subscribe": "Abunə Ol",
        "blog.readmore": "Daha ətraflı",

        // Contact
        "contact.title": "Əlaqə Saxlayın",
        "contact.subtitle": "Suallarınız var? Layihə sifarişi vermək istəyirsiniz? Bizə yazın!",
        "contact.info": "Əlaqə Məlumatları",
        "contact.email": "E-poçt",
        "contact.phone": "Telefon",
        "contact.address": "Ünvan",
        "contact.social": "Sosial Şəbəkələr",
        "contact.form.title": "Mesaj Göndərin",
        "contact.form.name": "Ad Soyad",
        "contact.form.email": "E-poçt",
        "contact.form.phone": "Telefon",
        "contact.form.subject": "Mövzu",
        "contact.form.message": "Mesajınız",
        "contact.form.submit": "Mesaj Göndər",
        "contact.faq": "Tez-tez Verilən Suallar",

        // Common
        "btn.details": "Ətraflı",
        "btn.demo": "Canlı Demo",
        "btn.buy": "Satın Al",
        "btn.contact": "Əlaqə Saxlayın",
        "theme.light": "İşıqlı",
        "theme.dark": "Qaranlıq",

        // Footer
        "footer.pages": "Səhifələr",
        "footer.categories": "Kateqoriyalar",
        "footer.contact": "Əlaqə",
        "footer.rights": "Bütün hüquqlar qorunur.",
      },

      en: {
        // Navigation
        "nav.home": "Home",
        "nav.projects": "Projects",
        "nav.about": "About",
        "nav.blog": "Blog",
        "nav.contact": "Contact",

        // Home page
        "hero.title": "Ready Frontend Projects",
        "hero.subtitle": "Buy now, use immediately",
        "hero.cta.projects": "View Projects",
        "hero.cta.about": "About Me",
        "proj.title": "Best Projects",
        "price.title.1": "76$",
        "price.title.2": "59$",
        "price.title.3": "47$",
        "proj.desc.1": "Fully functional online store template",
        "proj.desc.2": "Portfolio site for creative individuals",
        "proj.desc.3": "Landing page for products and services",
        "proj.button": "All Projects",
        "why.title": "Why Choose Us?",
        "why.title.header.1": "Quick Start",
        "why.title.header.2": "Fully Responsive",
        "why.title.header.3": "Clean Cod",
        "why.title.header.4": "Support",
        "why.title.desc.1": "Our projects are ready to use immediately, save your time.",
        "why.title.desc.2": "Fully responsive design for perfect appearance on all devices.",
        "why.title.desc.3": "Clean and structured code that can be easily modified.",
        "why.title.desc.4": "After-purchase technical support and answers to your questions.",
        "customer.comment.header":"Customer Reviews",
        "customer.comment.title.1":"These projects have been a real lifesaver for me. I can deliver fast and high-quality work to clients.",
        "customer.comment.title.2":"I was impressed by the quality of the code and the modernity of the design solutions. I will use it again and again.",
        "customer.comment.title.3":"The prices of the projects are quite reasonable compared to the quality. The support service also works great.",
        

        // Projects
        "projects.title": "Ready Frontend Projects",
        "projects.subtitle": "High quality, fully responsive and modern projects",
        "projects.search": "Search in projects...",
        "projects.categories": "Categories",
        "projects.all": "All",
        "projects.sort": "Sort",
        "projects.price": "Price Range",
        "projects.apply": "Apply",

        // About
        "about.title": "Hello, I'm a Frontend Developer",
        "about.subtitle": "I have 5+ years of experience and create amazing projects with modern web technologies.",
        "about.description":
          "My goal is to save your time. With my ready-to-use projects, you can start working immediately.",
        "about.projects": "Completed Projects",
        "about.clients": "Satisfied Clients",
        "about.experience": "Years of Experience",
        "about.technologies": "My Technologies",
        "about.experience.title": "My Experience",
        "about.mission": "My Mission",

        // Blog
        "blog.title": "Frontend Blog",
        "blog.subtitle": "Web development tips, project creation process and useful information",
        "blog.search": "Search in articles...",
        "blog.popular": "Popular Articles",
        "blog.categories": "Categories",
        "blog.tags": "Tags",
        "blog.newsletter": "Subscribe to get notified about new content",
        "blog.subscribe": "Subscribe",
        "blog.readmore": "Read more",

        // Contact
        "contact.title": "Contact Us",
        "contact.subtitle": "Have questions? Want to order a project? Write to us!",
        "contact.info": "Contact Information",
        "contact.email": "Email",
        "contact.phone": "Phone",
        "contact.address": "Address",
        "contact.social": "Social Networks",
        "contact.form.title": "Send a Message",
        "contact.form.name": "Full Name",
        "contact.form.email": "Email",
        "contact.form.phone": "Phone",
        "contact.form.subject": "Subject",
        "contact.form.message": "Your Message",
        "contact.form.submit": "Send Message",
        "contact.faq": "Frequently Asked Questions",

        // Common
        "btn.details": "Details",
        "btn.demo": "Live Demo",
        "btn.buy": "Buy Now",
        "btn.contact": "Contact Us",
        "theme.light": "Light",
        "theme.dark": "Dark",

        // Footer
        "footer.pages": "Pages",
        "footer.categories": "Categories",
        "footer.contact": "Contact",
        "footer.rights": "All rights reserved.",
      },

      tr: {
        // Navigation
        "nav.home": "Ana Sayfa",
        "nav.projects": "Projeler",
        "nav.about": "Hakkımda",
        "nav.blog": "Blog",
        "nav.contact": "İletişim",

        // Home page
        "hero.title": "Hazır Frontend Projeleri",
        "hero.subtitle": "Şimdi satın al, hemen kullan",
        "hero.cta.projects": "Projeleri Gör",
        "hero.cta.about": "Hakkımda",
        "proj.title": "En iyi Projeler",
        "price.title.1": "2.975,59 TL",
        "price.title.2": "1.975,59 TL",
        "price.title.3": "975,59 TL",
        "proj.desc.1": "Tam işlevli çevrimiçi mağaza şablonu",
        "proj.desc.2": "Yaratıcı bireyler için portföy sitesi",
        "proj.desc.3": "Ürün ve hizmetler için açılış sayfası",
        "proj.button": "Tüm Projeler",
        "why.title": "Neden Bizi Seçmelisiniz?",
        "why.title.header.1": "Hızlı Başlangıç",
        "why.title.header.2": "Tam Responsive",
        "why.title.header.3": "Temiz Kod",
        "why.title.header.4": "Destek",
        "why.title.desc.1": "Projelerimiz hemen kullanıma hazırdır, zamandan tasarruf sağlarsınız.",
        "why.title.desc.2": "Tüm cihazlarda mükemmel görünüm için tamamen duyarlı tasarım.",
        "why.title.desc.3": "Kolayca değiştirilebilen temiz ve yapılandırılmış kod.",
        "why.title.desc.4": "Satın alma sonrası teknik destek ve sorularınıza cevap.",
        "customer.comment.header":"Müşteri Yorumları",
        "customer.comment.title.1":"Bu projeler benim için gerçek bir cankurtaran oldu. Müşterilere hızlı ve yüksek kaliteli işler teslim edebiliyorum.",
        "customer.comment.title.2":"Kodun kalitesi ve tasarım çözümlerinin modernliği beni etkiledi. Tekrar tekrar kullanacağım.",
        "customer.comment.title.3":"Projelerin fiyatları kaliteye göre oldukça makul. Destek hizmeti de harika çalışıyor.",



        // Projects
        "projects.title": "Hazır Frontend Projeleri",
        "projects.subtitle": "Yüksek kaliteli, tam responsive ve modern projeler",
        "projects.search": "Projelerde ara...",
        "projects.categories": "Kategoriler",
        "projects.all": "Tümü",
        "projects.sort": "Sırala",
        "projects.price": "Fiyat Aralığı",
        "projects.apply": "Uygula",

        // About
        "about.title": "Merhaba, ben bir Frontend Geliştiriciyim",
        "about.subtitle": "5+ yıllık deneyimim var ve modern web teknolojileri ile harika projeler oluşturuyorum.",
        "about.description": "Amacım size zaman kazandırmak. Hazır projelerimle hemen çalışmaya başlayabilirsiniz.",
        "about.projects": "Tamamlanan Proje",
        "about.clients": "Memnun Müşteri",
        "about.experience": "Yıllık Deneyim",
        "about.technologies": "Teknolojilerim",
        "about.experience.title": "Deneyimim",
        "about.mission": "Misyonum",

        // Blog
        "blog.title": "Frontend Blog",
        "blog.subtitle": "Web geliştirme ipuçları, proje oluşturma süreci ve faydalı bilgiler",
        "blog.search": "Makalelerde ara...",
        "blog.popular": "Popüler Makaleler",
        "blog.categories": "Kategoriler",
        "blog.tags": "Etiketler",
        "blog.newsletter": "Yeniliklerden haberdar olmak için abone olun",
        "blog.subscribe": "Abone Ol",
        "blog.readmore": "Devamını oku",

        // Contact
        "contact.title": "İletişime Geçin",
        "contact.subtitle": "Sorularınız mı var? Proje siparişi vermek mi istiyorsunuz? Bize yazın!",
        "contact.info": "İletişim Bilgileri",
        "contact.email": "E-posta",
        "contact.phone": "Telefon",
        "contact.address": "Adres",
        "contact.social": "Sosyal Ağlar",
        "contact.form.title": "Mesaj Gönderin",
        "contact.form.name": "Ad Soyad",
        "contact.form.email": "E-posta",
        "contact.form.phone": "Telefon",
        "contact.form.subject": "Konu",
        "contact.form.message": "Mesajınız",
        "contact.form.submit": "Mesaj Gönder",
        "contact.faq": "Sık Sorulan Sorular",

        // Common
        "btn.details": "Detaylar",
        "btn.demo": "Canlı Demo",
        "btn.buy": "Satın Al",
        "btn.contact": "İletişime Geç",
        "theme.light": "Aydınlık",
        "theme.dark": "Karanlık",

        // Footer
        "footer.pages": "Sayfalar",
        "footer.categories": "Kategoriler",
        "footer.contact": "İletişim",
        "footer.rights": "Tüm hakları saklıdır.",
      },
    }
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.themeManager = new ThemeManager()
})

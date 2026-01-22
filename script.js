// Simple Mobile Menu Toggle - Optimized for Fast Loading
(function() {
    'use strict';
    
    // Remove loading class when page is ready
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
    
    // Cache DOM elements
    let menuToggle, desktopNav, mainHeader, backdrop, body;
    let isMenuOpen = false;
    
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        // Cache all elements once
        menuToggle = document.querySelector('.menu-toggle');
        desktopNav = document.querySelector('.desktop-nav');
        mainHeader = document.querySelector('.main-header');
        backdrop = document.querySelector('.mobile-menu-backdrop');
        body = document.body;

        // Check if elements exist
        if (!menuToggle || !desktopNav || !backdrop) {
            return;
        }

        // Initialize all event listeners
        initMenuToggle();
        initScrollHeader();
        initScrollReveal();
    }
    
    function initMenuToggle() {
        // Function to close menu
        function closeMenu() {
            if (!isMenuOpen) return;
            desktopNav.classList.remove('nav-open');
            menuToggle.classList.remove('active');
            backdrop.classList.remove('active');
            body.style.overflow = '';
            isMenuOpen = false;
        }

        // Function to open menu
        function openMenu() {
            if (isMenuOpen) return;
            desktopNav.classList.add('nav-open');
            menuToggle.classList.add('active');
            backdrop.classList.add('active');
            body.style.overflow = 'hidden';
            isMenuOpen = true;
        }

        // Toggle menu on button click
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            isMenuOpen ? closeMenu() : openMenu();
        });

        // Touch event for better mobile support
        menuToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
            e.stopPropagation();
            isMenuOpen ? closeMenu() : openMenu();
        }, { passive: false });

        // Close menu when clicking backdrop
        backdrop.addEventListener('click', closeMenu);
        backdrop.addEventListener('touchstart', closeMenu);

        // Close menu when clicking a nav link
        const navLinks = desktopNav.querySelectorAll('a:not(.lang-btn)');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 900) {
                    setTimeout(closeMenu, 100);
                }
            });
        });

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth > 900) {
                    closeMenu();
                }
            }, 250);
        }, { passive: true });
    }
    
    function initScrollHeader() {
        // Sticky Header Scroll Effect - Optimized
        let ticking = false;
        
        function updateHeader() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
            
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });
    }
    
    function initScrollReveal() {
        // Simple and fast visibility check
        let scrollTimeout;
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        if (revealElements.length === 0) return;
        
        function checkVisibility() {
            const windowHeight = window.innerHeight;
            const triggerPoint = windowHeight * 0.85;
            
            revealElements.forEach(function(element) {
                if (element.classList.contains('visible')) return;
                
                const elementTop = element.getBoundingClientRect().top;
                
                if (elementTop < triggerPoint) {
                    element.classList.add('visible');
                }
            });
        }
        
        // Run once on load
        checkVisibility();
        
        // Optimized scroll listener
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            scrollTimeout = setTimeout(checkVisibility, 50);
        }, { passive: true });
    }
})();





// Function to open the modal
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

// Function to close the modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

document.addEventListener('DOMContentLoaded', () => {
    // Existing Mobile Menu Toggle code...
    const menuToggle = document.querySelector('.menu-toggle');
    const desktopNav = document.querySelector('.desktop-nav');

    menuToggle.addEventListener('click', () => {
        desktopNav.classList.toggle('nav-open'); 
    });
    
    // Close modal if user clicks outside of it
    window.onclick = function(event) {
        const modal = document.getElementById('about-modal');
        if (event.target == modal) {
            closeModal('about-modal');
        }
    }
});






// --- LANGUAGE SWITCHER ---

// Toggle language dropdown
document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    
    if (langBtn && langDropdown) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langBtn.classList.toggle('active');
            langDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            langBtn.classList.remove('active');
            langDropdown.classList.remove('show');
        });
    }
    
    // Load saved language preference
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    if (savedLang === 'hi') {
        switchLanguage('hi');
    }
});

// Language translations
const translations = {
    en: {
        // Navigation
        services: "Services",
        caseStudies: "Case Studies",
        about: "About",
        getStarted: "Get Started",
        language: "English",
        
        // Hero Section
        heroTitle: "Build a Bold Digital Identity That Commands Attention",
        heroSubtitle1: "Premium digital experiences that blend strategy, performance, and design excellence to help brands grow faster, look stronger, and connect deeper.",
        heroSubtitle2: "We don't just create digital assets — we build strong brands, lasting impressions, and long-term success.",
        heroCTA: "Create Something Remarkable",
        trustBar: "Trusted for reliability, transparency, and consistent delivery of high-quality results.",
        
        // Services Section
        servicesTitle: "Digital Solutions Built for Growth, Performance & Impact",
        servicesSubtitle: "Every experience we create is designed with precision and purpose — combining modern aesthetics with intelligent functionality.",
        servicesCTA: "Let's Build Your Digital Future →",
        
        // Service Cards
        seoTitle: "🔍 Search Engine Optimization",
        seoDesc: "Drive high-intent traffic with strategic SEO that builds instant trust and converts visitors into long-term customers.",
        
        instaTitle: "📸 Instagram Management",
        instaDesc: "Premium Instagram presence management focused on authentic engagement and building a community that connects with your brand.",
        
        smmTitle: "🖼️ Social Media Design",
        smmDesc: "Scroll-stopping visual content with clean layouts and smooth interactions that feel premium, powerful, and future-ready.",
        
        videoTitle: "🎥 Video Content Creation",
        videoDesc: "High-quality short-form video content designed to capture attention instantly and maximize reach across platforms.",
        
        adsTitle: "📢 Paid Advertising",
        adsDesc: "Performance-focused ad campaigns that deliver real business impact with precision targeting and measurable ROI.",
        
        emailTitle: "📧 Email Marketing",
        emailDesc: "Automated sequences and personalized campaigns that nurture leads and build lasting customer relationships.",
        
        b2bTitle: "🤝 B2B Marketing",
        b2bDesc: "Strategic solutions designed to generate high-value business leads and accelerate growth in complex sales cycles.",
        
        consultingTitle: "⚙️ Strategic Consulting",
        consultingDesc: "Expert guidance driven by innovation and attention to detail to solve your toughest challenges and unlock growth.",
        
        // Case Studies
        caseStudiesTitle: "Real Business Impact. Measurable Results.",
        caseStudiesSubtitle: "We focus on speed, scalability, security, and seamless user experience — delivering solutions that perform flawlessly.",
        caseStudyTitle: "Case Study: Fusion Fitness (Regional Gym Chain)",
        caseStudyDesc: "Fusion Fitness was struggling to convert high ad spend into actual sign-ups. Their brand lacked consistency online, costing them trust and conversions.",
        metric1: "+210%",
        metric1Label: "Organic Leads",
        metric2: "-35%",
        metric2Label: "Cost Per Lead (CPL)",
        metric3: "78%",
        metric3Label: "Higher Engagement",
        strategy: "— Strategy combined SEO, SMM, and Paid Ads.",
        viewMore: "View More Success Stories",
        
        // Footer
        footerTitle: "Ready to Elevate Your Brand?",
        footerTagline: "Your vision, powered by our expertise — built for growth, performance, and impact.",
        namePlaceholder: "Your Name",
        emailPlaceholder: "Business Email",
        messagePlaceholder: "Tell us about your vision...",
        submitButton: "Start the Conversation",
        copyright: "© 2025 BrandRise Digital. All rights reserved."
    },
    hi: {
        // Navigation
        services: "सेवाएं",
        caseStudies: "केस स्टडीज",
        about: "हमारे बारे में",
        getStarted: "शुरू करें",
        language: "हिंदी",
        
        // Hero Section
        heroTitle: "एक बोल्ड डिजिटल पहचान बनाएं जो ध्यान आकर्षित करे",
        heroSubtitle1: "प्रीमियम डिजिटल अनुभव जो रणनीति, प्रदर्शन और डिज़ाइन उत्कृष्टता को मिलाते हैं ताकि ब्रांड तेजी से बढ़ें, मजबूत दिखें और गहराई से जुड़ें।",
        heroSubtitle2: "हम सिर्फ डिजिटल संपत्ति नहीं बनाते — हम मजबूत ब्रांड, स्थायी प्रभाव और दीर्घकालिक सफलता बनाते हैं।",
        heroCTA: "कुछ उल्लेखनीय बनाएं",
        trustBar: "विश्वसनीयता, पारदर्शिता और उच्च गुणवत्ता परिणामों की निरंतर डिलीवरी के लिए भरोसेमंद।",
        
        // Services Section
        servicesTitle: "विकास, प्रदर्शन और प्रभाव के लिए डिजिटल समाधान",
        servicesSubtitle: "हम जो भी अनुभव बनाते हैं वह सटीकता और उद्देश्य के साथ डिज़ाइन किया गया है — आधुनिक सौंदर्यशास्त्र को बुद्धिमान कार्यक्षमता के साथ जोड़ते हुए।",
        servicesCTA: "आइए अपना डिजिटल भविष्य बनाएं →",
        
        // Service Cards
        seoTitle: "🔍 सर्च इंजन ऑप्टिमाइजेशन",
        seoDesc: "रणनीतिक SEO के साथ उच्च-इरादे वाले ट्रैफ़िक को चलाएं जो तुरंत विश्वास बनाता है और आगंतुकों को दीर्घकालिक ग्राहकों में परिवर्तित करता है।",
        
        instaTitle: "📸 इंस्टाग्राम प्रबंधन",
        instaDesc: "प्रीमियम इंस्टाग्राम उपस्थिति प्रबंधन जो प्रामाणिक जुड़ाव और एक समुदाय बनाने पर केंद्रित है जो आपके ब्रांड से जुड़ता है।",
        
        smmTitle: "🖼️ सोशल मीडिया डिज़ाइन",
        smmDesc: "स्क्रॉल-रोकने वाली दृश्य सामग्री साफ लेआउट और सुचारू इंटरैक्शन के साथ जो प्रीमियम, शक्तिशाली और भविष्य के लिए तैयार महसूस होती है।",
        
        videoTitle: "🎥 वीडियो सामग्री निर्माण",
        videoDesc: "उच्च-गुणवत्ता वाली लघु-रूप वीडियो सामग्री जो तुरंत ध्यान आकर्षित करने और प्लेटफार्मों पर पहुंच को अधिकतम करने के लिए डिज़ाइन की गई है।",
        
        adsTitle: "📢 पेड विज्ञापन",
        adsDesc: "प्रदर्शन-केंद्रित विज्ञापन अभियान जो सटीक लक्ष्यीकरण और मापने योग्य ROI के साथ वास्तविक व्यावसायिक प्रभाव प्रदान करते हैं।",
        
        emailTitle: "📧 ईमेल मार्केटिंग",
        emailDesc: "स्वचालित अनुक्रम और व्यक्तिगत अभियान जो लीड का पोषण करते हैं और स्थायी ग्राहक संबंध बनाते हैं।",
        
        b2bTitle: "🤝 B2B मार्केटिंग",
        b2bDesc: "रणनीतिक समाधान जो उच्च-मूल्य व्यावसायिक लीड उत्पन्न करने और जटिल बिक्री चक्रों में विकास को तेज करने के लिए डिज़ाइन किए गए हैं।",
        
        consultingTitle: "⚙️ रणनीतिक परामर्श",
        consultingDesc: "नवाचार और विस्तार पर ध्यान देने से प्रेरित विशेषज्ञ मार्गदर्शन आपकी सबसे कठिन चुनौतियों को हल करने और विकास को अनलॉक करने के लिए।",
        
        // Case Studies
        caseStudiesTitle: "वास्तविक व्यावसायिक प्रभाव। मापने योग्य परिणाम।",
        caseStudiesSubtitle: "हम गति, स्केलेबिलिटी, सुरक्षा और निर्बाध उपयोगकर्ता अनुभव पर ध्यान केंद्रित करते हैं — ऐसे समाधान प्रदान करते हैं जो त्रुटिहीन रूप से प्रदर्शन करते हैं।",
        caseStudyTitle: "केस स्टडी: फ्यूजन फिटनेस (क्षेत्रीय जिम चेन)",
        caseStudyDesc: "फ्यूजन फिटनेस उच्च विज्ञापन खर्च को वास्तविक साइन-अप में बदलने के लिए संघर्ष कर रहा था। उनके ब्रांड में ऑनलाइन स्थिरता की कमी थी, जिससे उन्हें विश्वास और रूपांतरण की लागत आ रही थी।",
        metric1: "+210%",
        metric1Label: "ऑर्गेनिक लीड्स",
        metric2: "-35%",
        metric2Label: "प्रति लीड लागत",
        metric3: "78%",
        metric3Label: "उच्च जुड़ाव",
        strategy: "— रणनीति ने SEO, SMM और पेड विज्ञापनों को मिलाया।",
        viewMore: "अधिक सफलता की कहानियां देखें",
        
        // Footer
        footerTitle: "अपने ब्रांड को ऊंचा उठाने के लिए तैयार हैं?",
        footerTagline: "आपकी दृष्टि, हमारी विशेषज्ञता द्वारा संचालित — विकास, प्रदर्शन और प्रभाव के लिए निर्मित।",
        namePlaceholder: "आपका नाम",
        emailPlaceholder: "व्यावसायिक ईमेल",
        messagePlaceholder: "हमें अपनी दृष्टि के बारे में बताएं...",
        submitButton: "बातचीत शुरू करें",
        copyright: "© 2025 BrandRise Digital। सर्वाधिकार सुरक्षित।"
    }
};

// Switch language function
function switchLanguage(lang) {
    // Save preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Update language button text
    const langText = document.querySelector('.lang-text');
    if (langText) {
        langText.textContent = translations[lang].language;
    }
    
    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(() => {
        // Update all translatable elements
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        });
    });
    
    // Close dropdown
    const langDropdown = document.getElementById('langDropdown');
    const langBtn = document.getElementById('langBtn');
    if (langDropdown && langBtn) {
        langDropdown.classList.remove('show');
        langBtn.classList.remove('active');
    }
}
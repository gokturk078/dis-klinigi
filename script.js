
document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // Scroll Progress Bar
    // ============================================
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.prepend(scrollProgress);

    function updateScrollProgress() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }

    // ============================================
    // Smart Sticky Header (Hide on scroll down, show on scroll up)
    // ============================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    const scrollThreshold = 100;

    function updateStickyHeader() {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= scrollThreshold) {
            navbar.classList.remove('scroll-up', 'scroll-down');
            navbar.classList.remove('shadow-md');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scrolling down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scrolling up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }

        if (currentScroll > 10) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }

        lastScroll = currentScroll;
    }

    // Combined scroll handler for performance
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        updateStickyHeader();
    }, { passive: true });

    // ============================================
    // Scroll-Triggered Animations (Intersection Observer)
    // ============================================
    const animationObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Only unobserve if not stagger animation
                if (!entry.target.classList.contains('animate-stagger')) {
                    animationObserver.unobserve(entry.target);
                }
            }
        });
    }, animationObserverOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-slide-right, .animate-scale, .animate-stagger').forEach(el => {
        animationObserver.observe(el);
    });

    // ============================================
    // Animated Counters
    // ============================================
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString('tr-TR');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString('tr-TR');
            }
        };

        updateCounter();
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.counter').forEach(counter => {
        counterObserver.observe(counter);
    });

    // --- Mobile Menu Logic ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        if (mobileMenu.classList.contains('translate-x-full')) {
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('translate-x-0');
            document.body.classList.add('overflow-hidden');
            document.body.classList.add('no-scroll');
        } else {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.classList.remove('translate-x-0');
            document.body.classList.remove('overflow-hidden');
            document.body.classList.remove('no-scroll');
        }

        // Reinitialize Lucide icons after menu is shown
        if (typeof lucide !== 'undefined') {
            setTimeout(() => lucide.createIcons(), 50);
        }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for sticky header offset
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- FAQ Accordion Logic ---
    const faqButtons = document.querySelectorAll('.faq-btn');

    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            const icon = button.querySelector('svg') || button.querySelector('i');
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            // Close all other items
            faqButtons.forEach(otherBtn => {
                if (otherBtn !== button) {
                    otherBtn.setAttribute('aria-expanded', 'false');
                    const otherContent = otherBtn.nextElementSibling;
                    const otherIcon = otherBtn.querySelector('svg') || otherBtn.querySelector('i');
                    if (otherContent) otherContent.style.maxHeight = null;
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            // Toggle current item
            button.setAttribute('aria-expanded', !isExpanded);
            if (!isExpanded) {
                if (content) content.style.maxHeight = content.scrollHeight + "px";
                if (icon) icon.style.transform = 'rotate(180deg)';
            } else {
                if (content) content.style.maxHeight = null;
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // --- Localization Logic ---
    const translations = {
        'tr': {
            // Top Banner
            'banner_urgent': '🦷 Diş Ağrınız mı Var? Aynı Gün Randevu Garantisi!',
            'banner_call': 'Hemen Ara: 0850 222 33 44',
            // Navbar & Hero
            'nav_services': 'Hizmetler',
            'nav_pain_free': 'Ağrısız Tedavi',
            'nav_doctors': 'Doktorlarımız',
            'nav_pricing': 'Fiyatlar',
            'nav_contact': 'İletişim',
            'nav_appointment': 'Randevu Al',
            'hero_badge': 'Ağrısız Tedavi Garantisi',
            'hero_title_1': 'Ağrısız Diş Tedavisi İçin',
            'hero_title_2': 'Doğru Adrestesiniz',
            'hero_desc': 'Dişçi koltuğu korkusuna son veriyoruz. Modern anestezi yöntemleri, güler yüzlü uzman kadromuz ve konforlu ortamımızla tanışın.',
            'hero_list_1': 'İğnesiz Lokal Anestezi Seçeneği',
            'hero_list_2': '10+ Yıl Deneyimli Uzman Hekimler',
            'hero_list_3': 'Çocuk Dostu & Aile Ortamı',
            'hero_cta_1': 'Hemen Randevu Al',
            'hero_cta_2': 'Hizmetleri İncele',
            'trust_ministry': 'Bakanlık Onaylı',
            'trust_patients': '10k+ Mutlu Hasta',
            'trust_rating': '5.0 Google Puanı',
            'badge_hygiene_label': 'Hijyen Standardı',
            'badge_hygiene_value': '%100 Sterilizasyon',

            // Services
            'services_subtitle': 'TEDAVİLERİMİZ',
            'services_title': 'Tüm Diş Tedavileriniz <br>Tek Çatı Altında',
            'service_1_title': 'Dolgu ve Kanal Tedavisi',
            'service_1_desc': 'Modern materyallerle estetik dolgular ve mikroskop altında yapılan hassas kanal tedavileri.',
            'service_2_title': 'Diş Beyazlatma',
            'service_2_desc': 'Lazer ve ofis tipi beyazlatma sistemleri ile tek seansda 2-3 ton daha beyaz dişler.',
            'service_3_title': 'Porselen Laminat',
            'service_3_desc': 'Hollywood Smile tasarımı için ultra ince yaprak porselenler ile mükemmel gülüş estetiği.',
            'service_4_title': 'İmplant Tedavisi',
            'service_4_desc': 'Dijital planlama ile eksik dişleriniz için %99 başarı oranlı, ömür boyu garantili implantlar.',
            'service_5_title': 'Ortodonti (Tel/Plak)',
            'service_5_desc': 'Şeffaf plaklar (telsiz tedavi) veya modern braketlerle diş çapraşıklığı düzeltme.',
            'service_6_title': 'Çocuk Diş Hekimliği',
            'service_6_desc': 'Pedodontist eşliğinde, oyun alanı bulunan kliniğimizde korkusuz çocuk diş tedavileri.',
            'service_7_title': 'Diş Eti Tedavileri',
            'service_7_desc': 'Diş eti çekilmesi, kanaması tedavileri ve lazerle estetik diş eti şekillendirme (pembe estetik).',
            'service_8_title': 'Cerrahi & Çekim',
            'service_8_desc': 'Gömülü 20 yaş diş çekimi ve kist operasyonları. Sedasyon seçeneği ile %0 ağrı.',
            'read_more': 'Detaylı Bilgi',
            'cta_free_exam': 'Ücretsiz Muayene Randevusu Al',

            // Shared
            'why_us': 'Neden Biz?',
            'process': 'Tedavi Süreci',
            'process_title': 'Adım Adım <span class="text-clinical-primary">Tedavi Süreci</span>',

            // Dolgu & Kanal Page
            'service_filling_title': 'Dolgu ve <span class="text-clinical-primary">Kanal Tedavisi</span>',
            'service_filling_desc': 'Çürük dişlerinizi modern kompozit dolgularla estetik şekilde tedavi ediyoruz. İleri kanal tedavileri için mikroskop altında hassas işlemler uygulayarak dişinizi kurtarıyoruz.',
            'about_filling_title': 'Dolgu ve Kanal Tedavisi Nedir?',
            'about_filling_desc': '<strong>Dolgu tedavisi</strong>, çürük veya kırık dişlerin estetik ve fonksiyonel olarak restore edilmesidir. <strong>Kanal tedavisi</strong> ise dişin sinir dokusunun (pulpa) enfekte olduğu durumlarda uygulanan bir prosedürdür.',
            'filling_benefits_title': "DentaCare'de <span class=\"text-clinical-primary\">Dolgu & Kanal</span> Avantajları",
            'filling_ben_1_title': 'Mikroskop Altında İşlem',
            'filling_ben_1_desc': '20x büyütme ile kanal ağızlarını hassas şekilde tespit ediyoruz.',
            'filling_ben_2_title': 'Dijital Anestezi',
            'filling_ben_2_desc': 'İğnesiz anestezi seçeneği ile ağrısız tedavi deneyimi.',
            'filling_ben_3_title': 'Estetik Dolgu',
            'filling_ben_3_desc': 'Diş renginize uygun kompozit malzeme ile doğal görünüm.',
            'filling_ben_4_title': 'Hızlı İyileşme',
            'filling_ben_4_desc': 'Aynı gün normal yaşantınıza dönebilirsiniz.',
            'filling_step_1_title': 'Muayene & Röntgen',
            'filling_step_1_desc': 'Dijital röntgen ile çürük veya enfeksiyon tespit edilir.',
            'filling_step_2_title': 'Lokal Anestezi',
            'filling_step_2_desc': 'Dijital anestezi ile ağrısız uyuşturma sağlanır.',
            'filling_step_3_title': 'Tedavi İşlemi',
            'filling_step_3_desc': 'Çürük temizlenir, kanal (gerekirse) şekillendirilir ve doldurulur.',
            'filling_step_4_title': 'Restorasyon',
            'filling_step_4_desc': 'Kompozit dolgu ile diş estetik şekilde restore edilir.',
            'filling_faq_1_q': 'Dolgu tedavisi ağrılı mıdır?',
            'filling_faq_1_a': 'Hayır. Modern anestezi yöntemleri sayesinde dolgu tedavisi sırasında ağrı hissetmezsiniz. İşlem sonrasında hafif bir hassasiyet olabilir ancak bu genellikle birkaç saat içinde geçer.',
            'filling_faq_2_q': 'Kanal tedavisi ne kadar sürer?',
            'filling_faq_2_a': 'Çoğu kanal tedavisi tek seansta, yaklaşık 45-60 dakika içinde tamamlanır. Karmaşık vakalarda 2 seans gerekebilir.',
            'filling_faq_3_q': 'Dolgu malzemeleri ne kadar dayanır?',
            'filling_faq_3_a': 'Kaliteli kompozit dolgular doğru bakımla 10 yıl ve üzeri dayanabilir. Düzenli diş hekimi kontrolleri ve iyi ağız hijyeni ömrü uzatır.',
            'filling_faq_4_q': 'Kanal tedavisi sonrası kaplama gerekli mi?',
            'filling_faq_4_a': 'Arka dişlerde (azı dişleri) genellikle kaplama önerilir çünkü kanal tedavisi geçirmiş dişler daha kırılgan olabilir. Ön dişlerde sadece dolgu yeterli olabilir.',

            // Implant Page
            'implant_hero_title': '<span class="text-clinical-accent">Ömür Boyu Garantili</span> İmplant Tedavisi',
            'implant_hero_desc': 'Dijital 3D planlama ile eksik dişleriniz için %99 başarı oranlı, titanyum implantlar. Doğal diş hissi ve görünümü.',
            'implant_hero_cta': 'Ücretsiz Tomografi & Muayene',
            'implant_badge_title': '%99 Başarı Oranı',
            'implant_badge_desc': 'Premium İmplantlar',
            'about_treatment_label': 'Tedavi Hakkında', // generic
            'implant_about_title': 'İmplant Nedir?',
            'implant_about_desc_1': 'Diş implantı, eksik dişlerin yerine kemiğe yerleştirilen titanyum vidalardır. Üzerine takılan porselen kron ile doğal diş görünümü ve fonksiyonu sağlanır.',
            'implant_about_desc_2': 'Kliniğimizde <strong>Straumann</strong>, <strong>Nobel Biocare</strong> ve <strong>Osstem</strong> marka implantlar kullanıyoruz.',
            'implant_feat_1': '3D Dijital Planlama',
            'implant_feat_2': 'Ağrısız Cerrahi',
            'implant_feat_3': 'Hızlı İyileşme',
            'implant_feat_4': 'Ömür Boyu Garanti',
            'implant_cta_title': 'Eksik Dişlerinizi Tamamlayın',
            'implant_cta_desc': 'Ücretsiz 3D tomografi ve muayene ile implant uygunluğunuzu öğrenin.',
            'implant_cta_btn': 'Ücretsiz Randevu Al',

            // Whitening Page
            'whitening_hero_title': 'Profesyonel <span class="text-yellow-500">Diş Beyazlatma</span>',
            'whitening_hero_desc': 'Lazer ve ofis tipi beyazlatma sistemleri ile tek seansda 2-3 ton daha beyaz dişlere kavuşun. Güvenli, hızlı ve kalıcı sonuçlar.',
            'whitening_hero_cta': 'Ücretsiz Muayene Randevusu',
            'cta_call_now': 'Hemen Ara',
            'whitening_badge_title': '2-3 Ton Beyazlık',
            'whitening_badge_desc': 'Tek Seansta',
            'about_whitening_title': 'Diş Beyazlatma Nedir?',
            'about_whitening_desc_1': 'Diş beyazlatma, diş minesindeki renk tonunu açarak daha parlak ve beyaz bir gülümseme elde etmenizi sağlayan kozmetik bir işlemdir.',
            'about_whitening_desc_2': 'Kliniğimizde <strong>ofis tipi (in-office)</strong> ve <strong>ev tipi</strong> beyazlatma seçenekleri sunuyoruz. Profesyonel jel ve özel LED ışık ile güvenli sonuçlar elde ediyoruz.',
            'whitening_feat_1': '1 Saatlik İşlem',
            'whitening_feat_2': 'Hassasiyet Yok',
            'whitening_feat_3': '2 Yıl+ Kalıcılık',
            'whitening_feat_4': 'FDA Onaylı',
            'whitening_benefits_title': 'DentaCare <span class="text-yellow-500">Beyazlatma</span> Avantajları',
            'whitening_ben_1_title': 'LED Işık Teknolojisi',
            'whitening_ben_1_desc': 'Özel dalga boylu LED ile hızlı ve etkili beyazlatma.',
            'whitening_ben_2_title': 'Mine Koruması',
            'whitening_ben_2_desc': 'Diş minesine zarar vermeden güvenli beyazlatma.',
            'whitening_ben_3_title': 'Anında Sonuç',
            'whitening_ben_3_desc': 'Tek seansta görünür fark. Hemen parlamaya başlayın.',
            'whitening_ben_4_title': 'Hassas Dişler için',
            'whitening_ben_4_desc': 'Hassasiyet önleyici jel ile konforlu deneyim.',
            'whitening_cta_title': 'Işıldayan Bir Gülümseme İster Misiniz?',
            'whitening_cta_desc': 'Ücretsiz muayene randevunuzu hemen alın. Profesyonel ekibimiz size en uygun beyazlatma yöntemini önereceğiz.',
            'whitening_cta_btn_1': 'Ücretsiz Randevu Al',

            // Laminate Page
            'laminate_hero_title': '<span class="text-pink-500">Hollywood Smile</span> ile Mükemmel Gülüş',
            'laminate_hero_desc': 'Ultra ince yaprak porselenler ile dişlerinizi aşındırmadan doğal, kusursuz bir gülüşe kavuşun. 0.3mm kalınlıkta, diş renginde laminatlar.',
            'laminate_hero_cta': 'Ücretsiz Tasarım Randevusu',
            'laminate_badge_title': '15 Yıl+ Garanti',
            'laminate_badge_desc': 'Premium Kalite',
            'about_laminate_title': 'Porselen Laminat (Veneer) Nedir?',
            'about_laminate_desc_1': 'Porselen laminat, dişlerin ön yüzeyine yapıştırılan ultra ince (0.3-0.5mm) porselen kaplamalardır. Diş rengindeki değişimler, kırıklar, aralıklar ve şekil bozuklukları bu yöntemle düzeltilebilir.',
            'about_laminate_desc_2': '<strong>E-Max</strong> ve <strong>Feldspat</strong> porselen seçenekleri ile doğal diş görünümü ve parlaklığı sağlanır.',
            'laminate_feat_1': 'Minimal Aşındırma',
            'laminate_feat_2': 'Doğal Görünüm',
            'laminate_feat_3': 'Lekelenmeye Dayanıklı',
            'laminate_feat_4': '2 Seansta Tamamlanır',
            'laminate_cta_title': 'Hayalinizdeki Gülüşe Kavuşun',
            'laminate_cta_desc': 'Dijital gülüş tasarımı ile tedavi öncesi sonucu görün. Ücretsiz danışmanlık randevunuzu alın.',
            'laminate_cta_btn': 'Ücretsiz Randevu Al',

            // Child Page
            'child_hero_title': '<span class="text-orange-500">Korkusuz</span> Çocuk Diş Tedavisi',
            'child_hero_desc': 'Pedodontist eşliğinde, oyun alanı bulunan kliniğimizde çocuğunuz diş hekimini sevecek. Eğlenceli ve ağrısız tedaviler.',
            'child_hero_cta': 'Çocuk Muayene Randevusu',
            'child_badge_title': 'Mutlu Çocuklar',
            'child_badge_desc': 'Oyun Alanı Mevcut',
            'about_pedodontics_label': 'Pedodonti',
            'about_child_title': 'Çocuk Diş Hekimliği Nedir?',
            'about_child_desc': 'Pedodonti, 0-14 yaş arası çocukların diş sağlığıyla ilgilenen uzmanlık dalıdır. Çocuğunuzun diş korkusu geliştirmeden sağlıklı ağız alışkanlıkları kazanmasını sağlıyoruz.',
            'child_feat_1': 'Uzman Pedodontist',
            'child_feat_2': 'Çocuk Psikolojisi',
            'child_feat_3': 'Oyun Alanı',
            'child_feat_4': 'Ödül Sistemi',
            'child_services_title': 'Çocuk Diş Tedavileri',
            'child_service_1_title': 'Fissür Örtücü',
            'child_service_1_desc': 'Diş çürüklerini önlemek için azı dişlerinin oluk ve çukurlarına koruyucu örtü.',
            'child_service_2_title': 'Flor Uygulaması',
            'child_service_2_desc': 'Diş minesini güçlendiren ve çürüğe karşı koruma sağlayan flor jeli.',
            'child_service_3_title': 'Süt Dişi Tedavisi',
            'child_service_3_desc': 'Süt dişi dolgulu, kanal tedavisi ve çekim işlemleri.',
            'child_cta_title': 'Çocuğunuzun İlk Diş Muayenesi',
            'child_cta_desc': 'Dünya Sağlık Örgütü, ilk diş muayenesinin 1 yaşından önce yapılmasını öneriyor.',
            'child_cta_btn': 'Randevu Al',

            // Gum Page
            'gum_hero_title': '<span class="text-rose-500">Pembe Estetik</span> & Diş Eti Tedavisi',
            'gum_hero_desc': 'Diş eti çekilmesi, kanamayı ve iltihaplanmayı lazer ile tedavi ediyoruz.',
            'gum_hero_cta': 'Randevu Al',
            'gum_about_title': 'Diş Eti Hastalıkları',
            'gum_about_desc': 'Periodontitis tedavi edilmezse diş kaybına yol açabilir. Lazer ile ağrısız, dikişsiz tedavi sunuyoruz.',
            'gum_prob_1_title': 'Diş Eti Kanaması',
            'gum_prob_1_desc': 'Gingivitis belirtisi',
            'gum_prob_2_title': 'Diş Eti Çekilmesi',
            'gum_prob_2_desc': 'Hassasiyet ve estetik',
            'gum_prob_3_title': 'Gummy Smile',
            'gum_prob_3_desc': 'Lazer ile düzeltme',
            'gum_cta_title': 'Sağlıklı Diş Etleri',
            'gum_cta_btn': 'Randevu Al',

            // Ortho Page
            'ortho_hero_title': '<span class="text-purple-600">Şeffaf Plak</span> ile Görünmez Tedavi',
            'ortho_hero_desc': 'Telsiz ortodonti (şeffaf plak) veya modern metal/seramik braketlerle diş çapraşıklığını düzeltiyoruz. Gülümsemeniz fark edilmeden düzeliyor.',
            'ortho_hero_cta': 'Ücretsiz Konsültasyon',
            'ortho_badge_title': 'Görünmez Tedavi',
            'ortho_badge_desc': 'Şeffaf Plaklar',
            'ortho_about_label': 'Tedavi Seçenekleri',
            'ortho_about_title': 'Ortodonti Nedir?',
            'ortho_about_desc': 'Ortodonti, diş ve çene düzensizliklerinin düzeltilmesiyle ilgilenen diş hekimliği dalıdır. Çapraşık dişler, aralıklı dişler ve kapanış bozuklukları tedavi edilir.',
            'ortho_opt_1_title': '🔮 Şeffaf Plak (Invisalign)',
            'ortho_opt_1_desc': 'Görünmez, çıkarılabilir plaklar. Günde 20-22 saat takılır. 6-18 ay tedavi süresi.',
            'ortho_opt_2_title': '🦷 Metal Braket',
            'ortho_opt_2_desc': 'Klasik ve etkili yöntem. Karmaşık vakalar için ideal. 12-24 ay tedavi süresi.',
            'ortho_opt_3_title': '✨ Seramik Braket',
            'ortho_opt_3_desc': 'Diş renginde braketler. Metal braket kadar etkili, daha estetik.',
            'ortho_cta_title': 'Düzgün Dişler, Güzel Gülüş',
            'ortho_cta_desc': 'Ücretsiz ortodonti konsültasyonu için randevu alın. Size en uygun tedavi seçeneğini belirleyelim.',
            'ortho_cta_btn': 'Ücretsiz Randevu Al',

            // Surgery Page
            'surgery_hero_title': '<span class="text-red-600">Cerrahi</span> & Diş Çekimi',
            'surgery_hero_desc': 'Gömülü 20 yaş diş çekimi ve kist operasyonları. Sedasyon seçeneği ile %0 ağrı garantisi.',
            'surgery_hero_cta': 'Randevu Al',
            'surgery_title': 'Cerrahi Tedavilerimiz',
            'surgery_item_1_title': 'Gömülü Diş Çekimi',
            'surgery_item_1_desc': '20 yaş dişleri dahil gömülü dişlerin cerrahi çekimi. Lokal veya sedasyon anestezisi.',
            'surgery_item_2_title': 'Kist Operasyonu',
            'surgery_item_2_desc': 'Çene kemiklerindeki kistlerin cerrahi olarak çıkarılması.',
            'surgery_item_3_title': 'Apikal Rezeksiyon',
            'surgery_item_3_desc': 'Kanal tedavisi yetersiz kalan dişlerde kök ucu ameliyatı.',
            'surgery_item_4_title': 'Sedasyon Seçeneği',
            'surgery_item_4_desc': 'Bilinçli sedasyon ile uyku halinde ameliyat. Korku ve ağrı yok.',
            'surgery_cta_title': 'Ağrısız Cerrahi İçin',
            'surgery_cta_btn': 'Randevu Al',

            // Pain-Free
            'pain_free_subtitle': 'HASTA KONFORU & PSİKOLOJİ',
            'pain_free_title_1': 'Nasıl',
            'pain_free_title_2': 'Ağrısız Tedavi',
            'pain_free_title_3': 'Yapıyoruz?',
            'pain_free_desc': 'Diş korkunuzu çok iyi anlıyoruz. Kliniğimiz, "Sıfır Ağrı" prensibi üzerine kurulmuştur. Sizin konforunuz bizim önceliğimizdir.',
            'pain_free_item_1_title': 'Dijital Anestezi (İğnesiz)',
            'pain_free_item_1_desc': 'Klasik iğne korkusuna son! Bilgisayar kontrollü sistem ile hissetmeyeceğiniz kadar minik dokunuşlar.',
            'pain_free_item_2_title': 'Sedasyon ile Uyku Hali',
            'pain_free_item_2_desc': 'Siz keyifli bir rüyadayken biz tedavimizi tamamlayalım. Uyandığınızda işlem bitmiş olacak.',
            'pain_free_item_3_title': 'Dental Lazer Teknolojisi',
            'pain_free_item_3_desc': 'Lazer ile yapılan diş eti ve dolgu işlemlerinde anesteziye bile gerek kalmaz, ses ve titreşim yoktur.',
            'painless_patients': '+1500 Hasta',
            'painless_testimonial': '"Kanal tedavisi oldum ve hiç hissetmedim, inanamıyorum!"',

            // Technology
            'tech_subtitle': 'İLERİ TEKNOLOJİ',
            'tech_title_1': 'Güven Veren',
            'tech_title_2': 'Modern Teknolojiler',
            'tech_desc': 'En son diş hekimliği teknolojileri ile teşhis ve tedavide hata payını sıfıra indiriyoruz.',
            'tech_1_title': 'Dijital Röntgen',
            'tech_1_desc': 'Saniyeler içinde, düşük radyasyonla tüm çene yapısının net görüntülenmesi.',
            'tech_2_title': '3D Tomografi',
            'tech_2_desc': 'Kemik yapısının 3 boyutlu incelenmesi ile hatasız implant planlaması.',
            'tech_3_title': 'CAD/CAM Sistemi',
            'tech_3_desc': 'Dijital ölçü ile aynı gün içinde porselen dişlerinizin üretimi ve teslimi.',
            'tech_4_title': 'Dental Lazer',
            'tech_4_desc': 'Yumuşak doku işlemlerinde kanamasız, dikişsiz ve hızlı iyileşme.',

            // Doctors
            'doctors_subtitle': 'UZMAN KADROMUZ',
            'doctors_title': 'Güvenilir Ellerdasınız',
            'dr_1_title': 'Protetik Diş Tedavisi Uzmanı',
            'dr_1_desc': 'İstanbul Üniversitesi DİF, 2010 Mezunu. Estetik diş hekimliği konusunda 12 yıl deneyim.',
            'dr_2_title': 'Çene Cerrahisi Uzmanı',
            'dr_2_desc': 'Ankara Üniversitesi, 2008 Mezunu. İmplant cerrahisi ve gömülü dişler konusunda uzman.',
            'dr_3_title': 'Çocuk Diş Hekimi (Pedodontist)',
            'dr_3_desc': 'Ege Üniversitesi, 2015 Mezunu. Çocuk psikolojisi ve korkusuz diş tedavisi sertifikalı.',
            'dr_4_title': 'Ortodonti Uzmanı',
            'dr_4_desc': 'Marmara Üniversitesi, 2012 Mezunu. Şeffaf plak ve modern tel tedavileri uzmanı.',

            // Gallery
            'gallery_subtitle': 'GERÇEK SONUÇLAR',
            'gallery_title': 'Gülüşünüzü Dönüştürüyoruz',
            'gallery_1_title': 'Ofis Tipi Diş Beyazlatma',
            'gallery_1_desc': '1 Seans Sonrası Sonuç',
            'gallery_2_title': 'Porselen Laminat (Yaprak Porselen)',
            'gallery_2_desc': 'Tam Gülüş Tasarımı',
            'gallery_3_title': 'İmplant ve Zirkonyum Kaplama',
            'gallery_3_desc': 'Eksik Diş Telafisi',
            'gallery_note': '* Bu görseller, hastaların onayı ile bilgilendirme amaçlı paylaşılmıştır. Sonuçlar kişiden kişiye değişiklik gösterebilir.',

            // Pricing
            'price_subtitle': 'ŞEFFAF FİYAT POLİTİKASI',
            'price_title': 'Tahmini Fiyat Listesi',
            'price_desc': 'Kesin fiyatlar, ücretsiz ilk muayene ve röntgen analizi sonrası belirlenmektedir.',
            'price_col_treatment': 'Tedavi',
            'price_col_range': 'Fiyat Aralığı',
            'price_row_1': 'İlk Muayene & Panoramik Röntgen',
            'price_row_1_sub': 'Randevu ile gelenler için',
            'price_free': 'ÜCRETSİZ',
            'price_row_2': 'Kompozit Dolgu (Tek Diş)',
            'price_row_3': 'Kanal Tedavisi (Tek Diş)',
            'price_row_4': 'İmplant (Yerli/İthal Seçenekli)',
            'price_row_5': 'Zirkonyum Kaplama (Diş Başı)',
            'price_row_6': 'Diş Beyazlatma (Ofis Tipi)',
            'price_note': 'Tüm kredi kartlarına 12 taksit imkanı mevcuttur.',

            // Testimonials
            'testimonial_subtitle': 'HASTA YORUMLARI',
            'testimonial_title_1': 'Mutlu Gülüşler,',
            'testimonial_title_2': 'Mutlu Hikayeler',
            'testimonial_google': '4.9/5 Müşteri Memnuniyeti',
            'review_1': '"Hayatımda gittiğim en temiz ve ilgili klinik. Dişçi fobim vardı, kapıdan girdiğim an o korku gitti. Kanal tedavimi sedasyonla oldum, hiçbir şey hatırlamıyorum. Ellerinize sağlık."',
            'review_2': '"Oğlumu ilk diş muayenesine getirdim. Dt. Elif Hanım o kadar tatlı yaklaştı ki oğlum şimdi \'dişçiye gidelim\' diye tutturuyor. Çocuklar için harika bir ortam."',
            'review_3': '"İmplant tedavim için çok araştırdım, burayı tercih ettim. İyi ki de etmişim. Ağrısız, şişliksiz bir süreç geçirdim. Fiyatlar da hizmet kalitesine göre çok makul."',

            // FAQ
            'faq_subtitle': 'MERAK ETTİKLERİNİZ',
            'faq_title': 'Sıkça Sorulan Sorular',
            'faq_q_1': 'İmplant tedavisi ağrılı mıdır?',
            'faq_a_1': 'Hayır. İmplant işlemi lokal anestezi altında yapılır ve işlem sırasında hiçbir ağrı hissetmezsiniz. Tedavi sonrası oluşabilecek hafif hassasiyet için basit ağrı kesiciler yeterli olmaktadır.',
            'faq_q_2': 'Kanal tedavisi ne kadar sürer?',
            'faq_a_2': 'Modern teknikler ve deneyimli hekimlerimiz sayesinde kanal tedavileri genellikle tek seansta, yaklaşık 45-60 dakika içinde tamamlanmaktadır.',
            'faq_q_3': 'Çocuğumu ne zaman diş hekimine getirmeliyim?',
            'faq_a_3': 'İlk diş hekimi muayenesinin ilk diş çıktığında (yaklaşık 6. ay) veya en geç 1 yaşını doldurmadan yapılması önerilmektedir.',
            'faq_q_4': 'Tedavi esnasında ağrı hissedersem ne olur?',
            'faq_a_4': 'Hekimlerimiz sürekli iletişim halindedir. En ufak rahatsızlıkta elinizi kaldırmanız yeterlidir; işlem durdurulur ve ek anestezi uygulanır.',
            'faq_q_5': 'Ödeme seçenekleriniz nelerdir?',
            'faq_a_5': 'Nakit, kredi kartı ve havale kabul ediyoruz. Tüm kredi kartlarına taksit imkanlarımız bulunmaktadır.',

            // Placeholders
            'ph_name': 'Örn: Ahmet Yılmaz',
            'ph_phone': 'Örn: 0532 123 45 67',
            'ph_message': 'Diş ağrım var, implant fiyatı öğrenmek istiyorum...',

            // Appointment & Contact & Footer
            'appt_section_title': 'Gülümsemenizi <br>Ertelemeyin',
            'appt_section_desc': 'Hemen randevu formunu doldurun, sizi arayıp en uygun zamanı planlayalım. Veya WhatsApp üzerinden saniyeler içinde randevu alın.',
            'appt_subtitle': 'HEMEN BAŞVURUN',
            'appt_title': 'Ücretsiz Muayene Randevusu',
            'appt_desc': 'Formu doldurun, sizi 10 dakika içinde arayıp randevunuzu oluşturalım. Ağrısız bir gülüşe ilk adımı atın.',
            'contact_label_phone': 'Telefon',
            'contact_label_whatsapp': 'WhatsApp',
            'contact_label_email': 'E-Posta',
            'form_name': 'Adınız Soyadınız',
            'form_phone': 'Telefon Numaranız',
            'form_treatment': 'Tedavi Türü',
            'form_date': 'İstediğiniz Tarih (Opsiyonel)',
            'form_message': 'Şikayetiniz / Mesajınız (Opsiyonel)',
            'form_submit': 'Randevu Talebini Gönder',
            'whatsapp_desc': 'Veya WhatsApp üzerinden hızlıca iletişime geçin:',
            'whatsapp_button': 'WhatsApp ile Yazışın',

            // Form Options
            'opt_general': 'Genel Muayene',
            'opt_emergency': 'Diş Ağrısı / Acil',
            'opt_implant': 'İmplant Tedavisi',
            'opt_whitening': 'Diş Beyazlatma',
            'opt_ortho': 'Ortodonti (Tel/Plak)',
            'opt_child': 'Çocuk Diş Tedavisi',
            'opt_other': 'Diğer',
            'contact_section_title': 'İletişim & Ulaşım',
            'contact_address': 'Adresimiz',
            'contact_phone': 'Telefon',
            'contact_hours': 'Çalışma Saatleri',
            'days_weekday': 'Hafta İçi:',
            'days_saturday': 'Cumartesi:',
            'days_sunday': 'Pazar:',
            'footer_about': 'Ağrısız diş hekimliği konseptiyle hizmet veren kliniğimizde, son teknoloji cihazlar ve uzman kadromuzla gülüşünüzü tasarlıyoruz.',
            'footer_links': 'Hızlı Bağlantılar',
            'footer_services': 'Popüler Tedaviler',
            'footer_copyright': '&copy; 2024 DentaCare Klinik. Tüm hakları saklıdır.',

            // Before/After Slider
            'ba_before': 'ÖNCE',
            'ba_after': 'SONRA',
            'gallery_desc': 'Kaydırıcıyı hareket ettirerek tedavi öncesi ve sonrası farkı görün',

            // Booking Wizard
            'wizard_subtitle': 'Hızlı Randevu',
            'wizard_title': '3 Adımda Online Randevu',
            'wizard_desc': 'Hizmet seçin, doktor belirleyin, size uygun zamanı ayarlayın.',
            'wizard_step1': 'Hizmet',
            'wizard_step2': 'Doktor',
            'wizard_step3': 'Tarih/Saat',
            'wizard_select_service': 'Tedavi Seçin',
            'wizard_select_doctor': 'Doktor Seçin',
            'wizard_select_datetime': 'Tarih ve Saat Seçin',
            'wizard_date': 'Tarih',
            'wizard_time': 'Saat',
            'wizard_back': 'Geri',
            'wizard_confirm': 'Randevuyu Onayla',
            'wizard_success_title': 'Randevunuz Alındı!',
            'wizard_success_desc': 'En kısa sürede sizi arayarak randevunuzu onaylayacağız.',
            'wizard_new_appointment': 'Yeni Randevu',

            // Cost Calculator
            'calc_subtitle': 'Fiyat Hesaplama',
            'calc_title': 'Online Tedavi Maliyet Hesaplayıcı',
            'calc_desc': 'Tedavilerinizi seçin, tahmini maliyeti anında görün.',
            'calc_total': 'Toplam Tahmini Maliyet',
            'calc_monthly': 'Aylık Taksit (12 ay)',
            'calc_monthly_payment': 'Aylık Ödeme',
            'calc_one_time': 'Tek Seferde',
            'calc_installment': 'Taksitli',
            'calc_get_quote': 'Teklif Al',
            'calc_note': '* Kesin fiyatlar muayene sonrası belirlenir.',
            'calc_select_treatments': 'Tedavileri Seçin',
            'calc_implant': 'Dental İmplant',
            'calc_implant_desc': 'Premium Straumann/Nobel',
            'calc_zirconium': 'Zirkonyum Kaplama',
            'calc_zirconium_desc': 'Full Porselen Estetik',
            'calc_whitening': 'Diş Beyazlatma',
            'calc_whitening_desc': 'Ofis Tipi LED Beyazlatma',
            'calc_laminate': 'Porselen Laminat',
            'calc_laminate_desc': 'E-Max Veneer',
            'calc_filling': 'Estetik Dolgu',
            'calc_filling_desc': 'Kompozit Restorasyon',

            // Before/After Gallery
            'gallery_subtitle': 'Gerçek Sonuçlar',
            'gallery_title': 'Gülüşünüzü Dönüştürüyoruz',
            'gallery_desc': 'Hastalarımızın tedavi öncesi ve sonrası gerçek görüntüleri',
            'gallery_before': 'ÖNCE',
            'gallery_after': 'SONRA',
            'gallery_case_whitening': 'Diş Beyazlatma',
            'gallery_case_whitening_desc': '1 Seans • Ofis Tipi LED',
            'gallery_case_veneers': 'Porselen Laminat',
            'gallery_case_veneers_desc': '8 Diş • Hollywood Smile',
            'gallery_case_implant': 'İmplant Tedavisi',
            'gallery_case_implant_desc': '2 İmplant • All-on-4',

            // Chat Widget
            'chat_title': 'Canlı Destek',
            'chat_welcome': 'Merhaba! 👋 Size nasıl yardımcı olabilirim?',
            'chat_placeholder': 'Mesajınızı yazın...',
            'chat_quick_appointment': 'Randevu Almak İstiyorum',
            'chat_agent_name': 'Seda Yılmaz',
            'chat_agent_role': 'Müşteri İlişkileri',
            'chat_welcome_p1': 'Merhaba! 👋 DentaCare\'e hoş geldiniz.',
            'chat_welcome_p2': 'Size nasıl yardımcı olabilirim?',
            'chat_action_appt': '📅 Randevu Al',
            'chat_action_price': '💰 Fiyatlar',
            'chat_action_emergency': '🚨 Acil Durum',
            'chat_action_whatsapp': '📱 WhatsApp\'tan Görüşelim',
            'chat_action_call': '📞 Sizi Arayalım',
            'chat_system_redirect': 'Uzmanımıza aktarılıyorsunuz...',
            'chat_system_call_req': 'Numaranızı girin:',
            'chat_call_success': '✅ Talebiniz alındı! 15 dk içinde aranacaksınız.',
            'chat_greeting_morning': 'Günaydın! ☀️',
            'chat_greeting_afternoon': 'Tünaydın! 🌤️',
            'chat_greeting_evening': 'İyi akşamlar! 🌙',
            'chat_trigger_implant': 'Eksik dişlerinizi tamamlamak ister misiniz?',
            'chat_trigger_price': 'Fiyatlarımız hakkında detaylı bilgi ister misiniz?',
            'chat_trigger_contact': 'Size hemen ulaşmamızı ister misiniz?',
            'chat_trigger_exit': 'Gitmeden önce bir sorunuz var mı?',
            'chat_ask_treatment': 'Hangi tedaviyle ilgileniyorsunuz?',
            'chat_ask_teeth_count': 'Kaç diş için düşünüyorsunuz?',
            'chat_option_implant': 'İmplant / Vidalı Diş',
            'chat_option_zirconium': 'Zirkonyum Kaplama',
            'chat_option_other': 'Diğer / Danışma',
            'chat_lead_offer': 'Sizin için özel bir kampanya tanımlayabilirim. WhatsApp üzerinden detaylı fiyat tablosunu göndermemi ister misiniz?',
            'chat_btn_yes_whatsapp': '✅ Evet, WhatsApp\'tan Gönder',
            'chat_btn_no_thanks': '❌ Hayır, Teşekkürler',
            'chat_quick_prices': 'Fiyat Bilgisi',
            'chat_quick_info': 'Bilgi Almak İstiyorum',

            // Seda 4.0 Smart Responses
            'seda_typing': 'Seda yazıyor',
            'seda_help': 'Size nasıl yardımcı olabilirim?',
            'seda_emergency': 'Diş ağrısı çok rahatsız edici, anlıyorum! 🦷 Sizi hemen aynı gün randevuya alalım.',
            'seda_emergency_btn': '🚨 ACİL Randevu Al',
            'seda_call_now': '📞 Hemen Ara',
            'seda_whitening': 'Diş beyazlatma ile ilgileniyorsunuz! ✨ Hollywood gülüşüne sadece bir adım uzaktasınız.',
            'seda_kids': 'Çocuk diş hekimliği (Pedodonti) uzmanlarımız minik hastalarımız için özel deneyim sunuyor! 👶',
            'seda_kids_appt': '📅 Çocuk Randevusu',
            'seda_ask_question': '💬 Soru Sor',
            'seda_thanks': 'Rica ederim! 😊 Başka bir sorunuz olursa buradayım. İyi günler dilerim!',
            'seda_fallback': 'Bunu tam anlayamadım ama şunlardan birini mi demek istediniz?',
            'seda_online_appt': '📅 Online Randevu',
            'seda_calc_price': '💰 Fiyat Hesapla',
            'seda_customer_service': '📞 Müşteri Hizmetleri',
            'seda_redirect_calc': 'Anında fiyat hesaplamak için sizi **Akıllı Hesaplayıcıya** yönlendiriyorum... 🧮',
            'seda_redirect_appt': 'Sizi online randevu sihirbazına yönlendiriyorum...',

            // Appointment Tracker Panel
            'tracker_title': 'Randevularım',
            'tracker_active': 'aktif randevu',
            'tracker_status_call': 'Aranacaksınız',
            'tracker_status_pending': 'Beklemede',

            // Success Panels
            'success_title': 'Randevunuz Alındı!',
            'success_subtitle': 'Talebiniz başarıyla iletildi.',
            'success_call_title': 'Sizi En Kısa Sürede Arayacağız!',
            'success_call_desc': 'Genellikle 15 dakika içinde dönüş yapıyoruz.',
            'success_new_btn': 'Yeni Randevu Oluştur',
            'success_summary_name': 'Ad Soyad',
            'success_summary_phone': 'Telefon',
            'success_summary_service': 'Hizmet',
            'success_summary_date': 'Tarih',

            // Form States
            'form_sending': 'Gönderiliyor...',
            'form_send_request': 'Randevu Talebi Gönder'
        },
        'en': {
            // Top Banner
            'banner_urgent': '🦷 Tooth Pain? Same Day Appointment Guarantee!',
            'banner_call': 'Call Now: 0850 222 33 44',
            // Navbar & Hero
            'nav_services': 'Services',
            'nav_pain_free': 'Pain-Free Treatment',
            'nav_doctors': 'Doctors',
            'nav_pricing': 'Pricing',
            'nav_contact': 'Contact',
            'nav_appointment': 'Book Appointment',
            'hero_badge': 'Pain-Free Treatment Guarantee',
            'hero_title_1': 'The Right Address For',
            'hero_title_2': 'Pain-Free Dental Care',
            'hero_desc': 'We put an end to the fear of the dentist chair. Meet our modern anesthesia methods, friendly expert staff, and comfortable environment.',
            'hero_list_1': 'Needle-Free Local Anesthesia Option',
            'hero_list_2': '10+ Years Experienced Specialists',
            'hero_list_3': 'Child-Friendly & Family Atmosphere',
            'hero_cta_1': 'Book Appointment Now',
            'hero_cta_2': 'View Services',
            'trust_ministry': 'Ministry Approved',
            'trust_patients': '10k+ Happy Patients',
            'trust_rating': '5.0 Google Rating',
            'badge_hygiene_label': 'Hygiene Standard',
            'badge_hygiene_value': '100% Sterilization',

            // Services
            'services_subtitle': 'OUR TREATMENTS',
            'services_title': 'All Dental Treatments <br>Under One Roof',
            'service_1_title': 'Filling & Root Canal',
            'service_1_desc': 'Aesthetic fillings with modern materials and precise root canal treatments under a microscope.',
            'service_2_title': 'Teeth Whitening',
            'service_2_desc': '2-3 shades whiter teeth in a single session with laser and office-type whitening systems.',
            'service_3_title': 'Porcelain Laminate',
            'service_3_desc': 'Perfect smile aesthetics with ultra-thin porcelain veneers for Hollywood Smile design.',
            'service_4_title': 'Implant Treatment',
            'service_4_desc': 'Implants with 99% success rate and lifetime guarantee for missing teeth with digital planning.',
            'service_5_title': 'Orthodontics (Braces/Aligners)',
            'service_5_desc': 'Teeth alignment correction with clear aligners (wireless treatment) or modern braces.',
            'service_6_title': 'Pediatric Dentistry',
            'service_6_desc': 'Fearless child dental treatments in our clinic with a playground, accompanied by a Pedodontist.',
            'service_7_title': 'Gum Treatments',
            'service_7_desc': 'Treatment of gum recession, bleeding and aesthetic gum shaping with laser (pink aesthetics).',
            'service_8_title': 'Surgery & Extraction',
            'service_8_desc': 'Impacted wisdom tooth extraction and cyst operations. 0% pain with sedation option.',
            'read_more': 'Read More',
            'cta_free_exam': 'Get Free Exam Appointment',

            // Shared
            'why_us': 'Why Choose Us?',
            'process': 'Treatment Process',
            'process_title': 'Step by Step <span class="text-clinical-primary">Treatment Process</span>',

            // Dolgu & Kanal Page
            'service_filling_title': 'Filling & <span class="text-clinical-primary">Root Canal Treatment</span>',
            'service_filling_desc': 'We treat your decayed teeth aesthetically with modern composite fillings. We save your tooth by applying precise procedures under a microscope for advanced root canal treatments.',
            'about_filling_title': 'What is Filling and Root Canal Treatment?',
            'about_filling_desc': '<strong>Filling treatment</strong> is the aesthetic and functional restoration of decayed or broken teeth. <strong>Root canal treatment</strong> is a procedure performed when the nerve tissue (pulp) of the tooth is infected.',
            'filling_benefits_title': "Benefits of <span class=\"text-clinical-primary\">Filling & Root Canal</span> at DentaCare",
            'filling_ben_1_title': 'Microscopic Procedure',
            'filling_ben_1_desc': 'We detect root canal openings precisely with 20x magnification.',
            'filling_ben_2_title': 'Digital Anesthesia',
            'filling_ben_2_desc': 'Pain-free treatment experience with needle-free anesthesia option.',
            'filling_ben_3_title': 'Aesthetic Filling',
            'filling_ben_3_desc': 'Natural look with composite material suitable for your tooth color.',
            'filling_ben_4_title': 'Fast Recovery',
            'filling_ben_4_desc': 'You can return to your normal life on the same day.',
            'filling_step_1_title': 'Exam & X-Ray',
            'filling_step_1_desc': 'Decay or infection is detected with digital X-ray.',
            'filling_step_2_title': 'Local Anesthesia',
            'filling_step_2_desc': 'Painless numbing is provided with digital anesthesia.',
            'filling_step_3_title': 'Treatment Procedure',
            'filling_step_3_desc': 'Decay is cleaned, root canal is shaped (if necessary) and filled.',
            'filling_step_4_title': 'Restoration',
            'filling_step_4_desc': 'The tooth is aesthetically restored with composite filling.',
            'filling_faq_1_q': 'Is filling treatment painful?',
            'filling_faq_1_a': 'No. Thanks to modern anesthesia methods, you will not feel pain during filling treatment. There may be slight sensitivity after the procedure, but this usually passes within a few hours.',
            'filling_faq_2_q': 'How long does root canal treatment take?',
            'filling_faq_2_a': 'Most root canal treatments are completed in a single session, within approximately 45-60 minutes. Complex cases may require 2 sessions.',
            'filling_faq_3_q': 'How long do fillings last?',
            'filling_faq_3_a': 'High-quality composite fillings can last 10 years or more with proper care. Regular dental check-ups and good oral hygiene extend their life.',
            'filling_faq_4_q': 'Is a crown necessary after root canal?',
            'filling_faq_4_a': 'A crown is usually recommended for back teeth (molars) because teeth that have undergone root canal treatment can be more brittle. For front teeth, just a filling may be sufficient.',

            // Implant Page
            'implant_hero_title': '<span class="text-clinical-accent">Lifetime Warranty</span> Implant Treatment',
            'implant_hero_desc': 'Titanium implants with 99% success rate for your missing teeth with digital 3D planning. Natural tooth feel and appearance.',
            'implant_hero_cta': 'Free Tomography & Exam',
            'implant_badge_title': '99% Success Rate',
            'implant_badge_desc': 'Premium Implants',
            'about_treatment_label': 'About Treatment',
            'implant_about_title': 'What is an Implant?',
            'implant_about_desc_1': 'Dental implants are titanium screws placed in the bone to replace missing teeth. Natural tooth appearance and function are provided with the porcelain crown attached to it.',
            'implant_about_desc_2': 'We use <strong>Straumann</strong>, <strong>Nobel Biocare</strong> and <strong>Osstem</strong> brand implants in our clinic.',
            'implant_feat_1': '3D Digital Planning',
            'implant_feat_2': 'Painless Surgery',
            'implant_feat_3': 'Fast Healing',
            'implant_feat_4': 'Lifetime Warranty',
            'implant_cta_title': 'Complete Your Missing Teeth',
            'implant_cta_desc': 'Learn your implant suitability with free 3D tomography and examination.',
            'implant_cta_btn': 'Get Free Appointment',

            // Whitening Page
            'whitening_hero_title': 'Professional <span class="text-yellow-500">Teeth Whitening</span>',
            'whitening_hero_desc': 'Get 2-3 shades whiter teeth in a single session with laser and office-type whitening systems. Safe, fast and lasting results.',
            'whitening_hero_cta': 'Free Exam Appointment',
            'cta_call_now': 'Call Now',
            'whitening_badge_title': '2-3 Shades Whiter',
            'whitening_badge_desc': 'In One Session',
            'about_whitening_title': 'What is Teeth Whitening?',
            'about_whitening_desc_1': 'Teeth whitening is a cosmetic procedure that allows you to achieve a brighter and whiter smile by lightening the color tone of the tooth enamel.',
            'about_whitening_desc_2': 'We offer <strong>in-office</strong> and <strong>home-type</strong> whitening options in our clinic. We achieve safe results with professional gel and special LED light.',
            'whitening_feat_1': '1 Hour Procedure',
            'whitening_feat_2': 'No Sensitivity',
            'whitening_feat_3': '2 Years+ Durability',
            'whitening_feat_4': 'FDA Approved',
            'whitening_benefits_title': 'DentaCare <span class="text-yellow-500">Whitening</span> Advantages',
            'whitening_ben_1_title': 'LED Light Technology',
            'whitening_ben_1_desc': 'Fast and effective whitening with special wavelength LED.',
            'whitening_ben_2_title': 'Enamel Protection',
            'whitening_ben_2_desc': 'Safe whitening without damaging tooth enamel.',
            'whitening_ben_3_title': 'Instant Results',
            'whitening_ben_3_desc': 'Visible difference in a single session. Start shining immediately.',
            'whitening_ben_4_title': 'For Sensitive Teeth',
            'whitening_ben_4_desc': 'Comfortable experience with anti-sensitivity gel.',
            'whitening_cta_title': 'Do You Want a Shining Smile?',
            'whitening_cta_desc': 'Make your free exam appointment now. Our professional team will recommend the most suitable whitening method for you.',
            'whitening_cta_btn_1': 'Get Free Appointment',

            // Laminate Page
            'laminate_hero_title': 'Perfect Smile with <span class="text-pink-500">Hollywood Smile</span>',
            'laminate_hero_desc': 'Achieve a natural, flawless smile without abrading your teeth with ultra-thin porcelain veneers. 0.3mm thick, tooth-colored laminates.',
            'laminate_hero_cta': 'Free Design Appointment',
            'laminate_badge_title': '15 Years+ Warranty',
            'laminate_badge_desc': 'Premium Quality',
            'about_laminate_title': 'What is Porcelain Laminate (Veneer)?',
            'about_laminate_desc_1': 'Porcelain laminates are ultra-thin (0.3-0.5mm) porcelain veneers bonded to the front surface of the teeth. Discoloration, fractures, gaps and shape deformities can be corrected with this method.',
            'about_laminate_desc_2': 'Natural tooth appearance and brightness are achieved with organic <strong>E-Max</strong> and <strong>Feldspathic</strong> porcelain options.',
            'laminate_feat_1': 'Minimal Abrasion',
            'laminate_feat_2': 'Natural Look',
            'laminate_feat_3': 'Stain Resistant',
            'laminate_feat_4': 'Completed in 2 Sessions',
            'laminate_cta_title': 'Achieve Your Dream Smile',
            'laminate_cta_desc': 'See the result before treatment with digital smile design. Get your free consultation appointment.',
            'laminate_cta_btn': 'Get Free Appointment',

            // Child Page
            'child_hero_title': '<span class="text-orange-500">Fearless</span> Pediatric Dental Care',
            'child_hero_desc': 'Your child will love the dentist in our clinic with a playground accompanied by a Pedodontist. Fun and painless treatments.',
            'child_hero_cta': 'Child Exam Appointment',
            'child_badge_title': 'Happy Kids',
            'child_badge_desc': 'Playground Available',
            'about_pedodontics_label': 'Pedodontics',
            'about_child_title': 'What is Pediatric Dentistry?',
            'about_child_desc': 'Pedodontics is the specialty branch dealing with the dental health of children aged 0-14. We ensure your child gains healthy oral habits without developing dental fear.',
            'child_feat_1': 'Expert Pedodontist',
            'child_feat_2': 'Child Psychology',
            'child_feat_3': 'Playground',
            'child_feat_4': 'Reward System',
            'child_services_title': 'Pediatric Dental Treatments',
            'child_service_1_title': 'Fissure Sealant',
            'child_service_1_desc': 'Protective sealant for the grooves and pits of molars to prevent tooth decay.',
            'child_service_2_title': 'Fluoride Application',
            'child_service_2_desc': 'Fluoride gel that strengthens tooth enamel and provides protection against decay.',
            'child_service_3_title': 'Milk Tooth Treatment',
            'child_service_3_desc': 'Milk tooth filling, root canal treatment and extraction procedures.',
            'child_cta_title': 'Your Child\'s First Dental Exam',
            'child_cta_desc': 'The World Health Organization recommends the first dental exam before the age of 1.',
            'child_cta_btn': 'Get Appointment',

            // Gum Page
            'gum_hero_title': '<span class="text-rose-500">Pink Aesthetics</span> & Gum Treatment',
            'gum_hero_desc': 'We treat gum recession, bleeding and inflammation with laser.',
            'gum_hero_cta': 'Get Appointment',
            'gum_about_title': 'Gum Diseases',
            'gum_about_desc': 'Periodontitis can lead to tooth loss if untreated. We offer painless, stitch-free treatment with laser.',
            'gum_prob_1_title': 'Gum Bleeding',
            'gum_prob_1_desc': 'Sign of Gingivitis',
            'gum_prob_2_title': 'Gum Recession',
            'gum_prob_2_desc': 'Sensitivity and aesthetics',
            'gum_prob_3_title': 'Gummy Smile',
            'gum_prob_3_desc': 'Correction with laser',
            'gum_cta_title': 'Healthy Gums',
            'gum_cta_btn': 'Get Appointment',

            // Ortho Page
            'ortho_hero_title': 'Invisible Treatment with <span class="text-purple-600">Clear Aligners</span>',
            'ortho_hero_desc': 'We correct tooth misalignment with wireless orthodontics (clear aligners) or modern metal/ceramic braces. Your smile is corrected without being noticed.',
            'ortho_hero_cta': 'Free Consultation',
            'ortho_badge_title': 'Invisible Treatment',
            'ortho_badge_desc': 'Clear Aligners',
            'ortho_about_label': 'Treatment Options',
            'ortho_about_title': 'What is Orthodontics?',
            'ortho_about_desc': 'Orthodontics is the branch of dentistry concerned with the correction of teeth and jaw irregularities. Crowded teeth, gapped teeth and bite problems are treated.',
            'ortho_opt_1_title': '🔮 Clear Aligner (Invisalign)',
            'ortho_opt_1_desc': 'Invisible, removable aligners. Worn 20-22 hours a day. 6-18 months treatment time.',
            'ortho_opt_2_title': '🦷 Metal Braces',
            'ortho_opt_2_desc': 'Classic and effective method. Ideal for complex cases. 12-24 months treatment time.',
            'ortho_opt_3_title': '✨ Ceramic Braces',
            'ortho_opt_3_desc': 'Tooth-colored braces. As effective as metal braces, more aesthetic.',
            'ortho_cta_title': 'Straight Teeth, Beautiful Smile',
            'ortho_cta_desc': 'Book an appointment for free orthodontic consultation. Let us determine the most suitable treatment option for you.',
            'ortho_cta_btn': 'Get Free Appointment',

            // Surgery Page
            'surgery_hero_title': '<span class="text-red-600">Surgery</span> & Tooth Extraction',
            'surgery_hero_desc': 'Impacted wisdom tooth extraction and cyst operations. 0% pain guarantee with sedation option.',
            'surgery_hero_cta': 'Get Appointment',
            'surgery_title': 'Our Surgical Treatments',
            'surgery_item_1_title': 'Impacted Tooth Extraction',
            'surgery_item_1_desc': 'Surgical extraction of impacted teeth including wisdom teeth. Local or sedation anesthesia.',
            'surgery_item_2_title': 'Cyst Operation',
            'surgery_item_2_desc': 'Surgical removal of cysts in the jaw bones.',
            'surgery_item_3_title': 'Apical Resection',
            'surgery_item_3_desc': 'Root tip surgery in teeth where root canal treatment is insufficient.',
            'surgery_item_4_title': 'Sedation Option',
            'surgery_item_4_desc': 'Surgery in a sleep state with conscious sedation. No fear and no pain.',
            'surgery_cta_title': 'For Painless Surgery',
            'surgery_cta_btn': 'Get Appointment',

            // Pain-Free
            'pain_free_subtitle': 'PATIENT COMFORT & PSYCHOLOGY',
            'pain_free_title_1': 'How We Do',
            'pain_free_title_2': 'Pain-Free Treatment',
            'pain_free_title_3': '',
            'pain_free_desc': 'We understand your dental fear very well. Our clinic is founded on the "Zero Pain" principle. Your comfort is our priority.',
            'pain_free_item_1_title': 'Digital Anesthesia (Needle-Free)',
            'pain_free_item_1_desc': 'End the fear of classic needles! Tiny touches you won\'t feel with the computer-controlled system.',
            'pain_free_item_2_title': 'Sleep State with Sedation',
            'pain_free_item_2_desc': 'Let us complete our treatment while you are in a pleasant dream. The procedure will be over when you wake up.',
            'pain_free_item_3_title': 'Dental Laser Technology',
            'pain_free_item_3_desc': 'In gum and filling procedures performed with laser, there is no need for anesthesia, no sound and no vibration.',
            'painless_patients': '+1500 Patients',
            'painless_testimonial': '"I had a root canal and felt nothing, I can\'t believe it!"',

            // Technology
            'tech_subtitle': 'ADVANCED TECHNOLOGY',
            'tech_title_1': 'Modern Technologies That',
            'tech_title_2': 'Give Confidence',
            'tech_desc': 'We reduce the margin of error in diagnosis and treatment to zero with the latest dentistry technologies.',
            'tech_1_title': 'Digital X-Ray',
            'tech_1_desc': 'Clear imaging of the entire jaw structure with low radiation in seconds.',
            'tech_2_title': '3D Tomography',
            'tech_2_desc': 'Flawless implant planning with 3D examination of bone structure.',
            'tech_3_title': 'CAD/CAM System',
            'tech_3_desc': 'Production and delivery of your porcelain teeth within the same day with digital measurement.',
            'tech_4_title': 'Dental Laser',
            'tech_4_desc': 'Bleeding-free, stitch-free and fast healing in soft tissue procedures.',

            // Doctors
            'doctors_subtitle': 'OUR EXPERT TEAM',
            'doctors_title': 'You Are In Safe Hands',
            'dr_1_title': 'Prosthodontist',
            'dr_1_desc': 'Istanbul University Faculty of Dentistry, 2010 Graduate. 12 years of experience in aesthetic dentistry.',
            'dr_2_title': 'Oral Surgeon',
            'dr_2_desc': 'Ankara University, 2008 Graduate. Expert in implant surgery and impacted teeth.',
            'dr_3_title': 'Pediatric Dentist (Pedodontist)',
            'dr_3_desc': 'Ege University, 2015 Graduate. Certified in child psychology and fearless dental treatment.',
            'dr_4_title': 'Orthodontist',
            'dr_4_desc': 'Marmara University, 2012 Graduate. Expert in clear aligner and modern brace treatments.',

            // Gallery
            'gallery_subtitle': 'REAL RESULTS',
            'gallery_title': 'We Transform Your Smile',
            'gallery_1_title': 'Office Type Teeth Whitening',
            'gallery_1_desc': 'Result After 1 Session',
            'gallery_2_title': 'Porcelain Laminate (Veneers)',
            'gallery_2_desc': 'Full Smile Design',
            'gallery_3_title': 'Implant and Zirconium Crown',
            'gallery_3_desc': 'Missing Tooth Replacement',
            'gallery_note': '* These images are shared for informational purposes with patients\' consent. Results may vary from person to person.',

            // Pricing
            'price_subtitle': 'TRANSPARENT PRICING POLICY',
            'price_title': 'Estimated Price List',
            'price_desc': 'Exact prices are determined after free initial examination and X-ray analysis.',
            'price_col_treatment': 'Treatment',
            'price_col_range': 'Price Range',
            'price_row_1': 'Initial Exam & Panoramic X-Ray',
            'price_row_1_sub': 'For appointments',
            'price_free': 'FREE',
            'price_row_2': 'Composite Filling (Single Tooth)',
            'price_row_3': 'Root Canal Treatment (Single Tooth)',
            'price_row_4': 'Implant (Domestic/Imported Options)',
            'price_row_5': 'Zirconium Crown (Per Tooth)',
            'price_row_6': 'Teeth Whitening (Office Type)',
            'price_note': '12 installments available for all credit cards.',

            // Testimonials
            'testimonial_subtitle': 'PATIENT REVIEWS',
            'testimonial_title_1': 'Happy Smiles,',
            'testimonial_title_2': 'Happy Stories',
            'testimonial_google': '4.9/5 Customer Satisfaction',
            'review_1': '"The cleanest and most caring clinic I have ever been to in my life. I had a dentist phobia, that fear went away the moment I walked in. I had my root canal treatment with sedation, I don\'t remember anything. Thank you."',
            'review_2': '"I brought my son for his first dental exam. Dt. Elif prompted so sweetly that my son now insists on \'going to the dentist\'. A wonderful environment for children."',
            'review_3': '"I researched a lot for my implant treatment and chose this place. I\'m glad I did. I had a painless, swelling-free process. Prices are also very reasonable for the service quality."',

            // FAQ
            'faq_subtitle': 'YOUR QUESTIONS',
            'faq_title': 'Frequently Asked Questions',
            'faq_q_1': 'Is implant treatment painful?',
            'faq_a_1': 'No. The implant procedure is performed under local anesthesia and you will not feel any pain during the procedure. Simple painkillers are sufficient for mild sensitivity that may occur after treatment.',
            'faq_q_2': 'How long does root canal treatment take?',
            'faq_a_2': 'Thanks to modern techniques and experienced doctors, our root canal treatments are usually completed in a single session, within approximately 45-60 minutes.',
            'faq_q_3': 'When should I bring my child to the dentist?',
            'faq_a_3': 'The World Health Organization suggests the first dental exam when the first tooth erupts (approx. 6th month) or before turning 1 year old.',
            'faq_q_4': 'What happens if I feel pain during treatment?',
            'faq_a_4': 'Our doctors are in constant communication with you. If you feel the slightest discomfort, just raise your hand. The procedure is stopped immediately and additional anesthesia is applied.',
            'faq_q_5': 'What are your payment options?',
            'faq_a_5': 'We accept cash, credit card, and bank transfer. We also have installment options for all credit cards.',

            // Appointment & Contact & Footer
            'appt_section_title': "Don't Delay <br>Your Smile",
            'appt_section_desc': 'Fill out the appointment form now, we will call you and schedule the best time. Or get an appointment in seconds via WhatsApp.',
            'appt_subtitle': 'APPLY NOW',
            'appt_title': 'Free Exam Appointment',
            'appt_desc': 'Fill out the form, we will call you within 10 minutes to schedule your appointment. Take the first step to a pain-free smile.',
            'contact_label_phone': 'Phone',
            'contact_label_whatsapp': 'WhatsApp',
            'contact_label_email': 'Email',
            'form_name': 'Full Name',
            'form_phone': 'Phone Number',
            'form_treatment': 'Treatment Type',
            'form_date': 'Preferred Date (Optional)',
            'form_message': 'Your Message (Optional)',
            'form_submit': 'Send Appointment Request',
            'whatsapp_desc': 'Or contact us quickly via WhatsApp:',
            'whatsapp_button': 'Chat on WhatsApp',

            // Form Options
            'opt_general': 'General Exam',
            'opt_emergency': 'Toothache / Emergency',
            'opt_implant': 'Implant Treatment',
            'opt_whitening': 'Teeth Whitening',
            'opt_ortho': 'Orthodontics',
            'opt_child': 'Pediatric Dentistry',
            'opt_other': 'Other',
            'contact_section_title': 'Contact & Location',
            'contact_address': 'Address',
            'contact_phone': 'Phone',
            'contact_hours': 'Working Hours',
            'days_weekday': 'Weekdays:',
            'days_saturday': 'Saturday:',
            'days_sunday': 'Sunday:',
            'footer_about': 'In our clinic serving with the pain-free dentistry concept, we design your smile with state-of-the-art devices and our expert staff.',
            'footer_links': 'Quick Links',
            'footer_services': 'Popular Treatments',
            'footer_copyright': '&copy; 2024 DentaCare Clinic. All rights reserved.',

            // Before/After Slider
            'ba_before': 'BEFORE',
            'ba_after': 'AFTER',
            'gallery_desc': 'Move the slider to see the before and after difference',

            // Booking Wizard
            'wizard_subtitle': 'Quick Appointment',
            'wizard_title': 'Online Appointment in 3 Steps',
            'wizard_desc': 'Select service, choose doctor, pick your preferred time.',
            'wizard_step1': 'Service',
            'wizard_step2': 'Doctor',
            'wizard_step3': 'Date/Time',
            'wizard_select_service': 'Select Treatment',
            'wizard_select_doctor': 'Select Doctor',
            'wizard_select_datetime': 'Select Date and Time',
            'wizard_date': 'Date',
            'wizard_time': 'Time',
            'wizard_back': 'Back',
            'wizard_confirm': 'Confirm Appointment',
            'wizard_success_title': 'Appointment Received!',
            'wizard_success_desc': 'We will call you shortly to confirm your appointment.',
            'wizard_new_appointment': 'New Appointment',

            // Cost Calculator
            'calc_subtitle': 'Price Calculator',
            'calc_title': 'Online Treatment Cost Calculator',
            'calc_desc': 'Select treatments, see estimated cost instantly.',
            'calc_total': 'Total Estimated Cost',
            'calc_monthly': 'Monthly Installment (12 months)',
            'calc_monthly_payment': 'Monthly Payment',
            'calc_one_time': 'One Time',
            'calc_installment': 'Installments',
            'calc_get_quote': 'Get Quote',
            'calc_note': '* Final prices determined after examination.',
            'calc_select_treatments': 'Select Treatments',
            'calc_implant': 'Dental Implant',
            'calc_implant_desc': 'Premium Straumann/Nobel',
            'calc_zirconium': 'Zirconium Crown',
            'calc_zirconium_desc': 'Full Porcelain Aesthetic',
            'calc_whitening': 'Teeth Whitening',
            'calc_whitening_desc': 'Office LED Whitening',
            'calc_laminate': 'Porcelain Laminate',
            'calc_laminate_desc': 'E-Max Veneer',
            'calc_filling': 'Aesthetic Filling',
            'calc_filling_desc': 'Composite Restoration',

            // Before/After Gallery
            'gallery_subtitle': 'Real Results',
            'gallery_title': 'Transforming Your Smile',
            'gallery_desc': 'Real before and after images of our patients',
            'gallery_before': 'BEFORE',
            'gallery_after': 'AFTER',
            'gallery_case_whitening': 'Teeth Whitening',
            'gallery_case_whitening_desc': '1 Session • Office LED',
            'gallery_case_veneers': 'Porcelain Veneers',
            'gallery_case_veneers_desc': '8 Teeth • Hollywood Smile',
            'gallery_case_implant': 'Implant Treatment',
            'gallery_case_implant_desc': '2 Implants • All-on-4',

            // Chat Widget
            'chat_title': 'Live Support',
            'chat_welcome': 'Hello! 👋 How can I help you?',
            'chat_placeholder': 'Type your message...',
            'chat_agent_name': 'Sarah Smith',
            'chat_agent_role': 'Customer Relations',
            'chat_welcome_p1': 'Hello! 👋 Welcome to DentaCare.',
            'chat_welcome_p2': 'How can I help you today?',
            'chat_action_appt': '📅 Book Appointment',
            'chat_action_price': '💰 Prices',
            'chat_action_emergency': '🚨 Emergency',
            'chat_action_whatsapp': '📱 Chat on WhatsApp',
            'chat_action_call': '📞 Request Callback',
            'chat_system_redirect': 'Redirecting to specialist...',
            'chat_system_call_req': 'Enter your number:',
            'chat_call_success': '✅ Request received! We\'ll call back in 15 mins.',
            'chat_greeting_morning': 'Good Morning! ☀️',
            'chat_greeting_afternoon': 'Good Afternoon! 🌤️',
            'chat_greeting_evening': 'Good Evening! 🌙',
            'chat_trigger_implant': 'Do you want to complete your missing teeth?',
            'chat_trigger_price': 'Do you want detailed price information?',
            'chat_trigger_contact': 'Would you like us to contact you immediately?',
            'chat_trigger_exit': 'Do you have a question before you leave?',
            'chat_ask_treatment': 'Which treatment are you interested in?',
            'chat_ask_teeth_count': 'How many teeth are you considering?',
            'chat_option_implant': 'Implant',
            'chat_option_zirconium': 'Zirconium Crown',
            'chat_option_other': 'Other / Consultation',
            'chat_lead_offer': 'I can define a special offer for you. Should I send the detailed price list via WhatsApp?',
            'chat_btn_yes_whatsapp': '✅ Yes, Send via WhatsApp',
            'chat_btn_no_thanks': '❌ No, Thanks',
            'chat_quick_appointment': 'Book Appointment',
            'chat_quick_prices': 'Price Info',
            'chat_quick_info': 'Get More Info',

            // Seda 4.0 Smart Responses
            'seda_typing': 'Seda is typing',
            'seda_help': 'How can I help you?',
            'seda_emergency': 'Tooth pain is very uncomfortable, I understand! 🦷 Let us schedule you for a same-day appointment.',
            'seda_emergency_btn': '🚨 URGENT Appointment',
            'seda_call_now': '📞 Call Now',
            'seda_whitening': 'You are interested in teeth whitening! ✨ You are just one step away from a Hollywood smile.',
            'seda_kids': 'Our pediatric dentistry (Pedodontics) specialists offer a special experience for our little patients! 👶',
            'seda_kids_appt': '📅 Child Appointment',
            'seda_ask_question': '💬 Ask a Question',
            'seda_thanks': 'You are welcome! 😊 If you have any other questions, I am here. Have a great day!',
            'seda_fallback': 'I did not quite understand that, but did you mean one of these?',
            'seda_online_appt': '📅 Online Appointment',
            'seda_calc_price': '💰 Calculate Price',
            'seda_customer_service': '📞 Customer Service',
            'seda_redirect_calc': 'I am redirecting you to the **Smart Calculator** for instant pricing... 🧮',
            'seda_redirect_appt': 'I am redirecting you to the online appointment wizard...',

            // Appointment Tracker Panel
            'tracker_title': 'My Appointments',
            'tracker_active': 'active appointment',
            'tracker_status_call': 'You will be called',
            'tracker_status_pending': 'Pending',

            // Success Panels
            'success_title': 'Appointment Received!',
            'success_subtitle': 'Your request has been successfully submitted.',
            'success_call_title': 'We Will Call You Shortly!',
            'success_call_desc': 'We typically respond within 15 minutes.',
            'success_new_btn': 'Create New Appointment',
            'success_summary_name': 'Full Name',
            'success_summary_phone': 'Phone',
            'success_summary_service': 'Service',
            'success_summary_date': 'Date',

            // Form States
            'form_sending': 'Sending...',
            'form_send_request': 'Send Appointment Request'
        },
        'de': {
            // Top Banner
            'banner_urgent': '🦷 Zahnschmerzen? Garantie für Termin am Selben Tag!',
            'banner_call': 'Jetzt Anrufen: 0850 222 33 44',
            // Navbar & Hero
            'nav_services': 'Dienstleistungen',
            'nav_pain_free': 'Schmerzfreie Behandlung',
            'nav_doctors': 'Ärzte',
            'nav_pricing': 'Preise',
            'nav_contact': 'Kontakt',
            'nav_appointment': 'Termin Vereinbaren',
            'hero_badge': 'Garantie für Schmerzfreie Behandlung',
            'hero_title_1': 'Die Richtige Adresse Für',
            'hero_title_2': 'Schmerzfreie Zahnpflege',
            'hero_desc': 'Wir beenden die Angst vor dem Zahnarztstuhl. Lernen Sie unsere modernen Anästhesiemethoden, unser freundliches Fachpersonal und unsere komfortable Umgebung kennen.',
            'hero_list_1': 'Option für Nadelfreie Lokalanästhesie',
            'hero_list_2': '10+ Jahre Erfahrene Spezialisten',
            'hero_list_3': 'Kinderfreundliche & Familiäre Atmosphäre',
            'hero_cta_1': 'Jetzt Termin Vereinbaren',
            'hero_cta_2': 'Dienstleistungen Ansehen',
            'trust_ministry': 'Ministeriumsgenehmigt',
            'trust_patients': '10k+ Zufriedene Patienten',
            'trust_rating': '5.0 Google Bewertung',
            'badge_hygiene_label': 'Hygienestandard',
            'badge_hygiene_value': '100% Sterilisation',

            // Services
            'services_subtitle': 'UNSERE BEHANDLUNGEN',
            'services_title': 'Alle Ihre Zahnbehandlungen <br>Unter Einem Dach',
            'service_1_title': 'Füllung & Wurzelkanal',
            'service_1_desc': 'Ästhetische Füllungen mit modernen Materialien und präzise Wurzelkanalbehandlungen unter dem Mikroskop.',
            'service_2_title': 'Zahnaufhellung',
            'service_2_desc': '2-3 Nuancen weißere Zähne in einer einzigen Sitzung mit Laser- und Office-Bleaching-Systemen.',
            'service_3_title': 'Porzellanlaminat',
            'service_3_desc': 'Perfekte Lächelassthetik mit ultradünnen Porzellanveneers für Hollywood Smile Design.',
            'service_4_title': 'Implantatbehandlung',
            'service_4_desc': 'Implantate mit 99% Erfolgsquote und lebenslanger Garantie für fehlende Zähne mit digitaler Planung.',
            'service_5_title': 'Kieferorthopädie (Zahnspange/Schienen)',
            'service_5_desc': 'Zahnfehlstellungskorrektur mit transparenten Schienen (drahtlose Behandlung) oder modernen Zahnspangen.',
            'service_6_title': 'Kinderzahnheilkunde',
            'service_6_desc': 'Angstfreie Kinderzahnbehandlungen in unserer Klinik mit Spielplatz, begleitet von einem Pedodontisten.',
            'service_7_title': 'Zahnfleischbehandlungen',
            'service_7_desc': 'Behandlung von Zahnfleischrückgang, Blutungen und ästhetische Zahnfleischformung mit Laser (rosa Ästhetik).',
            'service_8_title': 'Chirurgie & Extraktion',
            'service_8_desc': 'Entfernung verlagerter Weisheitszähne und Zystenoperationen. 0% Schmerz mit Sedierungsoption.',
            'read_more': 'Mehr Erfahren',
            'cta_free_exam': 'Kostenlosen Untersuchungstermin',

            // Shared
            'why_us': 'Warum Wir?',
            'process': 'Behandlungsprozess',
            'process_title': 'Schritt für Schritt <span class="text-clinical-primary">Behandlungsprozess</span>',

            // Dolgu & Kanal Page
            'service_filling_title': 'Füllung & <span class="text-clinical-primary">Wurzelkanalbehandlung</span>',
            'service_filling_desc': 'Wir behandeln Ihre kariösen Zähne ästhetisch mit modernen Kompositfüllungen. Wir retten Ihren Zahn durch präzise Verfahren unter dem Mikroskop für fortschrittliche Wurzelkanalbehandlungen.',
            'about_filling_title': 'Was ist Füllung und Wurzelkanalbehandlung?',
            'about_filling_desc': '<strong>Füllungsbehandlung</strong> ist die ästhetische und funktionelle Wiederherstellung von kariösen oder abgebrochenen Zähnen. <strong>Wurzelkanalbehandlung</strong> ist ein Verfahren, das durchgeführt wird, wenn das Nervengewebe (Pulpa) des Zahnes infiziert ist.',
            'filling_benefits_title': "Vorteile von <span class=\"text-clinical-primary\">Füllung & Wurzelkanal</span> bei DentaCare",
            'filling_ben_1_title': 'Mikroskopische Behandlung',
            'filling_ben_1_desc': 'Wir erkennen Wurzelkanaleingänge präzise mit 20-facher Vergrößerung.',
            'filling_ben_2_title': 'Digitale Anästhesie',
            'filling_ben_2_desc': 'Schmerzfreie Behandlungserfahrung mit nadelfreier Anästhesieoption.',
            'filling_ben_3_title': 'Ästhetische Füllung',
            'filling_ben_3_desc': 'Natürliches Aussehen mit Kompositmaterial passend zu Ihrer Zahnfarbe.',
            'filling_ben_4_title': 'Schnelle Genesung',
            'filling_ben_4_desc': 'Sie können noch am selben Tag in Ihren normalen Alltag zurückkehren.',
            'filling_step_1_title': 'Untersuchung & Röntgen',
            'filling_step_1_desc': 'Karies oder Infektion werden mit digitalem Röntgen erkannt.',
            'filling_step_2_title': 'Lokalanästhesie',
            'filling_step_2_desc': 'Schmerzfreie Betäubung wird durch digitale Anästhesie gewährleistet.',
            'filling_step_3_title': 'Behandlungsverfahren',
            'filling_step_3_desc': 'Karies wird gereinigt, Wurzelkanal wird geformt (falls erforderlich) und gefüllt.',
            'filling_step_4_title': 'Restauration',
            'filling_step_4_desc': 'Der Zahn wird mit Kompositfüllung ästhetisch wiederhergestellt.',
            'filling_faq_1_q': 'Ist eine Füllungsbehandlung schmerzhaft?',
            'filling_faq_1_a': 'Nein. Dank moderner Anästhesiemethoden spüren Sie während der Füllungsbehandlung keine Schmerzen. Nach dem Eingriff kann es zu einer leichten Empfindlichkeit kommen, die jedoch in der Regel innerhalb weniger Stunden vergeht.',
            'filling_faq_2_q': 'Wie lange dauert eine Wurzelkanalbehandlung?',
            'filling_faq_2_a': 'Die meisten Wurzelkanalbehandlungen werden in einer einzigen Sitzung innerhalb von ca. 45-60 Minuten abgeschlossen. Komplexe Fälle können 2 Sitzungen erfordern.',
            'filling_faq_3_q': 'Wie lange halten Füllungen?',
            'filling_faq_3_a': 'Hochwertige Kompositfüllungen können bei richtiger Pflege 10 Jahre oder länger halten. Regelmäßige Zahnarztkontrollen und gute Mundhygiene verlängern ihre Lebensdauer.',
            'filling_faq_4_q': 'Ist nach einer Wurzelbehandlung eine Krone erforderlich?',
            'filling_faq_4_a': 'Für Backenzähne (Molaren) wird in der Regel eine Krone empfohlen, da wurzelbehandelte Zähne brüchiger sein können. Für Frontzähne kann eine einfache Füllung ausreichen.',

            // Implant Page
            'implant_hero_title': '<span class="text-clinical-accent">Lebenslange Garantie</span> Implantatbehandlung',
            'implant_hero_desc': 'Titanimplantate mit 99% Erfolgsquote für Ihre fehlenden Zähne mit digitaler 3D-Planung. Natürliches Zahngefühl und Aussehen.',
            'implant_hero_cta': 'Kostenlose Tomographie & Untersuchung',
            'implant_badge_title': '99% Erfolgsquote',
            'implant_badge_desc': 'Premium-Implantate',
            'about_treatment_label': 'Über die Behandlung',
            'implant_about_title': 'Was ist ein Implantat?',
            'implant_about_desc_1': 'Zahnimplantate sind Titanschrauben, die in den Knochen eingesetzt werden, um fehlende Zähne zu ersetzen. Mit der darauf befestigten Porzellankrone werden natürliches Zahnaussehen und Funktion gewährleistet.',
            'implant_about_desc_2': 'Wir verwenden in unserer Klinik Implantate der Marken <strong>Straumann</strong>, <strong>Nobel Biocare</strong> und <strong>Osstem</strong>.',
            'implant_feat_1': '3D Digitale Planung',
            'implant_feat_2': 'Schmerzfreie Chirurgie',
            'implant_feat_3': 'Schnelle Heilung',
            'implant_feat_4': 'Lebenslange Garantie',
            'implant_cta_title': 'Vervollständigen Sie Ihre fehlenden Zähne',
            'implant_cta_desc': 'Erfahren Sie Ihre Implantateignung mit kostenloser 3D-Tomographie und Untersuchung.',
            'implant_cta_btn': 'Kostenlosen Termin Vereinbaren',

            // Whitening Page
            'whitening_hero_title': 'Professionelle <span class="text-yellow-500">Zahnaufhellung</span>',
            'whitening_hero_desc': 'Erhalten Sie 2-3 Nuancen weißere Zähne in einer einzigen Sitzung mit Laser- und Office-Bleaching-Systemen. Sichere, schnelle und dauerhafte Ergebnisse.',
            'whitening_hero_cta': 'Kostenloser Untersuchungstermin',
            'cta_call_now': 'Jetzt Anrufen',
            'whitening_badge_title': '2-3 Nuancen Weißer',
            'whitening_badge_desc': 'In einer Sitzung',
            'about_whitening_title': 'Was ist Zahnaufhellung?',
            'about_whitening_desc_1': 'Zahnaufhellung ist ein kosmetisches Verfahren, mit dem Sie durch Aufhellung des Farbtons des Zahnschmelzes ein strahlenderes und weißeres Lächeln erzielen können.',
            'about_whitening_desc_2': 'Wir bieten in unserer Klinik <strong>Office-Typ (in der Praxis)</strong> und <strong>Heim-Typ</strong> Aufhellungsoptionen an. Wir erzielen sichere Ergebnisse mit professionellem Gel und speziellem LED-Licht.',
            'whitening_feat_1': '1 Stunde Verfahren',
            'whitening_feat_2': 'Keine Empfindlichkeit',
            'whitening_feat_3': '2 Jahre+ Haltbarkeit',
            'whitening_feat_4': 'FDA-geprüft',
            'whitening_benefits_title': 'DentaCare <span class="text-yellow-500">Aufhellung</span> Vorteile',
            'whitening_ben_1_title': 'LED-Lichttechnologie',
            'whitening_ben_1_desc': 'Schnelle und effektive Aufhellung mit spezieller Wellenlängen-LED.',
            'whitening_ben_2_title': 'Schmelzschutz',
            'whitening_ben_2_desc': 'Sichere Aufhellung ohne den Zahnschmelz zu beschädigen.',
            'whitening_ben_3_title': 'Sofortige Ergebnisse',
            'whitening_ben_3_desc': 'Sichtbarer Unterschied in einer einzigen Sitzung. Fangen Sie sofort an zu strahlen.',
            'whitening_ben_4_title': 'Für empfindliche Zähne',
            'whitening_ben_4_desc': 'Komfortables Erlebnis mit Anti-Sensibilitäts-Gel.',
            'whitening_cta_title': 'Möchten Sie ein strahlendes Lächeln?',
            'whitening_cta_desc': 'Vereinbaren Sie jetzt Ihren kostenlosen Untersuchungstermin. Unser professionelles Team empfiehlt Ihnen die für Sie am besten geeignete Aufhellungsmethode.',
            'whitening_cta_btn_1': 'Kostenlosen Termin Vereinbaren',

            // Laminate Page
            'laminate_hero_title': 'Perfektes Lächeln mit <span class="text-pink-500">Hollywood Smile</span>',
            'laminate_hero_desc': 'Erreichen Sie ein natürliches, makelloses Lächeln ohne Ihre Zähne abzuschleifen mit ultradünnen Porzellanveneers. 0,3 mm dicke, zahnfarbene Laminate.',
            'laminate_hero_cta': 'Kostenloser Designtermin',
            'laminate_badge_title': '15 Jahre+ Garantie',
            'laminate_badge_desc': 'Premium Qualität',
            'about_laminate_title': 'Was ist Porzellanlaminat (Veneer)?',
            'about_laminate_desc_1': 'Porzellanlaminate sind ultradünne (0,3-0,5 mm) Porzellanverblendschalen, die auf die Vorderfläche der Zähne geklebt werden. Verfärbungen, Brüche, Lücken und Formveränderungen können mit dieser Methode korrigiert werden.',
            'about_laminate_desc_2': 'Natürliches Zahnaussehen und Glanz werden mit organischen <strong>E-Max</strong> und <strong>Feldspat</strong> Porzellanoptionen erreicht.',
            'laminate_feat_1': 'Minimale Abrasion',
            'laminate_feat_2': 'Natürliches Aussehen',
            'laminate_feat_3': 'Fleckenbeständig',
            'laminate_feat_4': 'In 2 Sitzungen abgeschlossen',
            'laminate_cta_title': 'Erreichen Sie Ihr Traumlächeln',
            'laminate_cta_desc': 'Sehen Sie das Ergebnis vor der Behandlung mit digitalem Lächel-Design. Holen Sie sich Ihren kostenlosen Beratungstermin.',
            'laminate_cta_btn': 'Kostenlosen Termin Vereinbaren',

            // Child Page
            'child_hero_title': '<span class="text-orange-500">Angstfreie</span> Kinderzahnheilkunde',
            'child_hero_desc': 'In unserer Klinik mit Spielplatz und Pedodontist wird Ihr Kind den Zahnarzt lieben. Lustige und schmerzfreie Behandlungen.',
            'child_hero_cta': 'Kinderuntersuchungstermin',
            'child_badge_title': 'Glückliche Kinder',
            'child_badge_desc': 'Spielplatz Vorhanden',
            'about_pedodontics_label': 'Pedodontie',
            'about_child_title': 'Was ist Kinderzahnheilkunde?',
            'about_child_desc': 'Pedodontie ist das Fachgebiet, das sich mit der Zahngesundheit von Kindern zwischen 0-14 Jahren befasst. Wir sorgen dafür, dass Ihr Kind gesunde Mundgewohnheiten ohne Zahnarztangst entwickelt.',
            'child_feat_1': 'Experte Pedodontist',
            'child_feat_2': 'Kinderpsychologie',
            'child_feat_3': 'Spielplatz',
            'child_feat_4': 'Belohnungssystem',
            'child_services_title': 'Kinderzahnbehandlungen',
            'child_service_1_title': 'Fissurenversiegelung',
            'child_service_1_desc': 'Schutzversiegelung für die Rillen und Grübchen der Backenzähne zur Vorbeugung von Karies.',
            'child_service_2_title': 'Fluoridierung',
            'child_service_2_desc': 'Fluoridgel, das den Zahnschmelz stärkt und Schutz vor Karies bietet.',
            'child_service_3_title': 'Milchzahnbehandlung',
            'child_service_3_desc': 'Milchzahnfüllung, Wurzelkanalbehandlung und Extraktion.',
            'child_cta_title': 'Die Erste Zahnuntersuchung Ihres Kindes',
            'child_cta_desc': 'Die Weltgesundheitsorganisation empfiehlt die erste Zahnuntersuchung vor dem 1. Lebensjahr.',
            'child_cta_btn': 'Termin Vereinbaren',

            // Gum Page
            'gum_hero_title': '<span class="text-rose-500">Rosa Ästhetik</span> & Zahnfleischbehandlung',
            'gum_hero_desc': 'Wir behandeln Zahnfleischrückgang, Blutungen und Entzündungen mit Laser.',
            'gum_hero_cta': 'Termin Vereinbaren',
            'gum_about_title': 'Zahnfleischerkrankungen',
            'gum_about_desc': 'Parodontitis kann unbehandelt zu Zahnverlust führen. Wir bieten schmerzfreie, nahtlose Behandlung mit Laser.',
            'gum_prob_1_title': 'Zahnfleischbluten',
            'gum_prob_1_desc': 'Anzeichen von Gingivitis',
            'gum_prob_2_title': 'Zahnfleischrückgang',
            'gum_prob_2_desc': 'Empfindlichkeit und Ästhetik',
            'gum_prob_3_title': 'Gummy Smile',
            'gum_prob_3_desc': 'Korrektur mit Laser',
            'gum_cta_title': 'Gesundes Zahnfleisch',
            'gum_cta_btn': 'Termin Vereinbaren',

            // Ortho Page
            'ortho_hero_title': 'Unsichtbare Behandlung mit <span class="text-purple-600">Transparenten Schienen</span>',
            'ortho_hero_desc': 'Wir korrigieren Zahnfehlstellungen mit drahtloser Kieferorthopädie (transparente Schienen) oder modernen Metall-/Keramikbrackets. Ihr Lächeln wird korrigiert, ohne bemerkt zu werden.',
            'ortho_hero_cta': 'Kostenlose Beratung',
            'ortho_badge_title': 'Unsichtbare Behandlung',
            'ortho_badge_desc': 'Transparente Schienen',
            'ortho_about_label': 'Behandlungsoptionen',
            'ortho_about_title': 'Was ist Kieferorthopädie?',
            'ortho_about_desc': 'Kieferorthopädie ist der Zweig der Zahnmedizin, der sich mit der Korrektur von Zahn- und Kieferunregelmäßigkeiten befasst. Engstand, Lücken und Bissfehler werden behandelt.',
            'ortho_opt_1_title': '🔮 Transparente Schiene (Invisalign)',
            'ortho_opt_1_desc': 'Unsichtbare, herausnehmbare Schienen. Tragezeit 20-22 Stunden pro Tag. 6-18 Monate Behandlungsdauer.',
            'ortho_opt_2_title': '🦷 Metallbrackets',
            'ortho_opt_2_desc': 'Klassische und effektive Methode. Ideal für komplexe Fälle. 12-24 Monate Behandlungsdauer.',
            'ortho_opt_3_title': '✨ Keramikbrackets',
            'ortho_opt_3_desc': 'Zahnfarbene Brackets. So effektiv wie Metallbrackets, ästhetischer.',
            'ortho_cta_title': 'Gerade Zähne, Schönes Lächeln',
            'ortho_cta_desc': 'Vereinbaren Sie einen Termin für eine kostenlose kieferorthopädische Beratung. Wir bestimmen die für Sie am besten geeignete Behandlungsoption.',
            'ortho_cta_btn': 'Kostenlosen Termin Vereinbaren',

            // Surgery Page
            'surgery_hero_title': '<span class="text-red-600">Chirurgie</span> & Zahnextraktion',
            'surgery_hero_desc': 'Entfernung verlagerter Weisheitszähne und Zystenoperationen. 0% Schmerzgarantie mit Sedierungsoption.',
            'surgery_hero_cta': 'Termin Vereinbaren',
            'surgery_title': 'Unsere Chirurgischen Behandlungen',
            'surgery_item_1_title': 'Entfernung verlagerter Zähne',
            'surgery_item_1_desc': 'Chirurgische Entfernung von verlagerten Zähnen einschließlich Weisheitszähnen. Lokal- oder Sedierungsanästhesie.',
            'surgery_item_2_title': 'Zystenoperation',
            'surgery_item_2_desc': 'Chirurgische Entfernung von Zysten in den Kieferknochen.',
            'surgery_item_3_title': 'Wurzelspitzenresektion',
            'surgery_item_3_desc': 'Wurzelspitzenchirurgie bei Zähnen, bei denen eine Wurzelkanalbehandlung nicht ausreicht.',
            'surgery_item_4_title': 'Sedierungsoption',
            'surgery_item_4_desc': 'Operation im Schlafzustand mit bewusster Sedierung. Keine Angst und keine Schmerzen.',
            'surgery_cta_title': 'Für Schmerzfreie Chirurgie',
            'surgery_cta_btn': 'Termin Vereinbaren',

            // Pain-Free
            'pain_free_subtitle': 'PATIENTENKOMFORT & PSYCHOLOGIE',
            'pain_free_title_1': 'Wie Wir',
            'pain_free_title_2': 'Schmerzfreie Behandlung',
            'pain_free_title_3': 'Durchführen?',
            'pain_free_desc': 'Wir verstehen Ihre Zahnarztangst sehr gut. Unsere Klinik basiert auf dem Prinzip "Null Schmerz". Ihr Komfort ist unsere Priorität.',
            'pain_free_item_1_title': 'Digitale Anästhesie (Nadelfrei)',
            'pain_free_item_1_desc': 'Schluss mit der Angst vor klassischen Nadeln! Winzige Berührungen, die Sie dank computergesteuertem System nicht spüren.',
            'pain_free_item_2_title': 'Schlafzustand mit Sedierung',
            'pain_free_item_2_desc': 'Lassen Sie uns unsere Behandlung abschließen, während Sie in einem angenehmen Traum sind. Der Eingriff ist vorbei, wenn Sie aufwachen.',
            'pain_free_item_3_title': 'Dental-Lasertechnologie',
            'pain_free_item_3_desc': 'Bei Zahnfleisch- und Füllungsbehandlungen mit Laser ist keine Anästhesie erforderlich, kein Geräusch und keine Vibration.',
            'painless_patients': '+1500 Patienten',
            'painless_testimonial': '"Ich hatte eine Wurzelkanalbehandlung und habe nichts gespürt, ich kann es nicht glauben!"',

            // Technology
            'tech_subtitle': 'FORTSCHRITTLICHE TECHNOLOGIE',
            'tech_title_1': 'Moderne Technologien, Die',
            'tech_title_2': 'Vertrauen Geben',
            'tech_desc': 'Wir reduzieren die Fehlerquote bei Diagnose und Behandlung mit den neuesten Zahnmedizin-Technologien auf Null.',
            'tech_1_title': 'Digitales Röntgen',
            'tech_1_desc': 'Klare Bildgebung der gesamten Kieferstruktur mit geringer Strahlung in Sekunden.',
            'tech_2_title': '3D-Tomographie',
            'tech_2_desc': 'Fehlerfreie Implantatplanung mit 3D-Untersuchung der Knochenstruktur.',
            'tech_3_title': 'CAD/CAM-System',
            'tech_3_desc': 'Herstellung und Lieferung Ihrer Porzellanzähne am selben Tag mit digitaler Messung.',
            'tech_4_title': 'Dental-Laser',
            'tech_4_desc': 'Blutungsfreie, nahtlose und schnelle Heilung bei Weichgewebeverfahren.',

            // Doctors
            'doctors_subtitle': 'UNSER EXPERTENTEAM',
            'doctors_title': 'Sie Sind In Sicheren Händen',
            'dr_1_title': 'Prothetiker',
            'dr_1_desc': 'Absolvent der Universität Istanbul, 2010. 12 Jahre Erfahrung in ästhetischer Zahnmedizin.',
            'dr_2_title': 'Mund-, Kiefer- und Gesichtschirurg',
            'dr_2_desc': 'Universität Ankara, 2008 Absolvent. Experte für Implantatchirurgie und verlagerte Zähne.',
            'dr_3_title': 'Kinderzahnarzt (Pedodontist)',
            'dr_3_desc': 'Ege Universität, 2015 Absolvent. Zertifiziert in Kinderpsychologie und angstfreier Zahnbehandlung.',
            'dr_4_title': 'Kieferorthopäde',
            'dr_4_desc': 'Marmara Universität, 2012 Absolvent. Experte für transparente Schienen und moderne Zahnspangenbehandlungen.',

            // Gallery
            'gallery_subtitle': 'ECHTE ERGEBNISSE',
            'gallery_title': 'Wir Verwandeln Ihr Lächeln',
            'gallery_1_title': 'Zahnaufhellung (Office-Typ)',
            'gallery_1_desc': 'Ergebnis nach 1 Sitzung',
            'gallery_2_title': 'Porzellanlaminat (Veneers)',
            'gallery_2_desc': 'Vollständiges Lächeln-Design',
            'gallery_3_title': 'Implantat und Zirkonkronen',
            'gallery_3_desc': 'Ersatz fehlender Zähne',
            'gallery_note': '* Diese Bilder werden zu Informationszwecken mit Zustimmung der Patienten geteilt. Ergebnisse können variieren.',

            // Pricing
            'price_subtitle': 'TRANSPARENTE PREISPOLITIK',
            'price_title': 'Geschätzte Preisliste',
            'price_desc': 'Genaue Preise werden nach kostenloser Erstuntersuchung und Röntgenanalyse festgelegt.',
            'price_col_treatment': 'Behandlung',
            'price_col_range': 'Preisspanne',
            'price_row_1': 'Erstuntersuchung & Panorama-Röntgen',
            'price_row_1_sub': 'Für Termine',
            'price_free': 'KOSTENLOS',
            'price_row_2': 'Kompositfüllung (Einzelzahn)',
            'price_row_3': 'Wurzelkanalbehandlung (Einzelzahn)',
            'price_row_4': 'Implantat (Inländisch/Importiert)',
            'price_row_5': 'Zirkonkrone (Pro Zahn)',
            'price_row_6': 'Zahnaufhellung (Office-Typ)',
            'price_note': '12 Raten für alle Kreditkarten verfügbar.',

            // Testimonials
            'testimonial_subtitle': 'PATIENTENBEWERTUNGEN',
            'testimonial_title_1': 'Glückliche Lächeln,',
            'testimonial_title_2': 'Glückliche Geschichten',
            'testimonial_google': '4.9/5 Kundenzufriedenheit',
            'review_1': '"Die sauberste und fürsorglichste Klinik, in der ich je war. Ich hatte Zahnarztphobie, diese Angst verschwand, als ich hereinkam. Ich hatte meine Wurzelkanalbehandlung mit Sedierung, ich erinnere mich an nichts. Danke."',
            'review_2': '"Ich brachte meinen Sohn zu seiner ersten Zahnuntersuchung. Dt. Elif ging so süß darauf ein, dass mein Sohn jetzt darauf besteht, \'zum Zahnarzt zu gehen\'. Eine wunderbare Umgebung für Kinder."',
            'review_3': '"Ich habe viel für meine Implantatbehandlung recherchiert und diesen Ort gewählt. Ich bin froh, dass ich es getan habe. Ich hatte einen schmerzlosen, schwellungsfreien Prozess. Die Preise sind auch sehr angemessen."',

            // FAQ
            'faq_subtitle': 'IHRE FRAGEN',
            'faq_title': 'Häufig Gestellte Fragen',
            'faq_q_1': 'Ist eine Implantatbehandlung schmerzhaft?',
            'faq_a_1': 'Nein. Das Implantatverfahren wird unter örtlicher Betäubung durchgeführt und Sie spüren während des Eingriffs keine Schmerzen. Einfache Schmerzmittel reichen für leichte Empfindlichkeiten nach der Behandlung aus.',
            'faq_q_2': 'Wie lange dauert eine Wurzelkanalbehandlung?',
            'faq_a_2': 'Dank moderner Techniken und erfahrenen Ärzten werden unsere Wurzelkanalbehandlungen in der Regel in einer einzigen Sitzung innerhalb von ca. 45-60 Minuten abgeschlossen.',
            'faq_q_3': 'Wann sollte ich mein Kind zum Zahnarzt bringen?',
            'faq_a_3': 'Die Weltgesundheitsorganisation empfiehlt die erste Zahnuntersuchung, wenn der erste Zahn durchbricht (ca. 6. Monat) oder vor dem 1. Geburtstag.',
            'faq_q_4': 'Was passiert, wenn ich während der Behandlung Schmerzen habe?',
            'faq_a_4': 'Unsere Ärzte stehen in ständigem Kontakt mit Ihnen. Wenn Sie das geringste Unbehagen verspüren, heben Sie einfach Ihre Hand. Der Vorgang wird sofort gestoppt und zusätzliche Betäubung angewendet.',
            'faq_q_5': 'Welche Zahlungsmöglichkeiten haben Sie?',
            'faq_a_5': 'Wir akzeptieren Bargeld, Kreditkarte und Überweisung. Wir haben auch Ratenzahlungsoptionen für alle Kreditkarten.',

            // Appointment & Contact & Footer
            'appt_section_title': 'Verzögern Sie <br>Ihr Lächeln Nicht',
            'appt_section_desc': 'Füllen Sie jetzt das Terminformular aus, wir rufen Sie an und planen die beste Zeit. Oder holen Sie sich in Sekunden einen Termin über WhatsApp.',
            'appt_subtitle': 'JETZT BEWERBEN',
            'appt_title': 'Kostenloser Untersuchungstermin',
            'appt_desc': 'Füllen Sie das Formular aus, wir rufen Sie innerhalb von 10 Minuten an, um Ihren Termin zu vereinbaren. Machen Sie den ersten Schritt zu einem schmerzfreien Lächeln.',
            'contact_label_phone': 'Telefon',
            'contact_label_whatsapp': 'WhatsApp',
            'contact_label_email': 'E-Mail',
            'form_name': 'Vor- und Nachname',
            'form_phone': 'Telefonnummer',
            'form_treatment': 'Behandlungsart',
            'form_date': 'Gewünschtes Datum (Optional)',
            'form_message': 'Ihre Nachricht (Optional)',
            'form_submit': 'Terminanfrage Senden',
            'whatsapp_desc': 'Oder kontaktieren Sie uns schnell über WhatsApp:',
            'whatsapp_button': 'Chat auf WhatsApp',

            // Form Options
            'opt_general': 'Allgemeine Untersuchung',
            'opt_emergency': 'Zahnschmerzen / Notfall',
            'opt_implant': 'Implantatbehandlung',
            'opt_whitening': 'Zahnaufhellung',
            'opt_ortho': 'Kieferorthopädie (Zahnspange)',
            'opt_child': 'Kinderzahnheilkunde',
            'opt_other': 'Andere',
            'contact_section_title': 'Kontakt & Standort',
            'contact_address': 'Adresse',
            'contact_phone': 'Telefon',
            'contact_hours': 'Arbeitszeiten',
            'days_weekday': 'Wochentags:',
            'days_saturday': 'Samstag:',
            'days_sunday': 'Sonntag:',
            'footer_about': 'In unserer Klinik mit dem Konzept der schmerzfreien Zahnheilkunde gestalten wir Ihr Lächeln mit modernsten Geräten und unserem Expertenteam.',
            'footer_links': 'Schnelllinks',
            'footer_services': 'Beliebte Behandlungen',
            'footer_copyright': '&copy; 2024 DentaCare Klinik. Alle Rechte vorbehalten.',

            // Before/After Slider
            'ba_before': 'VORHER',
            'ba_after': 'NACHHER',
            'gallery_desc': 'Bewegen Sie den Schieberegler, um den Vorher-Nachher-Unterschied zu sehen',

            // Booking Wizard
            'wizard_subtitle': 'Schneller Termin',
            'wizard_title': 'Online-Termin in 3 Schritten',
            'wizard_desc': 'Wählen Sie Behandlung, Arzt und Ihre bevorzugte Zeit.',
            'wizard_step1': 'Behandlung',
            'wizard_step2': 'Arzt',
            'wizard_step3': 'Datum/Zeit',
            'wizard_select_service': 'Behandlung wählen',
            'wizard_select_doctor': 'Arzt wählen',
            'wizard_select_datetime': 'Datum und Uhrzeit wählen',
            'wizard_date': 'Datum',
            'wizard_time': 'Uhrzeit',
            'wizard_back': 'Zurück',
            'wizard_confirm': 'Termin bestätigen',
            'wizard_success_title': 'Termin erhalten!',
            'wizard_success_desc': 'Wir werden Sie in Kürze anrufen, um Ihren Termin zu bestätigen.',
            'wizard_new_appointment': 'Neuer Termin',

            // Cost Calculator
            'calc_subtitle': 'Preisrechner',
            'calc_title': 'Online-Behandlungskostenrechner',
            'calc_desc': 'Wählen Sie Behandlungen, sehen Sie die geschätzten Kosten sofort.',
            'calc_total': 'Geschätzte Gesamtkosten',
            'calc_monthly': 'Monatliche Rate (12 Monate)',
            'calc_monthly_payment': 'Monatliche Zahlung',
            'calc_one_time': 'Einmalig',
            'calc_installment': 'Ratenzahlung',
            'calc_get_quote': 'Angebot anfordern',
            'calc_note': '* Endpreise werden nach der Untersuchung festgelegt.',
            'calc_select_treatments': 'Behandlungen Auswählen',
            'calc_implant': 'Zahnimplantat',
            'calc_implant_desc': 'Premium Straumann/Nobel',
            'calc_zirconium': 'Zirkonkrone',
            'calc_zirconium_desc': 'Vollkeramik Ästhetik',
            'calc_whitening': 'Zahnaufhellung',
            'calc_whitening_desc': 'Office LED Bleaching',
            'calc_laminate': 'Porzellan-Laminat',
            'calc_laminate_desc': 'E-Max Veneer',
            'calc_filling': 'Ästhetische Füllung',
            'calc_filling_desc': 'Komposit-Restauration',

            // Before/After Gallery
            'gallery_subtitle': 'Echte Ergebnisse',
            'gallery_title': 'Wir Verwandeln Ihr Lächeln',
            'gallery_desc': 'Echte Vorher-Nachher-Bilder unserer Patienten',
            'gallery_before': 'VORHER',
            'gallery_after': 'NACHHER',
            'gallery_case_whitening': 'Zahnaufhellung',
            'gallery_case_whitening_desc': '1 Sitzung • Office LED',
            'gallery_case_veneers': 'Porzellan-Veneers',
            'gallery_case_veneers_desc': '8 Zähne • Hollywood Smile',
            'gallery_case_implant': 'Implantat-Behandlung',
            'gallery_case_implant_desc': '2 Implantate • All-on-4',

            // Chat Widget
            'chat_title': 'Live-Support',
            'chat_welcome': 'Hallo! 👋 Wie kann ich Ihnen helfen?',
            'chat_placeholder': 'Nachricht eingeben...',
            'chat_agent_name': 'Seda Yılmaz',
            'chat_agent_role': 'Kundenbetreuung',
            'chat_welcome_p1': 'Hallo! 👋 Willkommen bei DentaCare.',
            'chat_welcome_p2': 'Wie kann ich Ihnen helfen?',
            'chat_action_appt': '📅 Termin Vereinbaren',
            'chat_action_price': '💰 Preise',
            'chat_action_emergency': '🚨 Notfall',
            'chat_action_whatsapp': '📱 WhatsApp Chat',
            'chat_action_call': '📞 Rückruf anfordern',
            'chat_system_redirect': 'Weiterleitung zum Experten...',
            'chat_system_call_req': 'Geben Sie Ihre Nummer ein:',
            'chat_call_success': '✅ Anfrage erhalten! Wir rufen in 15 Min. zurück.',
            'chat_greeting_morning': 'Guten Morgen! ☀️',
            'chat_greeting_afternoon': 'Guten Tag! 🌤️',
            'chat_greeting_evening': 'Guten Abend! 🌙',
            'chat_trigger_implant': 'Möchten Sie fehlende Zähne ersetzen?',
            'chat_trigger_price': 'Möchten Sie detaillierte Preisinformationen?',
            'chat_trigger_contact': 'Sollen wir Sie sofort kontaktieren?',
            'chat_trigger_exit': 'Haben Sie eine Frage, bevor Sie gehen?',
            'chat_ask_treatment': 'An welcher Behandlung sind Sie interessiert?',
            'chat_ask_teeth_count': 'Für wie viele Zähne denken Sie?',
            'chat_option_implant': 'Implantat',
            'chat_option_zirconium': 'Zirkonkrone',
            'chat_option_other': 'Andere / Beratung',
            'chat_lead_offer': 'Ich kann ein Sonderangebot für Sie definieren. Soll ich Ihnen die detaillierte Preisliste über WhatsApp senden?',
            'chat_btn_yes_whatsapp': '✅ Ja, per WhatsApp senden',
            'chat_btn_no_thanks': '❌ Nein, danke',
            'chat_quick_appointment': 'Termin buchen',
            'chat_quick_prices': 'Preisinfo',
            'chat_quick_info': 'Mehr Infos',

            // Seda 4.0 Smart Responses
            'seda_typing': 'Seda schreibt',
            'seda_help': 'Wie kann ich Ihnen helfen?',
            'seda_emergency': 'Zahnschmerzen sind sehr unangenehm, ich verstehe! 🦷 Lassen Sie uns einen Termin für heute vereinbaren.',
            'seda_emergency_btn': '🚨 DRINGEND Termin',
            'seda_call_now': '📞 Jetzt Anrufen',
            'seda_whitening': 'Sie interessieren sich für Zahnaufhellung! ✨ Sie sind nur einen Schritt von einem Hollywood-Lächeln entfernt.',
            'seda_kids': 'Unsere Kinderzahnärzte (Pedodontie) bieten unseren kleinen Patienten ein besonderes Erlebnis! 👶',
            'seda_kids_appt': '📅 Kindertermin',
            'seda_ask_question': '💬 Frage Stellen',
            'seda_thanks': 'Gern geschehen! 😊 Bei weiteren Fragen bin ich hier. Schönen Tag noch!',
            'seda_fallback': 'Ich habe das nicht ganz verstanden, meinten Sie eines davon?',
            'seda_online_appt': '📅 Online Termin',
            'seda_calc_price': '💰 Preis Berechnen',
            'seda_customer_service': '📞 Kundenservice',
            'seda_redirect_calc': 'Ich leite Sie zum **Smart-Rechner** für sofortige Preise weiter... 🧮',
            'seda_redirect_appt': 'Ich leite Sie zum Online-Terminassistenten weiter...',

            // Appointment Tracker Panel
            'tracker_title': 'Meine Termine',
            'tracker_active': 'aktiver Termin',
            'tracker_status_call': 'Sie werden angerufen',
            'tracker_status_pending': 'Ausstehend',

            // Success Panels
            'success_title': 'Termin Erhalten!',
            'success_subtitle': 'Ihre Anfrage wurde erfolgreich übermittelt.',
            'success_call_title': 'Wir Rufen Sie Bald An!',
            'success_call_desc': 'Wir antworten normalerweise innerhalb von 15 Minuten.',
            'success_new_btn': 'Neuen Termin Erstellen',
            'success_summary_name': 'Vollständiger Name',
            'success_summary_phone': 'Telefon',
            'success_summary_service': 'Behandlung',
            'success_summary_date': 'Datum',

            // Form States
            'form_sending': 'Wird gesendet...',
            'form_send_request': 'Terminanfrage Senden'
        }
    };

    // ============================================
    // getText() - Global Translation Helper
    // ============================================
    function getText(key, fallback = '') {
        const lang = localStorage.getItem('dentacare-lang') || 'tr';
        return translations[lang]?.[key] || translations['tr']?.[key] || fallback || key;
    }

    // Make getText globally available
    window.getText = getText;

    function switchLanguage(lang) {
        // Save preference to localStorage
        localStorage.setItem('dentacare-lang', lang);

        // Update text content (using innerHTML for rich text support)
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                const tagName = element.tagName.toUpperCase();

                // Handle input placeholders
                if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
                    element.placeholder = translations[lang][key];
                }
                // Handle select options
                else if (tagName === 'OPTION') {
                    element.textContent = translations[lang][key];
                }
                // Use innerHTML for all other elements (supports <br>, <span>, etc.)
                else {
                    element.innerHTML = translations[lang][key];
                }
            }
        });

        // Update active state in switcher (desktop, mobile & header)
        ['tr', 'en', 'de'].forEach(l => {
            const desktopEl = document.getElementById('lang-' + l);
            const mobileEl = document.getElementById('lang-' + l + '-mobile');
            const headerEl = document.getElementById('header-lang-' + l);

            [desktopEl, mobileEl, headerEl].forEach(el => {
                if (el) {
                    if (l === lang) {
                        el.classList.add('text-clinical-primary', 'font-bold');
                        el.classList.remove('text-gray-500', 'font-medium');
                    } else {
                        el.classList.remove('text-clinical-primary', 'font-bold');
                        el.classList.add('text-gray-500', 'font-medium');
                    }
                }
            });
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }

    // Event Listeners for Language Switcher
    const langTr = document.getElementById('lang-tr');
    const langEn = document.getElementById('lang-en');
    const langDe = document.getElementById('lang-de');

    if (langTr) langTr.addEventListener('click', (e) => { e.preventDefault(); switchLanguage('tr'); });
    if (langEn) langEn.addEventListener('click', (e) => { e.preventDefault(); switchLanguage('en'); });
    if (langDe) langDe.addEventListener('click', (e) => { e.preventDefault(); switchLanguage('de'); });

    // Event Listeners for Header Mobile Switcher
    const headerLangTr = document.getElementById('header-lang-tr');
    const headerLangEn = document.getElementById('header-lang-en');
    const headerLangDe = document.getElementById('header-lang-de');

    if (headerLangTr) headerLangTr.addEventListener('click', (e) => { e.preventDefault(); switchLanguage('tr'); updateMobileLangButtons('tr'); });
    if (headerLangEn) headerLangEn.addEventListener('click', (e) => { e.preventDefault(); switchLanguage('en'); updateMobileLangButtons('en'); });
    if (headerLangDe) headerLangDe.addEventListener('click', (e) => { e.preventDefault(); switchLanguage('de'); updateMobileLangButtons('de'); });

    // Mobile Language Switcher
    const mobileLangTr = document.getElementById('mobile-lang-tr');
    const mobileLangEn = document.getElementById('mobile-lang-en');
    const mobileLangDe = document.getElementById('mobile-lang-de');

    function updateMobileLangButtons(lang) {
        const allMobileLangBtns = [mobileLangTr, mobileLangEn, mobileLangDe];
        allMobileLangBtns.forEach(btn => {
            if (btn) {
                btn.classList.remove('bg-clinical-primary', 'text-white');
                btn.classList.add('bg-gray-200', 'text-gray-700');
            }
        });

        const activeBtn = lang === 'tr' ? mobileLangTr : (lang === 'en' ? mobileLangEn : mobileLangDe);
        if (activeBtn) {
            activeBtn.classList.remove('bg-gray-200', 'text-gray-700');
            activeBtn.classList.add('bg-clinical-primary', 'text-white');
        }
    }

    if (mobileLangTr) mobileLangTr.addEventListener('click', (e) => { e.preventDefault(); switchLanguage('tr'); updateMobileLangButtons('tr'); });
    if (mobileLangEn) mobileLangEn.addEventListener('click', (e) => { e.preventDefault(); switchLanguage('en'); updateMobileLangButtons('en'); });
    if (mobileLangDe) mobileLangDe.addEventListener('click', (e) => { e.preventDefault(); switchLanguage('de'); updateMobileLangButtons('de'); });

    // Initialize language from localStorage or default to 'tr'
    const savedLang = localStorage.getItem('dentacare-lang') || 'tr';
    switchLanguage(savedLang);
    updateMobileLangButtons(savedLang);

    // Slider Logic (Basic)
    const track = document.getElementById('gallery-track');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');

    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        const slides = track.children;
        const totalSlides = slides.length;

        function updateSlider() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
    }

    // ============================================
    // Before/After Interactive Slider
    // ============================================
    document.querySelectorAll('.before-after-slider').forEach(slider => {
        const container = slider.querySelector('.slider-container');
        if (!container) return;

        const afterWrapper = slider.querySelector('.image-after-wrapper');
        const handle = slider.querySelector('.slider-handle');

        if (!afterWrapper || !handle) return;

        let isDragging = false;

        const updateSliderPosition = (e) => {
            const rect = container.getBoundingClientRect();
            const x = (e.type.includes('touch') ? e.touches[0].clientX : e.clientX) - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));

            afterWrapper.style.width = `${100 - percentage}%`;
            handle.style.left = `${percentage}%`;
        };

        const startDrag = (e) => {
            isDragging = true;
            e.preventDefault();
        };

        const stopDrag = () => {
            isDragging = false;
        };

        const handleMove = (e) => {
            if (!isDragging) return;
            updateSliderPosition(e);
        };

        // Mouse events
        handle.addEventListener('mousedown', startDrag);
        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('mousemove', handleMove);

        // Touch events
        handle.addEventListener('touchstart', startDrag);
        document.addEventListener('touchend', stopDrag);
        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                updateSliderPosition(e);
            }
        });

        // Click to move
        container.addEventListener('click', updateSliderPosition);
    });

    // ============================================
    // Booking Wizard
    // ============================================
    class BookingWizard {
        constructor(container) {
            this.container = container;
            this.currentStep = 1;
            this.totalSteps = 5;
            this.selectedData = {
                service: null,
                serviceName: null,
                doctor: null,
                doctorName: null,
                date: null,
                time: null
            };
            this.init();
        }

        init() {
            this.setupStepNavigation();
            this.setupServiceSelection();
            this.setupDoctorSelection();
            this.setupDateTimeSelection();
            this.setupFormSubmission();
        }

        setupStepNavigation() {
            this.container.querySelectorAll('.btn-next').forEach(btn => {
                btn.addEventListener('click', () => this.nextStep());
            });

            this.container.querySelectorAll('.btn-back').forEach(btn => {
                btn.addEventListener('click', () => this.previousStep());
            });
        }

        setupServiceSelection() {
            this.container.querySelectorAll('.service-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.container.querySelectorAll('.service-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    this.selectedData.service = btn.dataset.service;
                    this.selectedData.serviceName = btn.querySelector('span')?.textContent || btn.dataset.service;
                    this.enableNextButton(1);
                });
            });
        }

        setupDoctorSelection() {
            this.container.querySelectorAll('.doctor-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.container.querySelectorAll('.doctor-btn').forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    this.selectedData.doctor = btn.dataset.doctor;
                    this.selectedData.doctorName = btn.querySelector('h4')?.textContent || btn.dataset.doctor;
                    this.enableNextButton(2);
                });
            });
        }

        setupDateTimeSelection() {
            // Timeslot selection
            this.container.querySelectorAll('.timeslot:not(:disabled)').forEach(slot => {
                slot.addEventListener('click', () => {
                    this.container.querySelectorAll('.timeslot').forEach(s => s.classList.remove('selected'));
                    slot.classList.add('selected');
                    this.selectedData.time = slot.dataset.time;
                    this.checkDateTimeComplete();
                });
            });

            // Calendar day selection
            this.container.querySelectorAll('.calendar-day:not(.disabled)').forEach(day => {
                day.addEventListener('click', () => {
                    this.container.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                    day.classList.add('selected');
                    this.selectedData.date = day.textContent;
                    this.checkDateTimeComplete();
                });
            });
        }

        checkDateTimeComplete() {
            if (this.selectedData.date && this.selectedData.time) {
                this.enableNextButton(3);
            }
        }

        setupFormSubmission() {
            const form = this.container.querySelector('.booking-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.submitBooking();
                });
            }
        }

        nextStep() {
            if (this.currentStep < this.totalSteps) {
                this.hideStep(this.currentStep);
                this.currentStep++;
                this.showStep(this.currentStep);
                this.updateStepIndicator();

                if (this.currentStep === 4) {
                    this.updateSummary();
                }
            }
        }

        previousStep() {
            if (this.currentStep > 1) {
                this.hideStep(this.currentStep);
                this.currentStep--;
                this.showStep(this.currentStep);
                this.updateStepIndicator();
            }
        }

        hideStep(step) {
            const content = this.container.querySelector(`.wizard-content[data-step="${step}"]`);
            if (content) content.classList.remove('active');
        }

        showStep(step) {
            const content = this.container.querySelector(`.wizard-content[data-step="${step}"]`);
            if (content) content.classList.add('active');
        }

        updateStepIndicator() {
            this.container.querySelectorAll('.wizard-steps .step').forEach((step, index) => {
                step.classList.remove('active', 'completed');
                if (index + 1 < this.currentStep) {
                    step.classList.add('completed');
                } else if (index + 1 === this.currentStep) {
                    step.classList.add('active');
                }
            });
        }

        enableNextButton(step) {
            const nextBtn = this.container.querySelector(`.wizard-content[data-step="${step}"] .btn-next`);
            if (nextBtn) nextBtn.removeAttribute('disabled');
        }

        updateSummary() {
            const summaryService = document.getElementById('summary-service');
            const summaryDoctor = document.getElementById('summary-doctor');
            const summaryDate = document.getElementById('summary-date');
            const summaryTime = document.getElementById('summary-time');

            if (summaryService) summaryService.textContent = this.selectedData.serviceName || '-';
            if (summaryDoctor) summaryDoctor.textContent = this.selectedData.doctorName || '-';
            if (summaryDate) summaryDate.textContent = this.selectedData.date || '-';
            if (summaryTime) summaryTime.textContent = this.selectedData.time || '-';
        }

        submitBooking() {
            console.log('Booking submitted:', this.selectedData);

            // Generate confirmation code
            const confirmCode = 'RND-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
            const confirmCodeEl = this.container.querySelector('.confirmation-code strong');
            if (confirmCodeEl) confirmCodeEl.textContent = confirmCode;

            // Show confirmation
            this.hideStep(4);
            this.currentStep = 5;
            this.showStep(5);
            this.updateStepIndicator();
        }
    }

    // Initialize Booking Wizard if exists
    const bookingWizardEl = document.querySelector('.booking-wizard');
    if (bookingWizardEl) {
        new BookingWizard(bookingWizardEl);
    }

    // ============================================
    // Cost Calculator
    // ============================================
    class CostCalculator {
        constructor(container) {
            this.container = container;
            this.selectedTreatments = [];
            this.totalCost = 0;
            this.selectedMonths = 1;
            this.init();
        }

        init() {
            this.setupCheckboxes();
            this.setupPaymentTabs();
            this.setupCountSelectors();
        }

        setupCheckboxes() {
            this.container.querySelectorAll('.treatment-checkbox input[type="checkbox"]').forEach(checkbox => {
                checkbox.addEventListener('change', () => this.updateCalculator());
            });
        }

        setupPaymentTabs() {
            this.container.querySelectorAll('.payment-tab').forEach(tab => {
                tab.addEventListener('click', () => {
                    this.container.querySelectorAll('.payment-tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    this.selectedMonths = parseInt(tab.dataset.months);
                    this.updateMonthlyPayment();
                });
            });
        }

        setupCountSelectors() {
            this.container.querySelectorAll('.count-minus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const input = btn.nextElementSibling;
                    if (input && input.value > 1) {
                        input.value = parseInt(input.value) - 1;
                        this.updateCalculator();
                    }
                });
            });

            this.container.querySelectorAll('.count-plus').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const input = btn.previousElementSibling;
                    const max = parseInt(input?.max) || 32;
                    if (input && input.value < max) {
                        input.value = parseInt(input.value) + 1;
                        this.updateCalculator();
                    }
                });
            });

            this.container.querySelectorAll('.count-input').forEach(input => {
                input.addEventListener('change', () => this.updateCalculator());
            });
        }

        updateCalculator() {
            this.selectedTreatments = [];
            this.totalCost = 0;

            this.container.querySelectorAll('.treatment-checkbox input[type="checkbox"]:checked').forEach(checkbox => {
                const price = parseInt(checkbox.dataset.price) || 0;
                const name = checkbox.dataset.name || 'Tedavi';
                const countInput = checkbox.closest('.treatment-checkbox')?.querySelector('.count-input');
                const count = countInput ? parseInt(countInput.value) : 1;

                this.selectedTreatments.push({ name, price, count });
                this.totalCost += price * count;
            });

            this.render();
            this.updateMonthlyPayment();
        }

        render() {
            const selectedContainer = document.getElementById('selected-treatments');
            if (!selectedContainer) return;

            if (this.selectedTreatments.length === 0) {
                selectedContainer.innerHTML = '<p class="empty-state">Tedavi seçimi yapınız</p>';
            } else {
                selectedContainer.innerHTML = this.selectedTreatments.map(item => `
                    <div class="selected-item">
                        <span>${item.name} ${item.count > 1 ? `(x${item.count})` : ''}</span>
                        <span>₺${(item.price * item.count).toLocaleString('tr-TR')}</span>
                    </div>
                `).join('');
            }

            const totalEl = document.getElementById('total-cost');
            if (totalEl) totalEl.textContent = `₺${this.totalCost.toLocaleString('tr-TR')}`;
        }

        updateMonthlyPayment() {
            const monthly = Math.round(this.totalCost / this.selectedMonths);
            const monthlyEl = document.getElementById('monthly-amount');
            if (monthlyEl) monthlyEl.textContent = `₺${monthly.toLocaleString('tr-TR')}`;
        }
    }

    // Initialize Cost Calculator if exists
    const costCalculatorEl = document.querySelector('#cost-calculator');
    if (costCalculatorEl) {
        new CostCalculator(costCalculatorEl);
    }

    // ============================================
    // CHAT WIDGET - SMART CUSTOMER REPRESENTATIVE (SEDA 2.0)
    // ============================================
    // ============================================
    // SEDA 3.0: INTELLIGENT WIZARD (The "Wizard" Logic)
    // ============================================
    function initChatWidget() { // Function name kept for compatibility with init call
        const trigger = document.getElementById('seda-trigger');
        const overlay = document.getElementById('seda-wizard-overlay');
        const container = document.getElementById('seda-wizard-container');
        const body = document.getElementById('wizard-body');
        const input = document.getElementById('wizard-input');
        const badge = document.getElementById('seda-badge');

        if (!trigger || !overlay || !container) return; // Exit if new DOM not present

        // State
        const state = {
            isOpen: false,
            stage: 'IDLE', // IDLE, QUALIFY, APPT, PHONE
            history: [],
            context: 'general' // general, implant, price
        };

        // --- Core Actions ---

        window.toggleChat = function () {
            state.isOpen = !state.isOpen;

            if (state.isOpen) {
                // OPEN
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'auto';
                container.classList.remove('translate-y-full', 'scale-95');
                container.classList.add('translate-y-0', 'scale-100');

                // Mobile slide-up
                if (window.innerWidth < 768) {
                    container.classList.add('active'); // Helper class for CSS transform
                }

                if (badge) {
                    badge.classList.remove('scale-100');
                    badge.classList.add('scale-0');
                }

                if (state.history.length === 0) {
                    startWizardFlow();
                } else {
                    setTimeout(() => scrollToBottom(), 300);
                }

                // Auto-focus input
                setTimeout(() => input?.focus(), 400);

                // Mobile: Add backdrop class
                if (window.innerWidth < 768) {
                    document.body.classList.add('seda-chat-open');
                }
            } else {
                // CLOSE
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
                container.classList.add('translate-y-full', 'scale-95');
                container.classList.remove('translate-y-0', 'scale-100');
                if (window.innerWidth < 768) {
                    container.classList.remove('active');
                }

                // Mobile: Remove backdrop class
                document.body.classList.remove('seda-chat-open');

                // Minimal Trigger Mode
                trigger.classList.add('scale-90', 'opacity-80');
            }
        };

        // --- Logic Flows ---

        function startWizardFlow() {
            // Intelligent Entry: Check URL/Hash
            const hash = window.location.hash;
            let greeting = "Merhaba! Size nasıl yardımcı olabilirim?";
            let options = [];

            if (hash === '#implant-section') {
                greeting = "İmplant tedavisi ve fiyatları hakkında bilgi mi almak istiyorsunuz?";
                options = [
                    { label: "Evet, İmplant Fiyatları", action: "qualify_implant" },
                    { label: "Diğer Tedaviler", action: "show_menu" }
                ];
            } else if (hash === '#fiyatlar') {
                greeting = "Tedavi fiyat hesaplayıcımızı kullanmak ister misiniz?";
                options = [
                    { label: "🧮 Hesaplayıcıyı Aç", action: "open_calculator" },
                    { label: "Fiyat Listesi", action: "show_price_list" }
                ];
            } else {
                greeting = getTimeBasedGreeting();
                options = [
                    { label: "📅 Randevu Al", action: "appointment" },
                    { label: "💰 Fiyatlar", action: "qualify_start" },
                    { label: "💬 WhatsApp", action: "whatsapp" }
                ];
            }

            addBotMessage(greeting);
            setTimeout(() => showOptions(options), 600);
        }

        function handleAction(action, label) {
            addUserMessage(label); // Show user selection

            switch (action) {
                case 'qualify_start':
                case 'show_price_list':
                    addBotMessage("Anında fiyat hesaplamak için sizi **Akıllı Hesaplayıcıya** yönlendiriyorum... 🧮");
                    setTimeout(() => {
                        handleAction('open_calculator', 'Hesaplayıcıyı Aç');
                    }, 1200);
                    break;

                case 'show_menu':
                case 'qualify_other':
                    addBotMessage("Size nasıl yardımcı olabilirim?");
                    showOptions([
                        { label: "📅 Online Randevu", action: "appointment" },
                        { label: "💰 Fiyat Hesapla", action: "open_calculator" },
                        { label: "💬 WhatsApp Destek", action: "whatsapp_fallback" }
                    ]);
                    break;

                case 'qualify_implant':
                    addBotMessage("İmplant tedavisi için ne yapmak istersiniz?");
                    showOptions([
                        { label: "💰 Fiyat Hesapla", action: "open_calculator" },
                        { label: "📅 Randevu Al", action: "appointment" },
                        { label: "💬 Soru Sor", action: "whatsapp_push_implant" }
                    ]);
                    break;

                case 'qualify_esthetic':
                    addBotMessage("Gülüş tasarımı ve zirkonyum için seçenekleriniz:");
                    showOptions([
                        { label: "📅 Randevu Al", action: "appointment" },
                        { label: "💰 Fiyatlar", action: "open_calculator" },
                        { label: "💬 WhatsApp", action: "whatsapp_other" }
                    ]);
                    break;

                case 'offer_single':
                case 'offer_all':
                    // Legacy cases redirect to calculator now
                    handleAction('open_calculator', 'Fiyat Hesapla');
                    break;

                case 'open_calculator':
                    toggleChat();
                    document.querySelector('#cost-calculator')?.scrollIntoView({ behavior: 'smooth' });
                    break;

                case 'appointment':
                    addBotMessage("Sizi online randevu sihirbazına yönlendiriyorum...");
                    setTimeout(() => {
                        toggleChat();
                        document.querySelector('#booking-wizard')?.scrollIntoView({ behavior: 'smooth' });
                    }, 1200);
                    break;

                case 'whatsapp':
                case 'whatsapp_push_implant':
                case 'whatsapp_kids':
                case 'whatsapp_other':
                case 'whatsapp_fallback':
                    let msg = "Merhaba, bilgi almak istiyorum.";
                    if (action === 'whatsapp_push_implant') msg = "Merhaba, İmplant kampanyanız hakkında bilgi almak istiyorum.";
                    if (action === 'whatsapp_kids') msg = "Merhaba, Çocuk diş hekimliği (Pedodonti) hakkında bilgi almak istiyorum.";
                    if (action === 'whatsapp_fallback') msg = "Merhaba, bir konu hakkında desteğe ihtiyacım var: " + (label || '');

                    openWhatsApp(msg);
                    break;

                default:
                    openWhatsApp("Merhaba, " + label + " hakkında bilgi almak istiyorum.");
                    break;
            }
        }

        // --- Render Helpers ---

        // --- Typing Indicator ---
        function showTypingIndicator() {
            const typingId = 'seda-typing-indicator';
            if (document.getElementById(typingId)) return; // Already showing

            const div = document.createElement('div');
            div.id = typingId;
            div.className = 'flex gap-3 items-start wizard-message-enter';
            div.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-green-500 p-0.5 shrink-0 shadow-sm mt-1 animate-pulse">
                    <img src="https://ui-avatars.com/api/?name=Seda+Yilmaz&background=0D9488&color=fff&size=128" class="w-full h-full rounded-full object-cover">
                </div>
                <div class="glass-message bg-white/90 backdrop-blur-sm border border-gray-100 text-gray-500 rounded-2xl rounded-tl-sm py-2.5 px-4 shadow-sm text-sm italic flex items-center gap-2">
                    <span class="flex gap-1">
                        <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></span>
                        <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></span>
                        <span class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></span>
                    </span>
                    <span>Seda yazıyor</span>
                </div>
            `;
            body.appendChild(div);
            scrollToBottom();
        }

        function hideTypingIndicator() {
            const indicator = document.getElementById('seda-typing-indicator');
            if (indicator) {
                indicator.remove();
            }
        }

        function addBotMessage(text, skipTyping = false) {
            if (skipTyping) {
                renderBotMessage(text);
            } else {
                showTypingIndicator();
                setTimeout(() => {
                    hideTypingIndicator();
                    renderBotMessage(text);
                }, 800 + Math.random() * 400); // Random delay for natural feel
            }
        }

        function renderBotMessage(text) {
            const div = document.createElement('div');
            div.className = 'flex gap-3 items-start wizard-message-enter';
            div.style.animation = 'slideInLeft 0.3s ease-out';
            div.innerHTML = `
                <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-green-500 p-0.5 shrink-0 shadow-sm mt-1 ring-2 ring-green-200 ring-offset-1">
                    <img src="https://ui-avatars.com/api/?name=Seda+Yilmaz&background=0D9488&color=fff&size=128" class="w-full h-full rounded-full object-cover">
                </div>
                <div class="glass-message bg-white/90 backdrop-blur-sm border border-gray-100 text-gray-800 rounded-2xl rounded-tl-sm py-2.5 px-4 shadow-sm text-sm leading-relaxed max-w-[85%]">
                    ${text}
                </div>
            `;
            body.appendChild(div);
            scrollToBottom();
            saveHistory('bot', text);
        }

        function addUserMessage(text) {
            const div = document.createElement('div');
            div.className = 'flex justify-end wizard-message-enter';
            div.innerHTML = `
                <div class="bg-blue-600 text-white rounded-2xl rounded-tr-sm py-2.5 px-4 shadow-md text-sm leading-relaxed max-w-[85%]">
                    ${text}
                </div>
            `;
            body.appendChild(div);
            scrollToBottom();
            saveHistory('user', text);
        }

        function showOptions(options) {
            // Options Container (Grid or List)
            const div = document.createElement('div');
            div.className = 'grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 w-full wizard-message-enter';

            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'wizard-option-card bg-white border border-gray-200 hover:border-blue-400 p-3 rounded-xl text-left shadow-sm group transition-all relative overflow-hidden';
                btn.onclick = () => {
                    // Disable all buttons in this group
                    div.querySelectorAll('button').forEach(b => {
                        b.disabled = true;
                        b.classList.add('opacity-50');
                    });
                    handleAction(opt.action, opt.label);
                };
                btn.innerHTML = `
                    <div class="relative z-10 font-medium text-gray-700 group-hover:text-blue-600 text-sm flex items-center gap-2">
                        ${opt.label}
                    </div>
                    <div class="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                `;
                div.appendChild(btn);
            });

            body.appendChild(div);
            scrollToBottom();
        }

        function scrollToBottom() {
            body.scrollTo({ top: body.scrollHeight, behavior: 'smooth' });
        }

        function getTimeBasedGreeting() {
            const h = new Date().getHours();
            if (h < 12) return "Günaydın! ☀️";
            if (h < 18) return "Tünaydın! 🌤️";
            return "İyi akşamlar! 🌙";
        }

        function openWhatsApp(text) {
            const url = `https://wa.me/905555555555?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        }

        function saveHistory(role, text) {
            state.history.push({ role, text });
        }

        // Handle User Input Form
        window.handleUserSubmit = function (e) {
            e.preventDefault();
            const val = input.value.trim();
            if (!val) return;
            addUserMessage(val);
            input.value = '';

            // Smart Keyword Logic (Seda 4.0 Intelligence)
            const lower = val.toLowerCase();

            // Emergency/Urgent keywords
            if (lower.includes('acil') || lower.includes('ağrı') || lower.includes('acı') || lower.includes('şiş')) {
                addBotMessage("Diş ağrısı çok rahatsız edici, anlıyorum! 🦷 Sizi hemen aynı gün randevuya alalım.");
                setTimeout(() => {
                    showOptions([
                        { label: "🚨 ACİL Randevu Al", action: "appointment" },
                        { label: "📞 Hemen Ara", action: "whatsapp" }
                    ]);
                }, 400);
            }
            // Price keywords
            else if (lower.includes('fiyat') || lower.includes('ücret') || lower.includes('kaç para') || lower.includes('ne kadar')) {
                handleAction('qualify_start', val);
            }
            // Appointment keywords
            else if (lower.includes('randevu') || lower.includes('yer') || lower.includes('saat') || lower.includes('müsait')) {
                handleAction('appointment', val);
            }
            // Implant keywords
            else if (lower.includes('implant') || lower.includes('diş eksik')) {
                handleAction('qualify_implant', val);
            }
            // Whitening keywords
            else if (lower.includes('beyazlatma') || lower.includes('beyaz') || lower.includes('sarı')) {
                addBotMessage("Diş beyazlatma ile ilgileniyorsunuz! ✨ Hollywood gülüşüne sadece bir adım uzaktasınız.");
                setTimeout(() => {
                    showOptions([
                        { label: "💰 Fiyat Hesapla", action: "open_calculator" },
                        { label: "📅 Randevu Al", action: "appointment" }
                    ]);
                }, 400);
            }
            // Kids keywords
            else if (lower.includes('çocuk') || lower.includes('bebek') || lower.includes('pedodonti')) {
                addBotMessage("Çocuk diş hekimliği (Pedodonti) uzmanlarımız minik hastalarımız için özel deneyim sunuyor! 👶");
                setTimeout(() => {
                    showOptions([
                        { label: "📅 Çocuk Randevusu", action: "appointment" },
                        { label: "💬 Soru Sor", action: "whatsapp_kids" }
                    ]);
                }, 400);
            }
            // Esthetic keywords
            else if (lower.includes('estetik') || lower.includes('zirkon') || lower.includes('gülüş') || lower.includes('laminat')) {
                handleAction('qualify_esthetic', val);
            }
            // Greeting keywords
            else if (lower.includes('merhaba') || lower.includes('selam') || lower.includes('hey')) {
                addBotMessage("Merhaba! 👋 Size nasıl yardımcı olabilirim?");
                setTimeout(() => {
                    showOptions([
                        { label: "📅 Randevu Al", action: "appointment" },
                        { label: "💰 Fiyatlar", action: "qualify_start" },
                        { label: "💬 WhatsApp", action: "whatsapp" }
                    ]);
                }, 400);
            }
            // Thanks/Bye keywords
            else if (lower.includes('teşekkür') || lower.includes('sağol') || lower.includes('görüşürüz')) {
                addBotMessage("Rica ederim! 😊 Başka bir sorunuz olursa buradayım. İyi günler dilerim!");
            }
            else {
                // FALLBACK MENU (Smart Suggestions)
                addBotMessage("Bunu tam anlayamadım ama şunlardan birini mi demek istediniz?");
                setTimeout(() => {
                    showOptions([
                        { label: "📅 Online Randevu", action: "appointment" },
                        { label: "💰 Fiyat Hesapla", action: "open_calculator" },
                        { label: "📞 Müşteri Hizmetleri", action: "whatsapp_fallback" }
                    ]);
                }, 400);
            }
        };
    }

    // ============================================
    // APPOINTMENT SERVICE (Background Submission + Real Email)
    // ============================================
    const AppointmentService = {
        async submit(data) {
            // 1. Save to LocalStorage (always succeeds)
            this.saveToStorage(data);

            // 2. Send Real Email via EmailJS
            try {
                await this.sendEmail(data);
                return { success: true };
            } catch (error) {
                console.error('Email sending failed:', error);
                // Still return success since data is saved locally
                return { success: true, emailError: true };
            }
        },

        saveToStorage(data) {
            const appointments = JSON.parse(localStorage.getItem('denta_appointments') || '[]');
            data.id = Date.now();
            data.timestamp = new Date().toISOString();
            data.status = 'pending'; // new, contacted, completed
            appointments.push(data);
            localStorage.setItem('denta_appointments', JSON.stringify(appointments));
            console.log('Appointment saved locally:', data);
        },

        async sendEmail(data) {
            const config = window.EMAILJS_CONFIG;
            const adminEmail = 'g.karhiman078@gmail.com';

            // Format date for readability
            const formattedDate = data.date ? new Date(data.date).toLocaleDateString('tr-TR', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            }) : 'Belirtilmedi';

            // Build email template parameters
            const templateParams = {
                to_email: adminEmail,
                from_name: data.name || 'Anonim',
                from_phone: data.phone || 'Belirtilmedi',
                service_type: data.service || 'Genel',
                doctor: data.doctor || 'Belirtilmedi',
                appointment_date: formattedDate,
                appointment_time: data.time || 'Belirtilmedi',
                message: data.message || '',
                form_type: data.type || 'unknown',
                timestamp: new Date().toLocaleString('tr-TR')
            };

            // Check if EmailJS is properly configured
            if (!config || config.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
                console.warn('%c[EmailJS] Not configured - using mock mode', 'color: orange; font-weight: bold');
                console.log('Would send to:', adminEmail);
                console.log('Template Params:', templateParams);
                return Promise.resolve(); // Mock success
            }

            // Check if emailjs is available
            if (typeof emailjs === 'undefined') {
                console.error('[EmailJS] SDK not loaded');
                return Promise.resolve(); // Still allow local save
            }

            // Send via EmailJS with timeout protection
            console.log('%c[EmailJS] Sending real email...', 'color: green; font-weight: bold');

            // Create timeout promise (8 seconds max)
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Email timeout')), 8000);
            });

            // Race between email send and timeout
            try {
                await Promise.race([
                    emailjs.send(config.SERVICE_ID, config.TEMPLATE_ID, templateParams),
                    timeoutPromise
                ]);
                console.log('%c[EmailJS] Email sent successfully!', 'color: green; font-weight: bold');
            } catch (error) {
                console.warn('%c[EmailJS] Email failed, but appointment saved locally', 'color: orange');
                console.error('Error:', error);
                // Don't throw - let the appointment proceed since it's saved locally
            }
        }
    };

    // ============================================
    // BEFORE/AFTER GALLERY - Static Display (No Slider)
    // ============================================
    // Note: Slider removed in favor of professional static gallery cards
    // No JavaScript needed for static gallery


    // ============================================
    // BOOKING WIZARD - Full Implementation
    // ============================================
    function initBookingWizard() {
        const wizard = {
            step: 1,
            data: { service: '', doctor: '', date: '', time: '', name: '', phone: '' }
        };

        // Generate date options
        const dateContainer = document.getElementById('date-options');
        if (dateContainer && dateContainer.children.length === 0) {
            const days = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];
            const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];

            for (let i = 1; i <= 7; i++) {
                const date = new Date();
                date.setDate(date.getDate() + i);

                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'date-option flex-shrink-0 px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-clinical-primary transition-all text-center min-w-[80px]';
                btn.dataset.date = date.toISOString().split('T')[0];
                btn.innerHTML = `
                    <span class="block text-xs text-gray-500">${days[date.getDay()]}</span>
                    <span class="block text-lg font-bold text-gray-800">${date.getDate()}</span>
                    <span class="block text-xs text-gray-400">${months[date.getMonth()]}</span>
                `;
                dateContainer.appendChild(btn);
            }
        }

        // Service selection - go to step 2
        document.querySelectorAll('.service-option').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.service-option').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                wizard.data.service = btn.querySelector('span')?.textContent || btn.dataset.service;
                setTimeout(() => goToStep(2), 300);
            });
        });

        // Doctor selection - go to step 3
        document.querySelectorAll('.doctor-option').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.doctor-option').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                wizard.data.doctor = btn.querySelector('.font-bold')?.textContent || btn.dataset.doctor;
                setTimeout(() => goToStep(3), 300);
            });
        });

        // Date selection
        document.addEventListener('click', (e) => {
            const dateBtn = e.target.closest('.date-option');
            if (dateBtn) {
                document.querySelectorAll('.date-option').forEach(b => b.classList.remove('selected'));
                dateBtn.classList.add('selected');
                wizard.data.date = dateBtn.dataset.date;
            }
        });

        // Time selection
        document.querySelectorAll('.time-option').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.time-option').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                wizard.data.time = btn.dataset.time;
            });
        });

        // Back buttons
        document.querySelectorAll('.wizard-back').forEach(btn => {
            btn.addEventListener('click', () => {
                if (wizard.step > 1) {
                    goToStep(wizard.step - 1);
                }
            });
        });

        // Submit button
        // Submit button with Background Service Integration
        const submitBtn = document.querySelector('.wizard-submit');
        if (submitBtn) {
            submitBtn.addEventListener('click', async () => {
                wizard.data.name = document.getElementById('wizard-name')?.value || '';
                wizard.data.phone = document.getElementById('wizard-phone')?.value || '';

                // Validation
                if (!wizard.data.date) { alert('Lütfen bir tarih seçin'); return; }
                if (!wizard.data.time) { alert('Lütfen bir saat seçin'); return; }
                if (!wizard.data.name.trim()) { alert('Lütfen adınızı girin'); return; }
                if (!wizard.data.phone.trim()) { alert('Lütfen telefon numaranızı girin'); return; }

                // UI Loading State
                const originalText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Randevu Oluşturuluyor...
                `;

                try {
                    // Background Submission
                    await AppointmentService.submit({
                        type: 'wizard_booking',
                        service: wizard.data.service,
                        doctor: wizard.data.doctor,
                        date: wizard.data.date,
                        time: wizard.data.time,
                        name: wizard.data.name,
                        phone: wizard.data.phone,
                        created_at: new Date().toISOString()
                    });

                    // Success UI
                    showSuccess();
                } catch (error) {
                    console.error('Submission failed:', error);
                    alert('Bir hata oluştu. Lütfen tekrar deneyiniz.');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            });
        }

        // Reset button
        const resetBtn = document.querySelector('.wizard-reset');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                wizard.step = 1;
                wizard.data = { service: '', doctor: '', date: '', time: '', name: '', phone: '' };
                document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
                document.getElementById('wizard-name').value = '';
                document.getElementById('wizard-phone').value = '';
                goToStep(1);
            });
        }

        function goToStep(step) {
            wizard.step = step;

            // Update panels
            document.querySelectorAll('.wizard-panel').forEach(p => p.classList.remove('active'));
            const targetPanel = document.querySelector(`.wizard-panel[data-panel="${step}"]`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }

            // Update step indicators
            document.querySelectorAll('.wizard-step').forEach(s => {
                const stepNum = parseInt(s.dataset.step);
                s.classList.remove('active', 'completed');
                if (stepNum === step) {
                    s.classList.add('active');
                } else if (stepNum < step) {
                    s.classList.add('completed');
                }
            });

            // Update lines
            document.querySelectorAll('.wizard-line').forEach(l => {
                const lineNum = parseInt(l.dataset.line);
                l.classList.toggle('active', lineNum < step);
            });

            // Reinitialize icons
            if (typeof lucide !== 'undefined') {
                setTimeout(() => lucide.createIcons(), 50);
            }
        }

        function showSuccess() {
            document.querySelectorAll('.wizard-panel').forEach(p => p.classList.remove('active'));
            const successPanel = document.querySelector('.wizard-panel[data-panel="success"]');
            if (successPanel) {
                successPanel.classList.add('active');
            }

            // Refresh Appointment Tracker Panel
            if (typeof window.refreshAppointmentTracker === 'function') {
                window.refreshAppointmentTracker();
            }

            const summary = document.getElementById('wizard-summary');
            if (summary) {
                const formattedDate = new Date(wizard.data.date).toLocaleDateString('tr-TR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                summary.innerHTML = `
                    <div class="space-y-3">
                        <div class="flex items-center gap-3">
                            <span class="text-gray-500">Tedavi:</span>
                            <span class="font-semibold text-gray-800">${wizard.data.service}</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="text-gray-500">Doktor:</span>
                            <span class="font-semibold text-gray-800">${wizard.data.doctor}</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="text-gray-500">Tarih:</span>
                            <span class="font-semibold text-gray-800">${formattedDate}</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="text-gray-500">Saat:</span>
                            <span class="font-semibold text-gray-800">${wizard.data.time}</span>
                        </div>
                        <hr class="my-3">
                        <div class="flex items-center gap-3">
                            <span class="text-gray-500">Ad Soyad:</span>
                            <span class="font-semibold text-gray-800">${wizard.data.name}</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="text-gray-500">Telefon:</span>
                            <span class="font-semibold text-gray-800">${wizard.data.phone}</span>
                        </div>
                    </div>
                `;
            }

            // Reinitialize icons
            if (typeof lucide !== 'undefined') {
                setTimeout(() => lucide.createIcons(), 50);
            }
        }
    }

    // ============================================
    // COST CALCULATOR - Full Implementation (FIXED)
    // ============================================
    function initCostCalculator() {
        const treatmentNames = {
            implant: 'Dental İmplant',
            zirconium: 'Zirkonyum Kaplama',
            whitening: 'Diş Beyazlatma',
            veneer: 'Porselen Laminat',
            filling: 'Kompozit Dolgu',
            canal: 'Kanal Tedavisi'
        };

        const counts = {
            implant: 1,
            zirconium: 1,
            veneer: 1
        };

        let months = 1;

        function updateCalculator() {
            let total = 0;
            const selectedItems = [];

            // Get all checked treatments
            document.querySelectorAll('.calc-checkbox:checked').forEach(cb => {
                const treatment = cb.dataset.treatment;
                const price = parseInt(cb.dataset.price) || 0;
                const count = counts[treatment] || 1;
                const itemTotal = price * count;
                total += itemTotal;

                selectedItems.push({
                    name: treatmentNames[treatment] || treatment,
                    count: count,
                    price: itemTotal
                });
            });

            // Update total display
            const totalEl = document.getElementById('calc-total');
            if (totalEl) {
                totalEl.textContent = '₺' + total.toLocaleString('tr-TR');
            }

            // Update monthly display based on selected plan
            const monthlyEl = document.getElementById('calc-monthly');
            if (monthlyEl) {
                const monthlyAmount = months > 1 ? Math.round(total / months) : total;
                monthlyEl.textContent = '₺' + monthlyAmount.toLocaleString('tr-TR');
            }

            // Update selected list
            const listEl = document.getElementById('calc-selected-list');
            if (listEl) {
                if (selectedItems.length === 0) {
                    listEl.innerHTML = '<p class="text-gray-400 text-sm italic">Tedavi seçimi yapınız...</p>';
                } else {
                    listEl.innerHTML = selectedItems.map(item => `
                        <div class="flex justify-between items-center py-2 border-b border-gray-100">
                            <span class="text-gray-700">${item.name} ${item.count > 1 ? '<span class="text-gray-400">x' + item.count + '</span>' : ''}</span>
                            <span class="font-semibold text-gray-900">₺${item.price.toLocaleString('tr-TR')}</span>
                        </div>
                    `).join('');
                }
            }

            // Update treatment item highlight
            document.querySelectorAll('.treatment-item').forEach(item => {
                const checkbox = item.querySelector('.calc-checkbox');
                if (checkbox && checkbox.checked) {
                    item.classList.add('border-clinical-primary', 'bg-blue-50/50');
                    item.classList.remove('border-gray-200');
                } else {
                    item.classList.remove('border-clinical-primary', 'bg-blue-50/50');
                    item.classList.add('border-gray-200');
                }
            });
        }

        // Checkbox change events
        document.querySelectorAll('.calc-checkbox').forEach(cb => {
            cb.addEventListener('change', updateCalculator);
        });

        // Increment buttons
        document.querySelectorAll('.calc-increment').forEach(btn => {
            btn.addEventListener('click', () => {
                const treatment = btn.dataset.treatment;
                if (counts[treatment] !== undefined) {
                    counts[treatment] = Math.min(10, counts[treatment] + 1);
                    const countDisplay = document.querySelector(`.calc-count[data-treatment="${treatment}"]`);
                    if (countDisplay) countDisplay.textContent = counts[treatment];
                    updateCalculator();
                }
            });
        });

        // Decrement buttons
        document.querySelectorAll('.calc-decrement').forEach(btn => {
            btn.addEventListener('click', () => {
                const treatment = btn.dataset.treatment;
                if (counts[treatment] !== undefined) {
                    counts[treatment] = Math.max(1, counts[treatment] - 1);
                    const countDisplay = document.querySelector(`.calc-count[data-treatment="${treatment}"]`);
                    if (countDisplay) countDisplay.textContent = counts[treatment];
                    updateCalculator();
                }
            });
        });

        // Payment plan tabs
        document.querySelectorAll('.calc-payment-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                // Update active state
                document.querySelectorAll('.calc-payment-tab').forEach(t => {
                    t.classList.remove('bg-white', 'text-clinical-primary', 'shadow-sm');
                    t.classList.add('text-gray-600');
                });
                tab.classList.add('bg-white', 'text-clinical-primary', 'shadow-sm');
                tab.classList.remove('text-gray-600');

                // Update months
                months = parseInt(tab.dataset.months) || 1;
                updateCalculator();
            });
        });

        // Initial update
        updateCalculator();
    }

    // ============================================
    // STANDARD APPOINTMENT FORM - Enhanced with Success Screen
    // ============================================
    function initAppointmentForm() {
        const form = document.getElementById('appointment-form');
        if (!form) {
            console.log('[AppointmentForm] Form not found');
            return;
        }

        console.log('[AppointmentForm] Initialized');

        // Create Success Panel (hidden by default)
        const formParent = form.parentElement;
        const successPanel = document.createElement('div');
        successPanel.id = 'appt-success-panel';
        successPanel.className = 'hidden';
        successPanel.innerHTML = `
            <div class="text-center py-8">
                <!-- Success Animation -->
                <div class="w-20 h-20 bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                    <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                
                <h3 class="text-2xl font-bold text-gray-800 mb-2">Randevunuz Alındı!</h3>
                <p class="text-gray-500 mb-6">Talebiniz başarıyla iletildi.</p>
                
                <!-- Call Confirmation -->
                <div class="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mb-6 border border-blue-100">
                    <div class="flex items-center justify-center gap-3 mb-3">
                        <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                        </div>
                        <div class="text-left">
                            <p class="text-lg font-bold text-blue-800">Sizi En Kısa Sürede Arayacağız!</p>
                            <p class="text-sm text-blue-600">Genellikle 15 dakika içinde dönüş yapıyoruz.</p>
                        </div>
                    </div>
                </div>
                
                <!-- Appointment Summary -->
                <div id="appt-summary" class="bg-gray-50 rounded-xl p-4 text-left text-sm space-y-2 mb-6">
                    <!-- Will be filled dynamically -->
                </div>
                
                <!-- New Appointment Button -->
                <button type="button" id="new-appointment-btn" class="w-full bg-gradient-to-r from-clinical-primary to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                    Yeni Randevu Oluştur
                </button>
            </div>
        `;
        formParent.appendChild(successPanel);

        // New Appointment Button Handler
        successPanel.querySelector('#new-appointment-btn').addEventListener('click', () => {
            form.classList.remove('hidden');
            successPanel.classList.add('hidden');
            form.reset();
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('[AppointmentForm] Submit triggered');

            const name = document.getElementById('appt-name')?.value || '';
            const phone = document.getElementById('appt-phone')?.value || '';
            const service = document.getElementById('appt-service')?.value || '';
            const date = document.getElementById('appt-date')?.value || '';
            const messageText = document.getElementById('appt-message')?.value || '';

            // Validation
            if (!name || !phone || !date) {
                alert('Lütfen zorunlu alanları doldurunuz.');
                return;
            }

            // UI Loading
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Gönderiliyor...
            `;

            try {
                console.log('[AppointmentForm] Calling AppointmentService.submit');

                // Background Submission
                await AppointmentService.submit({
                    type: 'standard_form',
                    name,
                    phone,
                    service,
                    date,
                    message: messageText || 'Belirtilmedi',
                    created_at: new Date().toISOString()
                });

                console.log('[AppointmentForm] Submission successful');

                // Format date for display
                const formattedDate = new Date(date).toLocaleDateString('tr-TR', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                });

                // Update Summary
                const summary = successPanel.querySelector('#appt-summary');
                summary.innerHTML = `
                    <div class="flex justify-between"><span class="text-gray-500">Ad Soyad:</span><span class="font-medium text-gray-800">${name}</span></div>
                    <div class="flex justify-between"><span class="text-gray-500">Telefon:</span><span class="font-medium text-gray-800">${phone}</span></div>
                    <div class="flex justify-between"><span class="text-gray-500">Hizmet:</span><span class="font-medium text-gray-800">${service}</span></div>
                    <div class="flex justify-between"><span class="text-gray-500">Tarih:</span><span class="font-medium text-gray-800">${formattedDate}</span></div>
                `;

                // Show Success Panel
                form.classList.add('hidden');
                successPanel.classList.remove('hidden');

                // Refresh Appointment Tracker Panel
                if (typeof window.refreshAppointmentTracker === 'function') {
                    window.refreshAppointmentTracker();
                }

                // Reset button state
                btn.innerHTML = originalText;
                btn.disabled = false;

            } catch (error) {
                console.error('[AppointmentForm] Submission failed:', error);
                alert('Bir hata oluştu. Lütfen tekrar deneyiniz.');
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        });
    }

    // ============================================
    // APPOINTMENT TRACKER PANEL (localStorage-based)
    // ============================================
    function initAppointmentTracker() {
        const containers = [
            document.querySelector('#booking-wizard .container'),
            document.querySelector('#randevu .container')
        ].filter(Boolean);

        if (containers.length === 0) {
            console.log('[AppointmentTracker] No containers found');
            return;
        }

        console.log('[AppointmentTracker] Initialized');

        // Create tracker panel HTML
        function createTrackerPanel() {
            const appointments = JSON.parse(localStorage.getItem('denta_appointments') || '[]');
            const recentAppointments = appointments.slice(-5).reverse(); // Last 5, newest first

            if (recentAppointments.length === 0) return null;

            const panel = document.createElement('div');
            panel.className = 'appointment-tracker-panel bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden mt-8 max-w-md mx-auto';
            panel.innerHTML = `
                <button class="tracker-toggle w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-colors">
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                            </svg>
                        </div>
                        <div class="text-left">
                            <p class="font-bold text-gray-800">${getText('tracker_title')}</p>
                            <p class="text-xs text-gray-500">${recentAppointments.length} ${getText('tracker_active')}</p>
                        </div>
                    </div>
                    <svg class="w-5 h-5 text-gray-400 tracker-chevron transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div class="tracker-content hidden">
                    <div class="divide-y divide-gray-100">
                        ${recentAppointments.map(appt => {
                const date = new Date(appt.date || appt.created_at);
                const lang = localStorage.getItem('dentacare-lang') || 'tr';
                const formattedDate = date.toLocaleDateString(lang === 'de' ? 'de-DE' : lang === 'en' ? 'en-US' : 'tr-TR', { day: 'numeric', month: 'short' });
                const service = appt.service || getText('success_summary_service');
                return `
                                <div class="p-4 hover:bg-gray-50 transition-colors">
                                    <div class="flex items-center justify-between mb-2">
                                        <span class="font-medium text-gray-800">${service}</span>
                                        <span class="text-sm text-gray-500">${formattedDate}</span>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <span class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                            </svg>
                                            ${getText('tracker_status_call')}
                                        </span>
                                        <span class="text-xs text-gray-400">${appt.name || ''}</span>
                                    </div>
                                </div>
                            `;
            }).join('')}
                    </div>
                </div>
            `;

            // Toggle functionality
            const toggle = panel.querySelector('.tracker-toggle');
            const content = panel.querySelector('.tracker-content');
            const chevron = panel.querySelector('.tracker-chevron');

            toggle.addEventListener('click', () => {
                content.classList.toggle('hidden');
                chevron.classList.toggle('rotate-180');
            });

            return panel;
        }

        // Add panels to containers
        containers.forEach(container => {
            const existingPanel = container.querySelector('.appointment-tracker-panel');
            if (existingPanel) existingPanel.remove();

            const panel = createTrackerPanel();
            if (panel) {
                container.appendChild(panel);
            }
        });

        // Make refresh function globally available
        window.refreshAppointmentTracker = () => {
            containers.forEach(container => {
                const existingPanel = container.querySelector('.appointment-tracker-panel');
                if (existingPanel) existingPanel.remove();

                const panel = createTrackerPanel();
                if (panel) {
                    container.appendChild(panel);
                }
            });
        };
    }

    // ============================================
    // INITIALIZE ALL COMPONENTS
    // ============================================
    // initBeforeAfterSliders(); // Removed in favor of static gallery
    initBookingWizard();
    initCostCalculator();
    initAppointmentForm();
    initChatWidget();
    initAppointmentTracker(); // NEW: Appointment history panels

    // Reinitialize Lucide icons for dynamically added content
    if (typeof lucide !== 'undefined') {
        setTimeout(() => lucide.createIcons(), 100);
    }

    console.log("DentaCare Scripts Loaded - Premium Edition v3.0");
});

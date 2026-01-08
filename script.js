
document.addEventListener('DOMContentLoaded', () => {

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
        } else {
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.classList.remove('translate-x-0');
            document.body.classList.remove('overflow-hidden');
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

    // --- Sticky Navbar Logic ---
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
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
            'footer_copyright': '&copy; 2024 DentaCare Klinik. Tüm hakları saklıdır.'
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
            'footer_copyright': '&copy; 2024 DentaCare Clinic. All rights reserved.'
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
            'footer_copyright': '&copy; 2024 DentaCare Klinik. Alle Rechte vorbehalten.'
        }
    };

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

    console.log("DentaCare Scripts Loaded");
});

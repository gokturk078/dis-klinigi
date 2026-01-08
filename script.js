
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

// PWA Service Worker
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function () {
//         navigator.serviceWorker.register('/sw.js')
//             .then(function (reg) { console.log('SW registered'); })
//             .catch(function (err) { console.log('SW error:', err); });
//     });
// }

// Splash Screen
window.addEventListener('load', function () {
    setTimeout(function () {
        var splash = document.getElementById('splashScreen');
        var logo = document.querySelector('.splash-logo');
        logo.style.animation = 'splashExit 0.5s ease forwards';
        setTimeout(function () {
            splash.style.opacity = '0';
            setTimeout(function () {
                splash.style.display = 'none';
            }, 500);
        }, 500);
    }, 2500);
});

document.addEventListener('DOMContentLoaded', function () {

    // AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // مشغل القرآن
    var audio = document.getElementById('audioPlayer');
    audio.src = 'https://n01.radiojar.com/8s5u5tpdtwzuv?rj-ttl=5&rj-tok=AAABkKNk0wAA7f_FTh5OQTB0wA';

    function togglePlay() {
        if (audio.paused) {
            audio.play();
            document.getElementById('playBtn').innerText = '⏸️';
        } else {
            audio.pause();
            document.getElementById('playBtn').innerText = '▶️';
        }
    }
    window.togglePlay = togglePlay;

    // تحكم في صوت الفيديو
    function toggleSound() {
        var video = document.getElementById('heroVideo');
        var btn = document.getElementById('soundBtn');
        if (video.muted) {
            video.muted = false;
            btn.innerText = '🔊';
        } else {
            video.muted = true;
            btn.innerText = '🔇';
        }
    }
    window.toggleSound = toggleSound

    // زرار أطلبنا الآن
    document.querySelectorAll('.add-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var productName = this.closest('.product-card').querySelector('h3').innerText;
            var message = 'السلام عليكم، أنا مهتم بـ: ' + productName;
            window.open('https://wa.me/201033304242?text=' + encodeURIComponent(message));
        });
    });

    // زرار تسوق الآن
    function scrollToProducts() {
        var products = document.querySelector('.products');
        var position = products.offsetTop;
        var current = window.pageYOffset;
        var distance = position - current;
        var duration = 1500;
        var start = null;
        function step(timestamp) {
            if (!start) start = timestamp;
            var progress = timestamp - start;
            var percent = Math.min(progress / duration, 1);
            window.scrollTo(0, current + distance * percent);
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step);
    }
    window.scrollToProducts = scrollToProducts;

    // القلب مع localStorage
    document.querySelectorAll('.wishlist-btn').forEach(function (btn, index) {
        if (localStorage.getItem('wishlist_' + index) === 'true') {
            btn.classList.add('active');
            btn.innerText = '❤️';
        }
        btn.addEventListener('click', function () {
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                this.innerText = '🤍';
                localStorage.setItem('wishlist_' + index, 'false');
            } else {
                this.classList.add('active');
                this.innerText = '❤️';
                localStorage.setItem('wishlist_' + index, 'true');
            }
        });
    });

    // الدارك مود
    function toggleDarkMode() {
        document.body.classList.toggle('dark');
        var btn = document.querySelector('.dark-mode-btn');
        if (document.body.classList.contains('dark')) {
            btn.innerText = '☀️ الوضع النهاري';
        } else {
            btn.innerText = '🌙 الوضع الليلي';
        }
    }
    window.toggleDarkMode = toggleDarkMode;

    // نص ترحيبي
    var text = 'أهلاً وسهلاً بك في مفروشات الياسمينا 🌸';
    var index = 0;
    function typeText() {
        if (index < text.length) {
            document.getElementById('typingText').innerHTML += text[index];
            index++;
            setTimeout(typeText, 80);
        }
    }
    setTimeout(typeText, 1500);

    // عداد العرض
    function updateCountdown() {
        var endDate = new Date('2026-05-26T00:00:00');
        var now = new Date();
        var diff = endDate - now;
        if (diff <= 0) {
            document.querySelector('.countdown-box').innerHTML = `
                <p class="offer-title">🎉 انتهى العرض</p>
                <p style="color:white; margin-top:10px;">تابعونا للعروض القادمة على صفحتنا!</p>
                <a href="https://www.facebook.com/share/18z5b6tWhp/" 
                   style="background:white; color:#e91e8c; padding:10px 20px; border-radius:10px; text-decoration:none; margin-top:15px; display:inline-block; font-weight:bold;">
                   👍 تابع صفحتنا
                </a>
            `;
            return;
        }
        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // navbar سكرول
    document.querySelectorAll('.navbar a').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            var position = target.offsetTop;
            var current = window.pageYOffset;
            var distance = position - current;
            var duration = 1500;
            var start = null;
            function step(timestamp) {
                if (!start) start = timestamp;
                var progress = timestamp - start;
                var percent = Math.min(progress / duration, 1);
                window.scrollTo(0, current + distance * percent);
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }
            window.requestAnimationFrame(step);
        });
    });

    // كود هيرو سلايدر 
    // function changeSlide(direction) {
    //     heroSlides[currentSlide].classList.remove('active');
    //     currentSlide = (currentSlide + direction + heroSlides.length) % heroSlides.length;
    //     heroSlides[currentSlide].classList.add('active');
    // }
    // window.changeSlide = changeSlide;

    // Counter Animation
    function animateCounters() {
        var counters = document.querySelectorAll('.stat-number');
        counters.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-target'));
            var count = 0;
            var increment = target / 100;
            var timer = setInterval(function () {
                count += increment;
                if (count >= target) {
                    counter.innerText = target + '+';
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.ceil(count);
                }
            }, 20);
        });
    }
    var statsSection = document.querySelector('.stats');
    var animated = false;
    window.addEventListener('scroll', function () {
        if (!animated && statsSection) {
            var position = statsSection.getBoundingClientRect().top;
            if (position < window.innerHeight) {
                animateCounters();
                animated = true;
            }
        }
    });

    // زرار رجوع لفوق
    window.addEventListener('scroll', function () {
        var btn = document.getElementById('scrollTop');
        if (window.pageYOffset > 300) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    });

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollToTop = scrollToTop;

    // فلترة المنتجات
    function filterProducts(category, btn) {
        var cards = document.querySelectorAll('.product-card');
        var buttons = document.querySelectorAll('.filter-btn');
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        cards.forEach(function (card) {
            var cardCategory = card.getAttribute('data-category');
            if (category === 'all') {
                card.style.display = 'block';
            } else if (category === 'barans' && (cardCategory === 'barans' || cardCategory === 'barans-atfal')) {
                card.style.display = 'block';
            } else if (category === 'malayat' && (cardCategory === 'malayat-kabir' || cardCategory === 'malayat-atfal')) {
                card.style.display = 'block';
            } else if (category === 'bataneen' && (cardCategory === 'dafayat' || cardCategory === 'batateen' || cardCategory === 'lehaf')) {
                card.style.display = 'block';
            } else if (cardCategory === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        AOS.refresh();
    }
    window.filterProducts = filterProducts;

    // EmailJS
    emailjs.init('OUkdZ5koxrUA0BY8f');

    function sendEmail() {
        var name = document.getElementById('from_name').value;
        var phone = document.getElementById('phone').value;
        var message = document.getElementById('message').value;
        if (!name || !message) {
            document.getElementById('formStatus').innerText = '⚠️ من فضلك اكتب اسمك ورسالتك!';
            return;
        }
        document.getElementById('formStatus').innerText = '⏳ جاري الإرسال...';
        emailjs.send('service_h9vu1ea', 'template_8axlb3o', {
            from_name: name,
            phone: phone,
            message: message
        }).then(function () {
            document.getElementById('formStatus').innerText = '✅ تم الإرسال بنجاح!';
            document.getElementById('from_name').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('message').value = '';
        }).catch(function () {
            document.getElementById('formStatus').innerText = '❌ حصل خطأ، جرب تاني!';
        });
    }
    window.sendEmail = sendEmail;

});


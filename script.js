
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });


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

    // القلب
    document.querySelectorAll('.wishlist-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                this.innerText = '🤍';
            } else {
                this.classList.add('active');
                this.innerText = '❤️';
            }
        });
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

// عداد العرض
function updateCountdown() {
    var endDate = new Date('2026-05-26T00:00:00');
    var now = new Date();
    var diff = endDate - now;

    if (diff <= 0) {
        document.querySelector('.countdown-box').innerHTML = '<p class="offer-title">❌ انتهى العرض</p>';
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

// Hero Slider
var heroSlides = document.querySelectorAll('.hero-slide');
var currentSlide = 0;

setInterval(function () {
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
}, 3000);

function changeSlide(direction) {
    heroSlides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + heroSlides.length) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
}
window.changeSlide = changeSlide;

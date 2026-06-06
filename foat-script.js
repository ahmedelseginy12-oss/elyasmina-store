/* ============================================================
   foat-script.js — مفروشات الياسمينا | صفحة الفوط والبشاكير
============================================================ */

const FOAT_COLORS = [
    { name: 'أبيض', hex: '#ffffff', border: true, emoji: '🤍' },
    { name: 'بيج', hex: '#f5deb3', border: false, emoji: '🧡' },
    { name: 'سماوي', hex: '#87ceeb', border: false, emoji: '💙' },
    { name: 'وردي', hex: '#ffb6c1', border: false, emoji: '🩷' },
    { name: 'أخضر فاتح', hex: '#90ee90', border: false, emoji: '💚' },
    { name: 'رمادي', hex: '#b0b0b0', border: false, emoji: '🩶' },
    { name: 'أصفر', hex: '#ffe066', border: false, emoji: '💛' },
    { name: 'بنفسجي فاتح', hex: '#d8b4fe', border: false, emoji: '💜' },
    { name: 'برتقالي', hex: '#ffa07a', border: false, emoji: '🧡' },
    { name: 'أزرق غامق', hex: '#4682b4', border: false, emoji: '🔵' },
    { name: 'أحمر', hex: '#e57373', border: false, emoji: '❤️' },
    { name: 'بني فاتح', hex: '#d2a679', border: false, emoji: '🤎' },
];

const BASHAER_COLORS = [
    { name: 'أبيض', hex: '#ffffff', border: true, emoji: '🤍' },
    { name: 'بيج', hex: '#f5deb3', border: false, emoji: '🧡' },
    { name: 'سماوي', hex: '#87ceeb', border: false, emoji: '💙' },
    { name: 'وردي', hex: '#ffb6c1', border: false, emoji: '🩷' },
    { name: 'رمادي', hex: '#b0b0b0', border: false, emoji: '🩶' },
    { name: 'أخضر فاتح', hex: '#90ee90', border: false, emoji: '💚' },
    { name: 'أزرق غامق', hex: '#4682b4', border: false, emoji: '🔵' },
    { name: 'بنفسجي فاتح', hex: '#d8b4fe', border: false, emoji: '💜' },
    { name: 'أحمر', hex: '#e57373', border: false, emoji: '❤️' },
    { name: 'بني فاتح', hex: '#d2a679', border: false, emoji: '🤎' },
];

// ✅ شيل السعر من هنا لما تحدث الأسعار — اكتب 0 أو احذف price
const FOAT_SIZES = [
    { label: '14×70 سم', desc: 'فوطة صغيرة' },
    { label: '16×80 سم', desc: 'فوطة متوسطة' },
    { label: '18×90 سم', desc: 'فوطة كبيرة' },
    { label: '20×100 سم', desc: 'فوطة كبيرة جداً' },
    { label: '50×90 سم', desc: 'فوطة جاكار' },
    { label: '70×140 سم', desc: 'فوطة سبورت' },
];

const BASHAER_SIZES = [
    { label: '70×140 سم', desc: 'بشكير متوسط' },
    { label: '80×160 سم', desc: 'بشكير كبير' },
    { label: '90×180 سم', desc: 'بشكير كبير جداً' },
    { label: '50×100 سم', desc: 'بشكير أطفال' },
    { label: '60×120 سم', desc: 'بشكير أطفال كبير' },
];

const HERO_SLIDES = [
    { img: 'product-pics/foat-1.png' },
    { img: 'product-pics/foat-2.png' },
    { img: 'product-pics/foat-3.png' },
    { img: 'product-pics/foat-4.png' },
    { img: 'product-pics/foat-5.png' },
];

/* ==================== السلايدر ==================== */
(function buildHeroSlider() {
    const container = document.getElementById('heroSlides');
    const dotsEl = document.getElementById('heroDots');
    HERO_SLIDES.forEach((s, i) => {
        const slide = document.createElement('div');
        slide.className = 'hero-slide';
        slide.innerHTML = `<img src="${s.img}" alt="فوط" style="width:100%;height:100%;object-fit:contain;border-radius:16px;">`;
        container.appendChild(slide);
        const dot = document.createElement('div');
        dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goHeroSlide(i);
        dotsEl.appendChild(dot);
    });
})();

let heroIdx = 0;
function goHeroSlide(i) {
    heroIdx = (i + HERO_SLIDES.length) % HERO_SLIDES.length;
    document.getElementById('heroSlides').style.transform = `translateX(${heroIdx * 100}%)`;
    document.querySelectorAll('.hero-dot').forEach((d, j) => d.classList.toggle('active', j === heroIdx));
}
function heroSlide(dir) { goHeroSlide(heroIdx + dir); }
setInterval(() => heroSlide(1), 2800);

/* ==================== بناء المقاسات ==================== */
function buildSizes(section, sizes) {
    const grid = document.getElementById(section + '-sizes');
    sizes.forEach((sz, i) => {
        const card = document.createElement('div');
        card.className = 'size-card';
        card.id = section + '-size-' + i;
        card.innerHTML = `
            <span class="size-dim">${sz.label}</span>
            <span class="size-desc">${sz.desc}</span>`;
        card.onclick = () => selectSize(section, i);
        grid.appendChild(card);
    });
}
buildSizes('foat', FOAT_SIZES);
buildSizes('bashaer', BASHAER_SIZES);

/* ==================== الحالة ==================== */
const state = {
    foat: { sizeIdx: null, colorIdx: null, qty: 1 },
    bashaer: { sizeIdx: null, colorIdx: null, qty: 1 },
};

/* ==================== اختيار المقاس ==================== */
function selectSize(section, idx) {
    const sizes = section === 'foat' ? FOAT_SIZES : BASHAER_SIZES;
    const colors = section === 'foat' ? FOAT_COLORS : BASHAER_COLORS;

    document.querySelectorAll('#' + section + '-sizes .size-card').forEach(c => c.classList.remove('active'));
    document.getElementById(section + '-size-' + idx).classList.add('active');

    state[section].sizeIdx = idx;
    state[section].colorIdx = null;
    state[section].qty = 1;
    document.getElementById(section + '-qty').textContent = 1;
    document.getElementById(section + '-selected-size-label').textContent = sizes[idx].label;

    buildColors(section, colors);

    document.getElementById(section + '-colors-panel').classList.add('visible');
    document.getElementById(section + '-order-panel').classList.remove('visible');

    setTimeout(() => {
        document.getElementById(section + '-colors-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
}

/* ==================== بناء الألوان ==================== */
function buildColors(section, colors) {
    const grid = document.getElementById(section + '-colors-grid');
    grid.innerHTML = '';
    colors.forEach((c, i) => {
        const item = document.createElement('div');
        item.className = 'color-item';
        item.id = section + '-color-' + i;
        item.innerHTML = `
            <div class="color-swatch-box" style="background:${c.hex};${c.border ? 'border-bottom:1px solid #eee;' : ''}">${c.emoji}</div>
            <div class="color-item-name">${c.name}</div>`;
        item.onclick = () => selectColor(section, i);
        grid.appendChild(item);
    });
}

/* ==================== اختيار اللون ==================== */
function selectColor(section, idx) {
    const colors = section === 'foat' ? FOAT_COLORS : BASHAER_COLORS;
    const sizes = section === 'foat' ? FOAT_SIZES : BASHAER_SIZES;

    document.querySelectorAll('#' + section + '-colors-grid .color-item').forEach(c => c.classList.remove('active'));
    document.getElementById(section + '-color-' + idx).classList.add('active');

    state[section].colorIdx = idx;

    const sz = sizes[state[section].sizeIdx];
    const cl = colors[idx];

    document.getElementById(section + '-order-summary').innerHTML =
        `<strong>📦 المنتج:</strong> ${section === 'foat' ? 'فوطة' : 'بشكير'} — ${sz.label}<br>
         <strong>🎨 اللون:</strong> ${cl.name}<br>
         <strong>🔢 الكمية:</strong> <span id="${section}-qty-display">${state[section].qty}</span> قطعة`;

    document.getElementById(section + '-order-panel').classList.add('visible');

    setTimeout(() => {
        document.getElementById(section + '-order-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        initStock(document.getElementById(section + '-order-panel'));
    }, 100);
}

/* ==================== الكمية ==================== */
function changeQty(section, delta) {
    const s = state[section];
    s.qty = Math.max(1, s.qty + delta);
    document.getElementById(section + '-qty').textContent = s.qty;
    // تحديث الكمية في الملخص
    const display = document.getElementById(section + '-qty-display');
    if (display) display.textContent = s.qty;
}

/* ==================== اسأل عن السعر ==================== */
function askPrice(section) {
    const s = state[section];
    if (s.sizeIdx === null) { alert('من فضلك اختر المقاس أولاً'); return; }
    if (s.colorIdx === null) { alert('من فضلك اختر اللون أولاً'); return; }

    const sizes = section === 'foat' ? FOAT_SIZES : BASHAER_SIZES;
    const colors = section === 'foat' ? FOAT_COLORS : BASHAER_COLORS;
    const sz = sizes[s.sizeIdx];
    const cl = colors[s.colorIdx];

    const msg =
        'السلام عليكم 👋\n' +
        'أنا مهتم بـ: ' + (section === 'foat' ? 'فوطة' : 'بشكير') + '\n' +
        '📐 المقاس: ' + sz.label + '\n' +
        '🎨 اللون: ' + cl.name + '\n' +
        '🔢 الكمية: ' + s.qty + ' قطعة\n\n' +
        '💬 محتاج أعرف السعر من فضلك 🙏';

    window.open('https://wa.me/201033304242?text=' + encodeURIComponent(msg), '_blank');
}

/* ==================== إرسال الطلب ==================== */
function sendOrder(section) {
    const s = state[section];
    if (s.sizeIdx === null) { alert('من فضلك اختر المقاس أولاً'); return; }
    if (s.colorIdx === null) { alert('من فضلك اختر اللون أولاً'); return; }

    const sizes = section === 'foat' ? FOAT_SIZES : BASHAER_SIZES;
    const colors = section === 'foat' ? FOAT_COLORS : BASHAER_COLORS;
    const sz = sizes[s.sizeIdx];
    const cl = colors[s.colorIdx];

    const msg =
        '🛍️ طلب جديد من موقع الياسمينا\n\n' +
        '📦 المنتج: ' + (section === 'foat' ? 'فوطة' : 'بشكير') + '\n' +
        '📐 المقاس: ' + sz.label + '\n' +
        '🎨 اللون: ' + cl.name + '\n' +
        '🔢 الكمية: ' + s.qty + ' قطعة\n\n' +
        'أرجو التواصل لتأكيد الطلب والسعر 🙏';

    window.open('https://wa.me/201033304242?text=' + encodeURIComponent(msg), '_blank');
}

/* ==================== التبويبات ==================== */
function showSection(id, btn) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.section-tab').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    btn.classList.add('active');
    window.scrollTo({ top: document.querySelector('.section-tabs').offsetTop - 70, behavior: 'smooth' });
}

/* ==================== الوضع الليلي ==================== */
function toggleDarkMode() {
    document.body.classList.toggle('dark');
    document.querySelector('.dark-mode-btn').textContent =
        document.body.classList.contains('dark') ? '☀️ الوضع النهاري' : '🌙 الوضع الليلي';
}

/* ==================== زر رجوع لفوق ==================== */
window.addEventListener('scroll', () => {
    document.getElementById('scrollTop').style.display = window.pageYOffset > 300 ? 'block' : 'none';
});

/* ==================== مشاركة المنتج ==================== */
function shareWA() {
    const text = encodeURIComponent('شوف المنتج ده من مفروشات الياسمينا 🛍️\n' + window.location.href);
    window.open('https://wa.me/?text=' + text, '_blank');
}
function shareFB() {
    const url = encodeURIComponent(window.location.href);
    window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank');
}
function copyLink(btn) {
    navigator.clipboard.writeText(window.location.href).then(function () {
        btn.innerHTML = '<i class="fas fa-check"></i> تم النسخ!';
        btn.classList.add('copied');
        setTimeout(function () {
            btn.innerHTML = '<i class="fas fa-link"></i> نسخ الرابط';
            btn.classList.remove('copied');
        }, 2500);
    });
}

/* ==================== عداد الكمية ==================== */
function initStock(panel) {
    const stock = Math.floor(Math.random() * 7) + 3;
    const pct = Math.round((stock / 10) * 100);
    const numEl = panel.querySelector('.stock-num');
    const barEl = panel.querySelector('.stock-bar');
    if (numEl) numEl.textContent = stock;
    if (barEl) setTimeout(function () { barEl.style.width = pct + '%'; }, 300);
}

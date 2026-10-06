document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    // ハンバーガーメニューのクリックイベント
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // ハンバーガーのアイコンのアニメーション（必要に応じてCSSに追加）
        hamburger.classList.toggle('active'); 
    });

    // ナビゲーションリンクをクリックしたらメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // スクロール時にヘッダーに影をつける（デフォルトでついていますが、高度な制御用）
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
    });
});
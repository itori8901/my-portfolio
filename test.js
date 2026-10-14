// GSAP ScrollTriggerの登録
gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

  // 1. ヒーローテキストのアニメーション（文字単位での出現）
  const heroTitle = document.querySelector('.js-text-reveal');
  if (heroTitle) {
    // テキストを取得し、1文字ずつspanタグで囲む
    const text = heroTitle.textContent;
    heroTitle.innerHTML = '';
    
    text.split('').forEach(char => {
      if (char === ' ') {
        heroTitle.innerHTML += ' ';
      } else {
        // overflow: hidden がかかった親要素の中で translateY をかけて隠しておく
        heroTitle.innerHTML += `<span class="char">${char}</span>`;
      }
    });

    // 文字を下からスライドイン
    gsap.to('.hero-title .char', {
      y: '0%',          // 元の位置に戻す
      duration: 1.2,
      stagger: 0.05,    // 0.05秒間隔で順番に出現
      ease: 'power4.out',
      delay: 0.2        // 読み込み直後に少し待つ
    });
  }

  // 2. ナビゲーションのフェードダウン
  gsap.fromTo('.js-fade-down', 
    { y: -20, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 }
  );

  // 3. スクロール時のフェードアップアニメーション
  const fadeUpElements = document.querySelectorAll('.js-fade-up');
  
  fadeUpElements.forEach((el) => {
    // HTMLの data-delay 属性を取得（指定がなければ0）
    const delay = el.getAttribute('data-delay') || 0;

    gsap.fromTo(el, 
      { 
        y: 40, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        delay: parseFloat(delay),
        scrollTrigger: {
          trigger: el,
          start: 'top 85%', // 要素が画面の下から15%の位置に来たら発火
          toggleActions: 'play none none none', // 1回だけ再生
        }
      }
    );
  });

});
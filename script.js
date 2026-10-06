document.addEventListener("DOMContentLoaded", () => {
  /* ===== スマホメニューの開閉 ===== */
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");

  const closeMenu = () => {
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "メニューを開く");
  };

  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeMenu(); });

  /* ===== 制作実績の絞り込み ===== */
  const filterBtns = document.querySelectorAll(".filter__btn");
  const works = document.querySelectorAll(".work");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const type = btn.dataset.filter;
      works.forEach((w) => {
        w.hidden = !(type === "all" || w.dataset.category === type);
      });
    });
  });

  /* ===== お問い合わせフォーム =====
     サーバーなしで動くよう、入力内容でメールアプリを起動します。
     ★ 下の MY_EMAIL を自分のアドレスに変更してください */
  const MY_EMAIL = "your-email@example.com";
  const form = document.getElementById("contactForm");

  const showError = (field, msg) => {
    field.classList.toggle("is-invalid", Boolean(msg));
    field.setAttribute("aria-invalid", Boolean(msg));
    field.parentElement.querySelector(".error").textContent = msg;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { name, email, message } = form.elements;
    let ok = true;

    if (!name.value.trim()) { showError(name, "お名前を入力してください。"); ok = false; }
    else showError(name, "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      showError(email, "メールアドレスの形式で入力してください。"); ok = false;
    } else showError(email, "");

    if (!message.value.trim()) { showError(message, "ご相談内容を入力してください。"); ok = false; }
    else showError(message, "");

    if (!ok) return;

    const subject = encodeURIComponent(`【ポートフォリオ】${name.value.trim()}様よりお問い合わせ`);
    const body = encodeURIComponent(
      `お名前: ${name.value.trim()}\nメール: ${email.value.trim()}\n\n${message.value.trim()}`
    );
    window.location.href = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;
  });

  /* ===== フッターの年 ===== */
  document.getElementById("year").textContent = new Date().getFullYear();
});
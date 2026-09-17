document.addEventListener("DOMContentLoaded", function () {
  const navWrapper = document.querySelector(".nav-wrapper");
  if (!navWrapper) {
    console.error("HATA: '.nav-wrapper' elemanı bulunamadı.");
    return;
  }

  const registerUrl = "kayit.html";

  navWrapper.classList.add("site-header");
  navWrapper.innerHTML = `
    <div class="utility-bar">
      <div class="utility-bar__inner">
        <p class="utility-bar__note">Menemen Gelişim Spor Kulübü</p>
        <div class="utility-bar__actions">
          <div class="utility-bar__social">
            <a href="https://www.instagram.com/menemengelisimsk/" target="_blank" rel="noopener" aria-label="Instagram"><i class="ri-instagram-line"></i></a>
            <a href="https://www.youtube.com/@menemengsk" target="_blank" rel="noopener" aria-label="YouTube"><i class="ri-youtube-fill"></i></a>
          </div>
          <a href="iletisim.html">İletişim</a>
        </div>
      </div>
    </div>
    <nav class="main-nav" aria-label="Ana menü">
      <div class="nav__logo">
        <a href="index.html"><img src="assets/logo.png" alt="Menemen Gelişim Spor Kulübü" width="120" height="120" /></a>
        <p class="nav__brand-script" aria-hidden="true">Menemen Gelişim SK</p>
      </div>
      <button class="menu-toggle" type="button" aria-label="Menüyü aç" aria-expanded="false" aria-controls="primary-nav">
        <i class="ri-menu-line" aria-hidden="true"></i>
      </button>
      <ul class="nav__links" id="primary-nav">
        <li class="mobile-nav-hero">
          <img src="assets/logo.png" alt="" width="56" height="56" />
          <div>
            <p class="mobile-nav-hero__eyebrow">Menemen Gelişim SK</p>
            <p class="mobile-nav-hero__title">Keşfet</p>
          </div>
        </li>
        <li class="link" data-index="01"><a href="index.html">Ana Sayfa</a></li>
        <li class="link has-dropdown" data-index="02">
          <a href="vizyon.html" aria-haspopup="true">Kulübümüz <i class="ri-arrow-down-s-line" aria-hidden="true"></i></a>
          <div class="dropdown" role="menu">
            <a href="vizyon.html" role="menuitem">Vizyon &amp; Misyon</a>
            <a href="antrenor.html" role="menuitem">Antrenörler</a>
            <a href="index.html#yas-gruplari" role="menuitem">Yaş Grupları</a>
          </div>
        </li>
        <li class="link" data-index="03"><a href="program.html">Antrenman Programı</a></li>
        <li class="link" data-index="04"><a href="antrenor.html">Antrenörler</a></li>
        <li class="link" data-index="05"><a href="duyurular.html">Duyurular</a></li>
        <li class="link" data-index="06"><a href="gallery.html">Galeri</a></li>
        <li class="link" data-index="07"><a href="iletisim.html">İletişim</a></li>
        <li class="mobile-nav-signature" aria-hidden="true">
          <span class="mobile-nav-signature__rule"></span>
          <p class="mobile-nav-signature__brand">Menemen Gelişim SK</p>
          <p class="mobile-nav-signature__tagline">Gelecek, burada gelişiyor.</p>
          <p class="mobile-nav-signature__place">Caner Ok Spor Tesisleri · Menemen</p>
        </li>
        <li class="mobile-nav-aside">
          <a class="mobile-nav-call" href="tel:+905321641555"><i class="ri-phone-fill" aria-hidden="true"></i> 0532 164 15 55</a>
          <div class="mobile-nav-socials">
            <a href="https://www.instagram.com/menemengelisimsk/" target="_blank" rel="noopener" aria-label="Instagram"><i class="ri-instagram-line"></i></a>
            <a href="https://www.youtube.com/@menemengsk" target="_blank" rel="noopener" aria-label="YouTube"><i class="ri-youtube-fill"></i></a>
          </div>
        </li>
        <li class="mobile-cta">
          <a href="kayit.html" class="btn btn--primary">Ön Kayıt</a>
        </li>
      </ul>
      <div class="nav__cta">
        <a href="kayit.html" class="btn btn--primary">Ön Kayıt</a>
      </div>
    </nav>
  `;

  // Sitewide duyuru şeridi (duyurular sayfası hariç; sayfada yoksa ekle)
  const onDuyurular = /duyurular\.html$/i.test(window.location.pathname);
  if (!onDuyurular && !document.querySelector(".site-announce")) {
    const announce = document.createElement("aside");
    announce.className = "site-announce";
    announce.setAttribute("aria-label", "Duyuru");
    announce.innerHTML = `
      <div class="container site-announce__inner">
        <p><span class="site-announce__badge">Yeni</span> <strong>Gökordu Spor Kulübü</strong> bünyemize katıldı — faaliyetler ve lig müsabakaları Menemen Belediyesi Caner Ok Spor Tesisleri’nde sürecek.</p>
        <a href="duyurular.html">Detayı oku <i class="ri-arrow-right-line" aria-hidden="true"></i></a>
      </div>
    `;
    navWrapper.insertAdjacentElement("afterend", announce);
  }

  // Eski Google Form / target=_blank kayıt linklerini temizle
  document.querySelectorAll('a[href*="docs.google.com/forms"], a[href*="viewform"]').forEach(function (link) {
    const label = (link.textContent || "").toLowerCase();
    if (label.includes("kayıt") || label.includes("kayit") || link.classList.contains("btn")) {
      link.setAttribute("href", "kayit.html");
      link.removeAttribute("target");
      link.removeAttribute("rel");
    }
  });
  document.querySelectorAll('a[href="kayit.html"]').forEach(function (link) {
    link.removeAttribute("target");
    if ((link.getAttribute("rel") || "").includes("noopener")) {
      link.removeAttribute("rel");
    }
  });

  const overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  overlay.hidden = true;
  document.body.appendChild(overlay);

  const menuToggle = navWrapper.querySelector(".menu-toggle");
  const navLinks = navWrapper.querySelector(".nav__links");
  const dropdownParents = navWrapper.querySelectorAll(".has-dropdown");

  function closeMobileNav() {
    navLinks.classList.remove("active");
    overlay.classList.remove("is-active");
    overlay.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Menüyü aç");
    const icon = menuToggle.querySelector("i");
    icon.classList.remove("ri-close-line");
    icon.classList.add("ri-menu-line");
    document.body.classList.remove("nav-open");
    document.body.style.overflow = "";
    dropdownParents.forEach(function (item) {
      item.classList.remove("is-open");
    });
  }

  function dismissPromoPopup() {
    const popup = document.getElementById("popupOverlay");
    if (popup && popup.style.display !== "none") {
      popup.style.display = "none";
    }
  }

  function openMobileNav() {
    dismissPromoPopup();
    navLinks.classList.add("active");
    overlay.classList.add("is-active");
    overlay.hidden = false;
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Menüyü kapat");
    const icon = menuToggle.querySelector("i");
    icon.classList.remove("ri-menu-line");
    icon.classList.add("ri-close-line");
    document.body.classList.add("nav-open");
    document.body.style.overflow = "hidden";
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      if (navLinks.classList.contains("active")) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  overlay.addEventListener("click", closeMobileNav);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && navLinks.classList.contains("active")) {
      closeMobileNav();
    }
  });

  dropdownParents.forEach(function (item) {
    const trigger = item.querySelector(":scope > a");
    if (!trigger) return;

    trigger.addEventListener("click", function (event) {
      if (window.matchMedia("(max-width: 900px)").matches) {
        event.preventDefault();
        const isOpen = item.classList.contains("is-open");
        dropdownParents.forEach(function (other) {
          other.classList.remove("is-open");
        });
        if (!isOpen) item.classList.add("is-open");
      }
    });
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (!window.matchMedia("(max-width: 900px)").matches) return;
      const parent = link.closest(".has-dropdown");
      const isDropdownTrigger =
        parent && parent.querySelector(":scope > a") === link;
      if (!isDropdownTrigger) closeMobileNav();
    });
  });

  const path = window.location.pathname;
  const currentPage =
    path.split("/").pop() ||
    "index.html";
  const normalized =
    currentPage === "" || currentPage === "/" ? "index.html" : currentPage;

  navWrapper.querySelectorAll(".nav__links .link").forEach(function (item) {
    const link = item.querySelector(":scope > a");
    if (!link) return;
    const href = (link.getAttribute("href") || "").split("#")[0];
    if (href === normalized) {
      item.classList.add("active");
    }
    if (normalized === "vizyon.html" && item.classList.contains("has-dropdown")) {
      item.classList.add("active");
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900 && navLinks.classList.contains("active")) {
      closeMobileNav();
    }
  });
});

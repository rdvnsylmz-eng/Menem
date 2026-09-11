document.addEventListener("DOMContentLoaded", function () {
  const registerUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSdpPS2x-J3qpGCiyXTKmGLGtFkNu_WfRdiz1YtsJW10LKcg7g/viewform?usp=sharing";
  const year = new Date().getFullYear();

  const footerHTML = `
    <footer class="site-footer">
      <div class="footer__main">
        <div class="footer__brand">
          <a class="footer__brand-link" href="index.html">
            <img src="assets/logo.png" alt="" width="72" height="72" />
            <span class="footer__brand-text">
              <strong>Menemen GSK</strong>
              <span>Menemen Gelişim Spor Kulübü</span>
            </span>
          </a>
          <p class="footer__tagline">
            5 yaş ve üzeri çocuk ve gençler için UEFA lisanslı antrenörler eşliğinde profesyonel futbol altyapı eğitimi.
          </p>
          <div class="footer__socials">
            <a href="https://www.youtube.com/@menemengsk" target="_blank" rel="noopener" aria-label="YouTube"><i class="ri-youtube-fill" aria-hidden="true"></i></a>
            <a href="https://www.instagram.com/menemengelisimsk/" target="_blank" rel="noopener" aria-label="Instagram"><i class="ri-instagram-line" aria-hidden="true"></i></a>
          </div>
        </div>

        <nav class="footer__nav" aria-label="Footer menü">
          <div class="footer__col">
            <h4>Kulüp</h4>
            <ul>
              <li><a href="index.html">Ana Sayfa</a></li>
              <li><a href="vizyon.html">Vizyon &amp; Misyon</a></li>
              <li><a href="antrenor.html">Antrenörler</a></li>
              <li><a href="${registerUrl}" target="_blank" rel="noopener">Ön Kayıt</a></li>
            </ul>
          </div>
          <div class="footer__col">
            <h4>Keşfet</h4>
            <ul>
              <li><a href="index.html#yas-gruplari">Yaş Grupları</a></li>
              <li><a href="gallery.html">Galeri</a></li>
              <li><a href="iletisim.html">İletişim</a></li>
            </ul>
          </div>
        </nav>

        <div class="footer__contact">
          <h4>İletişim</h4>
          <ul class="footer__contact-list">
            <li>
              <i class="ri-map-pin-2-line" aria-hidden="true"></i>
              <span>30 Ağustos Mah. 7202 Sk No:4<br />Menemen Belediyesi Ulukent Caner Ok Spor Tesisleri<br />Menemen / İzmir</span>
            </li>
            <li>
              <i class="ri-phone-line" aria-hidden="true"></i>
              <span>
                <a href="tel:+905321641555">+90 532 164 15 55</a>
                <a href="tel:+905336488600">+90 533 648 86 00</a>
              </span>
            </li>
            <li>
              <i class="ri-mail-line" aria-hidden="true"></i>
              <a href="mailto:menemengsk@gmail.com">menemengsk@gmail.com</a>
            </li>
          </ul>
          <a class="btn btn--primary footer__cta" href="${registerUrl}" target="_blank" rel="noopener">Ön Kayıt</a>
        </div>
      </div>

      <div class="footer__bar">
        <p>© ${year} Menemen Gelişim Spor Kulübü. Tüm hakları saklıdır.</p>
        <p class="footer__bar-meta">Futbol Altyapı Akademisi · Menemen / İzmir</p>
      </div>
    </footer>
  `;

  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = footerHTML;
  }
});

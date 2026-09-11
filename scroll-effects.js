document.addEventListener("DOMContentLoaded", function () {
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  setTimeout(function () {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }, 2500);

  const backToTop = document.createElement("button");
  backToTop.type = "button";
  backToTop.className = "back-to-top";
  backToTop.setAttribute("aria-label", "Sayfa başına dön");
  backToTop.innerHTML = '<i class="ri-arrow-up-line" aria-hidden="true"></i>';
  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(backToTop);

  const siteHeader =
    document.querySelector(".site-header") ||
    document.querySelector(".nav-wrapper");

  function handleScroll() {
    const scrolled = window.scrollY > 10;
    if (siteHeader) siteHeader.classList.toggle("scrolled", scrolled);
    backToTop.classList.toggle("visible", window.scrollY > 400);
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});

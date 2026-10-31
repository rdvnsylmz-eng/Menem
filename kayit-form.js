(function () {
  var pathButtons = document.querySelectorAll(".kayit-switch__btn[data-path], .kayit-path[data-path]");
  var panelSpor = document.getElementById("panelSpor");
  var panelSecme = document.getElementById("panelSecme");
  var panelKaleci = document.getElementById("panelKaleci");
  var contextEl = document.getElementById("kayitContext");

  var contextCopy = {
    spor: "4 yaş ve üzeri altyapı eğitimi — Cumartesi & Pazar antrenmanları.",
    secme: "Resmi liglere katılım için seçme başvurusu — yetenek taraması dahil.",
    kaleci: "Altın Eldiven × Menemen Gelişim SK Kaleci Okulu — profesyonel ve amatör kaleciler için ön kayıt.",
  };

  var panels = {
    spor: panelSpor,
    secme: panelSecme,
    kaleci: panelKaleci,
  };

  function normalizePath(path) {
    if (path === "secme" || path === "yaris") return "secme";
    if (path === "kaleci" || path === "altin-eldiven" || path === "altineldiven") return "kaleci";
    return "spor";
  }

  function setPath(path, pushHash) {
    var activePath = normalizePath(path);

    pathButtons.forEach(function (btn) {
      var target = normalizePath(btn.getAttribute("data-path"));
      var active = target === activePath;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    Object.keys(panels).forEach(function (key) {
      var panel = panels[key];
      if (!panel) return;
      var active = key === activePath;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });

    if (contextEl) {
      contextEl.textContent = contextCopy[activePath] || contextCopy.spor;
    }

    if (pushHash) {
      var hash = activePath === "spor" ? "spor-okulu" : activePath === "secme" ? "secme" : "altin-eldiven";
      if (history.replaceState) {
        history.replaceState(null, "", "#" + hash);
      } else {
        window.location.hash = hash;
      }
    }
  }

  pathButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setPath(btn.getAttribute("data-path"), true);
    });
  });

  var hash = (window.location.hash || "").replace("#", "").toLowerCase();
  if (hash === "secme" || hash === "yarismaci" || hash === "yetenek" || hash === "lig") {
    setPath("secme", false);
  } else if (
    hash === "altin-eldiven" ||
    hash === "altineldiven" ||
    hash === "kaleci" ||
    hash === "kaleci-okulu" ||
    hash === "kaleciokulu"
  ) {
    setPath("kaleci", false);
  } else {
    setPath("spor", false);
  }

  function showError(errorEl, message) {
    if (!errorEl) return;
    errorEl.hidden = false;
    errorEl.textContent = message;
  }

  function clearError(errorEl) {
    if (!errorEl) return;
    errorEl.hidden = true;
    errorEl.textContent = "";
  }

  function isPhoneOk(value) {
    var digits = String(value || "").replace(/\D/g, "");
    return digits.length >= 10 && digits.length <= 13;
  }

  function isBirthDateOk(value, maxAge) {
    if (!value) return false;
    var birth = new Date(value + "T00:00:00");
    if (Number.isNaN(birth.getTime())) return false;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    if (birth > today) return false;
    var ageYears = (today - birth) / (365.25 * 24 * 60 * 60 * 1000);
    var upper = typeof maxAge === "number" && maxAge > 0 ? maxAge : 25;
    return ageYears >= 3 && ageYears <= upper;
  }

  function setupBirthDateLimits(form) {
    var maxAge = parseInt(form.getAttribute("data-age-max") || "25", 10);
    if (Number.isNaN(maxAge) || maxAge < 3) maxAge = 25;

    form.querySelectorAll("[data-birth]").forEach(function (birthInput) {
      var today = new Date();
      var max = new Date(today.getFullYear() - 3, today.getMonth(), today.getDate());
      var min = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
      birthInput.max = max.toISOString().slice(0, 10);
      birthInput.min = min.toISOString().slice(0, 10);
    });
  }

  function bindExperienceToggle(form) {
    var select = form.querySelector("[data-experience-select]");
    var clubField = form.querySelector("[data-club-field]");
    var clubInput = form.querySelector("[data-club-input]");
    if (!select || !clubField) return;

    function syncClubField() {
      var show = select.value === "Evet";
      clubField.hidden = !show;
      if (clubInput) {
        clubInput.required = show;
        if (!show) clubInput.value = "";
      }
    }

    select.addEventListener("change", syncClubField);
    syncClubField();
  }

  function bindForm(form, successEl) {
    if (!form) return;
    var submitBtn = form.querySelector('[type="submit"]');
    var errorEl = form.querySelector("[data-error]");
    var endpoint = (form.getAttribute("action") || "").trim();
    var defaultLabel = form.getAttribute("data-submit-label") || "Başvuru Gönder";
    var maxAge = parseInt(form.getAttribute("data-age-max") || "25", 10);
    if (Number.isNaN(maxAge) || maxAge < 3) maxAge = 25;

    setupBirthDateLimits(form);
    bindExperienceToggle(form);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      clearError(errorEl);

      if (!endpoint || endpoint.indexOf("REPLACE_ME") !== -1) {
        showError(errorEl, "Form henüz bağlanmadı. Lütfen 0532 164 15 55’i arayın.");
        return;
      }

      var honeypot = form.querySelector('[name="_gotcha"]');
      if (honeypot && honeypot.value) {
        form.hidden = true;
        if (successEl) successEl.hidden = false;
        return;
      }

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var phone = form.querySelector('input[name="telefon"]');
      if (phone && !isPhoneOk(phone.value)) {
        showError(errorEl, "Lütfen geçerli bir telefon numarası girin.");
        phone.focus();
        return;
      }

      var birth = form.querySelector("[data-birth]");
      if (birth && !isBirthDateOk(birth.value, maxAge)) {
        showError(errorEl, "Lütfen geçerli bir doğum tarihi girin.");
        birth.focus();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Gönderiliyor…";
      }

      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (!response.ok) throw new Error("submit_failed");
          form.hidden = true;
          if (successEl) successEl.hidden = false;
          form.reset();
        })
        .catch(function () {
          showError(errorEl, "Gönderim başarısız oldu. Lütfen tekrar deneyin.");
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = defaultLabel;
          }
        });
    });
  }

  bindForm(document.getElementById("kayitFormSpor"), document.getElementById("kayitSuccessSpor"));
  bindForm(document.getElementById("kayitFormSecme"), document.getElementById("kayitSuccessSecme"));
  bindForm(document.getElementById("kayitFormKaleci"), document.getElementById("kayitSuccessKaleci"));
})();

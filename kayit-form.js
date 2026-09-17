(function () {
  var pathButtons = document.querySelectorAll(".kayit-switch__btn[data-path], .kayit-path[data-path]");
  var panelSpor = document.getElementById("panelSpor");
  var panelSecme = document.getElementById("panelSecme");
  var contextEl = document.getElementById("kayitContext");

  var contextCopy = {
    spor: "4 yaş ve üzeri altyapı eğitimi — Cumartesi & Pazar antrenmanları.",
    secme: "Resmi liglere katılım için seçme başvurusu — yetenek taraması dahil.",
  };

  function setPath(path, pushHash) {
    var isSpor = path !== "secme" && path !== "yaris";
    pathButtons.forEach(function (btn) {
      var target = btn.getAttribute("data-path");
      var active = isSpor ? target === "spor" : target === "secme" || target === "yaris";
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });

    if (panelSpor) {
      panelSpor.classList.toggle("is-active", isSpor);
      panelSpor.hidden = !isSpor;
    }
    if (panelSecme) {
      panelSecme.classList.toggle("is-active", !isSpor);
      panelSecme.hidden = isSpor;
    }

    if (contextEl) {
      contextEl.textContent = isSpor ? contextCopy.spor : contextCopy.secme;
    }

    if (pushHash) {
      var hash = isSpor ? "spor-okulu" : "secme";
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

  function isBirthDateOk(value) {
    if (!value) return false;
    var birth = new Date(value + "T00:00:00");
    if (Number.isNaN(birth.getTime())) return false;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    if (birth > today) return false;
    var ageYears = (today - birth) / (365.25 * 24 * 60 * 60 * 1000);
    return ageYears >= 3 && ageYears <= 25;
  }

  function setupBirthDateLimits(form) {
    form.querySelectorAll("[data-birth]").forEach(function (birthInput) {
      var today = new Date();
      var max = new Date(today.getFullYear() - 3, today.getMonth(), today.getDate());
      var min = new Date(today.getFullYear() - 25, today.getMonth(), today.getDate());
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
      if (birth && !isBirthDateOk(birth.value)) {
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
})();

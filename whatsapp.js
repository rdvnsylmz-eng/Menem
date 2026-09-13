document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".whatsapp-fab")) return;

  const phone = "905321641555";
  const text = encodeURIComponent(
    "Merhaba, Menemen GSK ön kayıt / antrenman programı hakkında bilgi almak istiyorum."
  );

  const link = document.createElement("a");
  link.className = "whatsapp-fab";
  link.href = "https://wa.me/" + phone + "?text=" + text;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", "WhatsApp ile yazın");
  link.innerHTML = '<i class="ri-whatsapp-fill" aria-hidden="true"></i>';
  document.body.appendChild(link);
});

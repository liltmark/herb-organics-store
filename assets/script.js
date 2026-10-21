/* Herb & Organics Co. — herborganic.store
   Vanilla JS: mobile nav + WhatsApp order form (COD via WhatsApp)
   + PWA service worker registration and Install App prompt. No trackers. */
(function () {
  "use strict";

  var WA_NUMBER = "923437124768";

  /* Base path: pages live at root or one level down in /products/ */
  var BASE = window.location.pathname.indexOf("/products/") !== -1 ? "../" : "";

  /* ---------- PWA: register service worker ---------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register(BASE + "sw.js", { scope: BASE || "./" })
        .catch(function () { /* offline support simply unavailable — site still works */ });
    });
  }

  /* ---------- PWA: Install App button ---------- */
  var deferredPrompt = null;
  var installBtn = document.createElement("button");
  installBtn.type = "button";
  installBtn.className = "btn btn-gold btn-sm";
  installBtn.textContent = "📲 Install App";
  installBtn.style.display = "none";
  installBtn.setAttribute("aria-label", "Install the Herb and Organics Co. app");

  function placeInstallButton() {
    var footerBottom = document.querySelector(".footer-bottom");
    if (footerBottom && !footerBottom.contains(installBtn)) {
      footerBottom.appendChild(installBtn);
    }
  }

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferredPrompt = e;
    placeInstallButton();
    installBtn.style.display = "";
  });

  installBtn.addEventListener("click", function () {
    if (!deferredPrompt) { return; }
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(function () {
      deferredPrompt = null;
      installBtn.style.display = "none";
    });
  });

  window.addEventListener("appinstalled", function () {
    deferredPrompt = null;
    installBtn.style.display = "none";
  });

  /* Mobile navigation toggle */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* Order form -> WhatsApp message (Cash on Delivery) */
  var form = document.getElementById("order-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.elements["name"].value.trim();
      var mobile = form.elements["mobile"].value.trim();
      var city = form.elements["city"].value.trim();
      var address = form.elements["address"].value.trim();
      var product = form.elements["product"].value;
      var qty = form.elements["quantity"].value;

      var lines = [
        "Assalam-o-Alaikum! I want to place an order (Cash on Delivery).",
        "",
        "Product: " + product,
        "Quantity: " + qty,
        "",
        "Name: " + name,
        "Mobile: " + mobile,
        "City: " + city,
        "Complete Address: " + address
      ];

      var url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
      window.open(url, "_blank", "noopener");
    });
  }
})();

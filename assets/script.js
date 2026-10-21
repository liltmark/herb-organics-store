/* Herb & Organics Co. — herborganic.store
   Vanilla JS: mobile nav + on-site order form (FormSubmit AJAX, Cash on Delivery)
   + PWA service worker registration and Install App prompt. No trackers. */
(function () {
  "use strict";

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

  /* ---------- Order form -> FormSubmit AJAX (Cash on Delivery) ----------
     Orders are placed directly on this website; each order is emailed to the
     store via FormSubmit. WhatsApp is for questions ONLY — never for ordering. */
  var ORDER_ENDPOINT = "https://formsubmit.co/ajax/liltgag6@gmail.com";
  var ORDER_SUBJECT = "New Order — Herb & Organics Store";
  var CONTACT_NUMBER = "+92 343 7124768";
  var SHAMPOO_PRICE = 999;
  var BELDI_PRICE = 500;

  function escHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var form = document.getElementById("order-form");
  if (form) {
    var productSel = form.elements["product"];
    var qtyInput = form.elements["quantity"];
    var totalEl = document.getElementById("order-total");
    var statusEl = document.getElementById("order-status");
    var submitBtn = form.querySelector('button[type="submit"]');

    function currentQty() {
      var q = parseInt(qtyInput && qtyInput.value, 10);
      if (isNaN(q) || q < 1) { q = 1; }
      if (q > 10) { q = 10; }
      return q;
    }

    /* Live total: shampoo Rs. 999, Beldi Rs. 500, both together Rs. 1,499 — each x qty. */
    function updateTotal() {
      if (!totalEl || !productSel) { return; }
      var v = productSel.value;
      var qty = currentQty();
      var unit = 0;
      if (v.indexOf("Shampoo") !== -1) { unit += SHAMPOO_PRICE; }
      if (v.indexOf("Beldi") !== -1) { unit += BELDI_PRICE; }
      totalEl.textContent = "Order total: Rs. " + (unit * qty).toLocaleString("en-US") + " (Cash on Delivery)";
    }
    if (productSel) { productSel.addEventListener("change", updateTotal); }
    if (qtyInput) {
      qtyInput.addEventListener("input", updateTotal);
      qtyInput.addEventListener("change", updateTotal);
    }
    updateTotal();

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.elements["name"].value.trim();
      var mobileRaw = form.elements["mobile"].value.trim();
      var city = form.elements["city"].value.trim();
      var address = form.elements["address"].value.trim();
      var product = productSel ? productSel.value : "";
      var qty = currentQty();
      var notesEl = form.elements["notes"];
      var notes = notesEl ? notesEl.value.trim() : "";
      var honeyEl = form.elements["_honey"];
      var honey = honeyEl ? honeyEl.value : "";

      function fail(msg) {
        if (statusEl) { statusEl.textContent = msg; }
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Place Order — Cash on Delivery";
        }
      }

      if (!name || !mobileRaw || !city || !address || !product) {
        fail("Please fill in all required fields — name, mobile number, city, complete address and product.");
        return;
      }
      var digits = mobileRaw.replace(/[\s\-()]/g, "");
      if (!/^(\+92|92|0)3\d{9}$/.test(digits)) {
        fail("Please enter a valid Pakistani mobile number, e.g. 03xx xxxxxxx.");
        if (form.elements["mobile"].focus) { form.elements["mobile"].focus(); }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Placing your order…";
      }
      if (statusEl) { statusEl.textContent = "Submitting your order…"; }

      var payload = {
        "Name": name,
        "Mobile": mobileRaw,
        "City": city,
        "Complete Address": address,
        "Product": product,
        "Quantity": String(qty),
        "Notes": notes || "—",
        "_subject": ORDER_SUBJECT,
        "_template": "table",
        "_captcha": "false",
        "_honey": honey
      };

      fetch(ORDER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var ok = data && (data.success === true || data.success === "true");
        if (!ok) {
          fail("Sorry, your order could not be submitted" +
            (data && data.message ? " (" + data.message + ")" : "") +
            ". Please try again, or contact us at " + CONTACT_NUMBER + ".");
          return;
        }
        form.innerHTML =
          '<div class="order-thanks">' +
          "<h3>✅ Shukriya, " + escHtml(name.split(" ")[0]) + "! Your order has been received.</h3>" +
          "<p><strong>Product:</strong> " + escHtml(product) +
          "<br><strong>Quantity:</strong> " + qty +
          "<br><strong>City:</strong> " + escHtml(city) + "</p>" +
          "<p>Our team will call you on <strong>" + escHtml(mobileRaw) + "</strong> shortly to confirm your order. " +
          "Payment is <strong>Cash on Delivery</strong> — you pay only when your parcel arrives at your door.</p>" +
          '<p class="small">Koi sawal ho to WhatsApp par pooch sakte hain (sirf sawalon ke liye): ' + CONTACT_NUMBER + "</p>" +
          "</div>";
      })
      .catch(function () {
        fail("Sorry, your order could not be submitted — please check your internet connection and try again, or contact us at " + CONTACT_NUMBER + ".");
      });
    });
  }
})();

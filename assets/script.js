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

  /* ---------- Order form -> Google Sheet Panel (Apps Script, Cash on Delivery) ----------
     Orders are placed directly on this website; each order lands in the store's
     Google Sheet (Orders tab) and a notification email goes to info@herborganic.store.
     Live prices are fetched from the same panel; the prices baked in below are the
     fallback if the panel cannot be reached. FormSubmit retired 2026-10-22.
     WhatsApp is for questions ONLY — never for ordering. */
  var APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw_LWxw9jUCBUjsZc2s1oPYfTcB7t9IFccqUES1uNijiHZXmWUu6DyqurfNAWCvPcqelQ/exec";
  var ORDER_SECRET = "CHANGE_ME_hob_secret_2026";
  var CONTACT_NUMBER = "+92 343 7124768";
  var SHAMPOO_PRICE = 999;
  var BELDI_PRICE = 500;
  var BELDI_BIG_PRICE = 700;
  var OIL_PRICE = 700;
  var OIL_BIG_PRICE = 1000;

  /* Beldi size: Large Packet = BELDI_BIG_PRICE, anything else Beldi = Small Packet price. */
  function beldiUnitFor(v) {
    return v.indexOf("Large Packet") !== -1 ? BELDI_BIG_PRICE : BELDI_PRICE;
  }

  /* Nabat Hair Oil size: Big Bottle = OIL_BIG_PRICE, anything else Hair Oil = Small Bottle price. */
  function oilUnitFor(v) {
    return v.indexOf("Big Bottle") !== -1 ? OIL_BIG_PRICE : OIL_PRICE;
  }

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

    /* Live total: shampoo Rs. 999, Beldi Small Rs. 500 / Large Rs. 700, oil Small Rs. 700 / Big Rs. 1,000 — each x qty. */
    function updateTotal() {
      if (!totalEl || !productSel) { return; }
      var v = productSel.value;
      var qty = currentQty();
      var unit = 0;
      if (v.indexOf("Shampoo") !== -1) { unit += SHAMPOO_PRICE; }
      if (v.indexOf("Beldi") !== -1) { unit += beldiUnitFor(v); }
      if (v.indexOf("Hair Oil") !== -1) { unit += oilUnitFor(v); }
      totalEl.textContent = "Order total: Rs. " + (unit * qty).toLocaleString("en-US") + " (Cash on Delivery)";
    }
    if (productSel) { productSel.addEventListener("change", updateTotal); }
    if (qtyInput) {
      qtyInput.addEventListener("input", updateTotal);
      qtyInput.addEventListener("change", updateTotal);
    }

    /* ---------- Live prices from the Sheet Panel (graceful fallback) ---------- */
    function fmtRs(n) { return "Rs. " + Number(n).toLocaleString("en-US"); }

    function applyLivePrices(list) {
      if (!list || !list.length) { return; }
      var byId = {};
      list.forEach(function (p) { byId[p.id] = p; });

      if (byId.shampoo && byId.shampoo.price > 0) { SHAMPOO_PRICE = byId.shampoo.price; }
      if (byId.beldi && byId.beldi.price > 0) { BELDI_PRICE = byId.beldi.price; }
      if (byId.beldi_big && byId.beldi_big.price > 0) { BELDI_BIG_PRICE = byId.beldi_big.price; }
      if (byId.oil && byId.oil.price > 0) { OIL_PRICE = byId.oil.price; }
      if (byId.oil_big && byId.oil_big.price > 0) { OIL_BIG_PRICE = byId.oil_big.price; }

      document.querySelectorAll("[data-price-for]").forEach(function (el) {
        if (el.getAttribute("data-price-for") === "oil-variants") {
          var amtO = el.querySelector(".price-amount");
          if (amtO) { amtO.textContent = fmtRs(OIL_PRICE) + " \u2013 " + fmtRs(OIL_BIG_PRICE); }
          return;
        }
        if (el.getAttribute("data-price-for") === "beldi-variants") {
          var amt = el.querySelector(".price-amount");
          if (amt) { amt.textContent = fmtRs(BELDI_PRICE) + " \u2013 " + fmtRs(BELDI_BIG_PRICE); }
          return;
        }
        var p = byId[el.getAttribute("data-price-for")];
        if (p && p.price > 0) {
          var amount = el.querySelector(".price-amount");
          if (amount) { amount.textContent = fmtRs(p.price); }
        }
      });

      if (productSel) {
        Array.prototype.forEach.call(productSel.options, function (opt) {
          var v = opt.value;
          var unit = 0;
          if (v.indexOf("Shampoo") !== -1 && byId.shampoo) { unit += byId.shampoo.price; }
          if (v.indexOf("Beldi") !== -1 && byId.beldi) { unit += beldiUnitFor(v); }
          if (v.indexOf("Hair Oil") !== -1) { unit += oilUnitFor(v); }
          if (unit > 0) {
            opt.textContent = v.replace(/\s*[—-]\s*Rs\.?\s*[\d,]+.*$/, "") + " — " + fmtRs(unit);
          }
        });

        Array.prototype.slice.call(productSel.options).forEach(function (opt) {
          var v = opt.value.toLowerCase();
          var p = null;
          if (v.indexOf("shampoo") !== -1) { p = byId.shampoo; }
          if (v.indexOf("beldi") !== -1) { p = byId.beldi; }
          if (v.indexOf("hair oil") !== -1) { p = null; }  /* oil options are NEVER removed by the live feed — the sheet oil row is inactive/price 0 until the panel owner activates it, while the site sells oil at the baked prices above. */
          if (p && !p.active) { opt.remove(); }
        });
      }

      updateTotal();
    }

    function fetchLivePrices() {
      if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.indexOf("http") !== 0) { return; }
      var ctrl = ("AbortController" in window) ? new AbortController() : null;
      var timer = ctrl ? setTimeout(function () { ctrl.abort(); }, 4000) : null;
      fetch(APPS_SCRIPT_URL + "?action=products", ctrl ? { signal: ctrl.signal } : {})
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (timer) { clearTimeout(timer); }
          if (data && data.ok && data.products) { applyLivePrices(data.products); }
        })
        .catch(function () { if (timer) { clearTimeout(timer); } /* fallback: baked-in prices */ });
    }
    fetchLivePrices();

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

      var unit = 0;
      if (product.indexOf("Shampoo") !== -1) { unit += SHAMPOO_PRICE; }
      if (product.indexOf("Beldi") !== -1) { unit += beldiUnitFor(product); }
      if (product.indexOf("Hair Oil") !== -1) { unit += oilUnitFor(product); }

      var payload = {
        "secret": ORDER_SECRET,
        "name": name,
        "mobile": mobileRaw,
        "city": city,
        "address": address,
        "product": product,
        "quantity": qty,
        "unitPrice": unit,
        "total": unit * qty,
        "notes": notes,
        "timestamp": new Date().toISOString()
      };

      fetch(APPS_SCRIPT_URL, {
        method: "POST",
        /* text/plain on purpose — no CORS preflight, Apps Script doPost runs directly. */
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var ok = data && data.ok === true;
        if (!ok) {
          fail("Sorry, your order could not be submitted" +
            (data && data.error ? " (" + data.error + ")" : "") +
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

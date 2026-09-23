// ============================================================
// PT YnW Multi Teknik Plastindo - Main Interactive Script
// ============================================================

const COMPANY_CONFIG = {
  name: "PT YnW Multi Teknik Plastindo",
  whatsappWisnu: "6282376917339",
  whatsappWisnuDisplay: "+62 823-7691-7339",
  whatsappYayat: "628117960063",
  whatsappYayatDisplay: "+62 811-7960-063",
  whatsapp: "6281179760063",
  whatsappDisplay: "+62 811-7976-0063",
  email: "yw.multiteknikplastindo@gmail.com",
  address: "Bandar Lampung, Lampung, Indonesia"
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = mobileMenu.classList.toggle("open");
      hamburgerBtn.textContent = isOpen ? "✕" : "☰";
      hamburgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Auto-close menu when a navigation link is clicked
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        hamburgerBtn.textContent = "☰";
        hamburgerBtn.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        if (mobileMenu.classList.contains("open")) {
          mobileMenu.classList.remove("open");
          hamburgerBtn.textContent = "☰";
          hamburgerBtn.setAttribute("aria-expanded", "false");
        }
      }
    });
  }

  // 2. Pre-fill Category in Quote Form from URL Parameter (?kategori=...)
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get("kategori");
  const categorySelect = document.getElementById("quoteCategory");

  if (categoryParam && categorySelect) {
    const slugMap = {
      "plastik": "Plastik Umum & Industri",
      "spare-part": "Spare Part Alat Berat",
      "hydraulic-hose": "Hydraulic Hose & Hose Industri",
      "bearing": "Bearing",
      "v-belt": "V-Belt & Transmisi Mesin"
    };

    const targetVal = slugMap[categoryParam.toLowerCase()] || categoryParam;
    for (let i = 0; i < categorySelect.options.length; i++) {
      if (categorySelect.options[i].value.toLowerCase().includes(categoryParam.toLowerCase()) ||
          categorySelect.options[i].text.toLowerCase().includes(categoryParam.toLowerCase())) {
        categorySelect.selectedIndex = i;
        break;
      }
    }
  }

  // 3. Quote Form Submission Handler -> WhatsApp Click-to-Chat
  const quoteForm = document.getElementById("quoteForm");
  if (quoteForm) {
    quoteForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("quoteName")?.value.trim();
      const company = document.getElementById("quoteCompany")?.value.trim();
      const userPhone = document.getElementById("quotePhone")?.value.trim();
      const email = document.getElementById("quoteEmail")?.value.trim();
      const category = document.getElementById("quoteCategory")?.value;
      const productName = document.getElementById("quoteProduct")?.value.trim();
      const spec = document.getElementById("quoteSpec")?.value.trim();
      const qty = document.getElementById("quoteQty")?.value.trim();
      const unit = document.getElementById("quoteUnit")?.value;
      const city = document.getElementById("quoteCity")?.value.trim();
      const notes = document.getElementById("quoteNotes")?.value.trim();

      // Basic Validation
      if (!name) {
        alert("Mohon masukkan nama lengkap Anda.");
        document.getElementById("quoteName")?.focus();
        return;
      }
      if (!userPhone) {
        alert("Mohon masukkan nomor WhatsApp Anda.");
        document.getElementById("quotePhone")?.focus();
        return;
      }
      if (!category) {
        alert("Silakan pilih kategori produk.");
        document.getElementById("quoteCategory")?.focus();
        return;
      }
      if (!productName) {
        alert("Mohon masukkan nama produk atau part number.");
        document.getElementById("quoteProduct")?.focus();
        return;
      }
      if (!qty) {
        alert("Mohon masukkan jumlah kebutuhan.");
        document.getElementById("quoteQty")?.focus();
        return;
      }
      if (!city) {
        alert("Mohon masukkan kota tujuan pengiriman.");
        document.getElementById("quoteCity")?.focus();
        return;
      }

      const targetSelect = document.getElementById("quoteTarget");
      let targetNumber = COMPANY_CONFIG.whatsappWisnu;
      let recipientName = "Pak Wisnu (" + COMPANY_CONFIG.name + ")";

      if (targetSelect) {
        if (targetSelect.value === "yayat") {
          targetNumber = COMPANY_CONFIG.whatsappYayat;
          recipientName = "Pak Yayat Saputra (" + COMPANY_CONFIG.name + ")";
        } else if (targetSelect.value === "admin") {
          targetNumber = COMPANY_CONFIG.whatsapp;
          recipientName = COMPANY_CONFIG.name;
        }
      }

      // Format WhatsApp Message
      const lines = [
        `*PERMINTAAN PENAWARAN PRODUK*`,
        `Halo ${recipientName}, saya ingin meminta informasi dan penawaran harga:`,
        ``,
        `*── DATA PEMESAN ──*`,
        `• *Nama:* ${name}`,
        company ? `• *Perusahaan / Usaha:* ${company}` : null,
        `• *WhatsApp:* ${userPhone}`,
        email ? `• *Email:* ${email}` : null,
        ``,
        `*── DETAIL KEBUTUHAN PRODUK ──*`,
        `• *Kategori:* ${category}`,
        `• *Nama Produk / Part Number:* ${productName}`,
        spec ? `• *Spesifikasi / Dimensi:* ${spec}` : null,
        `• *Jumlah Kebutuhan:* ${qty} ${unit || "Pcs"}`,
        `• *Kota Tujuan Pengiriman:* ${city}`,
        notes ? `• *Catatan Tambahan:* ${notes}` : null,
        ``,
        `Mohon informasi ketersediaan, estimasi penawaran harga, dan waktu pengiriman. Terima kasih.`
      ].filter(Boolean);

      const message = lines.join("\n");
      const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;

      // Inform user before opening
      alert("Format pesan penawaran telah disiapkan! Anda akan dialihkan ke WhatsApp. Silakan tekan tombol kirim di WhatsApp untuk menyelesaikan.");
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
  }

  // 4. Update Copyright Year Automatically
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

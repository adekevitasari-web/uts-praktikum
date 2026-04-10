// ============================================================
//   Validasi JavaScript pada Form
//   Manipulasi DOM — Daftar Item
// ============================================================

/* ──────────────────────────────────────────
    Data awal tersimpan dalam array of object
   ────────────────────────────────────────── */
let daftarItem = [
  { id: 1, nama: "Pantai Kuta, Bali" },
  { id: 2, nama: "Raja Ampat, Papua Barat" },
  { id: 3, nama: "Danau Toba, Sumatera Utara" },
  { id: 4, nama: "Gunung Bromo, Jawa Timur" },
];
 
let nextId = 5;
 
// Render ulang daftar dari array ke DOM
function renderDaftar() {
  const list = document.getElementById("listItem");
  list.innerHTML = "";
 
  if (daftarItem.length === 0) {
    list.innerHTML = '<li style="justify-content:center; color:#6b7280; border-left:none; background:transparent;">Belum ada item. Tambahkan destinasi!</li>';
    return;
  }
 
  daftarItem.forEach((item) => {
    const li = document.createElement("li");
    li.id = "item-" + item.id;
    li.innerHTML = `
      <span>✈ ${item.nama}</span>
      <button class="btn-hapus" onclick="hapusItem(${item.id})">Hapus</button>
    `;
    list.appendChild(li);
  });
}
 
// Tambah item baru (tanpa reload halaman)
function tambahItem() {
  const input = document.getElementById("inputItem");
  const nilai = input.value.trim();
 
  if (!nilai) {
    input.style.borderColor = "#ef4444";
    input.placeholder = "Nama destinasi tidak boleh kosong!";
    setTimeout(() => {
      input.style.borderColor = "";
      input.placeholder = "Tambah destinasi baru...";
    }, 2000);
    return;
  }
 
  daftarItem.push({ id: nextId++, nama: nilai });
  input.value = "";
  input.style.borderColor = "#22c55e";
  setTimeout(() => { input.style.borderColor = ""; }, 1000);
 
  renderDaftar();
}
 
// Hapus item dari array (tanpa reload halaman)
function hapusItem(id) {
  daftarItem = daftarItem.filter((item) => item.id !== id);
  renderDaftar();
}
 
// Tambah item saat tekan Enter
document.getElementById("inputItem").addEventListener("keypress", function (e) {
  if (e.key === "Enter") tambahItem();
});
 
// Render item awal saat halaman dimuat
renderDaftar();
 
 
/* ──────────────────────────────────────────
   SOAL 4: Validasi JavaScript Form
   ────────────────────────────────────────── */
 
// Helper: tampilkan pesan error
function showError(id, pesan) {
  document.getElementById(id).textContent = pesan;
}
function clearError(id) {
  document.getElementById(id).textContent = "";
}
 
// Helper: tandai input valid/invalid
function setStatus(input, isValid) {
  input.classList.remove("valid", "invalid");
  input.classList.add(isValid ? "valid" : "invalid");
}
 
// Validasi email dengan regex
function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
 
// ---- VALIDASI REAL-TIME (saat blur / keluar field) ----
 
// Nama
document.getElementById("nama").addEventListener("blur", function () {
  if (!this.value.trim()) {
    showError("err-nama", "⚠ Nama lengkap wajib diisi.");
    setStatus(this, false);
  } else {
    clearError("err-nama");
    setStatus(this, true);
  }
});
 
// Email
document.getElementById("email").addEventListener("blur", function () {
  if (!this.value.trim()) {
    showError("err-email", "⚠ Alamat email wajib diisi.");
    setStatus(this, false);
  } else if (!isEmailValid(this.value)) {
    showError("err-email", "⚠ Format email tidak valid. Contoh: nama@email.com");
    setStatus(this, false);
  } else {
    clearError("err-email");
    setStatus(this, true);
  }
});
 
// Password
document.getElementById("password").addEventListener("blur", function () {
  if (!this.value.trim()) {
    showError("err-password", "⚠ Password wajib diisi.");
    setStatus(this, false);
  } else if (this.value.length < 6) {
    showError("err-password", "⚠ Password minimal 6 karakter.");
    setStatus(this, false);
  } else {
    clearError("err-password");
    setStatus(this, true);
  }
});
 
// Telepon / Angka (harga/nomor)
document.getElementById("telepon").addEventListener("blur", function () {
  const val = this.value.trim();
  if (!val) {
    showError("err-telepon", "⚠ No. telepon / harga wajib diisi.");
    setStatus(this, false);
  } else if (isNaN(val) || Number(val) <= 0) {
    showError("err-telepon", "⚠ Harus berupa angka positif.");
    setStatus(this, false);
  } else {
    clearError("err-telepon");
    setStatus(this, true);
  }
});
 
// Paket
document.getElementById("paket").addEventListener("change", function () {
  if (!this.value) {
    showError("err-paket", "⚠ Silakan pilih paket wisata.");
  } else {
    clearError("err-paket");
  }
});
 
// ---- SUBMIT: Validasi lengkap sebelum kirim ----
document.getElementById("formPesan").addEventListener("submit", function (e) {
  e.preventDefault();
 
  let valid = true;
 
  // 1. Nama
  const nama = document.getElementById("nama");
  if (!nama.value.trim()) {
    showError("err-nama", "⚠ Nama lengkap wajib diisi.");
    setStatus(nama, false);
    valid = false;
  } else {
    clearError("err-nama");
    setStatus(nama, true);
  }

  // 2. Email
  const email = document.getElementById("email");
  if (!email.value.trim()) {
    showError("err-email", "⚠ Alamat email wajib diisi.");
    setStatus(email, false);
    valid = false;
  } else if (!isEmailValid(email.value)) {
    showError("err-email", "⚠ Format email tidak valid.");
    setStatus(email, false);
    valid = false;
  } else {
    clearError("err-email");
    setStatus(email, true);
  }

  // 3. Password
  const password = document.getElementById("password");
  if (!password.value.trim()) {
    showError("err-password", "⚠ Password wajib diisi.");
    setStatus(password, false);
    valid = false;
  } else if (password.value.length < 6) {
    showError("err-password", "⚠ Password minimal 6 karakter.");
    setStatus(password, false);
    valid = false;
  } else {
    clearError("err-password");
    setStatus(password, true);
  }

  // 4. Telepon / Angka
  const telepon = document.getElementById("telepon");
  const telVal = telepon.value.trim();
  if (!telVal) {
    showError("err-telepon", "⚠ No. telepon / harga wajib diisi.");
    setStatus(telepon, false);
    valid = false;
  } else if (isNaN(telVal) || Number(telVal) <= 0) {
    showError("err-telepon", "⚠ Harus berupa angka positif.");
    setStatus(telepon, false);
    valid = false;
  } else {
    clearError("err-telepon");
    setStatus(telepon, true);
  }

  // 5. Paket
  const paket = document.getElementById("paket");
  if (!paket.value) {
    showError("err-paket", "⚠ Silakan pilih paket wisata.");
    valid = false;
  } else {
    clearError("err-paket");
  }

  // 6. Jenis wisatawan (radio)
  const jenis = document.querySelector('input[name="jenis"]:checked');
  if (!jenis) {
    showError("err-jenis", "⚠ Silakan pilih jenis wisatawan.");
    valid = false;
  } else {
    clearError("err-jenis");
  }

  // Jika semua valid → tampilkan pesan sukses
  if (valid) {
    const successEl = document.getElementById("form-success");
    successEl.style.display = "block";
    successEl.scrollIntoView({ behavior: "smooth", block: "center" });

    // Reset form setelah 3 detik
    setTimeout(() => {
      document.getElementById("formPesan").reset();
      successEl.style.display = "none";
      // Hapus kelas valid/invalid dari semua input
      document.querySelectorAll("input, select").forEach((el) => {
        el.classList.remove("valid", "invalid");
      });
    }, 3000);
  }
});

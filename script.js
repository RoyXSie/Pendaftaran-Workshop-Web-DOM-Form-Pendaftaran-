const form = document.querySelector('#formDaftar');
const nama = document.querySelector('#nama');
const email = document.querySelector('#email');
const wa = document.querySelector('#wa');
const tanggal = document.querySelector('#tanggal');
const daftar = document.querySelector('#daftar');
const pesanKosong = document.querySelector('#pesanKosong');

function tampilkanError(input, teks) {
  input.classList.add('is-invalid');
  document.getElementById(input.id + '-error').textContent = teks;
}

function hapusError(input) {
  input.classList.remove('is-invalid');
  document.getElementById(input.id + '-error').textContent = '';
}

function cekNama() {
  const isi = nama.value.trim();
  if (isi === '') {
    tampilkanError(nama, 'Nama wajib diisi.');
    return false;
  }
  if (isi.length < 3) {
    tampilkanError(nama, 'Nama minimal 3 huruf.');
    return false;
  }
  hapusError(nama);
  return true;
}

function cekEmail() {
  const isi = email.value.trim();
  if (isi === '') {
    tampilkanError(email, 'Email wajib diisi.');
    return false;
  }
  if (!isi.includes('@') || !isi.includes('.')) {
    tampilkanError(email, 'Format email belum benar.');
    return false;
  }
  hapusError(email);
  return true;
}

function cekWa() {
  const isi = wa.value.trim();
  if (isi === '') {
    tampilkanError(wa, 'Nomor WhatsApp wajib diisi.');
    return false;
  }
  if (!isi.startsWith('08')) {
    tampilkanError(wa, 'Nomor WhatsApp harus diawali 08.');
    return false;
  }
  if (!/^\d+$/.test(isi)) {
    tampilkanError(wa, 'Nomor WhatsApp hanya boleh berisi angka.');
    return false;
  }
  if (isi.length < 10 || isi.length > 13) {
    tampilkanError(wa, 'Nomor WhatsApp harus 10-13 digit.');
    return false;
  }
  hapusError(wa);
  return true;
}

function cekTanggal() {
  const isi = tanggal.value.trim();
  if (isi === '') {
    tampilkanError(tanggal, 'Tanggal kehadiran wajib diisi.');
    return false;
  }
  hapusError(tanggal);
  return true;
}

nama.addEventListener('blur', cekNama);
email.addEventListener('blur', cekEmail);
wa.addEventListener('blur', cekWa);
tanggal.addEventListener('blur', cekTanggal);

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const namaBenar = cekNama();
  const emailBenar = cekEmail();
  const waBenar = cekWa();
  const tanggalBenar = cekTanggal();

  if (!namaBenar || !emailBenar || !waBenar || !tanggalBenar) {
    form.querySelector('.is-invalid').focus();
    return;
  }

  const isiNama = nama.value.trim();
  const isiEmail = email.value.trim();
  const isiWa = wa.value.trim();
  const isiTanggal = tanggal.value.trim();

  if (pesanKosong) {
    pesanKosong.classList.add('d-none');
  }
  daftar.classList.remove('d-none');

  const item = document.createElement('li');
  item.className = 'list-group-item';
  item.textContent = `${isiNama} (${isiEmail}) - ${isiWa} - Kehadiran: ${isiTanggal}`;

  daftar.append(item);
  form.reset();
});
function isiFormOtomatis() {
  const params = new URLSearchParams(window.location.search);
  const produk = params.get("produk");
  const harga = params.get("harga");

  if (produk) document.getElementById("produk").value = produk;
  if (harga) document.getElementById("harga").value = harga;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formTransaksi");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const dataTransaksi = {
        produk: document.getElementById("produk").value,
        harga: Number(document.getElementById("harga").value),
        nama: document.getElementById("nama").value,
        alamat: document.getElementById("alamat").value,
        jumlah: Number(document.getElementById("jumlah").value),
        total: Number(document.getElementById("harga").value) * Number(document.getElementById("jumlah").value)
      };

      localStorage.setItem("struk", JSON.stringify(dataTransaksi));
      window.location.href = "invoice.html";
    });
  }
});
function tampilkanInvoice() {
  const data = JSON.parse(localStorage.getItem("struk"));

  if (!data) {
    document.getElementById("hasilInvoice").innerHTML = "<p>Tidak ada transaksi ditemukan.</p>";
    return;
  }

  const html = `
    <table class="invoice-table">
      <tr><td><strong>Nama Pembeli</strong></td><td>${data.nama}</td></tr>
      <tr><td><strong>Alamat</strong></td><td>${data.alamat}</td></tr>
      <tr><td><strong>Produk</strong></td><td>${data.produk}</td></tr>
      <tr><td><strong>Harga Satuan</strong></td><td>Rp${data.harga.toLocaleString()}</td></tr>
      <tr><td><strong>Jumlah</strong></td><td>${data.jumlah}</td></tr>
      <tr><td><strong>Total</strong></td><td><strong>Rp${data.total.toLocaleString()}</strong></td></tr>
    </table>
  `;

  document.getElementById("hasilInvoice").innerHTML = html;
}


import { useEffect, useMemo, useState } from "react";
import "./App.css";
import RingkasanSaldo from "./RingkasanSaldo";
import FormTransaksi from "./FormTransaksi";
import ItemTransaksi from "./ItemTransaksi";

const KUNCI_STORAGE = "catatan-keuangan";

function App() {
  const [daftarTransaksi, setDaftarTransaksi] = useState(() => {
    try {
      const dataTersimpan = localStorage.getItem(KUNCI_STORAGE);
      const hasil = dataTersimpan ? JSON.parse(dataTersimpan) : [];
      return Array.isArray(hasil) ? hasil : [];
    } catch {
      return [];
    }
  });

  const [pencarian, setPencarian] = useState("");
  const [filterJenis, setFilterJenis] = useState("semua");

  useEffect(() => {
    try {
      localStorage.setItem(
        KUNCI_STORAGE,
        JSON.stringify(daftarTransaksi)
      );
    } catch (error) {
      console.error("Data transaksi gagal disimpan:", error);
    }
  }, [daftarTransaksi]);

  const tambahTransaksi = (dataBaru) => {
    const transaksiBaru = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now(),
      tanggal: new Date().toISOString(),
      ...dataBaru,
    };

    setDaftarTransaksi((sebelumnya) => [
      transaksiBaru,
      ...sebelumnya,
    ]);
  };

  const hapusTransaksi = (id) => {
    setDaftarTransaksi((sebelumnya) =>
      sebelumnya.filter((transaksi) => transaksi.id !== id)
    );
  };

  const totalMasuk = daftarTransaksi
    .filter((transaksi) => transaksi.jenis === "pemasukan")
    .reduce(
      (jumlah, transaksi) =>
        jumlah + Number(transaksi.nominal || 0),
      0
    );

  const totalKeluar = daftarTransaksi
    .filter((transaksi) => transaksi.jenis === "pengeluaran")
    .reduce(
      (jumlah, transaksi) =>
        jumlah + Number(transaksi.nominal || 0),
      0
    );

  const saldo = totalMasuk - totalKeluar;

  const transaksiTampil = useMemo(() => {
    const kataKunci = pencarian.trim().toLowerCase();

    return daftarTransaksi.filter((transaksi) => {
      const cocokNama = (transaksi.keterangan || "")
        .toLowerCase()
        .includes(kataKunci);

      const cocokJenis =
        filterJenis === "semua" ||
        transaksi.jenis === filterJenis;

      return cocokNama && cocokJenis;
    });
  }, [daftarTransaksi, pencarian, filterJenis]);

  const tanggalHariIni = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#beranda" aria-label="Bank Mini beranda">
          <span className="brand-mark">B</span>
          <span className="brand-copy">
            <strong>bank<span>mini.</span></strong>
            <small>PERSONAL FINANCE</small>
          </span>
        </a>

        <div className="sidebar-label">MENU UTAMA</div>

        <nav className="side-nav" aria-label="Navigasi utama">
          <a className="nav-link active" href="#beranda">
            <span className="nav-icon">▦</span>Dashboard
          </a>
          <a className="nav-link" href="#transaksi">
            <span className="nav-icon">↕</span>Transaksi
          </a>
          <a className="nav-link" href="#tambah-transaksi">
            <span className="nav-icon">＋</span>Tambah transaksi
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="secure-card">
            <span className="secure-icon">✓</span>
            <strong>Data tersimpan aman</strong>
            <p>Catatan keuangan tersimpan di perangkat ini.</p>
          </div>

          <div className="profile-mini">
            <div className="avatar">U</div>
            <div>
              <strong>Pengguna</strong>
              <small>Akun pribadi</small>
            </div>
            <span className="profile-dots">•••</span>
          </div>
        </div>
      </aside>

      <main className="main-content" id="beranda">
        <header className="topbar">
          <div>
            <p className="eyebrow">OVERVIEW</p>
            <h1>Dashboard</h1>
          </div>

          <div className="topbar-right">
            <span className="date-chip">
              ▦ <span>{tanggalHariIni}</span>
            </span>
            <div className="top-avatar">U</div>
          </div>
        </header>

        <section className="welcome-row">
          <div>
            <h2>Selamat datang kembali! <span>✦</span></h2>
            <p>	Pantau dan kelola keuanganmu dengan lebih mudah.</p>
          </div>

          <a className="quick-add" href="#tambah-transaksi">
            <span>＋</span> Transaksi baru
          </a>
        </section>

        <section className="overview-grid" aria-label="Ringkasan keuangan">
          <RingkasanSaldo
            saldo={saldo}
            totalMasuk={totalMasuk}
            totalKeluar={totalKeluar}
          />

          <article className="metric-card income-card">
            <div className="metric-top">
              <span className="metric-icon income-icon">↙</span>
              <span className="metric-caption">TOTAL PEMASUKAN</span>
            </div>
            <strong>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(totalMasuk)}
            </strong>
            <p>Akumulasi seluruh pemasukan</p>
          </article>

          <article className="metric-card expense-card">
            <div className="metric-top">
              <span className="metric-icon expense-icon">↗</span>
              <span className="metric-caption">TOTAL PENGELUARAN</span>
            </div>
            <strong>
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0,
              }).format(totalKeluar)}
            </strong>
            <p>Akumulasi seluruh pengeluaran</p>
          </article>
        </section>

        <section className="content-grid">
          <section className="panel form-panel" id="tambah-transaksi">
            <div className="panel-heading">
              <div>
                <span className="section-kicker">CATAT KEUANGAN</span>
                <h2>Tambah transaksi</h2>
                <p>Masukkan detail transaksi baru kamu.</p>
              </div>
              <span className="heading-icon">＋</span>
            </div>

            <FormTransaksi onTambah={tambahTransaksi} />
          </section>

          <section className="panel transactions-panel" id="transaksi">
            <div className="panel-heading transaction-heading">
              <div>
                <span className="section-kicker">AKTIVITAS TERBARU</span>
                <h2>Riwayat transaksi</h2>
                <p>Daftar pemasukan dan pengeluaranmu.</p>
              </div>
              <span className="count-badge">
                {daftarTransaksi.length} data
              </span>
            </div>

            <div className="transaction-tools">
              <label className="search-box">
                <span>⌕</span>
                <input
                  aria-label="Cari transaksi"
                  type="search"
                  placeholder="Cari transaksi..."
                  value={pencarian}
                  onChange={(event) => setPencarian(event.target.value)}
                />
              </label>

              <select
                className="filter-select"
                aria-label="Filter jenis transaksi"
                value={filterJenis}
                onChange={(event) => setFilterJenis(event.target.value)}
              >
                <option value="semua">Semua</option>
                <option value="pemasukan">Pemasukan</option>
                <option value="pengeluaran">Pengeluaran</option>
              </select>
            </div>

            {transaksiTampil.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">▤</div>
                <strong>
                  {daftarTransaksi.length === 0
                    ? "Belum ada transaksi"
                    : "Transaksi tidak ditemukan"}
                </strong>
                <p>
                  {daftarTransaksi.length === 0
                    ? "Transaksi pertamamu akan muncul di sini."
                    : "Coba ubah kata kunci atau filter pencarian."}
                </p>
              </div>
            ) : (
              <ul className="daftar">
                {transaksiTampil.map((transaksi) => (
                  <ItemTransaksi
                    key={transaksi.id}
                    transaksi={transaksi}
                    onHapus={hapusTransaksi}
                  />
                ))}
              </ul>
            )}
          </section>
        </section>

        <footer className="app-footer">
          <span>© {new Date().getFullYear()} Bank Mini</span>
          <span>Kelola keuangan, mulai dari hal sederhana.</span>
        </footer>
      </main>
    </div>
  );
}

export default App;

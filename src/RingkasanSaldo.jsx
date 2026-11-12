
import { formatRupiah } from "./formatRupiah";

function RingkasanSaldo({ saldo, totalMasuk, totalKeluar }) {
  return (
    <article className="balance-card">
      <div className="balance-card-top">
        <span className="balance-label">TOTAL SALDO</span>
        <span className="balance-chip">✦</span>
      </div>

      <p className="balance-description">Saldo yang tersedia</p>

      <h2 className="saldo-nilai">{formatRupiah(saldo)}</h2>

      <div className="balance-divider" />

      <div className="balance-bottom">
        <div>
          <span>↙</span>
          <small>Masuk</small>
          <strong>{formatRupiah(totalMasuk)}</strong>
        </div>

        <div>
          <span>↗</span>
          <small>Keluar</small>
          <strong>{formatRupiah(totalKeluar)}</strong>
        </div>
      </div>

      <div className="balance-decoration" />
    </article>
  );
}

export default RingkasanSaldo;

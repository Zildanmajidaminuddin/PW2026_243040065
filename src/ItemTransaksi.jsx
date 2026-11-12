
import { formatRupiah } from "./formatRupiah";

function ItemTransaksi({ transaksi, onHapus }) {
  const adalahPemasukan = transaksi.jenis === "pemasukan";

  const tanggal = transaksi.tanggal
    ? new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(transaksi.tanggal))
    : "Transaksi tersimpan";

  return (
    <li className="item">
      <span
        className={`transaction-icon ${
          adalahPemasukan ? "income-icon" : "expense-icon"
        }`}
      >
        {adalahPemasukan ? "↙" : "↗"}
      </span>

      <div className="item-info">
        <strong>{transaksi.keterangan}</strong>
        <small>
          {tanggal} <span className="meta-dot">•</span>{" "}
          {adalahPemasukan ? "Pemasukan" : "Pengeluaran"}
        </small>
      </div>

      <div className="transaction-amount">
        <strong className={`item-nominal ${transaksi.jenis}`}>
          {adalahPemasukan ? "+" : "−"}{" "}
          {formatRupiah(transaksi.nominal)}
        </strong>

        <button
          className="tombol-hapus"
          type="button"
          onClick={() => onHapus(transaksi.id)}
          aria-label={`Hapus transaksi ${transaksi.keterangan}`}
          title="Hapus transaksi"
        >
          Hapus
        </button>
      </div>
    </li>
  );
}

export default ItemTransaksi;

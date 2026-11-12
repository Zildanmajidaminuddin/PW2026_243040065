
import { useState } from "react";

function FormTransaksi({ onTambah }) {
  const [keterangan, setKeterangan] = useState("");
  const [nominal, setNominal] = useState("");
  const [jenis, setJenis] = useState("pemasukan");

  const keteranganTerlaluPanjang = keterangan.length > 40;
  const nominalTidakValid =
    nominal !== "" &&
    (!Number.isFinite(Number(nominal)) || Number(nominal) <= 0);

  const tidakValid =
    keterangan.trim() === "" ||
    keteranganTerlaluPanjang ||
    nominal === "" ||
    nominalTidakValid;

  const tanganiKirim = (event) => {
    event.preventDefault();

    if (tidakValid) return;

    onTambah({
      keterangan: keterangan.trim(),
      nominal: Number(nominal),
      jenis,
    });

    setKeterangan("");
    setNominal("");
    setJenis("pemasukan");
  };

  return (
    <form onSubmit={tanganiKirim} className="transaction-form">
      <div className="form-grup">
        <label htmlFor="keterangan">Nama transaksi</label>
        <input
          id="keterangan"
          className="input"
          type="text"
          placeholder="Contoh: Uang saku, makan siang"
          value={keterangan}
          maxLength={41}
          onChange={(event) => setKeterangan(event.target.value)}
          aria-describedby="keterangan-help"
        />
        <div className="field-footnote" id="keterangan-help">
          <span>
            {keteranganTerlaluPanjang
              ? <em className="galat">Maksimal 40 karakter.</em>
              : "Berikan nama yang mudah diingat."}
          </span>
          <span>{keterangan.length}/40</span>
        </div>
      </div>

      <div className="form-grup">
        <label htmlFor="nominal">Nominal transaksi</label>
        <div className="currency-input">
          <span>Rp</span>
          <input
            id="nominal"
            className="input"
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            placeholder="0"
            value={nominal}
            onChange={(event) => setNominal(event.target.value)}
          />
        </div>
        {nominalTidakValid && (
          <p className="galat">
            Nominal harus berupa angka lebih dari 0.
          </p>
        )}
      </div>

      <div className="form-grup">
        <label>Jenis transaksi</label>
        <div className="type-selector">
          <button
            type="button"
            className={`type-option ${jenis === "pemasukan" ? "selected income-selected" : ""}`}
            onClick={() => setJenis("pemasukan")}
            aria-pressed={jenis === "pemasukan"}
          >
            <span>↙</span>
            <span>
              <strong>Pemasukan</strong>
              <small>Uang masuk</small>
            </span>
          </button>

          <button
            type="button"
            className={`type-option ${jenis === "pengeluaran" ? "selected expense-selected" : ""}`}
            onClick={() => setJenis("pengeluaran")}
            aria-pressed={jenis === "pengeluaran"}
          >
            <span>↗</span>
            <span>
              <strong>Pengeluaran</strong>
              <small>Uang keluar</small>
            </span>
          </button>
        </div>
      </div>

      <button className="tombol" type="submit" disabled={tidakValid}>
        <span>＋</span> Simpan transaksi
      </button>

      <p className="form-note">
        <span>ⓘ</span> Transaksi akan tersimpan otomatis di perangkatmu.
      </p>
    </form>
  );
}

export default FormTransaksi;

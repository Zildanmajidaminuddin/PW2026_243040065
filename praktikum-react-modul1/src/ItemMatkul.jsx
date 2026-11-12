
import React from 'react';

function ItemMatkul({ kode, nama, sks, hari }) {
  return (
    <div className="matkul-item">
      <div>
        <span className="matkul-kode">{kode}</span>
        <span> - {nama}</span>

        <div className="matkul-hari">
          Jadwal Sesi: {hari}
        </div>
      </div>

      <span className="matkul-sks">
        {sks} SKS
      </span>
    </div>
  );
}

export default ItemMatkul;


// src/KartuProfil.jsx

import React from 'react';

function KartuProfil({ nama, npm, kelas, status, fotoUrl }) {
  return (
    <div className="profile-card">

      {/* Foto dan Identitas Mahasiswa */}
      <div className="profile-content">

        <img
          src={fotoUrl || '/foto-profil.png'}
          alt={`Foto ${nama}`}
          className="profile-image"
        />

        <div className="profile-info">
          <h3>{nama}</h3>

          <p>
            NPM: <strong>{npm}</strong>
          </p>

          <p>
            Kelas: {kelas}
          </p>
        </div>

      </div>

      {/* Status Akademik */}
      <div className="profile-status">
        <span className={`status-badge ${status === 'Aktif' ? 'active' : 'inactive'}`}>
          Status Akademik: {status}
        </span>
      </div>

    </div>
  );
}

export default KartuProfil;

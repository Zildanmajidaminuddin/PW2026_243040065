
// src/App.jsx

import React from 'react';
import KartuProfil from './KartuProfil';
import BadgeSkill from './BadgeSkill';
import ItemMatkul from './ItemMatkul';
import './App.css';

function App() {

  // 1. Data daftar mata kuliah praktikum semester ini
  const daftarPraktikum = [
    {
      id: 101,
      kode: 'IF21W0508',
      nama: 'Praktikum Pemograman II',
      sks: 2,
      hari: 'Senin'
    },
    {
      id: 102,
      kode: 'IF21W0506',
      nama: 'Praktikum Web',
      sks: 2,
      hari: 'Jumat'
    },
    {
      id: 103,
      kode: 'IF21W0507',
      nama: 'Praktikum Sistem Beorientasi Objek',
      sks: 2,
      hari: 'Jumat'
    },
    {
      id: 104,
      kode: 'IF21P1506',
      nama: 'Sistem Operasi Lanjut',
      sks: 3,
      hari: 'Rabu'
    }
  ];

  // 2. Data keahlian mahasiswa
  const daftarSkill = [
    { id: 1, namaSkill: 'Microsoft Excel', level: 'Mahir' },
    { id: 2, namaSkill: 'React JS', level: 'Pemula' },
    { id: 3, namaSkill: 'SQL', level: 'Menengah' },
    { id: 4, namaSkill: 'Python', level: 'Menengah' },
    { id: 5, namaSkill: 'Tableau', level: 'Pemula' }
  ];

  // 3. Data proyek portofolio sesuai daftar praktikum
  const daftarProyek = [
    {
      id: 1,
      judul: 'Aplikasi Pemrograman II',
      deskripsi:
        'Pengembangan aplikasi melalui penerapan logika pemrograman, penyusunan algoritma, dan penyelesaian permasalahan menggunakan konsep pemrograman.',
      teknologi: ['Pemrograman', 'Algoritma', 'Coding'],
      github: 'https://github.com/'
    },
    {
      id: 2,
      judul: 'Website Praktikum',
      deskripsi:
        'Pembuatan website interaktif menggunakan React JS dengan penerapan komponen, props, dan pengelolaan tampilan antarmuka.',
      teknologi: ['React JS', 'JavaScript', 'CSS'],
      github: 'https://github.com/'
    },
    {
      id: 3,
      judul: 'Aplikasi Berorientasi Objek',
      deskripsi:
        'Pengembangan aplikasi dengan menerapkan konsep pemrograman berorientasi objek untuk menyusun program yang terstruktur dan modular.',
      teknologi: ['OOP', 'Class', 'Object'],
      github: 'https://github.com/'
    },
    {
      id: 4,
      judul: 'Implementasi Sistem Operasi Lanjut',
      deskripsi:
        'Pembelajaran dan penerapan konsep sistem operasi lanjut melalui kegiatan praktikum dan pengelolaan sumber daya sistem komputer.',
      teknologi: ['Operating System', 'System Management', 'Praktikum'],
      github: 'https://github.com/'
    }
  ];

  // 4. Fungsi penanganan interaksi event tombol
  const notifikasiSapaan = () => {
    alert(
      'Selamat datang di Modul 1! Anda berhasil menguasai fondasi arsitektur React JS.'
    );
  };

  return (
    <div className="container">

      {/* Header */}
      <header className="header">
        <h1>Praktikum Pemrograman Web</h1>
        <p>
          Laboratorium Praktikum - Modul 1: Pengenalan React JS & Vite
        </p>
        <p>Teknik Informatika</p>
      </header>

      {/* 5. Profil Mahasiswa */}
      <section className="section">
        <h2>Profil Mahasiswa Praktikum</h2>

        <KartuProfil
          nama="Zildan Majid Aminuddin"
          npm="243040065"
          kelas="B"
          status="Aktif"
          fotoUrl="/foto-profil.jpg"
        />
      </section>

      {/* 6. Daftar Keahlian */}
      <section className="section">
        <h2>Daftar Keahlian Mahasiswa</h2>

        <div className="skill-list">
          {daftarSkill.map((skill) => (
            <BadgeSkill
              key={skill.id}
              namaSkill={skill.namaSkill}
              level={skill.level}
            />
          ))}
        </div>
      </section>

      {/* 7. Daftar Mata Kuliah */}
      <section className="section">
        <h2>Daftar Rencana Praktikum Semester</h2>

        <div className="matkul-list">
          {daftarPraktikum.map((matkul) => (
            <ItemMatkul
              key={matkul.id}
              {...matkul}
            />
          ))}
        </div>
      </section>

      {/* 8. Showcase Portofolio Mini */}
      <section className="section">
        <h2>Showcase Portofolio Mini</h2>

        <div className="project-grid">
          {daftarProyek.map((proyek) => (
            <div className="project-card" key={proyek.id}>

              <h3>{proyek.judul}</h3>

              <p>{proyek.deskripsi}</p>

              <div className="technology-list">
                {proyek.teknologi.map((tech) => (
                  <span
                    key={tech}
                    className="technology-tag"
                  >
                    #{tech.replaceAll(' ', '')}
                  </span>
                ))}
              </div>

              <a
                href={proyek.github}
                target="_blank"
                rel="noopener noreferrer"
                className="github-button"
              >
                Lihat Repositori GitHub
              </a>

            </div>
          ))}
        </div>
      </section>

      {/* 9. Tombol Interaktivitas Modul */}
      <div className="interaction">
        <button onClick={notifikasiSapaan}>
          Uji Interaktivitas Event (Klik Disini)
        </button>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 - Showcase Portofolio Mini</p>
        <p>Dibuat menggunakan React JS dan Vite</p>
      </footer>

    </div>
  );
}

export default App;

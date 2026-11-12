
import React from 'react';

function BadgeSkill({ namaSkill, level }) {
  const warnaLevel = {
    Pemula: {
      backgroundColor: '#DBEAFE',
      color: '#1D4ED8'
    },
    Menengah: {
      backgroundColor: '#FEF3C7',
      color: '#B45309'
    },
    Mahir: {
      backgroundColor: '#DCFCE7',
      color: '#15803D'
    }
  };

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '8px 14px',
        borderRadius: '20px',
        fontSize: '13px',
        fontWeight: 'bold',
        margin: '5px',
        ...(warnaLevel[level] || {})
      }}
    >
      {namaSkill} - {level}
    </span>
  );
}

export default BadgeSkill;

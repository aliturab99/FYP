"use client"; // Marks this as a client component

import React, { useState } from 'react';
import { getMedicalAdvice } from '@/app/actions'; // Import your server action

const AdviceButton = () => {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const medicalAdvice = await getMedicalAdvice();
      setAdvice(medicalAdvice);
    } catch (err) {
      console.error("Client-side error calling server action:", err);
      setError("Failed to fetch advice.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Getting Advice...' : 'Click me to get an advice'}
      </button>
      {advice && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <h3 className='text-white'>Medical Advice:</h3>
          <p className='text-white'>{advice}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AdviceButton;
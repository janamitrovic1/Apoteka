'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    lek1: '',
    lek2: '',
    lek3: '',
    izvor: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const queryParams = new URLSearchParams({
      lek1: formData.lek1,
      lek2: formData.lek2,
      lek3: formData.lek3,
      izvor: formData.izvor,
    });

    router.push(`/results?${queryParams.toString()}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div style={{
      
      backgroundColor: '#f0f0f0',  // Svetla pozadina
      color: '#333',                // Tamna boja slova
      maxWidth: '600px',
      margin: 'auto',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' // Mala senka za elegantan izgled
    }}>
      <h1 style={{ textAlign: 'center' }}>Apoteka</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="lek1">Koji lek naručujete?</label>
          <input
            type="text"
            id="lek1"
            name="lek1"
            value={formData.lek1}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="lek2">Koji lek naručujete?</label>
          <input
            type="text"
            id="lek2"
            name="lek2"
            value={formData.lek2}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="lek3">Koji lek naručujete?</label>
          <input
            type="text"
            id="lek3"
            name="lek3"
            value={formData.lek3}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <p>Culi ste za nas od:</p>
          <label>
            <input
              type="radio"
              name="izvor"
              value="prijatelj"
              onChange={handleChange}
              required
            />{' '}
            Prijatelj
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="izvor"
              value="reklama"
              onChange={handleChange}
              required
            />{' '}
            Reklama
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="izvor"
              value="lekar"
              onChange={handleChange}
              required
            />{' '}
            Lekar
          </label>
        </div>

        <button type="submit" style={{ padding: '10px 20px' }}>Pošalji</button>
      </form>
    </div>
  );
}

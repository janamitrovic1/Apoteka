'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [medicines, setMedicines] = useState<{name: string}[]>([]);
  const [formData, setFormData] = useState({
    lek1: 0,
    lek2: 0,
    lek3: 0,
    izvor: 0,
  });

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    const result = await fetch("http://localhost:3000/api/bill", {
      method: "POST",
      body: JSON.stringify({
        med_count1: parseInt(formData.lek1.toString()),
        med_count2: parseInt(formData.lek2.toString()),
        med_count3: parseInt(formData.lek3.toString()),
        heard_from: formData.izvor
      })
    })
    const data = await result.json();
    console.log(data);
    // const queryParams = new URLSearchParams({
    //   lek1: formData.lek1,
    //   lek2: formData.lek2,
    //   lek3: formData.lek3,
    //   izvor: formData.izvor,
    // });

    // router.push(`/results?${queryParams.toString()}`);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const run = async() => {
      const result = await fetch("http://localhost:3000/api/medicine");
      const { data } = await result.json();
      setMedicines(data);
    }
    run();
  }, [])

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
          <label htmlFor="lek1">Koliko Vam je potrebno {medicines[0]?.name}-a?</label>
          <input
            type="number"
            id="lek1"
            name="lek1"
            value={formData.lek1}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="lek2">Koliko Vam je potrebno {medicines[1]?.name}-a?</label>
          <input
            type="number"
            id="lek2"
            name="lek2"
            value={formData.lek2}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
            required
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="lek3">Koliko Vam je potrebno {medicines[2]?.name}-a?</label>
          <input
            type="number"
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

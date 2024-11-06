'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [medicines, setMedicines] = useState<{name: string}[]>([]);
  const [bills, setBills] = useState<{bill_id: string, heard_from: string}[]>([])
  const [formData, setFormData] = useState({
    lek1: 0,
    lek2: 0,
    lek3: 0,
    izvor: 0,
  });

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetch("http://localhost:3000/api/bill", {
      method: "POST",
      body: JSON.stringify({
        med_count1: parseInt(formData.lek1.toString()),
        med_count2: parseInt(formData.lek2.toString()),
        med_count3: parseInt(formData.lek3.toString()),
        heard_from: formData.izvor
      })
    })

    getBills();

    setFormData({
      lek1: 0,
      lek2: 0,
      lek3: 0,
      izvor: 0,
    });

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

  const getBills = async() => {
    const result = await fetch("http://localhost:3000/api/bill");
    const { data } = await result.json();
    setBills(data);
    console.log(data, "dataa");
  }

  useEffect(() => {
    const run = async() => {
      const result = await fetch("http://localhost:3000/api/medicine");
      const { data } = await result.json();
      setMedicines(data);
    }
    run();
    getBills();
  }, [])

  useEffect(() => {
    console.log(bills)
  }, [bills])

  return (
    <>
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
        { medicines.length >= 1 && 
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
        </div>}

        { medicines.length >= 2 && 
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
        </div>}

        {medicines.length >= 3 && 
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
        </div>}

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

    {bills?.length > 0 &&
    <div>
      {bills.map(bill => (
        <div>
          <Link href={"/" + bill.bill_id} key={bill.bill_id}>{bill.bill_id} - Heard From: {bill.heard_from}</Link>
        </div>
      ))}
    </div>}
    </>
  );
}
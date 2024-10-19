'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

export default function Home() {

  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Kreiraj query string sa parametrima
    const queryString = new URLSearchParams({
      input1,
      input2,
      input3,
    }).toString();

    // Preusmeri korisnika na results stranicu sa query stringom
    router.push(`/results?${queryString}`);
  };

  return (
    <div>

      <Head>
        <title>Apoteka</title>
      </Head>
      <h1>Unesi tekst u tri forme</h1>

      <form onSubmit={handleSubmit}>
        {/* Forma 1 */}
        <div>
          <label>Forma 1: </label>
          <input
            type="text"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
          />
        </div>

        {/* Forma 2 */}
        <div>
          <label>Forma 2: </label>
          <input
            type="text"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
        </div>

        {/* Forma 3 */}
        <div>
          <label>Forma 3: </label>
          <input
            type="text"
            value={input3}
            onChange={(e) => setInput3(e.target.value)}
          />
        </div>

        <button type="submit">Prikaži rezultate</button>
      </form>
    </div>
  );
}

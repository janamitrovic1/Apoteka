// app/results/page.tsx
'use client'; // Potrebno za hooks

import { useSearchParams } from 'next/navigation';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const input1 = searchParams.get('input1');
  const input2 = searchParams.get('input2');
  const input3 = searchParams.get('input3');

  return (
    <div>
      <h1>Rezultati unosa:</h1>
      <p>Unos iz forme 1: {input1}</p>
      <p>Unos iz forme 2: {input2}</p>
      <p>Unos iz forme 3: {input3}</p>
    </div>
  );
}

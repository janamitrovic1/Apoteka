'use client'; // Potrebno za hooks

import { useSearchParams } from 'next/navigation';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const lek1 = searchParams.get('lek1');
  const lek2 = searchParams.get('lek2');
  const lek3 = searchParams.get('lek3');
  const izvor = searchParams.get('izvor');

  const styles = {
    container: {
      maxWidth: '600px',
      margin: 'auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color:'black',
    },
    header: {
      textAlign: 'center' as 'center',
      fontSize: '24px',
      marginBottom: '20px',
      color:'black',
    },
    result: {
      marginBottom: '10px',
      padding: '10px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Rezultati unosa:</h1>
      <div style={styles.result}>Lek 1: {lek1}</div>
      <div style={styles.result}>Lek 2: {lek2}</div>
      <div style={styles.result}>Lek 3: {lek3}</div>
      <div style={styles.result}>Culi ste za nas od: {izvor}</div>
    </div>
  );
}

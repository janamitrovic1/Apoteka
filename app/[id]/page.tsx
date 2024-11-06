'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { revalidatePath, revalidateTag } from "next/cache";

interface Bill {
    bill_id: string, 
    heard_from: string, 
    med_count1: number, 
    med_count2: number, 
    med_count3: number
}

export default function BillEdit({ params } : any) {
    const router = useRouter();
    const [medicines, setMedicines] = useState<{name: string}[]>([]);
    const [bill, setBill] = useState<Bill | null>(null);
    

    useEffect(() => {
        const run1 = async() => {
            const result = await fetch("http://localhost:3000/api/bill/" + params?.id)
            const { data } = await result.json();
            if(!data)
                router.push("./404");
            setBill(data);
        }
        const run2 = async() => {
            const result = await fetch("http://localhost:3000/api/medicine");
            const { data } = await result.json();

            setMedicines(data);
        }
        run1()
        run2();
    }, [])

    useEffect(() => console.log(medicines), [medicines]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;

        // For radio buttons, handle checked state
        const newValue = type === 'radio' ? (checked ? value : bill?.heard_from) : value;
    
        // If it's one of the med_count fields, convert to number
        if (name.startsWith('med_count')) {
            // Convert value to a number
            setBill((prevBill) => {
                if (prevBill) {
                    return { ...prevBill, [name]: Number(value) }; // Convert to number here
                }
                return prevBill;
            });
        } else {
            // For other fields (like heard_from), update directly
            setBill((prevBill) => {
                if (prevBill) {
                    return { ...prevBill, [name]: newValue };
                }
                return prevBill;
            });
        }

    };

    const handleDelete = async() => {
        try {
            const result = await fetch(`http://localhost:3000/api/bill/${bill?.bill_id}`, {
                method: "DELETE",
                body: JSON.stringify(bill)
            });

            const data = await result.json();

            if(!data.ok)
                throw Error(data?.err);

            // revalidatePath("/");
            // revalidateTag("/");
            
            router.push("../");
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();

            const result = await fetch(`http://localhost:3000/api/bill/${bill?.bill_id}`, {
                method: "PATCH",
                body: JSON.stringify(bill)
            })

            const data = await result.json();

            if(!data.ok)
                throw Error(data?.err);
            
            router.push("../");
        } catch (error) {
            console.log(error);
        }
    }

    if(medicines.length == 0 || bill == null)
        return <div>Loading...</div>

    return (
        <>
            <form onSubmit={handleSubmit}>
        { medicines.length >= 1 && 
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="lek1">Koliko Vam je potrebno {medicines[0]?.name}-a?</label>
          <input
            type="number"
            id="lek1"
            name="med_count1"
            value={bill?.med_count1}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', color: "black" }}
            required
          />
        </div>}

        { medicines.length >= 2 && 
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="lek2">Koliko Vam je potrebno {medicines[1]?.name}-a?</label>
          <input
            type="number"
            id="lek2"
            name="med_count2"
            value={bill?.med_count2}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', color: "black" }}
            required
          />
        </div>}

        {medicines.length >= 3 && 
        <div style={{ marginBottom: '10px' }}>
            <label htmlFor="lek3">Koliko Vam je potrebno {medicines[2]?.name}-a?</label>
            <input
              type="number"
              id="lek3"
              name="med_count3"
              value={bill?.med_count3}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px', color: "black" }}
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
              checked={bill?.heard_from == "prijatelj"}
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
              checked = {bill?.heard_from == "reklama"}
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
              checked = {bill?.heard_from == "lekar"}
            />{' '}
            Lekar
          </label>
        </div>

        <button type="submit" style={{ padding: '10px 20px' }}>Pošalji</button>
        <button type="button" style={{ padding: '10px 20px' }} onClick={handleDelete}>Obrisi</button>
      </form>
        </>
    )
}
'use client'

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

interface Bill {
    bill_id: string, 
    heard_from: string, 
    med_count1: number, 
    med_count2: number, 
    med_count3: number
}

export default function BillEdit({ params } : any) {
    const router = useRouter();
    const [bill, setBill] = useState<Bill | null>(null)

    useEffect(() => {
        const run = async() => {
            const result = await fetch("http://localhost:3000/api/bill/" + params?.id)
            const { data } = await result.json();
            if(!data)
                router.push("./404");
            setBill(data);
        }
        run();
    }, [])

    useEffect(() => console.log(bill), [bill]);

    return (
        <>
            <p>{bill?.bill_id}</p>
        </>
    )
}
import { prisma } from "@/prisma/seed";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const result = await prisma.bills.create({ data });

        return Response.json({ data: result, ok: true });
    } catch (error) {
        console.log(error);
        return Response.json({ok: false, err: error})
    }
}

export async function GET(req: Request) {
    try {
        const bills = await prisma.bills.findMany();
        console.log(bills)
        return Response.json({ data: bills, ok: true  })
    } catch (error) {
        return Response.json({ok: false, err: error})
    }
}

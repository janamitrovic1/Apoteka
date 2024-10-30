import { prisma } from "@/prisma/seed";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        
        const result = await prisma.bills.create({ data: data});
        console.log(result);

        return Response.json({ data: result, ok: true });
    } catch (error) {
        return Response.json({ok: false, err: error})
    }
}

export async function GET(req: Request) {
    try {
        const bills = await prisma.bills.findMany();

        return Response.json({ bills, ok: true  })
    } catch (error) {
        return Response.json({ok: false, err: error})
    }
}

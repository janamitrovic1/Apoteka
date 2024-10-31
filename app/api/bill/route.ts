import { prisma } from "@/prisma/seed";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        console.log(data);
        const result = await prisma.bills.create({ data });
        console.log(result);
        console.log(result);

        return Response.json({ data: result, ok: true });
    } catch (error) {
        console.log(error);
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

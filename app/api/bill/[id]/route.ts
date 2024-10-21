import { prisma } from "@/prisma/seed";

export async function GET(req: Request, { params }: { params: { id: string } }){
    try {
        const { id: bill_id } = params;
        const result = await prisma.bills.findUnique({ where: {
            bill_id
        }})
        return Response.json({ data: result });
    } catch (error) {
        return Response.json({ok: false, err: error})
    }
}
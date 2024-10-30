import { prisma } from "@/prisma/seed";

export async function GET(req: Request, { params }: { params: { id: string } }){
    try {
        const { id: bill_id } = params;
        const result = await prisma.bills.findUnique({ where: {
            bill_id
        }})
        return Response.json({ data: result, ok: true });
    } catch (error) {
        return Response.json({ok: false, err: error})
    }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id: bill_id } = params;
        const result = await prisma.bills.delete({ where: {
            bill_id
        }});
        return Response.json({data: result, ok: true });
    } catch (error) {
        return Response.json({ok: false, err: error})
    }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id: bill_id } = params;

        const data = await req.json();

        const result = await prisma.bills.update({ where: {
            bill_id
        }, data });

        return Response.json({data: result, ok: true });
    } catch (error) {
        return Response.json({ok: false, err: error})
    }
}
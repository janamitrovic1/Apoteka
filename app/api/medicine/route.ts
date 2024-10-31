import { prisma } from "@/prisma/seed";

export async function GET(req: Request) {
    try {
        const data = await prisma.medicines.findMany();

        return Response.json({ok: true, data });

    } catch (error) {
        return Response.json({ ok: false, err: error});
    }
}
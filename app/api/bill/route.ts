import { prisma } from "@/prisma/seed";

export async function POST(req: Request) {
    try {
        const data = await req.json();
        
        const result = await prisma.bills.create({ data: data});
        console.log(result);
        
        return Response.json({ message: "Successfully made bill!" });
    } catch (error) {
        return Response.json({ok: false, err: error})
    }
}
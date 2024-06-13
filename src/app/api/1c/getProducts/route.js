import { prismaClient } from "@/lib/prisma";

export async function POST(request) {

    const products = await prismaClient.product.findMany();

    return new Response(JSON.stringify(products), {
        status: 200,
    })
}


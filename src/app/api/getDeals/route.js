import { prismaClient } from "@/lib/prisma";

export async function GET() {

    const deals = await prismaClient.product.findMany({
        where: {
          discountPercentage: {
            gt: 4,
          },
        },
    });

    return new Response(JSON.stringify(deals), {
        status: 200,
    })
}

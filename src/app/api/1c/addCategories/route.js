import { prismaClient } from "@/lib/prisma";

export async function POST(request) {

    let key = process.env.SKEY;

    const req = await request.json();
    const data = req.data;

    if (req.key !== key) {
        return new Response(JSON.stringify("Access denied"), {
            status: 401,
        })
    }

    let allCategories = await prismaClient.category.findMany({})
    let categories = []

    for (let ctg in data) {
        const exist = await prismaClient.category.findFirst({
            where: {
                slug: data[ctg].slug
            }
        })
        if (exist) { // Checking if category exists
            if (exist.slug === data[ctg].slug) {
                const update = await prismaClient.category.update({
                    where: {
                        id: exist.id,
                        slug: data[ctg].slug
                    },
                    data: {
                        image_url: data[ctg].image_url
                    }
                })
                categories.push(update)
            }
        } else {
            const createCategory = await prismaClient.category.create({
                data: {
                    name: data[ctg].name,
                    slug: data[ctg].slug,
                    image_url: data[ctg].image_url
                }
            })
            categories.push(createCategory)
        }
        
    }

    // Remove categories not in 'categories'
    const categoriesToRemove = allCategories.filter(cat => !categories.some(c => c.id === cat.id));
    for (const cat of categoriesToRemove) {
        await prismaClient.category.delete({
            where: {
                id: cat.id
            }
        });
    }

    return new Response(JSON.stringify("ok"), {
        status: 200,
    })
}

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

    for (let product in data) {
        // Проверка на существование категории
        let category = await prismaClient.category.findFirst({
            where: {
                slug: data[product].category
            }
        })

        if (!category) {
            return new Response(JSON.stringify(`Category '${data[product].category}' not found`), {
                status: 404,
            });
        }

        // Проверка на существование продукта
        const existingProduct = await prismaClient.product.findFirst({
            where: {
                slug: data[product].slug
            }
        });

        if (existingProduct) {
            // Обновление продукта
            const updateProduct = await prismaClient.product.update({
                where: {
                    id: existingProduct.id,
                    slug: data[product].slug
                },
                data: {
                    name: data[product].name,
                    description: data[product].description,
                    basePrice: data[product].basePrice,
                    quantity: data[product].quantity,
                    category: {
                        connect: {
                            id: category.id
                        }
                    },
                    imageUrls: data[product].imageUrls,
                    discountPercentage: data[product].discountPercentage
                }
            });
        } else {
            // Создание нового продукта
            const createProduct = await prismaClient.product.create({
                data: {
                    name: data[product].name,
                    slug: data[product].slug,
                    description: data[product].description,
                    basePrice: data[product].basePrice,
                    quantity: data[product].quantity,
                    category: {
                        connect: {
                            id: category.id
                        }
                    },
                    imageUrls: data[product].imageUrls,
                    discountPercentage: data[product].discountPercentage
                }
            });
        }
    }

    return new Response(JSON.stringify("ok"), {
        status: 200,
    })
}

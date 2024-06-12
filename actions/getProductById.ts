import prisma from "@/libs/prismadb";

interface IParams {
  productId?: string;
}

export default async function getProductsById(params: IParams) {
  try {
    const { productId } = params;

    if (!productId) return null;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createDate: "desc",
          },
        },
      },
    });

    return product;
  } catch (error: any) {
    throw new Error(error);
  }
}

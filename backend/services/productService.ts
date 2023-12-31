import { prisma } from "../db/prisma";
import { NotFound } from "../utils/appErrors";

interface ProductType {
  id?: string;
  name: string;
  stock: number;
  price: number;
  image: string | null;
  desc: string;
  cloudId: string | null;
  categoryId: string;
}

export const createProduct = async (
  product: ProductType
): Promise<ProductType> => {
  return await prisma.product.create({
    data: product,
  });
};

export const fetchProduct = async (productId: string) => {
  return await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
};

export const fetchProductSearchResults = async (arg: string) => {
  return prisma.product.findMany({
    where: {
      name: arg,
    },
  });
};

export const fetchProductsWithPagination = async (
  category: any,
  skip: number,
  take: number
) => {
  let products;

  if (category) {
    products = await prisma.product.findMany({
      skip: skip,
      take: take,
      where: {
        category: {
          categoryName: category,
        },
      },
    });
  } else {
    products = await prisma.product.findMany({
      skip: skip,
      take: take,
    });
  }

  return products;
};

export const fetchProductForCart = async (productId: string) => {
  return await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      name: true,
      price: true,
      stock: true,
    },
  });
};

export const fetchProductForReview = async (productId: string) => {
  return await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      reviews: true,
    },
  });
};

// for order rouute // items
export const updateProductStockForOrder = async (item: any) => {
  const updatedProduct = await prisma.product.update({
    where: {
      id: item.productId,
    },
    data: {
      stock: {
        decrement: item.quantity,
      },
    },
  });

  return updatedProduct;

  // const updatedProducts = [];

  // for (let i = 0; i < items.length; i++) {
  //     let updatedProduct =  Product.update({
  //         where: {
  //             id: items[i].productId
  //         },
  //         data: {
  //             stock: {
  //                 decrement:items[i].quantity
  //             }
  //         }
  //     });

  //     updatedProducts.push(updatedProduct);
  // }

  // // return await Promise.all(updatedProducts);
  // const results =  await Promise.all(updatedProducts);
  // let validity;

  // for( let i = 0; i < results.length; i++) {
  //     if (results[i].stock < 0) {
  //         validity = false
  //     } else {
  //         validity = true
  //     }
  // }

  // return validity;
};

export const updateProductStock = async (productId: string, stock: any) => {
  const existingProduct = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!existingProduct) {
    throw new NotFound("Product not found");
  }
  return await prisma.product.update({
    where: {
      id: productId,
    },
    data: {
      stock: stock,
    },
  });
};

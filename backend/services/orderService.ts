import { prisma } from "../db/prisma";
import { BadRequest } from "../utils/appErrors";

export const createOrder = async (
  userId: string,
  address: string,
  total: number,
  items: any
): Promise<{
  id: string;
  userId: string;
  address: string;
  total: number;
  time: Date;
}> => {
  return prisma.$transaction(async (prisma) => {
    for (let i = 0; i < items.length; i++) {
      let updatedProduct = await prisma.product.update({
        where: {
          id: items[i].productId,
        },
        data: {
          stock: {
            decrement: items[i].quantity,
          },
        },
      });
      if (updatedProduct.stock < 0) throw new BadRequest("Stock Finished");
    }

    const order = await prisma.order.create({
      data: {
        userId: userId,
        address: address,
        total: total,
        orderDetail: {
          create: items,
        },
      },
    });

    return order;
  });
};

export const fetchOrderById = async (
  orderId: string
): Promise<
  | ({
      paymentDetail: {
        id: string;
        amount: number;
        currency: string;
        time: Date;
        userId: string;
        orderId: string;
      } | null;
    } & {
      id: string;
      userId: string;
      address: string;
      total: number;
      time: Date;
    })
  | null
> => {
  return prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      paymentDetail: true,
    },
  });
};

export const deleteOrderById = async (
  orderId: string
): Promise<{
  id: string;
  userId: string;
  address: string;
  total: number;
  time: Date;
}> => {
  return prisma.order.delete({
    where: {
      id: orderId,
    },
  });
};

export const fetchOrderByUsrId = async (
  userId: string
): Promise<
  {
    id: string;
    userId: string;
    address: string;
    total: number;
    time: Date;
  }[]
> => {
  return prisma.order.findMany({
    where: {
      userId: userId,
    },
  });
};

export const updateOrderWithPaymentAndTrack = async (
  userId: string,
  orderId: string,
  amount: number,
  currency: string,
  address: string
): Promise<{
  id: string;
  userId: string;
  address: string;
  total: number;
  time: Date;
}> => {
  return prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      paymentDetail: {
        create: {
          userId: userId,
          amount: amount,
          currency: currency,
        },
      },
      trackOrder: {
        create: {
          address: address,
        },
      },
    },
  });
};

export const fetchOrderForPayment = async (
  orderId: string
): Promise<{
  address: string;
  total: number;
  orderDetail: {
    productId: string;
    quantity: number;
  }[];
  paymentDetail: {
    id: string;
    amount: number;
    currency: string;
    time: Date;
    userId: string;
    orderId: string;
  } | null;
} | null> => {
  return await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    select: {
      address: true,
      total: true,
      orderDetail: {
        select: {
          productId: true,
          quantity: true,
        },
      },
      paymentDetail: true,
    },
  });
};

import { cacheClient } from "../cache/cacheDBInit";

export const createEmptyCart = () => {
  const newCart = {
    total: 0,
    items: [],
  };
  return newCart;
};

export const createCartItemToCart = async (
  userId: string,
  productId: string,
  price: number,
  currentCart: any
) => {
  let { total, items } = currentCart;

  const newItem = {
    productId: productId,
    price: price,
    subTotal: price,
    quantity: 1,
  };
  items.push(newItem);
  await cacheClient.set(
    userId,
    JSON.stringify({ total: total + price, items: items }),
    { EX: 2000 }
  );
};

export const incrementCartItemQuantity = async (
  userId: string,
  cart: any,
  ItemIndex: number
): Promise<void> => {
  let { total, items } = cart;
  const price = items[ItemIndex].price;
  items[ItemIndex].quantity = items[ItemIndex].quantity + 1;
  items[ItemIndex].subTotal = items[ItemIndex].subTotal + price;
  total = total + price;
  await cacheClient.set(
    userId,
    JSON.stringify({
      total: total,
      items: items,
    }),
    { EX: 2000 }
  );
};

export const decrementCartItemQuantity = async (
  userId: string,
  cart: any,
  ItemIndex: number
) => {
  let { total, items } = cart;
  const price = items[ItemIndex].price;

  if (items[ItemIndex].quantity - 1 === 0) {
    items.splice(ItemIndex, 1);
    total = total - price;
  } else {
    items[ItemIndex].quantity--;
    items[ItemIndex].subTotal = items[ItemIndex].subTotal - price;
    total = total - price;
  }

  await cacheClient.set(
    userId,
    JSON.stringify({
      total: total,
      items: items,
    }),
    { EX: 2000 }
  );
};

export const fetchCartAndItems = async (userId: string) => {
  if (userId !== null) {
    const cacheData = await cacheClient.get(userId);
    if (cacheData !== null) {
      const parsedData = JSON.parse(cacheData);
      return parsedData;
    }
  }
};

export const deleteCartItem = async (
  userId: string,
  cart: any,
  ItemIndex: number
): Promise<void> => {
  let { total, items } = cart;
  const productSubTotal = items[ItemIndex].subTotal;
  items.splice(ItemIndex, 1);
  total = total - productSubTotal;
  await cacheClient.set(
    userId,
    JSON.stringify({
      total: total,
      items: items,
    }),
    { EX: 2000 }
  );
};

export const deleteCart = async (userId: string): Promise<void> => {
  await cacheClient.del(userId);
};

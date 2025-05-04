import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ICartOption {
  id: string;
  optionId: string;
  productId: string;
  establishmentId: string;
  name: string;
  type: "size" | "extra";
  price: number;
  quantity: number;
  total: number;
}

export interface ICartOptions {
  cartOptions: ICartOption[];
}

interface ICartTotalProduct {
  establishmentId: string;
  productId: string;
  total: number;
}

interface ICartProduct {
  id: string;
  establishmentId: string;
  quantity: number;
  price: number;
  optionsTotalPrice: number;
  total: number;
}

interface IAddProducts {
  establishmentId: string;
  productId: string;
  quantity: number;
}

interface CartStoreProps {
  options: ICartOption[];
  addOptions: (options: ICartOption[]) => void;
  removeOptions: (
    establishmentId: string,
    productId: string,
    optionId: string,
  ) => void;
  optionsTotal: ICartTotalProduct[];
  products: ICartProduct[];
  addProducts: (product: IAddProducts) => void;
  total: number;
}

const sumProductOptions = (options: ICartOption[]) => {
  return Object.values(
    options.reduce((acc, { establishmentId, productId, total, type }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      if (!acc[productId]) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        acc[productId] = { establishmentId, productId, type, total: 0 };
      }
      if (type !== "size") {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        acc[productId].total += total;
      }
      return acc;
    }, {}) as ICartTotalProduct[],
  );
};

export const useCartStore = create(
  persist<CartStoreProps>(
    (set, get) => ({
      products: [],
      total: 0,
      optionsTotal: [],
      options: [],
      addOptions: (optionsReceived: ICartOption[]) => {
        const optionId = optionsReceived[0]?.optionId;
        const productId = optionsReceived[0]?.productId;
        const establishmentId = optionsReceived[0]?.establishmentId;
        let productPrice = 0;

        if (!optionId || !productId || !establishmentId) return;

        const currentCartOptions = get().options;

        const optionsWithoutReceivedOptions = currentCartOptions?.filter(
          (option) =>
            !(
              option.optionId === optionId &&
              option.productId === productId &&
              option.establishmentId === establishmentId
            ),
        );

        const newOptions = [
          ...optionsWithoutReceivedOptions,
          ...optionsReceived,
        ];

        set({ options: newOptions });

        const optionsTotal = sumProductOptions(newOptions);

        set({ optionsTotal });

        newOptions.map((option) => {
          if (option.type === "size") {
            return (productPrice = option.price);
          }
        });

        const productsInCart = get().products;

        const updatedProducts = productsInCart;

        optionsTotal.map((option) => {
          const productIndex = productsInCart.findIndex(
            (product) => product.id === option.productId,
          );

          if (productIndex < 0) {
            updatedProducts.push({
              id: option.productId,
              establishmentId: option.establishmentId,
              quantity: 0,
              price: productPrice,
              optionsTotalPrice: option.total,
              total: option.total,
            });
          }

          if (updatedProducts[productIndex]) {
            updatedProducts[productIndex].price = productPrice;
            updatedProducts[productIndex].optionsTotalPrice = option.total;
            updatedProducts[productIndex].total =
              updatedProducts[productIndex].quantity * productPrice +
              updatedProducts[productIndex].optionsTotalPrice;
          }
        });

        set({ products: updatedProducts });
      },
      removeOptions: (
        establishmentId: string,
        productId: string,
        optionId: string,
      ) => {
        const currentCartOptions = get().options;

        const filteredOptions = currentCartOptions?.filter(
          (option) =>
            !(
              option.optionId === optionId &&
              option.productId === productId &&
              option.establishmentId === establishmentId
            ),
        );

        set({
          options: filteredOptions,
        });

        const optionsTotal = sumProductOptions(filteredOptions);

        set({ optionsTotal });

        let productPrice = 0;

        filteredOptions.map((option) => {
          if (option.type === "size") {
            return (productPrice = option.price);
          }
        });

        const productsInCart = get().products;

        const updatedProducts = productsInCart;

        optionsTotal.map((option) => {
          const productIndex = productsInCart.findIndex(
            (product) => product.id === option.productId,
          );

          if (productIndex < 0) {
            updatedProducts.push({
              id: option.productId,
              establishmentId: option.establishmentId,
              quantity: 0,
              price: productPrice,
              optionsTotalPrice: option.total,
              total: option.total,
            });
          }

          if (updatedProducts[productIndex]) {
            updatedProducts[productIndex].price = productPrice;
            updatedProducts[productIndex].optionsTotalPrice = option.total;
            updatedProducts[productIndex].total =
              updatedProducts[productIndex].quantity * productPrice +
              updatedProducts[productIndex].optionsTotalPrice;
          }
        });

        set({ products: updatedProducts });
      },
      addProducts: ({ establishmentId, productId, quantity }: IAddProducts) => {
        const productsInCart = get().products;

        const updatedProducts = productsInCart;

        const productIndex = productsInCart.findIndex(
          (productInCart) =>
            productInCart.establishmentId === establishmentId &&
            productInCart.id === productId,
        );

        if (productIndex < 0) {
          return updatedProducts.push({
            id: productId,
            establishmentId,
            quantity,
            price: 0,
            optionsTotalPrice: 0,
            total: 0,
          });
        }

        if (updatedProducts[productIndex]) {
          updatedProducts[productIndex].quantity = quantity;
          updatedProducts[productIndex].total =
            quantity * updatedProducts[productIndex].price +
            updatedProducts[productIndex].optionsTotalPrice;
        }

        set({ products: updatedProducts });
      },
    }),
    {
      name: "cart-store",
    },
  ),
);

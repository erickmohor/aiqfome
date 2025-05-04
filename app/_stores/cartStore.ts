import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ICartOption {
  id: string;
  optionId: string;
  productId: string;
  productName: string;
  optionTitle: string;
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

export interface ICartProduct {
  id: string;
  establishmentId: string;
  productName: string;
  quantity: number;
  price: number;
  optionsTotalPrice: number;
  message: string;
  total: number;
}

interface IAddProducts {
  establishmentId: string;
  productId: string;
  productName: string;
  quantity: number;
}

interface IRemoveOptions {
  establishmentId: string;
  productId: string;
  productName: string;
  optionId: string;
}

interface IProductMessage {
  establishmentId: string;
  productId: string;
  message: string;
}

interface CartStoreProps {
  establishmentId: string;
  options: ICartOption[];
  addOptions: (options: ICartOption[]) => void;
  removeOptions: ({
    establishmentId,
    optionId,
    productId,
    productName,
  }: IRemoveOptions) => void;
  optionsTotal: ICartTotalProduct[];
  products: ICartProduct[];
  addProducts: (product: IAddProducts) => void;
  removeProduct: (establishmentId: string, productId: string) => void;
  productMessages: IProductMessage[];
  addProductMessage: ({
    productId,
    establishmentId,
    message,
  }: IProductMessage) => void;
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
      establishmentId: "",
      products: [],
      total: 0,
      optionsTotal: [],
      options: [],
      productMessages: [],
      addOptions: (optionsReceived: ICartOption[]) => {
        const optionId = optionsReceived[0]?.optionId;
        const productId = optionsReceived[0]?.productId;
        const productName = optionsReceived[0]?.productName;
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
              productName: productName,
              quantity: 0,
              price: productPrice,
              optionsTotalPrice: option.total,
              message: "",
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

        const total = updatedProducts.reduce((acc, product) => {
          if (product.establishmentId === establishmentId) {
            acc += product.total;
          }
          return acc;
        }, 0);

        set({ total });
      },
      removeOptions: ({
        establishmentId,
        productId,
        productName,
        optionId,
      }: IRemoveOptions) => {
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
              productName,
              quantity: 0,
              price: productPrice,
              optionsTotalPrice: option.total,
              message: "",
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

        const total = updatedProducts.reduce((acc, product) => {
          if (product.establishmentId === establishmentId) {
            acc += product.total;
          }
          return acc;
        }, 0);

        set({ total });
      },
      addProducts: ({
        establishmentId,
        productId,
        productName,
        quantity,
      }: IAddProducts) => {
        set({ establishmentId });
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
            productName,
            quantity,
            price: 0,
            optionsTotalPrice: 0,
            message: "",
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

        const total = updatedProducts.reduce((acc, product) => {
          if (product.establishmentId === establishmentId) {
            acc += product.total;
          }
          return acc;
        }, 0);

        set({ total });
      },
      removeProduct(establishmentId: string, productId: string) {
        const products = get().products;
        const options = get().options;

        const productsWithoutProductToRemove = products.filter(
          (product) =>
            !(
              product.id === productId &&
              product.establishmentId === establishmentId
            ),
        );

        const optionsWithoutProductToRemove = options.filter(
          (option) =>
            !(
              option.productId === productId &&
              option.establishmentId === establishmentId
            ),
        );

        set({ products: productsWithoutProductToRemove });
        set({ options: optionsWithoutProductToRemove });

        const total = productsWithoutProductToRemove.reduce((acc, product) => {
          if (product.establishmentId === establishmentId) {
            acc += product.total;
          }
          return acc;
        }, 0);

        set({ total });
      },
      addProductMessage({
        establishmentId,
        productId,
        message,
      }: IProductMessage) {
        const productMessages = get().productMessages;

        const productIndex = productMessages.findIndex(
          (item) =>
            item.establishmentId === establishmentId &&
            item.productId === productId,
        );

        if (productIndex > 0) {
          productMessages[productIndex].message = message;
          return set({ productMessages });
        }

        productMessages.push({
          establishmentId,
          productId,
          message,
        });

        set({ productMessages });
      },
    }),
    {
      name: "cart-store",
    },
  ),
);

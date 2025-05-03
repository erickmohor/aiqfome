import { products } from "@/app/_mockups/products";

export const categories = [
  {
    id: "01",
    establishmentId: "1",
    name: "Temakis",
    isHighlight: true,
    products,
  },
  {
    id: "02",
    name: "Sushi",
    isHighlight: true,
    products,
  },
  {
    id: "03",
    name: "Bebidas",
    isHighlight: false,
    products,
  },
  {
    id: "04",
    name: "Sobremesa",
    isHighlight: false,
    products,
  },
];

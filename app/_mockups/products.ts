import {
  optionsProduct0001,
  optionsProduct0002,
  optionsProduct0003,
  optionsProduct0004,
} from "@/app/_mockups/options";
import { IProduct } from "../_components/product-card";

export const products: IProduct[] = [
  {
    id: "0001",
    establishmentId: "01",
    name: "Califórnia",
    description: "Kani, pepino e maçã ou manga",
    image: "/mockups-images/comida-japonesa.jpg",
    category: "Temakis",
    price: 20.5,
    discountPercentage: 50,
    priceIsNotFixed: false,
    options: optionsProduct0001,
  },
  {
    id: "0002",
    establishmentId: "01",
    name: "Filadélfia",
    description: "Arroz, salmão fresco, cream cheese e cebolinha",
    image: "/mockups-images/comida-japonesa.jpg",
    category: "Temakis",
    price: 13.99,
    discountPercentage: 0,
    priceIsNotFixed: false,
    options: optionsProduct0002,
  },
  {
    id: "0003",
    establishmentId: "01",
    name: "Mix",
    description:
      "Escolha 3 ingredientes: shimeji, alface americana, rúcula, pepino, tomate seco, cream cheese, maionese, goiabada, banana, requeijão, molho de maracujá, manga, maçã e morango.",
    image: "/mockups-images/comida-japonesa.jpg",
    category: "Temakis",
    price: 13.99,
    discountPercentage: 0,
    priceIsNotFixed: true,
    options: optionsProduct0003,
  },
  {
    id: "0004",
    establishmentId: "01",
    name: "Salmão picante",
    description: "Alga, arroz, salmão fresco, pimenta e cebolinha",
    image: "/mockups-images/comida-japonesa.jpg",
    category: "Temakis",
    price: 17.55,
    discountPercentage: 0,
    priceIsNotFixed: true,
    options: optionsProduct0004,
  },
];

interface CalculateProductTotalPriceProps {
  price: number;
  discountPercentage: number;
}

export function calculateProductTotalPrice({
  price,
  discountPercentage,
}: CalculateProductTotalPriceProps): number {
  const discount = price * (discountPercentage / 100);
  return Number((price - discount).toFixed(2));
}

export function formatCurrency(value: number): string {
  return `R$${Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value)}`;
}

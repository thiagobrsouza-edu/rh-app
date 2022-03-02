
export const converterToDecimal = (value: any) => {
  if (!value) {
    return 0;
  }
  return (Number(value.replace(/\D/g, "")) / 100);
}

export const currencyMask = (value: any) => {
  return (Number(value.replace(/\D/g, "")) / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
}
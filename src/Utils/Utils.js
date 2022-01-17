export const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency: 'brl',
    style: 'currency',
    minimumFractionDigits: 0,
});

export const dateFormatter = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' });

export type EconomicIndicators = [];
export type Year = number;
export type Month = [];


// Declarar el arreglo de nombres de datos
export const economicIndicators: { [key: string]: string } = {
    uf: 'Unidad de fomento (UF)',
    ivp: 'Índice de valor promedio (IVP)',
    dolar: 'Dólar observado',
    dolar_intercambio: 'Dólar acuerdo',
    euro: 'Euro',
    ipc: 'Índice de Precios al Consumidor (IPC)',
    utm: 'Unidad Tributaria Mensual (UTM)',
    imacec: 'Imacec',
    tpm: 'Tasa Política Monetaria (TPM)',
    libra_cobre: 'Libra de Cobre',
    tasa_desempleo: 'Tasa de desempleo',
    bitcoin: 'Bitcoin'
};

// Declarar el arreglo de años
export const years: Year[] = [];
for (let year = 1977; year <= 2024; year++) {
    years.push(year);
}

export const months: { [key: string]: number } = {
    Enero: 1,
    Febrero: 2,
    Marzo: 3,
    Abril: 4,
    Mayo: 5,
    Junio: 6,
    Julio: 7,
    Agosto: 8,
    Septiembre: 9,
    Octubre: 10,
    Noviembre: 11,
    Diciembre: 12
};
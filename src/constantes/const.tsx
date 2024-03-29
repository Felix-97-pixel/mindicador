export type EconomicIndicators = 'uf' | 'ivp' | 'dolar' | 'dolar_intercambio' | 'euro' | 'ipc' | 'utm' | 'imacec' | 'tpm' | 'libra_cobre' | 'tasa_desempleo' | 'bitcoin';
export type Year = number;
export type Month = [];


// Declarar el arreglo de nombres de datos
export const economicIndicators: EconomicIndicators[] = [
    'uf',
    'ivp',
    'dolar',
    'dolar_intercambio',
    'euro',
    'ipc',
    'utm',
    'imacec',
    'tpm',
    'libra_cobre',
    'tasa_desempleo',
    'bitcoin'
];

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
import Plot from 'react-plotly.js';

const Graficocomponent = () => {
    // Datos para el gráfico
    var trace1 = {
        x: [1, 2, 3, 4],
        y: [10, 15, 13, 17],
        type: 'scatter'
    };
  
    // Configuración del diseño del gráfico
    const layout = {
        title: 'Gráfico de ejemplo',
        xaxis: { title: 'Eje X' },
        yaxis: { title: 'Eje Y' },
    };

    return (
        <div>
            <Plot
                data={[
                    {
                        x: ["Enero", "Febrero", "Marzo", "Abril"],
                        y: [10, 15, 13, 17],
                        type: 'scatter'
                    },
                ]}
                layout={ layout }
            />
        </div>
    );
};

export default Graficocomponent;
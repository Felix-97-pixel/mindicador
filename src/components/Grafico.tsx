import Plot from 'react-plotly.js';


type PlotType = 'bar' | 'pie' | 'scatter';

interface Props {
    x: string[];
    y: number[];
    type: PlotType;
}

const Graficocomponent: React.FC<Props> = ({ x, y, type }) => {
    // Configuración del diseño del gráfico
    const layout = {
        title: 'Gráfico de ejemplo',
        xaxis: { title: 'Eje X' },
        yaxis: { title: 'Eje Y' },
    };

    return (
        <div>
            <Plot
                data={[{
                    x: x,
                    y: y,
                    type: type
                }]}
                layout={layout}
            />
        </div>
    );
};

export default Graficocomponent;
import Plot from 'react-plotly.js';


type PlotType = 'bar' | 'pie' | 'scatter';

interface Props {
    x: string[];
    y: number[];
    type: PlotType;
    title: string;
    xaxis: { title: string};
    yaxis: { title: string};
}

const Graficocomponent: React.FC<Props> = ({ x, y, type, title, xaxis, yaxis }) => {
    
    return (
        <div>
            <Plot
                data={[{
                    x: x,
                    y: y,
                    type: type
                }]}
                layout={{
                    title: title,
                    xaxis: xaxis,
                    yaxis: yaxis,
                }}
            />
        </div>
    );
};

export default Graficocomponent;
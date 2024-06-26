import React, { useState, useEffect } from 'react';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { fetchData } from './api';
import Graficocomponent from './components/Grafico';
import { economicIndicators, Year, years, months } from './constantes/const';

const API_URL = 'https://mindicador.cl/api';

const reversedMonths: { [key: number]: string } = {};
Object.entries(months).forEach(([name, number]) => {
  reversedMonths[number] = name;
});

const yearOptions = years.map((year: Year) => (
  <option key={year} value={year}>{year}</option>
));
const economicIndicatorsOptions = Object.entries(economicIndicators).map(([id, name]) => (
  <option key={id} value={id}>{name}</option>
));
const monthOptions = Object.entries(months).map(([name, number]) => (
  <option key={number} value={number}>{name}</option>
));

interface DataItem {
  fecha: string;
  valor: number;
}


const App: React.FC = () => {

  const [data, setData] = useState<any>(null);
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<Year | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [xaxis, setXaxis] = useState<string[]>([]);
  const [yaxis, setYaxis] = useState<number[]>([]);
  const [monthalendar, setMonthCalendar] = useState<string>();

  useEffect(() => {
    if (selectedIndicator && selectedYear && selectedMonth) {
      fetchDataFromAPI(selectedIndicator, selectedYear, selectedMonth);
    }
  }, [selectedIndicator, selectedYear, selectedMonth]);
  
  const fetchDataFromAPI = async (indicator: string, year: Year, month: number ) => {
    setXaxis([]);
    setYaxis([]);
    const apiUrl = `${API_URL}/${indicator}/${year}`;
    try {
      const jsonData = await fetchData(apiUrl);
      // Definir el mes que deseas filtrar (por ejemplo, enero)
      const monthToFilter = month; // Enero
      setMonthCalendar(reversedMonths[month]);
      // Invertir el objeto para que los números sean las claves y los nombres de los meses sean los valores
  
      // Filtrar los resultados para obtener solo aquellos que corresponden al mes especificado
      const xValues: string[] = [];
      const yValues: number[] = [];
        const filteredData = jsonData.serie.filter((item: DataItem) => {
          const date = new Date(item.fecha);
          return date.getMonth() + 1 === monthToFilter;
        });
  
        filteredData.forEach((item: DataItem) => {
          xValues.push(item.fecha);
          yValues.push(item.valor);
        });
  
        setXaxis(xValues);
        setYaxis(yValues);
      jsonData.serie = filteredData;
      setData(jsonData);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <Container>
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text>Indicador</InputGroup.Text>
            <FormControl as="select" id="economicIndicator" onChange={(e) => setSelectedIndicator(e.target.value)}>
              <option selected>--- Selecciona una opción ---</option>
              { economicIndicatorsOptions }
            </FormControl>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text>Año</InputGroup.Text>
            <FormControl as="select" id="year" onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
              <option selected>--- Selecciona una opción ---</option>
              { yearOptions }
            </FormControl>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text>Mes</InputGroup.Text>
            <FormControl as="select" id="inputGroupSelect02" onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
              <option selected>--- Selecciona una opción ---</option>
              { monthOptions }
            </FormControl>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
        <Graficocomponent
          x={(xaxis !== undefined && yaxis !== undefined && data?.nombre !== undefined && selectedMonth !== undefined && selectedYear !== undefined && data?.unidad_medida !== undefined) ? xaxis : []}
          y={(xaxis !== undefined && yaxis !== undefined && data?.nombre !== undefined && selectedMonth !== undefined && selectedYear !== undefined && data?.unidad_medida !== undefined) ? yaxis : []}
          type="scatter"
          title={(data?.nombre !== undefined && selectedMonth !== undefined && selectedYear !== undefined) ? `${data.nombre} de ${monthalendar} de ${selectedYear}` : ''}
          xaxis={{ title: '' }}
          yaxis={{ title: (data?.unidad_medida !== undefined) ? `Valor en ${data.unidad_medida}` : '' }}
        />
        </Col>
        <Col>
          {data ? (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          ) : (
            <p>Cargando datos...</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
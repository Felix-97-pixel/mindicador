import React, { useState, useEffect } from 'react';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { fetchData } from './api';
import Graficocomponent from './components/Grafico';
import { EconomicIndicators, economicIndicators, Year, years, months } from './constantes/const';

const API_URL = 'https://mindicador.cl/api';

const yearOptions = years.map((year: Year) => (
  <option key={year} value={year}>{year}</option>
));
const economicIndicatorsOptions = economicIndicators.map((economicIndicator: EconomicIndicators) => (
  <option key={economicIndicator} value={economicIndicator}>{economicIndicator}</option>
));
const monthOptions = Object.entries(months).map(([name, number]) => (
  <option key={number} value={number}>{name}</option>
));

const App: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [selectedIndicator, setSelectedIndicator] = useState<EconomicIndicators | null>(null);
  const [selectedYear, setSelectedYear] = useState<Year | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndicator && selectedYear && selectedMonth) {
      fetchDataFromAPI(selectedIndicator, selectedYear, selectedMonth);
    }
  }, [selectedIndicator, selectedYear, selectedMonth]);

  const fetchDataFromAPI = async (indicator: EconomicIndicators, year: Year, month: number ) => {
    const apiUrl = `${API_URL}/${indicator}/${year}`;
    try {
      const jsonData = await fetchData(apiUrl);
      // Definir el mes que deseas filtrar (por ejemplo, enero)
      const monthToFilter = month; // Enero

      // Filtrar los resultados para obtener solo aquellos que corresponden al mes especificado
      interface DataItem {
        fecha: string;
        valor: number;
      }
      
      const filteredData = jsonData.serie.filter((item: DataItem) => {
        const date = new Date(item.fecha);
        return date.getMonth() + 1 === monthToFilter;
      });

      setData(filteredData);
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
            <FormControl as="select" id="economicIndicator" onChange={(e) => setSelectedIndicator(e.target.value as EconomicIndicators)}>
              <option selected>--- Selecciona una opción ---</option>
              {economicIndicatorsOptions}
            </FormControl>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text>Mes</InputGroup.Text>
            <FormControl as="select" id="inputGroupSelect02" onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
              <option selected>--- Selecciona una opción ---</option>
              {monthOptions}
            </FormControl>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text>Año</InputGroup.Text>
            <FormControl as="select" id="year" onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
              <option selected>--- Selecciona una opción ---</option>
              {yearOptions}
            </FormControl>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Graficocomponent
            x={["Enero", "Febrero", "Marzo", "Abril"]} // Aquí deberías utilizar los datos obtenidos del API
            y={[10, 15, 13, 17]} // Aquí deberías utilizar los datos obtenidos del API
            type="scatter"
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
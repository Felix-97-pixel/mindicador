import React, { useState, useEffect } from 'react';
import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { fetchData } from './api'; // Importa la función fetchData desde api.ts
import Graficocomponent from './components/Grafico';
import { EconomicIndicators, economicIndicators, Year, years, months } from './constantes/const'; // Importa las constantes

const API_URL = 'https://mindicador.cl/api'; // Reemplaza esto con la URL de tu API

const App: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        const jsonData = await fetchData(API_URL);
        setData(jsonData);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchDataFromAPI();
  }, []);

  const yearOptions = years.map((year: Year) => (
    <option key={year} value={year}>{year}</option>
  ));
  const economicIndicatorsOptions = economicIndicators.map((economicIndicator: EconomicIndicators) => (
    <option key={economicIndicator} value={economicIndicator}>{economicIndicator}</option>
  ));

  const monthOptions = Object.entries(months).map(([name, number]) => (
    <option key={number} value={number}>{name}</option>
));

  return (
    <Container>
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text>Indicador</InputGroup.Text>
            <FormControl as="select" id="economicIndicator">
              <option selected>Choose...</option>
              {economicIndicatorsOptions}
            </FormControl>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text>Mes</InputGroup.Text>
            <FormControl as="select" id="inputGroupSelect02">
              <option selected>Choose...</option>
              {monthOptions}
            </FormControl>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text>Año</InputGroup.Text>
            <FormControl as="select" id="year">
              <option selected>Choose...</option>
              {yearOptions}
            </FormControl>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Graficocomponent
            x={["Enero", "Febrero", "Marzo", "Abril"]}
            y={[10, 15, 13, 17]}
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
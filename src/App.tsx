import { Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

import React, { useState, useEffect } from 'react';
import { fetchData } from './api'; // Importa la función fetchData desde api.ts


import Graficocomponent from './components/Grafico';

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

  return (
    <Container>
      <Row>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text>Indicador</InputGroup.Text>
            <FormControl as="select" id="inputGroupSelect01">
              <option selected>Choose...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </FormControl>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text>Mes</InputGroup.Text>
            <FormControl as="select" id="inputGroupSelect02">
              <option selected>Choose...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </FormControl>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <InputGroup.Text>Año</InputGroup.Text>
            <FormControl as="select" id="inputGroupSelect03">
              <option selected>Choose...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
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
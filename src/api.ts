export async function fetchData(url: string): Promise<any> {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const jsonData = await response.json();
        return jsonData;
      } else {
        throw new Error('Error al obtener datos de la API');
      }
    } catch (error) {
      throw new Error('Error al realizar la solicitud a la API');
    }
  }



  
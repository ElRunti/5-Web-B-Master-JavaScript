//Titulo sincronizado con useEffect
import { useState, useEffect } from "react";

function App() {
  const [valor, setValor] = useState(0);

  console.log("Renderizando componente");

  useEffect(() => {
    console.log("Ejecutando efecto");
    document.title = `Valor: ${valor}`;
  }, [valor]);

  return (
    <div>
      <h1>Contador</h1>

      <button onClick={() => setValor(v => v - 1)}>
        -1
      </button>

      <span style={{ margin: "10px" }}>
        {valor}
      </span>

      <button onClick={() => setValor(v => v + 1)}>
        +1
      </button>
    </div>
  );
}

export default App;

//Reloj con cleanup
import { useState, useEffect } from "react";

function Reloj() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    console.log("Iniciando reloj");

    const id = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => {
      console.log("Limpiando reloj");
      clearInterval(id);
    };
  }, []);

  return <h2>{hora.toLocaleTimeString()}</h2>;
}

function App() {
  const [mostrar, setMostrar] = useState(true);

  return (
    <div>
      <button onClick={() => setMostrar(!mostrar)}>
        Ocultar reloj
      </button>

      {mostrar && <Reloj />}
    </div>
  );
}

export default App;

//Fetch con loading y error
import { useState, useEffect } from "react";

function App() {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargar() {
      try {
        const respuesta = await fetch(
          "https://rickandmortyapi.com/api/character"
        );

        if (!respuesta.ok) {
          throw new Error("Falló la petición");
        }

        const json = await respuesta.json();

        setDatos(json.results);
      } catch (e) {
        setError(e.message);
      } finally {
        setCargando(false);
      }
    }

    cargar();
  }, []);

  if (cargando) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Personajes</h1>

      <ul>
        {datos.map(personaje => (
          <li key={personaje.id}>
            {personaje.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

//useMemo para calculo 
import { useState, useMemo } from "react";

function App() {
  const [numero, setNumero] = useState(1);
  const [texto, setTexto] = useState("");

  const resultado = useMemo(() => {
    console.log("Calculando...");

    let total = 0;

    for (let i = 0; i < 20000000; i++) {
      total += i % (numero + 1);
    }

    return total;
  }, [numero]);

  return (
    <div>
      <h1>useMemo</h1>

      <p>Resultado: {resultado}</p>

      <input
        type="number"
        value={numero}
        onChange={(e) =>
          setNumero(Number(e.target.value))
        }
      />

      <br />
      <br />

      <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="No recalcula"
      />
    </div>
  );
}

export default App;

//Lista filtrable 
import { useState, useMemo } from "react";

const FRUTAS = [
  "manzana",
  "banana",
  "pera",
  "mango",
  "uva",
  "melón"
];

function App() {
  const [busqueda, setBusqueda] = useState("");

  const filtradas = useMemo(() => {
    return FRUTAS.filter(fruta =>
      fruta
        .toLowerCase()
        .includes(busqueda.toLowerCase())
    );
  }, [busqueda]);

  return (
    <div>
      <h1>Buscar frutas</h1>

      <input
        value={busqueda}
        onChange={(e) =>
          setBusqueda(e.target.value)
        }
        placeholder="Buscar..."
      />

      <p>
        {filtradas.length} resultado(s)
      </p>

      <ul>
        {filtradas.map(fruta => (
          <li key={fruta}>{fruta}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
//Los ejercicios los realice en otro archivo , pero para no hacer mas grande el archivo App.jsx , lo deje en este archivo llamado Ejercicios.jsx , el cual se importa en App.jsx y se muestra en pantalla.
// es funcional
import React, { useState, useEffect } from 'react';

function Saludo({ nombre }) {
  useEffect(() => {
    console.log('monte');
    return () => console.log('desmonte');
  }, []);

  useEffect(() => {
    console.log('cambio nombre a', nombre);
  }, [nombre]);

  return <h2>Hola, {nombre}</h2>;
}

function Reloj() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    console.log('monte');
    const id = setInterval(() => {
      console.log('tick');
      setHora(new Date());
    }, 1000);

    return () => {
      console.log('desmonte');
      clearInterval(id);
    };
  }, []);

  return <h2>{hora.toLocaleTimeString()}</h2>;
}

function Ancho() {
  const [ancho, setAncho] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setAncho(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return <p>Ancho: {ancho}px</p>;
}

function Temporizador() {
  const [segundos, setSegundos] = useState(0);
  const [corriendo, setCorriendo] = useState(true);

  useEffect(() => {
    if (!corriendo) return;
    const id = setInterval(() => setSegundos(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [corriendo]);

  return (
    <>
      <p>{segundos}s</p>
      <button onClick={() => setCorriendo(c => !c)}>
        {corriendo ? 'Pausar' : 'Continuar'}
      </button>
      <button onClick={() => setSegundos(0)}>Reset</button>
    </>
  );
}

function CuentaRegresiva({ desde = 10 }) {
  const [restante, setRestante] = useState(desde);

  useEffect(() => {
    if (restante <= 0) return;
    const id = setInterval(() => setRestante(r => r - 1), 1000);
    return () => clearInterval(id);
  }, [restante]);

  return (
    <>
      <p>{restante > 0 ? `${restante}s` : 'Tiempo!'}</p>
      <button onClick={() => setRestante(desde)}>Reiniciar</button>
    </>
  );
}

export default function App() {
  const [nombre, setNombre] = useState('Fran');
  const [mostrarSaludo, setMostrarSaludo] = useState(true);
  const [mostrarReloj, setMostrarReloj] = useState(true);

  return (
    <div style={{ padding: '20px' }}>
      <div>
        <h3>Ejercicio 1</h3>
        <input value={nombre} onChange={e => setNombre(e.target.value)} />
        <button onClick={() => setMostrarSaludo(m => !m)}>
          {mostrarSaludo ? 'Ocultar' : 'Mostrar'}
        </button>
        {mostrarSaludo && <Saludo nombre={nombre} />}
      </div>
      <hr />
      <div>
        <h3>Ejercicio 2</h3>
        <button onClick={() => setMostrarReloj(r => !r)}>
          {mostrarReloj ? 'Ocultar reloj' : 'Mostrar reloj'}
        </button>
        {mostrarReloj && <Reloj />}
      </div>
      <hr />
      <div>
        <h3>Ejercicio 3</h3>
        <Ancho />
      </div>
      <hr />
      <div>
        <h3>Ejercicio 4 y 5</h3>
        <Temporizador />
      </div>
      <hr />
      <div>
        <h3>Ejercicio 6</h3>
        <CuentaRegresiva desde={10} />
      </div>
    </div>
  );
}

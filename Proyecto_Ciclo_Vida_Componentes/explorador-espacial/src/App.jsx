import React, { useState, useEffect, useMemo } from "react";
import Planeta from "./planetas";
import BitacoraRegistro from "./BitacoraRegistro"; // Nombre corregido sin la 'i' extra

function App() {
  const [planetas, setPlanetas] = useState(["Tierra", "Marte", "Júpiter"]);
  const [combustible, setCombustible] = useState(100);
  const [estadoNave] = useState("En órbita");

  // Agregar planetas del localstorage a la lista al iniciar
  useEffect(() => {
    const planetasGuardados = JSON.parse(localStorage.getItem("planetas")) || [];
    setPlanetas(prevPlanetas => [...prevPlanetas, ...planetasGuardados]);
  }, []);
    
  // Intervalo de vuelo
  useEffect(() => {
    console.log("El panel esta listo");
    const intervalo = setInterval(() => {
      console.log("Volando....");
    }, 1000);

    return () => {
      clearInterval(intervalo);
      console.log("El panel se ha desmontado");
    };
  }, []);

  useEffect(() => {
    console.log("Combustible actualizado");
  }, [combustible]);

  const mensajeEstado = useMemo(() => {
    return `Estado: ${estadoNave}`;
  }, [estadoNave]);

  return (
    <div>
      <h2>{mensajeEstado}</h2> 
      
      {/* Lista de planetas */}
      {planetas.map((planeta, index) => (
        <Planeta key={index} nombre={planeta} />
      ))}

      {/* Componente de la bitácora */}
      <BitacoraRegistro />
    </div>
  );
}

export default App;
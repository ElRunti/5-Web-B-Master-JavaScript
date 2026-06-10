import React, { useState, useEffect, useMemo } from "react";

function App() {
  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [duracion, setDuracion] = useState("");
  const [filtroDuracion, setFiltroDuracion] = useState("");
  const [mostrarRecientes, setMostrarRecientes] = useState(false);

  // Cargar tareas desde localStorage
  useEffect(() => {
    const tareasGuardadas = localStorage.getItem("tareas");

    if (tareasGuardadas) {
      setTareas(JSON.parse(tareasGuardadas));
    }
  }, []);

  // Guardar tareas en localStorage
  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  // Calcular tiempo total
  const calcularTiempoTotal = useMemo(() => {
    console.log("Calculando tiempo total...");
    return tareas.reduce(
      (total, tarea) => total + tarea.duracion,
      0
    );
  }, [tareas]);

  // Actualizar título de la pestaña
  useEffect(() => {
    document.title = `Total: ${calcularTiempoTotal} minutos`;
  }, [calcularTiempoTotal]);

  // Agregar tarea
  const agregarTarea = () => {
    if (nuevaTarea.trim() && duracion) {
      const nuevaTareaObj = {
        nombre: nuevaTarea,
        duracion: parseInt(duracion),
        fecha: Date.now(),
      };

      setTareas([...tareas, nuevaTareaObj]);
      setNuevaTarea("");
      setDuracion("");
    }
  };

  // Aplicar filtro y ordenamiento
  const tareasMostradas = [...tareas]
    .filter((tarea) =>
      filtroDuracion === ""
        ? true
        : tarea.duracion >= parseInt(filtroDuracion)
    )
    .sort((a, b) =>
      mostrarRecientes
        ? b.fecha - a.fecha
        : 0
    );

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h1>Contador de Tareas</h1>

      <div>
        <input
          type="text"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          placeholder="Nombre de la tarea"
        />

        <input
          type="number"
          value={duracion}
          onChange={(e) => setDuracion(e.target.value)}
          placeholder="Duración en minutos"
        />

        <button onClick={agregarTarea}>
          Agregar tarea
        </button>
      </div>

      <br />

      <div>
        <input
          type="number"
          value={filtroDuracion}
          onChange={(e) =>
            setFiltroDuracion(e.target.value)
          }
          placeholder="Duración mínima"
        />

        <button
          onClick={() =>
            setMostrarRecientes(!mostrarRecientes)
          }
        >
          {mostrarRecientes
            ? "Orden Normal"
            : "Ver Recientes"}
        </button>
      </div>

      <h2>Tareas</h2>

      <ul>
        {tareasMostradas.map((tarea, index) => (
          <li key={index}>
            {tarea.nombre} - {tarea.duracion} minutos
          </li>
        ))}
      </ul>

      <h3>
        Total de tiempo: {calcularTiempoTotal} minutos
      </h3>
    </div>
  );
}

export default App;
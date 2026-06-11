import React, { useState, useEffect } from "react";

export default function BitacoraRegistro() {
const [nombre, setNombre] = useState("");
const [descripcion, setDescripcion] = useState("");
const [registros, setRegistros] = useState([]);
const [indiceEditando, setIndiceEditando] = useState(null);

useEffect(() => {
const guardados = JSON.parse(localStorage.getItem("registros")) || [];
setRegistros(guardados);
}, []);

const reiniciarBitacora = () => {
localStorage.removeItem("registros");
setRegistros([]);
cancelarEdicion();
};

const activarEdicion = (index) => {
const registroAEditar = registros[index];
setNombre(registroAEditar.nombre);
setDescripcion(registroAEditar.descripcion);
setIndiceEditando(index);
};

const cancelarEdicion = () => {
setNombre("");
setDescripcion("");
setIndiceEditando(null);
};

const manejarEnvio = (e) => {
e.preventDefault();
if (!nombre.trim() || !descripcion.trim()) return;

let nuevosRegistros = [...registros];

if (indiceEditando !== null) {
nuevosRegistros[indiceEditando] = {
...nuevosRegistros[indiceEditando],
nombre,
descripcion
};
setIndiceEditando(null);
} else {
const nuevoRegistro = {
nombre,
descripcion,
fecha: new Date().toLocaleString()
};
nuevosRegistros.push(nuevoRegistro);
}

setRegistros(nuevosRegistros);
localStorage.setItem("registros", JSON.stringify(nuevosRegistros));
setNombre("");
setDescripcion("");
};

return (
<div style={{ marginTop: "20px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
<h1>{indiceEditando !== null ? "Editar Registro" : "Bitácora de Registro"}</h1>

<form onSubmit={manejarEnvio}>
<label htmlFor="nombre">Nombre:</label>
<input 
type="text" 
id="nombre" 
placeholder="Ingrese su nombre" 
value={nombre}
onChange={(e) => setNombre(e.target.value)}
/>

<label htmlFor="descripcion">Descripción:</label>
<input 
type="text" 
id="descripcion" 
placeholder="Ingrese la descripción" 
value={descripcion}
onChange={(e) => setDescripcion(e.target.value)}
/>

<button type="submit">{indiceEditando !== null ? "Guardar Cambios" : "Registrar"}</button>
{indiceEditando !== null && (
<button type="button" onClick={cancelarEdicion} style={{ marginLeft: "10px" }}>Cancelar</button>
)}
<button type="button" onClick={reiniciarBitacora} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>Reiniciar Bitácora</button>
</form>

<h3>Registros Guardados:</h3>
<ul>
{registros.map((reg, index) => (
<li key={index} style={{ marginBottom: "10px" }}>
<strong>{reg.nombre}</strong> - {reg.descripcion} <em>({reg.fecha})</em>

<button type="button" onClick={() => activarEdicion(index)} style={{ marginLeft: "15px", padding: "2px 8px", cursor: "pointer" }}disabled={indiceEditando !== null}>Editar</button></li>))}</ul>
</div>
);
}

function TarjetaCarrera() {
  const universidad = "Universidad Tecnológica de la Región Norte de Guerrero";
  const carrera = "Ingeniería en Desarrollo y Gestión de Software Multiplataforma";
  const cuatrimestre = "9no cuatrimestre";

  return (
    <div style={{border: '1px solid #ccc', padding: '20px', width: '300px', textAlign: 'center'} }>
      {/* JSX permite incrustar variables en HTML utilizando llaves {} */}
      <h2>{universidad}</h2>
      <h4>{carrera}</h4>
      <p>{cuatrimestre}</p>

    </div>
  );
}

export default TarjetaCarrera;
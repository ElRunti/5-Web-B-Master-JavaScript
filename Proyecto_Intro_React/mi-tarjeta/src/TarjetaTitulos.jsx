function Titulos() {
  const titulos = [
    "Técnico medio superior en programación",
    "Técnico superior universitario en desarrollo y gestión de software multiplataforma"
  ];

  return (
<div style={{ border: '1px solid #ccc', padding: '20px', width: '300px', textAlign: 'center' }}>
      <h4 style={{ marginBottom: '12px' }}>Títulos obtenidos</h4>
      {titulos.map((titulo, index) => (
        <p key={index} style={{ margin: '8px 0', fontSize: '14px' }}>
          {index + 1}. {titulo}
        </p>
      ))}
    </div>
  );
}




export default Titulos;
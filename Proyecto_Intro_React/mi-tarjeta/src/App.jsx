import Tarjeta from './Tarjeta';

import TarjetaCarrera from './TarjetaCarrera';
import TarjetaTitulo from './TarjetaTitulos';

function App() {
  return (
    <div>
      <div>
      <h1>Tarjeta de Presentación</h1>
      {/* Renderizamos el componente Tarjeta */}
      <Tarjeta />
      </div>

      <div>
      <h1>Datos escolares</h1>
      {/* Renderizamos el componente Tarjeta */}
      <TarjetaCarrera/>
      </div>

      <div>
      <h1>Titulos</h1>
      {/* Renderizamos el componente Tarjeta */}
      <TarjetaTitulo/>
      </div>
    </div>


  );
}

export default App;
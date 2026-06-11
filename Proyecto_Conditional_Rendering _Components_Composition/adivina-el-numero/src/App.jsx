import React from 'react';
import Game from "./componets/Game";

function App() {
    return (
        <div>
            <h1>¡Bienvenido al juego de adivinar el número!</h1>
            <p>Intenta adivinar el número secreto entre 1 y 100.</p>
            <Game />
        </div>
    );
}

export default App;
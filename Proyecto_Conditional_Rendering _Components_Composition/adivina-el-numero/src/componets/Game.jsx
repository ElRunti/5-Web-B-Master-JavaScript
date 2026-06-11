import React, { useState } from 'react';
import Input from './InputNumber';
import Mensaje from './Mensaje';

function NumeroRandom() {
    return Math.floor(Math.random() * 100) + 1;
}

function Game() {
    const [numeroSecreto, setNumeroSecreto] = useState(NumeroRandom());
    const [entrada, setEntrada] = useState('');
    const [numeroUsuario, setNumeroUsuario] = useState(null);
    const [intentos, setIntentos] = useState(0);

    const verificarAdivinanza = () => {
        const valorNumerico = parseInt(entrada);
        if (isNaN(valorNumerico)) return;

        setNumeroUsuario(valorNumerico);
        setIntentos(intentos + 1);
    };

    return (
        <div>
            <h1>Adivina el número</h1>
            <Input entrada={entrada} setEntrada={setEntrada} alEnviar={verificarAdivinanza} />
            <Mensaje numeroSecreto={numeroSecreto} numeroUsuario={numeroUsuario} intentos={intentos} />
        </div>
    );
}

export default Game;
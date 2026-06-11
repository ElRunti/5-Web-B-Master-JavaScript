import React from 'react';

function Mensaje({ numeroSecreto, numeroUsuario, intentos }) {
    if (numeroUsuario === null) {
        return null;
    }

    const diferencia = Math.abs(numeroSecreto - numeroUsuario);
    let textoCercania = '';

    if (diferencia === 0) {
        textoCercania = `Ganaste! Te tomo ${intentos} intentos.`;
    } else if (diferencia <= 5) {
        textoCercania = 'Estas congelandote de lo cerca que estas!';
    } else if (diferencia <= 15) {
        textoCercania = 'Estas cerca.';
    } else {
        textoCercania = 'Estas muy lejos.';
    }

    return (
        <div>
            <p>{textoCercania}</p>
        </div>
    );
}

export default Mensaje;
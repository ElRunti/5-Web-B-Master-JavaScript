import React from 'react';

function IngresarNumero({ entrada, setEntrada, alEnviar }) {
    const handleChange = (e) => {
        setEntrada(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alEnviar();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="number" 
                value={entrada} 
                onChange={handleChange} 
                placeholder="Ingresa un número del 1 al 100"
            />
            <button type="submit">Probar</button>
        </form>
    );
}

export default IngresarNumero;
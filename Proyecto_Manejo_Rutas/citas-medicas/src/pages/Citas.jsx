import React from 'react';
import { Link } from 'react-router-dom';

function Citas() {
    const listadoCitas = [
        { id: '101', paciente: 'Carlos Gómez' },
        { id: '102', paciente: 'Ana Martínez' },
        { id: '103', paciente: 'Luis Rodríguez' }
    ];

    return (
        <div>
            <h1>Listado de Citas</h1>
            <ul>
                {listadoCitas.map((cita) => (
                    <li key={cita.id}>
                        <Link to={`/cita/${cita.id}`}>
                            Cita #{cita.id} - {cita.paciente}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Citas;
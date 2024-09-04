function cargarReuniones() {
    const reuniones = JSON.parse(localStorage.getItem('reuniones')) || [];
    const reunionesList = document.getElementById('reunionesList');

    if (reuniones.length === 0) {
        reunionesList.innerHTML = '<p>No hay reuniones programadas.</p>';
        return;
    }

    reunionesList.innerHTML = ''; // Limpiar la lista antes de cargar

    reuniones.forEach((reunion, index) => {
        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
            <span>${reunion.tema}</span>
            <div class="details">
                <p><strong>Fecha:</strong> ${reunion.fecha}</p>
                <p><strong>Hora:</strong> ${convertirHoraAMPM(reunion.hora)}</p>
                <p><strong>Objetivo:</strong> ${reunion.objetivo}</p>
                <p><strong>Tipo de reunión:</strong> ${reunion.tipo}</p>
                <p><strong>Área:</strong> ${reunion.area}</p>
                <p><strong>Participantes previstos:</strong> ${reunion.participantes.join(', ')}</p>
                <img src="${reunion.codigoQR}" alt="Código QR" style="width: 300px; height: 300px;" />
            </div>
            <button onclick="eliminarReunion(${index})">Eliminar</button>
        `;
        reunionesList.appendChild(item);
    });
}

function convertirHoraAMPM(hora) {
    const [h, m] = hora.split(':');
    const hora12 = h % 12 || 12; // Convertir a formato 12 horas
    const ampm = h < 12 ? 'AM' : 'PM';
    return `${hora12}:${m} ${ampm}`;
}

function eliminarReunion(index) {
    const reuniones = JSON.parse(localStorage.getItem('reuniones')) || [];
    const reunion = reuniones[index];
    const fechaActual = new Date();
    const fechaReunion = new Date(reunion.fecha);

    // Validar que la reunión no haya pasado
    if (fechaReunion < fechaActual) {
        alert('No se puede eliminar una reunión que ya ha pasado.');
        return;
    }

    // Solicitar confirmación
    const confirmacion = confirm(`¿Estás seguro de que deseas eliminar la reunión "${reunion.tema}"? Esta acción no se puede deshacer.`);
    if (confirmacion) {
        // Eliminar la reunión
        reuniones.splice(index, 1);
        localStorage.setItem('reuniones', JSON.stringify(reuniones));
        cargarReuniones();
        alert('Reunión eliminada exitosamente.');
    }
}

window.onload = cargarReuniones;

function editarReunion() {
    alert('Funcionalidad de edición no implementada.');
}

function borrarReunion() {
    alert('Funcionalidad de borrado no implementada.');
}

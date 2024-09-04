function cargarReuniones() {
    const reuniones = JSON.parse(localStorage.getItem('reuniones')) || [];
    const reunionesList = document.getElementById('reunionesList');

    if (reuniones.length === 0) {
        reunionesList.innerHTML = '<p>No hay reuniones programadas.</p>';
        return;
    }

    reuniones.forEach((reunion) => {
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

window.onload = cargarReuniones;

function editarReunion() {
    alert('Funcionalidad de edición no implementada.');
}

function borrarReunion() {
    alert('Funcionalidad de borrado no implementada.');
}

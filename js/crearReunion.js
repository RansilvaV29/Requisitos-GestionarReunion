document.addEventListener('DOMContentLoaded', function() {
    const participantes = [
        'Juan', 'María', 'Luis', 'Ana', 'Carlos', 'Elena', 'Pedro', 'Sofía', 'Andrés'
    ];

    const participantesLista = document.getElementById('participantesLista');
    const buscadorParticipantes = document.getElementById('buscadorParticipantes');
    const mensajeNoEncontrado = document.createElement('p');
    mensajeNoEncontrado.textContent = 'No se encontró ningún participante.';
    mensajeNoEncontrado.style.display = 'none';
    participantesLista.appendChild(mensajeNoEncontrado);

    let seleccionados = new Set();

    function mostrarParticipantes(filtro = '') {
        participantesLista.innerHTML = '';
        participantesLista.appendChild(mensajeNoEncontrado);

        const participantesFiltrados = participantes.filter(participante =>
            participante.toLowerCase().includes(filtro.toLowerCase())
        );

        if (participantesFiltrados.length === 0) {
            mensajeNoEncontrado.style.display = 'block';
        } else {
            mensajeNoEncontrado.style.display = 'none';
            participantesFiltrados.forEach(participante => {
                const div = document.createElement('div');
                div.classList.add('participante');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = participante;
                checkbox.id = `participante_${participante}`;
                checkbox.checked = seleccionados.has(participante);

                const label = document.createElement('label');
                label.htmlFor = checkbox.id;
                label.textContent = participante;

                checkbox.addEventListener('change', function() {
                    if (this.checked) {
                        seleccionados.add(this.value);
                    } else {
                        seleccionados.delete(this.value);
                    }
                });

                div.appendChild(checkbox);
                div.appendChild(label);
                participantesLista.appendChild(div);
            });
        }
    }

    mostrarParticipantes();

    buscadorParticipantes.addEventListener('input', function() {
        mostrarParticipantes(buscadorParticipantes.value);
    });

    document.getElementById('selectAll').addEventListener('click', function() {
        document.querySelectorAll('#participantesLista input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = true;
            seleccionados.add(checkbox.value);
        });
    });

    document.getElementById('deselectAll').addEventListener('click', function() {
        document.querySelectorAll('#participantesLista input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
            seleccionados.delete(checkbox.value);
        });
    });

    document.getElementById('crearReunionForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const tema = document.getElementById('tema').value;
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;
        const objetivo = document.getElementById('objetivo').value;
        const tipo = document.getElementById('tipo').value;
        const area = document.getElementById('area').value;
        const participantesSeleccionados = Array.from(seleccionados);

        if (tema.length === 0 || tema.length > 30) {
            alert('El tema debe tener entre 1 y 30 caracteres.');
            return;
        }

        const now = new Date();
        const inputDate = new Date(fecha);

        // Validar formato de hora
        const horaParts = hora.split(':');
        if (horaParts.length !== 2 || !horaParts[1].includes('AM') && !horaParts[1].includes('PM')) {
            alert('Formato de hora incorrecto. Asegúrate de usar HH:MM AM/PM.');
            return;
        }

        const hour = parseInt(horaParts[0]);
        const minute = parseInt(horaParts[1].split(' ')[0]);
        const ampm = horaParts[1].split(' ')[1];

        let inputHour = hour;
        if (ampm === 'PM' && hour < 12) {
            inputHour += 12;
        } else if (ampm === 'AM' && hour === 12) {
            inputHour = 0;
        }

        const inputTime = new Date(inputDate);
        inputTime.setHours(inputHour);
        inputTime.setMinutes(minute);

        const startTime = new Date(inputDate);
        startTime.setHours(7, 0, 0);
        const endTime = new Date(inputDate);
        endTime.setHours(19, 0, 0);

        if (inputDate < now || inputTime < startTime || inputTime > endTime) {
            alert('La fecha debe ser posterior a la fecha actual y la hora debe estar entre 07:00 AM y 07:00 PM.');
            return;
        }

        if (objetivo.length === 0 || objetivo.length > 100) {
            alert('El objetivo debe tener entre 1 y 100 caracteres.');
            return;
        }

        const tiposValidos = ['por_area', 'general'];
        if (!tiposValidos.includes(tipo)) {
            alert('Tipo de reunión inválido.');
            return;
        }

        const areasValidas = ['iot', 'web', 'ia', 'ciber', 'general'];
        if (!areasValidas.includes(area)) {
            alert('Área inválida.');
            return;
        }

        if (participantesSeleccionados.length === 0) {
            alert('Debes seleccionar al menos un participante.');
            return;
        }

        // Crear objeto de reunión
        const reunion = {
            tema,
            fecha,
            hora,
            objetivo,
            tipo,
            area,
            participantes: participantesSeleccionados,
            codigoQR: '' // Para almacenar la URL del código QR
        };

        // Generar el código QR
        const detallesReunion = `Tema: ${tema}\nFecha: ${fecha}\nHora: ${hora}\nObjetivo: ${objetivo}\nTipo: ${tipo}\nÁrea: ${area}\nParticipantes: ${participantesSeleccionados.join(', ')}`;
        const qrCodeCanvas = document.createElement('canvas');
        $('#codigoQR').empty();
        $('#codigoQR').qrcode({
            text: detallesReunion,
            width: 300,
            height: 300,
            render: 'canvas',
            ecLevel: 'L',
            fill: '#000',
            background: '#fff',
            quiet: 1,
        });

       
// Esperar un momento para asegurarnos de que el canvas tenga el QR generado
setTimeout(() => {
    // Guardar el código QR como imagen
    reunion.codigoQR = $('#codigoQR canvas')[0].toDataURL();

    // Guardar la reunión en localStorage
    let reuniones = JSON.parse(localStorage.getItem('reuniones')) || [];
    reuniones.push(reunion);
    localStorage.setItem('reuniones', JSON.stringify(reuniones));

    alert('Reunión creada con éxito.');
}, 100); // Ajusta el tiempo si es necesario
        
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const participantes = [
        'Juan', 'María', 'Luis', 'Ana', 'Carlos', 'Elena', 'Pedro', 'Sofía', 'Andrés'
    ];
    
    const participantesLista = document.getElementById('participantesLista');
    
    participantes.forEach(participante => {
        const div = document.createElement('div');
        div.classList.add('participante');
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = participante;
        checkbox.id = `participante_${participante}`;
        
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = participante;
        
        div.appendChild(checkbox);
        div.appendChild(label);
        participantesLista.appendChild(div);
    });
    
    document.getElementById('selectAll').addEventListener('click', function() {
        document.querySelectorAll('#participantesLista input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = true;
        });
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
    const participantesSeleccionados = Array.from(document.querySelectorAll('#participantesLista input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

    // Validaciones
    if (tema.length === 0 || tema.length > 30) {
        alert('El tema debe tener entre 1 y 30 caracteres.');
        return;
    }

    const now = new Date();
    const inputDate = new Date(fecha);
    const inputTime = new Date(`1970-01-01T${hora}:00`);
    const startTime = new Date(`1970-01-01T07:00:00`);
    const endTime = new Date(`1970-01-01T19:00:00`);

    if (inputDate < now || inputTime < startTime || inputTime > endTime) {
        alert('La fecha debe ser posterior a la fecha actual y la hora debe estar entre 07:00 y 19:00.');
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

    alert('Reunión creada exitosamente.');
});

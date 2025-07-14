import { api } from './api.js'; // Implementa y exporta funciones de API en api.js
import { auth } from './auth.js'; // Implementa y exporta funciones de autenticación en auth.js
import { router } from './router.js'; // Importa el enrutador para redirigir después de acciones

// Muestra un mensaje de página no encontrada
export function renderNotFound() {
  document.getElementById('app').innerHTML = '<h2> Página no encontrada </h2>';
}

// Implementa la vista de login
export async function pageLogin() {
  document.getElementById('app').innerHTML = `
    <div class="login-container">
      <form id="form-login" class="login-form card">
        <h2 style="text-align:center; margin-bottom:1em;">Login</h2>
        <input type="email" id="email" placeholder="email">
        <input type="password" id="password" placeholder="password">
        <button> Entrar </button>
        <br>
        <a href="#/register" data-link> ¿No tienes cuenta? Regístrate </a>
      </form>
    </div>`;
  document.getElementById('form-login').onsubmit = async event => {
    event.preventDefault();
    try {
      await auth.login(event.target.email.value, event.target.password.value);
      location.hash = '#/dashboard';
      router();
    } catch (err) {
      alert(err.message);
    }
  };
}

// Implementa la vista de registro
export async function showRegister() {
  document.getElementById('app').innerHTML = `
    <div class="login-container">
      <form id="form-register" class="login-form card">
        <h2 style="text-align:center; margin-bottom:1em;"> Registro </h2>
        <input placeholder="nombre" id="name">
        <input placeholder="email" id="email">
        <label for="role"> Selecciona tu rol: </label>
        <select name="role" id="role">
            <option value="administrator"> Administrator </option>
            <option value="visitor"> Visitor </option>
        </select>
        <input placeholder="pass" id="password">
        <button> Registrar </button>
      </form>
    </div>`;
  document.getElementById('form-register').onsubmit = async event => {
    event.preventDefault();
    try {
      await auth.register(event.target.name.value, event.target.role.value, event.target.email.value, event.target.password.value);
      alert('Usuario registrado con éxito')
      location.hash = '#/dashboard';
      router();
    } catch (err) {
      alert(err.message);
    }
  };
}

// Implementa la vista principal del dashboard
export async function showDashboard() {
  const u = auth.getUser();
  document.getElementById('app').innerHTML = `
    <h2> Bienvenido, ${u.name} (${u.role})</h2>
    <button id="out"> Salir </button>
    <nav>
      <a href="#/dashboard/events" data-link> Ver eventos </a>
      ${u.role === 'administrator' ? `<a href="#/dashboard/events/create" data-link> Create event </a>` : ''}
    </nav>`;
  document.getElementById('out').onclick = () => {
    auth.logout();
    location.hash = '#/login';
  };
  document.querySelectorAll('[data-link]').forEach(a => {
    a.onclick = e => {
      e.preventDefault();
      location.hash = a.getAttribute('href');
    };
  });
}

// Implementa la vista de listado de cursos
export async function showEvents() {
  const user = auth.getUser();
  const events = await api.get('/events');

  document.getElementById('app').innerHTML = `
    <h2> Eventos disponibles </h2>
    ${user.role === 'administrator' ? `<button onclick="createEvents(${events.id})"> Create </button>` : ''}
    <ul>${events.map( event => `
      <li>${event.topic || 'No topic '} (${event.capacity || 0} cupos) — Place: ${event.place || 'N/A'} — Date: ${event.date || 'No asignada...'} — Hour: ${event.hour || 'No asignada...'}
        ${user.role === 'administrator' ? `<button onclick="editEvents(${event.id})"> Edit </button>` : ''}
        ${user.role === 'visitor' ? `<button class="enroll-btn" data-id="${event.id}"> Inscribirse </button>` : ''}
      </li>`).join('')}
      
    </ul>`;

  if (user.role === 'visitor') {
    document.querySelectorAll('.enroll-btn').forEach(btn => {
      btn.onclick = async () => {
        const eventId = btn.dataset.id;

        // Obtener curso actual
        const event = await api.get('/events/' + eventId);

        // Evitar doble inscripción
        if (event.enrolled.includes(user.email)) {
          alert('Ya estás inscrito en este curso.');
          return;
        }

        let capacity = event.capacity-1;

        // Verificar capacidad
        if (event.enrolled.length >= event.capacity) {
          alert('Este evento ya está lleno.');
          return;
        }

        event.enrolled.push(user.email);
        event.capacity = capacity;

        await api.put('/events/' + eventId, event);
        alert('Inscripción exitosa!');
        showEvents(); // recargar lista
      };
    });
  }
}

// Implementa la vista para crear un curso (solo admin)
export function showCreateEvents() {
  document.getElementById('app').innerHTML = `
    <h2> Crear Evento </h2>
    <form id="form-create-event">
      <input placeholder="Topic" id="topic">
      <input placeholder="Place" id="place">
      <input type="number" placeholder="Capacidad" id="capacity">
      <input type="date" placeholder="Date" id="date">
      <input type="time" placeholder="Hour" id="hour">
      <button> Guardar </button>
    </form>`;
  document.getElementById('form-create-event').onsubmit = async event => {
    event.preventDefault();
    const data = {
      topic: event.target.topic.value,
      place: event.target.place.value,
      capacity: parseInt(event.target.capacity.value),
      date: event.target.date.value,
      hour: event.target.hour.value
    };
    await api.post('/events', data);
    location.hash = '#/dashboard/events';
    router();
  };
}

// Implementa la vista para editar un curso (solo admin)
export async function showEditEvents() {
  const user = auth.getUser();
  if (user.role !== 'administrator') {
    renderNotFound();
    return;
  }

  const eventId = location.hash;
  const event = await api.get('/events/' + eventId);

  if (!event) {
    renderNotFound();
    return;
  }

  document.getElementById('app').innerHTML = `
    <h2> Editar Curso </h2>
    <form id="form-edit-event">
      <input id="title" placeholder="Topic" value="${event.topic}">
      <input id="place" placeholder="Place" value="${event.place}">
      <input type="number" id="capacity" placeholder="Capacidad" value="${event.capacity}">
      <input type="date" id="date" placeholder="Date" value="${event.date}">
      <input type="time" id="hour" placeholder="Hour" value="${event.hour}">
      <button> Guardar </button>
    </form>`;

  document.getElementById('form-edit-event').onsubmit = async event => {
    event.preventDefault();
    const updated = {
      topic: event.target.topic.value,
      place: event.target.place.value,
      capacity: parseInt(event.target.capacity.value),
      date: event.target.date.value,
      hour: event.target.hour.value
    };

    await api.put('/events/' + eventId, updated);
    location.hash = '#/dashboard/events';
    router();
    alert('Evento creado/editado exitosamente.');
  };
}
// Importa los módulos necesarios
import { auth } from './auth.js';
import {
  pageLogin, // Implementa en views.js
  showRegister, // Implementa en views.js
  showDashboard, // Implementa en views.js
  showEvents, // Implementa en views.js
  showCreateEvents, // Implementa en views.js
  showEditEvents, // Implementa en views.js
  renderNotFound // Implementa en views.js
} from './views.js';

// Define aquí las rutas de tu SPA
const routes = {
  '#/login': pageLogin, // Vista de login
  '#/register': showRegister, // Vista de registro
  '#/dashboard': showDashboard, // Vista principal tras login
  '#/dashboard/events': showEvents, // Listado de cursos
  '#/dashboard/events/create': showCreateEvents, // Formulario para crear curso
  '#/dashboard/events/edit': showEditEvents, // Formulario para editar curso
};

// Función principal de enrutamiento
export function router() {
  const path = location.hash || '#/login';
  const user = auth.getUser();

  // Ejemplo: proteger rutas de dashboard
  if (path.startsWith('#/dashboard') && !auth.isAuthenticated()) {
    location.hash = '#/login';
    return;
  }

  // Ejemplo: evitar que usuarios logueados accedan a login/register
  if ((path === '#/login' || path === '#/register') && auth.isAuthenticated()) {
    location.hash = '#/dashboard';
    return;
  }

  // Ejemplo: ruta dinámica para editar curso
  if (path.startsWith('#/dashboard/events/edit/')) {
    showEditEvents(); // Implementa esta función en views.js
    return;
  }

  // Cargar la vista correspondiente
  const view = routes[path];
  if (view) {
    view();
  } else {
    renderNotFound(); // Implementa esta función en views.js
  }
}


import { auth } from './auth.js';
import {
    pageLogin, // Implement in views.js
    showRegister, // Implement in views.js
    showDashboard, // Implement in views.js
    showEvents, // Implement in views.js
    showCreateEvents, // Implement in views.js
    showEditEvents, // Implement in views.js
    renderNotFound // Implement in views.js
} from './views.js';

//spa routes
const routes = {
  '#/login': pageLogin, // Login view
  '#/register': showRegister, // Registry view
  '#/dashboard': showDashboard, // Main view after login
  '#/dashboard/events': showEvents, // List of events
  '#/dashboard/events/create': showCreateEvents, // Form to create event
  '#/dashboard/events/edit': showEditEvents, // Form to edit event
};

// Main routing function
export function router() {
  const path = location.hash || '#/login';
  const user = auth.getUser();

  // protect dashboard routes
  if (path.startsWith('#/dashboard') && !auth.isAuthenticated()) {
    location.hash = '#/login';
    return;
  }

  //Prevent logged-in users from accessing login/register
  if ((path === '#/login' || path === '#/register') && auth.isAuthenticated()) {
    location.hash = '#/dashboard';
    return;
  }

  // dynamic route to edit course
  if (path.startsWith('#/dashboard/events/edit/')) {
    showEditEvents(); 
    return;
  }

  // Load the corresponding view
  const view = routes[path];
  if (view) {
    view();
  } else {
    renderNotFound(); 
  }
}

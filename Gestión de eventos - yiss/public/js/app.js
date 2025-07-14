import './api.js'; // Implementa la API en js/api.js
import './auth.js'; // Implementa la autenticación en js/auth.js
import { router } from './router.js'; // Implementa el enrutador en js/router.js

// Inicializa el enrutador al cargar la página y al cambiar el hash
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);

import './api.js'; // Implement the API in js/api.js
import './auth.js'; // Implement authentication in js/auth.js
import { router } from './router.js'; // Implement the router in js/router.js

// Initializes the router on page load and when the hash changes
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('hashchange', router);

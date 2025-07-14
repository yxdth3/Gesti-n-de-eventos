import { api } from './api.js'; // Implement and export API functions in api.js

export const auth = {
    // Implements the login function
  login: async (email, password) => {
    // Query the API to find the user by email
    // If the password matches, save the user to localStorage
    // Throw an error if the credentials are invalid
    const users = await api.get(`/users?email=${email}`);
    if (users.length === 0 || users[0].password !== password) {
      throw new Error('Invalid credentials');
    }
    const user = users[0];
    localStorage.setItem('user', JSON.stringify(user)); // Save the user to localStorage
  },
    // Implements the logging function
  register: async (name, role, email, password) => {
    // Query the API to see if the email already exists
    // If it doesn't exist, register the user and save it to localStorage
    const existingUser = await api.get(`/users?email=${email}`);
    if (existingUser.length > 0) {
      throw new Error('The email is already registered');
    }
    const newUser = { name, role ,email, password: password };
    await api.post('/users', newUser); // Register the new user
  },
    // Implements the logout function
  logout: () => {
    //Delete the user from localStorage and redirect to login
    localStorage.removeItem('user'); // Delete the saved user
  },
    // Returns true if there is an authenticated user
  isAuthenticated: () => {
    // // Returns true if there is a user in localStorage
    return !!localStorage.getItem('user'); 
  },
    // Returns the authenticated user
  getUser: () => {
    // Returns the user saved in localStorage (or null)
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null; 
   
  }
};

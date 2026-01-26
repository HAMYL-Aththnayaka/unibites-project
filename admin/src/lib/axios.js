/**
 * Axios Instance Configuration
 * Purpose: Centralizes API logic to make code cleaner and easier to maintain.
 * Usage: Import this 'api' instance instead of the global 'axios' library.
 */

import axios from 'axios'

const api = axios.create({
    // The base URL for all your backend endpoints. 
    // This allows you to write api.get('/foods/list') instead of the full URL.
    baseURL: "http://localhost:3000/api"
})

export default api
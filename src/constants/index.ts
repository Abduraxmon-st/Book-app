export const DOMAIN = import.meta.env.VITE_PUBLIC_API_URL
export const API_KEY = import.meta.env.VITE_PUBLIC_API_KEY
export const SEARCH_BOOKS = `${DOMAIN}/search-books?api-key=${API_KEY}`
export const SEARCH_AUTHORS = `${DOMAIN}/search-authors?api-key=${API_KEY}`
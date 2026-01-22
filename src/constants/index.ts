export const DOMAIN = import.meta.env.VITE_PUBLIC_API_URL
export const API_KEY = import.meta.env.VITE_PUBLIC_API_KEY
export const API_KEY_2 = import.meta.env.VITE_PUBLIC_API_KEY_2
export const API_KEY_3 = import.meta.env.VITE_PUBLIC_API_KEY_3

export const SEARCH_BOOKS = `${DOMAIN}/search-books?api-key=${API_KEY}`
export const SEARCH_AUTHORS = `${DOMAIN}/search-authors?api-key=${API_KEY}`

export const SEARCH_BOOKS_2 = `${DOMAIN}/search-books?api-key=${API_KEY_2}`
export const SEARCH_AUTHORS_2 = `${DOMAIN}/search-authors?api-key=${API_KEY_2}`

export const SEARCH_BOOKS_3 = `${DOMAIN}/search-books?api-key=${API_KEY_3}`
export const SEARCH_AUTHORS_3 = `${DOMAIN}/search-authors?api-key=${API_KEY_3}`
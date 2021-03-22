const API_URL = "https://jsonplaceholder.typicode.com/photos";

export async function fetchImages(page: number, limit: number) {
  try {
    const response = await fetch(`${API_URL}?_page=${page}_limit=${limit}`)
    return response.ok ? await response.json() : []
  } catch (e) {
    return []
  }
}
const API_URL = 'https://jsonplaceholder.typicode.com/users'

export async function fetchCoaches(breakUrl = false) {
  const url = breakUrl ? 'https://jsonplaceholder.typicode.com/users-wrong' : API_URL
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch coaches: ' + res.status)
  }
  return res.json()
}

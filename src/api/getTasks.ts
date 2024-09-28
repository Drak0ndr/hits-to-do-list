import { url } from '../consts/url'

export const getTasks = async (): Promise<task[]> => {
  const data = await fetch(`${url}/tasks`).then((responce) => responce.json())
  return data
}

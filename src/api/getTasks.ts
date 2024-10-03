import { url } from '../consts/url'
import { CapacitorHttp } from '@capacitor/core'

export const getTasks = async (): Promise<task[]> => {
  // const data = await fetch(`${url}/tasks`).then((responce) => responce.json())
  const data = await CapacitorHttp.get({ url: `${url}/tasks` }).then((responce) => responce.data)
  return data
}

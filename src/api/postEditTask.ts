import { url } from '../consts/url'

export const postEditTask = async (id: number, name?: string, isComplete?: 0 | 1) => {
  const data: {id: number,  name: string | undefined; isComplete: 0 | 1 | undefined } = {
    id: id,
    name: name,
    isComplete: isComplete
  }
  const ans = await fetch(`${url}/edit`, {
    method: 'POST',
    body: JSON.stringify(data)
  }).then((res) => res.text())
  return ans
}

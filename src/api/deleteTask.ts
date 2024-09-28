import { url } from '../consts/URL'

export const deleteTask = async (id: number) => {
  const ans = await fetch(`${url}/delete?id=${id}`, { method: 'DELETE' }).then((res) =>
    res.text()
  )
  console.log(id, ans)
  return ans
}

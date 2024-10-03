import { url } from '../consts/url'
import { CapacitorHttp } from '@capacitor/core'

export const deleteTask = async (id: number) => {
  // const ans = await fetch(`${url}/delete?id=${id}`, { method: 'DELETE' }).then((res) =>
  //   res.text()
  // )
  const ans = await (await CapacitorHttp.delete({url: `${url}/delete?id=${id}`})).data
  console.log(id, ans)
  return ans
}

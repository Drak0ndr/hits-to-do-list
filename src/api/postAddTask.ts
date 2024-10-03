import { url } from '../consts/url'
import { CapacitorHttp } from '@capacitor/core'

export const postAddTask = async (taskName: string) => {
  // const ans = await fetch(`${url}/delete?id=${id}`, { method: 'DELETE' }).then((res) =>
  //   res.text()
  // )
  const ans = await CapacitorHttp.post({
    url: `${url}/add?name=${taskName}`,
    data: JSON.stringify({ name: taskName }),
  })

  return ans
}

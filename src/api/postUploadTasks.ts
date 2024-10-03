import { url } from '../consts/url'
import { CapacitorHttp } from '@capacitor/core'

export const postUploadTasks = async (task: string | ArrayBuffer | null) => {
  // const ans = await fetch(`${url}/delete?id=${id}`, { method: 'DELETE' }).then((res) =>
  //   res.text()
  // )
  const ans = await CapacitorHttp.post({
    url: `${url}/upload`,
    data: task,
    headers: { 'Content-Type': 'application/json' }
  })

  return ans
}

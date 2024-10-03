import { url } from '../consts/url'
import { CapacitorHttp } from '@capacitor/core'

export const postEditTask = async (id: number, name?: string, isComplete?: 0 | 1) => {
  const data: { id: number; name: string | undefined; isComplete: 0 | 1 | undefined } = {
    id: id,
    name: name,
    isComplete: isComplete
  }
  // const ans = await fetch(`${url}/edit`, {
  //   method: 'POST',
  //   body: JSON.stringify(data)
  // }).then((res) => res.text())
  console.log('-------------------------------------- ')
  console.log(data, JSON.stringify(data))
  console.log('-------------------------------------- ')
  const ans = await CapacitorHttp.post({
    url: `${url}/edit?name=${name}&isComplete=${isComplete}&id=${id}`,
    data: JSON.stringify(data)
  })
  return ans
}

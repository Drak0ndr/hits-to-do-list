import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'

import { RefObject } from 'react'

export const saveTasks = (ref: RefObject<HTMLAnchorElement>) => {
  const file = new Blob([localStorage.getItem('tasks') as string], {
    type: 'application/JSON'
  })

  ref.current!.href = URL.createObjectURL(file)
  ref.current!.download = `tasks ${new Date()}`
  const id = new Date()
  // const createDir = async() => {
  //   const test = await Filesystem.writeFile({
  //     path: `todo/test.txt`,
  //     data: 'is data',
  //     directory: Directory.Documents,
  //     encoding: Encoding.UTF8,
  //     recursive: true
  //   })
  //   console.log(test)
  // }

  // createDir()

  const writeFile = async () => {
    const test = await Filesystem.writeFile({
      path: `todo/tasks${id.getTime().toString()}.json`,
      data: localStorage.getItem('tasks') as string,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
      recursive: true
    })
    console.log(test)
  }

  writeFile()
}

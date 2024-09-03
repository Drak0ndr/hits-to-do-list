import { RefObject } from "react"

export const saveTasks = (ref: RefObject<HTMLAnchorElement>) => {
  const file = new Blob([localStorage.getItem('tasks') as string], {
    type: 'application/JSON'
  })

  ref.current!.href = URL.createObjectURL(file)
  ref.current!.download = `tasks ${new Date()}`
}

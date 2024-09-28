import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import { getTasks } from '../api/getTasks'

export const saveTasks = async () => {
  const tasks = await getTasks()
  const data: { name: string; isComplete: boolean }[] = []
  tasks.forEach((item) => {
    data.push({ name: item.name, isComplete: item.isComplete })
  })
  const file = new Blob([JSON.stringify(data)], {
    type: 'application/JSON'
  })
  const id = new Date()

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
  const link = document.createElement('a')
  link.href = URL.createObjectURL(file)
  link.download = `tasks ${new Date()}`
  link.click()
}

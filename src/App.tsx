import { Box, Button, Card, Container, FileButton, Input, Text } from '@mantine/core'

import { IconDownload, IconUpload } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { Task } from './components/Task/Task'

import '@mantine/core/styles.css'
import styles from './App.module.css'
import { getTasks } from './utils/getTasks'
import { saveTasks } from './utils/saveTasks'

export const App = () => {
  const [file, setFile] = useState<File | null>()
  const [newTaskName, setNewTaskName] = useState('')
  const [tasks, setTasks] = useState(getTasks() ?? [])
  const download = useRef<HTMLAnchorElement>(null)

  const deleteTask = (id: number) => {
    const temp = [...tasks]
    temp.splice(id, 1)
    setTasks(temp)
    localStorage.setItem('tasks', JSON.stringify(temp))
  }

  const renameTask = (id: number, taskName: string) => {
    tasks[id].name = taskName
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  const addTask = () => {
    if (newTaskName) {
      const temp = [...tasks]
      temp.unshift({ complete: false, name: newTaskName })
      setTasks(temp)
      localStorage.setItem('tasks', JSON.stringify(temp))
      setNewTaskName('')
    }
  }

  const changeStatusTask = (id: number, status: boolean) => {
    tasks[id].complete = status
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  useEffect(() => {
    if (file) {
      setTasks([])
      const reader = new FileReader()
      reader.readAsText(file)

      reader.onload = () => {
        localStorage.setItem('tasks', reader.result as string)
        setTasks(JSON.parse(reader.result as string))
      }
    }
  }, [file])

  useEffect(() => {
    console.log(tasks)
  }, [tasks])

  return (
    <Container maw="1200px" mt="20px">
      <Box className={styles.header}>
        <FileButton onChange={setFile} accept="application/JSON">
          {(props) => (
            <Button className={styles.btn} rightSection={<IconUpload size={14} />} {...props}>
              Upload
            </Button>
          )}
        </FileButton>
        <a ref={download} onClick={() => saveTasks(download)}>
          <Button className={styles.btn} rightSection={<IconDownload size={14} />}>
            Download
          </Button>
        </a>
      </Box>

      <Box className={styles.main}>
        <Card className={styles.add} withBorder>
          <Input
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.currentTarget.value)}
            w="100%"
            variant="unstyled"
            placeholder="Введите название таски"
          />
          <Button onClick={addTask} w="150px" className={styles.btn} color="green">
            Add
          </Button>
        </Card>

        {tasks.length == 0 && <Text ta="center">Тут могли бы быть ваши таски</Text>}
        {tasks.map((item, index) => (
          <Task
            key={item.name}
            id={index}
            complete={item.complete}
            taskName={item.name}
            del={deleteTask}
            rename={renameTask}
            changeStatus={changeStatusTask}
          />
        ))}
      </Box>
    </Container>
  )
}

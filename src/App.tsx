import { Box, Button, Card, Container, FileButton, Input, Text } from '@mantine/core'

import { IconDownload, IconUpload } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { Task } from './components/Task/Task'

import '@mantine/core/styles.css'
import styles from './App.module.css'
import { saveTasks } from './utils/saveTasks'
import { url } from './consts/url'
import { getTasks } from './api/getTasks'
import { deleteTask } from './api/deleteTask'
import { postEditTask } from './api/postEditTask'

export const App = () => {
  const [file, setFile] = useState<File | null>()
  const [newTaskName, setNewTaskName] = useState('')
  const [tasks, setTasks] = useState<task[]>([])
  const download = useRef<HTMLAnchorElement>(null)
  console.log(tasks)
  let oldUpdate = new Date().getTime()

  useEffect(() => {
    getTasks().then((data) => {
      setTasks(data)
    })
  }, [])

  const delTask = (id: number) => {
    // const temp = [...tasks]
    // temp.splice(id, 1)
    // setTasks(temp)
    // localStorage.setItem('tasks', JSON.stringify(temp))
    console.log(id)
    deleteTask(id).then((responce) => {
      console.log(responce)
      getTasks().then((data) => {
        setTasks(data)
        oldUpdate = new Date().getTime()
      })
    })
  }

  const renameTask = (id: number, taskName: string) => {
    // tasks[id].name = taskName
    // localStorage.setItem('tasks', JSON.stringify(tasks))
    postEditTask(id, taskName).then((res) => {
      console.log(res)
      oldUpdate = new Date().getTime()
      console.log(new Date().getTime() - oldUpdate)
    })
  }

  const addTask = () => {
    if (newTaskName) {
      // const temp = [...tasks]
      // temp.unshift({ isComplete: false, name: newTaskName })
      // setTasks(temp)
      // localStorage.setItem('tasks', JSON.stringify(temp))
      fetch(`${url}/add`, {
        method: 'POST',
        body: JSON.stringify({ name: newTaskName })
      }).then(() =>
        getTasks().then((data) => {
          setTasks(data)
          oldUpdate = new Date().getTime()
        })
      )
      setNewTaskName('')
    }
  }

  const changeStatusTask = (id: number, status: boolean) => {
    // tasks[id].isComplete = status
    // localStorage.setItem('tasks', JSON.stringify(tasks))
    postEditTask(id, undefined, status ? 1 : 0).then((res) => {
      console.log(res)
      oldUpdate = new Date().getTime()
    })
  }

  useEffect(() => {
    if (file) {
      setTasks([])
      const reader = new FileReader()
      reader.readAsText(file)

      reader.onload = () => {
        fetch(`${url}/upload`, { method: 'POST', body: reader.result }).then(() => {
          getTasks().then((data) => {
            setTasks(data)
            oldUpdate = new Date().getTime()
          })
        })
      }
    }
  }, [file])

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
        <a ref={download} onClick={saveTasks}>
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
        {tasks.map((item) => (
          <Task
            key={item.name}
            id={item.id}
            complete={item.isComplete}
            taskName={item.name}
            del={delTask}
            rename={renameTask}
            changeStatus={changeStatusTask}
          />
        ))}
      </Box>
    </Container>
  )
}

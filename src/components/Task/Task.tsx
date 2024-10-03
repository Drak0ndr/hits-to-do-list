import { Button, Card, Checkbox, Input } from '@mantine/core'

import styles from './Task.module.css'
import { useEffect, useState } from 'react'
import { postEditTask } from '../../api/postEditTask'
import { getTasks } from '../../api/getTasks'

interface props {
  id: number
  complete: boolean
  taskName: string
  del: (id: number) => void
}

export const Task = ({ id, complete, taskName, del }: props) => {
  const [name, setName] = useState(taskName)
  const [isComplete, setIsComplete] = useState(complete)
  // console.log(isComplete, name)
  useEffect(() => {
    postEditTask(id, name)
    console.log('post log', name)
  }, [name])

  useEffect(() => {
    postEditTask(id, undefined, isComplete ? 1 : 0)
    console.log('post log', isComplete)
  }, [isComplete])

  useEffect(() => {
    setInterval(() => {
      getTasks().then((res) => {
        res.forEach((item) => {
          if (item.id == id) {
            setName(item.name)
            setIsComplete(item.isComplete)
          }
        })
      })
    }, 500)
  }, [id, complete, taskName])

  return (
    <Card className={styles.task} withBorder>
      <Checkbox checked={isComplete} onChange={(e) => setIsComplete(e.currentTarget.checked)} />
      <Input
        className={styles.name}
        variant="unstyled"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        disabled={isComplete ? true : false}
      />
      <Button className={styles.btn} onClick={() => del(id)}>
        Delete
      </Button>
    </Card>
  )
}

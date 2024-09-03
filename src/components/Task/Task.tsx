import { Button, Card, Checkbox, Input } from '@mantine/core'

import styles from './Task.module.css'
import { useEffect, useState } from 'react'

interface props {
  id: number
  complete: boolean
  taskName: string
  del: (id: number) => void
  rename: (id: number, name: string) => void
  changeStatus: (id: number, status: boolean) => void
}

export const Task = ({ id, complete, taskName, del, rename, changeStatus }: props) => {
  const [name, setName] = useState(taskName)
  const [isComplete, setIsComplete] = useState(complete)
  console.log(isComplete, name)
  useEffect(() => {
    rename(id, name)
  }, [name])

  useEffect(() => {
    changeStatus(id, isComplete)
  }, [isComplete])

  // useEffect(() => {
  //   console.log(isComplete, name)
  // })

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

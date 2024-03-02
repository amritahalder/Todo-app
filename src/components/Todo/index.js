import { useState } from 'react';
import TodoItem from './TodoItem';

const Todo = () => {
  const [value, setValue] = useState('')
  const [taskList, setTaskList] = useState([])

  const handleValue = (e) => {
    setValue(e.target.value)
  }

  const handleAddTask = () => {
    const taskListCopy = [...taskList]
    taskListCopy.push({
      id:new Date().getTime(),
      value: value
    })
    setTaskList(taskListCopy)
    setValue('')
    console.log(taskListCopy)
  }
  const handleDeleteAllTask = () => {
    setTaskList([])
  }

  return (
    <div className='content'>
      <div className='container'>
        <div className='main_content'>
          <div className='heading'>
            <h1>TO DO List</h1>
          </div>
          <div className='input_part'>
            <div className='enterTask'>
              <input type='text' placeholder='Enter a task' value={value} onChange={handleValue}/>
            </div>
            <div className='addTask_btn'>
              <button type='button' onClick={handleAddTask}>Add Task</button>
              {taskList.length >= 2 ? <button type='button' onClick={handleDeleteAllTask}>Delete All Task</button> : ""}
            </div>
          </div>
          <div>
            <h3>
              {taskList.length === 0 && "No task"} 
            </h3>
          </div>
          {taskList?.map(todoObj => (
            <TodoItem
              key={todoObj.id}
              taskList={taskList}
              setTaskList={setTaskList}
              todoObj={todoObj}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Todo;
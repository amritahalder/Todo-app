import { useState, useRef, useEffect } from 'react';

const TodoItem = ({ taskList, setTaskList, todoObj }) => {
  const [taskToEdit, setTaskToEdit] = useState(null)
  const [value2, setValue2] = useState('')
  const inputText = useRef(null);

  const handleUpdateTask = () => {
    let taskListCopy = [...taskList];
    taskListCopy = taskListCopy.map(ele => {
      if (ele.id === taskToEdit.id) {
        ele.value = value2
      }
      return ele;
    })
    console.log(taskListCopy)
    setTaskList(taskListCopy) 
    setTaskToEdit(null)
  }

  const handleEdit = (el) => {
    setValue2(el.value)
    setTaskToEdit(el)
  }
  const handleValue2 = (e) => {
    setValue2(e.target.value)
  }

  const handleDelete = (el) => {
    let taskListCopy = [...taskList]
    taskListCopy = taskListCopy.filter(ele => {
      return ele.id !== el.id
    })
    setTaskList(taskListCopy)
  }

  const handleDone = (e, el) => {
    let taskListCopy = [...taskList]
    taskListCopy = taskListCopy.map(ele => {
      if(ele.id === el.id) {
        ele.done = e.target.checked;
      }

      return ele;
    })
    console.log(taskListCopy)
    setTaskList(taskListCopy)
  }

  useEffect(() => {
    if (taskToEdit) {
      inputText.current.focus();
    }
  }, [taskToEdit])

  return (
    <div key={todoObj.id} className={todoObj.done ? 'outerPart_taskBox' : ''}>
      <div className='task_box flex'>
        <div className='left_part flex-1'>
          <input type="checkbox" disabled={taskToEdit ? true : false} checked={todoObj.done} onChange={(e) => handleDone(e, todoObj)}/>
          {taskToEdit ? (
            <input type='text' onChange={handleValue2} value={value2} ref={inputText} />
          ) : (
            <p onClick={() => handleEdit(todoObj)}>{todoObj.value}</p>
          )}
        </div>
        <div className='clickable_btn flex'>
        {!todoObj.done &&  
        <>
          {taskToEdit ? ( 
            <button type='button' onClick={() => handleUpdateTask(todoObj)}>Update Task</button>) : 
            <button type='button' onClick={() => handleEdit(todoObj)} className='outerPart_taskBox'>Edit</button>
          } 
        </>}
          <button type='button' onClick={() => handleDelete(todoObj)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default TodoItem;
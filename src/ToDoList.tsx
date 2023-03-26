import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterValuesType} from "./App";
// rsc  - создание шаблона переноса константы

type ToDoListPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTodoListFilter: (filter: FilterValuesType) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
    addTask: (title: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}


const ToDoList: FC<ToDoListPropsType> = (props) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    /*const addTaskInputRef = useRef<HTMLInputElement>(null)*/

    let isAllTasksNotIsDone = true // все не выполенные
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }
    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"

    const todoListItems: Array<JSX.Element> = props.tasks.map((task) => {
        const removeTaskHandler = () => props.removeTask(task.id)
        const changeTasksStatus = (e: ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(task.id, e.currentTarget.checked)}
        return (
            <li>
                <input
                    onChange={changeTasksStatus}
                    type="checkbox"
                    checked={task.isDone}/>
                <span className={task.isDone ? "task-done" : "task"}>{task.title}</span>
                <button onClick={removeTaskHandler}>x
                </button>
            </li>
        )
    })

    const maxTitleLength = 20
    const recommendedTittleLength = 10

    const isAddTaskNotPossible: boolean = !title.length || title.length > maxTitleLength || error

    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle){
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")


        /* if(addTaskInputRef.current){
             props.addTask(addTaskInputRef.current.value)
             addTaskInputRef.current.value = ""
         }*/
    }
    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTaskHandler = isAddTaskNotPossible
        ? undefined
        : (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTaskHandler()

    const longTitleWarningMessage = (title.length > recommendedTittleLength && title.length <= maxTitleLength) &&
        <div style={{color: "white"}}>Title should be shorter</div>
    const longTitleErrorMessage = title.length > maxTitleLength &&
        <div style={{color: "red"}}>Title is too long!!!</div>
    const errorMessage = error &&
        <div style={{color: "hotpink"}}>Title is hard required</div>


    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder={"Enter task title, please"}
                    value={title}
                    onChange={setLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskHandler}
                    className={error ? "input-error" : ""}
                />
                {/*// currentTarget === input*/}
                <button
                    disabled={isAddTaskNotPossible}
                    onClick={addTaskHandler}
                >+</button>
                {longTitleWarningMessage}
                {longTitleErrorMessage}
                {errorMessage}
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button
                    className={props.filter === "all" ? "btn-active" : ""}
                    onClick={() => {
                    props.changeTodoListFilter("all")
                }}
                >All
                </button>
                <button
                    className={props.filter === "active" ? "btn-active" : ""}
                    onClick={() => {
                    props.changeTodoListFilter("active")
                }}
                >Active
                </button>
                <button
                    className={props.filter === "completed" ? "btn-active" : ""}
                    onClick={() => {
                    props.changeTodoListFilter("completed")
                }}
                >Completed
                </button>
            </div>
        </div>
    );
};

export default ToDoList;
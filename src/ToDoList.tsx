import React, {FC} from 'react';
import {TasksType} from "./App";
// rsc  - создание шаблона переноса константы

type ToDoListPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: number) => void
}
const ToDoList: FC<ToDoListPropsType> = (props) => {
    let isAllTasksNotIsDone = true // все не выполенные
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }

    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"

    const todoListItems: Array<JSX.Element> = props.tasks.map((task) => {
        return (
            <li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={()=>{props.removeTask(task.id)}}>x</button>
            </li>
        )
    })

    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default ToDoList;
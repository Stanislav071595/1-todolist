import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed"

function App(): JSX.Element {
    console.log(v1())

    const [tasks, setTasks] = useState<Array<TaskType>>([
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "ES6&TS", isDone: true},
            {id: v1(), title: "ES6&TS", isDone: false},
            {id: v1(), title: "REDUX", isDone: false}
        ]
    )

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter((task) => task.id !== taskId))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(), title: title, isDone: false
        }
        setTasks([newTask, ...tasks])
    }


    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    let tasksForRender: Array<TaskType> = []
    if (filter === "all") {
        tasksForRender = tasks
    }
    if (filter === "active") {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForRender = tasks.filter(t => t.isDone === true)
    }


    /*    const tasks1: TasksType[] = [
            {id: 1, title: "HTML & CSS", isDone: true},
            {id: 2, title: "CSS & SCSS", isDone: false},

        ]
        const tasks2: TasksType[] = [
            {id: 1, title: "HTML & CSS", isDone: false},
            {id: 2, title: "CSS & SCSS", isDone: false},
            {id: 3, title: "ES6&TS", isDone: false},
            {id: 4, title: "REDUX", isDone: false}
        ]*/

    return (
        <div className="App">
            <ToDoList
                removeTask={removeTask}
                title={"What to learn"}
                tasks={tasksForRender}
                addTask={addTask}
                changeTodoListFilter={changeTodoListFilter}
            />


            {/*            <ToDoList
                title={"What to buy"}
                tasks={tasks1}
            />
            <ToDoList
                title={"What to read"}
                tasks={tasks2}
            />*/}
        </div>
    );
}

export default App;

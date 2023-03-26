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
    const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t))
    }


    const [filter, setFilter] = useState<FilterValuesType>("all")

    const changeTodoListFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }



    const getFilteredTasksForRender = (tasksList:Array<TaskType>, filterValue: FilterValuesType ) => {
        switch (filterValue) {
            case "active":
                return tasksList.filter(t => !t.isDone)
            case "completed":
                return tasksList.filter(t => t.isDone)
            default:
                return tasksList
        }

    }
    const tasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks, filter)

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
                filter={filter}
                tasks={tasksForRender}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
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

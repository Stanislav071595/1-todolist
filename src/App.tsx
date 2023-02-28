import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TasksType = {
    id: number
    title: string
    isDone: boolean

}


function App(): JSX.Element {
    const tasks: TasksType[] = [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "CSS & SCSS", isDone: true},
        {id: 3, title: "ES6&TS", isDone: true}
    ]
    const tasks1: TasksType[] = [
        {id: 1, title: "HTML & CSS", isDone: true},
        {id: 2, title: "CSS & SCSS", isDone: true},
        {id: 3, title: "ES6&TS", isDone: false}
    ]
    const tasks2: TasksType[] = [
        {id: 1, title: "HTML & CSS", isDone: false},
        {id: 2, title: "CSS & SCSS", isDone: false},
        {id: 3, title: "ES6&TS", isDone: false}
    ]

    return (
        <div className="App">
            <ToDoList
                title={"What to learn"}
                tasks={tasks}
            />
            <ToDoList
                title={"What to buy"}
                tasks={tasks1}
            />
            <ToDoList
                title={"What to read"}
                tasks={tasks2}
            />
        </div>
    );
}

export default App;

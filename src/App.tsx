import React, {useState} from 'react';
import './App.css';
import ToDoList from "./ToDoList";

export type TasksType = {
    id: number
    title: string
    isDone: boolean

}


function App(): JSX.Element {
    const [tasks, setTasks] = useState<Array<TasksType>>([
            {id: 1, title: "HTML & CSS", isDone: true},
            {id: 2, title: "ES6&TS", isDone: true},
            {id: 3, title: "ES6&TS", isDone: false},
            {id: 4, title: "REDUX", isDone: false}
        ]
    )

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter((task)=> task.id !== taskId))
    }
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
    let tasksForRender: Array<TasksType> = []
    if(filter === "all") {
        tasksForRender = tasks
    }
    if(filter === "active") {
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if(filter === "completed") {
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

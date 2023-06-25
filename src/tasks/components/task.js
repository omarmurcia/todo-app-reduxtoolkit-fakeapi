import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, getTask, completeTask, fetchTasks } from "../actions";
import { Button } from "react-bootstrap";

const Task = (props) => {
    const dispatch = useDispatch();

    const [readyToComplete, setReadyToComplete] = useState(false);
    const [taskReady, setTaskReady] = useState(false);
    const [task, setTask] = useState();

    // Values.
    const [description, setDescription] = useState(props.description);
    const [completed, setCompleted] = useState(props.completed);

    const handlerToggleCompleted = (e) => {
        e.preventDefault();
        dispatch(getTask(props.id)).then(response => {
            setTask(response.payload);
        });
        setReadyToComplete(true);
    };

    const handlerDeleteTask = (e) => {
        e.preventDefault();
        dispatch(deleteTask(props.id)).then(response => {
            dispatch(fetchTasks());
        });
    };

    const handlerEditTask = (e) => {
        e.preventDefault();
        dispatch(getTask(props.id)).then(response => {
            props.setCurrentTask(response.payload);
        });
    };

    useEffect(() => {
        if (!taskReady) {
            dispatch(getTask(props.id)).then(response => {
                setTask(response.payload);
                setTaskReady(true);
            });
        }
    }, [dispatch, props.id, taskReady]);

    useEffect(() => {
        if (readyToComplete) {
            let taskToComplete = {...task};
            taskToComplete.completed = !taskToComplete.completed;
            dispatch(completeTask(taskToComplete)).then(response => {
                setTask(response.payload);
                dispatch(fetchTasks());
                setReadyToComplete(false);
            });
        }
    }, [dispatch, readyToComplete, task]);

    useEffect(() => {
        if (task) {
            setDescription(task.description);
            setCompleted(task.completed);
        }
    }, [task]);

    useEffect(() => {
        setDescription(props.description);
        setCompleted(props.completed);
    }, [props]);

    return (
        <tr>
            <td>
                {
                    completed ?
                    <s>{props.description}</s> :
                    <span>{props.description}</span>
                }
            </td>
            <td className="text-center"><input type="checkbox" checked={completed} onChange={handlerToggleCompleted}></input></td>
            <td className="text-center">
                <Button variant="warning" onClick={handlerEditTask}>Edit</Button> <Button variant="danger" onClick={handlerDeleteTask}>Delete</Button>
            </td>
        </tr>
    );
};

export default Task;
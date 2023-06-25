import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, fetchTasks, updateTask } from "../actions";
import { Button, Container, Form, Row } from "react-bootstrap";

const AddEditTask = (props) => {

    const dispatch = useDispatch();
    
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState("");
    const [id, setId ] = useState("");

    const handlerCompleted = (e) => {
        setCompleted(!completed);
    };

    const handlerDescription = (e) => {
        setDescription(e.target.value);
    };

    const handlerSave = (e) => {
        e.preventDefault();
        if (props.id) {
            dispatch(updateTask({
                id: props.id,
                description: description,
                completed: completed
            })).then(response => {
                dispatch(fetchTasks());
                props.showHideForm();
            });
        } else {
            dispatch(addTask({
                id: props.id,
                description: description,
                completed: completed
            })).then(response => {
                dispatch(fetchTasks());
            });
        }
        setDescription("");
        setCompleted(false);
    };

    useEffect(() => {
        if (props.id) {
            setDescription(props.description);
            setCompleted(props.completed);
            setId(props.id);
        }
    }, [props]);

    const handlerShowHideForm = (e) => {
        e.preventDefault();
        props.showHideForm();
    };  

    return (
        <Form>
            <input type="text" hidden value={id} readOnly></input>
            <Form.Group>
                <Form.Label>Task</Form.Label>
                <Form.Control size="lg" onChange={handlerDescription} value={description} type="text" placeholder="Enter your task name"></Form.Control>
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Check size="lg" type="checkbox" checked={completed} onChange={handlerCompleted} label="Completed"></Form.Check>
            </Form.Group>
            <br/>
            <Button variant="primary" onClick={handlerSave}>Save</Button> <Button variant="secondary" onClick={handlerShowHideForm}>Cancel</Button>
        </Form>
    );
};

export default AddEditTask;
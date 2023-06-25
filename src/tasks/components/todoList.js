import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "../actions";
import Task from "./task";
import AddEditTask from "./addEditTask";
import { Button, Col, Container, Modal, ModalBody, Row, Table } from "react-bootstrap";

const TodoList = (props) => {

    const dispatch = useDispatch();

    const {tasks, loading, error} = useSelector((state) => state.tasks);
    const [toggleShowAddForm, setToggleShowAddForm] = useState(false);

    const [currentTask, setCurrentTask] = useState({});

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handlerToggleForm = (e) => {
        if (e) {
            e.preventDefault();
        }
        showHideForm();
    };

    const showHideForm = () => {
        setToggleShowAddForm(!toggleShowAddForm);
        setCurrentTask({});
    };

    useEffect(() => {
        if (currentTask && currentTask.id) {
            setToggleShowAddForm(true);
        }
    }, [currentTask]);

    return (
        <Container fluid="lg">
            <br/>
            <div>
            <Button variant="primary" onClick={handlerToggleForm}>Add Task</Button>
            </div>
            <Modal show={toggleShowAddForm} onHide={handlerToggleForm}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <ModalBody>
                    <AddEditTask showHideForm={showHideForm} {...currentTask}></AddEditTask> 
                </ModalBody>
            </Modal>
            <br/>
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <th className="text-center">Description</th>
                                <th className="text-center">Completed?</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            tasks.map((item, index) => 
                            (<Task key={index} {...item} setCurrentTask={setCurrentTask} />)
                            )
                        }
                        </tbody>
                    </Table>
                </Col>
                {
                    loading ? <p><span>Loading...</span></p> : ""
                }
                {
                    error ? <p>{error}</p> :  ""
                }
            </Row>
        </Container>
    );
};

export default TodoList;

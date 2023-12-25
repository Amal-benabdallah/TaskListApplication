import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskAction } from '../features/tasks/tasksSlice';
import { updateTask } from '../services/taskService';
import { TextField, Button, ButtonGroup } from '@mui/material';

const EditTaskForm = ({ task }) => {
    const [taskName, setTaskName] = useState(task.name);
    const [taskPriority, setTaskPriority] = useState(task.priority);
    const dispatch = useDispatch();

    useEffect(() => {
        setTaskName(task.name);
        setTaskPriority(task.priority);
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedTask = { ...task, name: taskName, priority: taskPriority };
        try {
            const result = await updateTask(task.id, updatedTask); // API call
            dispatch(updateTaskAction(result)); // Redux action
            window.location.reload(); // Force a page reload
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <TextField 
                label="Task Name"
                variant="outlined"
                value={taskName} 
                onChange={(e) => setTaskName(e.target.value)}
            />
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button 
                    color={taskPriority === 'High' ? 'secondary' : 'primary'} 
                    onClick={() => setTaskPriority('High')}>
                    High
                </Button>
                <Button 
                    color={taskPriority === 'Medium' ? 'secondary' : 'primary'} 
                    onClick={() => setTaskPriority('Medium')}>
                    Medium
                </Button>
                <Button 
                    color={taskPriority === 'Low' ? 'secondary' : 'primary'} 
                    onClick={() => setTaskPriority('Low')}>
                    Low
                </Button>
            </ButtonGroup>
            <Button type="submit" variant="contained" color="primary">
                Update Task
            </Button>
        </form>
    );
};

export default EditTaskForm;

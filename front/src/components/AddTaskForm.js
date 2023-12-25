import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTaskAction } from '../features/tasks/tasksSlice';
import { addTask } from '../services/taskService';
import { TextField, Button, ButtonGroup } from '@mui/material';

const AddTaskForm = () => {
    const [taskName, setTaskName] = useState('');
    const [taskPriority, setTaskPriority] = useState('Low');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = { name: taskName, priority: taskPriority, status: 'To Do' };
        try {
            const addedTask = await addTask(newTask); // API call
            dispatch(addTaskAction(addedTask)); // Redux action
            setTaskName('');
            setTaskPriority('Low');
        } catch (error) {
            console.error('Error adding task:', error);
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
                Add Task
            </Button>
        </form>
    );
};

export default AddTaskForm;

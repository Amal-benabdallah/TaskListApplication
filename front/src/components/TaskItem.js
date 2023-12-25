import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskAction, deleteTaskAction } from '../features/tasks/tasksSlice';
import { updateTask, deleteTask } from '../services/taskService';
import ProgressBar from './ProgressBar';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    Box
} from '@mui/material';
import EditTaskForm from './EditTaskForm';

const TaskItem = ({ task }) => {
    const dispatch = useDispatch();
    const [progressBarStatus, setProgressBarStatus] = useState(task.status || 'ToDo');
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'High': return 'red';
            case 'Medium': return 'orange';
            case 'Low': return 'green';
            default: return 'black';
        }
    };

    const handleStatusChange = async (newStatus) => {
        const updatedTask = { ...task, status: newStatus };
        try {
            const result = await updateTask(task.id, updatedTask);
            dispatch(updateTaskAction(result));
            setProgressBarStatus(newStatus);
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    const handleNextStatus = () => {
        const statuses = ['ToDo', 'InProgress', 'Completed'];
        const currentStatusIndex = statuses.indexOf(progressBarStatus);
        const nextStatusIndex = (currentStatusIndex + 1) % statuses.length;
        const newStatus = statuses[nextStatusIndex];
        handleStatusChange(newStatus);
    };

    const handleDelete = async () => {
        try {
            await deleteTask(currentTask.id);
            dispatch(deleteTaskAction(currentTask.id));
        } catch (error) {
            console.error('Failed to delete task:', error);
        } finally {
            setShowConfirmDialog(false);
        }
    };

    const confirmDelete = (task) => {
        setCurrentTask(task);
        setShowConfirmDialog(true);
    };

    const handleEditClick = (task) => {
        setCurrentTask(task);
        setShowEditForm(true);
    };

    const closeEditForm = () => {
        setShowEditForm(false);
    };

    const buttonText = progressBarStatus === 'Completed' ? 'Completed' : progressBarStatus === 'InProgress' ? 'InProgress' : 'ToDo';

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <Typography>{task.name}</Typography>
            <Typography sx={{ color: getPriorityColor(task.priority) }}>{task.priority}</Typography>
            <ProgressBar status={progressBarStatus} />
            <Button variant="contained" color="primary" onClick={handleNextStatus}>
                {buttonText}
            </Button>
            <Button variant="contained" color="secondary" onClick={() => handleEditClick(task)}>Edit</Button>
            <Button variant="outlined" color="error" onClick={() => confirmDelete(task)}>Delete</Button>

            {/* Edit Task Form Dialog */}
            <Dialog open={showEditForm} onClose={closeEditForm}>
                <DialogTitle>{"Edit Task"}</DialogTitle>
                <DialogContent style={{ minWidth: '200px', padding: '10px', fontSize: '16px', whiteSpace: 'normal' }}>

                    <EditTaskForm task={currentTask} closeEditForm={closeEditForm} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeEditForm} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>

            {/* Confirmation Dialog for Delete */}
            <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)}>
                <DialogTitle>{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this task?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowConfirmDialog(false)} color="primary">Cancel</Button>
                    <Button onClick={handleDelete} color="secondary" autoFocus>Confirm</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TaskItem;

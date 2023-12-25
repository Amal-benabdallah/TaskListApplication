import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasksAction, deleteTaskAction } from '../features/tasks/tasksSlice';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';

import { 
    Button, 
    Container, 
    Card, 
    CardContent, 
    Typography, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle,
    Grid
}  from '@mui/material';


const TaskList = () => {
    // Assuming the state structure is { tasks: { tasks: [] } }
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();

    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [priority, setPriority] = useState('Low');

    useEffect(() => {
        dispatch(fetchTasksAction());
    }, [dispatch]);

    const handleAddClick = () => {
        setShowAddForm(true);
    };

    const closeAddForm = () => {
        setShowAddForm(false);
    };


    return (
        <Container sx={{ 
            backgroundColor: '#f0f2f5' ,
           // Adjust for more roundness
            width: '90%', // Adjust the width as per your requirement
            maxWidth: '700px', // Maximum width, adjust as needed
      // Centers the card if width is less than 100%

          }}> {/* Adjust the color as needed */}
        <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 ,  width: '90%',   margin: 'auto', 
            maxWidth: '700px',}}>
            <Typography variant="h4"  >Task List</Typography>
            <Button variant="contained" color="primary" onClick={() => setShowAddForm(!showAddForm)}>
                + ADD Task
            </Button>
        </Grid>

        <Dialog open={showAddForm} onClose={closeAddForm}>
                <DialogTitle>{"Add New Task"}</DialogTitle>
                <DialogContent>
                    <AddTaskForm />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAddForm} color="primary">Cancel</Button>
                </DialogActions>
            </Dialog>


     

        {tasks.map((task) => (
           <Card 
           key={task.id} 
           variant="outlined" 
           sx={{ 
             backgroundColor: 'white', 
             borderRadius: '16px', // Adjust for more roundness
             width: '90%', // Adjust the width as per your requirement
             maxWidth: '700px', // Maximum width, adjust as needed
             margin: 'auto', // Centers the card if width is less than 100%
             marginBottom: 2 
           }}
         >
                <CardContent>
                    <TaskItem task={task} />
                 
                </CardContent>
            </Card>
        ))}

          
        </Container>
    );
};

export default TaskList;

import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ProgressBar = ({ status, onClick }) => {
    let value, color;

    switch (status) {
        case 'Completed':
            value = 100;
            color = 'purple'; // All purple when completed
            break;
        case 'InProgress':
            value = 50;
            color = 'purple'; // Purple when in progress
            break;
        case 'ToDo':
        default:
            value = 100;
            color = 'grey'; // All grey when to do
            break;
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }} onClick={onClick}>
            <CircularProgress variant="determinate" value={value} 
                              sx={{ color: color }} 
                              size={40} // Adjust the size as needed
                              thickness={4} // Adjust the thickness as needed
            />
        </Box>
    );
};

export default ProgressBar;

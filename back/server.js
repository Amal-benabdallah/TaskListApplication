const express = require('express');
const { Task } = require('./models'); // Import Task model
const cors = require('cors');


const app = express();

const taskRoutes = require('./routes/task');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/tasks', taskRoutes);

// Optional: Serve static files
// app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).send('Error fetching tasks');
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

const { sequelize } = require('./models');

sequelize.authenticate()
    .then(() => {
        console.log('Database connected.');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

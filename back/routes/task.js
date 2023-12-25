const express = require('express');
const router = express.Router();
const { Task } = require('../models'); // Adjust the path as necessary

router.post('/', async (req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:taskId', async (req, res) => {
    try {
        const updated = await Task.update(req.body, {
            where: { id: req.params.taskId }
        });
        if (updated[0] === 1) {
            res.status(200).json({ message: 'Task updated' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:taskId', async (req, res) => {
    try {
        const deleted = await Task.destroy({
            where: { id: req.params.taskId }
        });
        if (deleted) {
            res.status(200).json({ message: 'Task deleted' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;

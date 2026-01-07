// Define GET, POST, PUT, DELETE routes for /users with in-memory array to store user data
// User data to be stored in key-value format with fields ID and name
const express = require('express');
const app = express();
app.use(express.json());

let users = [];
let nextId = 1;

// GET /users - Retrieve all users
app.get('/users', (req, res) => {
    res.json(users);
});

// POST /users - Create a new user
app.post('/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    const newUser = { id: nextId++, name };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /users/:id - Update an existing user
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name } = req.body;
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    user.name = name;
    res.json(user);
});

// DELETE /users/:id - Delete a user
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users.splice(userIndex, 1);
    res.status(204).send();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

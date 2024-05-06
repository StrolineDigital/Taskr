const mongoose = require('mongoose');
const Task = require('../models/Task');

// Import necessary modules and models

// Connect to the database
mongoose.connect('mongodb://localhost/taskr', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define an array of tasks to seed the database
const tasks = [
    {
        title: 'Task 1',
        description: 'This is task 1',
        completed: false,
    },
    {
        title: 'Task 2',
        description: 'This is task 2',
        completed: true,
    },
    // Add more tasks as needed
];

// Function to seed the database with tasks
const seedDatabase = async () => {
    try {
        // Delete all existing tasks
        await Task.deleteMany();

        // Insert the new tasks
        await Task.insertMany(tasks);

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

// Call the seedDatabase function to seed the database
seedDatabase();
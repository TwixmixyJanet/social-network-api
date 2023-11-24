// IMPORTS
// connecting to the connection file
const connection = require('../config/connection');
// connecting to the User and Thought models
const { User, Thought } = require('../models');

// Laying out seed data for users
const users = [
    {
        username: "John Doe",
        email: "johndoe@example.com",
    },
    {
        username: "Jane Smith",
        email: "janesmith@example.com",
    },
    {
        username: "Peter Jones",
        email: "peterjones@example.com",
    },
    {
        username: "Mary Davis",
        email: "marydavis@example.com",
    },
    {
        username: "David Williams",
        email: "davidwilliams@example.com",
    },
    {
        username: "Sarah Brown",
        email: "sarahbrown@example.com",
    },
    {
        username: "James Miller",
        email: "jamesmiller@example.com",
    },
    {
        username: "Patricia Johnson",
        email: "patricia@example.com",
    },
    {
        username: "Test1",
        email: "test1@example.com",
    },
]

// Laying out seed data for thoughts
const thoughts = [
    {
        thoughtText: "This is my first thought!",
        createdAt: new Date('2023-11-23T13:20:00Z'),
        username: "Test1",
        reactions: [],
      },
      {
        thoughtText: "What a beautiful day!",
        createdAt: new Date('2023-11-23T14:30:00Z'),
        username: "Patricia Johnson",
        reactions: [],
      },
      {
        thoughtText: "I'm feeling grateful for all that I have.",
        createdAt: new Date('2023-11-23T15:45:00Z'),
        username: "Sarah Brown",
        reactions: [],
      },
]

// connection to handle any errors
connection.on('error', (err) => err);

// handling the connection event. The code block listens for the open event on the connection.
connection.once('open', async () => {
    // log to establish that the connection was made
    console.log('🌰🌰🌰 connected to seeding 🌰🌰🌰');
    // Clears out any existing data
    await Thought.deleteMany({});
    await User.deleteMany({});

    // inserts all of the users and thoughts
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    // log to state that the seeding was successful
    console.info('🌱🌱🌱 Seeding Complete 🌱🌱🌱');
    // exits the process with a successful exit code
    process.exit(0);
});